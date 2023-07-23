import { useNavigate } from '@solidjs/router';

import type { Component } from 'solid-js';

import { defineAboutMeComponents } from '~/apps/about-me/entry';
import { Page } from '~/components';
import { Routes } from '~/services';

export const AboutMe: Component = () => {
  const navigate = useNavigate();
  defineAboutMeComponents().catch(e => {
    console.error('Failed to load About Me web component.', e);
    navigate(Routes.Error);
  });
  return (
    <Page maxWidth="qhd">
      <wc-about-me />
    </Page>
  );
};

export default AboutMe;
