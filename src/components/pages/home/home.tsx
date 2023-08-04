import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Grid } from '@suid/material';

import { For } from 'solid-js';

import type { Component } from 'solid-js';

import type { ImageCardProps } from '~/components';

import ComingSoonLottie from '~/assets/lottie/23888-website-build.json?url';

import ContactLottie from '~/assets/lottie/64643-receive-a-new-email.json?url';
import AboutMeSvg from '~/assets/lottie/developer-front-end-lottie.json?url';
import { EnterTranslate, HoverScale, ImageCard, Page, ParticlesContainer, TriangleParticles } from '~/components';

import { MimeType } from '~/models';
import { RoutesMeta, usePageTransition } from '~/services';
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
      videoProps: { source: { src: 'assets/video/synology_demo.mp4', type: MimeType.MP4 } },
    },
    {
      path: RoutesMeta.AboutMe.path,
      title: RoutesMeta.AboutMe.name,
      imageProps: { sx: { background: 'darkblue' } },
      lottieProps: { src: AboutMeSvg },
    },
    {
      path: RoutesMeta.Trakt.path,
      title: RoutesMeta.Trakt.name,
      imageProps: { sx: { background: RoutesMeta.Trakt.bgColor } },
      lottieProps: { src: ComingSoonLottie },
    },
    {
      path: RoutesMeta.Contact.path,
      title: RoutesMeta.Contact.name,
      imageProps: { sx: { background: RoutesMeta.Contact.bgColor } },
      lottieProps: { src: ContactLottie },
    },
  ];

  const { transition } = usePageTransition();

  const onClick = (event: MouseEvent, path: string, color?: string) =>
    transition({
      event,
      color,
      endColor: RoutesMeta.Home.bgColor,
      position: {
        top: event.clientY,
        left: event.clientX,
      },
      then: () => navigate(path),
    });

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
              [BreakPointsStop.desktop]: 3,
              [BreakPointsStop.fhd]: 4,
              [BreakPointsStop.qhd]: 6,
              [BreakPointsStop.uhd]: 10,
            },
          }}
          spacing={2}
        >
          <For each={cards}>
            {({ path, title, imageProps, ..._props }, index) => (
              <Grid item xs={12} sm={6} lg={5} xl={4}>
                <EnterTranslate initialDelay={1 + 100 * index()}>
                  <HoverScale from={0.95}>
                    <ImageCard
                      title={t(`routes.${camelToSnakeCase(title)}`)}
                      description={t(`home.${camelToSnakeCase(title)}`)}
                      imageProps={{
                        ...imageProps,
                        alt: `cover image for ${title}`,
                        sx: {
                          display: 'flex',
                          height: {
                            [BreakPointsStop.default]: 300,
                            [BreakPointsStop.mobile]: 300,
                            [BreakPointsStop.tablet]: 400,
                            [BreakPointsStop.fhd]: 450,
                            [BreakPointsStop.qhd]: 600,
                            [BreakPointsStop.uhd]: 650,
                          },
                          ...imageProps?.sx,
                        },
                      }}
                      {..._props}
                      onclick={e => onClick(e, path, imageProps?.sx?.background)}
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
