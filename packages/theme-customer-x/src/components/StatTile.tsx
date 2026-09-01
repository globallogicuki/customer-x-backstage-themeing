import { Link } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { font, radius } from '../tokens';
import { Skeleton } from './Skeleton';
import { SurfaceCard } from './SurfaceCard';

const useStyles = makeStyles(theme => {
  const t = tokensFor(theme);
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      padding: 20,
      height: '100%',
    },
    head: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    label: {
      fontSize: font.base,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    // The brand cyan on its own pale wash: the one coloured object per tile.
    icon: {
      width: 32,
      height: 32,
      borderRadius: radius.md,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: t.accentWash,
      color: t.accentText,
      '& svg': { width: 18, height: 18 },
    },
    value: {
      fontSize: font.display,
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      fontVariantNumeric: 'tabular-nums',
      color: t.heading,
    },
    // For figures that ought to be zero (unowned services, failing checks):
    // the number itself carries the warning, nothing else on the tile changes.
    warning: { color: t.tint.warning.fg },
    warningIcon: {
      background: t.tint.warning.bg,
      color: t.tint.warning.fg,
    },
    hint: {
      fontSize: font.sm,
      color: theme.palette.text.secondary,
      marginTop: 2,
    },
  };
});

export interface StatTileProps {
  label: string;
  /** The headline figure. Omit while it is still loading. */
  value?: ReactNode;
  icon: ReactNode;
  /** When set the whole tile is a link. */
  to?: string;
  /** `warning` paints the figure in the warning colour — for counts that should be zero. */
  tone?: 'default' | 'warning';
  /** One short line under the figure, e.g. "of 42 components". */
  hint?: ReactNode;
}

/**
 * A counted figure: label, then the number in the brand navy.
 *
 * The label leads because it is what the reader is scanning for; the icon
 * sits on a brand-cyan wash in the corner so a row of four reads as one
 * coloured system.
 */
export const StatTile = ({
  label,
  value,
  icon,
  to,
  tone = 'default',
  hint,
}: StatTileProps) => {
  const classes = useStyles();
  const warn = tone === 'warning';
  const body = (
    <>
      <div className={classes.head}>
        <span className={classes.label}>{label}</span>
        <span
          className={cx(classes.icon, warn && classes.warningIcon)}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
      <div className={cx(classes.value, warn && classes.warning)}>
        {value ?? <Skeleton width={48} height={26} />}
      </div>
      {hint && <div className={classes.hint}>{hint}</div>}
    </>
  );

  if (to) {
    return (
      <SurfaceCard
        component={Link}
        to={to}
        underline="none"
        interactive
        accentHover
        className={classes.root}
      >
        {body}
      </SurfaceCard>
    );
  }
  return <SurfaceCard className={classes.root}>{body}</SurfaceCard>;
};
