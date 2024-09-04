import { Motion } from '@motionone/solid';
import { useNavigate } from '@solidjs/router';
import { Grid } from '@suid/material';

import { createSignal, For, onCleanup, onMount } from 'solid-js';

import { v4 as uuid } from 'uuid';

import type { Component } from 'solid-js';

import type { BackgroundColors, ImageCardProps } from '~/components/common/layout';

import ContactLottie from '~/assets/lottie/64643-receive-a-new-email.json?url';
import AboutMeSvg from '~/assets/lottie/developer-front-end-lottie.json?url';
import { HoverScale } from '~/components/common/animation';
import { ImageCard, Page } from '~/components/common/layout';

import { ParticlesContainer } from '~/components/common/particles';
import { MimeType } from '~/models';
import { RoutesMeta, useNavbar, usePageTransition } from '~/services';
import { useI18n } from '~/services/i18n';
import { BreakPointsStop, Colors, zIndex } from '~/themes';
import { camelToSnakeCase } from '~/utils';

const traktApiRegex = /http(s?):\/\/api(-staging)?.trakt.tv/;
const traktCodeRegex = /[?&]code=\w+/;

const [firstMount, setFirstMount] = createSignal(true);

type Cards = ImageCardProps & { id: string; path: string; title: string; bgColors: { source?: BackgroundColors; target?: BackgroundColors } };
export const Home: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();

  const cards: Cards[] = [
    {
      id: uuid(),
      path: RoutesMeta.SynologyDemo.path,
      title: RoutesMeta.SynologyDemo.name,
      videoProps: {
        source: { src: 'assets/video/synology-download-preview.hevc.mp4', type: MimeType.MP4 },
      },
      bgColors: {
        source: RoutesMeta.SynologyDemo.accentColor,
        target: RoutesMeta.SynologyDemo.bgColor,
      },
    },
    {
      id: uuid(),
      path: RoutesMeta.TraktDemo.path,
      title: RoutesMeta.TraktDemo.name,
      videoProps: {
        source: { src: 'assets/video/trakt-extension-preview.hevc.mp4', type: MimeType.MP4 },
      },
      bgColors: {
        source: RoutesMeta.TraktDemo.accentColor,
        target: RoutesMeta.TraktDemo.bgColor,
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
        target: {
          background: 'linear-gradient(-45deg, #ff5600, #ff0667, #8400f8, #1d00ff)',
          backgroundSize: '400% 400%',
        },
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

  const onClick = (event: MouseEvent, { id, path, bgColors: { source, target } }: Pick<Cards, 'id' | 'path' | 'bgColors'>) => {
    setClicked(id);
    return transition({
      event,
      colors: [source, Colors.Background, target],
      position: {
        top: event.clientY,
        left: event.clientX,
      },
      then: () => navigate(path),
    });
  };

  const { setScrollable } = useNavbar();

  const redirectToTrakt = () => {
    if (document.referrer && !traktApiRegex.test(document.referrer)) return;
    if (!traktCodeRegex.test(window.location.href)) return;
    navigate(RoutesMeta.TraktDemo.path);
  };

  let timeout: NodeJS.Timeout;
  onMount(() => {
    redirectToTrakt();
    setScrollable(false);
    timeout = setTimeout(() => setScrollable(true), 100 * (cards?.length ?? 0));
  });
  onCleanup(() => {
    clearTimeout(timeout);
    setScrollable(true);
    if (firstMount()) setFirstMount(false);
  });

  return (
    <Page
      maxWidth={BreakPointsStop.qhd}
      contentProps={{
        sx: { justifyContent: 'center' },
      }}
    >
      <ParticlesContainer>
        <Grid
          container
          sx={{
            position: 'relative',
            justifyContent: 'center',
            p: {
              [BreakPointsStop.default]: '3rem 0.5rem 1rem',
              [BreakPointsStop.tablet]: '0',
            },
            gap: {
              [BreakPointsStop.default]: 0,
              [BreakPointsStop.desktop]: 3,
              [BreakPointsStop.fhd]: 4,
              [BreakPointsStop.qhd]: 6,
              [BreakPointsStop.uhd]: 10,
            },
            pointerEvents: 'none',
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
                  pointerEvents: 'all',
                }}
              >
                <Motion
                  animate={{ opacity: [firstMount() ? 0 : 1, 1], scale: [firstMount() ? 0.7 : 1, 1] }}
                  transition={{ duration: 1, delay: (140 * index()) / 1000 }}
                >
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
                </Motion>
              </Grid>
            )}
          </For>
        </Grid>
      </ParticlesContainer>
    </Page>
  );
};

export default Home;
