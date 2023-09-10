// @ts-expect-error -- TODO: fix typing
import { locales } from 'virtual:vite-plugin-i18n';

import { I18nContextProvider } from './i18n-context';

import I18nHmr from './i18n-hmr';

import type { ParentComponent } from 'solid-js';

import type { Locale } from '~/models';

export const I18nProvider: ParentComponent<{ initialLocale?: Locale }> = props => {
  const user = navigator.language;
  const fallback = user === 'fr' ? 'fr' : 'en';
  return (
    <I18nContextProvider initialDictionaries={locales} initialLocale={props.initialLocale ?? fallback}>
      <I18nHmr />
      {props.children}
    </I18nContextProvider>
  );
};

export default I18nProvider;
