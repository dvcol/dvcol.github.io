module.exports = {
  root: true,
  extends: ['plugin:@dvcol/presets/solid','plugin:@dvcol/presets/jest', 'plugin:@dvcol/presets/vitest'],
  plugins: ['@dvcol/presets'],
  parserOptions: {
    project: './tsconfig.json',
  },
  // to apply jest linting even-though we use vitest
  settings: { jest: { version: 27 } },
};