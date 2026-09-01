import { makeStyles } from '@material-ui/core';
import { cx } from '../cx';
import { fontFamily } from '../tokens';
import { CustomerXMark } from './CustomerXMark';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    lineHeight: 1.15,
  },
  text: { display: 'flex', flexDirection: 'column', minWidth: 0 },
  // Sentence case, tight: "Accelerate" is a product name, not an acronym, and
  // the mark beside it already supplies the forward motion.
  wordmark: {
    fontFamily,
    fontWeight: 600,
    fontSize: 17,
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
  },
  // Wraps rather than truncates: the full team name is the point of it.
  tagline: {
    fontSize: 11,
    fontWeight: 500,
    opacity: 0.66,
    marginTop: 2,
    lineHeight: 1.3,
  },
});

export interface CustomerXLogoProps {
  /** Mark size in px. */
  size?: number;
  /** Optional line under the wordmark, e.g. "Developer Platform". */
  tagline?: string;
  /** Text colour; defaults to inherit so it follows the surface it sits on. */
  color?: string;
  className?: string;
}

/** Mark + "Accelerate" wordmark. Used in the nav rail and on the sign-in page. */
export const CustomerXLogo = ({
  size = 30,
  tagline,
  color = 'inherit',
  className,
}: CustomerXLogoProps) => {
  const classes = useStyles();
  return (
    <span className={cx(classes.root, className)} style={{ color }}>
      <CustomerXMark size={size} />
      <span className={classes.text}>
        <span className={classes.wordmark}>Accelerate</span>
        {tagline && <span className={classes.tagline}>{tagline}</span>}
      </span>
    </span>
  );
};
