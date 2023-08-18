import { useI18n } from '@solid-primitives/i18n';

import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal, on, onCleanup, onMount } from 'solid-js';

import { ContactForm } from './contact-form';

import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/64643-receive-a-new-email.json?url';
import { HoverScale } from '~/components/common/animation';
import { Page, PageHeader } from '~/components/common/layout';
import { LottiePlayer } from '~/components/common/lottie';

import { RoutesMeta, useNavbar } from '~/services';
import { BreakPointsStop } from '~/themes';
import { sleep, useWatchResize } from '~/utils';

const defaultHeight = {
  height: '100%',
  margin: 'auto',
};

export const Contact: Component = () => {
  const [t] = useI18n();
  const [sectionRef, setSectionRef] = createSignal<HTMLDivElement>();
  const [cardRef, setCardRef] = createSignal<HTMLDivElement>();

  const { resize } = useWatchResize();

  const [cardHeight, setCardHeight] = createSignal(defaultHeight);

  createEffect(
    on(resize, () => {
      const _section = sectionRef()?.clientHeight;
      const _card = cardRef()?.clientHeight;
      if (!_section || !_card) return setCardHeight(defaultHeight);
      if (_section > _card) return setCardHeight(defaultHeight);
      setCardHeight({
        height: 'fit-content',
        margin: '1rem 0',
      });
    }),
  );

  const [cardState, setCardState] = createSignal({
    opacity: 0,
    transform: 'translateY(150%)',
    transition: 'transform 1s',
  });

  const [inFlight, setInFlight] = createSignal(false);
  const [rotate, setRotate] = createSignal(0);
  const toggleEnveloppe = async (open = rotate() !== 270) => {
    setInFlight(true);
    setRotate(open ? 270 : 0);
    await sleep(1300);
  };

  const onClick = async () => {
    if (cardState().opacity) return;
    if (inFlight()) return;
    setInFlight(true);
    setCardState({
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'transform 1s',
    });
    await sleep(1000);
    await toggleEnveloppe();
    setInFlight(false);
  };

  const onSubmit = async () => {
    await toggleEnveloppe();
    setCardState({
      opacity: 1,
      transform: 'translateX(150%)',
      transition: 'transform 1s',
    });
    await sleep(1000);
    setCardState({
      opacity: 0,
      transform: 'translateY(150%)',
      transition: 'transform 0s',
    });
    await sleep(1000);
    setInFlight(false);
    await onClick();
  };

  const disabled = createMemo(() => !!cardState().opacity || inFlight());

  const [borders, setBorders] = createSignal({ width: 0, height: 0 });
  let borderTimeout: NodeJS.Timeout;
  createEffect(
    on(resize, () => {
      clearTimeout(borderTimeout);
      borderTimeout = setTimeout(() => {
        const _card = cardRef();
        if (!_card || !_card.clientWidth || !_card.clientHeight) return;
        setBorders({
          width: _card.clientWidth / 2,
          height: _card.clientHeight / 2,
        });
      }, 500);
    }),
  );

  let mountTimeout: NodeJS.Timeout;
  onMount(() => {
    mountTimeout = setTimeout(onClick, 1500);
  });

  const { setScrollable } = useNavbar();
  createEffect(() => setScrollable(!inFlight()));

  onCleanup(() => {
    clearTimeout(mountTimeout);
    clearTimeout(borderTimeout);
    setScrollable(true);
  });

  const [headerRef, setHeaderRef] = createSignal<HTMLDivElement>();

  const headerHeight = createMemo(() => headerRef()?.clientHeight);

  return (
    <Page
      sideBySide
      animate="slide"
      maxWidth="uhd"
      background={{ color: RoutesMeta.Contact.bgColor }}
      header={<PageHeader navbar title={t('contact.title')} subtitle={t('contact.subtitle')} description={t('contact.description')} />}
      headerProps={{
        ref: setHeaderRef,
        sx: {
          justifyContent: {
            [BreakPointsStop.desktop]: 'center',
          },
          maxWidth: {
            [BreakPointsStop.desktop]: '32%',
            [BreakPointsStop.fhd]: '50%',
            [BreakPointsStop.qhd]: '39%',
          },
        },
      }}
      contentProps={{
        ref: setSectionRef,
        sx: {
          justifyContent: 'center',
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          maxHeight: {
            [BreakPointsStop.default]: `calc(100dvh - ${headerHeight() || 260}px)`,
            [BreakPointsStop.mobile]: `calc(100dvh - ${headerHeight() || 260}px)`,
            [BreakPointsStop.tablet]: `calc(100dvh - ${headerHeight() || 260}px)`,
          },
        }}
      >
        <HoverScale initialDelay={1000} disabled={disabled()}>
          <LottiePlayer autoplay loop mode="normal" src={ContactLottie} onclick={onClick} />
        </HoverScale>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: cardHeight().height,
          display: 'flex',
          pointerEvents: 'none',
          maxHeight: disabled() ? undefined : '50%',
          overflow: disabled() ? undefined : 'hidden',
        }}
      >
        <Box
          sx={{
            margin: cardHeight().margin,
            '--rotate': `${rotate()}deg`,
            ...cardState(),
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              borderTop: `${borders().height}px solid transparent`,
              borderLeft: `${borders().width}px solid #ededed`,
              borderBottom: `${borders().height}px solid transparent`,
              zIndex: 2,
              transformOrigin: 'left',
              transform: 'rotateY(var(--rotate))',
              transition: 'transform 1.2s',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              borderTop: `${borders().height}px solid transparent`,
              borderRight: `${borders().width}px solid #e6e6e6`,
              borderBottom: `${borders().height}px solid transparent`,
              zIndex: 2,
              transformOrigin: 'right',
              transform: 'rotateY(var(--rotate))',
              transition: 'transform 1.2s',
              pointerEvents: 'none',
            }}
          />
          <ContactForm
            onSubmit={onSubmit}
            cardProps={{
              ref: setCardRef,
              sx: {
                pointerEvents: 'all',
                '&::before': {
                  position: 'absolute',
                  top: 0,
                  content: '""',
                  borderRight: `${borders().width}px solid transparent`,
                  borderTop: `${borders().height}px solid #f6f6f6`,
                  borderLeft: `${borders().width}px solid transparent`,
                  zIndex: 2,
                  transformOrigin: 'top',
                  transform: 'rotateX(var(--rotate))',
                  transition: 'transform 1s',
                },
                '&::after': {
                  position: 'absolute',
                  bottom: 0,
                  content: '""',
                  borderRight: `${borders().width}px solid transparent`,
                  borderBottom: `${borders().height}px solid #d9d9d9`,
                  borderLeft: `${borders().width}px solid transparent`,
                  zIndex: 2,
                  transformOrigin: 'bottom',
                  transform: 'rotateX(var(--rotate))',
                  transition: 'transform 1.3s',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default Contact;
