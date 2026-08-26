import { createApp } from '@backstage/frontend-defaults';
// Provides the tech-insights API used by the tech-insights-overview page.
import techInsightsPlugin from '@backstage-community/plugin-tech-insights/alpha';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import techInsightsOverviewPlugin from '@globallogicuki/backstage-plugin-tech-insights-overview/alpha';
import skillsMarketplacePlugin from '@globallogicuki/backstage-plugin-skills-marketplace/alpha';
import terraformPlugin from '@globallogicuki/backstage-plugin-terraform/alpha';
import unleashPlugin from '@globallogicuki/backstage-plugin-unleash/alpha';
import { customerXFeatures } from './modules/customer-x';
// Default (scaffolded) sidebar. Not registered while the CustomerX nav is
// active — both provide `nav-content:app`, so only one may be enabled at a
// time. To switch back: add `navModule` to `features` and remove the CustomerX
// nav from `customerXFeatures` (or set `nav-content:app: false` in app-config
// to fall back to Backstage's built-in sidebar instead).
// import { navModule } from './modules/nav';
// Default (scaffolded) home-page widget. Inert while `page:home: false` is set
// in app-config; re-enable that page and register `homeModule` to restore it.
// import { homeModule } from './modules/home';

export default createApp({
  features: [
    catalogPlugin,
    techInsightsOverviewPlugin,
    skillsMarketplacePlugin,
    techInsightsPlugin,
    terraformPlugin,
    unleashPlugin,
    ...customerXFeatures,
  ],
});
