import { useSidebarOpenState } from '@backstage/core-components';
import { useSearchModal } from '@backstage/plugin-search';
import { makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';
import { cx } from '../cx';
import { font, radius } from '../tokens';
import { tokensFor } from '../theme/modes';
import { CustomerXSearchModal } from '../search';
import { RailTooltip } from './RailTooltip';

const useStyles = makeStyles(theme => {
  const { nav } = tokensFor(theme);
  return {
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 36,
      margin: '2px 8px 8px',
      padding: '0 8px',
      width: 'calc(100% - 16px)',
      boxSizing: 'border-box',
      borderRadius: radius.md,
      border: `1px solid ${nav.surfaceBorder}`,
      background: nav.surface,
      color: nav.color,
      font: 'inherit',
      fontSize: font.md,
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'background-color 120ms ease, border-color 120ms ease',
      '&:hover': {
        background: nav.surfaceHover,
        borderColor: nav.divider,
        color: nav.selectedColor,
      },
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.navigation.indicator}`,
        outlineOffset: -1,
      },
      '& svg': { width: 20, height: 20, flexShrink: 0 },
    },
    closed: {
      width: 40,
      justifyContent: 'center',
      padding: 0,
      border: 'none',
      background: 'transparent',
      '&:hover': { background: nav.hover },
    },
    placeholder: {
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    kbd: {
      fontFamily: 'inherit',
      fontSize: font.xs,
      fontWeight: 500,
      letterSpacing: 0,
      color: nav.label,
      border: `1px solid ${nav.surfaceBorder}`,
      borderRadius: radius.sm,
      padding: '2px 4px',
      lineHeight: 1,
    },
  };
});

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

  return (
    <>
      <RailTooltip title="Search (⌘K)">
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
      </RailTooltip>
      <CustomerXSearchModal {...state} toggleModal={toggleModal} />
    </>
  );
};
