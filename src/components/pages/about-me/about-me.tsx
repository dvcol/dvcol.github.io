import { useNavigate } from '@solidjs/router';

import { Box, useMediaQuery } from '@suid/material';

import { createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

import { defineAboutMeComponents } from '~/apps/about-me/entry';
import ContactLottie from '~/assets/lottie/64643-receive-a-new-email.json?url';

import { Page } from '~/components/common/layout';
import { Spinner } from '~/components/common/loader';
import { LottiePlayer } from '~/components/common/lottie';
import { InView } from '~/components/common/utils';
import { ContactForm } from '~/components/pages/contact';

import { Routes, useNavbar } from '~/services';
import { BreakPoints } from '~/themes';

const Fallback: Component = () => <Spinner center size={10} debounce={500} />;

export const AboutMe: Component = () => {
  const [loaded, setLoaded] = createSignal(false);

  const navigate = useNavigate();
  defineAboutMeComponents()
    .then(() => setLoaded(true))
    .catch(e => {
      console.error('Failed to load About Me web component.', e);
      setTimeout(() => navigate(Routes.Error), 500);
    });

  const [visible, setVisible] = createSignal(false);
  const isFHD = useMediaQuery(`(min-width: ${BreakPoints.fhd}px)`);

  const { isScrolled } = useNavbar();

  return (
    <Page maxWidth="fhd">
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: '100%',
          background: 'linear-gradient(-45deg, #ff5600, #ff0667, #8400f8, #1d00ff)',
          backgroundSize: '400% 400%',
        }}
      />
      <Show when={loaded()} fallback={<Fallback />}>
        <Box sx={{ minHeight: 'calc(100dvh + 5rem)', '--offset-scroll': `${isScrolled()}px` }}>
          <wc-about-me container="stack-page-active">
            <Fallback />
          </wc-about-me>
        </Box>
        <InView
          style={{ display: 'flex', 'justify-content': 'space-between', 'margin-bottom': '4rem' }}
          margin={{ bottom: 200 }}
          onEnter={() => setVisible(true)}
        >
          <ContactForm
            maxRows={20}
            cardProps={{
              sx: {
                maxWidth: `${BreakPoints.laptop}px`,
                willChange: 'translate, opacity',
                transition: 'translate 1s, opacity 1s',
                transitionDelay: '0.25s',
                opacity: visible() ? 1 : 0,
                translate: visible() ? 0 : '-50%',
              },
            }}
          />
          <Show when={isFHD()}>
            <Box
              sx={{
                maxHeight: '700px',
                maxWidth: '800px',
                willChange: 'translate, opacity',
                transition: 'translate 1s, opacity 1s',
                transitionDelay: '0.25s',
                opacity: visible() ? 1 : 0,
                translate: visible() ? 0 : '50%',
              }}
            >
              <LottiePlayer autoplay loop mode="normal" src={ContactLottie} />
            </Box>
          </Show>
        </InView>
      </Show>
    </Page>
  );
};

export default AboutMe;
