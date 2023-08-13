import { useNavigate } from '@solidjs/router';

import { createSignal, Show } from 'solid-js';

import type { Component } from 'solid-js';

import { defineAboutMeComponents } from '~/apps/about-me/entry';
import { ContactForm, InView, Page, Spinner } from '~/components';
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

  const [visible, setVisible] = createSignal(false);

  return (
    <Page maxWidth="qhd">
      <Show when={loaded()} fallback={<Spinner center size="10em" debounce={500} />}>
        <wc-about-me />
        <InView margin={{ bottom: 200 }} onEnter={() => setVisible(true)}>
          <ContactForm
            cardProps={{
              sx: {
                m: '4rem 0',
                willChange: 'translate, opacity',
                transition: 'translate 1s, opacity 1s',
                transitionDelay: '0.25s',
                opacity: visible() ? 1 : 0,
                translate: visible() ? 0 : '-50%',
              },
            }}
          />
        </InView>
      </Show>
    </Page>
  );
};

export default AboutMe;
