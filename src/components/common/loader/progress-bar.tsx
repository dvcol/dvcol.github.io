import { Box } from '@suid/material';

import { animate, scroll } from 'motion';

import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { Accessor, Component } from 'solid-js';

import { Colors } from '~/themes';

export const ProgressBar: Component<{ container?: Accessor<HTMLElement | undefined>; boxProps?: BoxProps }> = props => {
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
      scroll(animate(progress, { scaleX: [0, 1] }), { container, axis: 'y', smooth: 500 });
    }
  });

  return (
    <Box
      ref={setRef}
      id="progress-bar"
      {...props.boxProps}
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        height: '0.125rem',
        background: Colors.accent,
        transform: 'scaleX(0)',
        willChange: 'transform',
        zIndex: 9999,
        ...props.boxProps?.sx,
      }}
    />
  );
};
