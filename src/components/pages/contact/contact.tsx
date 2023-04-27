import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { Background, LottiePlayer, Page, Section } from '~/components';
import { RoutesMeta } from '~/services';

export const Contact: Component = () => {
  const LottieStyles: any = { 'max-width': '60vh', height: 'fit-content' };
  return (
    <Page header={<Section>403 forbidden</Section>}>
      <Background color={RoutesMeta.Contact.bgColor} />
      <Section sx={{ alignItems: 'center' }}>
        <LottiePlayer style={LottieStyles} autoplay loop mode="normal" src={ContactLottie} />
      </Section>
    </Page>
  );
};

export default Contact;
