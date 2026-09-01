import { Link } from '@backstage/core-components';
import { useApi, useApiHolder } from '@backstage/core-plugin-api';
import { visitsApiRef, type Visit } from '@backstage/plugin-home';
import {
  catalogApiRef,
  EntityRefLink,
  useStarredEntities,
} from '@backstage/plugin-catalog-react';
import { type Entity, parseEntityRef } from '@backstage/catalog-model';
import { useSearchModal } from '@backstage/plugin-search';
import { CustomerXSearchModal } from '../search';
import { useCurrentUser } from '../useCurrentUser';
import {
  ActionCard,
  HeroBanner,
  ListRow,
  PanelCard,
  Pill,
  SectionHeading,
  Skeleton,
  StatTile,
} from '../components';
import { Grid, makeStyles } from '@material-ui/core';
import { tokensFor } from '../theme/modes';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import PersonOffRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import { ReactNode } from 'react';
import useAsync from 'react-use/esm/useAsync';
import { brand, font, radius, rgba } from '../tokens';

// Page-specific chrome only; every card is a design-system primitive.
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    backgroundColor: theme.palette.background.default,
  },
  // The one element in the hero allowed to be big. Everything a person comes
  // here to do starts with finding something, so finding something is the
  // page's opening move. A white card on the Dark Blue; it opens the same
  // ⌘K modal as the rail so there is one search, not two.
  search: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    maxWidth: 680,
    height: 56,
    padding: '0 18px',
    boxSizing: 'border-box',
    borderRadius: radius.lg,
    border: 'none',
    background: theme.palette.background.paper,
    boxShadow: tokensFor(theme).shadows.lg,
    color: theme.palette.text.secondary,
    font: 'inherit',
    fontSize: font.lg,
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'box-shadow 120ms ease',
    '& svg': { color: theme.palette.secondary.main, flexShrink: 0 },
    '&:hover, &:focus-visible': {
      outline: 'none',
      boxShadow: `${tokensFor(theme).shadows.lg}, 0 0 0 3px ${brand.cyan}`,
    },
  },
  searchLabel: { flex: 1 },
  kbd: {
    fontFamily: 'inherit',
    fontSize: font.sm,
    fontWeight: 500,
    // Secondary, not disabled: it's a hint people read (AA at 12px).
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: radius.sm,
    padding: '3px 6px',
    lineHeight: 1,
  },
  chips: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 32,
    padding: '0 14px',
    borderRadius: radius.pill,
    border: `1px solid ${rgba(brand.white, 0.18)}`,
    background: rgba(brand.white, 0.08),
    color: brand.white,
    fontSize: font.base,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'background-color 120ms ease, border-color 120ms ease',
    '&:hover': {
      background: rgba(brand.white, 0.16),
      borderColor: rgba(brand.white, 0.3),
    },
    '&:focus-visible': {
      outline: `2px solid ${brand.cyan}`,
      outlineOffset: 2,
    },
    '& svg': { width: 16, height: 16, color: brand.cyanLight },
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 32px 40px',
    [theme.breakpoints.down('sm')]: { padding: '0 20px 32px' },
  },
  // The counted figures ride up over the hero's bottom edge so the banner
  // and the page below read as one composition rather than two stacked blocks.
  stats: {
    marginTop: -36,
    position: 'relative',
    zIndex: 1,
    animation: '$rise 320ms cubic-bezier(0.2, 0.7, 0.2, 1) 120ms both',
  },
  '@keyframes rise': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'none' },
  },
  panels: { display: 'grid', gap: 16 },
  star: { color: theme.palette.gold },
}));

const timeOfDay = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
};

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad/.test(navigator.platform);

