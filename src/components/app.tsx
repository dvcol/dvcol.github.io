import { hashIntegration, Route, Router, Routes } from '@solidjs/router';

import { lazy } from 'solid-js';
import { Toaster } from 'solid-toast';

import { Reload } from './common';
import { Home } from './pages';

import type { Component } from 'solid-js';

const ParticlesWip = lazy(() => import('./common/particles/particles-wip'));
const Synology = lazy(() => import('./pages/synology/synology'));

export const App: Component = () => (
  <Router source={hashIntegration()}>
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/synology/*" component={Synology} />
      <Route path="/particles" component={ParticlesWip} />
    </Routes>
    <Reload />
    <Toaster />
  </Router>
);

export default App;
