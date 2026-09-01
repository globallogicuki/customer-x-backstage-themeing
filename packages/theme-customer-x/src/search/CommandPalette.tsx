import { Link } from '@backstage/core-components';
import type { SearchResult } from '@backstage/plugin-search-common';
import { useSearch } from '@backstage/plugin-search-react';
import { makeStyles } from '@material-ui/core';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ExtensionRoundedIcon from '@material-ui/icons/ExtensionRounded';
import LayersRoundedIcon from '@material-ui/icons/LayersRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import WidgetsRoundedIcon from '@material-ui/icons/WidgetsRounded';
import {
  KeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../components/Skeleton';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { font, radius } from '../tokens';

const useStyles = makeStyles(theme => {
  const t = tokensFor(theme);
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '70vh',
      background: theme.palette.background.paper,
    },
    inputRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 56,
      padding: '0 16px',
      borderBottom: `1px solid ${theme.palette.divider}`,
      flexShrink: 0,
      '& svg': { color: theme.palette.secondary.main, flexShrink: 0 },
    },
    input: {
      flex: 1,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: 'inherit',
      fontSize: font.lg,
      color: theme.palette.text.primary,
      '&::placeholder': { color: theme.palette.text.disabled },
    },
    body: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      padding: '8px 0',
    },
    group: {
      padding: '10px 16px 4px',
      fontSize: font.sm,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '0 8px',
      padding: '8px 8px',
      borderRadius: radius.md,
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover': { backgroundColor: t.hoverOverlay },
    },
    rowActive: {
      backgroundColor: t.selectedOverlay,
      '&:hover': { backgroundColor: t.selectedOverlay },
    },
    rowIcon: {
      width: 28,
      height: 28,
      borderRadius: radius.sm,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: t.accentWash,
      color: t.accentText,
      '& svg': { width: 16, height: 16 },
    },
    rowMain: { minWidth: 0, flex: 1 },
    rowTitle: {
      fontSize: font.md,
      fontWeight: 500,
      color: t.heading,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    rowMeta: {
      fontSize: font.sm,
      marginTop: 1,
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    rowHint: {
      fontSize: font.xs,
      color: theme.palette.text.secondary,
      flexShrink: 0,
    },
    empty: {
      padding: '28px 16px',
      textAlign: 'center',
      fontSize: font.base,
      color: theme.palette.text.secondary,
      lineHeight: 1.55,
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      height: 40,
      padding: '0 16px',
      borderTop: `1px solid ${theme.palette.divider}`,
      fontSize: font.sm,
      color: theme.palette.text.secondary,
      flexShrink: 0,
    },
    hint: { display: 'inline-flex', alignItems: 'center', gap: 6 },
    kbd: {
      fontFamily: 'inherit',
      fontSize: font.xs,
      fontWeight: 500,
      color: theme.palette.text.secondary,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: radius.sm,
      padding: '2px 5px',
      lineHeight: 1,
      minWidth: 18,
      textAlign: 'center',
    },
    all: { marginLeft: 'auto', fontWeight: 500 },
  };
});

/** Reading order for result groups; anything unlisted follows, alphabetically. */
const GROUP_ORDER = ['software-catalog', 'techdocs', 'software-templates'];
const PER_GROUP = 5;
const GROUP_LABEL: Record<string, string> = {
  'software-catalog': 'Catalogue',
  techdocs: 'Documentation',
  'software-templates': 'Templates',
};

/** Search documents carry extra indexer fields beyond the typed core. */
const fields = (r: SearchResult) =>
  r.document as unknown as Record<string, unknown>;

function iconFor(r: SearchResult): ReactNode {
  const kind = String(fields(r).kind ?? '').toLowerCase();
  if (r.type === 'techdocs') return <DescriptionRoundedIcon />;
  if (r.type === 'software-templates' || kind === 'template')
    return <CodeRoundedIcon />;
  switch (kind) {
    case 'api':
      return <ExtensionRoundedIcon />;
    case 'system':
    case 'domain':
      return <LayersRoundedIcon />;
    case 'group':
    case 'user':
      return <PeopleAltRoundedIcon />;
    case 'component':
      return <WidgetsRoundedIcon />;
    default:
      return <SearchRoundedIcon />;
  }
}

function metaFor(r: SearchResult): string {
  const d = fields(r);
  const parts: string[] = [];
  if (r.type === 'techdocs') {
    parts.push('Docs');
    if (d.name) parts.push(String(d.name));
  } else {
    if (d.kind) parts.push(String(d.kind));
    if (d.type) parts.push(String(d.type));
    if (d.owner) parts.push(String(d.owner));
  }
  const text = parts.length ? parts.join(' · ') : String(d.text ?? '');
  return text.length > 90 ? `${text.slice(0, 88)}…` : text;
}

export interface CommandPaletteProps {
  /** Closes the surrounding `SearchModal`. */
  toggleModal: () => void;
}

/**
 * The body of the ⌘K dialog. One input, results grouped by where they live,
 * arrow keys to move, Enter to open, and a footer that says so. Reads the
 * search context `SearchModal` provides, so it stays on whatever search
 * backend the app has configured.
 */
