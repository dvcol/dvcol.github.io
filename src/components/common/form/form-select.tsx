import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@suid/material';

import { createSignal, For, Show } from 'solid-js';

import type { FormControlProps } from '@suid/material/FormControl';

import type { MenuItemProps } from '@suid/material/MenuItem';
import type { SelectChangeEvent, SelectProps } from '@suid/material/Select';
import type { Component, Signal } from 'solid-js';

import type { FormValidation } from '~/models';

import type { FormGroupValidation } from '~/utils/validation.utils';

import { useFormValidation, watchFormChange } from '~/utils/validation.utils';

export type FromSelectOption<V> = { value: V; label?: string };
export type FormSelectProps<V = any> = {
  id?: string;
  label?: string;
  options: FromSelectOption<V>[];
  initialValue?: V;
  validation?: FormValidation<V>;
  onChange?: (value: V) => void;
  controlProps?: FormControlProps;
  selectProps?: SelectProps;
  menuProps?: MenuItemProps;
  form?: Signal<FormGroupValidation>;
  key?: string;
};
export const FormSelect: Component<FormSelectProps> = props => {
  const [formValue, setFormValue] = createSignal(props.initialValue ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setFormValue(event.target.value);
    props.onChange?.(value());
  };

  const { error, message, valid, dirty, touched, setTouched } = useFormValidation(props, formValue);

  watchFormChange(props, { value: formValue, setValue: setFormValue, valid, dirty, touched, setTouched });

  return (
    <FormControl
      {...props.controlProps}
      sx={{ display: 'flex', flex: '1 1 auto', m: '0rem 1rem', minWidth: '12.5rem', ...props.controlProps?.sx }}
      error={error()}
    >
      <Show when={props.label}>
        <InputLabel id={`${props.id ?? 'form-select'}-label`}>{props.label}</InputLabel>
      </Show>
      <Select
        labelId={props.label ? `${props.id ?? 'form-select'}-label` : undefined}
        label={props.label}
        id={props.id ?? 'form-select'}
        value={formValue()}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        {...props.selectProps}
      >
        <For each={props.options}>
          {({ value, label }) => (
            <MenuItem value={value} {...props.menuProps}>
              {label ?? value}
            </MenuItem>
          )}
        </For>
      </Select>
      <Show when={message()}>
        <FormHelperText>{message()}</FormHelperText>
      </Show>
    </FormControl>
  );
};

export default FormSelect;
