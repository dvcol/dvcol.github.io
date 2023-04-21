import type { Component } from 'solid-js';

import ComingSoonLottie from '~/assets/lottie/30331-isometric-internet-shop.json?url';
import { LottiePlayer, Page, Section } from '~/components';

export const ComingSoon: Component = () => {
  return (
    <Page header={<Section>Coming Soon</Section>}>
      <Section>
        <LottiePlayer autoplay loop src={ComingSoonLottie} />
      </Section>
    </Page>
  );
};

export default ComingSoon;
