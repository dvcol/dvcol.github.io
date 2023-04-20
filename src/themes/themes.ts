import { createTheme } from '@suid/material';

import type { Theme } from '@suid/material';
import type { ThemeOptions } from '@suid/material/styles/createTheme';

const scrollbar: Record<string, any> = {
  scrollbarWidth: 'thin',
  scrollbarColor: 'rgb(150 150 150 / 50%) transparent',
  '&::-webkit-scrollbar': {
    width: '0.25em',
    height: '0.25em',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 0.375em rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgb(150 150 150 / 50%)',
    boxShadow: 'inset 0 0 0.375em rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5em',
  },
};

const common: ThemeOptions = {
  components: {
    MuiContainer: {
      styleOverrides: {
        root: scrollbar,
      },
    },
  },
} as any;

export const lightTheme: Theme = createTheme({
  ...common,
  palette: {
    mode: 'light',
    background: {
      default: 'rgb(234, 238, 243)',
    },
  },
});

export const darkTheme: Theme = createTheme({
  ...common,
  palette: {
    mode: 'dark',
    background: {
      default: 'rgb(32, 38, 45)',
    },
  },
});
