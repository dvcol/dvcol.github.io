import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './background.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { usePageTransition, useRouteData } from '~/services';
import { AnimationDuration, Colors } from '~/themes';

export type BackgroundProps = { color?: JSX.CSSProperties['background-color']; position?: { left?: number; top?: number } };
export const Background: ParentComponent<BackgroundProps> = props => {
  const { previous } = useRouteData();
  const { pending } = usePageTransition();

  const [clipPath, setClipPath] = createSignal<number>(pending() ? 200 : 0);

  const state = createMemo(() => {
    const top = props.position?.top ? `${props.position?.top}px` : '50%';
    const left = props.position?.left ? `${props.position?.left}px` : '50%';

    return {
      clipPath: `circle(${clipPath()}% at ${left} ${top})`,
    };
  });

  let timeout: NodeJS.Timeout;
  onMount(() => {
    if (!pending()) {
      timeout = setTimeout(() => setClipPath(200), 100);
    }
  });

  onCleanup(() => {
    clearTimeout(timeout);
  });

  return (
    <Box class={styles.background_container} sx={{ background: previous()?.bgColor ?? Colors.Theme }}>
      <Box
        class={styles.background}
        sx={{
          background: props.color,
          transition: `clip-path ${AnimationDuration.PageBackground}ms ease-out`,
          ...state(),
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
