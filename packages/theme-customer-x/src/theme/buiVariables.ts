import { brand, fontFamily, monoFontFamily } from '../tokens';
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
 *    silently dropped by v4, so it is styled globally instead.
 */
export function createBuiGlobals(t: ModeTokens): Record<string, any> {
  const { n, status } = t;
  const isDark = t.mode === 'dark';
  const sel = `[data-theme-name='${CUSTOMER_X_THEME_NAME}'][data-theme-mode='${t.mode}']`;

  const subdued = (hex: string, a: number) =>
    `${hex}${Math.round(a * 255)
      .toString(16)
      .padStart(2, '0')}`;

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
      '--bui-accent-bg-disabled': isDark ? '#1F4A63' : '#9FB0BF',
      '--bui-accent-fg': t.primary.contrastText,
      '--bui-accent-fg-disabled': isDark ? '#5B7F95' : n.border,

      '--bui-announcement-bg': isDark ? brand.cyan : brand.cyanText,
      '--bui-announcement-bg-hover': isDark ? brand.cyanLight : brand.cyan,
      '--bui-announcement-bg-disabled': isDark ? '#1F4A63' : brand.cyanText,
      '--bui-announcement-bg-subdued': isDark
        ? subdued(brand.cyan, 0.14)
        : brand.sky,
      '--bui-announcement-bg-subdued-hover': isDark
        ? subdued(brand.cyan, 0.22)
        : '#CDEEFB',
      '--bui-announcement-bg-subdued-disabled': isDark
        ? subdued(brand.cyan, 0.1)
        : brand.sky,
      '--bui-announcement-border': isDark ? brand.cyanDark : brand.cyan,
      '--bui-announcement-fg': isDark ? brand.navyDeep : '#FFFFFF',
      '--bui-announcement-fg-disabled': isDark ? '#5B7F95' : '#B3E4F9',
      '--bui-announcement-fg-subdued': isDark ? '#8FDDF9' : brand.navy,
      '--bui-announcement-fg-subdued-disabled': isDark ? '#4F7F95' : '#7FA3BA',

      '--bui-warning-bg': status.warning,
      '--bui-warning-bg-hover': isDark ? '#FEC84B' : '#FDB022',
      '--bui-warning-bg-subdued': isDark
        ? subdued(status.warning, 0.16)
        : '#FFF6E5',
      '--bui-warning-bg-subdued-hover': isDark
        ? subdued(status.warning, 0.24)
        : '#FFECCC',
      '--bui-warning-border': status.warning,
      '--bui-warning-fg': '#1A1A1A',
      '--bui-warning-fg-subdued': isDark ? '#FEC84B' : '#7A2E0E',

      '--bui-negative-bg': status.error,
      '--bui-negative-bg-hover': isDark ? '#FDA29B' : '#F04438',
      '--bui-negative-bg-subdued': isDark
        ? subdued(status.error, 0.14)
        : '#FEF3F2',
      '--bui-negative-bg-subdued-hover': isDark
        ? subdued(status.error, 0.22)
        : '#FEE4E2',
      '--bui-negative-border': isDark ? status.error : '#F04438',
      '--bui-negative-fg': isDark ? '#1A0505' : '#FFFFFF',
      '--bui-negative-fg-subdued': isDark ? '#FDA29B' : '#B42318',

      '--bui-positive-bg': status.ok,
      '--bui-positive-bg-hover': isDark ? '#6CE9A6' : '#32D583',
      '--bui-positive-bg-subdued': isDark
        ? subdued(status.ok, 0.14)
        : '#ECFDF3',
      '--bui-positive-bg-subdued-hover': isDark
        ? subdued(status.ok, 0.22)
        : '#D1FADF',
      '--bui-positive-border': status.ok,
      '--bui-positive-fg': '#052E16',
      '--bui-positive-fg-subdued': isDark ? '#6CE9A6' : '#027A48',

      // Listed as deprecated in BUI's token set, but Button/ButtonLink
      // variant="primary" still read them (--bg: var(--bui-bg-solid) …).
      // Without them the primary BUI button is Backstage blue with dark text.
      /* eslint-disable @backstage/no-deprecated-bui-tokens */
      '--bui-bg-solid': t.primary.main,
      '--bui-bg-solid-hover': t.primary.dark,
      '--bui-bg-solid-pressed': isDark ? brand.cyanDark : brand.navyDeep,
      '--bui-bg-solid-disabled': isDark ? '#1F4A63' : '#9FB0BF',
      '--bui-fg-solid': t.primary.contrastText,
      '--bui-fg-solid-disabled': isDark ? '#5B7F95' : n.border,
      /* eslint-enable @backstage/no-deprecated-bui-tokens */
      '--bui-scrollbar': isDark
        ? 'rgba(255,255,255,0.06)'
        : 'rgba(11,31,51,0.08)',
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
    // @backstage/ui tables (entity relation cards): match the MUI table
    // header treatment — small caps, secondary colour — so both table kinds
    // read as one system.
    [`${sel} .bui-TableHead`]: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--bui-fg-secondary)',
    },
    [`${sel} nav[aria-label='sidebar nav'] hr`]: {
      height: 1,
      width: 'calc(100% - 32px)',
      margin: '8px 16px',
      border: 'none',
      background: t.nav.divider,
    },
  };
}
