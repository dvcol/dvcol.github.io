import { createEffect } from 'solid-js';

import type { Component } from 'solid-js';

import { useRouteData } from '~/services';
import { useI18n } from '~/services/i18n';

export const RouteData: Component = () => {
  const [t] = useI18n();
  createEffect(() => {
    const data = useRouteData().active();
    if (data) document.title = t(data.title);
  });

  return <div hidden aria-hidden="true" id="route-data" />;
};

export default RouteData;
