import { Suspense } from 'solid-js';

import type { Component, JSX } from 'solid-js';

export const LazyLoader: Component<{ component: Component; fallback?: JSX.Element }> = props => (
  <Suspense fallback={props.fallback ?? <div>fallback</div>}>
    <props.component />
  </Suspense>
);

export default LazyLoader;
