import { Button, Stack } from '@suid/material';

import type { Component } from 'solid-js';

import logo from '~/assets/logo.svg';
import styles from '~/styles/app.module.scss';

export const App: Component = () => (
  <div class={styles.app}>
    <header class={styles.header}>
      <img src={logo} class={styles.logo} alt="logo" />
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onclick={() => {
            window.location.href = '#/synology';
          }}
        >
          Synology
        </Button>
      </Stack>
    </header>
  </div>
);
