import {
  brand,
  neutralsDark,
  neutralsLight,
  rgba,
  shadow,
  statusDark,
  statusLight,
} from '../tokens';

export type Mode = 'light' | 'dark';

/**
 * Value of the `data-theme-name` attribute that `UnifiedThemeProvider` stamps
 * on <body>. The global CSS in `globalCss.ts` scopes its @backstage/ui
 * overrides to it.
 */
export const CUSTOMER_X_THEME_NAME = 'customer-x';

/**
 * One semantic colour (info / ok / warning / error) in every treatment the
 * portal needs. Consumed by the MUI palette, the `@backstage/ui` variables and
 * the `Pill` primitive, so the three can never drift apart.
 */
export interface Tint {
  /** Filled background — status dots, solid banners, BUI solid buttons. */
  solid: string;
  /** Hover for `solid`. */
  solidHover: string;
  /** Washed background behind text. */
  bg: string;
  /** Hover for `bg`. */
  bgHover: string;
  /** Text/icon colour that meets AA on `bg`. */
  fg: string;
  /** Hairline for outlined treatments. */
  border: string;
}

export interface ModeTokens {
  mode: Mode;
  n: typeof neutralsLight | typeof neutralsDark;
  status: typeof statusLight | typeof statusDark;
  shadows: typeof shadow.light | typeof shadow.dark;
  /** Colour used for primary actions (buttons, selected tabs). */
  primary: { main: string; light: string; dark: string; contrastText: string };
  /** Accent (secondary) colour — CustomerX cyan in both modes. */
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  /** The primary colour at text weight — outlined/text buttons, quiet labels. */
  primaryText: string;
  /** Headline colour: Dark Blue on light surfaces, near-white on dark. */
  heading: string;
  /** Small accent labels — page type, eyebrows, icon tiles. */
  accentText: string;
  /** Wash behind an accent icon or label. */
  accentWash: string;
  link: string;
  linkHover: string;
  /**
   * The navigation rail: a flat block of the brand navy in light mode and
   * the deepest navy in dark mode. One fill, no gradient — the colour itself
   * is the brand statement, so it does not need a second effect on top.
   */
  nav: {
    background: string;
    color: string;
    selectedColor: string;
    hover: string;
    selectedBackground: string;
    selectedBackgroundHover: string;
    submenu: string;
    divider: string;
    /** Section headings inside the rail. */
    label: string;
    /** Raised control on the rail — the search trigger and the user card. */
    surface: string;
    surfaceBorder: string;
    surfaceHover: string;
  };
  header: { background: string; fontColor: string; type: string };
  focusRing: string;
  hoverOverlay: string;
  selectedOverlay: string;
  chipBg: string;
  /** Inverted surface — tooltips and snackbars. */
  inverse: { bg: string; fg: string };
  disabled: {
    /** Faint neutral fill: disabled buttons, progress tracks. */
    overlay: string;
    /** Disabled fill for solid/contained controls. */
    solidBg: string;
    /** Text on `solidBg`. */
    solidFg: string;
  };
  /** Search-term highlight wash (MUI `mark` and Backstage search results). */
  searchHighlight: string;
  tint: Record<'info' | 'ok' | 'warning' | 'error', Tint>;
}

export const light: ModeTokens = {
  mode: 'light',
  n: neutralsLight,
  status: statusLight,
  shadows: shadow.light,
  primary: {
    main: brand.navy,
    light: brand.navyLight,
    dark: brand.navyDark,
    contrastText: brand.white,
  },
  secondary: {
    main: brand.cyan,
    light: brand.cyanLight,
    dark: brand.cyanDark,
    contrastText: brand.navy,
  },
  primaryText: brand.navy,
  heading: brand.navy,
  accentText: brand.cyanText,
  accentWash: brand.sky,
  link: brand.cyanText,
  linkHover: brand.navy,
  nav: {
    background: brand.navy,
    color: rgba(brand.white, 0.78),
    selectedColor: brand.white,
    hover: rgba(brand.white, 0.08),
    selectedBackground: rgba(brand.cyan, 0.24),
    selectedBackgroundHover: rgba(brand.cyan, 0.3),
    submenu: brand.navyDark,
    divider: rgba(brand.white, 0.12),
    label: rgba(brand.white, 0.62),
    surface: rgba(brand.white, 0.08),
    surfaceBorder: rgba(brand.white, 0.14),
    surfaceHover: rgba(brand.white, 0.12),
  },
  header: {
    background: neutralsLight.paper,
    fontColor: neutralsLight.textPrimary,
    type: brand.cyanText,
  },
  focusRing: shadow.light.ring,
  hoverOverlay: rgba(brand.navy, 0.05),
  selectedOverlay: rgba(brand.cyan, 0.12),
  chipBg: '#EEF2F6',
  inverse: { bg: neutralsLight.textPrimary, fg: brand.white },
  disabled: {
    overlay: rgba(neutralsLight.textPrimary, 0.08),
    solidBg: '#9FB0BF',
    solidFg: neutralsLight.border,
  },
  searchHighlight: rgba(brand.cyan, 0.22),
  tint: {
    info: {
      solid: brand.cyanText,
      solidHover: brand.cyan,
      bg: brand.sky,
      bgHover: '#CDEEFB',
      fg: brand.navy,
      border: brand.cyan,
    },
    ok: {
      solid: statusLight.ok,
      solidHover: '#32D583',
      bg: '#ECFDF3',
      bgHover: '#D1FADF',
      fg: '#027A48',
      border: statusLight.ok,
    },
    warning: {
      solid: statusLight.warning,
      solidHover: '#FDB022',
      bg: '#FFF6E5',
      bgHover: '#FFECCC',
      fg: '#7A2E0E',
      border: statusLight.warning,
    },
    error: {
      solid: statusLight.error,
      solidHover: '#F04438',
      bg: '#FEF3F2',
      bgHover: '#FEE4E2',
      fg: '#B42318',
      border: '#F04438',
    },
  },
};

