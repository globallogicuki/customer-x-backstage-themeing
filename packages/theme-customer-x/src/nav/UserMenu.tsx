import { useSidebarOpenState } from '@backstage/core-components';
import {
  appThemeApiRef,
  identityApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import KeyboardRoundedIcon from '@material-ui/icons/KeyboardRounded';
import SettingsBrightnessRoundedIcon from '@material-ui/icons/SettingsBrightnessRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import UnfoldMoreRoundedIcon from '@material-ui/icons/UnfoldMoreRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useObservable from 'react-use/esm/useObservable';
import { cx } from '../cx';
import { tokensFor } from '../theme/modes';
import { brand, font, radius } from '../tokens';
import { useCurrentUser } from '../useCurrentUser';
import { RailTooltip } from './RailTooltip';

const useStyles = makeStyles(theme => {
  const { nav } = tokensFor(theme);
  return {
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flex: 1,
      minWidth: 0,
      margin: '4px 0 8px 8px',
      padding: 8,
      border: 'none',
      borderRadius: radius.md,
      background: 'transparent',
      color: nav.selectedColor,
      font: 'inherit',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'background-color 120ms ease',
      '&:hover, &[aria-expanded="true"]': { background: nav.hover },
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.navigation.indicator}`,
        outlineOffset: -2,
      },
    },
    closed: { width: 40, padding: 0, justifyContent: 'center' },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: font.sm,
      fontWeight: 600,
      color: brand.navy,
      background: brand.cyan,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    text: { display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1, lineHeight: 1.2 },
    name: {
      fontSize: font.base,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    meta: {
      fontSize: font.sm,
      color: nav.color,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginTop: 2,
    },
    chevron: { color: nav.color, flexShrink: 0, '& svg': { width: 18, height: 18 } },
    menu: { minWidth: 240 },
    header: {
      padding: '8px 12px 10px',
      '& b': { display: 'block', fontSize: font.md, fontWeight: 600, color: tokensFor(theme).heading },
      '& span': { display: 'block', fontSize: font.sm, color: theme.palette.text.secondary, marginTop: 2 },
    },
    section: {
      padding: '8px 12px 2px',
      fontSize: font.xs,
      fontWeight: 500,
      color: theme.palette.text.secondary,
    },
    icon: { minWidth: 32, '& svg': { width: 18, height: 18 } },
    check: { marginLeft: 'auto', color: theme.palette.secondary.main, '& svg': { width: 16, height: 16 } },
  };
});

function initials(name?: string, email?: string) {
  const source = name?.trim() || email?.split('@')[0] || '?';
  return source
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase() ?? '')
    .join('');
}

export interface UserMenuProps {
  /** Opens the keyboard-shortcuts sheet. */
  onShowShortcuts: () => void;
}

/**
 * The signed-in person, at the foot of the rail. One click reaches theme,
 * settings, shortcuts and sign-out — the things a person wants once a day
 * and should never have to hunt for.
 */
export const UserMenu = ({ onShowShortcuts }: UserMenuProps) => {
  const classes = useStyles();
  const { isOpen } = useSidebarOpenState();
  const navigate = useNavigate();
  const identityApi = useApi(identityApiRef);
  const appThemeApi = useApi(appThemeApiRef);
  const activeTheme = useObservable(
    appThemeApi.activeThemeId$(),
    appThemeApi.getActiveThemeId(),
  );
  const { displayName, email, picture, userEntityRef } = useCurrentUser();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const name = displayName ?? 'Signed in';
  const meta = email ?? userEntityRef ?? '';
  const close = () => setAnchor(null);
  const go = (to: string) => {
    close();
    navigate(to);
  };
  const setTheme = (id: string | undefined) => {
    appThemeApi.setActiveThemeId(id);
    close();
  };

  const themeOptions: Array<{ id?: string; label: string; icon: JSX.Element }> = [
    { id: 'light', label: 'Light', icon: <Brightness7RoundedIcon /> },
    { id: 'dark', label: 'Dark', icon: <Brightness4RoundedIcon /> },
    { id: undefined, label: 'Match system', icon: <SettingsBrightnessRoundedIcon /> },
  ];

  return (
    <>
      <RailTooltip title={name}>
        <button
          type="button"
          className={cx(classes.button, !isOpen && classes.closed)}
          onClick={e => setAnchor(e.currentTarget)}
          aria-haspopup="menu"
          aria-expanded={Boolean(anchor)}
          aria-label={`${name} — account menu`}
        >
          <span
            className={classes.avatar}
            style={picture ? { backgroundImage: `url(${picture})` } : undefined}
            aria-hidden="true"
          >
            {!picture && initials(name, email)}
          </span>
          {isOpen && (
            <>
              <span className={classes.text}>
                <span className={classes.name}>{name}</span>
                {meta && <span className={classes.meta}>{meta}</span>}
              </span>
              <span className={classes.chevron} aria-hidden="true">
                <UnfoldMoreRoundedIcon />
              </span>
            </>
          )}
        </button>
      </RailTooltip>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={close}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        classes={{ paper: classes.menu }}
      >
        <div className={classes.header}>
          <b>{name}</b>
          {meta && <span>{meta}</span>}
        </div>
        <Divider />
        <div className={classes.section}>Theme</div>
        {themeOptions.map(o => (
          <MenuItem key={o.label} onClick={() => setTheme(o.id)} dense>
            <ListItemIcon className={classes.icon}>{o.icon}</ListItemIcon>
            <ListItemText primary={o.label} />
            {activeTheme === o.id && (
              <span className={classes.check} aria-label="Selected">
                <CheckRoundedIcon />
              </span>
            )}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => go('/settings')} dense>
          <ListItemIcon className={classes.icon}>
            <SettingsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            close();
            onShowShortcuts();
          }}
          dense
        >
          <ListItemIcon className={classes.icon}>
            <KeyboardRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Keyboard shortcuts" />
          <span className={classes.check} style={{ color: 'inherit', fontSize: font.xs }}>
            ?
          </span>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            close();
            identityApi.signOut();
          }}
          dense
        >
          <ListItemIcon className={classes.icon}>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Menu>
    </>
  );
};
