import { FormControl, FormHelperText, TextField } from '@suid/material';

import { createSignal, Show } from 'solid-js';

import type { FormControlProps } from '@suid/material/FormControl';
import type { SelectChangeEvent } from '@suid/material/Select';
import type { TextFieldProps } from '@suid/material/TextField';
import type { Component } from 'solid-js';
import type { FormValidation } from '~/models';

import { useFormValidation } from '~/utils/validation.utils';

export type FormInputProps<V = any> = {
  id?: string;
  label?: string;
  initialValue?: V;
  validation?: FormValidation<V>;
  onChange?: (value: V) => void;
  controlProps?: FormControlProps;
  fieldProps?: TextFieldProps;
};
export const FormInput: Component<FormInputProps> = props => {
  const [formValue, setFormValue] = createSignal(props.initialValue ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setFormValue(event.target.value);
    props.onChange?.(formValue());
  };

  const { valid, message } = useFormValidation<V>(props, formValue);

  return (
    <FormControl {...props.controlProps} sx={{ m: '1rem', minWidth: '12.5rem', ...props.controlProps?.sx }} error={!valid()}>
      <TextField label={props.label} id={props.id ?? 'form-select'} value={formValue()} onChange={handleChange} {...props.fieldProps} />
      <Show when={message()}>
        <FormHelperText>{message()}</FormHelperText>
      </Show>
    </FormControl>
  );
};

export default FormInput;
