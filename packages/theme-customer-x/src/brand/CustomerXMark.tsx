import { makeStyles } from '@material-ui/core';
import { brand } from '../tokens';
import {
  MARK_HEIGHT,
  MARK_PATH,
  MARK_VIEWBOX,
  MARK_WIDTH,
} from './markPath';

const useStyles = makeStyles({
  svg: {
    display: 'block',
    flexShrink: 0,
  },
});

export interface CustomerXMarkProps {
  /** Rendered height in px; width follows the mark's aspect ratio. */
  size?: number;
  /**
   * `plain` (default): the mark in the brand cyan, no background — the standard
   * treatment on dark blue and white surfaces.
   * `tile`: white mark on a rounded brand-cyan tile (app-icon style).
   */
  variant?: 'plain' | 'tile';
  /** Override the mark colour for the `plain` variant. */
  color?: string;
  className?: string;
}

/** The CustomerX brand mark. */
export const CustomerXMark = ({
  size = 28,
  variant = 'plain',
  color = brand.cyan,
  className,
}: CustomerXMarkProps) => {
  const classes = useStyles();
  const cls = [classes.svg, className].filter(Boolean).join(' ');

  if (variant === 'tile') {
    // Mark occupies ~72% of the tile height, centred.
    const pad = 9;
    const scale = (64 - pad * 2) / MARK_HEIGHT;
    const tx = (64 - MARK_WIDTH * scale) / 2;
    return (
      <svg
        className={cls}
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="64" height="64" rx="14" fill={brand.cyan} />
        <g transform={`translate(${tx} ${pad}) scale(${scale})`}>
          <path fill={brand.white} d={MARK_PATH} />
        </g>
      </svg>
    );
  }

  return (
    <svg
      className={cls}
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
