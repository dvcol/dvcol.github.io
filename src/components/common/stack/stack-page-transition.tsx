import { createEffect } from 'solid-js';

import type { Component } from 'solid-js';

import { Transition } from '~/components';
import { useNavbar, usePageTransition } from '~/services';

export const StackPageTransition: Component = () => {
  const { isScrolled, setScrollable } = useNavbar();
  const { state, pending } = usePageTransition();

  createEffect(() => setScrollable(!pending()));

  return <Transition offset={isScrolled()} {...state()} />;
};
