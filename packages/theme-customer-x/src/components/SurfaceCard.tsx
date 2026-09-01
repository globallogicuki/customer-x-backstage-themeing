import { makeStyles } from '@material-ui/core';
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { interactive, radius } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    boxSizing: 'border-box',
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: radius.lg,
    color: 'inherit',
    textDecoration: 'none',
  },
  interactive: {
    transition: interactive.transition,
    // The card holds its position and firms up: border to the stronger
    // neutral, fill to the muted paper. No lift, no shadow.
    '&:hover': {
      borderColor: tokensFor(theme).n.borderStrong,
      backgroundColor: tokensFor(theme).n.paperMuted,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
  },
  accentHover: {
    '&:hover': { borderColor: theme.palette.secondary.main },
  },
}));

export type SurfaceCardProps<C extends ElementType = 'div'> = {
  /** Element or component to render as, e.g. `Link` from core-components. */
  component?: C;
  /** Lift on hover; use for cards that are entirely clickable. */
  interactive?: boolean;
  /** Also tint the border with the accent colour on hover. */
  accentHover?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, 'component' | 'className' | 'children'>;

/**
 * The base surface every card in the design system sits on: paper background,
 * hairline border, the same radius as themed MUI cards. No shadow at rest.
 */
export function SurfaceCard<C extends ElementType = 'div'>({
  component,
  interactive: isInteractive,
  accentHover,
  className,
  children,
  ...rest
}: SurfaceCardProps<C>) {
  const classes = useStyles();
  const Component: ElementType = component ?? 'div';
  return (
    <Component
      className={cx(
        classes.root,
        isInteractive && classes.interactive,
        accentHover && classes.accentHover,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
