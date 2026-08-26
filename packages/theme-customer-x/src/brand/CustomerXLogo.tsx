import { makeStyles } from '@material-ui/core';
import { fontFamily } from '../tokens';
import { CustomerXMark } from './CustomerXMark';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    whiteSpace: 'nowrap',
    lineHeight: 1.15,
  },
  text: { display: 'flex', flexDirection: 'column', minWidth: 0 },
  wordmark: {
    fontFamily,
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
  },
  tagline: {
    fontSize: 11,
    fontWeight: 500,
    opacity: 0.62,
    marginTop: 3,
    whiteSpace: 'nowrap',
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

/** Mark + "CUSTOMER_X" wordmark. Used in the nav rail and on the sign-in page. */
export const CustomerXLogo = ({
  size = 30,
  tagline,
  color = 'inherit',
  className,
}: CustomerXLogoProps) => {
  const classes = useStyles();
  return (
    <span
      className={[classes.root, className].filter(Boolean).join(' ')}
      style={{ color }}
    >
      <CustomerXMark size={size} />
      <span className={classes.text}>
        <span className={classes.wordmark}>CustomerX</span>
        {tagline && <span className={classes.tagline}>{tagline}</span>}
      </span>
    </span>
  );
};
