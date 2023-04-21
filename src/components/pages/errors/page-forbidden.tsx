import type { Component } from 'solid-js';

import PoliceLottie from '~/assets/lottie/84311-cop-riding-on-a-motorcycle.json?url';
import { LottiePlayer, Page, Section } from '~/components';

export const PageForbidden: Component = () => {
  return (
    <Page header={<Section>403 forbidden</Section>}>
      <Section>
        <LottiePlayer autoplay loop mode="normal" src={PoliceLottie} />
      </Section>
    </Page>
  );
};

export default PageForbidden;
