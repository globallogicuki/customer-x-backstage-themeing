import { Link } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import { ReactNode } from 'react';
import { tokensFor } from '../theme/modes';
import { font, radius } from '../tokens';
import { SurfaceCard } from './SurfaceCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    height: '100%',
    '&:hover $arrow': { opacity: 1, color: theme.palette.secondary.main },
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: tokensFor(theme).accentWash,
    color: tokensFor(theme).accentText,
    '& svg': { width: 18, height: 18 },
  },
  main: { minWidth: 0, flex: 1 },
  title: {
    display: 'block',
    fontSize: font.md,
    fontWeight: 500,
    color: tokensFor(theme).heading,
  },
  description: {
    display: 'block',
    fontSize: font.base,
    lineHeight: 1.5,
    marginTop: 4,
    color: theme.palette.text.secondary,
  },
  arrow: {
    flexShrink: 0,
    marginTop: 2,
    color: theme.palette.text.disabled,
    opacity: 0,
    transition: 'opacity 120ms ease',
    '& svg': { width: 18, height: 18 },
  },
}));

export interface ActionCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  to: string;
}

/**
 * A "do this next" card: icon, title, one line of detail.
 *
 * The arrow only appears on hover — at rest the row is text, which lets a
 * grid of these read as a list of things to do rather than a wall of buttons.
 */
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
      <span className={classes.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={classes.main}>
        <span className={classes.title}>{title}</span>
        {description && (
          <span className={classes.description}>{description}</span>
        )}
      </span>
      <span className={classes.arrow} aria-hidden="true">
        <ArrowForwardRoundedIcon />
      </span>
    </SurfaceCard>
  );
};
