import { ThemeProvider, useMediaQuery } from '@suid/material';

import { createMemo, lazy } from 'solid-js';

import { Toaster } from 'solid-toast';

import { I18nProvider, Reload, Router } from './common';

import type { Component } from 'solid-js';

import { darkTheme, lightTheme } from '~/themes';

const GoogleTagManager = lazy(() => import('./common/tags/google-tag-manager'));
export const App: Component = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createMemo(() => (prefersDarkMode() ? darkTheme : lightTheme));
  return (
    <ThemeProvider theme={theme()}>
      <I18nProvider>
        <Router>
          <Toaster />
          <Reload />
          <GoogleTagManager />
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
