import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { LottiePlayer, Page, PageHeader, Section } from '~/components';
import { RoutesMeta } from '~/services';

export const Contact: Component = () => {
  const LottieStyles: any = { 'max-width': '60vh', height: 'fit-content' };
  return (
    <Page
      header={<PageHeader title={'Contact'} subtitle={'TODO - Contact subheader'} description={'TODO - Contact description'} />}
      background={{ color: RoutesMeta.Contact.bgColor }}
    >
      <Section sx={{ alignItems: 'center' }}>
        <LottiePlayer style={LottieStyles} autoplay loop mode="normal" src={ContactLottie} />
      </Section>
    </Page>
  );
};

export default Contact;
