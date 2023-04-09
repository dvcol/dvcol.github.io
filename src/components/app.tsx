import { Toaster } from 'solid-toast';

import { GoogleTagManager, I18nProvider, Reload, Router } from './common';

import type { Component } from 'solid-js';

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
