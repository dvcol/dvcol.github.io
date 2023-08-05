import { Suspense } from 'solid-js';

import { Spinner } from './spinner';

import type { SpinnerProps } from './spinner';
import type { JSX, ParentComponent } from 'solid-js';

export const LazyLoader: ParentComponent<{ fallback?: JSX.Element; spinner?: SpinnerProps }> = props => (
  <Suspense fallback={props.fallback ?? <Spinner {...props.spinner} />}>{props.children}</Suspense>
);

export default LazyLoader;
