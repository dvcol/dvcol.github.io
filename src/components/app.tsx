import { Toaster } from 'solid-toast';

import { I18nProvider, Reload, Router } from './common';

import type { Component } from 'solid-js';

export const App: Component = () => (
  <I18nProvider>
    <Router>
      <Reload />
      <Toaster />
    </Router>
  </I18nProvider>
);

export default App;
