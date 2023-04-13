import { useI18n } from '@solid-primitives/i18n';

import { createEffect } from 'solid-js';

import type { Component } from 'solid-js';

import { getRouteData } from '~/services';

export const RouteData: Component = () => {
  const [t] = useI18n();
  createEffect(() => {
    const data = getRouteData();
    if (data) document.title = t(data.title);
  });

  return <div hidden aria-hidden="true" id="route-data" />;
};

export default RouteData;
