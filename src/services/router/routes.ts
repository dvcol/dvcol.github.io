import { lazy } from 'solid-js';

import type { RouteDefinition } from '@solidjs/router/dist/types';

export enum Routes {
  Home = '/',
  Particles = '/particles',
  Synology = '/synology',
  SynologyDemo = '/synology/demo/*',
  AboutMe = '/about/me',
}

export const RoutesArray = Object.entries(Routes) as [Routes, string][];

export const RoutesDefinitions: RouteDefinition[] = [
  { path: Routes.Home, component: lazy(() => import('~/components/pages/home/home')) },
  { path: Routes.Particles, component: lazy(() => import('~/components/common/particles/particles-wip')) },
  { path: Routes.Synology, component: lazy(() => import('~/components/pages/synology/synology-home')) },
  { path: Routes.SynologyDemo, component: lazy(() => import('~/components/pages/synology/synology-demo')) },
  { path: Routes.AboutMe, component: lazy(() => import('~/components/pages/about-me/about-me')) },
];
