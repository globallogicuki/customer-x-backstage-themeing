import { createCustomerXTheme } from './createCustomerXTheme';
import { dark, light } from './modes';

describe('createCustomerXTheme', () => {
  it.each([
    ['light', light],
    ['dark', dark],
  ])('builds a v4 and v5 theme for %s mode', (_name, mode) => {
    // Throws if any component override is undefined or a default style
    // function is invoked with a bad theme (both bit us at runtime only).
    const theme = createCustomerXTheme(mode);
    const v4 = theme.getTheme('v4') as any;
    const v5 = theme.getTheme('v5') as any;

    expect(v4).toBeDefined();
    expect(v5).toBeDefined();
    expect(v4.palette.type).toBe(mode.mode);
    expect(v5.palette.mode).toBe(mode.mode);
    expect(v4.shape.borderRadius).toBe(8);
    expect(v5.shape.borderRadius).toBe(8);
  });

  it('exposes overrides for the components plugins use', () => {
    const v4 = createCustomerXTheme(light).getTheme('v4') as any;
    for (const key of [
      'MuiCard',
      'MuiCardActionArea',
      'MuiButton',
      'MuiChip',
      'BackstageHeader',
    ]) {
      expect(v4.overrides[key]).toBeDefined();
    }
    expect(v4.props.MuiTextField).toEqual({ variant: 'outlined' });
  });

  it('emits @backstage/ui variables from the same tokens', () => {
    const v4 = createCustomerXTheme(dark).getTheme('v4') as any;
    const globals = v4.overrides.MuiCssBaseline['@global'];
    const sel = "[data-theme-name='customer-x'][data-theme-mode='dark']";
    expect(globals[sel]['--bui-accent-bg']).toBe(dark.primary.main);
    expect(globals[sel]['--bui-bg-app']).toBe(dark.n.bg);
  });

  // The MUI palette, the @backstage/ui variables and the `Pill` primitive all
  // read `ModeTokens.tint`. Assert they still agree, so a colour can't be
  // "fixed" in one of the three and silently drift in the others.
  it.each([
    ['light', light],
    ['dark', dark],
  ])('drives palette and @backstage/ui from one tint set in %s', (_n, mode) => {
    const v4 = createCustomerXTheme(mode).getTheme('v4') as any;
    const sel = `[data-theme-name='customer-x'][data-theme-mode='${mode.mode}']`;
    const bui = v4.overrides.MuiCssBaseline['@global'][sel];

    for (const [tone, bg, fg] of [
      ['error', 'errorBackground', 'errorText'],
      ['warning', 'warningBackground', 'warningText'],
      ['info', 'infoBackground', 'infoText'],
    ] as const) {
      expect(v4.palette[bg]).toBe(mode.tint[tone].bg);
      expect(v4.palette[fg]).toBe(mode.tint[tone].fg);
    }

    expect(bui['--bui-negative-bg-subdued']).toBe(mode.tint.error.bg);
    expect(bui['--bui-positive-bg-subdued']).toBe(mode.tint.ok.bg);
    expect(bui['--bui-warning-fg-subdued']).toBe(mode.tint.warning.fg);
    // The deprecated solid ramp must stay an alias of the accent ramp.
    // eslint-disable-next-line @backstage/no-deprecated-bui-tokens
    expect(bui['--bui-bg-solid']).toBe('var(--bui-accent-bg)');
  });
});
