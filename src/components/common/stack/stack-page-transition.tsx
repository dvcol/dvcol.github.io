import { createEffect } from 'solid-js';

import type { Component } from 'solid-js';

import { Transition } from '~/components';
import { useNavbar, usePageTransition } from '~/services';

export const StackPageTransition: Component = () => {
  const { isScrolled, setDisabled } = useNavbar();
  const { state, pending } = usePageTransition();

  createEffect(() => setDisabled(!!pending()));

  return <Transition offset={isScrolled()} {...state()} />;
};
