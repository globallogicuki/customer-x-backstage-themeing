import { Link, useSidebarOpenState } from '@backstage/core-components';
import { makeStyles } from '@material-ui/core';
import { CustomerXLogo, CustomerXMark } from '../brand';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 64,
    width: '100%',
    padding: '14px 16px',
    boxSizing: 'border-box',
    textDecoration: 'none',
    color: tokensFor(theme).nav.selectedColor,
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.navigation.indicator}`,
      outlineOffset: -6,
      borderRadius: 12,
    },
  },
  closed: {
    justifyContent: 'center',
    padding: 0,
  },
}));

/** Brand block at the top of the navigation rail. */
export const BrandBlock = () => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <Link
      to="/"
      underline="none"
      aria-label="Accelerate — home"
      className={cx(classes.root, !isOpen && classes.closed)}
    >
      {isOpen ? (
        <CustomerXLogo size={28} tagline="Developer Platform" />
      ) : (
        <CustomerXMark size={28} />
      )}
    </Link>
  );
};
