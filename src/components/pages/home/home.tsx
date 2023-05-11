import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Grid } from '@suid/material';

import { For } from 'solid-js';

import type { Component } from 'solid-js';

import type { ImageCardProps } from '~/components';

import SynologyDemoGif from '~/assets/gif/synology_demo.gif?url';
import SolidSvg from '~/assets/logo/solid.svg?url';
import ContactLottie from '~/assets/lottie/64643-receive-a-new-email.json?url';
import { HoverScale, ImageCard, Page, ParticlesContainer, TriangleParticles } from '~/components';

import { RoutesMeta } from '~/services';
import { BreakPointsStop } from '~/themes';
import { camelToSnakeCase } from '~/utils';

type Cards = ImageCardProps & { path: string; title: string };
export const Home: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();

  const cards: Cards[] = [
    {
      path: RoutesMeta.SynologyDemo.path,
      title: RoutesMeta.SynologyDemo.name,
      imageProps: { component: 'img', image: SynologyDemoGif, sx: { background: 'black' } },
    },

    {
      path: RoutesMeta.AboutMe.path,
      title: RoutesMeta.AboutMe.name,
      imageProps: { component: 'img', image: SolidSvg },
    },
    {
      path: RoutesMeta.Trakt.path,
      title: RoutesMeta.Trakt.name,
      imageProps: { component: 'img', image: SolidSvg },
    },
    {
      path: RoutesMeta.Contact.path,
      title: RoutesMeta.Contact.name,
      imageProps: { sx: { background: 'maroon' } },
      lottieProps: { src: ContactLottie },
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
          sx={{
            position: 'relative',
            justifyContent: 'center',
            mt: {
              [BreakPointsStop.default]: '2.5rem',
              [BreakPointsStop.tablet]: 0,
            },
          }}
          spacing={{
            [BreakPointsStop.default]: 0,
            [BreakPointsStop.tablet]: 2,
          }}
        >
          <For each={cards}>
            {({ path, title, imageProps, ..._props }) => (
              <Grid item xs={12} sm={6}>
                <HoverScale>
                  <ImageCard
                    title={t(`routes.${camelToSnakeCase(title)}`)}
                    description={t(`home.${camelToSnakeCase(title)}`)}
                    imageProps={{
                      ...imageProps,
                      alt: `cover image for ${title}`,
                      sx: {
                        height: {
                          [BreakPointsStop.default]: 200,
                          [BreakPointsStop.tablet]: 300,
                          [BreakPointsStop.fhd]: 400,
                        },
                        ...imageProps?.sx,
                      },
                    }}
                    {..._props}
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
