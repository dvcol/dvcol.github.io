import type { Component } from 'solid-js';

import { useI18n } from '~/services/i18n';

export const I18nHmr: Component = () => {
  const [, { setDictionaries }] = useI18n();

  if (import.meta.hot) {
    import.meta.hot.on('virtual:vite-plugin-i18n', ({ data }) => {
      if (data) setDictionaries(data);
    });
  }

  return <div hidden aria-hidden="true" id="i18n-hmr" />;
};

export default I18nHmr;
