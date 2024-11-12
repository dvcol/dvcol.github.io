import { createEffect } from 'solid-js';

import type { Component } from 'solid-js';

import { useRouteData } from '~/services';
import { useI18n } from '~/services/i18n';

const changeContent = (selector: string, content: string) => {
  const tag = document.head.querySelector(selector);
  if (!tag) return;
  tag.setAttribute('content', content);
};

export const RouteData: Component = () => {
  const [t] = useI18n();
  createEffect(() => {
    const data = useRouteData().active();
    if (data?.title) {
      document.title = t(data.title)?.toString();
      changeContent('#og-title', t(data.title)?.toString());
      changeContent('#tw-title', t(data.title)?.toString());
    }
    if (data?.description) {
      changeContent('#description', t(data.description)?.toString());
      changeContent('#og-description', t(data.description)?.toString());
      changeContent('#tw-description', t(data.description)?.toString());
    }
    if (data?.image) {
      changeContent('#og-image', data.image);
      changeContent('#tw-image', data.image);
    }
    if (data?.url) changeContent('#canonical', data.url);
  });

  return <div hidden aria-hidden="true" id="route-data" />;
};

export default RouteData;
