// @ts-expect-error -- TODO: fix typing
import { locales } from 'virtual:vite-plugin-i18n';

import { I18nContext } from './i18n-context';

import type { ParentComponent } from 'solid-js';

export const I18nProvider: ParentComponent<{ initialLocale?: string }> = props => {
  const user = navigator.language;
  const fallback = user === 'fr' ? 'fr' : 'en';
  return (
    <I18nContext initialDictionary={locales} initialLocale={props.initialLocale ?? fallback}>
      {props.children}
    </I18nContext>
  );
};

export default I18nProvider;
