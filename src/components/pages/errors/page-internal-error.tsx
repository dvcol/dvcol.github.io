import type { Component } from 'solid-js';

import MaintenanceLottie from '~/assets/lottie/6873-under-maintenance.json?url';
import { LottiePlayer, Page, Section } from '~/components';

export const PageInternalError: Component = () => {
  return (
    <Page header={<Section>500 internal error</Section>}>
      <Section>
        <LottiePlayer autoplay loop mode="normal" src={MaintenanceLottie} />
      </Section>
    </Page>
  );
};

export default PageInternalError;
