import { makeStyles, Typography } from '@material-ui/core';
import { ReactNode } from 'react';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { font } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
    margin: '32px 0 12px',
  },
  title: {
    fontSize: font.lg,
    fontWeight: 600,
    letterSpacing: '-0.01em',
    color: tokensFor(theme).heading,
  },
}));

export interface SectionHeadingProps {
  children: ReactNode;
  /** Right-aligned action, typically a `Link`. */
  action?: ReactNode;
  className?: string;
}

/** Section title used to break up dashboard-style pages. */
export const SectionHeading = ({
  children,
  action,
  className,
}: SectionHeadingProps) => {
  const classes = useStyles();
  return (
    <div className={cx(classes.root, className)}>
      <Typography component="h2" className={classes.title}>
        {children}
      </Typography>
      {action}
    </div>
  );
};
