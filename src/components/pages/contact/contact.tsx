import { useI18n } from '@solid-primitives/i18n';

import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal } from 'solid-js';

import { ContactForm } from './contact-form';

import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { HoverScale, LottiePlayer, Page, PageHeader } from '~/components';
import { RoutesMeta } from '~/services';
import { BreakPointsStop } from '~/themes';
import { setTimoutPromise } from '~/utils';

export const Contact: Component = () => {
  const [t] = useI18n();
  const [sectionRef, setSectionRef] = createSignal<HTMLDivElement>();
  const [cardRef, setCardRef] = createSignal<HTMLDivElement>();

  const [cardHeight, setCardHeight] = createSignal({
    height: '100%',
    margin: 'auto',
  });

  createEffect(() => {
    const _section = sectionRef()?.clientHeight;
    const _card = cardRef()?.clientHeight;
    if (!_section || !_card) return;
    if (_section > _card) return;
    setCardHeight({
      height: 'fit-content',
      margin: '1rem 0',
    });
  });

  const [cardState, setCardState] = createSignal({
    opacity: 0,
    transform: 'translateY(150%)',
    transition: 'transform 1s',
  });

  const [inFlight, setInFlight] = createSignal(false);
  const onClick = () => {
    if (inFlight()) return;
    setCardState({
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'transform 1s',
    });
  };

  const onSubmit = async () => {
    setInFlight(true);
    setCardState({
      opacity: 1,
      transform: 'translateX(150%)',
      transition: 'transform 1s',
    });
    await setTimoutPromise(
      () =>
        setCardState({
          opacity: 0,
          transform: 'translateY(150%)',
          transition: 'transform 0s',
        }),
      1000,
    );
    setCardState({
      opacity: 0,
      transform: 'translateY(150%)',
      transition: 'transform 1s',
    });
    setInFlight(false);
    onClick();
  };

  const disabled = createMemo(() => cardState().opacity || inFlight());

  return (
    <Page
      sideBySide
      animate="slide"
      maxWidth="uhd"
      background={{ color: RoutesMeta.Contact.bgColor }}
      header={<PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} description={t('contact.description')} />}
      headerProps={{
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
            [BreakPointsStop.default]: 'calc(100dvh - 130px)',
            [BreakPointsStop.mobile]: 'calc(100dvh - 185px)',
            [BreakPointsStop.tablet]: 'calc(100dvh - 240px)',
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
        <ContactForm
          onClear={onSubmit}
          cardProps={{
            ref: setCardRef,
            sx: {
              pointerEvents: 'all',
              margin: cardHeight().margin,
              ...cardState(),
            },
          }}
        />
      </Box>
    </Page>
  );
};

export default Contact;
