import { send } from '@emailjs/browser';
import { Button, Card, CardActions, CardContent, CardHeader } from '@suid/material';

import { For } from 'solid-js';

import type { Component } from 'solid-js';

import type { FormInputProps, FormSelectProps, FormValidation } from '~/components';

import type { ContactTemplateForm } from '~/models';

import { FormInput, FormSelect, Section } from '~/components';

import { emailJS } from '~/models';

export const ContactForm: Component = () => {
  const form: ContactTemplateForm = {
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

  const validation: Record<keyof ContactTemplateForm, FormValidation> = {
    subject: {
      valid: (value: string) => !!value,
      message: 'Required',
    },
  };

  const subject: FormSelectProps = {
    id: 'form-subject',
    label: 'subject',
    options: [{ value: 'Business Inquiry' }, { value: 'Job opportunity' }, { value: 'Synology Demo' }, { value: 'custom', label: 'Other' }],
  };

  const inputs: FormInputProps[] = [
    {
      id: 'form-sender_mail',
      label: 'Email',
    },
    {
      id: 'form-sender_name',
      label: 'Name',
    },
    {
      id: 'form-title',
      label: 'Title',
    },
    {
      id: 'form-body',
      label: 'Message',
    },
  ];
  return (
    <Card>
      <CardHeader title="Shrimp and Chorizo Paella" subheader="September 14, 2016" />
      <CardContent>
        <Section>
          <FormSelect {...subject} validation={validation.subject} />
          <For each={inputs}>{inputProps => <FormInput {...inputProps} />}</For>
        </Section>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={sendMail}>Submit</Button>
      </CardActions>
    </Card>
  );
};

export default ContactForm;
