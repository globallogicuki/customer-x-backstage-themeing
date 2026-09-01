import { brand, font, fontFamily, monoFontFamily, radius } from '../tokens';
import { CUSTOMER_X_THEME_NAME, type ModeTokens } from './modes';

/**
 * Global CSS emitted through MuiCssBaseline:
 *
 * 1. `@backstage/ui` (BUI) design tokens. BUI components are styled with CSS
 *    custom properties rather than MUI, so the same brand tokens are mapped
 *    onto its `--bui-*` variables here. UnifiedThemeProvider stamps
 *    `data-theme-name` / `data-theme-mode` on <body>, and the two-attribute
 *    selector out-specifies BUI's own `[data-theme-mode]` rules.
 * 2. The sidebar divider: a MUI v4 `styled()` <hr> whose theme override is
 *    silently dropped by v4, so it is styled globally instead. (Only reachable
 *    via Backstage's stock `SidebarDivider`; `CustomerXSidebar` spaces its own
 *    sections.)
 */
export function createGlobalCss(t: ModeTokens): Record<string, any> {
  const { n, status, tint } = t;
  const isDark = t.mode === 'dark';
  const sel = `[data-theme-name='${CUSTOMER_X_THEME_NAME}'][data-theme-mode='${t.mode}']`;

  return {
    [sel]: {
      '--bui-font-regular': fontFamily,
      '--bui-font-monospace': monoFontFamily,
      '--bui-font-weight-bold': 600,
      '--bui-radius-2': '0.5rem', // BUI buttons — matches MUI radius.md
      '--bui-radius-3': '0.5rem',
      '--bui-radius-4': '0.75rem',
      '--bui-ring': brand.cyan,

      '--bui-gray-1': isDark ? n.bg : n.paperMuted,
      '--bui-gray-2': isDark ? n.paper : n.bg,
      '--bui-gray-3': isDark ? n.paperMuted : n.border,
      '--bui-gray-4': isDark ? n.border : n.borderStrong,
      '--bui-gray-5': isDark ? n.borderStrong : n.textDisabled,
      '--bui-gray-6': isDark ? n.textDisabled : n.textSecondary,
      '--bui-gray-7': isDark ? '#8D9DAA' : '#3F5163',
      '--bui-gray-8': isDark ? n.textSecondary : '#2A3D50',
      '--bui-gray-9': isDark ? '#C8D3DD' : '#1A2B3C',
      '--bui-gray-10': isDark ? '#E1E8EE' : n.textPrimary,
      '--bui-gray-11': isDark ? n.textPrimary : '#061422',

      '--bui-bg-app': n.bg,
      '--bui-bg-neutral-1': n.paper,
      '--bui-bg-neutral-2': n.paperMuted,
      '--bui-bg-neutral-3': n.paper,
      '--bui-bg-neutral-4': n.paperMuted,

      '--bui-fg-primary': n.textPrimary,
      '--bui-fg-secondary': n.textSecondary,
      '--bui-fg-disabled': n.textDisabled,
      '--bui-fg-positive': status.ok,
      '--bui-fg-negative': status.error,
      '--bui-fg-warning': status.warning,
      '--bui-fg-announcement': t.link,

      '--bui-border-1': n.border,
      '--bui-border-2': n.borderStrong,

      '--bui-accent-bg': t.primary.main,
      '--bui-accent-bg-hover': t.primary.dark,
      '--bui-accent-bg-disabled': t.disabled.solidBg,
      '--bui-accent-fg': t.primary.contrastText,
      '--bui-accent-fg-disabled': t.disabled.solidFg,

      '--bui-announcement-bg': tint.info.solid,
      '--bui-announcement-bg-hover': tint.info.solidHover,
      '--bui-announcement-bg-disabled': isDark
        ? t.disabled.solidBg
        : brand.cyanText,
      '--bui-announcement-bg-subdued': tint.info.bg,
      '--bui-announcement-bg-subdued-hover': tint.info.bgHover,
      '--bui-announcement-bg-subdued-disabled': tint.info.bg,
      '--bui-announcement-border': tint.info.border,
      '--bui-announcement-fg': isDark ? brand.navyDeep : brand.white,
      '--bui-announcement-fg-disabled': isDark ? t.disabled.solidFg : '#B3E4F9',
      '--bui-announcement-fg-subdued': tint.info.fg,
      '--bui-announcement-fg-subdued-disabled': isDark ? '#4F7F95' : '#7FA3BA',

      '--bui-warning-bg': tint.warning.solid,
      '--bui-warning-bg-hover': tint.warning.solidHover,
      '--bui-warning-bg-subdued': tint.warning.bg,
      '--bui-warning-bg-subdued-hover': tint.warning.bgHover,
      '--bui-warning-border': tint.warning.border,
      '--bui-warning-fg': '#1A1A1A',
      '--bui-warning-fg-subdued': tint.warning.fg,

      '--bui-negative-bg': tint.error.solid,
      '--bui-negative-bg-hover': tint.error.solidHover,
      '--bui-negative-bg-subdued': tint.error.bg,
      '--bui-negative-bg-subdued-hover': tint.error.bgHover,
      '--bui-negative-border': tint.error.border,
      '--bui-negative-fg': isDark ? '#1A0505' : brand.white,
      '--bui-negative-fg-subdued': tint.error.fg,

      '--bui-positive-bg': tint.ok.solid,
      '--bui-positive-bg-hover': tint.ok.solidHover,
      '--bui-positive-bg-subdued': tint.ok.bg,
      '--bui-positive-bg-subdued-hover': tint.ok.bgHover,
      '--bui-positive-border': tint.ok.border,
      '--bui-positive-fg': '#052E16',
      '--bui-positive-fg-subdued': tint.ok.fg,

      // Listed as deprecated in BUI's token set, but Button/ButtonLink
      // variant="primary" still read them (--bg: var(--bui-bg-solid) …).
      // Without them the primary BUI button is Backstage blue with dark text.
      // They are the accent ramp, so alias it rather than restating values.
      /* eslint-disable @backstage/no-deprecated-bui-tokens */
      '--bui-bg-solid': 'var(--bui-accent-bg)',
      '--bui-bg-solid-hover': 'var(--bui-accent-bg-hover)',
      '--bui-bg-solid-pressed': isDark ? brand.cyanDark : brand.navyDeep,
      '--bui-bg-solid-disabled': 'var(--bui-accent-bg-disabled)',
      '--bui-fg-solid': 'var(--bui-accent-fg)',
      '--bui-fg-solid-disabled': 'var(--bui-accent-fg-disabled)',
      /* eslint-enable @backstage/no-deprecated-bui-tokens */
      '--bui-scrollbar': t.disabled.overlay,
      '--bui-scrollbar-thumb': isDark ? n.borderStrong : n.textVerySubtle,
    },
    // BUI's plugin header switches to a white full-bleed "strip" when a legacy
    // core <Header> follows it (un-migrated plugins). We demote that legacy
    // header to a plain title, so keep the plugin header in its standard inset
    // form instead of the strip.
    [`${sel} .bui-PluginHeader:has(+ [data-backstage-core-header]), ${sel} .bui-PluginHeader:has(+ [data-backstage-core-page] [data-backstage-core-header])`]:
      {
        '--bui-plugin-header-background-color': 'transparent',
        '--bui-plugin-header-toolbar-border-bottom':
          'solid 1px var(--bui-border-1)',
        '--bui-plugin-header-padding-top': 'var(--bui-space-4)',
        '--bui-plugin-header-toolbar-padding-bottom': 'var(--bui-space-4)',
        '--bui-plugin-header-margin-bottom': '0px',
      },
    [`${sel} .bui-PluginHeader:has(+ [data-backstage-core-header]) .bui-PluginHeaderToolbarIcon, ${sel} .bui-PluginHeader:has(+ [data-backstage-core-page] [data-backstage-core-header]) .bui-PluginHeaderToolbarIcon`]:
      {
        backgroundColor: 'var(--bui-bg-neutral-1)',
      },
    // The ⌘K dialog. Backstage's SearchModal opens a full-height `lg` dialog;
    // a command palette is a compact panel near the top of the viewport. The
    // palette marks its root with data-cx-palette and these rules reshape the
    // MUI paper around it — no fork of the modal needed.
    [`${sel} .MuiDialog-container:has([data-cx-palette])`]: {
      alignItems: 'flex-start',
      paddingTop: '12vh',
    },
    [`${sel} .MuiDialog-paper:has([data-cx-palette])`]: {
      width: '100%',
      maxWidth: 680,
      height: 'auto',
      maxHeight: '70vh',
      margin: '0 16px',
      borderRadius: radius.xl,
      overflow: 'hidden',
      boxShadow: t.shadows.lg,
    },
    // The TechDocs reader's subheader toolbar exists only to hold a settings
    // gear (the auto-discovered addons-contrib TextSize addon), and reserves
    // a ~96px empty band between the entity card and the docs content.
    // Appearance settings live in the rail's UserMenu, so drop the band.
    // The toolbar has no stable class of its own; it is always the entity
    // card's next sibling in TechDocsReaderLayout.
    [`${sel} [class*='TechDocsReaderEntityCard_entityCard'] + [class*='MuiToolbar-root']`]:
      {
        display: 'none',
      },
    // Plugin page headers: the page icon sits on the same brand-cyan wash
    // as the landing page's tiles, the page name in the navy — so every page
    // opens the way the home page does.
    [`${sel} .bui-PluginHeaderToolbarIcon`]: {
      backgroundColor: t.accentWash,
      color: t.accentText,
    },
    [`${sel} .bui-PluginHeaderToolbarName`]: {
      color: t.heading,
      fontWeight: 600,
    },
    // @backstage/ui tables (entity relation cards): match the MUI table
    // header treatment — quiet sentence-case labels — so both table kinds
    // read as one system.
    [`${sel} .bui-TableHead`]: {
      fontSize: font.sm,
      fontWeight: 500,
      letterSpacing: 0,
      textTransform: 'none',
      color: 'var(--bui-fg-secondary)',
    },
    [`${sel} nav[aria-label='sidebar nav'] hr`]: {
      height: 1,
      width: 'calc(100% - 32px)',
      margin: '8px 16px',
      border: 'none',
      background: t.nav.divider,
    },
    // Motion in this portal is only ever feedback (hover, focus, a panel
    // opening), never atmosphere — so it is all safe to switch off for anyone
    // who has asked the OS to reduce it. Covers plugin animation too.
    '@media (prefers-reduced-motion: reduce)': {
      [`${sel} *, ${sel} *::before, ${sel} *::after`]: {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '0.01ms !important',
        scrollBehavior: 'auto !important',
      },
    },
  };
}
