import { createSignal, lazy } from 'solid-js';

import type { RouteDefinition } from '@solidjs/router/dist/types';

export enum Routes {
  Home = '/',
  Particles = '/particles',
  Synology = '/synology',
  SynologyDemo = '/synology/demo',
  AboutMe = '/about/me',
  Contact = '/contact',
}

export type RouteMeta = {
  path: Routes;
  name: keyof typeof Routes;
  title: string;
};

const RoutesMeta: Record<keyof typeof Routes, RouteMeta> = {
  Home: {
    path: Routes.Home,
    name: 'Home',
    title: 'routes.title.home',
  },
  Synology: {
    path: Routes.Synology,
    name: 'Synology',
    title: 'routes.title.synology',
  },
  AboutMe: {
    path: Routes.AboutMe,
    name: 'AboutMe',
    title: 'routes.title.about_me',
  },
  Particles: {
    path: Routes.Particles,
    name: 'Particles',
    title: 'routes.title.particles',
  },
  SynologyDemo: {
    path: Routes.SynologyDemo,
    name: 'SynologyDemo',
    title: 'routes.title.synology_demo',
  },
  Contact: {
    path: Routes.Contact,
    name: 'Contact',
    title: 'routes.title.contact',
  },
};

export const RoutesMetas = Object.values(RoutesMeta);

const [routeData, setRouteData] = createSignal<RouteMeta>();

export const getRouteData = routeData;

const getData =
  (meta: RouteMeta): (() => RouteMeta) =>
  () => {
    setRouteData(meta);
    return meta;
  };

export const RoutesDefinitions: RouteDefinition[] = [
  {
    path: Routes.Home,
    component: lazy(() => import('~/components/pages/home/home')),
    data: getData(RoutesMeta.Home),
  },
  {
    path: Routes.Particles,
    component: lazy(() => import('~/components/common/particles/particles-wip')),
    data: getData(RoutesMeta.Particles),
  },
  {
    path: Routes.Synology,
    component: lazy(() => import('~/components/pages/synology/synology-home')),
    data: getData(RoutesMeta.Synology),
  },
  {
    path: `${Routes.SynologyDemo}/*`,
    component: lazy(() => import('~/components/pages/synology/synology-demo')),
    data: getData(RoutesMeta.SynologyDemo),
  },
  {
    path: `${Routes.AboutMe}/*`,
    component: lazy(() => import('~/components/pages/about-me/about-me')),
    data: getData(RoutesMeta.AboutMe),
  },
  {
    path: `${Routes.Contact}`,
    component: lazy(() => import('~/components/pages/contact/contact')),
    data: getData(RoutesMeta.Contact),
  },
];
