import {
  createFrontendModule,
  createFrontendPlugin,
  createRouteRef,
  NotFoundErrorPage,
  PageBlueprint,
} from '@backstage/frontend-plugin-api';
import {
  NavContentBlueprint,
  SignInPageBlueprint,
  SwappableComponentBlueprint,
  ThemeBlueprint,
} from '@backstage/plugin-app-react';
import {
  CustomerXSidebar,
  CustomerXThemeProvider,
  techDocsThemeModule,
} from '@globallogicuki/backstage-theme-customer-x';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

/**
 * Registers the CustomerX theme package with the app. Everything visual lives
 * in `@globallogicuki/backstage-theme-customer-x`; this file only decides which
 * stock surfaces are replaced.
 */

// Named `light`/`dark` so they REPLACE Backstage's theme:app/light|dark.
const theme = (name: 'light' | 'dark', title: string, icon: JSX.Element) =>
  ThemeBlueprint.make({
    name,
    params: {
      theme: {
        id: name,
        title,
        variant: name,
        icon,
        Provider: ({ children }) => (
          <CustomerXThemeProvider mode={name}>
            {children}
          </CustomerXThemeProvider>
        ),
      },
    },
  });

const nav = NavContentBlueprint.make({
  params: {
    component: ({ navItems }) => <CustomerXSidebar navItems={navItems} />,
  },
});

// Replaces sign-in-page:app.
const signInPage = SignInPageBlueprint.make({
  params: {
    loader: () =>
      import('@globallogicuki/backstage-theme-customer-x').then(
        m => m.CustomerXSignInPage,
      ),
  },
});

// Replaces component:app/core-not-found-error-page (the "dropped the mic" 404).
const notFoundPage = SwappableComponentBlueprint.make({
  name: 'core-not-found-error-page',
  params: define =>
    define({
      component: NotFoundErrorPage,
      loader: () =>
        import('@globallogicuki/backstage-theme-customer-x').then(
          m => m.CustomerXNotFoundPage,
        ),
    }),
});

export const landingRouteRef = createRouteRef();

const landingPage = PageBlueprint.make({
  name: 'landing',
  params: {
    path: '/',
    routeRef: landingRouteRef,
    title: 'Home',
    icon: <HomeRoundedIcon />,
    noHeader: true,
    loader: () =>
      import('@globallogicuki/backstage-theme-customer-x').then(m => (
        <m.LandingPage />
      )),
  },
});

/** Drop-in for `createApp({ features })`. */
export const customerXFeatures = [
  createFrontendModule({
    pluginId: 'app',
    extensions: [
      theme('light', 'CustomerX Light', <WbSunnyIcon />),
      theme('dark', 'CustomerX Dark', <Brightness2Icon />),
      nav,
      signInPage,
      notFoundPage,
    ],
  }),
  createFrontendPlugin({
    pluginId: 'customer-x',
    routes: { root: landingRouteRef },
    extensions: [landingPage],
  }),
  // Styles the TechDocs reader (a shadow DOM the MUI theme cannot reach).
  techDocsThemeModule,
];
