import { createSignal, lazy } from 'solid-js';

import type { RouteDefinition } from '@solidjs/router/dist/types';

import { lazyWithProps } from '~/components/common/lazy/lazy-with-props';
import { AppLink } from '~/models';
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

  /** Hidden pages **/
  Particles = '/particles',
  Beams = '/beams',
  RedirectTo = '/redirect-to/:id?',
}

export type RouteMeta = {
  path: Routes;
  name: keyof typeof Routes;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  navbar?: boolean;
  more?: boolean;
  external?: boolean;
  color?: string;
  bgColor?: string | Colors;
  themeColor?: string | Colors;
  accentColor?: string;
  transition?: number;
};

export const RoutesMeta: Record<keyof typeof Routes, RouteMeta> = {
  /** Technical pages **/
  NotFound: {
    path: Routes.NotFound,
    name: 'NotFound',
    title: 'routes.title.not_found',
    navbar: false,
    color: Colors.White,
    bgColor: Colors.DarkRed,
    transition: AnimationDuration.PageTransition,
  },
  Unauthorized: {
    path: Routes.Unauthorized,
    name: 'Unauthorized',
    title: 'routes.title.unauthorized',
    navbar: false,
    color: Colors.White,
    bgColor: Colors.Navy,
    transition: AnimationDuration.PageTransition,
  },
  Forbidden: {
    path: Routes.Forbidden,
    name: 'Forbidden',
    title: 'routes.title.forbidden',
    navbar: false,
    color: Colors.White,
    bgColor: Colors.Navy,
    transition: AnimationDuration.PageTransition,
  },
  Error: {
    path: Routes.Error,
    name: 'Error',
    title: 'routes.title.error',
    navbar: false,
    color: Colors.White,
    bgColor: Colors.DarkRed,
    transition: AnimationDuration.PageTransition,
  },

  /** Public pages **/
  Home: {
    path: Routes.Home,
    name: 'Home',
    title: 'routes.title.home',
    description: 'routes.description.home',
    navbar: true,
    color: Colors.White,
    accentColor: Colors.White,
    bgColor: Colors.Black,
  },
  SynologyDemo: {
    path: Routes.SynologyDemo,
    name: 'SynologyDemo',
    title: 'routes.title.synology_demo',
    description: 'routes.description.synology_demo',
    navbar: true,
    color: Colors.White,
    bgColor: Colors.Black,
    accentColor: Colors.SynologyDemo,
    themeColor: Colors.Blue,
  },
  TraktDemo: {
    path: Routes.TraktDemo,
    name: 'TraktDemo',
    title: 'routes.title.trakt_demo',
    description: 'routes.description.trakt_demo',
    navbar: true,
    accentColor: Colors.Trakt,
    color: Colors.White,
    bgColor: Colors.DarkGrey,
    themeColor: Colors.Trakt,
  },
  Synology: {
    path: Routes.Synology,
    name: 'Synology',
    title: 'routes.title.synology',
    description: 'routes.description.synology',
    color: Colors.White,
    bgColor: Colors.Theme,
    navbar: true,
  },
  Trakt: {
    path: Routes.Trakt,
    name: 'Trakt',
    title: 'routes.title.trakt',
    description: 'routes.description.trakt',
    color: Colors.White,
    navbar: true,
  },
  AboutMe: {
    path: Routes.AboutMe,
    name: 'AboutMe',
    title: 'routes.title.about_me',
    description: 'routes.description.about_me',
    navbar: true,
    accentColor: Colors.White,
    bgColor: Colors.Theme,
    themeColor: Colors.Blue,
  },
  Contact: {
    path: Routes.Contact,
    name: 'Contact',
    title: 'routes.title.contact',
    navbar: false,
    color: Colors.White,
    bgColor: Colors.Contact,
    transition: AnimationDuration.PageTransition,
    accentColor: Colors.White,
  },

  /** Hidden pages **/
  Particles: {
    path: Routes.Particles,
    name: 'Particles',
    title: 'routes.title.particles',
    navbar: true,
    more: true,
    color: Colors.White,
    bgColor: Colors.Black,
  },
  Beams: {
    path: Routes.Beams,
    name: 'Beams',
    title: 'routes.title.beams',
    navbar: true,
    more: true,
    color: Colors.White,
    bgColor: Colors.Black,
  },
  RedirectTo: {
    path: Routes.RedirectTo,
    name: 'RedirectTo',
    title: 'routes.title.redirect_to',
    navbar: true,
    more: true,
    color: Colors.White,
    bgColor: Colors.Black,
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
    path: Routes.Contact,
    component: lazy(() => import('~/components/pages/contact/contact')),
    data: getData(RoutesMeta.Contact),
  },

  /** Hidden pages **/
  {
    path: Routes.Particles,
    component: lazy(() => import('~/components/common/particles/particles-container')),
    data: getData(RoutesMeta.Particles),
  },
  {
    path: Routes.Beams,
    element: lazyWithProps(() => import('~/components/common/beams/background-beams'), { color: getData(RoutesMeta.Beams)().color, animated: true }),
    data: getData(RoutesMeta.Beams),
  },
  {
    path: Routes.RedirectTo,
    component: lazy(() => import('~/components/pages/redirect/redirect-to')),
    data: getData(RoutesMeta.RedirectTo),
  },
];

export type ExternalRoute = Pick<RouteMeta, 'title' | 'description' | 'url' | 'image' | 'external'> & { path: string; name: string };

export type BaseRoute = RouteMeta | ExternalRoute;

export const externalRoutes: ExternalRoute[] = [
  {
    path: `${AppLink.pages}/about-me`,
    name: 'AboutMe',
    title: 'routes.title.about_me',
    description: 'routes.description.about_me',
    external: true,
  },
  {
    path: `${AppLink.pages}/synology-download`,
    name: 'SynologyDownload',
    title: 'routes.title.synology_download',
    description: 'routes.description.synology_download',
    external: true,
  },
  {
    path: `${AppLink.pages}/trakt-extension`,
    name: 'TraktExtension',
    title: 'routes.title.trakt_extension',
    description: 'routes.description.trakt_extension',
    external: true,
  },
  {
    path: `${AppLink.pages}/reddit-extension`,
    name: 'RedditExtension',
    title: 'routes.title.reddit_extension',
    description: 'routes.description.reddit_extension',
    external: true,
  },
  {
    path: `${AppLink.pages}/svelte-simple-router`,
    name: 'SvelteSimpleRouter',
    title: 'routes.title.svelte_simple_router',
    description: 'routes.description.svelte_simple_router',
    external: true,
  },
  {
    path: `${AppLink.pages}/neo-svelte`,
    name: 'NeoSvelte',
    title: 'routes.title.neo_svelte',
    description: 'routes.description.neo_svelte',
    external: true,
  },
  {
    path: `${AppLink.pages}/image-viewer`,
    name: 'ImageViewer',
    title: 'routes.title.image_viewer',
    description: 'routes.description.image_viewer',
    external: true,
  },
];
