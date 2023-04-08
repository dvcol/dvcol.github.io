import { Box } from '@suid/material';

import type { Component } from 'solid-js';

export const AboutMe: Component = () => {
  // Lazy load entry script
  import(/* @vite-ignore */ `../../../apps/about-me/entry`);

  return (
    <Box sx={{ margin: '0 auto' }}>
      <wc-about-me />
    </Box>
  );
};

export default AboutMe;
