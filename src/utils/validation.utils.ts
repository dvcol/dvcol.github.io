import { useI18n } from '@solid-primitives/i18n';

import { createEffect, createMemo, createSignal } from 'solid-js';

import type { FormControlProps } from '@suid/material/FormControl';
import type { Accessor, Setter, Signal } from 'solid-js';

import type { FormValidation } from '~/models';

export type FormGroupItem<V> = {
  value: V;
  valid: boolean;
  touched: boolean;
  dirty: boolean;
};
export type FormGroup<V = any> = {
  [key in keyof V]: FormGroupItem<V[key]>;
};

export type FormGroupValidation<V = any> = FormGroup<Partial<V>> & {
  value?: Partial<V>;
  valid?: boolean;
  touched?: boolean;
  dirty?: boolean;
};

export const watchFormChange = <V = any>(
  props: { form?: Signal<FormGroupValidation>; key?: string },
  {
    value,
    setValue,
    valid,
    touched,
    setTouched,
    dirty,
  }: {
    value: Accessor<V>;
    setValue: Setter<V>;
    valid: Accessor<boolean>;
    dirty: Accessor<boolean>;
    touched: Accessor<boolean>;
    setTouched: Setter<V>;
  },
) => {
  createEffect(() => {
    if (props.form && props.key) {
      const [, setForm] = props.form;
      setForm(_form => {
        const _newForm: any = {
          ..._form,
          [props.key as any]: {
            value: value(),
            valid: valid(),
            dirty: dirty(),
            touched: touched(),
          },
        };
        const keys = Object.keys(_newForm).filter(k => typeof _newForm[k] !== 'boolean');
        _newForm.valid = keys.every(k => _newForm[k].valid);
        _newForm.touched = keys.some(k => _newForm[k as any].touched);
        _newForm.dirty = keys.some(k => _newForm[k as any].dirty);
        _newForm.value = Object.keys(_form).reduce((acc, key) => {
          if (typeof _form[key] !== 'boolean') acc[key] = _form[key].value;
          return acc;
        }, {});
        return _newForm;
      });
    }
  });
  createEffect(() => {
    if (props.form && props.key) {
      const _value = props.form[0]()[props.key]?.value;
      if (_value !== value()) {
        setValue('');
        setTouched(false);
      }
    }
  });
};

export type FormValidationState = {
  valid: Accessor<boolean>;
  dirty: Accessor<boolean>;
  touched: Accessor<boolean>;
  setTouched: Setter<boolean>;
  error: Accessor<boolean>;
  message: Accessor<string | undefined>;
};
export const useFormValidation = <V = unknown>(
  props: {
    controlProps?: FormControlProps;
    validation?: FormValidation<V>;
  },
  value: Accessor<V>,
): FormValidationState => {
  const [touched, setTouched] = createSignal(false);

  const initial = value();
  const dirty = createMemo(() => value() !== initial);

  const valid = createMemo(() => {
    if (props.controlProps?.error) return false;
    if (!props.validation) return true;
    if (typeof props.validation.valid === 'boolean') return props.validation.valid;
    return props.validation.valid?.(value());
  });

  const validate = createMemo(() => props.validation?.validate ?? 'touched');
  const error = createMemo(() => {
    if (props.controlProps?.error) return true;
    if (!props.validation) return false;
    if (validate() === 'touched' && !touched()) return false;
    if (validate() === 'dirty' && !dirty()) return false;
    return !valid();
  });

  const errorOnly = createMemo(() => props.validation?.errorOnly ?? true);
  const message = createMemo(() => {
    if (!props.validation) return;
    if (errorOnly() && !error()) return;
    if (typeof props.validation.message === 'string') return props.validation.message;
    return props.validation.message?.(value());
  });
  return {
    valid,
    dirty,
    touched,
    setTouched,
    error,
    message,
  };
};

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const useValidator = () => {
  const [t] = useI18n();

  const email = {
    valid: (value: string) => {
      if (!value) return false;
      return emailRegex.test(value);
    },
    message: (value: string) => {
      if (!value) return t('error.validation.required');
      return t('error.validation.email');
    },
  };

  const required = {
    valid: (value: string) => !!value,
    message: t('error.validation.required'),
  };

  const maxLength = (max: number, message = t('error.validation.maximum', { max: `${max}` })) => ({
    valid: (value: string) => {
      if (!value) return false;
      return value?.length <= max;
    },
    message: (value: string) => {
      if (!value) return t('error.validation.required');
      if (value?.length > max) return message;
    },
  });
  return {
    email,
    required,
    maxLength,
  };
};
