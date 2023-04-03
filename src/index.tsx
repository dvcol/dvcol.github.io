/* @refresh reload */
import { Router, hashIntegration, Routes, Route } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';

import '~/styles/index.scss';
import { App } from './components';

import { Reload } from '~/sw';

const ParticlesWip = lazy(() => import('./components/particles-wip'));
const Synology = lazy(() => import('./components/synology'));

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement))
  throw new Error('Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?');

render(
  () => (
    <Router source={hashIntegration()}>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/synology/*" component={Synology} />
        <Route path="/particles" component={ParticlesWip} />
      </Routes>
      <Reload />
    </Router>
  ),
  root!,
);
