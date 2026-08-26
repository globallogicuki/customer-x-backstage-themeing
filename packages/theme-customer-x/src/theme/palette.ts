import type { UnifiedThemeOptions } from '@backstage/theme';
import { brand } from '../tokens';
import type { ModeTokens } from './modes';

export function createPalette(t: ModeTokens): UnifiedThemeOptions['palette'] {
  const { n, status } = t;
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
      disabledBackground: isDark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(11,31,51,0.08)',
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
    errorBackground: isDark ? 'rgba(249, 112, 102, 0.14)' : '#FEF3F2',
    warningBackground: isDark ? 'rgba(253, 176, 34, 0.16)' : '#FFF6E5',
    infoBackground: isDark ? 'rgba(0, 174, 239, 0.14)' : brand.sky,
    errorText: isDark ? '#FDA29B' : '#B42318',
    infoText: isDark ? '#8FDDF9' : brand.navy,
    warningText: isDark ? '#FEC84B' : '#7A2E0E',
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
