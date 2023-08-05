import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Grid } from '@suid/material';

import { createSignal, For } from 'solid-js';
import { v4 as uuid } from 'uuid';

import type { Component } from 'solid-js';
import type { ImageCardProps } from '~/components';

import ComingSoonLottie from '~/assets/lottie/23888-website-build.json?url';
import ContactLottie from '~/assets/lottie/64643-receive-a-new-email.json?url';
import AboutMeSvg from '~/assets/lottie/developer-front-end-lottie.json?url';
import { EnterTranslate, HoverScale, ImageCard, Page, ParticlesContainer, TriangleParticles } from '~/components';

import { MimeType } from '~/models';
import { RoutesMeta, usePageTransition } from '~/services';
import { BreakPointsStop, zIndex } from '~/themes';
import { camelToSnakeCase } from '~/utils';

type Cards = ImageCardProps & { id: string; path: string; title: string; bgColors: { source?: string; target?: string } };
export const Home: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();

  const cards: Cards[] = [
    {
      id: uuid(),
      path: RoutesMeta.SynologyDemo.path,
      title: RoutesMeta.SynologyDemo.name,
      videoProps: { source: { src: 'assets/video/synology_demo.mp4', type: MimeType.MP4 } },
      bgColors: {
        source: RoutesMeta.SynologyDemo.bgColor,
        target: RoutesMeta.SynologyDemo.bgColor,
      },
    },
    {
      id: uuid(),
      path: RoutesMeta.AboutMe.path,
      title: RoutesMeta.AboutMe.name,
      imageProps: { sx: { background: 'darkblue' } },
      lottieProps: { src: AboutMeSvg },
      bgColors: {
        source: 'darkblue',
        target: RoutesMeta.AboutMe.bgColor,
      },
    },
    {
      id: uuid(),
      path: RoutesMeta.Trakt.path,
      title: RoutesMeta.Trakt.name,
      imageProps: { sx: { background: RoutesMeta.Trakt.bgColor } },
      lottieProps: { src: ComingSoonLottie },
      bgColors: {
        source: RoutesMeta.Trakt.bgColor,
        target: RoutesMeta.Trakt.bgColor,
      },
    },
    {
      id: uuid(),
      path: RoutesMeta.Contact.path,
      title: RoutesMeta.Contact.name,
      imageProps: { sx: { background: RoutesMeta.Contact.bgColor } },
      lottieProps: { src: ContactLottie },
      bgColors: {
        source: RoutesMeta.Contact.bgColor,
        target: RoutesMeta.Contact.bgColor,
      },
    },
  ];

  const { transition } = usePageTransition();
  const [clicked, setClicked] = createSignal();

  const onClick = (event: MouseEvent, { id, path, bgColors }: Pick<Cards, 'id' | 'path' | 'bgColors'>) => {
    setClicked(id);
    return transition({
      event,
      colors: [bgColors.source, RoutesMeta.Home.bgColor, bgColors.target],
      position: {
        top: event.clientY,
        left: event.clientX,
      },
      then: () => navigate(path),
    });
  };

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
            {({ id, path, bgColors, title, imageProps, ..._props }, index) => (
              <Grid
                id={`card-${id}`}
                item
                xs={12}
                sm={6}
                lg={5}
                xl={4}
                sx={{
                  transition: 'scale 2s ease-out, opacity 0.5s ease-out',
                  willChange: 'scale, opacity',
                  opacity: clicked() === id ? 0 : 1,
                  scale: clicked() === id ? '1.5' : '1',
                  zIndex: clicked() === id ? zIndex.Layer3 + 10 : undefined,
                }}
              >
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
                      onclick={e => onClick(e, { id, path, bgColors })}
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
