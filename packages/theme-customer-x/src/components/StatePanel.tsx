import { makeStyles, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { font, radius } from '../tokens';

const useStyles = makeStyles(theme => {
  const t = tokensFor(theme);
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      gap: 8,
    },
    icon: {
      width: 44,
      height: 44,
      borderRadius: radius.lg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 6,
      background: t.accentWash,
      color: t.accentText,
      '& svg': { width: 22, height: 22 },
    },
    iconError: {
      background: t.tint.error.bg,
      color: t.tint.error.fg,
    },
    title: {
      fontSize: font.lg,
      fontWeight: 600,
      color: t.heading,
    },
    description: {
      fontSize: font.md,
      lineHeight: 1.55,
      color: theme.palette.text.secondary,
      maxWidth: 440,
    },
    action: { marginTop: 12 },
  };
});

export interface StatePanelProps {
  /** `error` swaps the icon wash to the error tint; copy stays calm either way. */
  tone?: 'empty' | 'error';
  icon: ReactNode;
  /** One short line: what would be here, or what went wrong. */
  title: ReactNode;
  /** Optionally one more sentence — never a paragraph. */
  description?: ReactNode;
  /** The one thing to do next, typically a `Button` or `Link`. */
  action?: ReactNode;
  className?: string;
}

/**
 * An empty or error state: icon, one line, one action.
 *
 * Every "nothing here yet" and "that didn't work" in the portal is drawn with
 * this so they all speak with one voice — the screen says what would fill it
 * and gives the single action that does, without apologising.
 */
export const StatePanel = ({
  tone = 'empty',
  icon,
  title,
  description,
  action,
  className,
}: StatePanelProps) => {
  const classes = useStyles();
  return (
    <div className={cx(classes.root, className)} role="status">
      <span
        className={cx(classes.icon, tone === 'error' && classes.iconError)}
        aria-hidden="true"
      >
        {icon}
      </span>
      <Typography component="h3" className={classes.title}>
        {title}
      </Typography>
      {description && (
        <Typography className={classes.description}>{description}</Typography>
      )}
      {action && <div className={classes.action}>{action}</div>}
    </div>
  );
};
