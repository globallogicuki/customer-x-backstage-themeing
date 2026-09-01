import { Link, useSidebarOpenState } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { brand, font, radius } from '../tokens';
import { RailTooltip } from './RailTooltip';

const useStyles = makeStyles(theme => {
  const { nav } = tokensFor(theme);
  return {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 36,
      margin: '2px 8px',
      padding: '0 8px',
      borderRadius: radius.md,
      color: nav.color,
      textDecoration: 'none',
      fontSize: font.md,
      fontWeight: 500,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      transition: 'background-color 120ms ease, color 120ms ease',
      '&:hover': {
        backgroundColor: nav.hover,
        color: nav.selectedColor,
      },
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.navigation.indicator}`,
        outlineOffset: -2,
      },
    },
    // One signal for "you are here": the row fills. No accent bar as well —
    // two markers for one state is the reader doing the theme's work.
    active: {
      backgroundColor: nav.selectedBackground,
      color: nav.selectedColor,
      fontWeight: 600,
      '&:hover': {
        backgroundColor: nav.selectedBackgroundHover,
        color: nav.selectedColor,
      },
    },
    closed: {
      width: 40,
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
    count: {
      minWidth: 20,
      height: 20,
      padding: '0 6px',
      borderRadius: radius.pill,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: font.xs,
      fontWeight: 600,
      background: theme.palette.navigation.indicator,
      color: brand.navy,
    },
    dot: {
      position: 'absolute',
      top: 8,
      right: 10,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: theme.palette.navigation.indicator,
      boxShadow: `0 0 0 2px ${nav.background}`,
    },
  };
});

export interface NavItemProps {
  to: string;
  title: string;
  icon: ReactNode;
  /** Match only the exact path (used for "/"). */
  exact?: boolean;
  /** Optional trailing adornment, e.g. a badge. */
  trailing?: ReactNode;
  /** Unread-style count. Shows as a pill when open and a dot when collapsed. */
  badge?: number;
}

function isActivePath(pathname: string, to: string, exact?: boolean) {
  if (exact) return pathname === to;
  const base = to.replace(/\/+$/, '');
  if (!base) return pathname === '/';
  return pathname === base || pathname.startsWith(`${base}/`);
}

/** A single navigation link in the rail. Collapses to an icon with tooltip. */
export const NavItem = ({
  to,
  title,
  icon,
  exact,
  trailing,
  badge,
}: NavItemProps) => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const { pathname } = useLocation();
  const active = isActivePath(pathname, to, exact);

  return (
    <RailTooltip title={title}>
      <Link
        to={to}
        underline="none"
        aria-current={active ? 'page' : undefined}
        aria-label={
          isOpen ? undefined : badge ? `${title} (${badge} unread)` : title
        }
        className={cx(
          classes.root,
          active && classes.active,
          !isOpen && classes.closed,
        )}
      >
        <span className={classes.icon}>{icon}</span>
        {isOpen && <span className={classes.label}>{title}</span>}
        {isOpen && Boolean(trailing || badge) && (
          <span className={classes.trailing}>
            {trailing}
            {badge ? (
              <span className={classes.count} aria-label={`${badge} unread`}>
                {badge > 99 ? '99+' : badge}
              </span>
            ) : null}
          </span>
        )}
        {!isOpen && badge ? (
          <span className={classes.dot} aria-hidden="true" />
        ) : null}
      </Link>
    </RailTooltip>
  );
};
