import { useI18n } from '@solid-primitives/i18n';

import type { Component } from 'solid-js';

export const I18nHmr: Component = () => {
  const [, { add }] = useI18n();

  if (import.meta.hot) {
    import.meta.hot.on('virtual:vite-plugin-i18n', ({ data }) => {
      if (data) Object.keys(data).forEach(lang => add(lang, data[lang]));
    });
  }

  return <div hidden aria-hidden="true" id="i18n-hmr" />;
};

export default I18nHmr;
