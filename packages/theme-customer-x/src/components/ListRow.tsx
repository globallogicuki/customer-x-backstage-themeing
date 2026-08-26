import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 20px',
    borderTop: `1px solid ${theme.palette.divider}`,
    '&:first-child': { borderTop: 'none' },
  },
  main: { minWidth: 0, flex: 1 },
  title: {
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  meta: {
    fontSize: 12.5,
    marginTop: 2,
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export interface ListRowProps {
  title: ReactNode;
  meta?: ReactNode;
  /** Right-aligned content, e.g. a `Pill`. */
  trailing?: ReactNode;
}

/** A compact row for lists inside a `PanelCard`. */
export const ListRow = ({ title, meta, trailing }: ListRowProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <div className={classes.title}>{title}</div>
        {meta && <div className={classes.meta}>{meta}</div>}
      </div>
      {trailing}
    </div>
  );
};
