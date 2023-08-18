import { hashIntegration, Router as SolidRouter, useRoutes } from '@solidjs/router';

import { lazy } from 'solid-js';

import RouteData from './route-data';

import type { RouteDefinition } from '@solidjs/router/dist/types';
import type { ParentComponent } from 'solid-js';

import RouterService from '~/components/common/router/router-service';
import { RoutesDefinitions, RoutesMetas } from '~/services/router';

const Shell = lazy(() => import('~/components/common/layout/shell'));
export const Router: ParentComponent<{ routes?: RouteDefinition[] }> = ({ children, routes } = {}) => {
  const Routes = useRoutes(routes ?? RoutesDefinitions);

  return (
    <SolidRouter source={hashIntegration()}>
      <Shell routes={RoutesMetas}>
        <Routes />
        <RouteData />
        <RouterService />
      </Shell>
      {children}
    </SolidRouter>
  );
};

export default Router;
