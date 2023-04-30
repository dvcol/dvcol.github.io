import { useI18n } from '@solid-primitives/i18n';

import { ErrorPage } from './error-page';

import type { Component } from 'solid-js';

import NotFoundLottie from '~/assets/lottie/55873-404-error-page.json?url';

import { LottiePlayer } from '~/components';

export const PageNotFound: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage title={t('page_not_found.title')} subtitle={t('page_not_found.subtitle')} description={t('page_not_found.description')}>
      <LottiePlayer autoplay loop mode="normal" src={NotFoundLottie} />
    </ErrorPage>
  );
};

export default PageNotFound;
