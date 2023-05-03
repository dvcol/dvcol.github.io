import type { Component } from 'solid-js';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { HoverScale, LottiePlayer, Page, PageHeader } from '~/components';
import { RoutesMeta } from '~/services';

export const Contact: Component = () => {
  return (
    <Page
      maxWidth="uhd"
      sideBySide
      animate="slide"
      background={{ color: RoutesMeta.Contact.bgColor }}
      header={<PageHeader title={'Contact'} subtitle={'TODO - Contact subheader'} description={'TODO - Contact description'} />}
      contentProps={{
        sx: {
          justifyContent: 'center',
          maxHeight: { default: 'calc(100dvh - 125px)', mobile: 'calc(100dvh - 155px)', tablet: 'calc(100dvh - 215px)' },
        },
      }}
    >
      <HoverScale>
        <LottiePlayer autoplay loop mode="normal" src={ContactLottie} />
      </HoverScale>
    </Page>
  );
};

export default Contact;
