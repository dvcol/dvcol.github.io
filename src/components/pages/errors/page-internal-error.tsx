import { useI18n } from '@solid-primitives/i18n';

import { ErrorPage } from './error-page';

import type { Component } from 'solid-js';

import MaintenanceLottie from '~/assets/lottie/6873-under-maintenance.json?url';
import { LottiePlayer } from '~/components/common//lottie';
import { RoutesMeta } from '~/services';

export const PageInternalError: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage
      title={t('page_internal_error.title')}
      subtitle={t('page_internal_error.subtitle')}
      description={t('page_internal_error.description')}
      page={{ background: { color: RoutesMeta.Error.bgColor } }}
    >
      <LottiePlayer autoplay loop mode="normal" src={MaintenanceLottie} />
    </ErrorPage>
  );
};

export default PageInternalError;
