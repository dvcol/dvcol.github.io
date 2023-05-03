import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Button, Stack } from '@suid/material';

import { For } from 'solid-js';

import type { Component } from 'solid-js';

import { Page, ParticlesContainer } from '~/components';
import { TriangleParticles } from '~/components/common/particles/triangle.particles';
import { Routes, RoutesMetas } from '~/services';
import { camelToSnakeCase } from '~/utils';

export const Home: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();
  return (
    <Page
      contentProps={{
        sx: { justifyContent: 'center' },
      }}
    >
      <ParticlesContainer options={TriangleParticles}>
        <Stack spacing={2} direction="column" sx={{ alignItems: 'center' }}>
          <For each={RoutesMetas?.filter(r => r.navbar && r.path !== Routes.Home)}>
            {({ name, path }) => (
              <>
                <Button variant="outlined" onclick={() => navigate(path)} sx={{ width: 'fit-content' }}>
                  {t(`routes.${camelToSnakeCase(name)}`, {}, 'fallback')}
                </Button>
              </>
            )}
          </For>
        </Stack>
      </ParticlesContainer>
    </Page>
  );
};

export default Home;
