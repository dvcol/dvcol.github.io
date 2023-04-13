import { hashIntegration, Router as SolidRouter, useRoutes } from '@solidjs/router';

import RouteData from './route-data';

import type { RouteDefinition } from '@solidjs/router/dist/types';
import type { ParentComponent } from 'solid-js';

import { Layout } from '~/components';
import { RoutesDefinitions, RoutesMetas } from '~/services/router';

export const Router: ParentComponent<{ routes?: RouteDefinition[] }> = ({ children, routes } = {}) => {
  const Routes = useRoutes(routes ?? RoutesDefinitions);
  return (
    <SolidRouter source={hashIntegration()}>
      <Layout routes={RoutesMetas}>
        <Routes />
        <RouteData />
      </Layout>
      {children}
    </SolidRouter>
  );
};

export default Router;
