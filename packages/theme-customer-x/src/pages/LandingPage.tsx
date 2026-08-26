import { Link } from '@backstage/core-components';
import { identityApiRef, useApi } from '@backstage/core-plugin-api';
import {
  catalogApiRef,
  EntityRefLink,
  useStarredEntities,
} from '@backstage/plugin-catalog-react';
import { type Entity, parseEntityRef } from '@backstage/catalog-model';
import {
  ActionCard,
  HeroBanner,
  ListRow,
  PanelCard,
  Pill,
  SectionHeading,
  StatTile,
} from '../components';
import { Grid, makeStyles } from '@material-ui/core';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import AssessmentRoundedIcon from '@material-ui/icons/AssessmentRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';
import FlagRoundedIcon from '@material-ui/icons/FlagRounded';
import LayersRoundedIcon from '@material-ui/icons/LayersRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import { FormEvent, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsync from 'react-use/esm/useAsync';

// Page-specific chrome only; every card is a design-system primitive.
const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100%',
    backgroundColor: theme.palette.background.default,
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    maxWidth: 720,
    height: 56,
    padding: '0 8px 0 18px',
    borderRadius: 14,
    background: theme.palette.background.paper,
    boxShadow: '0 18px 44px rgba(0, 20, 40, 0.35)',
    '& svg': { color: theme.palette.text.secondary, flexShrink: 0 },
    '&:focus-within': {
      boxShadow: `0 18px 44px rgba(0, 20, 40, 0.35), 0 0 0 3px ${theme.palette.secondary.main}73`,
    },
  },
  searchInput: {
    flex: 1,
    height: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    font: 'inherit',
    fontSize: 16,
    color: theme.palette.text.primary,
    '&::placeholder': { color: theme.palette.text.disabled },
  },
  searchButton: {
    height: 40,
    padding: '0 18px',
    borderRadius: 10,
    border: 'none',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    font: 'inherit',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    '&:hover': { background: theme.palette.primary.dark },
  },
  chips: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 },
  chip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 32,
    padding: '0 14px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.08)',
    color: 'inherit',
    fontSize: 13,
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'background-color 120ms ease',
    '&:hover': { background: 'rgba(255,255,255,0.16)' },
    '& svg': { width: 16, height: 16 },
  },
  content: { maxWidth: 1260, margin: '0 auto', padding: '0 40px 56px' },
  stats: { marginTop: -36, position: 'relative', zIndex: 1 },
  star: { color: theme.palette.gold },
}));

const timeOfDay = () => {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
};

const STATS: Array<{
  kind: string;
  label: string;
  icon: ReactNode;
  to: string;
}> = [
  {
    kind: 'component',
    label: 'Components',
    icon: <WidgetsRoundedIcon />,
    to: '/catalog?filters[kind]=component',
  },
  {
    kind: 'api',
    label: 'APIs',
    icon: <ExtensionRoundedIcon />,
    to: '/catalog?filters[kind]=api',
  },
  {
    kind: 'system',
    label: 'Systems',
    icon: <LayersRoundedIcon />,
    to: '/catalog?filters[kind]=system',
  },
  {
    kind: 'template',
    label: 'Templates',
    icon: <CodeRoundedIcon />,
    to: '/create',
  },
];

const ACTIONS: Array<{
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
}> = [
  {
    title: 'Create from a template',
    description:
      'Scaffold a new service on the golden path with CI, observability and ownership wired in.',
    icon: <AddCircleOutlineRoundedIcon />,
    to: '/create',
  },
  {
    title: 'Register a component',
    description:
      'Bring an existing repository into the catalogue with a catalog-info.yaml.',
    icon: <AccountTreeRoundedIcon />,
    to: '/catalog-import',
  },
  {
    title: 'Technical documentation',
    description:
      'Browse TechDocs for every service, API and system in one place.',
    icon: <DescriptionRoundedIcon />,
    to: '/docs',
  },
  {
    title: 'Scorecards & tech insights',
    description:
      'See how the estate measures up against engineering standards.',
    icon: <AssessmentRoundedIcon />,
    to: '/tech-insights-overview',
  },
  {
    title: 'Skill marketplace',
    description:
      'Discover and install approved AI skills for your team’s tooling.',
    icon: <StorefrontRoundedIcon />,
    to: '/skills',
  },
  {
    title: 'Feature flags',
    description: 'Manage Unleash feature toggles across environments.',
    icon: <FlagRoundedIcon />,
    to: '/unleash',
  },
];

