/* eslint-disable @typescript-eslint/no-explicit-any */
import { interactive, radius } from '../../../tokens';
import type { ModeTokens } from '../../modes';
import { hairline } from '../shared';

/** Paper, cards, dialogs, menus, tooltips — anything that reads as a surface. */
export function surfaceComponents(t: ModeTokens) {
  const { n, shadows } = t;
  const isDark = t.mode === 'dark';
  const border = hairline(t);

  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: radius.lg,
        },
        outlined: {
          border,
        },
        elevation1: {
          boxShadow: 'none',
          border,
        },
        elevation2: {
          boxShadow: shadows.sm,
          border,
        },
        elevation3: { boxShadow: shadows.md },
        elevation4: { boxShadow: shadows.md },
        elevation6: { boxShadow: shadows.md },
        elevation8: { boxShadow: shadows.lg, border },
        elevation16: { boxShadow: shadows.lg },
        elevation24: { boxShadow: shadows.lg },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          borderRadius: radius.lg,
          border,
          boxShadow: 'none',
          backgroundImage: 'none',
          overflow: 'hidden',
          transition: interactive.transition,
          // Any card wrapping a CardActionArea (plugin cards, template cards)
          // hovers exactly like the design system's interactive SurfaceCard:
          // the border firms up and the fill warms. No lift, no shadow.
          '&:has(.MuiCardActionArea-root, .v5-MuiCardActionArea-root):hover': {
            borderColor: t.secondary.main,
            backgroundColor: n.paperMuted,
          },
        },
      },
    },
    MuiCardActionArea: {
      // The Material ripple reads as Android, not SaaS.
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          // Drop the grey wash on hover; keep it for keyboard focus (a11y).
          '&:hover $focusHighlight, &:hover .MuiCardActionArea-focusHighlight, &:hover .v5-MuiCardActionArea-focusHighlight':
            { opacity: 0 },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '18px 20px 10px',
        },
        title: {
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.35,
          color: t.heading,
        },
        subheader: {
          fontSize: 13,
          color: n.textSecondary,
          marginTop: 2,
        },
        action: {
          marginTop: -4,
          marginRight: -4,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '12px 20px 20px',
          '&:last-child': { paddingBottom: 20 },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '8px 16px 16px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { backgroundColor: n.border },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border,
          borderRadius: radius.md,
          '&:before': { display: 'none' },
          '&$expanded, &.Mui-expanded': { margin: 0 },
        },
        rounded: {
          '&:first-child': {
            borderTopLeftRadius: radius.md,
            borderTopRightRadius: radius.md,
          },
          '&:last-child': {
            borderBottomLeftRadius: radius.md,
            borderBottomRightRadius: radius.md,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: radius.xl,
          boxShadow: shadows.lg,
          border,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: { padding: '24px 24px 8px' },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: { padding: '8px 24px 16px' },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: { padding: '12px 24px 24px' },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: isDark
            ? 'rgba(3, 9, 15, 0.7)'
            : 'rgba(11, 31, 51, 0.45)',
          backdropFilter: 'blur(2px)',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: radius.md,
          boxShadow: shadows.lg,
          border,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: radius.md,
          boxShadow: shadows.lg,
          border,
        },
        list: {
          padding: 6,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          borderRadius: radius.sm,
          minHeight: 36,
          padding: '8px 10px',
          '&:hover': { backgroundColor: t.hoverOverlay },
          '&$selected, &.Mui-selected': {
            backgroundColor: t.selectedOverlay,
            '&:hover': { backgroundColor: t.selectedOverlay },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        button: {
          borderRadius: radius.sm,
          '&:hover': { backgroundColor: t.hoverOverlay },
        },
      },
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: {
          backgroundColor: t.inverse.bg,
          color: t.inverse.fg,
          fontSize: 12,
          fontWeight: 500,
          borderRadius: radius.sm,
          padding: '6px 10px',
          boxShadow: shadows.md,
        },
        arrow: {
          color: t.inverse.bg,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          backgroundColor: t.inverse.bg,
          color: t.inverse.fg,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          fontSize: 14,
        },
      },
    },
  };
}
