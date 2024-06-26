import type { Component } from 'solid-js';

import PoliceLottie from '~/assets/lottie/84311-cop-riding-on-a-motorcycle.json?url';
import { LottiePlayer } from '~/components/common//lottie';
import { ErrorPage } from '~/components/pages/errors/error-page';
import { RoutesMeta } from '~/services';
import { useI18n } from '~/services/i18n';

export const PageForbidden: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage
      title={t('page_forbidden.title')}
      subtitle={t('page_forbidden.subtitle')}
      description={t('page_forbidden.description')}
      page={{ background: { color: RoutesMeta.Forbidden.bgColor } }}
    >
      <LottiePlayer autoplay loop mode="normal" src={PoliceLottie} />
    </ErrorPage>
  );
};

export default PageForbidden;
