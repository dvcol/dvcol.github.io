import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal, onMount } from 'solid-js';

import styles from './transition.module.scss';

import type { JSX, Component } from 'solid-js';

export type TransitionProps = {
  open?: boolean;
  position?: { left?: number; top?: number };
  color?: JSX.CSSProperties['background-color'];
  endColor?: JSX.CSSProperties['background-color'];
};
export const Transition: Component<TransitionProps> = props => {
  const [clipPath, setClipPath] = createSignal<number>(0);
  onMount(() => props.open && setClipPath(100));

  createEffect(() => setClipPath(props.open ? 100 : 0));

  const state = createMemo(() => ({
    top: props.position?.top ? `calc(${props.position?.top}px - 100dvh)` : 0,
    left: props.position?.left ? `calc(${props.position?.left}px - 100dvw)` : 0,
    clipPath: `circle(${clipPath()}%)`,
  }));
  return (
    <Box class={styles.transition_container}>
      <Box
        class={styles.transition}
        sx={{
          backgroundColor: props.color,
          ...state(),
        }}
      />
      <Box class={styles.transition_end} sx={{ backgroundColor: props.endColor, ...state() }} />
    </Box>
  );
};
