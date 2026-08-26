import { useSidebarOpenState } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';

const useStyles = makeStyles({
  label: {
    padding: '18px 24px 6px',
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.42)',
    whiteSpace: 'nowrap',
  },
  rule: {
    height: 1,
    margin: '12px 20px',
    background: 'rgba(255,255,255,0.10)',
  },
});

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
