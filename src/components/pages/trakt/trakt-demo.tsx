import { useNavigate } from '@solidjs/router';

import { createEffect, createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

import { defineTraktExtensionComponents } from '~/apps/trakt-extension/entry';
import { Page } from '~/components/common/layout';
import { Spinner } from '~/components/common/loader';

import { stopScrollPropagation } from '~/components/common/utils';
import { Routes } from '~/services';

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
    <Page maxWidth="fhd" animate="fade">
      <Show when={loaded()} fallback={<Spinner center size={10} debounce={500} />}>
        <wc-trakt-extension
          ref={setWcRef}
          style={{ margin: '0.7rem 1rem', height: 'calc(100dvh - 1.4rem)', overflow: 'hidden', position: 'relative' }}
        >
          <Spinner center size={10} debounce={500} />
        </wc-trakt-extension>
      </Show>
    </Page>
  );
};

export default TraktDemo;
