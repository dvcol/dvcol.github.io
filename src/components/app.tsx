import { Toaster } from 'solid-toast';

import { Reload, Router } from './common';

import type { Component } from 'solid-js';

export const App: Component = () => (
  <Router>
    <Reload />
    <Toaster />
  </Router>
);

export default App;
