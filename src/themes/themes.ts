import { createTheme } from '@suid/material';

import type { Theme } from '@suid/material';
import type { ThemeOptions } from '@suid/material/styles/createTheme';

import { BreakPoints } from '~/themes/breakpoints';

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
  breakpoints: {
    values: {
      xs: BreakPoints.default,
      sm: BreakPoints.mobile,
      md: BreakPoints.tablet,
      lg: BreakPoints.hd,
      xl: BreakPoints.desktopXl,
      default: BreakPoints.default,
      mobile: BreakPoints.mobile,
      tablet: BreakPoints.tablet,
      laptop: BreakPoints.laptop,
      desktop: BreakPoints.desktop,
      hd: BreakPoints.hd,
      fhd: BreakPoints.fhd,
      qhd: BreakPoints.qhd,
      uhd: BreakPoints.uhd,
    },
  },
  typography: {
    // typography overrides here
    h2: {
      fontSize: '3.75rem',
      '@media (max-width:1500px)': {
        fontSize: '3rem',
      },
      '@media (max-width:900px)': {
        fontSize: '2.75rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.7rem',
      },
    },
    h4: {
      fontSize: '2.125rem',
      '@media (max-width:1500px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:900px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
      },
    },
    h6: {
      fontSize: '1.35rem',
      lineHeight: '1.75rem',
      '@media (max-width:1500px)': {
        fontSize: '1.3rem',
        lineHeight: '1.6rem',
      },
      '@media (max-width:900px)': {
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1rem',
        lineHeight: '1.25rem',
      },
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: scrollbar,
      },
    },
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
