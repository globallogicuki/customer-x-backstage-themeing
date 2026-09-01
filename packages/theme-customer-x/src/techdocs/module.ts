import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { AddonBlueprint } from '@backstage/plugin-techdocs-react/alpha';
import { TechDocsThemeAddon } from './TechDocsThemeAddon';

/**
 * Registers the portal's TechDocs reader theme as an addon on the `techdocs`
 * plugin. Add it to the app's `features` next to the other CustomerX modules.
 */
export const techDocsThemeModule = createFrontendModule({
  pluginId: 'techdocs',
  extensions: [
    AddonBlueprint.make({
      name: 'accelerate-theme',
      params: {
        name: 'AccelerateTheme',
        location: 'Content',
        component: TechDocsThemeAddon,
      },
    }),
  ],
});
