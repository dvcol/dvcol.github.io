import { Box } from '@suid/material';

import type { Component } from 'solid-js';

const wcStyle: any = { display: 'block', width: '100vw', height: '100vh', 'max-height': '60rem', 'max-width': '80rem' };

export const SynologyDemo: Component = () => {
  // Lazy load entry script
  import(/* @vite-ignore */ `../../../apps/synology-extension/entry`);

  return (
    <Box sx={{ minHeight: '50rem' }}>
      <wc-synology-download-standalone basename="synology" style={wcStyle} />
      <wc-synology-download-content />
    </Box>
  );
};

export default SynologyDemo;
