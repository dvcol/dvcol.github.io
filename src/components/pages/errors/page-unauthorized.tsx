import type { Component } from 'solid-js';

import SecurityLottie from '~/assets/lottie/78078-security-system.json?url';
import { LottiePlayer, Page, Section } from '~/components';

export const PageUnauthorized: Component = () => {
  return (
    <Page header={<Section>401 unauthorized</Section>}>
      <Section>
        <LottiePlayer autoplay loop mode="normal" src={SecurityLottie} />
      </Section>
    </Page>
  );
};

export default PageUnauthorized;
