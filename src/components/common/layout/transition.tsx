import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal, onMount } from 'solid-js';

import styles from './transition.module.scss';

import type { Component, JSX } from 'solid-js';

import { computeStepDuration, zIndex } from '~/themes';

export type TransitionProps = {
  open?: boolean;
  position?: { left?: number; top?: number };
  colors?: JSX.CSSProperties['background-color'][3];
};
export const Transition: Component<TransitionProps> = props => {
  const [clipPath, setClipPath] = createSignal<number>(0);
  onMount(() => props.open && setClipPath(100));

  createEffect(() => setClipPath(props.open ? 100 : 0));

  createEffect(() => console.info('colors', { ...props }, clipPath()));

  const state = createMemo(() => (index: number) => {
    return {
      top: props.position?.top ? `calc(${props.position?.top}px - 100dvh)` : '-50dvh',
      left: props.position?.left ? `calc(${props.position?.left}px - 100dvw)` : '-50dvw',
      clipPath: `circle(${clipPath()}%)`,
      transitionDuration: `${computeStepDuration(index)}ms`,
      zIndex: `${zIndex.Layer3 + 1 + index}`,
      backgroundColor: props.colors?.[index],
    };
  });

  return (
    <Box class={styles.transition_container}>
      <Box class={styles.transition} sx={state()(0)} />
      <Box class={styles.transition} sx={state()(1)} />
      <Box class={styles.transition} sx={state()(2)} />
    </Box>
  );
};
