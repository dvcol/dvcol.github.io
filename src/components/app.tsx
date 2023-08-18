import { ThemeProvider } from '@suid/material';

import { lazy } from 'solid-js';

import { Toaster } from 'solid-toast';

import { I18nProvider } from './common/i18n';
import { Router } from './common/router';
import { Reload } from './common/sw';

import type { Component } from 'solid-js';

import { Colors, darkTheme } from '~/themes';

const GoogleTagManager = lazy(() => import('./common/tags/google-tag-manager'));
export const App: Component = () => {
  // TODO : support theme override for light mode
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const theme = createMemo(() => (prefersDarkMode() ? darkTheme : lightTheme));
  return (
    <ThemeProvider theme={darkTheme}>
      <I18nProvider>
        <Router>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                'background-color': Colors.theme,
                color: Colors.white,
              },
            }}
          />
          <Reload />
          <GoogleTagManager />
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
