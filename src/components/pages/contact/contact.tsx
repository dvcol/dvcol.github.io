import { useI18n } from '@solid-primitives/i18n';

import { Box } from '@suid/material';

import { ContactForm } from './contact-form';

import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { HoverScale, LottiePlayer, Page, PageHeader } from '~/components';
import { RoutesMeta } from '~/services';
import { BreakPointsStop } from '~/themes';

export const Contact: Component = () => {
  const [t] = useI18n();
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
        <HoverScale initialDelay={1000}>
          <LottiePlayer autoplay loop mode="normal" src={ContactLottie} />
        </HoverScale>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        <ContactForm
          cardProps={{
            sx: {
              margin: 'auto',
            },
          }}
        />
      </Box>
    </Page>
  );
};

export default Contact;
