import { useNavigate } from '@solidjs/router';
import { Button, Stack } from '@suid/material';

import { For } from 'solid-js';

import styles from './home.module.scss';

import type { Component } from 'solid-js';

import logo from '~/assets/logo.svg';
import { RoutesArray } from '~/services/router';

export const Home: Component = () => {
  const navigate = useNavigate();
  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <Stack spacing={2} direction="column">
          <For each={RoutesArray}>
            {([route, path]) => (
              <Button variant="outlined" onclick={() => navigate(path)}>
                {route}
              </Button>
            )}
          </For>
        </Stack>
      </header>
    </div>
  );
};

export default Home;
