import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Grid } from '@suid/material';

import { For } from 'solid-js';

import type { Component } from 'solid-js';

import type { ImageCardProps } from '~/components';

import SolidSvg from '~/assets/logo/solid.svg?url';
import { HoverScale, ImageCard, Page, ParticlesContainer } from '~/components';

import { TriangleParticles } from '~/components/common/particles/triangle.particles';
import { RoutesMeta } from '~/services';
import { camelToSnakeCase } from '~/utils';

type Cards = ImageCardProps & { path: string; title: string };
export const Home: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();

  const cards: Cards[] = [
    {
      path: RoutesMeta.SynologyDemo.path,
      title: RoutesMeta.SynologyDemo.name,
      imageProps: { image: SolidSvg },
    },
    {
      path: RoutesMeta.Trakt.path,
      title: RoutesMeta.Trakt.name,
      imageProps: { image: SolidSvg },
    },
    {
      path: RoutesMeta.AboutMe.path,
      title: RoutesMeta.AboutMe.name,
      imageProps: { image: SolidSvg },
    },
    {
      path: RoutesMeta.Contact.path,
      title: RoutesMeta.Contact.name,
      imageProps: { image: SolidSvg },
    },
  ];
  return (
    <Page
      contentProps={{
        sx: { justifyContent: 'center' },
      }}
    >
      <ParticlesContainer options={TriangleParticles}>
        <Grid
          container
          sx={{ position: 'relative', justifyContent: 'center' }}
          spacing={{
            default: 0,
            tablet: 2,
          }}
        >
          <For each={cards}>
            {({ path, title, imageProps }) => (
              <Grid item xs={12} sm={6}>
                <HoverScale>
                  <ImageCard
                    title={t(`routes.${camelToSnakeCase(title)}`)}
                    description={t(`home.${camelToSnakeCase(title)}`)}
                    imageProps={{
                      sx: {
                        height: {
                          default: 200,
                          tablet: 300,
                          fhd: 400,
                        },
                      },
                      ...imageProps,
                    }}
                    onclick={() => navigate(path)}
                  />
                </HoverScale>
              </Grid>
            )}
          </For>
        </Grid>
      </ParticlesContainer>
    </Page>
  );
};

export default Home;
