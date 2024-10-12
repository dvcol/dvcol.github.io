import { Motion } from '@motionone/solid';
import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createEffect, createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

import { defineTraktExtensionComponents } from '~/apps/trakt-extension/entry';
import BackgroundBeams from '~/components/common/beams/background-beams';
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
    <BackgroundBeams
      animated={true}
      stop={{
        head: Colors.TraktBright,
        tail: Colors.Trakt,
      }}
    >
      <Page maxWidth="hd" animate="fade">
        <Show when={loaded()} fallback={<Spinner center size={10} debounce={500} />}>
          <Motion
            style={{ margin: '2rem' }}
            animate={{ opacity: [0, 1], scale: [0.9, 1] }}
            transition={{ opacity: { duration: 1 }, scale: { duration: 1 } }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'box-shadow 0.5s ease-in-out',
                boxShadow: '1px 2px 10px 2px rgba(0,0,0,0.2)',
                '&:hover': {
                  boxShadow: '3px 6px 12px 5px rgba(0,0,0,0.3)',
                },
              }}
            >
              <wc-trakt-extension
                ref={setWcRef}
                style={{
                  '--full-height': 'calc(-4rem + 100dvh)',
                  '--full-width': '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  background: Colors.TraktGrey,
                }}
              >
                <Spinner center size={10} debounce={500} />
              </wc-trakt-extension>
            </Box>
          </Motion>
        </Show>
      </Page>
    </BackgroundBeams>
  );
};

export default TraktDemo;
