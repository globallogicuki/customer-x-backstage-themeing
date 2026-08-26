import { Link, useSidebarOpenState } from '@backstage/core-components';
import { makeStyles, Tooltip } from '@material-ui/core';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cx } from './cx';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    height: 40,
    margin: '2px 12px',
    padding: '0 12px',
    borderRadius: 10,
    color: theme.palette.navigation.color,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transition: 'background-color 120ms ease, color 120ms ease',
    '&:hover': {
      backgroundColor:
        theme.palette.navigation.navItem?.hoverBackground ??
        'rgba(255,255,255,0.08)',
      color: theme.palette.navigation.selectedColor,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.navigation.indicator}`,
      outlineOffset: -2,
    },
  },
  active: {
    backgroundColor: 'rgba(0, 174, 239, 0.18)',
    color: theme.palette.navigation.selectedColor,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: 'rgba(0, 174, 239, 0.22)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -12,
      top: 9,
      bottom: 9,
      width: 3,
      borderRadius: '0 3px 3px 0',
      background: theme.palette.navigation.indicator,
    },
  },
  closed: {
    width: 48,
    padding: 0,
    justifyContent: 'center',
  },
  icon: {
    display: 'inline-flex',
    flexShrink: 0,
    '& svg': {
      width: 20,
      height: 20,
      fontSize: 20,
    },
  },
  label: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  trailing: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
}));

export interface NavItemProps {
  to: string;
  title: string;
  icon: ReactNode;
  /** Match only the exact path (used for "/"). */
  exact?: boolean;
  /** Optional trailing adornment, e.g. a badge. */
  trailing?: ReactNode;
}

function isActivePath(pathname: string, to: string, exact?: boolean) {
  if (exact) return pathname === to;
  const base = to.replace(/\/+$/, '');
  if (!base) return pathname === '/';
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** A single navigation link in the rail. Collapses to an icon with tooltip. */
export const NavItem = ({ to, title, icon, exact, trailing }: NavItemProps) => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const { pathname } = useLocation();
  const active = isActivePath(pathname, to, exact);

  const link = (
    <Link
      to={to}
      underline="none"
      aria-current={active ? 'page' : undefined}
      aria-label={isOpen ? undefined : title}
      className={cx(
        classes.root,
        active && classes.active,
        !isOpen && classes.closed,
      )}
    >
      <span className={classes.icon}>{icon}</span>
      {isOpen && <span className={classes.label}>{title}</span>}
      {isOpen && trailing && (
        <span className={classes.trailing}>{trailing}</span>
      )}
    </Link>
  );

  return isOpen ? (
    link
  ) : (
    <Tooltip title={title} placement="right" enterDelay={300}>
      {link}
    </Tooltip>
  );
};
