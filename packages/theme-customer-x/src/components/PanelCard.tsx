import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { SurfaceCard } from './SurfaceCard';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: '16px 20px 12px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: 15,
    fontWeight: 600,
  },
  title: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    '& svg': { width: 20, height: 20 },
  },
  action: { fontSize: 13, fontWeight: 500 },
  body: { padding: '6px 0' },
  empty: {
    padding: '24px 20px',
    fontSize: 13.5,
    lineHeight: 1.55,
    color: theme.palette.text.secondary,
  },
}));

export interface PanelCardProps {
  title: ReactNode;
  /** Optional leading icon shown before the title. */
  icon?: ReactNode;
  /** Right-aligned header action, typically a `Link`. */
  action?: ReactNode;
  /** Shown instead of `children` when set — use for empty states. */
  emptyMessage?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/** A titled panel with an optional header action; holds `ListRow`s or any content. */
export const PanelCard = ({
  title,
  icon,
  action,
  emptyMessage,
  className,
  children,
}: PanelCardProps) => {
  const classes = useStyles();
  return (
    <SurfaceCard component="section" className={className}>
      <header className={classes.header}>
        <span className={classes.title}>
          {icon}
          {title}
        </span>
        {action && <span className={classes.action}>{action}</span>}
      </header>
      {emptyMessage ? (
        <div className={classes.empty}>{emptyMessage}</div>
      ) : (
        <div className={classes.body}>{children}</div>
      )}
    </SurfaceCard>
  );
};
