/* eslint-disable @typescript-eslint/no-explicit-any */
import { brand, font, monoFontFamily, radius } from '../../tokens';
import type { ModeTokens } from '../modes';
import { hairline, searchHighlight } from './shared';

/**
 * Overrides for Backstage's own layout components (`Backstage*` class names
 * from @backstage/core-components): page header, tabs, info cards, tables.
 */
export function createBackstageComponents(t: ModeTokens): Record<string, any> {
  const { n } = t;
  const border = hairline(t);

  // Owned / Starred / All filter box on catalog, APIs, docs and scaffolder
  // pages. Stock paints rgba(0,0,0,.11) behind it. Catalog and scaffolder ship
  // the same component under two class names.
  const listPicker = {
    styleOverrides: {
      root: {
        backgroundColor: n.paper,
        border,
        borderRadius: radius.lg,
        boxShadow: 'none',
        margin: '8px 0 16px',
      },
      title: {
        margin: '12px 0 4px 12px',
        fontSize: font.sm,
        fontWeight: 500,
        letterSpacing: 0,
        textTransform: 'none',
        color: n.textSecondary,
      },
      menuItem: {
        minHeight: 40,
        borderRadius: radius.md,
      },
      groupWrapper: {
        margin: '4px 8px 12px',
      },
    },
  };

  return {
    /* Backstage layout                                                   */
    /* ------------------------------------------------------------------ */
    BackstagePage: {
      styleOverrides: {
        root: {
          backgroundColor: n.bg,
        },
      },
    },
    BackstageHeader: {
      styleOverrides: {
        // On the new frontend system every page already gets the compact
        // plugin header; legacy pages (catalog-import, catalog-graph, …) then
        // render this Header underneath it. Demote it to a plain page title so
        // there is never a second bar.
        header: {
          padding: '28px 32px 4px',
          boxShadow: 'none',
          borderBottom: 'none',
          backgroundImage: 'none',
          backgroundColor: 'transparent',
        },
        title: {
          fontSize: font.xxl,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          color: t.heading,
        },
        subtitle: {
          opacity: 1,
          color: n.textSecondary,
          fontSize: font.md,
          fontWeight: 400,
          marginTop: 4,
        },
        type: {
          color: t.accentText,
          opacity: 1,
          fontSize: font.sm,
          fontWeight: 500,
          letterSpacing: 0,
          textTransform: 'none',
          marginBottom: 8,
        },
        breadcrumb: {
          fontSize: font.base,
          '& a': { color: t.link },
        },
      },
    },
    BackstageHeaderLabel: {
      styleOverrides: {
        root: {
          textAlign: 'left',
          marginLeft: 24,
        },
        label: {
          fontSize: font.sm,
          fontWeight: 400,
          letterSpacing: 0,
          textTransform: 'none',
          color: n.textSecondary,
          opacity: 1,
        },
        value: {
          fontSize: font.md,
          fontWeight: 500,
          color: n.textPrimary,
          marginTop: 2,
        },
      },
    },
    BackstageHeaderTabs: {
      styleOverrides: {
        tabsWrapper: {
          paddingLeft: 24,
          paddingRight: 24,
          backgroundColor: 'transparent',
          borderBottom: border,
        },
        defaultTab: {
          textTransform: 'none',
          fontSize: font.md,
          fontWeight: 500,
          letterSpacing: 0,
          lineHeight: 1.3,
          padding: '14px 16px',
          minHeight: 48,
          color: n.textSecondary,
        },
        selected: {
          color: t.heading,
          fontWeight: 600,
        },
        tabRoot: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: n.textPrimary,
          },
        },
      },
    },
    BackstageContent: {
      styleOverrides: {
        root: {
          paddingTop: 28,
          paddingBottom: 40,
          '@media (min-width: 600px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
    BackstageContentHeader: {
      styleOverrides: {
        title: {
          fontSize: font.xl,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: t.heading,
        },
      },
    },
    BackstageInfoCard: {
      styleOverrides: {
        header: {
          padding: '18px 20px 10px',
        },
        headerTitle: {
          fontSize: font.lg,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.35,
          color: t.heading,
        },
        headerSubheader: {
          paddingTop: 2,
          fontSize: font.base,
          color: n.textSecondary,
        },
      },
    },
    BackstageItemCardHeader: {
      styleOverrides: {
        root: {
          padding: '20px 20px 22px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          '& h3': {
            fontSize: font.sm,
            fontWeight: 400,
            letterSpacing: 0,
            textTransform: 'none',
            opacity: 0.8,
            marginBottom: 4,
          },
          '& h4': {
            fontSize: font.lg,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          },
        },
      },
    },
    BackstageItemCardGrid: {
      styleOverrides: {
        root: {
          gridGap: 20,
        },
      },
    },
    BackstageTableToolbar: {
      styleOverrides: {
        root: {
          padding: '18px 16px 14px 20px',
        },
        title: {
          '& > h6': {
            fontWeight: 600,
            fontSize: font.lg,
            letterSpacing: '-0.01em',
          },
        },
      },
    },
    BackstageTableHeader: {
      styleOverrides: {
        // Backstage's Table shouts its column names (uppercase, 700). Match the
        // MUI table head: quiet sentence case.
        header: {
          borderBottom: border,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: font.sm,
          letterSpacing: 0,
          color: n.textSecondary,
          '& .MuiTableSortLabel-root': { textTransform: 'none' },
        },
      },
    },
    BackstageSelectInputBase: {
      styleOverrides: {
        input: {
          borderRadius: radius.md,
          backgroundColor: n.paper,
          border,
          fontSize: font.md,
          padding: '10px 32px 10px 12px',
          '&:focus': {
            borderRadius: radius.md,
            borderColor: brand.cyan,
            boxShadow: t.focusRing,
          },
        },
      },
    },
    BackstageStatus: {
      styleOverrides: {
        status: {
          fontWeight: 500,
        },
      },
    },
    BackstageWarningPanel: {
      styleOverrides: {
        panel: {
          borderRadius: radius.md,
          boxShadow: 'none',
        },
      },
    },
    BackstageMarkdownContent: {
      styleOverrides: {
        markdown: {
          fontSize: font.md,
          lineHeight: 1.6,
          '& code': {
            fontFamily: monoFontFamily,
            fontSize: '0.9em',
            padding: '1px 5px',
            borderRadius: 4,
            backgroundColor: t.chipBg,
          },
          '& a': { color: t.link, fontWeight: 500 },
          '& h2': { fontSize: font.xl, fontWeight: 600, marginTop: 8 },
          '& h3': { fontSize: font.lg, fontWeight: 600 },
        },
      },
    },

    /* ------------------------------------------------------------------ */
    /* Plugin components with themeable class names                       */
    /* ------------------------------------------------------------------ */
    CatalogReactUserListPicker: listPicker,
    ScaffolderReactOwnerListPicker: listPicker,
    // Search result term highlighting (modal + search page)
    BackstageHighlightedSearchResultText: {
      styleOverrides: {
        highlight: searchHighlight(t),
      },
    },
    // Stock illustrations (grey browser art, "dropped the mic") are off-brand;
    // let the copy stand on our surfaces until brand artwork exists.
    BackstageEmptyStateImage: {
      styleOverrides: {
        generalImg: { display: 'none' },
      },
    },
    // Plugin empty states take the StatePanel shape: centred, one line, one
    // action, no illustration. (The primitive itself is for the app's pages.)
    BackstageEmptyState: {
      styleOverrides: {
        root: {
          backgroundColor: n.paper,
          borderRadius: radius.lg,
          border,
          padding: '40px 24px',
          textAlign: 'center',
          '& h2, & h5, & .MuiTypography-h5': {
            fontSize: font.lg,
            fontWeight: 600,
            color: t.heading,
          },
          '& .MuiTypography-body1, & p': {
            fontSize: font.md,
            color: n.textSecondary,
            lineHeight: 1.55,
          },
        },
        imageContainer: { display: 'none' },
        action: { marginTop: 12 },
      },
    },
    // Scaffolder's multi-step form: quiet frame, sentence-case footer buttons
    // with the primary on the right.
    BackstageTemplateStepper: {
      styleOverrides: {
        formWrapper: {
          padding: '8px 4px 0',
          '& .MuiFormControl-root': { marginBottom: 8 },
          '& .MuiFormHelperText-root': { fontSize: font.sm },
        },
        footer: {
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
          marginTop: 24,
          paddingTop: 16,
          borderTop: border,
        },
        backButton: { marginRight: 'auto' },
      },
    },
    ScaffolderReactTemplateCategoryPicker: {
      styleOverrides: {
        label: {
          fontSize: font.sm,
          fontWeight: 500,
          letterSpacing: 0,
          textTransform: 'none',
          color: n.textSecondary,
        },
      },
    },
    // Relations graph: nodes are cards, not pills — hairline, radius, navy text.
    PluginCatalogGraphCustomNode: {
      styleOverrides: {
        node: {
          fill: n.paper,
          stroke: n.borderStrong,
          strokeWidth: 1,
          rx: radius.md,
          '&.primary': { fill: t.accentWash, stroke: brand.cyan },
          '&.secondary': { fill: n.paperMuted, stroke: n.border },
        },
        text: {
          fill: t.heading,
          fontWeight: 500,
          fontSize: font.base,
          '&.primary': { fill: t.heading },
          '&.secondary': { fill: n.textSecondary },
          '&.focused': { fontWeight: 600 },
        },
        clickable: { cursor: 'pointer' },
      },
    },
    PluginCatalogGraphCustomLabel: {
      styleOverrides: {
        text: { fill: n.textSecondary, fontSize: font.xs },
        secondary: { fill: n.textDisabled },
      },
    },
    PluginCatalogGraphEntityRelationsGraph: {
      styleOverrides: {
        container: { backgroundColor: n.paper, borderRadius: radius.lg },
      },
    },
    BackstageErrorPageMicDrop: {
      styleOverrides: {
        micDrop: { display: 'none' },
      },
    },
    BackstageErrorPage: {
      styleOverrides: {
        container: {
          paddingTop: 48,
          maxWidth: 640,
          '& .MuiGrid-item img': { display: 'none' },
        },
        title: {
          fontSize: font.display,
          fontWeight: 600,
          letterSpacing: '-0.02em',
        },
        subtitle: {
          fontSize: font.base,
          fontWeight: 400,
          letterSpacing: 0,
          color: t.accentText,
        },
      },
    },
    // "VIEW SOURCE / VIEW TECHDOCS" links in the About card
    BackstageIconLinkVertical: {
      styleOverrides: {
        label: {
          textTransform: 'none',
          letterSpacing: 0,
          fontSize: font.sm,
          fontWeight: 500,
        },
      },
    },

    /* ------------------------------------------------------------------ */
    /* Sidebar shell (items are rendered by the custom CustomerXSidebar)   */
    /* ------------------------------------------------------------------ */
    BackstageSidebar: {
      styleOverrides: {
        drawer: {
          // One flat fill. The rail is chrome, not a brand panel — a gradient
          // here is the single loudest "admin template" tell.
          backgroundColor: t.nav.background,
          borderRight: `1px solid ${t.nav.divider}`,
        },
      },
    },

    /* Sign in                                                            */
    /* ------------------------------------------------------------------ */
    BackstageSignInPage: {
      styleOverrides: {
        container: {
          padding: 32,
        },
        item: {
          maxWidth: 420,
        },
      },
    },
  };
}
