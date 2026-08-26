import { Link, useSidebarOpenState } from '@backstage/core-components';
import { identityApiRef, useApi } from '@backstage/core-plugin-api';
import { parseEntityRef } from '@backstage/catalog-model';
import { makeStyles, Tooltip } from '@material-ui/core';
import useAsync from 'react-use/esm/useAsync';
import { brand } from '../tokens';
import { cx } from './cx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    margin: '8px 12px 12px',
    padding: '10px 12px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(255,255,255,0.05)',
    color: '#FFFFFF',
    textDecoration: 'none',
    transition: 'background-color 120ms ease',
    '&:hover': { background: 'rgba(255,255,255,0.09)' },
    '&:focus-visible': {
      outline: `2px solid ${brand.cyan}`,
      outlineOffset: -2,
    },
  },
  closed: {
    width: 48,
    padding: 0,
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    color: brand.navyDeep,
    background: `linear-gradient(135deg, ${brand.cyanLight} 0%, ${brand.cyan} 100%)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    lineHeight: 1.2,
  },
  name: {
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  meta: {
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.58)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: 2,
  },
});

const capitalise = (s?: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : undefined;

function initials(name?: string, email?: string) {
  const source = name?.trim() || email?.split('@')[0] || '?';
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('');
}

/** Signed-in user card at the foot of the rail; links to settings. */
export const UserFooter = () => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const identityApi = useApi(identityApiRef);
  const { value } = useAsync(
    async () => ({
      profile: await identityApi.getProfileInfo(),
      identity: await identityApi.getBackstageIdentity(),
    }),
    [identityApi],
  );
  const profile = value?.profile;
  const userRef = value?.identity.userEntityRef;
  const userName = userRef ? parseEntityRef(userRef).name : undefined;

  const displayName =
    profile?.displayName ?? capitalise(userName) ?? 'Signed in';
  const meta = profile?.email ?? userRef ?? 'View settings';

  const card = (
    <Link
      to="/settings"
      underline="none"
      aria-label={`${displayName} — settings`}
      className={cx(classes.root, !isOpen && classes.closed)}
    >
      <span
        className={classes.avatar}
        style={
          profile?.picture
            ? { backgroundImage: `url(${profile.picture})` }
            : undefined
        }
        aria-hidden="true"
      >
        {!profile?.picture && initials(displayName, profile?.email)}
      </span>
      {isOpen && (
        <span className={classes.text}>
          <span className={classes.name}>{displayName}</span>
          <span className={classes.meta}>{meta}</span>
        </span>
      )}
    </Link>
  );

  return isOpen ? (
    card
  ) : (
    <Tooltip title={displayName} placement="right" enterDelay={300}>
      {card}
    </Tooltip>
  );
};
