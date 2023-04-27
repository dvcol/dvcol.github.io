import { hashIntegration, Router as SolidRouter, useRoutes } from '@solidjs/router';

import { Transition } from 'solid-transition-group';

import RouteData from './route-data';

import type { RouteDefinition } from '@solidjs/router/dist/types';
import type { ParentComponent } from 'solid-js';
import type { TransitionEvents } from 'solid-transition-group';

import { Shell } from '~/components';
import { RoutesDefinitions, RoutesMetas } from '~/services/router';

const duration = 225;
export const Router: ParentComponent<{ routes?: RouteDefinition[] }> = ({ children, routes } = {}) => {
  const Routes = useRoutes(routes ?? RoutesDefinitions);

  const onEnter: TransitionEvents['onEnter'] = (el, done) => {
    const enter = el.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration,
    });
    enter.finished.then(done);
  };

  const onExit: TransitionEvents['onExit'] = (el, done) => {
    const exit = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
    });
    exit.finished.then(done);
  };
  return (
    <SolidRouter source={hashIntegration()}>
      <Shell routes={RoutesMetas}>
        <Transition mode={'outin'} onEnter={onEnter} onExit={onExit}>
          <Routes />
        </Transition>
        <RouteData />
      </Shell>
      {children}
    </SolidRouter>
  );
};

export default Router;
