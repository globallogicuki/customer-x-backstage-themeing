# @globallogicuki/backstage-theme-customer-x

Everything CustomerX-specific about the portal lives here; `packages/app` only
registers it.

| Export                                                                                                  | What it is                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tokens` (`brand`, `neutrals*`, `status*`, `radius`, `shadow`, `interactive`)                           | Single source of truth for brand values                                                                                                                                  |
| `customerXLightTheme` / `customerXDarkTheme`                                                              | Unified MUI v4 + v5 theme. Restyles every MUI component in the app — including plugins — via theme context, and emits `@backstage/ui` CSS variables from the same tokens |
| `SurfaceCard`, `StatTile`, `ActionCard`, `PanelCard`, `ListRow`, `Pill`, `SectionHeading`, `HeroBanner` | Theme-driven primitives for the app's own pages                                                                                                                          |
| `CustomerXMark`, `CustomerXLogo`                                                                          | Brand mark and wordmark                                                                                                                                                  |
| `CustomerXSidebar`, `DEFAULT_NAV_SECTIONS`                                                               | The navigation rail; pass `sections` to change the IA                                                                                                                    |
| `LandingPage`, `CustomerXSignInPage`                                                                     | Bespoke `/` dashboard and sign-in surface                                                                                                                                |

Plugins never import this package. They get the look through the theme.

## Wiring (see `packages/app/src/modules/customerX.tsx`)

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

`yarn test` builds both themes end-to-end, which catches the class of override
mistakes (undefined entries, default style functions called incorrectly) that
only surface in the browser.
