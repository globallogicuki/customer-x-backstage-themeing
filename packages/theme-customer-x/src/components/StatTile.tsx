import { Link } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { SurfaceCard } from './SurfaceCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '20px 22px',
    height: '100%',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.infoBackground,
    color: theme.palette.infoText,
    '& svg': { width: 22, height: 22 },
  },
  value: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: 6,
    color: theme.palette.text.secondary,
  },
}));

export interface StatTileProps {
  label: string;
  /** The headline figure. Pass `'—'` or a skeleton while loading. */
  value: ReactNode;
  icon: ReactNode;
  /** When set the whole tile is a link. */
  to?: string;
}

/** A KPI tile: icon, big number, label. */
export const StatTile = ({ label, value, icon, to }: StatTileProps) => {
  const classes = useStyles();
  const body = (
    <>
      <span className={classes.icon} aria-hidden="true">
        {icon}
      </span>
      <span>
        <div className={classes.value}>{value}</div>
        <div className={classes.label}>{label}</div>
      </span>
    </>
  );
  return to ? (
    <SurfaceCard
      component={Link}
      to={to}
      underline="none"
      interactive
      className={classes.root}
    >
      {body}
    </SurfaceCard>
  ) : (
    <SurfaceCard className={classes.root}>{body}</SurfaceCard>
  );
};
