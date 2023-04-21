import type { Component } from 'solid-js';

import { ComingSoon, Page, Section } from '~/components';

export const TraktHome: Component = () => {
  return (
    <Page>
      <Section>
        <ComingSoon />
      </Section>
    </Page>
  );
};

export default TraktHome;
