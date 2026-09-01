/* eslint-disable @typescript-eslint/no-explicit-any */
import { brand, radius } from '../../../tokens';
import type { ModeTokens } from '../../modes';

/**
 * Form fields. `MuiTextField`'s default variant is set here too, which
 * reshapes raw MUI usage in plugins without touching their code.
 */
export function inputComponents(t: ModeTokens) {
  const { n } = t;

  return {
    MuiTextField: {
      defaultProps: { variant: 'outlined' },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          backgroundColor: n.paper,
          fontSize: 14,
          transition: 'border-color 120ms ease',
          '&:hover $notchedOutline, &:hover .MuiOutlinedInput-notchedOutline, &:hover .v5-MuiOutlinedInput-notchedOutline':
            {
              borderColor: n.borderStrong,
            },
          // No outer glow here: the floating label sits in the outline's
          // notch and a box-shadow ring bleeds through behind its text.
          // A thicker accent border gives the same affordance legibly.
          '&$focused $notchedOutline, &.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused .v5-MuiOutlinedInput-notchedOutline':
            {
              borderColor: brand.cyan,
              borderWidth: 2,
            },
        },
        notchedOutline: {
          borderColor: n.border,
          transition: 'border-color 120ms ease',
        },
        input: {
          padding: '11px 14px',
        },
        inputMarginDense: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: radius.md,
          backgroundColor: n.paperMuted,
          '&:hover': { backgroundColor: t.chipBg },
          '&$focused, &.Mui-focused': {
            backgroundColor: n.paper,
            boxShadow: t.focusRing,
          },
        },
        underline: {
          '&:before, &:after': { display: 'none' },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { fontSize: 14 },
        input: {
          '&::placeholder': { color: n.textDisabled, opacity: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: 14 },
        outlined: {
          transform: 'translate(14px, 13px) scale(1)',
          '&$shrink, &.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.8)',
            padding: '0 4px',
            marginLeft: -4,
            backgroundColor: n.paper,
            borderRadius: 3,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: n.textSecondary,
          fontWeight: 500,
          '&$focused, &.Mui-focused': { color: t.link },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { fontSize: 12, marginTop: 6 },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
            borderRadius: radius.md,
          },
        },
        icon: { color: n.textSecondary },
      },
    },
  };
}
