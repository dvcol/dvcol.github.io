import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal, onMount } from 'solid-js';

import styles from './transition.module.scss';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { Component, JSX } from 'solid-js';

import { computeStepDuration, zIndex } from '~/themes';

export type BackgroundColors = JSX.CSSProperties['background-color'] | BoxProps['sx'];
export type TransitionProps = {
  open?: boolean;
  fade?: boolean;
  offset?: number;
  position?: { left?: number; top?: number };
  colors?: BackgroundColors[];
};
export const Transition: Component<TransitionProps> = props => {
  const [clipPath, setClipPath] = createSignal<number>(0);
  onMount(() => props.open && setClipPath(100));

  createEffect(() => setClipPath(props.open ? 100 : 0));

  const state = createMemo(() => (index: number) => {
    const _state = {
      top: props.position?.top ? `calc(${props.position?.top}px - 100dvh)` : '-50dvh',
      left: props.position?.left ? `calc(${props.position?.left}px - 100dvw)` : '-50dvw',
      clipPath: `circle(${clipPath()}%)`,
      transitionDuration: `${computeStepDuration(index)}ms`,
      zIndex: props.fade ? zIndex.Default : `${zIndex.Layer3 + 1 + index}`,
    };
    const background = props.colors?.[index];

    if (typeof background === 'string') return { ..._state, background };
    return { ..._state, ...background };
  });

  return (
    <Box
      class={styles.transition_container}
      sx={{
        top: `${props.offset ?? 0}px`,
        zIndex: props.fade ? zIndex.Default : undefined,
        pointerEvents: props.open ? 'all' : undefined,
      }}
    >
      <Box class={styles.transition} sx={state()(0)} />
      <Box class={styles.transition} sx={state()(1)} />
      <Box class={styles.transition} sx={state()(2)} />
    </Box>
  );
};
