import { useI18n } from '@solid-primitives/i18n';

import { ErrorPage } from './error-page';

import type { Component } from 'solid-js';

import SecurityLottie from '~/assets/lottie/78078-security-system.json?url';
import { LottiePlayer } from '~/components';

export const PageUnauthorized: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage title={t('page_unauthorized.title')} subtitle={t('page_unauthorized.subtitle')} description={t('page_unauthorized.description')}>
      <LottiePlayer autoplay loop mode="normal" src={SecurityLottie} />
    </ErrorPage>
  );
};

export default PageUnauthorized;
