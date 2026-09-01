import type { UnifiedThemeOptions } from '@backstage/theme';
import { brand } from '../tokens';
import type { ModeTokens } from './modes';

export function createPalette(t: ModeTokens): UnifiedThemeOptions['palette'] {
  const { n, status, tint } = t;
  const isDark = t.mode === 'dark';
  return {
    mode: t.mode,
    type: t.mode,
    background: { default: n.bg, paper: n.paper },
    primary: t.primary,
    secondary: t.secondary,
    text: {
      primary: n.textPrimary,
      secondary: n.textSecondary,
      disabled: n.textDisabled,
    },
    divider: n.border,
    action: {
      hover: t.hoverOverlay,
      selected: t.selectedOverlay,
      focus: t.selectedOverlay,
      disabledBackground: t.disabled.overlay,
    },
    error: { main: status.error },
    warning: { main: status.warning },
    success: { main: status.ok },
    info: { main: status.running },
    status,
    border: n.border,
    textContrast: n.textPrimary,
    textSubtle: n.textSecondary,
    textVerySubtle: n.textVerySubtle,
    highlight: isDark ? 'rgba(250, 197, 21, 0.18)' : '#FFF8D6',
    errorBackground: tint.error.bg,
    warningBackground: tint.warning.bg,
    infoBackground: tint.info.bg,
    errorText: tint.error.fg,
    infoText: tint.info.fg,
    warningText: tint.warning.fg,
    link: t.link,
    linkHover: t.linkHover,
    gold: '#F5C400',
    navigation: {
      background: t.nav.background,
      indicator: brand.cyan,
      color: t.nav.color,
      selectedColor: t.nav.selectedColor,
      navItem: { hoverBackground: t.nav.hover },
      submenu: { background: t.nav.submenu },
    },
    pinSidebarButton: {
      icon: isDark ? brand.white : brand.navy,
      background: isDark ? '#1F3A50' : brand.sky,
    },
    tabbar: { indicator: brand.cyan },
    banner: {
      info: brand.cyanText,
      error: status.error,
      warning: status.warning,
      text: brand.white,
      link: brand.white,
      closeButtonColor: brand.white,
    },
    bursts: {
      fontColor: brand.white,
      slackChannelText: '#ddd',
      backgroundColor: { default: brand.navy },
      gradient: {
        linear: `linear-gradient(-137deg, ${brand.cyan} 0%, ${brand.navy} 100%)`,
      },
    },
  };
}
