import type { Component } from 'solid-js';

import { Page } from '~/components';

export const AboutMe: Component = () => {
  import('~/apps/about-me/entry').catch(() => console.error('Failed to define about-me web components'));

  return (
    <Page>
      <wc-about-me />
    </Page>
  );
};

export default AboutMe;
