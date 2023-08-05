import type { Component } from 'solid-js';

import { Transition } from '~/components';
import { usePageTransition } from '~/services';

export const StackPageTransition: Component = () => {
  const { state } = usePageTransition();
  return <Transition {...state()} />;
};
