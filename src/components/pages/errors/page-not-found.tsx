import type { Component } from 'solid-js';

import NotFoundLottie from '~/assets/lottie/55873-404-error-page.json?url';
import { LottiePlayer, Page, Section } from '~/components';

export const PageNotFound: Component = () => {
  return (
    <Page header={<Section>404 Page not found</Section>}>
      <Section>
        <LottiePlayer autoplay loop mode="normal" src={NotFoundLottie} />
      </Section>
    </Page>
  );
};

export default PageNotFound;
