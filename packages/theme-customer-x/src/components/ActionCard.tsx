import { Link } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { ReactNode } from 'react';
import { SurfaceCard } from './SurfaceCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '20px 20px 18px',
    height: '100%',
    '&:hover $arrow': { transform: 'translateX(2px)', opacity: 1 },
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
    '& svg': { width: 20, height: 20 },
  },
  arrow: {
    color: theme.palette.text.secondary,
    opacity: 0.5,
    transition: 'transform 120ms ease, opacity 120ms ease',
  },
  title: { fontSize: 15, fontWeight: 600 },
  description: {
    fontSize: 13,
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },
}));

export interface ActionCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  to: string;
}

/** A clickable "do this next" card with an icon, title, blurb and arrow. */
export const ActionCard = ({
  title,
  description,
  icon,
  to,
}: ActionCardProps) => {
  const classes = useStyles();
  return (
    <SurfaceCard
      component={Link}
      to={to}
      underline="none"
      interactive
      accentHover
      className={classes.root}
    >
      <div className={classes.head}>
        <span className={classes.icon} aria-hidden="true">
          {icon}
        </span>
        <ArrowForwardRoundedIcon className={classes.arrow} />
      </div>
      <div className={classes.title}>{title}</div>
      {description && <div className={classes.description}>{description}</div>}
    </SurfaceCard>
  );
};
