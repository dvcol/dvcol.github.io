import { Button, Stack } from '@suid/material';

import styles from './home.module.scss';

import type { Component } from 'solid-js';

import logo from '~/assets/logo.svg';

const goTo = (path: string) => {
  window.location.href = `#${path}`;
};

export const Home: Component = () => (
  <div class={styles.app}>
    <header class={styles.header}>
      <img src={logo} class={styles.logo} alt="logo" />
      <Stack spacing={2} direction="column">
        <Button variant="outlined" onclick={() => goTo('/synology')}>
          Synology
        </Button>
        <Button variant="outlined" onclick={() => goTo('/particles')}>
          Particles
        </Button>
      </Stack>
    </header>
  </div>
);

export default Home;
