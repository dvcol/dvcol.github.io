import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createEffect, createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

import { defineTraktExtensionComponents } from '~/apps/trakt-extension/entry';
import { Page } from '~/components/common/layout';
import { Spinner } from '~/components/common/loader';

import { stopScrollPropagation } from '~/components/common/utils';
import { Routes } from '~/services';
import { Colors } from '~/themes';

export const TraktDemo: Component = () => {
  const [loaded, setLoaded] = createSignal(false);

  const navigate = useNavigate();
  defineTraktExtensionComponents()
    .then(() => {
      setLoaded(true);
    })
    .catch(e => {
      console.error('Failed to load Trakt Extension web component.', e);
      setTimeout(() => navigate(Routes.Error), 500);
    });

  const [wcRef, setWcRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const _ref = wcRef();
    if (_ref) stopScrollPropagation(_ref);
  });

  return (
    <Page maxWidth="hd" animate="fade">
      <Show when={loaded()} fallback={<Spinner center size={10} debounce={500} />}>
        <Box
          sx={{
            margin: '2rem 2rem',
          }}
        >
          <wc-trakt-extension
            ref={setWcRef}
            style={{
              '--full-height': 'calc(-4rem + 100dvh)',
              overflow: 'hidden',
              position: 'relative',
              background: Colors.DarkGrey,
            }}
          >
            <Spinner center size={10} debounce={500} />
          </wc-trakt-extension>
        </Box>
      </Show>
    </Page>
  );
};

export default TraktDemo;
