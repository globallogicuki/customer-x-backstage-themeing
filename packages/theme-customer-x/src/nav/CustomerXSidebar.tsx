import { Sidebar } from '@backstage/core-components';
import type {
  NavContentNavItem,
  NavContentNavItems,
} from '@backstage/plugin-app-react';
import { makeStyles } from '@material-ui/core';
import { BrandBlock } from './BrandBlock';
import { NavItem } from './NavItem';
import { NavSearch } from './NavSearch';
import { NavSection } from './NavSection';
import { UserFooter } from './UserFooter';

const useStyles = makeStyles({
  scroll: {
    width: '100%',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  bottom: {
    width: '100%',
    paddingTop: 8,
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
});

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

const HIDDEN = ['page:search', 'page:home'];
const UTILITY = [
  'page:notifications',
  'page:app-visualizer',
  'page:user-settings',
];

const renderItem = (item: NavContentNavItem) => (
  <NavItem
    key={item.href}
    to={item.href}
    title={item.title}
    icon={item.icon}
    exact={item.href === '/'}
  />
);

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
              {s.items.map(renderItem)}
            </NavSection>
          ))}
        {more.length > 0 && (
          <NavSection label="More">{more.map(renderItem)}</NavSection>
        )}
      </div>
      <div className={classes.bottom}>
        {utility.map(renderItem)}
        <UserFooter />
      </div>
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
