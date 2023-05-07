import { createMemo } from 'solid-js';

import type { FormControlProps } from '@suid/material/FormControl';
import type { Accessor } from 'solid-js';

import type { FormValidation } from '~/models';

export const useFormValidation = <V>(
  props: {
    controlProps?: FormControlProps;
    validation?: FormValidation<V>;
  },
  value: Accessor<V>,
): { dirty: Accessor<boolean>; valid: Accessor<boolean>; message: Accessor<string> } => {
  const initial = value();
  const dirty = createMemo(() => value() !== initial);

  const validateOnDirty = createMemo(() => props.validation?.validateOnDirty ?? true);
  const valid = createMemo(() => {
    if (props.controlProps?.error) return false;
    if (!props.validation) return true;
    if (validateOnDirty() && !dirty()) return true;
    if (typeof props.validation.valid === 'boolean') return props.validation.valid;
    return props.validation.valid?.(value());
  });

  const errorOnly = createMemo(() => props.validation?.errorOnly ?? true);
  const message = createMemo(() => {
    if (!props.validation) return;
    if (errorOnly() && valid()) return;
    if (typeof props.validation.message === 'string') return props.validation.message;
    return props.validation.message?.(value());
  });
  return {
    dirty,
    valid,
    message,
  };
};
