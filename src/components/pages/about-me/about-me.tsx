import { Box } from '@suid/material';

import type { Component } from 'solid-js';

import { definedComponent } from '~/apps/about-me/entry';

export const AboutMe: Component = () => {
  definedComponent();

  return (
    <Box sx={{ margin: '0 auto' }}>
      <wc-about-me />
    </Box>
  );
};

export default AboutMe;
