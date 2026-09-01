import { useShadowRoot } from '@backstage/plugin-techdocs-react';
import { useTheme } from '@material-ui/core';
import { useEffect } from 'react';
import { tokensFor } from '../theme/modes';
import { font, fontFamily, monoFontFamily, radius } from '../tokens';

const STYLE_ID = 'accelerate-techdocs-theme';

/**
 * The stylesheet injected into the TechDocs reader's shadow root.
 *
 * Backstage already maps mkdocs-material's `--md-*` variables and heading
 * sizes from the MUI theme, so colours and the type scale arrive for free.
 * This layer adds what the variables can't express: the typeface, link colour
 * at text weight, code blocks, tables, admonitions and the in-page nav — so a
 * docs page reads as the same product as the entity page around it.
 */
function buildCss(theme: ReturnType<typeof useTheme>): string {
  const t = tokensFor(theme as any);
  const { n } = t;
  return `
/* Accelerate TechDocs theme — see packages/theme-customer-x/src/techdocs */
:host {
  --md-text-font: ${fontFamily};
  --md-code-font: ${monoFontFamily};
  --md-typeset-font-size: ${font.md}px;
  --md-accent-fg-color: ${t.link};
  --md-accent-fg-color--transparent: ${t.selectedOverlay};
  --md-code-bg-color: ${n.paperMuted};
  --md-default-bg-color: ${n.paper};
  --md-shadow-z1: none;
  --md-shadow-z2: none;
  --md-shadow-z3: none;
}
.md-typeset { line-height: 1.65; color: ${n.textPrimary}; }
.md-typeset h1, .md-typeset h2, .md-typeset h3, .md-typeset h4 {
  color: ${t.heading};
  letter-spacing: -0.015em;
  font-weight: 600;
}
.md-typeset h1 { margin-bottom: 0.6em; }
.md-typeset h2 { margin-top: 2em; padding-bottom: 0.3em; border-bottom: 1px solid ${n.border}; }

/* Links */
.md-typeset a { color: ${t.link}; font-weight: 500; text-decoration: none; }
.md-typeset a:hover, .md-typeset a:focus { color: ${t.linkHover}; text-decoration: underline; }

/* Code */
.md-typeset code, .md-typeset kbd, .md-typeset pre {
  font-family: ${monoFontFamily};
  font-size: 0.875em;
}
.md-typeset code {
  background: ${t.chipBg};
  border-radius: 4px;
  padding: 0.1em 0.35em;
  color: ${n.textPrimary};
}
.md-typeset pre > code {
  background: transparent;
  padding: 0;
  border-radius: 0;
}
.md-typeset pre {
  background: ${n.paperMuted};
  border: 1px solid ${n.border};
  border-radius: ${radius.md}px;
  padding: 14px 16px;
  line-height: 1.6;
}
.md-typeset .highlight, .md-typeset .highlighttable { background: transparent; }
.md-clipboard { color: ${n.textDisabled}; }
.md-clipboard:hover { color: ${t.link}; }

/* Tables */
.md-typeset table:not([class]) {
  border: 1px solid ${n.border};
  border-radius: ${radius.md}px;
  font-size: ${font.base}px;
  box-shadow: none;
}
.md-typeset table:not([class]) th {
  background: ${n.paperMuted};
  color: ${n.textSecondary};
  font-size: ${font.sm}px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  border-bottom: 1px solid ${n.border};
  padding: 10px 14px;
}
.md-typeset table:not([class]) td {
  border-top: 1px solid ${n.border};
  padding: 10px 14px;
  vertical-align: top;
}
.md-typeset table:not([class]) tr:hover { background: ${t.hoverOverlay}; }

/* Admonitions */
.md-typeset .admonition, .md-typeset details {
  border-radius: ${radius.md}px;
  border-width: 0 0 0 3px;
  box-shadow: none;
  background: ${n.paperMuted};
  font-size: ${font.base}px;
}
.md-typeset .admonition-title, .md-typeset summary {
  font-weight: 600;
  background: transparent !important;
}
.md-typeset .admonition.info, .md-typeset .admonition.note { border-color: ${t.tint.info.border}; }
.md-typeset .admonition.info > .admonition-title::before,
.md-typeset .admonition.note > .admonition-title::before { background-color: ${t.tint.info.border}; }
.md-typeset .admonition.tip, .md-typeset .admonition.success { border-color: ${t.tint.ok.border}; }
.md-typeset .admonition.tip > .admonition-title::before,
.md-typeset .admonition.success > .admonition-title::before { background-color: ${t.tint.ok.border}; }
.md-typeset .admonition.warning { border-color: ${t.tint.warning.border}; }
.md-typeset .admonition.warning > .admonition-title::before { background-color: ${t.tint.warning.border}; }
.md-typeset .admonition.danger, .md-typeset .admonition.failure, .md-typeset .admonition.bug { border-color: ${t.tint.error.border}; }
.md-typeset .admonition.danger > .admonition-title::before,
.md-typeset .admonition.failure > .admonition-title::before,
.md-typeset .admonition.bug > .admonition-title::before { background-color: ${t.tint.error.border}; }

/* Blockquotes */
.md-typeset blockquote {
  border-left: 3px solid ${t.tint.info.border};
  color: ${n.textSecondary};
}

/* Navigation (left) and table of contents (right) */
.md-nav { font-size: ${font.base}px; }
.md-nav__title { color: ${t.heading}; font-weight: 600; font-size: ${font.sm}px; }
.md-nav__link { color: ${n.textSecondary}; border-radius: ${radius.sm}px; }
.md-nav__link:hover { color: ${n.textPrimary}; }
.md-nav__link--active, .md-nav__link--active:hover { color: ${t.link}; font-weight: 600; text-decoration: none; }
.md-nav__item .md-nav__link--active { background: transparent; }
.md-sidebar__scrollwrap { scrollbar-color: ${n.textVerySubtle} transparent; }

/* Footer prev/next. Backstage pins the footer to the viewport
   (position: fixed, pointer-events: none), which leaves the transparent
   links floating over the page body. Back into flow at the end of the doc,
   where the border-top reads as the page's closing rule. Kept to the
   content column (Backstage's 16rem sidebar width) so it never slides
   under the fixed sidebars. */
.md-footer {
  position: static;
  pointer-events: auto;
  background: transparent;
  margin-left: 16rem;
  max-width: calc(100% - 16rem * 2);
}
/* Backstage sizes the fixed sidebars in JS as (footer viewport top − sidebar
   top), assuming the footer is pinned to the viewport. With the footer in
   flow that height overflows the viewport and the over-constrained box
   renders against the stylesheet's bottom: 75px instead of its top. Ignore
   the JS height (!important beats the inline style); the box then runs from
   the JS top to that bottom, independent of where the footer is. */
.md-sidebar {
  height: auto !important;
}
.md-footer__inner { border-top: 1px solid ${n.border}; }
.md-footer__link { color: ${n.textSecondary}; background: transparent; }
.md-footer__link:hover { color: ${t.link}; }
.md-footer__title { color: ${t.heading}; }

/* Search-term highlight (from the ⌘K palette) */
.md-typeset mark { background: ${t.searchHighlight}; color: inherit; border-radius: 2px; }
`;
}

/**
 * TechDocs addon that styles the reader to match the portal. Mount it at the
 * `Content` addon location; it renders nothing and only manages one
 * `<style>` element inside the reader's shadow root.
 */
export const TechDocsThemeAddon = () => {
  const shadowRoot = useShadowRoot();
  const theme = useTheme();

  useEffect(() => {
    if (!shadowRoot) return undefined;
    let style = shadowRoot.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      shadowRoot.appendChild(style);
    }
    style.textContent = buildCss(theme);
    return undefined;
  }, [shadowRoot, theme]);

  return null;
};
