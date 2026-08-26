import {
  brand,
  neutralsDark,
  neutralsLight,
  shadow,
  statusDark,
  statusLight,
} from '../tokens';

export type Mode = 'light' | 'dark';

/**
 * Value of the `data-theme-name` attribute that `UnifiedThemeProvider` stamps
 * on <body>. `css/customer-x-ui.css` scopes its @backstage/ui overrides to it.
 */
export const CUSTOMER_X_THEME_NAME = 'customer-x';

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
  link: string;
  linkHover: string;
  nav: {
    background: string;
    backgroundEnd: string;
    color: string;
    selectedColor: string;
    hover: string;
    selectedBackground: string;
    submenu: string;
    divider: string;
  };
  header: { background: string; fontColor: string; type: string };
  focusRing: string;
  hoverOverlay: string;
  selectedOverlay: string;
  chipBg: string;
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
  link: brand.cyanText,
  linkHover: brand.navy,
  nav: {
    background: brand.navy,
    backgroundEnd: brand.navyDark,
    color: 'rgba(255, 255, 255, 0.74)',
    selectedColor: brand.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    selectedBackground: 'rgba(0, 174, 239, 0.18)',
    submenu: brand.navyDark,
    divider: 'rgba(255, 255, 255, 0.10)',
  },
  header: {
    background: neutralsLight.paper,
    fontColor: neutralsLight.textPrimary,
    type: brand.cyanText,
  },
  focusRing: shadow.light.ring,
  hoverOverlay: 'rgba(0, 57, 93, 0.05)',
  selectedOverlay: 'rgba(0, 174, 239, 0.12)',
  chipBg: '#EEF2F6',
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
    light: '#8FDDF9',
    dark: brand.cyan,
    contrastText: brand.navyDeep,
  },
  link: brand.cyanLight,
  linkHover: '#8FDDF9',
  nav: {
    background: '#071320',
    backgroundEnd: '#040C14',
    color: 'rgba(255, 255, 255, 0.68)',
    selectedColor: brand.white,
    hover: 'rgba(255, 255, 255, 0.06)',
    selectedBackground: 'rgba(0, 174, 239, 0.20)',
    submenu: '#0F2233',
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  header: {
    background: neutralsDark.paper,
    fontColor: neutralsDark.textPrimary,
    type: brand.cyanLight,
  },
  focusRing: shadow.dark.ring,
  hoverOverlay: 'rgba(255, 255, 255, 0.06)',
  selectedOverlay: 'rgba(0, 174, 239, 0.16)',
  chipBg: '#1B2F41',
};
