import { useNavigate } from '@solidjs/router';

import { createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

import { defineAboutMeComponents } from '~/apps/about-me/entry';
import { Page, Spinner } from '~/components';
import { Routes } from '~/services';

export const AboutMe: Component = () => {
  const [loaded, setLoaded] = createSignal(false);

  const navigate = useNavigate();
  defineAboutMeComponents()
    .then(() => setLoaded(true))
    .catch(e => {
      console.error('Failed to load About Me web component.', e);
      navigate(Routes.Error);
    });

  return (
    <Page maxWidth="qhd">
      <Show when={loaded()} fallback={<Spinner center size="10em" debounce={500} />}>
        <wc-about-me />
      </Show>
    </Page>
  );
};

export default AboutMe;