const entityHref = (e: Entity) =>
  `/catalog/${e.metadata.namespace ?? 'default'}/${e.kind.toLowerCase()}/${
    e.metadata.name
  }`;

const capitalise = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const LandingPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const catalogApi = useApi(catalogApiRef);
  const identityApi = useApi(identityApiRef);
  const { starredEntities } = useStarredEntities();
  const [query, setQuery] = useState('');

  const { value: who } = useAsync(
    async () => ({
      profile: await identityApi.getProfileInfo(),
      identity: await identityApi.getBackstageIdentity(),
    }),
    [identityApi],
  );
  const rawName =
    who?.profile.displayName?.split(/\s+/)[0] ??
    (who?.identity.userEntityRef
      ? parseEntityRef(who.identity.userEntityRef).name
      : undefined);
  const firstName = rawName ? capitalise(rawName) : undefined;

  const { value: counts } = useAsync(async () => {
    const results = await Promise.all(
      STATS.map(s =>
        catalogApi
          .queryEntities({ filter: { kind: s.kind }, limit: 1 })
          .then(r => r.totalItems)
          .catch(() => undefined),
      ),
    );
    return Object.fromEntries(STATS.map((s, i) => [s.kind, results[i]]));
  }, [catalogApi]);

  const { value: recent } = useAsync(
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

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/search?query=${encodeURIComponent(q)}` : '/search');
  };

  const starred = [...starredEntities].slice(0, 6);

  return (
    <div className={classes.root}>
      <HeroBanner
        eyebrow="CustomerX Developer Platform"
        title={`Good ${timeOfDay()}${firstName ? `, ${firstName}` : ''}.`}
        subtitle="Find any service, API or team. Ship on the golden path. Keep the estate healthy — everything engineering needs, in one place."
      >
        <form role="search" onSubmit={onSearch} className={classes.search}>
          <SearchRoundedIcon />
          <input
            className={classes.searchInput}
            placeholder="Search services, APIs, docs and teams…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search the platform"
          />
          <button type="submit" className={classes.searchButton}>
            Search
          </button>
        </form>
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
      </HeroBanner>

      <div className={classes.content}>
        <Grid container spacing={2} className={classes.stats}>
          {STATS.map(s => (
            <Grid item xs={12} sm={6} md={3} key={s.kind}>
              <StatTile
                label={s.label}
                value={counts?.[s.kind] ?? '—'}
                icon={s.icon}
                to={s.to}
              />
            </Grid>
          ))}
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

            <PanelCard
              title="Starred"
              icon={<StarRoundedIcon className={classes.star} />}
              action={<Link to="/catalog">Catalogue</Link>}
              emptyMessage={
                starred.length === 0
                  ? 'Star the services and teams you work with and they’ll appear here for one-click access.'
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

            <div style={{ height: 16 }} />

            <PanelCard
              title="Components"
              action={<Link to="/catalog">View all</Link>}
              emptyMessage={
                !recent || recent.length === 0 ? (
                  <>
                    No components registered yet.{' '}
                    <Link to="/catalog-import">Register the first one</Link>.
                  </>
                ) : undefined
              }
            >
              {recent?.map(e => (
                <ListRow
                  key={entityHref(e)}
                  title={
                    <Link to={entityHref(e)}>
                      {e.metadata.title ?? e.metadata.name}
                    </Link>
                  }
                  meta={`${String(e.spec?.owner ?? 'unowned')}${
                    e.spec?.lifecycle ? ` · ${String(e.spec.lifecycle)}` : ''
                  }`}
                  trailing={
                    e.spec?.type ? (
                      <Pill>{String(e.spec.type)}</Pill>
                    ) : undefined
                  }
                />
              ))}
            </PanelCard>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
