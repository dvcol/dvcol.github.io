import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './background.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { usePageTransition, useRouteData } from '~/services';
import { AnimationDuration, Colors } from '~/themes';

export type BackgroundProps = { color?: JSX.CSSProperties['background-color']; position?: { left?: number; top?: number } };
export const Background: ParentComponent<BackgroundProps> = props => {
  const { previous } = useRouteData();
  const { startEvent, setStartEvent } = usePageTransition();

  const [clipPath, setClipPath] = createSignal<number>(startEvent() ? 200 : 0);
  onMount(() => setClipPath(200));

  const state = createMemo(() => {
    const top = props.position?.top ? `${props.position?.top}px` : '50%';
    const left = props.position?.left ? `${props.position?.left}px` : '50%';

    return {
      clipPath: `circle(${clipPath()}% at ${left} ${top})`,
    };
  });

  onCleanup(() => setStartEvent());

  return (
    <Box class={styles.background_container} sx={{ backgroundColor: previous()?.bgColor ?? Colors.theme }}>
      <Box
        class={styles.background}
        sx={{
          backgroundColor: props.color,
          transition: `clip-path ${AnimationDuration.PageBackground}ms ease-out`,
          ...state(),
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
