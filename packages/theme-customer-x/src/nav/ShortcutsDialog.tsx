import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { tokensFor } from '../theme/modes';
import { font, radius } from '../tokens';
import { GO_SHORTCUTS } from './useGlobalShortcuts';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& h2': { fontSize: font.lg, fontWeight: 600, color: tokensFor(theme).heading },
  },
  group: {
    fontSize: font.sm,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    margin: '12px 0 6px',
    '&:first-child': { marginTop: 0 },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: '7px 0',
    fontSize: font.md,
    borderTop: `1px solid ${theme.palette.divider}`,
    '&:first-of-type': { borderTop: 'none' },
  },
  keys: { display: 'inline-flex', gap: 4, alignItems: 'center' },
  then: { fontSize: font.xs, color: theme.palette.text.secondary, margin: '0 2px' },
  kbd: {
    fontFamily: 'inherit',
    fontSize: font.xs,
    fontWeight: 500,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: radius.sm,
    padding: '3px 6px',
    lineHeight: 1,
    minWidth: 20,
    textAlign: 'center',
    background: theme.palette.background.default,
  },
}));

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad/.test(navigator.platform);

export interface ShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
}

/** The keyboard shortcuts sheet, opened with `?` or from the user menu. */
export const ShortcutsDialog = ({ open, onClose }: ShortcutsDialogProps) => {
  const classes = useStyles();
  const Keys = ({ keys }: { keys: string[] }) => (
    <span className={classes.keys}>
      {keys.map((k, i) => (
        <span key={k} className={classes.keys}>
          {i > 0 && <span className={classes.then}>then</span>}
          <kbd className={classes.kbd}>{k}</kbd>
        </span>
      ))}
    </span>
  );
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle disableTypography className={classes.title}>
        <h2>Keyboard shortcuts</h2>
        <IconButton size="small" onClick={onClose} aria-label="Close">
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className={classes.group}>Everywhere</div>
        <div className={classes.row}>
          <span>Search</span>
          <Keys keys={[isMac ? '⌘ K' : 'Ctrl K']} />
        </div>
        <div className={classes.row}>
          <span>This sheet</span>
          <Keys keys={['?']} />
        </div>
        <div className={classes.group}>Go to</div>
        {GO_SHORTCUTS.map(s => (
          <div key={s.key} className={classes.row}>
            <span>{s.label}</span>
            <Keys keys={['g', s.key]} />
          </div>
        ))}
        <div className={classes.group}>In the search palette</div>
        <div className={classes.row}>
          <span>Move / open / close</span>
          <span className={classes.keys}>
            <kbd className={classes.kbd}>↑</kbd>
            <kbd className={classes.kbd}>↓</kbd>
            <kbd className={classes.kbd}>↵</kbd>
            <kbd className={classes.kbd}>esc</kbd>
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
