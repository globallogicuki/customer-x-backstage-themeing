import { useSidebarOpenState } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
import { tokensFor } from '../theme/modes';
import { font } from '../tokens';

const useStyles = makeStyles(theme => ({
  label: {
    padding: '16px 16px 4px',
    fontSize: font.sm,
    fontWeight: 500,
    color: tokensFor(theme).nav.label,
    whiteSpace: 'nowrap',
  },
  rule: {
    height: 1,
    margin: '12px 16px',
    background: tokensFor(theme).nav.divider,
  },
}));

export interface NavSectionProps {
  label: string;
  children: ReactNode;
}

/** A labelled group of nav items. Shows a hairline instead when collapsed. */
export const NavSection = ({ label, children }: NavSectionProps) => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div role="group" aria-label={label}>
      {isOpen ? (
        <div className={classes.label}>{label}</div>
      ) : (
        <div className={classes.rule} aria-hidden="true" />
      )}
      {children}
    </div>
  );
};
