import { makeStyles, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 12,
    margin: '40px 0 16px',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
});

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
    <div className={[classes.root, className].filter(Boolean).join(' ')}>
      <Typography component="h2" className={classes.title}>
        {children}
      </Typography>
      {action}
    </div>
  );
};
