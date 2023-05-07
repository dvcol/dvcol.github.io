import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@suid/material';

import { createSignal, For, Show } from 'solid-js';

import type { FormControlProps } from '@suid/material/FormControl';

import type { MenuItemProps } from '@suid/material/MenuItem';
import type { SelectChangeEvent, SelectProps } from '@suid/material/Select';
import type { Component } from 'solid-js';

import type { FormValidation } from '~/models';

import { useFormValidation } from '~/utils/validation.utils';

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
};
export const FormSelect: Component<FormSelectProps> = props => {
  const [formValue, setFormValue] = createSignal(props.initialValue ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setFormValue(event.target.value);
    props.onChange?.(formValue());
  };

  const { valid, message } = useFormValidation<V>(props, formValue);

  return (
    <FormControl {...props.controlProps} sx={{ m: '1rem', minWidth: '12.5rem', ...props.controlProps?.sx }} error={!valid()}>
      <Show when={props.label}>
        <InputLabel id={`${props.id ?? 'form-select'}-label`}>{props.label}</InputLabel>
      </Show>
      <Select
        labelId={props.label ? `${props.id ?? 'form-select'}-label` : undefined}
        label={props.label}
        id={props.id ?? 'form-select'}
        value={formValue()}
        onChange={handleChange}
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
