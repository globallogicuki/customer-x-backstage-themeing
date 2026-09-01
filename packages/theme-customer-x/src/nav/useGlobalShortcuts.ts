import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** A two-key chord (`g` then a letter) that goes somewhere. */
export interface GoShortcut {
  key: string;
  label: string;
  to: string;
}

/**
 * The portal's `g …` chords. Listed here once so the shortcuts sheet and the
 * key handler can never disagree.
 */
export const GO_SHORTCUTS: GoShortcut[] = [
  { key: 'h', label: 'Home', to: '/' },
  { key: 'c', label: 'Catalogue', to: '/catalog' },
  { key: 'a', label: 'APIs', to: '/api-docs' },
  { key: 'd', label: 'Docs', to: '/docs' },
  { key: 't', label: 'Create from a template', to: '/create' },
  { key: 's', label: 'Settings', to: '/settings' },
];

const CHORD_WINDOW_MS = 800;

function isTyping(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT' ||
    el.isContentEditable
  );
}

/**
 * Global keyboard shortcuts: `g` + letter to navigate, `?` for the sheet.
 * (⌘K lives with the search trigger.) Ignored while typing in a field or when
 * a modifier is held, so they never fight with the browser or a form.
 */
export function useGlobalShortcuts(onShowSheet: () => void) {
  const navigate = useNavigate();

  useEffect(() => {
    let pendingG = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;

      if (e.key === '?') {
        e.preventDefault();
        onShowSheet();
        return;
      }

      const now = Date.now();
      if (pendingG && now - pendingG < CHORD_WINDOW_MS) {
        const hit = GO_SHORTCUTS.find(s => s.key === e.key.toLowerCase());
        pendingG = 0;
        if (hit) {
          e.preventDefault();
          navigate(hit.to);
        }
        return;
      }
      pendingG = e.key.toLowerCase() === 'g' ? now : 0;
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, onShowSheet]);
}
