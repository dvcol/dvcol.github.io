import { flatten } from '@solid-primitives/i18n';

import { createMemo, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

import type { ParentComponent } from 'solid-js';
import type { Dictionaries, Dictionary, I18nContextModel, Locale } from '~/models';

import { I18nContext } from '~/services/i18n';

export type I18nProviderProps = {
  initialDictionaries?: Dictionaries;
  initialLocale?: Locale;
};
export const I18nContextProvider: ParentComponent<I18nProviderProps> = props => {
  const [locale, setLocale] = createSignal<Locale>(props.initialLocale ?? 'en');
  const [dictionaries, setDictionaries] = createStore<Dictionaries>(props.initialDictionaries ?? { en: {} });

  const dictionary = createMemo(() => dictionaries[locale()] ?? {});
  const dictionaryFlat = createMemo(() => flatten(dictionary()));

  const setDictionary = (_locale: Locale, _dictionary: Dictionary) => setDictionaries(_was => ({ [_locale]: _dictionary }));
  const context: I18nContextModel = {
    dictionaries,
    dictionary,
    dictionaryFlat,
    locale,
    setLocale,
    setDictionary,
    setDictionaries,
  };

  return <I18nContext.Provider value={context}>{props.children}</I18nContext.Provider>;
};

export default I18nContext;
