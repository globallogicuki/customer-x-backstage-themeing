/* eslint-disable @typescript-eslint/no-explicit-any */
import { brand, monoFontFamily, radius } from '../../tokens';
import type { ModeTokens } from '../modes';

/**
 * Overrides for Backstage's own layout components (`Backstage*` class names
 * from @backstage/core-components): page header, tabs, info cards, tables.
 */
export function createBackstageComponents(t: ModeTokens): Record<string, any> {
  const { n } = t;
  const isDark = t.mode === 'dark';
  const border = `1px solid ${n.border}`;

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
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        },
        subtitle: {
          opacity: 0.72,
          fontSize: 14,
          fontWeight: 400,
          marginTop: 6,
        },
        type: {
          color: t.header.type,
          opacity: 1,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.10em',
          marginBottom: 8,
        },
        breadcrumb: {
          fontSize: 13,
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
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: n.textSecondary,
          opacity: 1,
        },
        value: {
          fontSize: 14,
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
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: 0,
          lineHeight: 1.3,
          padding: '14px 16px',
          minHeight: 48,
          color: n.textSecondary,
        },
        selected: {
          color: n.textPrimary,
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
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '-0.01em',
        },
      },
    },
    BackstageInfoCard: {
      styleOverrides: {
        header: {
          padding: '18px 20px 10px',
        },
        headerTitle: {
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.35,
        },
        headerSubheader: {
          paddingTop: 2,
          fontSize: 13,
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
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.8,
            marginBottom: 6,
          },
          '& h4': {
            fontSize: 18,
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
            fontSize: 16,
            letterSpacing: '-0.01em',
          },
        },
      },
    },
    BackstageTableHeader: {
      styleOverrides: {
        header: {
          borderBottom: border,
        },
      },
    },
    BackstageSelectInputBase: {
      styleOverrides: {
        input: {
          borderRadius: radius.md,
          backgroundColor: n.paper,
          border,
          fontSize: 14,
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
          fontSize: 14,
          lineHeight: 1.6,
          '& code': {
            fontFamily: monoFontFamily,
            fontSize: '0.9em',
            padding: '1px 5px',
            borderRadius: 4,
            backgroundColor: isDark ? '#1B2F41' : '#EEF2F6',
          },
          '& a': { color: t.link, fontWeight: 500 },
          '& h2': { fontSize: 20, fontWeight: 600, marginTop: 8 },
          '& h3': { fontSize: 16, fontWeight: 600 },
        },
      },
    },

    /* ------------------------------------------------------------------ */
    /* Plugin components with themeable class names                       */
    /* ------------------------------------------------------------------ */
    // Owned / Starred / All filter box on catalog, APIs, docs and scaffolder
    // pages. Stock paints rgba(0,0,0,.11) behind it.
    CatalogReactUserListPicker: {
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
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
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
    },
    ScaffolderReactOwnerListPicker: {
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
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
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
    },
    // Search result term highlighting (modal + search page)
    BackstageHighlightedSearchResultText: {
      styleOverrides: {
        highlight: {
          backgroundColor: isDark
            ? 'rgba(0, 174, 239, 0.30)'
            : 'rgba(0, 174, 239, 0.22)',
          color: 'inherit',
          borderRadius: 2,
          padding: '0 1px',
        },
      },
    },
    // Stock illustrations (grey browser art, "dropped the mic") are off-brand;
    // let the copy stand on our surfaces until brand artwork exists.
    BackstageEmptyStateImage: {
      styleOverrides: {
        generalImg: { display: 'none' },
      },
    },
    BackstageEmptyState: {
      styleOverrides: {
        root: {
          backgroundColor: n.paper,
          borderRadius: radius.lg,
          border,
        },
      },
    },
    BackstageErrorPageMicDrop: {
      styleOverrides: {
        micDrop: { display: 'none' },
      },
    },
    BackstageErrorPage: {
      styleOverrides: {
        container: { paddingTop: 48 },
        title: {
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        },
        subtitle: {
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: t.header.type,
        },
      },
    },
    // "VIEW SOURCE / VIEW TECHDOCS" links in the About card
    BackstageIconLinkVertical: {
      styleOverrides: {
        label: {
          textTransform: 'none',
          letterSpacing: 0,
          fontSize: 12.5,
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
          background: `linear-gradient(180deg, ${t.nav.background} 0%, ${t.nav.backgroundEnd} 100%)`,
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
