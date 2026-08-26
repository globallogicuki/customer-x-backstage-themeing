import { useSidebarOpenState } from '@backstage/core-components';
import { SearchModal, useSearchModal } from '@backstage/plugin-search';
import { makeStyles, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';
import { cx } from './cx';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    height: 38,
    margin: '2px 12px 10px',
    padding: '0 12px',
    width: 'calc(100% - 24px)',
    boxSizing: 'border-box',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.07)',
    color: 'rgba(255,255,255,0.72)',
    font: 'inherit',
    fontSize: 14,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 120ms ease, border-color 120ms ease',
    '&:hover': {
      background: 'rgba(255,255,255,0.11)',
      borderColor: 'rgba(255,255,255,0.18)',
      color: '#FFFFFF',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.navigation.indicator}`,
      outlineOffset: -1,
    },
    '& svg': { width: 20, height: 20, flexShrink: 0 },
  },
  closed: {
    width: 48,
    justifyContent: 'center',
    padding: 0,
    border: 'none',
    background: 'transparent',
    '&:hover': { background: 'rgba(255,255,255,0.08)' },
  },
  placeholder: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  kbd: {
    fontFamily: 'inherit',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: 'rgba(255,255,255,0.55)',
    border: '1px solid rgba(255,255,255,0.16)',
    borderRadius: 5,
    padding: '2px 5px',
    lineHeight: 1,
  },
}));

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad/.test(navigator.platform);

/** Command-palette style search trigger + the Backstage search modal (⌘K / Ctrl+K). */
export const NavSearch = () => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const { state, toggleModal } = useSearchModal();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleModal]);

  const button = (
    <button
      type="button"
      onClick={toggleModal}
      aria-label="Search"
      className={cx(classes.button, !isOpen && classes.closed)}
    >
      <SearchIcon />
      {isOpen && (
        <>
          <span className={classes.placeholder}>Search…</span>
          <kbd className={classes.kbd}>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
        </>
      )}
    </button>
  );

  return (
    <>
      {isOpen ? (
        button
      ) : (
        <Tooltip title="Search (⌘K)" placement="right" enterDelay={300}>
          {button}
        </Tooltip>
      )}
      <SearchModal {...state} toggleModal={toggleModal} />
    </>
  );
};
