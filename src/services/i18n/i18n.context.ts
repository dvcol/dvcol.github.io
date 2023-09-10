import { translator } from '@solid-primitives/i18n';
import { createContext, useContext } from 'solid-js';

import type { Translator } from '@solid-primitives/i18n';

import type { Dictionary, I18nContextModel } from '~/models';

export const I18nContext = createContext<I18nContextModel | null>(null);

export const useI18n = (): [Translator<Dictionary>, Omit<I18nContextModel, 'dictionaryFlat'>] => {
  const i18n = useContext(I18nContext)!;
  if (!i18n) {
    throw new Error('useI18n must be used within an I18nProvider');
  }

  return [translator(i18n.dictionaryFlat), i18n];
};
