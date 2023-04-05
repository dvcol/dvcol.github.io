import { hashIntegration, Router as SolidRouter, useRoutes } from '@solidjs/router';

import type { ParentComponent } from 'solid-js';

import { RoutesDefinitions } from '~/services/router';

export const Router: ParentComponent = ({ children } = {}) => {
  const AppRoutes = useRoutes(RoutesDefinitions);
  return (
    <SolidRouter source={hashIntegration()}>
      <AppRoutes />
      {children}
    </SolidRouter>
  );
};

export default Router;
