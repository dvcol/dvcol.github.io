export type FormValidation<V = unknown> = {
  valid: boolean | ((value: V) => boolean);
  message: string | ((value: V) => string);
  validate?: 'touched' | 'dirty' | 'always';
  errorOnly?: boolean;
};
