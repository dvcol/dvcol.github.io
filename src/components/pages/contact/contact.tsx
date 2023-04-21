import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { LottiePlayer, Page, Section } from '~/components';

export const Contact: Component = () => {
  return (
    <Page header={<Section>403 forbidden</Section>}>
      <Section>
        <LottiePlayer autoplay loop mode="normal" src={ContactLottie} />
      </Section>
    </Page>
  );
};

export default Contact;