export const dark: ModeTokens = {
  mode: 'dark',
  n: neutralsDark,
  status: statusDark,
  shadows: shadow.dark,
  primary: {
    main: brand.cyan,
    light: brand.cyanLight,
    dark: brand.cyanDark,
    contrastText: brand.navyDeep,
  },
  secondary: {
    main: brand.cyanLight,
    light: brand.cyanPale,
    dark: brand.cyan,
    contrastText: brand.navyDeep,
  },
  primaryText: brand.cyanLight,
  heading: neutralsDark.textPrimary,
  accentText: brand.cyanLight,
  accentWash: rgba(brand.cyan, 0.16),
  link: brand.cyanLight,
  linkHover: brand.cyanPale,
  nav: {
    background: brand.navyDeep,
    color: rgba(brand.white, 0.72),
    selectedColor: brand.white,
    hover: rgba(brand.white, 0.06),
    selectedBackground: rgba(brand.cyan, 0.22),
    selectedBackgroundHover: rgba(brand.cyan, 0.28),
    submenu: brand.navyDark,
    divider: rgba(brand.white, 0.1),
    label: rgba(brand.white, 0.58),
    surface: rgba(brand.white, 0.06),
    surfaceBorder: rgba(brand.white, 0.12),
    surfaceHover: rgba(brand.white, 0.1),
  },
  header: {
    background: neutralsDark.paper,
    fontColor: neutralsDark.textPrimary,
    type: brand.cyanLight,
  },
  focusRing: shadow.dark.ring,
  hoverOverlay: rgba(brand.white, 0.06),
  selectedOverlay: rgba(brand.cyan, 0.16),
  chipBg: '#1B2F41',
  inverse: { bg: neutralsDark.textPrimary, fg: neutralsLight.textPrimary },
  disabled: {
    overlay: rgba(brand.white, 0.08),
    solidBg: '#1F4A63',
    solidFg: '#5B7F95',
  },
  searchHighlight: rgba(brand.cyan, 0.3),
  tint: {
    info: {
      solid: brand.cyan,
      solidHover: brand.cyanLight,
      bg: rgba(brand.cyan, 0.14),
      bgHover: rgba(brand.cyan, 0.22),
      fg: brand.cyanPale,
      border: brand.cyanDark,
    },
    ok: {
      solid: statusDark.ok,
      solidHover: '#6CE9A6',
      bg: rgba(statusDark.ok, 0.14),
      bgHover: rgba(statusDark.ok, 0.22),
      fg: '#6CE9A6',
      border: statusDark.ok,
    },
    warning: {
      solid: statusDark.warning,
      solidHover: '#FEC84B',
      bg: rgba(statusDark.warning, 0.16),
      bgHover: rgba(statusDark.warning, 0.24),
      fg: '#FEC84B',
      border: statusDark.warning,
    },
    error: {
      solid: statusDark.error,
      solidHover: '#FDA29B',
      bg: rgba(statusDark.error, 0.14),
      bgHover: rgba(statusDark.error, 0.22),
      fg: '#FDA29B',
      border: statusDark.error,
    },
  },
};

/**
 * The tokens for whichever mode a component is rendering in. Lets the bespoke
 * surfaces (nav rail, `Pill`, pages) read the same values the theme was built
 * from, instead of re-typing colours the MUI palette has no slot for.
 */
export const tokensFor = (theme: { palette: { type: Mode } }): ModeTokens =>
  theme.palette.type === 'dark' ? dark : light;
