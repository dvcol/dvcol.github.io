import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

import { defineTraktExtensionComponents } from '~/apps/trakt-extension/entry';
import { Page } from '~/components/common/layout';
import { Spinner } from '~/components/common/loader';

import { Routes } from '~/services';

export const TraktDemo: Component = () => {
  const [loaded, setLoaded] = createSignal(false);

  const navigate = useNavigate();
  defineTraktExtensionComponents()
    .then(() => setLoaded(true))
    .catch(e => {
      console.error('Failed to load Trakt Extension web component.', e);
      setTimeout(() => navigate(Routes.Error), 500);
    });

  return (
    <Page maxWidth="fhd">
      <Show when={loaded()} fallback={<Spinner center size={10} debounce={500} />}>
        <Box>
          <wc-about-me container="stack-page-active">
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
            >
              <Spinner center size={10} debounce={500} />
            </Box>
          </wc-about-me>
        </Box>
      </Show>
    </Page>
  );
};

export default AboutMe;
