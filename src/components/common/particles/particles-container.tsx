/* eslint-disable solid/no-react-specific-props */
import { Box } from '@suid/material';

import { createMemo, createSignal, splitProps } from 'solid-js';

import Particles from 'solid-particles';

import { loadFull } from 'tsparticles';

import styles from './particles-container.module.scss';

import type { ParentComponent } from 'solid-js';
import type { ParticlesProps } from 'solid-particles';

export const ParticlesContainer: ParentComponent<Omit<ParticlesProps, 'id' | 'init'>> = props => {
  const [{ children }, _props] = splitProps(props, ['children']);
  const particlesInit: ParticlesProps['init'] = async main => {
    await loadFull(main);
  };

  const [loaded, setLoaded] = createSignal(false);

  const classNames = createMemo(() => {
    const _classes = [styles.particles_container];
    if (loaded()) _classes.push(styles.particles_container__visible);
    return _classes.filter(Boolean).join(' ');
  });

  return (
    <>
      <Box class={classNames()}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={() => setLoaded(true)}
          {..._props}
          style={{ position: 'absolute', top: 0, left: 0, ..._props?.style }}
        />
      </Box>
      {children}
    </>
  );
};

export default ParticlesContainer;
/* eslint-enable solid/no-react-specific-props */
