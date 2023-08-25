import { createSignal, lazy } from 'solid-js';

import type { RouteDefinition } from '@solidjs/router/dist/types';

import { AnimationDuration, Colors } from '~/themes';

export enum Routes {
  /** Technical pages **/
  NotFound = '/404',
  Unauthorized = '/401',
  Forbidden = '/403',
  Error = '/500',

  /** Public pages **/
  Home = '/',
  Trakt = '/trakt',
  TraktDemo = '/trakt/demo',
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
  bgColor?: string | Colors;
  accentColor?: string;
  transition?: number;
};

export const RoutesMeta: Record<keyof typeof Routes, RouteMeta> = {
  /** Technical pages **/
  NotFound: {
    path: Routes.NotFound,
    name: 'NotFound',
    title: 'routes.title.not_found',
    color: 'white',
    bgColor: 'darkred',
    transition: AnimationDuration.PageTransition,
  },
  Unauthorized: {
    path: Routes.Unauthorized,
    name: 'Unauthorized',
    title: 'routes.title.unauthorized',
    color: 'white',
    bgColor: 'navy',
    transition: AnimationDuration.PageTransition,
  },
  Forbidden: {
    path: Routes.Forbidden,
    name: 'Forbidden',
    title: 'routes.title.forbidden',
    color: 'white',
    bgColor: 'navy',
    transition: AnimationDuration.PageTransition,
  },
  Error: {
    path: Routes.Error,
    name: 'Error',
    title: 'routes.title.error',
    color: 'white',
    bgColor: 'darkred',
    transition: AnimationDuration.PageTransition,
  },

  /** Public pages **/
  Home: {
    path: Routes.Home,
    name: 'Home',
    title: 'routes.title.home',
    navbar: true,
    color: Colors.white,
    accentColor: Colors.white,
    bgColor: Colors.black,
  },
  Trakt: {
    path: Routes.Trakt,
    name: 'Trakt',
    title: 'routes.title.trakt',
    navbar: true,
    color: Colors.white,
    bgColor: Colors.trakt,
    transition: AnimationDuration.PageTransition,
  },
  TraktDemo: {
    path: Routes.TraktDemo,
    name: 'TraktDemo',
    title: 'routes.title.trakt_demo',
    navbar: true,
    color: Colors.white,
    bgColor: Colors.trakt,
  },
  Synology: {
    path: Routes.Synology,
    name: 'Synology',
    title: 'routes.title.synology',
    navbar: true,
    color: Colors.white,
    bgColor: Colors.theme,
  },
  SynologyDemo: {
    path: Routes.SynologyDemo,
    name: 'SynologyDemo',
    title: 'routes.title.synology_demo',
    navbar: true,
    color: Colors.white,
    bgColor: Colors.black,
    accentColor: Colors.SynologyDemo,
  },
  AboutMe: {
    path: Routes.AboutMe,
    name: 'AboutMe',
    title: 'routes.title.about_me',
    navbar: true,
    accentColor: Colors.white,
    bgColor: Colors.theme,
  },
  Contact: {
    path: Routes.Contact,
    name: 'Contact',
    title: 'routes.title.contact',
    navbar: true,
    color: Colors.white,
    bgColor: Colors.Contact,
    transition: AnimationDuration.PageTransition,
    accentColor: Colors.white,
  },
};

export const RoutesMetas = Object.values(RoutesMeta);

const [previous, setPrevious] = createSignal<RouteMeta>();
const [routeData, setRouteData] = createSignal<RouteMeta>();

export const useRouteData = () => ({ active: routeData, previous });

const getData = (meta: RouteMeta): (() => RouteMeta) => {
  // eslint-disable-next-line solid/reactivity -- intentionally used for route side effect
  return () => {
    setPrevious(routeData());
    setRouteData(meta);
    return meta;
  };
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
    path: `${Routes.TraktDemo}/*`,
    component: lazy(() => import('~/components/pages/trakt/trakt-demo')),
    data: getData(RoutesMeta.TraktDemo),
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
