import { send } from '@emailjs/browser';

import type { Component } from 'solid-js';

import type { ContactForm } from '~/models';

import ContactLottie from '~/assets/lottie/95145-contact.json?url';
import { HoverScale, LottiePlayer, Page, PageHeader } from '~/components';
import { emailJS } from '~/models';
import { RoutesMeta } from '~/services';

export const Contact: Component = () => {
  const form: ContactForm = {
    sender_mail: 'test.mail@gmail.com',
    sender_name: 'John Doe',
    subject: 'My test subject for the message',
    title: 'My custom Title text',
    body: `Hello,
        
        This is a test message,
        on multiple lines.
        
        Cordially,
        Mr. John Doe
        `,
  };
  const sendMail = () => send(emailJS.service, emailJS.template, form, emailJS.key);
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
          maxHeight: { default: 'calc(100dvh - 130px)', mobile: 'calc(100dvh - 160px)', tablet: 'calc(100dvh - 240px)' },
        },
      }}
    >
      <HoverScale initialDelay={1000}>
        <LottiePlayer autoplay loop mode="normal" src={ContactLottie} />
      </HoverScale>
      <button hidden onClick={sendMail} />
    </Page>
  );
};

export default Contact;
