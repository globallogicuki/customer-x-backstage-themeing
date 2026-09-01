import AxeBuilder from '@axe-core/playwright';
import { expect, Page, test } from '@playwright/test';

/**
 * Visual and accessibility coverage for the Accelerate theme.
 *
 * Screenshots catch a plugin upgrade quietly un-theming a surface; axe catches
 * contrast and semantics regressions. Baselines live next to this file — on a
 * deliberate design change, refresh them with
 * `yarn playwright test --update-snapshots`.
 */

const SCREENSHOT = {
  fullPage: true,
  animations: 'disabled' as const,
  // Text renders differently across OSes; keep the tolerance small but real.
  maxDiffPixelRatio: 0.02,
};

const nav = (page: Page) =>
  page.getByRole('navigation', { name: 'sidebar nav' });
// The <nav> itself has no box (its drawer is position: fixed), so "the rail is
// up" is asserted on a link inside it.
const railReady = (page: Page) =>
  nav(page).getByRole('link', { name: 'Home', exact: true });

/**
 * Guest sign-in. The first paint is either the sign-in page or (with a live
 * session) the app itself, so wait for whichever arrives before deciding.
 */
async function signInAsGuest(page: Page) {
  await page.goto('/');
  const guest = page.getByRole('button', { name: 'Continue as guest' });
  await expect(guest.or(railReady(page)).first()).toBeVisible({
    timeout: 30_000,
  });
  if (await guest.isVisible()) {
    await guest.click();
  }
  await expect(railReady(page)).toBeVisible({ timeout: 30_000 });
}

async function setTheme(page: Page, mode: 'light' | 'dark') {
  // Through the account menu, like a person would — no reload, so the guest
  // session survives.
  await page.getByRole('button', { name: /account menu/ }).click();
  await page
    .getByRole('menuitem', { name: mode === 'dark' ? 'Dark' : 'Light' })
    .click();
  await expect(page.locator('body')).toHaveAttribute('data-theme-mode', mode);
}

/**
 * Rules that fail on markup owned by upstream packages, which the theme
 * cannot change. Each is tracked here so the exclusion is a decision, not a
 * blind spot.
 */
const UPSTREAM_RULES: Record<string, string[]> = {
  // @backstage/plugin-search's SearchModal puts aria-modal on MUI's
  // role="presentation" wrapper.
  palette: ['aria-allowed-attr'],
  // material-table (via @backstage/core-components Table) nests the row
  // action buttons inside clickable cells.
  catalog: ['nested-interactive'],
  // mkdocs-material's nav/TOC scroll wrappers (.md-sidebar__scrollwrap) are
  // scrollable divs without tabindex; the reader renders them as-is.
  techdocs: ['scrollable-region-focusable'],
};

async function expectNoSeriousA11yIssues(page: Page, context: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .disableRules(UPSTREAM_RULES[context] ?? [])
    // Third-party plugin internals we cannot restyle from the theme.
    .exclude('.md-typeset')
    .analyze();
  const serious = results.violations.filter(v =>
    ['serious', 'critical'].includes(v.impact ?? ''),
  );
  expect(
    serious,
    `${context}: ${serious
      .map(v => `${v.id} (${v.nodes.length}) — ${v.help}`)
      .join('; ')}`,
  ).toEqual([]);
}

test.describe('Accelerate theme', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('sign-in page', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('button', { name: 'Continue as guest' }),
    ).toBeVisible();
    await expect(page).toHaveScreenshot('sign-in.png', SCREENSHOT);
    await expectNoSeriousA11yIssues(page, 'sign-in');
  });

  for (const mode of ['light', 'dark'] as const) {
    test(`landing page — ${mode}`, async ({ page }) => {
      await signInAsGuest(page);
      await setTheme(page, mode);
      await expect(page.getByRole('heading', { level: 1 })).toContainText(
        /Good (morning|afternoon|evening)/,
      );
      // Let the tiles' figures load so the snapshot is stable.
      await expect(page.getByText('Components').first()).toBeVisible();
      await expect(page).toHaveScreenshot(`landing-${mode}.png`, SCREENSHOT);
      await expectNoSeriousA11yIssues(page, `landing ${mode}`);
    });
  }

  test('catalogue list', async ({ page }) => {
    await signInAsGuest(page);
    await page
      .getByRole('navigation', { name: 'sidebar nav' })
      .getByRole('link', { name: 'Catalog', exact: true })
      .click();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page).toHaveScreenshot('catalog.png', SCREENSHOT);
    await expectNoSeriousA11yIssues(page, 'catalog');
  });

  test('entity page', async ({ page }) => {
    await signInAsGuest(page);
    await nav(page).getByRole('link', { name: 'Catalog', exact: true }).click();
    await page.getByRole('link', { name: 'example-service' }).first().click();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page).toHaveScreenshot('entity.png', SCREENSHOT);
    await expectNoSeriousA11yIssues(page, 'entity');
  });

  test('techdocs reader', async ({ page }) => {
    await signInAsGuest(page);
    // In-app navigation keeps the guest session; a hard goto would not.
    await nav(page).getByRole('link', { name: 'Docs', exact: true }).click();
    await page
      .getByRole('link', { name: 'example-service', exact: true })
      .first()
      .click();
    // First visit builds the site; give it time, then wait for the reader.
    const host = page.locator('[data-testid="techdocs-native-shadowroot"], .techdocs-reader-page, main');
    await expect(host.first()).toBeVisible({ timeout: 60_000 });
    await expect
      .poll(
        () =>
          page.evaluate(() => {
            const h = [...document.querySelectorAll('*')].find(e => e.shadowRoot);
            return h?.shadowRoot?.querySelector('.md-typeset h1')?.textContent ?? '';
          }),
        { timeout: 60_000 },
      )
      .toContain('example-service');
    await expect(page).toHaveScreenshot('techdocs.png', SCREENSHOT);
    await expectNoSeriousA11yIssues(page, 'techdocs');
  });

  test('command palette', async ({ page }) => {
    await signInAsGuest(page);
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+K' : 'Control+K');
    const input = page.getByRole('combobox', { name: 'Search' });
    await expect(input).toBeFocused();
    await input.fill('example');
    await expect(page.getByRole('option').first()).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveScreenshot('palette.png', {
      animations: 'disabled',
    });
    await expectNoSeriousA11yIssues(page, 'palette');
  });

  test('keyboard shortcuts', async ({ page }) => {
    await signInAsGuest(page);
    await page.keyboard.press('g');
    await page.keyboard.press('c');
    await expect(page).toHaveURL(/\/catalog/);
    await page.keyboard.press('Shift+?');
    await expect(
      page.getByRole('heading', { name: 'Keyboard shortcuts' }),
    ).toBeVisible();
  });
});
