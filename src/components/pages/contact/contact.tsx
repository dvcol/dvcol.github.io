import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { Background, LottiePlayer, Page, Section } from '~/components';
import { RoutesMeta } from '~/services';

export const Contact: Component = () => {
  return (
    <Page header={<Section>403 forbidden</Section>}>
      <Background color={RoutesMeta.Contact.bgColor} />
      <Section>
        <LottiePlayer autoplay loop mode="normal" src={ContactLottie} />
      </Section>
    </Page>
  );
};

export default Contact;
