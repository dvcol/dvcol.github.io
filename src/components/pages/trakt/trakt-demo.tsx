import { useNavigate } from '@solidjs/router';

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
    .then(() => {
      setLoaded(true);
    })
    .catch(e => {
      console.error('Failed to load Trakt Extension web component.', e);
      setTimeout(() => navigate(Routes.Error), 500);
    });

  return (
    <Page maxWidth="fhd" animate="fade">
      <Show when={loaded()} fallback={<Spinner center size={10} debounce={500} />}>
        <wc-trakt-extension style={{ margin: '0.65rem 1rem', height: 'calc(100% - 2rem)', overflow: 'auto' }}>
          <Spinner center size={10} debounce={500} />
        </wc-trakt-extension>
      </Show>
    </Page>
  );
};

export default TraktDemo;
