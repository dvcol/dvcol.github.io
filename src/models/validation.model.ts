export type FormValidation<V> = {
  valid: boolean | ((value: V) => boolean);
  message: string | ((value: V) => string);
  validateOnDirty?: boolean;
  errorOnly?: boolean;
};
