/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ModeTokens } from '../../modes';
import { controlComponents } from './controls';
import { globalComponents } from './global';
import { inputComponents } from './inputs';
import { surfaceComponents } from './surfaces';
import { tableComponents } from './tables';

/**
 * Material UI component overrides. These reach every MUI v4/v5 component in
 * the app — including plugins — through theme context.
 *
 * `defaults` is Backstage's `defaultComponentThemes`; the baseline extends it
 * rather than replacing it.
 */
export function createMuiComponents(
  t: ModeTokens,
  defaults: any,
): Record<string, any> {
  return {
    ...globalComponents(t, defaults),
    ...surfaceComponents(t),
    ...controlComponents(t),
    ...inputComponents(t),
    ...tableComponents(t),
  };
}
