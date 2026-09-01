/* eslint-disable @typescript-eslint/no-explicit-any */
import { brand, monoFontFamily } from '../../../tokens';
import { createGlobalCss } from '../../globalCss';
import type { ModeTokens } from '../../modes';
import { searchHighlight } from '../shared';

/**
 * Document-level styling. This is also the only place `@backstage/ui`'s CSS
 * variables can be emitted from, so they are generated here from the same
 * tokens (see `globalCss.ts`).
 */
export function globalComponents(t: ModeTokens, defaults: any) {
  const { n } = t;

  return {
    MuiCssBaseline: {
      styleOverrides: (theme: any) => {
        // Backstage's baseline sets `a { color: inherit }`. Being unlayered,
        // that beats @backstage/ui's `@layer components` rules on <a>-based
        // components (ButtonLink, Link), which then lose their own colour.
        // Keep the reset for plain anchors only.
        const { a: _anchor, ...base } =
          defaults.MuiCssBaseline.styleOverrides(theme);
        return {
          ...base,
          // :where() keeps element-level specificity, so this still loses to
          // any class rule exactly like the original `a { … }` did.
          'a:where(:not([class*="bui-"]))': {
            color: 'inherit',
            textDecoration: 'none',
          },
          html: {
            ...base.html,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          },
          body: {
            ...base.body,
            backgroundColor: n.bg,
            color: n.textPrimary,
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontFeatureSettings: '"cv11", "ss01", "ss03"',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              backgroundColor: 'transparent',
              width: 10,
              height: 10,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: n.textVerySubtle,
              border: `2px solid ${n.bg}`,
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: n.textDisabled,
              },
          },
          code: { fontFamily: monoFontFamily },
          pre: { fontFamily: monoFontFamily },
          mark: searchHighlight(t),
          '::selection': { backgroundColor: t.searchHighlight },
          ':focus-visible': {
            outline: `2px solid ${brand.cyan}`,
            outlineOffset: 2,
          },
          // @backstage/ui CSS variables + globals, derived from the same tokens.
          ...createGlobalCss(t),
        };
      },
    },
  };
}
