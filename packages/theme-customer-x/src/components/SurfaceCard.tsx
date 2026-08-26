import { makeStyles } from '@material-ui/core';
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { interactive as interactiveToken, shadow } from '../tokens';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    boxSizing: 'border-box',
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 14,
    color: 'inherit',
    textDecoration: 'none',
  },
  interactive: {
    transition: interactiveToken.transition,
    '&:hover': {
      transform: interactiveToken.transform,
      boxShadow:
        theme.palette.type === 'dark' ? shadow.dark.md : shadow.light.md,
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
 * The base surface every card in the design system sits on: paper
 * background, hairline border, 14px radius. No shadow at rest.
 */
export function SurfaceCard<C extends ElementType = 'div'>({
  component,
  interactive,
  accentHover,
  className,
  children,
  ...rest
}: SurfaceCardProps<C>) {
  const classes = useStyles();
  const Component: ElementType = component ?? 'div';
  const cls = [
    classes.root,
    interactive && classes.interactive,
    accentHover && classes.accentHover,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Component className={cls} {...rest}>
      {children}
    </Component>
  );
}
