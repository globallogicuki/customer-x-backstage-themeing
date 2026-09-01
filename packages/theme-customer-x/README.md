# @globallogicuki/backstage-theme-customer-x

Everything CustomerX-specific about the portal lives here; `packages/app` only
registers it.

| Export                                                                                                  | What it is                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tokens` (`brand`, `neutrals*`, `status*`, `radius`, `font`, `space`, `shadow`, `interactive`)          | Single source of truth for brand values                                                                                                                                  |
| `light` / `dark` / `ModeTokens` / `Tint` / `tokensFor(theme)`                                           | The per-mode semantic layer (surfaces, overlays, `tint.ok/warning/error/info`). `tokensFor` reads the active mode's tokens inside a component                            |
| `customerXLightTheme` / `customerXDarkTheme`                                                            | Unified MUI v4 + v5 theme. Restyles every MUI component in the app — including plugins — via theme context, and emits `@backstage/ui` CSS variables from the same tokens |
| `SurfaceCard`, `StatTile`, `ActionCard`, `PanelCard`, `ListRow`, `Pill`, `SectionHeading`, `HeroBanner`, `PageIntro`, `Skeleton` | Theme-driven primitives for the app's own pages                                                                                                                |
| `CustomerXMark`, `CustomerXLogo`                                                                        | A generic placeholder mark and the "Accelerate" wordmark. Swap `src/brand/markPath.ts` (and the favicon set in `packages/app/public/`) for the customer's artwork when it lands |
| `CustomerXSidebar`, `DEFAULT_NAV_SECTIONS`                                                              | The navigation rail; pass `sections` to change the IA                                                                                                                    |
| `CustomerXSearchModal`, `CommandPalette`                                                                | The ⌘K command palette: Backstage's `SearchModal` with the portal's grouped, keyboard-driven results inside it                                                           |
| `techDocsThemeModule`, `TechDocsThemeAddon`                                                             | Styles the TechDocs reader (a shadow DOM the MUI theme cannot reach). Register the module in the app's `features`                                                        |
| `UserMenu`, `ShortcutsDialog`, `useGlobalShortcuts`, `GO_SHORTCUTS`                                     | Rail footer account menu (theme, settings, sign out) and the `g …` / `?` keyboard shortcuts                                                                              |
| `StatePanel`                                                                                            | Empty and error states: icon, one line, one action                                                                                                                       |
| `LandingPage`, `CustomerXSignInPage`, `CustomerXNotFoundPage`                                           | Bespoke `/` dashboard, sign-in and 404 surfaces                                                                                                                          |

Plugins never import this package. They get the look through the theme.

## Layout

```
src/
  tokens.ts                    raw brand values (hex, radii, shadows, fonts)
  theme/
    modes.ts                   light/dark semantic tokens + tokensFor()
    palette.ts                 tokens -> Backstage MUI palette
    globalCss.ts               tokens -> @backstage/ui CSS variables + globals
    typography.ts, pageTheme.ts
    components/
      mui/                     MUI overrides, split by kind:
                               global · surfaces · controls · inputs · tables
      backstage.ts             Backstage*/plugin class-name overrides
      shared.ts                style fragments used by both of the above
  components/  brand/  nav/  pages/  search/  techdocs/
```

`yarn workspace @globallogicuki/backstage-theme-customer-x tokens` writes
`dist-tokens/tokens.json` and `tokens.css` (`--accel-*` variables, light and
dark) so tools outside Backstage can match the palette.

Type is self-hosted: `packages/app/public/fonts.css` declares Inter and JetBrains
Mono (SIL OFL, files in `public/fonts/`) so the portal makes no third-party
requests for fonts. Expert Sans, the licensed corporate face, is first in the
stack and is picked up automatically wherever it is installed.

Colours are only ever written once: `tokens.ts` holds the hex, `modes.ts` gives
it a meaning per mode, and everything else reads that. A component needing a
colour the MUI palette has no slot for calls `tokensFor(theme)` rather than
re-typing the value.

## Wiring (see `packages/app/src/modules/customer-x.tsx`)

```tsx
ThemeBlueprint.make({ name: 'light', params: { theme: { …, Provider: ({ children }) =>
  <CustomerXThemeProvider mode="light">{children}</CustomerXThemeProvider> } } });
NavContentBlueprint.make({ params: { component: ({ navItems }) => <CustomerXSidebar navItems={navItems} /> } });
SignInPageBlueprint.make({ params: { loader: async () => CustomerXSignInPage } });
PageBlueprint.make({ name: 'landing', params: { path: '/', routeRef, title: 'Home', icon, noHeader: true, loader: async () => <LandingPage /> } });
```

`CustomerXThemeProvider` also mounts MUI's `CssBaseline`, which the new frontend
system does not — without it no `MuiCssBaseline` globals (body defaults,
scrollbars, the generated `@backstage/ui` variables) are emitted.

Plugin `dev/` harnesses can wrap their app in the same `CustomerXThemeProvider`
to preview the production look without changing plugin code.

## Tests

`yarn playwright test packages/app/e2e-tests/theme.test.ts` takes visual
snapshots of sign-in, landing (light and dark), catalogue, entity, TechDocs and
the palette, and runs axe (WCAG 2.1 AA) on each. Refresh baselines after a
deliberate design change with `--update-snapshots`.

`yarn test` builds both themes end-to-end, which catches the class of override
mistakes (undefined entries, default style functions called incorrectly) that
only surface in the browser.
