import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { font, radius } from '../tokens';

const useStyles = makeStyles(theme => {
  const { tint, n } = tokensFor(theme);
  const tone = (bg: string, color: string) => ({ background: bg, color });
  return {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      // Sentence case: these carry catalogue values ("service", "openapi")
      // that the reader also sees written that way in YAML and in URLs.
      // Shouting them in caps makes the label look like decoration.
      fontSize: font.sm,
      fontWeight: 500,
      letterSpacing: 0,
      padding: '2px 8px',
      borderRadius: radius.pill,
      whiteSpace: 'nowrap',
      lineHeight: 1.4,
    },
    accent: tone(tint.info.bg, tint.info.fg),
    neutral: tone(n.bg, n.textSecondary),
    success: tone(tint.ok.bg, tint.ok.fg),
    warning: tone(tint.warning.bg, tint.warning.fg),
    error: tone(tint.error.bg, tint.error.fg),
  };
});

export type PillTone = 'accent' | 'neutral' | 'success' | 'warning' | 'error';

export interface PillProps {
  tone?: PillTone;
  children: ReactNode;
  className?: string;
}

/** Small status/type label. */
export const Pill = ({ tone = 'accent', children, className }: PillProps) => {
  const classes = useStyles();
  return (
    <span className={cx(classes.root, classes[tone], className)}>
      {children}
    </span>
  );
};
