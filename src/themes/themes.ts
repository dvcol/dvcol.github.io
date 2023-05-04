import { createTheme } from '@suid/material';

import type { Theme } from '@suid/material';
import type { ThemeOptions } from '@suid/material/styles/createTheme';

export enum Colors {
  theme = '#2a2b30',
  background = '#1d1e21',
}

export enum BreakPoints {
  xs = 0,
  sm = 600,
  md = 900,
  lg = 1200,
  xl = 1900,
  default = 0,
  mobile = 600,
  tablet = 900,
  laptop = 1024,
  desktop = 1280,
  hd = 1280,
  fhd = 1920,
  qhd = 2560,
  uhd = 3840,
}

export type ResponsiveStyleValue<T> =
  | T
  | Array<T | undefined>
  | {
      [key in BreakPoints]?: T;
    };

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
      xs: BreakPoints.xs,
      sm: BreakPoints.sm,
      md: BreakPoints.md,
      lg: BreakPoints.lg,
      xl: BreakPoints.xl,
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
      '@media (max-width:900px)': {
        fontSize: '2.75rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.7rem',
      },
    },
    h4: {
      fontSize: '2.125rem',
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
