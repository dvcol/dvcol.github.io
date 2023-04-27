import { createSignal, lazy } from 'solid-js';

import type { RouteDefinition } from '@solidjs/router/dist/types';

export enum Routes {
  /** Technical pages **/
  NotFound = '/404',
  Unauthorized = '/401',
  Forbidden = '/403',
  Error = '/500',

  /** Public pages **/
  Home = '/',
  Trakt = '/trakt',
  AboutMe = '/about/me',
  Synology = '/synology',
  SynologyDemo = '/synology/demo',
  Contact = '/contact',
}

export type RouteMeta = {
  path: Routes;
  name: keyof typeof Routes;
  title: string;
  navbar?: boolean;
  color?: string;
  bgColor?: string;
};

export const RoutesMeta: Record<keyof typeof Routes, RouteMeta> = {
  /** Technical pages **/
  NotFound: {
    path: Routes.NotFound,
    name: 'NotFound',
    title: 'routes.title.not_found',
  },
  Unauthorized: {
    path: Routes.Unauthorized,
    name: 'Unauthorized',
    title: 'routes.title.unauthorized',
  },
  Forbidden: {
    path: Routes.Forbidden,
    name: 'Forbidden',
    title: 'routes.title.forbidden',
  },
  Error: {
    path: Routes.Error,
    name: 'Error',
    title: 'routes.title.error',
  },

  /** Public pages **/
  Home: {
    path: Routes.Home,
    name: 'Home',
    title: 'routes.title.home',
    navbar: true,
    color: 'black',
    bgColor: 'white',
  },
  Trakt: {
    path: Routes.Trakt,
    name: 'Trakt',
    title: 'routes.title.trakt',
    navbar: true,
  },
  AboutMe: {
    path: Routes.AboutMe,
    name: 'AboutMe',
    title: 'routes.title.about_me',
    navbar: true,
  },
  Synology: {
    path: Routes.Synology,
    name: 'Synology',
    title: 'routes.title.synology',
    navbar: true,
  },
  SynologyDemo: {
    path: Routes.SynologyDemo,
    name: 'SynologyDemo',
    title: 'routes.title.synology_demo',
    navbar: true,
  },
  Contact: {
    path: Routes.Contact,
    name: 'Contact',
    title: 'routes.title.contact',
    navbar: true,
    color: 'white',
    bgColor: 'maroon',
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
  /** Technical pages **/
  {
    path: ['*', `${Routes.NotFound}`],
    component: lazy(() => import('~/components/pages/errors/page-not-found')),
    data: getData(RoutesMeta.NotFound),
  },
  {
    path: `${Routes.Unauthorized}`,
    component: lazy(() => import('~/components/pages/errors/page-unauthorized')),
    data: getData(RoutesMeta.Unauthorized),
  },
  {
    path: `${Routes.Forbidden}`,
    component: lazy(() => import('~/components/pages/errors/page-forbidden')),
    data: getData(RoutesMeta.Forbidden),
  },
  {
    path: `${Routes.Error}`,
    component: lazy(() => import('~/components/pages/errors/page-internal-error')),
    data: getData(RoutesMeta.Error),
  },

  /** Public pages **/
  {
    path: Routes.Home,
    component: lazy(() => import('~/components/pages/home/home')),
    data: getData(RoutesMeta.Home),
  },
  {
    path: Routes.Trakt,
    component: lazy(() => import('~/components/pages/trakt/trakt-home')),
    data: getData(RoutesMeta.Trakt),
  },
  {
    path: `${Routes.AboutMe}/*`,
    component: lazy(() => import('~/components/pages/about-me/about-me')),
    data: getData(RoutesMeta.AboutMe),
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
    path: `${Routes.Contact}`,
    component: lazy(() => import('~/components/pages/contact/contact')),
    data: getData(RoutesMeta.Contact),
  },
];
