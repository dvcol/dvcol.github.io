import { lazy } from 'solid-js';
import { Toaster } from 'solid-toast';

import { I18nProvider, Reload, Router } from './common';

import type { Component } from 'solid-js';

const GoogleTagManager = lazy(() => import('./common/tags/google-tag-manager'));

export const App: Component = () => (
  <I18nProvider>
    <Router>
      <Toaster />
      <Reload />
      <GoogleTagManager />
    </Router>
  </I18nProvider>
);

export default App;
