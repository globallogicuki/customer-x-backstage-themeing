import { ProxiedSignInPage } from '@backstage/core-components';
import type { SignInPageProps } from '@backstage/core-plugin-api';
import { Button, makeStyles, Typography } from '@material-ui/core';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { useState } from 'react';
import { CustomerXLogo } from '../brand';
import { brand } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)',
    [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
  },
  brand: {
    position: 'relative',
    overflow: 'hidden',
    padding: '48px 56px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#FFFFFF',
    background:
      'linear-gradient(160deg, #00395D 0%, #002B47 55%, #001F33 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      right: -220,
      bottom: -260,
      width: 680,
      height: 680,
      borderRadius: '50%',
      background: `radial-gradient(closest-side, ${brand.cyan}80, ${brand.cyan}00 70%)`,
      pointerEvents: 'none',
    },
    [theme.breakpoints.down('sm')]: { padding: '32px 28px', minHeight: 320 },
  },
  brandTop: { position: 'relative' },
  brandBody: { position: 'relative', maxWidth: 520 },
  headline: {
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.1,
    marginBottom: 18,
    [theme.breakpoints.down('sm')]: { fontSize: 30 },
  },
  lede: {
    fontSize: 16,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.74)',
    marginBottom: 28,
  },
  points: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: 12,
  },
  point: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    fontSize: 14.5,
    lineHeight: 1.5,
    color: 'rgba(255,255,255,0.88)',
    '& svg': {
      width: 20,
      height: 20,
      padding: 2,
      borderRadius: '50%',
      background: `${brand.cyan}40`,
      color: brand.cyanLight,
      flexShrink: 0,
      marginTop: 1,
    },
  },
  brandFoot: {
    position: 'relative',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: theme.palette.background.default,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    padding: 36,
    borderRadius: 16,
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0 20px 48px rgba(11, 31, 51, 0.08)',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    lineHeight: 1.55,
    marginBottom: 28,
  },
  actions: { display: 'grid', gap: 10 },
  primary: {
    height: 46,
    fontSize: 15,
  },
  secondary: {
    height: 46,
    fontSize: 15,
  },
  hint: {
    marginTop: 20,
    fontSize: 12.5,
    color: theme.palette.text.secondary,
    lineHeight: 1.5,
  },
  progress: { marginTop: 16 },
}));

/**
 * Branded split-screen sign-in. Guest sign-in is performed through the auth
 * backend's guest provider (the same path the stock page takes); the SSO
 * button is a placeholder until an enterprise provider is configured.
 */
export const CustomerXSignInPage = ({ onSignInSuccess }: SignInPageProps) => {
  const classes = useStyles();
  const [signingIn, setSigningIn] = useState(false);

  return (
    <div className={classes.root}>
      <aside className={classes.brand}>
        <div className={classes.brandTop}>
          <CustomerXLogo size={34} />
        </div>
        <div className={classes.brandBody}>
          <Typography component="h1" className={classes.headline}>
            The home of engineering at CustomerX.
          </Typography>
          <Typography className={classes.lede}>
            One platform to discover services, ship on the golden path and keep
            the estate healthy.
          </Typography>
          <ul className={classes.points}>
            <li className={classes.point}>
              <CheckRoundedIcon />
              <span>
                A single catalogue of every service, API, system and team
              </span>
            </li>
            <li className={classes.point}>
              <CheckRoundedIcon />
              <span>
                Templates that bake in security, CI and observability from day
                one
              </span>
            </li>
            <li className={classes.point}>
              <CheckRoundedIcon />
              <span>
                Scorecards and insights that show where to invest next
              </span>
            </li>
          </ul>
        </div>
        <div className={classes.brandFoot}>
          CustomerX internal · For authorised colleagues only
        </div>
      </aside>

      <main className={classes.form}>
        <div className={classes.card}>
          <Typography component="h2" className={classes.cardTitle}>
            Sign in
          </Typography>
          <Typography className={classes.cardSub}>
            Use your CustomerX identity to access the Developer Platform.
          </Typography>
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.primary}
              disabled
              title="Enterprise SSO is not configured in this environment yet"
            >
              Continue with CustomerX SSO
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.secondary}
              disabled={signingIn}
              onClick={() => setSigningIn(true)}
            >
              {signingIn ? 'Signing in…' : 'Continue as guest'}
            </Button>
          </div>
          {signingIn && (
            <div className={classes.progress}>
              <ProxiedSignInPage
                provider="guest"
                onSignInSuccess={onSignInSuccess}
              />
            </div>
          )}
          <Typography className={classes.hint}>
            Guest access is read-mostly and intended for evaluation. SSO becomes
            available once an enterprise auth provider is enabled in{' '}
            <code>app-config.yaml</code>.
          </Typography>
        </div>
      </main>
    </div>
  );
};
