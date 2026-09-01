import { ProxiedSignInPage } from '@backstage/core-components';
import type { SignInPageProps } from '@backstage/core-plugin-api';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { CustomerXLogo, CustomerXMark } from '../brand';
import { SurfaceCard } from '../components';
import { tokensFor } from '../theme/modes';
import { brand, font, rgba } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 6fr)',
    [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
  },
  // The one brand moment in the product. It is flat navy — the depth comes
  // from the mark itself, drawn far larger than life and cropped by the
  // panel, rather than from a gradient that could belong to any product.
  brand: {
    position: 'relative',
    overflow: 'hidden',
    padding: '48px 56px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: brand.white,
    backgroundColor: brand.navy,
    [theme.breakpoints.down('sm')]: { padding: '32px 24px', minHeight: 280 },
  },
  watermark: {
    position: 'absolute',
    right: '-14%',
    bottom: '-22%',
    opacity: 0.08,
    pointerEvents: 'none',
    userSelect: 'none',
  },
  brandTop: { position: 'relative' },
  brandBody: { position: 'relative', maxWidth: 480 },
  headline: {
    fontSize: font.display,
    fontWeight: 600,
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
    marginBottom: 16,
    [theme.breakpoints.down('sm')]: { fontSize: font.xxl },
  },
  lede: {
    fontSize: font.lg,
    lineHeight: 1.55,
    color: rgba(brand.white, 0.72),
  },
  brandFoot: {
    position: 'relative',
    fontSize: font.sm,
    color: rgba(brand.white, 0.5),
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
    maxWidth: 400,
    padding: 32,
    boxShadow: tokensFor(theme).shadows.sm,
  },
  cardTitle: {
    fontSize: font.xxl,
    fontWeight: 600,
    letterSpacing: '-0.02em',
    marginBottom: 4,
    color: tokensFor(theme).heading,
  },
  cardSub: {
    fontSize: font.md,
    color: theme.palette.text.secondary,
    lineHeight: 1.55,
    marginBottom: 24,
  },
  actions: { display: 'grid', gap: 8 },
  action: { height: 44 },
  hint: {
    marginTop: 20,
    fontSize: font.sm,
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
        <div className={classes.watermark} aria-hidden="true">
          <CustomerXMark size={620} color={brand.cyan} />
        </div>
        <div className={classes.brandTop}>
          <CustomerXLogo size={32} tagline="Developer Platform" />
        </div>
        <div className={classes.brandBody}>
          <Typography component="h1" className={classes.headline}>
            Engineering, moving faster.
          </Typography>
          <Typography className={classes.lede}>
            Accelerate is the engineering home for CustomerX: every service,
            API and team in one catalogue, with the templates and scorecards
            that keep them healthy.
          </Typography>
        </div>
        <div className={classes.brandFoot}>
          CustomerX internal · For authorised colleagues only
        </div>
      </aside>

      <main className={classes.form}>
        <SurfaceCard className={classes.card}>
          <Typography component="h2" className={classes.cardTitle}>
            Sign in
          </Typography>
          <Typography className={classes.cardSub}>
            Use your CustomerX identity to open Accelerate.
          </Typography>
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.action}
              disabled
              title="Enterprise SSO is not configured in this environment yet"
            >
              Continue with CustomerX SSO
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.action}
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
            Guest access is read-only and intended for evaluation. SSO becomes
            available once an enterprise auth provider is enabled in{' '}
            <code>app-config.yaml</code>.
          </Typography>
        </SurfaceCard>
      </main>
    </div>
  );
};
