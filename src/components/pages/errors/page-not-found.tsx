import type { Component } from 'solid-js';

import NotFoundLottie from '~/assets/lottie/55873-404-error-page.json?url';

import { LottiePlayer } from '~/components/common//lottie';
import { ErrorPage } from '~/components/pages/errors/error-page';
import { RoutesMeta } from '~/services';
import { useI18n } from '~/services/i18n';

export const PageNotFound: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage
      title={t('page_not_found.title')}
      subtitle={t('page_not_found.subtitle')}
      description={t('page_not_found.description')}
      page={{ background: { color: RoutesMeta.NotFound.bgColor } }}
    >
      <LottiePlayer autoplay loop mode="normal" src={NotFoundLottie} />
    </ErrorPage>
  );
};

export default PageNotFound;
