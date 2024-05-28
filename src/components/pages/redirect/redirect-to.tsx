import { useSearchParams } from '@solidjs/router';

import { Box, Button } from '@suid/material';

import ExternalLinkSvg from 'line-md/svg/external-link.svg?component-solid';

import { createSignal, onMount, Show } from 'solid-js';

import type { Component } from 'solid-js';

import NotFoundLottie from '~/assets/lottie/55873-404-error-page.json?url';

import { HoverScale } from '~/components/common/animation';
import { SimplePage } from '~/components/common/layout';
import { LottiePlayer } from '~/components/common/lottie';
import { useI18n } from '~/services';
import { BreakPointsStop, Colors } from '~/themes';

export const RedirectTo: Component<{ background?: string }> = props => {
  const [t] = useI18n();
  const [params] = useSearchParams();
  const [url, setUrl] = createSignal<string>('');

  onMount(() => {
    if (!params?.to) {
      console.warn('No redirection found.', params);
    } else {
      const { to, ...otherParams } = params;
      setUrl(decodeURIComponent(to) + (Object.keys(otherParams)?.length ? `?${new URLSearchParams(otherParams).toString()}` : ''));

      console.info('Redirecting to', {
        url: url(),
        params,
      });
      window.location.replace(url());
    }
  });

  return (
    <SimplePage
      title={t('page_redirect_to.title')}
      subtitle={t('page_redirect_to.subtitle')}
      description={t('page_redirect_to.description')}
      contentProps={{ sx: { overflow: { [BreakPointsStop.default]: 'hidden', [BreakPointsStop.desktop]: 'inherit' } } }}
      page={{ background: { color: props.background ?? Colors.theme } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Show
          when={params?.to}
          fallback={
            <Box
              sx={{
                display: 'flex',
                gap: '0.5rem',
                margin: '2rem',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: Colors.Yellow,
                fontweight: 'bold',
              }}
            >
              <Box>{t(`page_redirect_to.error`)}</Box>
              <Box>{t(`page_redirect_to.retry`)}</Box>
              <HoverScale initialDelay={1000}>{<LottiePlayer autoplay loop mode="normal" src={NotFoundLottie} />}</HoverScale>
            </Box>
          }
        >
          <Button startIcon={<ExternalLinkSvg />} onclick={() => window.location.replace(url())}>
            {t(`page_redirect_to.redirect`)}
          </Button>
        </Show>
      </Box>
    </SimplePage>
  );
};

export default RedirectTo;
