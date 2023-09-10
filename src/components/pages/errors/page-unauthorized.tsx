import { ErrorPage } from './error-page';

import type { Component } from 'solid-js';

import SecurityLottie from '~/assets/lottie/78078-security-system.json?url';
import { LottiePlayer } from '~/components/common//lottie';
import { RoutesMeta } from '~/services';
import { useI18n } from '~/services/i18n';

export const PageUnauthorized: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage
      title={t('page_unauthorized.title')}
      subtitle={t('page_unauthorized.subtitle')}
      description={t('page_unauthorized.description')}
      page={{ background: { color: RoutesMeta.Unauthorized.bgColor } }}
    >
      <LottiePlayer autoplay loop mode="normal" src={SecurityLottie} />
    </ErrorPage>
  );
};

export default PageUnauthorized;
