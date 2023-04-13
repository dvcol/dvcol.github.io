import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Button, Stack } from '@suid/material';

import { For } from 'solid-js';

import styles from './home.module.scss';

import type { Component } from 'solid-js';

import logo from '~/assets/logo.svg';
import { RoutesMetas } from '~/services';
import { camelToSnakeCase } from '~/utils';

export const Home: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();
  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <Stack spacing={2} direction="column">
          <For each={RoutesMetas}>
            {({ name, path }) => (
              <>
                <Button variant="outlined" onclick={() => navigate(path)}>
                  {t(`routes.${camelToSnakeCase(name)}`, {}, 'fallback')}
                </Button>
              </>
            )}
          </For>
        </Stack>
      </header>
    </div>
  );
};

export default Home;