export const CommandPalette = ({ toggleModal }: CommandPaletteProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { term, setTerm, result } = useSearch();
  const [draft, setDraft] = useState(term);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => inputRef.current?.focus(), []);

  // Debounce keystrokes into the search context.
  useEffect(() => {
    const id = setTimeout(() => setTerm(draft), 150);
    return () => clearTimeout(id);
  }, [draft, setTerm]);

  // Up to PER_GROUP results per type, groups in reading order. A cap per
  // group (rather than on the whole list) stops one noisy indexer — docs
  // pages, typically — from pushing the catalogue out of view entirely.
  const groups = useMemo(() => {
    const byType = new Map<string, SearchResult[]>();
    for (const r of result.value?.results ?? []) {
      const list = byType.get(r.type) ?? [];
      if (list.length < PER_GROUP) list.push(r);
      byType.set(r.type, list);
    }
    const ordered = [...byType.entries()].sort(([a], [b]) => {
      const ia = GROUP_ORDER.indexOf(a);
      const ib = GROUP_ORDER.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    // Flat index across groups, for keyboard navigation.
    let i = 0;
    return ordered.map(
      ([type, rows]) =>
        [type, rows.map(r => ({ r, i: i++ }))] as [
          string,
          Array<{ r: SearchResult; i: number }>,
        ],
    );
  }, [result.value]);

  const results = useMemo(
    () => groups.flatMap(([, rows]) => rows.map(({ r }) => r)),
    [groups],
  );

  useEffect(() => setActive(0), [results]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const open = (location: string) => {
    toggleModal();
    navigate(location);
  };
  const openAll = () => {
    toggleModal();
    navigate(`/search?query=${encodeURIComponent(draft.trim())}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(a => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[active]) open(results[active].document.location);
      else if (draft.trim()) openAll();
    }
  };

  const hasTerm = draft.trim().length > 0;
  const loading = hasTerm && (result.loading || term !== draft.trim());

  let body: ReactNode;
  if (!hasTerm) {
    body = (
      <div className={classes.empty}>
        Search services, APIs, docs, templates and teams.
      </div>
    );
  } else if (loading && results.length === 0) {
    body = (
      <div style={{ padding: '4px 0' }}>
        {[72, 56, 64].map((w, i) => (
          <div key={i} className={classes.row}>
            <Skeleton width={28} height={28} />
            <span className={classes.rowMain}>
              <Skeleton width={`${w}%`} height={14} />
            </span>
          </div>
        ))}
      </div>
    );
  } else if (results.length === 0) {
    body = (
      <div className={classes.empty}>
        No results for “{draft.trim()}”.
        <br />
        Press Enter to search everything, including full-text.
      </div>
    );
  } else {
    body = groups.map(([type, rows]) => (
      <div key={type} role="group" aria-label={GROUP_LABEL[type] ?? type}>
        <div className={classes.group}>{GROUP_LABEL[type] ?? type}</div>
        {rows.map(({ r, i }) => (
          <Link
            key={`${r.type}-${r.document.location}`}
            to={r.document.location}
            underline="none"
            data-index={i}
            role="option"
            aria-selected={i === active}
            className={cx(classes.row, i === active && classes.rowActive)}
            onMouseEnter={() => setActive(i)}
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault();
              open(r.document.location);
            }}
          >
            <span className={classes.rowIcon} aria-hidden="true">
              {iconFor(r)}
            </span>
            <span className={classes.rowMain}>
              <span className={classes.rowTitle} style={{ display: 'block' }}>
                {r.document.title}
              </span>
              <span className={classes.rowMeta} style={{ display: 'block' }}>
                {metaFor(r)}
              </span>
            </span>
            {i === active && <span className={classes.rowHint}>↵</span>}
          </Link>
        ))}
      </div>
    ));
  }

  return (
    <div className={classes.root} data-cx-palette="">
      <div className={classes.inputRow}>
        <SearchRoundedIcon />
        <input
          ref={inputRef}
          className={classes.input}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search services, APIs, docs and teams"
          aria-label="Search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="cx-palette-results"
          aria-activedescendant={undefined}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
      <div
        ref={listRef}
        id="cx-palette-results"
        role="listbox"
        className={classes.body}
      >
        {body}
      </div>
      <div className={classes.footer}>
        <span className={classes.hint}>
          <kbd className={classes.kbd}>↑</kbd>
          <kbd className={classes.kbd}>↓</kbd> move
        </span>
        <span className={classes.hint}>
          <kbd className={classes.kbd}>↵</kbd> open
        </span>
        <span className={classes.hint}>
          <kbd className={classes.kbd}>esc</kbd> close
        </span>
        {hasTerm && (
          <Link
            to={`/search?query=${encodeURIComponent(draft.trim())}`}
            className={classes.all}
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault();
              openAll();
            }}
          >
            All results →
          </Link>
        )}
      </div>
    </div>
  );
};
