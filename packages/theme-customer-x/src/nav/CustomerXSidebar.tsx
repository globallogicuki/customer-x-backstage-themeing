import { Sidebar, useSidebarOpenState } from '@backstage/core-components';
import { cx } from '../cx';
import type {
  NavContentNavItem,
  NavContentNavItems,
} from '@backstage/plugin-app-react';
import { makeStyles } from '@material-ui/core';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import { ReactNode, useCallback, useState } from 'react';
import { tokensFor } from '../theme/modes';
import { BrandBlock } from './BrandBlock';
import { NavItem } from './NavItem';
import { NavSearch } from './NavSearch';
import { NavSection } from './NavSection';
import { ShortcutsDialog } from './ShortcutsDialog';
import { useGlobalShortcuts } from './useGlobalShortcuts';
import { UserMenu } from './UserMenu';

const useStyles = makeStyles(theme => ({
  scroll: {
    width: '100%',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  bottom: {
    width: '100%',
    paddingTop: 8,
    borderTop: `1px solid ${tokensFor(theme).nav.divider}`,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  footerClosed: { flexDirection: 'column' },
}));

export interface NavSectionConfig {
  label: string;
  /** Page extension IDs: `page:<pluginId>` or `page:<pluginId>/<name>`. */
  ids: string[];
}

/**
 * Default information architecture for the rail. Anything not listed lands
 * in "More"; the host app can pass its own `sections` to change it.
 */
export const DEFAULT_NAV_SECTIONS: NavSectionConfig[] = [
  {
    label: 'Platform',
    ids: [
      'page:customer-x/landing',
      'page:catalog',
      'page:api-docs',
      'page:techdocs',
      'page:catalog-graph',
    ],
  },
  {
    label: 'Build',
    ids: [
      'page:scaffolder',
      'page:catalog-import',
      'page:skills-marketplace/page',
    ],
  },
  {
    label: 'Insight',
    ids: ['page:tech-insights-overview/page', 'page:unleash/page'],
  },
];

const HIDDEN = [
  'page:search',
  'page:home',
  // The extension-tree inspector is a development aid, not a product surface.
  ...(process.env.NODE_ENV === 'production' ? ['page:app-visualizer'] : []),
];
const UTILITY = [
  'page:notifications',
  'page:app-visualizer',
  'page:user-settings',
];

/**
 * Plugins name their pages for a page header, not a 224px rail. Short forms
 * for the ones that would otherwise truncate; anything unlisted keeps its own.
 */
const SHORT_TITLES: Record<string, string> = {
  'Register Existing Component': 'Register',
  'Tech Insights Overview': 'Tech Insights',
  'Skill Marketplace': 'Skills',
};

/**
 * The rail uses one icon family — Material Rounded. Plugins ship whatever
 * they like; the ones that arrive sharp are swapped here so the column reads
 * as one set.
 */
const ICON_OVERRIDES: Record<string, ReactNode> = {
  'page:notifications': <NotificationsRoundedIcon />,
  'page:user-settings': <SettingsRoundedIcon />,
  'page:app-visualizer': <VisibilityRoundedIcon />,
  'page:catalog-graph': <AccountTreeRoundedIcon />,
};

const renderItem = (item: NavContentNavItem) => (
  <NavItem
    key={item.href}
    to={item.href}
    title={SHORT_TITLES[item.title] ?? item.title}
    icon={ICON_OVERRIDES[itemId(item)] ?? item.icon}
    exact={item.href === '/'}
  />
);

/** Nav items don't expose their extension id; the ids we take are known. */
const ID_BY_HREF: Record<string, string> = {
  '/notifications': 'page:notifications',
  '/settings': 'page:user-settings',
  '/visualizer': 'page:app-visualizer',
  '/catalog-graph': 'page:catalog-graph',
};
const itemId = (item: NavContentNavItem) =>
  ID_BY_HREF[item.href.replace(/\/+$/, '')] ?? '';

export interface CustomerXSidebarProps {
  /** Nav items discovered by the app, as passed to `NavContentBlueprint`. */
  navItems: NavContentNavItems;
  /** Section layout; defaults to `DEFAULT_NAV_SECTIONS`. */
  sections?: NavSectionConfig[];
}

const SidebarBody = ({
  navItems,
  sections: sectionConfig = DEFAULT_NAV_SECTIONS,
}: CustomerXSidebarProps) => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const showShortcuts = useCallback(() => setShortcutsOpen(true), []);
  useGlobalShortcuts(showShortcuts);
  const items = navItems.clone();

  HIDDEN.forEach(id => items.take(id));
  const sections = sectionConfig.map(section => ({
    label: section.label,
    items: section.ids
      .map(id => items.take(id))
      .filter((i): i is NavContentNavItem => Boolean(i)),
  }));
  const utility = UTILITY.map(id => items.take(id)).filter(
    (i): i is NavContentNavItem => Boolean(i),
  );
  const more = [...items.rest()].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <BrandBlock />
      <NavSearch />
      <div
        className={classes.scroll}
        // Inline so it beats the drawer's `& > * { flex-shrink: 0 }` rule.
        style={{ flex: '1 1 0px', minHeight: 0, overflowY: 'auto' }}
      >
        {sections
          .filter(s => s.items.length > 0)
          .map(s => (
            <NavSection key={s.label} label={s.label}>
              {s.items.map(i => renderItem(i))}
            </NavSection>
          ))}
        {more.length > 0 && (
          <NavSection label="More">{more.map(i => renderItem(i))}</NavSection>
        )}
      </div>
      <div className={classes.bottom}>
        {utility.map(i => renderItem(i))}
        <div className={cx(classes.footer, !isOpen && classes.footerClosed)}>
          <UserMenu onShowShortcuts={showShortcuts} />
        </div>
      </div>
      <ShortcutsDialog
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  );
};

/**
 * The CustomerX navigation rail. Wraps Backstage's `Sidebar` shell (which owns
 * open/pin state and the page offset) and renders our own items inside it.
 */
export const CustomerXSidebar = (props: CustomerXSidebarProps) => (
  <Sidebar>
    <SidebarBody {...props} />
  </Sidebar>
);
