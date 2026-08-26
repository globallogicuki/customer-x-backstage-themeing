import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: 999,
    whiteSpace: 'nowrap',
    lineHeight: 1.4,
  },
  accent: {
    background: theme.palette.infoBackground,
    color: theme.palette.infoText,
  },
  neutral: {
    background: theme.palette.background.default,
    color: theme.palette.text.secondary,
  },
  success: {
    background:
      theme.palette.type === 'dark' ? 'rgba(50,213,131,0.16)' : '#ECFDF3',
    color: theme.palette.type === 'dark' ? '#6CE9A6' : '#027A48',
  },
  warning: {
    background: theme.palette.warningBackground,
    color: theme.palette.warningText,
  },
  error: {
    background: theme.palette.errorBackground,
    color: theme.palette.errorText,
  },
}));

export type PillTone = 'accent' | 'neutral' | 'success' | 'warning' | 'error';

export interface PillProps {
  tone?: PillTone;
  children: ReactNode;
  className?: string;
}

/** Small uppercase status/type label. */
export const Pill = ({ tone = 'accent', children, className }: PillProps) => {
  const classes = useStyles();
  return (
    <span
      className={[classes.root, classes[tone], className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
};
