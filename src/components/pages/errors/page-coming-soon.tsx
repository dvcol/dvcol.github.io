import { useI18n } from '@solid-primitives/i18n';

import { ErrorPage } from './error-page';

import type { Component } from 'solid-js';

import ComingSoonLottie from '~/assets/lottie/30331-isometric-internet-shop.json?url';
import { LottiePlayer } from '~/components';
import { BreakPointsStop } from '~/themes';

export const PageComingSoon: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage
      title={t('page_coming_soon.title')}
      subtitle={t('page_coming_soon.subtitle')}
      description={t('page_coming_soon.description')}
      contentProps={{ sx: { overflow: { [BreakPointsStop.default]: 'hidden', [BreakPointsStop.desktop]: 'inherit' } } }}
    >
      <LottiePlayer style={{ transform: 'translateX(-10%)', scale: '1.3', 'pointer-events': 'none' }} autoplay loop src={ComingSoonLottie} />
    </ErrorPage>
  );
};

export default PageComingSoon;
