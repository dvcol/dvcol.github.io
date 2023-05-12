import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Grid } from '@suid/material';

import { For } from 'solid-js';

import type { Component } from 'solid-js';

import type { ImageCardProps } from '~/components';

import SynologyDemoGif from '~/assets/gif/synology_demo.gif?url';
import SolidSvg from '~/assets/logo/solid.svg?url';
import ContactLottie from '~/assets/lottie/64643-receive-a-new-email.json?url';
import { EnterTranslate, HoverScale, ImageCard, Page, ParticlesContainer, TriangleParticles } from '~/components';

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
      maxWidth={BreakPointsStop.qhd}
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
              [BreakPointsStop.default]: '3rem',
              [BreakPointsStop.tablet]: '0',
            },
            gap: {
              [BreakPointsStop.default]: 0,
              [BreakPointsStop.fhd]: 4,
              [BreakPointsStop.qhd]: 6,
              [BreakPointsStop.uhd]: 10,
            },
          }}
          spacing={2}
        >
          <For each={cards}>
            {({ path, title, imageProps, ..._props }, index) => (
              <Grid item xs={12} sm={6} lg={4}>
                <EnterTranslate initialDelay={1 + 100 * index()}>
                  <HoverScale from={0.95}>
                    <ImageCard
                      title={t(`routes.${camelToSnakeCase(title)}`)}
                      description={t(`home.${camelToSnakeCase(title)}`)}
                      imageProps={{
                        ...imageProps,
                        alt: `cover image for ${title}`,
                        sx: {
                          height: {
                            [BreakPointsStop.default]: 200,
                            [BreakPointsStop.mobile]: 200,
                            [BreakPointsStop.tablet]: 300,
                            [BreakPointsStop.fhd]: 350,
                            [BreakPointsStop.qhd]: 500,
                            [BreakPointsStop.uhd]: 550,
                          },
                          ...imageProps?.sx,
                        },
                      }}
                      {..._props}
                      onclick={() => navigate(path)}
                    />
                  </HoverScale>
                </EnterTranslate>
              </Grid>
            )}
          </For>
        </Grid>
      </ParticlesContainer>
    </Page>
  );
};

export default Home;
