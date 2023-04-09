import { Toaster } from 'solid-toast';

import { GoogleTag, I18nProvider, Reload, Router } from './common';

import type { Component } from 'solid-js';

export const App: Component = () => (
  <I18nProvider>
    <Router>
      <Toaster />
      <Reload />
      <GoogleTag />
    </Router>
  </I18nProvider>
);

export default App;
