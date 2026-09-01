import { makeStyles } from '@material-ui/core';
import { cx } from '../cx';
import { radius } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    borderRadius: radius.sm,
    backgroundColor: theme.palette.divider,
    animation: '$pulse 1.4s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.45 },
  },
  '@media (prefers-reduced-motion: reduce)': {
    root: { animation: 'none' },
  },
}));

export interface SkeletonProps {
  /** CSS width — a number is px. Defaults to filling the container. */
  width?: number | string;
  /** CSS height — a number is px. */
  height?: number | string;
  className?: string;
}

/**
 * Placeholder bar shown while a value loads.
 *
 * Sized by the caller to match the text it stands in for, so the layout does
 * not move when the real value arrives. Prefer this to a dash: a figure that
 * pops from "—" to "128" reads as a page that failed and then recovered.
 */
export const Skeleton = ({ width = '100%', height = 16, className }: SkeletonProps) => {
  const classes = useStyles();
  return (
    <span
      className={cx(classes.root, className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};
