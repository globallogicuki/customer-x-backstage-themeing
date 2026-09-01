import { Link, useSupportConfig } from '@backstage/core-components';
import type { NotFoundErrorPageProps } from '@backstage/frontend-plugin-api';
import { Button, makeStyles, Typography } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { useNavigate } from 'react-router-dom';
import { CustomerXMark } from '../brand';
import { SurfaceCard } from '../components';
import { tokensFor } from '../theme/modes';
import { font } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: theme.palette.background.default,
  },
  panel: {
    maxWidth: 520,
    width: '100%',
    padding: 32,
  },
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    fontSize: font.base,
    fontWeight: 500,
    color: tokensFor(theme).accentText,
  },
  title: {
    fontSize: font.xxl,
    fontWeight: 600,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    marginBottom: 8,
    color: tokensFor(theme).heading,
  },
  copy: {
    fontSize: font.md,
    lineHeight: 1.6,
    color: theme.palette.text.secondary,
    marginBottom: 24,
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
  },
  support: {
    marginLeft: 'auto',
    fontSize: font.base,
    fontWeight: 500,
  },
}));

/**
 * Branded replacement for Backstage's "dropped the mic" 404. Registered via
 * `SwappableComponentBlueprint` as `core-not-found-error-page`.
 */
export const CustomerXNotFoundPage = (_props: NotFoundErrorPageProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const support = useSupportConfig();

  return (
    <main className={classes.root}>
      <SurfaceCard
        component="section"
        className={classes.panel}
        aria-labelledby="not-found-title"
      >
        <div className={classes.eyebrow}>
          <CustomerXMark size={28} />
          <span>Error 404 · Page not found</span>
        </div>
        <Typography
          id="not-found-title"
          component="h1"
          className={classes.title}
        >
          We couldn’t find that page.
        </Typography>
        <Typography className={classes.copy}>
          The link may be out of date, or the page may have moved. Head back to
          the platform home, or return to where you were.
        </Typography>
        <div className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeRoundedIcon />}
            onClick={() => navigate('/')}
          >
            Back to home
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
          {support.url && (
            <Link to={support.url} className={classes.support}>
              Contact platform support →
            </Link>
          )}
        </div>
      </SurfaceCard>
    </main>
  );
};
