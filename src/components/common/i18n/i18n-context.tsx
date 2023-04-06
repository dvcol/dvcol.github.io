import { createI18nContext, I18nContext as I18nSolidContext } from '@solid-primitives/i18n';

import type { ParentComponent } from 'solid-js';

type CreateI18nContextInputs = Parameters<typeof createI18nContext>;
export type I18nProviderProps = {
  initialDictionary?: CreateI18nContextInputs[0];
  initialLocale?: CreateI18nContextInputs[1];
};
export const I18nContext: ParentComponent<I18nProviderProps> = props => {
  const value = createI18nContext(props.initialDictionary, props.initialLocale);
  return <I18nSolidContext.Provider value={value}>{props.children}</I18nSolidContext.Provider>;
};

export default I18nContext;
