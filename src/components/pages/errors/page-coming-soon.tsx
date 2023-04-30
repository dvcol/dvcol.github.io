import { useI18n } from '@solid-primitives/i18n';

import { Box } from '@suid/material';

import { ErrorPage } from './error-page';

import type { Component } from 'solid-js';

import ComingSoonLottie from '~/assets/lottie/30331-isometric-internet-shop.json?url';
import { LottiePlayer } from '~/components';

export const PageComingSoon: Component = () => {
  const [t] = useI18n();
  return (
    <ErrorPage title={t('page_coming_soon.title')} subtitle={t('page_coming_soon.subtitle')} description={t('page_coming_soon.description')}>
      <Box sx={{ overflow: 'hidden', height: '52rem' }}>
        <LottiePlayer style={{ transform: 'translateX(-10%)' }} autoplay loop src={ComingSoonLottie} />
      </Box>
    </ErrorPage>
  );
};

export default PageComingSoon;
