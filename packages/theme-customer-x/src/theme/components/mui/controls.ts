/* eslint-disable @typescript-eslint/no-explicit-any */
import { brand, font, radius } from '../../../tokens';
import type { ModeTokens } from '../../modes';
import { hairline } from '../shared';

/** Buttons, chips, tabs, progress — anything the user acts on or reads status from. */
export function controlComponents(t: ModeTokens) {
  const { n, tint } = t;
  const isDark = t.mode === 'dark';
  const border = hairline(t);

  return {
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: t.link,
          fontWeight: 500,
          '&:hover': { color: t.linkHover },
        },
        underlineHover: {
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline' },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: { color: 'primary' },
      styleOverrides: {
        root: {
          color: n.borderStrong,
          '&$checked, &.Mui-checked': { color: t.primary.main },
        },
      },
    },
    MuiRadio: {
      defaultProps: { color: 'primary' },
      styleOverrides: {
        root: {
          color: n.borderStrong,
          '&$checked, &.Mui-checked': { color: t.primary.main },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        // Used by some plugins as a small section label (e.g. catalog-graph
        // filters); sentence case like the rest of the UI.
        button: {
          textTransform: 'none',
          letterSpacing: 0,
          fontWeight: 600,
          fontSize: font.base,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: font.md,
          lineHeight: '24px', // 40px tall — same as @backstage/ui medium buttons
          letterSpacing: 0,
          borderRadius: radius.md,
          padding: '8px 16px',
          boxShadow: 'none',
          transition: 'background-color 120ms ease, border-color 120ms ease',
          '&:hover': { boxShadow: 'none' },
          '&:focus-visible': { boxShadow: t.focusRing },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
          '&$disabled, &.Mui-disabled': {
            backgroundColor: t.disabled.overlay,
            color: n.textDisabled,
          },
        },
        containedPrimary: {
          backgroundColor: t.primary.main,
          color: t.primary.contrastText,
          '&:hover': { backgroundColor: t.primary.dark },
        },
        containedSecondary: {
          backgroundColor: t.secondary.main,
          color: t.secondary.contrastText,
          '&:hover': { backgroundColor: t.secondary.dark },
        },
        outlined: {
          borderColor: n.borderStrong,
          color: n.textPrimary,
          backgroundColor: n.paper,
          '&:hover': {
            backgroundColor: t.hoverOverlay,
            borderColor: n.borderStrong,
          },
        },
        outlinedPrimary: {
          borderColor: n.borderStrong,
          color: t.primaryText,
          '&:hover': {
            borderColor: t.primary.main,
            backgroundColor: t.hoverOverlay,
          },
        },
        text: {
          padding: '8px 12px',
          color: t.link,
          '&:hover': { backgroundColor: t.hoverOverlay },
        },
        textPrimary: {
          color: t.primaryText,
          '&:hover': { backgroundColor: t.hoverOverlay },
        },
        sizeSmall: {
          padding: '4px 12px',
          fontSize: font.base,
          borderRadius: radius.sm,
        },
        sizeLarge: {
          padding: '12px 20px',
          fontSize: font.lg,
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // Toggle-style tiles and buttons (anything exposing aria-pressed,
          // e.g. tech-insights check tiles) share the card hover treatment.
          // The attribute selector out-specifies a plugin's own `.tile:hover`.
          '&[aria-pressed="false"]:hover': {
            borderColor: n.borderStrong,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          color: n.textSecondary,
          '&:hover': {
            backgroundColor: t.hoverOverlay,
            color: n.textPrimary,
          },
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: { boxShadow: 'none' },
        contained: { boxShadow: 'none' },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          border,
          color: n.textSecondary,
          '&$selected, &.Mui-selected': {
            backgroundColor: t.selectedOverlay,
            color: n.textPrimary,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          height: 24,
          backgroundColor: t.chipBg,
          color: n.textPrimary,
          border: '1px solid transparent',
          fontWeight: 500,
          marginRight: 8,
          marginBottom: 8,
        },
        label: {
          paddingLeft: 10,
          paddingRight: 10,
          fontSize: font.sm,
          lineHeight: '20px',
          fontWeight: 500,
        },
        labelSmall: {
          fontSize: font.xs,
          paddingLeft: 8,
          paddingRight: 8,
        },
        sizeSmall: { height: 20 },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: n.borderStrong,
        },
        colorPrimary: {
          backgroundColor: tint.info.bg,
          color: tint.info.fg,
        },
        colorSecondary: {
          backgroundColor: tint.info.bg,
          color: t.link,
        },
        clickable: {
          '&:hover, &:focus': {
            backgroundColor: n.border,
          },
        },
        deleteIcon: {
          width: 18,
          height: 18,
          margin: '0 5px 0 -4px',
          color: 'inherit',
          opacity: 0.6,
          '&:hover': { opacity: 1, color: 'inherit' },
        },
        avatar: {
          marginLeft: 4,
        },
        icon: {
          marginLeft: 6,
          color: 'inherit',
        },
      },
    },
    MuiSwitch: {
      defaultProps: { color: 'primary' },
      styleOverrides: {
        colorPrimary: {
          '&$checked, &.Mui-checked': { color: brand.cyan },
          '&$checked + $track, &.Mui-checked + .MuiSwitch-track': {
            backgroundColor: brand.cyan,
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: { color: brand.cyan },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          height: 6,
          backgroundColor: t.disabled.overlay,
        },
        bar: { borderRadius: radius.pill },
        barColorPrimary: { backgroundColor: brand.cyan },
        // MUI tints the track from the palette colour; keep it neutral.
        colorPrimary: { backgroundColor: t.disabled.overlay },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: { color: brand.cyan },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: font.md,
        },
        colorDefault: {
          backgroundColor: isDark ? n.border : brand.sky,
          color: t.primaryText,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: brand.cyan,
          color: brand.navyDeep,
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: { fontSize: font.base },
        separator: { color: n.textDisabled },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: n.borderStrong,
          '&$active, &.Mui-active': { color: t.primary.main },
          '&$completed, &.Mui-completed': { color: t.status.ok },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 44,
        },
        indicator: {
          height: 2,
          backgroundColor: brand.cyan,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: font.md,
          letterSpacing: 0,
          minHeight: 44,
          minWidth: 0,
          padding: '10px 16px',
          color: n.textSecondary,
          // Underline only. A filled, rounded-top tab is the Material chrome
          // this theme is trying not to be.
          transition: 'color 120ms ease',
          '&:hover': {
            color: n.textPrimary,
            backgroundColor: 'transparent',
          },
          '&$selected, &.Mui-selected': {
            color: t.heading,
            fontWeight: 600,
          },
          // Restated to beat Backstage's own `up('md')` rule for MuiTab.
          '@media (min-width: 960px)': {
            minWidth: 0,
            fontSize: font.md,
            fontWeight: 500,
          },
        },
        textColorPrimary: {
          color: n.textSecondary,
          '&$selected, &.Mui-selected': { color: t.heading },
        },
        textColorInherit: {
          opacity: 1,
        },
      },
    },
  };
}