/** How long ago, in the coarsest unit that is still honest. */
function ago(timestamp: number): string {
  const s = Math.max(1, Math.round((Date.now() - timestamp) / 1000));
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr${h === 1 ? '' : 's'} ago`;
  const d = Math.round(h / 24);
  return d === 1 ? 'yesterday' : `${d} days ago`;
}

const TECHDOCS_ANNOTATION = 'backstage.io/techdocs-ref';

const ACTIONS: Array<{
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
}> = [
  {
    title: 'Create from a template',
    description: 'Scaffold a service with CI, ownership and alerts wired in.',
    icon: <AddCircleOutlineRoundedIcon />,
    to: '/create',
  },
  {
    title: 'Register a component',
    description: 'Add an existing repository to the catalogue.',
    icon: <AccountTreeRoundedIcon />,
    to: '/catalog-import',
  },
  {
    title: 'Read the docs',
    description: 'TechDocs for every service, API and system.',
    icon: <DescriptionRoundedIcon />,
    to: '/docs',
  },
  {
    title: 'Check scorecards',
    description: 'How the estate measures up against engineering standards.',
    icon: <AssessmentRoundedIcon />,
    to: '/tech-insights-overview',
  },
  {
    title: 'Browse skills',
    description: 'Approved AI skills you can install for your team.',
    icon: <StorefrontRoundedIcon />,
    to: '/skills',
  },
  {
    title: 'Manage feature flags',
    description: 'Unleash toggles across every environment.',
    icon: <FlagRoundedIcon />,
    to: '/unleash',
  },
];

const entityHref = (e: Entity) =>
  `/catalog/${e.metadata.namespace ?? 'default'}/${e.kind.toLowerCase()}/${
    e.metadata.name
  }`;

/** Placeholder rows shown while a panel's contents load. */
const LoadingRows = ({ count }: { count: number }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <ListRow
        key={i}
        title={<Skeleton width={`${60 - i * 8}%`} height={14} />}
        meta={<Skeleton width="30%" height={12} />}
      />
    ))}
  </>
);

export const LandingPage = () => {
  const classes = useStyles();
  const catalogApi = useApi(catalogApiRef);
  const { starredEntities } = useStarredEntities();
  const { firstName } = useCurrentUser();
  const { state: searchState, toggleModal } = useSearchModal();

  // Catalogue health rather than raw counts: the two figures that should
  // move (documented, unowned) sit next to the two that give them scale.
  const { value: health, loading: healthLoading } = useAsync(async () => {
    const [components, apis] = await Promise.all([
      catalogApi.queryEntities({
        filter: { kind: 'component' },
        fields: ['metadata.name', 'metadata.annotations', 'spec.owner'],
        limit: 1000,
      }),
      catalogApi
        .queryEntities({ filter: { kind: 'api' }, limit: 1 })
        .then(r => r.totalItems)
        .catch(() => undefined),
    ]);
    const total = components.totalItems;
    const items = components.items;
    const documented = items.filter(
      e => e.metadata.annotations?.[TECHDOCS_ANNOTATION],
    ).length;
    const unowned = items.filter(e => !e.spec?.owner).length;
    return {
      components: total,
      apis,
      documentedPct: items.length ? Math.round((documented / items.length) * 100) : 0,
      documented,
      unowned,
    };
  }, [catalogApi]);

  // Recently viewed comes from plugin-home's visits API, which records every
  // route change. Only entity visits are shown — a person is looking for the
  // service they were just on, not the tab they had open — and each entity
  // appears once, at its most recent visit, linking to its overview.
  const visitsApi = useApiHolder().get(visitsApiRef);
  const { value: visits } = useAsync(
    () =>
      visitsApi
        ? visitsApi
            .list({
              limit: 40,
              orderBy: [{ field: 'timestamp', direction: 'desc' }],
            })
            .then(all => {
              const seen = new Set<string>();
              const out: Visit[] = [];
              for (const v of all) {
                if (!v.entityRef || seen.has(v.entityRef)) continue;
                seen.add(v.entityRef);
                const { kind, namespace, name } = parseEntityRef(v.entityRef);
                out.push({
                  ...v,
                  name,
                  pathname: `/catalog/${namespace}/${kind}/${name}`,
                });
                if (out.length === 5) break;
              }
              return out;
            })
            .catch(() => [] as Visit[])
        : Promise.resolve([] as Visit[]),
    [visitsApi],
  );

  const { value: recent, loading: recentLoading } = useAsync(
    () =>
      catalogApi
        .queryEntities({
          filter: { kind: 'component' },
          limit: 6,
          orderFields: [{ field: 'metadata.name', order: 'asc' }],
        })
        .then(r => r.items)
        .catch(() => [] as Entity[]),
    [catalogApi],
  );

  const starred = [...starredEntities].slice(0, 6);

  return (
    <div className={classes.root}>
      <HeroBanner
        eyebrow="Accelerate · Developer Platform"
        title={`Good ${timeOfDay()}${firstName ? `, ${firstName}` : ''}.`}
        subtitle="Find any service, API or team, and ship on the golden path."
      >
        <button
          type="button"
          onClick={toggleModal}
          className={classes.search}
          aria-label="Search the platform"
        >
          <SearchRoundedIcon />
          <span className={classes.searchLabel}>
            Search services, APIs, docs and teams
          </span>
          <kbd className={classes.kbd}>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
        </button>
        <div className={classes.chips}>
          <Link to="/create" underline="none" className={classes.chip}>
            <AddCircleOutlineRoundedIcon /> New service
          </Link>
          <Link to="/catalog-import" underline="none" className={classes.chip}>
            <AccountTreeRoundedIcon /> Register existing
          </Link>
          <Link to="/api-docs" underline="none" className={classes.chip}>
            <ExtensionRoundedIcon /> Browse APIs
          </Link>
          <Link to="/docs" underline="none" className={classes.chip}>
            <DescriptionRoundedIcon /> Read the docs
          </Link>
        </div>
        <CustomerXSearchModal {...searchState} toggleModal={toggleModal} />
      </HeroBanner>

      <div className={classes.content}>
        <Grid container spacing={2} className={classes.stats}>
          <Grid item xs={12} sm={6} md={3}>
            <StatTile
              label="Components"
              value={healthLoading ? undefined : (health?.components ?? '—')}
              icon={<WidgetsRoundedIcon />}
              to="/catalog?filters[kind]=component"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatTile
              label="APIs"
              value={healthLoading ? undefined : (health?.apis ?? '—')}
              icon={<ExtensionRoundedIcon />}
              to="/catalog?filters[kind]=api"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatTile
              label="Documented"
              value={
                healthLoading ? undefined : `${health?.documentedPct ?? 0}%`
              }
              hint={
                health
                  ? `${health.documented} of ${health.components} components have TechDocs`
                  : undefined
              }
              icon={<DescriptionRoundedIcon />}
              to="/docs"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatTile
              label="Unowned"
              value={healthLoading ? undefined : (health?.unowned ?? '—')}
              hint={
                health
                  ? health.unowned === 0
                    ? 'Every component has an owner'
                    : 'Components with no owner set'
                  : undefined
              }
              tone={health && health.unowned > 0 ? 'warning' : 'default'}
              icon={<PersonOffRoundedIcon />}
              to="/catalog?filters[kind]=component"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SectionHeading>Get started</SectionHeading>
            <Grid container spacing={2}>
              {ACTIONS.map(a => (
                <Grid item xs={12} sm={6} key={a.to}>
                  <ActionCard {...a} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <SectionHeading>Your workspace</SectionHeading>

            <div className={classes.panels}>
              {visits && visits.length > 0 && (
                <PanelCard
                  title="Recently viewed"
                  icon={<HistoryRoundedIcon color="action" />}
                >
                  {visits.map(v => (
                    <ListRow
                      key={v.id}
                      title={<Link to={v.pathname}>{v.name}</Link>}
                      meta={ago(v.timestamp)}
                      trailing={
                        v.entityRef ? (
                          <Pill tone="neutral">
                            {parseEntityRef(v.entityRef).kind}
                          </Pill>
                        ) : undefined
                      }
                    />
                  ))}
                </PanelCard>
              )}

              <PanelCard
                title="Starred"
                icon={<StarRoundedIcon className={classes.star} />}
                action={<Link to="/catalog">Catalogue</Link>}
                emptyMessage={
                  starred.length === 0
                    ? 'Star the services and teams you work with to keep them here.'
                    : undefined
                }
              >
                {starred.map(ref => (
                  <ListRow
                    key={ref}
                    title={<EntityRefLink entityRef={ref} />}
                    meta={parseEntityRef(ref).kind}
                  />
                ))}
              </PanelCard>

              <PanelCard
                title="Components"
                action={<Link to="/catalog">View all</Link>}
                emptyMessage={
                  !recentLoading && (!recent || recent.length === 0) ? (
                    <>
                      No components registered yet.{' '}
                      <Link to="/catalog-import">Register the first one</Link>.
                    </>
                  ) : undefined
                }
              >
                {recentLoading ? (
                  <LoadingRows count={4} />
                ) : (
                  recent?.map(e => (
                    <ListRow
                      key={entityHref(e)}
                      title={
                        <Link to={entityHref(e)}>
                          {e.metadata.title ?? e.metadata.name}
                        </Link>
                      }
                      meta={`${String(e.spec?.owner ?? 'unowned')}${
                        e.spec?.lifecycle
                          ? ` · ${String(e.spec.lifecycle)}`
                          : ''
                      }`}
                      trailing={
                        e.spec?.type ? (
                          <Pill>{String(e.spec.type)}</Pill>
                        ) : undefined
                      }
                    />
                  ))
                )}
              </PanelCard>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
