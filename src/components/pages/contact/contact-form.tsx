import { send } from '@emailjs/browser';
import { useI18n } from '@solid-primitives/i18n';
import { Button, Card, CardActions, CardContent, CircularProgress, Grid, Stack } from '@suid/material';

import MailSvg from 'line-md/svg/email.svg?component-solid';
import RemoveSvg from 'line-md/svg/remove.svg?component-solid';

import { createEffect, createSignal, For } from 'solid-js';

import type CardProps from '@suid/material/Card/CardProps';
import type { CardContentProps } from '@suid/material/CardContent';
import type { GridProps } from '@suid/material/Grid';
import type { Component } from 'solid-js';

import type { FormInputProps, FormSelectProps, FormValidation, HeaderProps } from '~/components';

import type { ContactTemplateForm } from '~/models';

import type { PropsWithRef } from '~/utils';

import type { FormGroupValidation } from '~/utils/validation.utils';

import { FormInput, FormSelect, stopScrollPropagation } from '~/components';
import { emailJS } from '~/models';

import { BreakPointsStop } from '~/themes';
import { useValidator } from '~/utils';

export type ContactFormProps = {
  cardProps?: PropsWithRef<CardProps>;
  headerProps?: HeaderProps;
  contentProps?: CardContentProps;
  onClear?: (form?: Partial<ContactTemplateForm>) => void;
  onSubmit?: (form?: Partial<ContactTemplateForm>) => void;
};
export const ContactForm: Component<ContactFormProps> = props => {
  const [t] = useI18n();

  const [form, setForm] = createSignal<FormGroupValidation<ContactTemplateForm>>({});

  const subject: FormSelectProps = {
    id: 'subject',
    label: t('contact.form.subject.label'),
    options: [
      { value: t('contact.form.subject.option.job') },
      { value: t('contact.form.subject.option.inquiry') },
      { value: t('contact.form.subject.option.synology') },
      { value: t('contact.form.subject.option.other') },
    ],
    controlProps: {
      required: true,
    },
  };

  const clearForm = () => {
    props.onClear?.(form().value);
    setForm({});
  };

  const [sending, setSending] = createSignal(false);
  const sendMail = async () => {
    try {
      setSending(true);
      const _form = form().value;
      await send(emailJS.service, emailJS.template, _form, emailJS.key);
      setForm({});
      props.onSubmit?.(_form);
    } catch (e) {
      console.error('Failed to send message', e);
    } finally {
      setSending(false);
    }
  };

  const { email, required, maxLength } = useValidator();

  const validation: Record<keyof ContactTemplateForm, FormValidation> = {
    subject: required,
    sender_mail: email,
    sender_name: maxLength(120),
    title: maxLength(120),
    body: maxLength(5000),
  };

  const [bodyRef, setBodyRef] = createSignal<HTMLDivElement>();

  createEffect(() => {
    const _ref = bodyRef();
    if (_ref) stopScrollPropagation(_ref);
  });

  const inputs: { input: FormInputProps; grid: GridProps }[] = [
    {
      input: {
        id: 'sender_mail',
        label: t('contact.form.sender_mail'),
        validation: validation.sender_mail,
        fieldProps: {
          required: true,
          autoComplete: 'email',
        },
        controlProps: {
          sx: {
            mr: {
              [BreakPointsStop.sm]: '0.5rem',
            },
          },
        },
      },
      grid: {
        xs: 12,
        sm: 6,
      },
    },
    {
      input: {
        id: 'sender_name',
        label: t('contact.form.sender_name'),
        validation: validation.sender_name,
        fieldProps: {
          required: true,
          autoComplete: 'name',
        },
        controlProps: {
          sx: {
            ml: {
              [BreakPointsStop.sm]: '0.5rem',
            },
          },
        },
      },
      grid: {
        xs: 12,
        sm: 6,
      },
    },
    {
      input: {
        id: 'title',
        label: t('contact.form.title'),
        validation: validation.title,
        fieldProps: {
          required: true,
        },
      },
      grid: {
        sm: 12,
      },
    },
    {
      input: {
        id: 'body',
        label: t('contact.form.body'),
        validation: validation.body,
        fieldProps: {
          required: true,
          multiline: true,
          rows: Math.ceil(window.innerHeight / 100),
        },
        ref: setBodyRef,
      },
      grid: {
        sm: 12,
      },
    },
  ];

  return (
    <Card
      {...props.cardProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        borderRadius: '0.5rem',
        boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
        ...props.cardProps?.sx,
      }}
    >
      <CardContent
        {...props.contentProps}
        sx={{
          padding: {
            [BreakPointsStop.default]: 0,
            [BreakPointsStop.tablet]: '1rem 1rem 0.5rem',
          },
          ...props.contentProps?.sx,
        }}
      >
        <Grid container sx={{ gap: '1rem 0', m: '1rem 0' }}>
          <Grid item sm={12} sx={{ flex: '1 1 auto' }}>
            <FormSelect form={[form, setForm]} key={subject.id} {...subject} validation={validation.subject} />
          </Grid>
          <For each={inputs}>
            {({ input, grid }) => (
              <Grid item {...grid} sx={{ flex: '1 1 auto', ...grid?.sx }}>
                <FormInput form={[form, setForm]} key={input?.id} {...input} />
              </Grid>
            )}
          </For>
        </Grid>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          padding: {
            [BreakPointsStop.default]: '0 1rem 1rem',
            [BreakPointsStop.tablet]: '0 2rem 1.5rem',
          },
        }}
      >
        <Stack direction="row" spacing="1rem">
          <Button
            variant="outlined"
            endIcon={<RemoveSvg style={{ scale: 0.8 }} />}
            color="error"
            onClick={clearForm}
            sx={{ alignItems: 'flex-start' }}
            disabled={sending()}
          >
            {t('buttons.clear')}
          </Button>
          <Button
            variant="outlined"
            endIcon={sending() ? <CircularProgress sx={{ width: '16px', p: '4px' }} /> : <MailSvg />}
            onClick={sendMail}
            sx={{ alignItems: 'flex-start' }}
            disabled={!form().valid || sending()}
          >
            {t('buttons.submit')}
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ContactForm;
