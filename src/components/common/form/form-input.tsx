import { FormControl, TextField } from '@suid/material';

import { createSignal } from 'solid-js';

import type { FormControlProps } from '@suid/material/FormControl';
import type { SelectChangeEvent } from '@suid/material/Select';
import type { TextFieldProps } from '@suid/material/TextField';
import type { Component, Signal } from 'solid-js';

import type { FormValidation } from '~/models';

import type { FormGroupValidation, PropsWithRef } from '~/utils';

import { useFormValidation, watchFormChange } from '~/utils';

export type FormInputProps<V = any> = PropsWithRef<{
  id?: string;
  label?: string;
  initialValue?: V;
  validation?: FormValidation<V>;
  onChange?: (value: V) => void;
  controlProps?: FormControlProps;
  fieldProps?: TextFieldProps;
  form?: Signal<FormGroupValidation>;
  key?: string;
}>;
export const FormInput: Component<FormInputProps> = props => {
  const [value, setValue] = createSignal(props.initialValue ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    props.onChange?.(value());
  };

  const { error, valid, dirty, touched, message, setTouched } = useFormValidation(props, value);

  watchFormChange(props, { value, setValue, valid, dirty, touched, setTouched });

  return (
    <FormControl
      ref={props.ref}
      {...props.controlProps}
      sx={{ display: 'flex', flex: '1 1 auto', m: '0rem 1rem', minWidth: '12.5rem', ...props.controlProps?.sx }}
    >
      <TextField
        label={props.label}
        id={props.id ?? 'form-select'}
        value={value()}
        error={error()}
        helperText={message()}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        {...props.fieldProps}
      />
    </FormControl>
  );
};

export default FormInput;
