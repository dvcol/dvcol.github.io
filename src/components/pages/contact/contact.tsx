import { ContactForm } from './contact-form';

import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { HoverScale, LottiePlayer, Page, PageHeader } from '~/components';
import { RoutesMeta } from '~/services';
import { BreakPointsStop } from '~/themes';

export const Contact: Component = () => {
  return (
    <Page
      maxWidth="uhd"
      sideBySide
      animate="slide"
      background={{ color: RoutesMeta.Contact.bgColor }}
      header={<PageHeader title={'Contact'} subtitle={'TODO - Contact subheader'} description={'TODO - Contact description'} />}
      contentProps={{
        sx: {
          justifyContent: 'center',
          maxHeight: {
            [BreakPointsStop.default]: 'calc(100dvh - 130px)',
            [BreakPointsStop.mobile]: 'calc(100dvh - 160px)',
            [BreakPointsStop.tablet]: 'calc(100dvh - 240px)',
          },
        },
      }}
    >
      <ContactForm />
      <HoverScale initialDelay={1000}>
        <LottiePlayer autoplay loop mode="normal" src={ContactLottie} />
      </HoverScale>
    </Page>
  );
};

export default Contact;
