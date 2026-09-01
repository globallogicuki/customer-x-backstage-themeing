import { makeStyles } from '@material-ui/core';
import { cx } from '../cx';
import { brand } from '../tokens';
import { MARK_HEIGHT, MARK_PATH, MARK_VIEWBOX, MARK_WIDTH } from './markPath';

const useStyles = makeStyles({
  svg: {
    display: 'block',
    flexShrink: 0,
  },
});

export interface CustomerXMarkProps {
  /** Rendered height in px; width follows the mark's aspect ratio. */
  size?: number;
  /** Mark colour; the brand cyan reads correctly on the navy and on white. */
  color?: string;
  className?: string;
}

/**
 * The brand mark, used as Accelerate's symbol. Currently a generic placeholder
 * — swap the artwork in `markPath.ts` for the customer's mark when it lands;
 * nothing else needs to change.
 */
export const CustomerXMark = ({
  size = 28,
  color = brand.cyan,
  className,
}: CustomerXMarkProps) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.svg, className)}
      height={size}
      width={(size * MARK_WIDTH) / MARK_HEIGHT}
      viewBox={MARK_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path fill={color} d={MARK_PATH} />
    </svg>
  );
};
