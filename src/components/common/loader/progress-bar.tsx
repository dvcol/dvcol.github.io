import { Box } from '@suid/material';

import { animate, scroll } from 'motion';

import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

import type { Accessor, Component } from 'solid-js';

export const ProgressBar: Component<{ container?: Accessor<HTMLElement | undefined> }> = props => {
  const [scrolled, setScrolled] = createSignal();

  const scrollListener = () => {
    if (!scrolled()) setScrolled(true);
  };

  onMount(() => {
    const container = props.container?.();
    if (container) container.addEventListener('scroll', scrollListener);
  });
  onCleanup(() => {
    const container = props.container?.();
    if (container) container.removeEventListener('scroll', scrollListener);
  });

  const [ref, setRef] = createSignal<HTMLDivElement>();

  createEffect(() => {
    const progress = ref();
    const container = props.container?.();
    if (progress && scrolled()) {
      scroll(animate(progress, { scaleX: [0, 1] }), { container, axis: 'y' });
    }
  });

  return (
    <Box
      ref={setRef}
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '0.125rem',
        background: 'white',
        transform: 'scaleX(0)',
        zIndex: 9999,
      }}
    />
  );
};
