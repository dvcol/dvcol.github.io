import { Box } from '@suid/material';

import { splitProps } from 'solid-js';

import Particles from 'solid-particles';

import { loadFull } from 'tsparticles';

import { loadPolygonMaskPlugin } from 'tsparticles-plugin-polygon-mask';

import type { ParentComponent } from 'solid-js';
import type { ParticlesProps } from 'solid-particles';

export const ParticlesContainer: ParentComponent<Omit<ParticlesProps, 'id' | 'init'>> = props => {
  const [{ children }, _props] = splitProps(props, ['children']);
  const particlesInit: ParticlesProps['init'] = async main => {
    await loadFull(main);
    await loadPolygonMaskPlugin(main);
  };

  return (
    <Box>
      <Particles id="tsparticles" init={particlesInit} style={{ position: 'absolute', top: 0, left: 0 }} {..._props} />
      {children}
    </Box>
  );
};

export default ParticlesContainer;
