export const camelToSnakeCase = (key: string) =>
  key
    .trim()
    .split(/(?=[A-Z])/)
    .map(k => k.toLowerCase())
    .join('_');
