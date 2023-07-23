import { useLocation, useNavigate } from '@solidjs/router';

import type { Component } from 'solid-js';

import { routerService } from '~/services/router/router';

export const RouterService: Component = () => {
  const location = useLocation();
  const navigate = useNavigate();

  routerService.setLocation(location);
  routerService.setNavigate(navigate);

  return <div hidden aria-hidden="true" id="route-navigate" />;
};

export default RouterService;
