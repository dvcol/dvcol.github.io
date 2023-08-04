import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './background.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { usePageTransition, useRouteData } from '~/services';
import { Colors } from '~/themes';

export type BackgroundProps = { color?: JSX.CSSProperties['background-color']; position?: { left?: number; top?: number } };
export const Background: ParentComponent<BackgroundProps> = props => {
  const { previous, active } = useRouteData();

  const [clipPath, setClipPath] = createSignal<number>(previous() ? 0 : 100);
  onMount(() => setClipPath(100));

  const { startEvent, setStartEvent } = usePageTransition();

  const state = createMemo(() => {
    const _event = startEvent();
    const _top = props.position?.top ?? _event?.clientY;
    const _left = props.position?.left ?? _event?.clientX;

    return {
      top: _top ? `calc(${_top}px - 100dvh)` : '-50dvh',
      left: _left ? `calc(${_left}px - 100dvw)` : '-50dvw',
      clipPath: `circle(${clipPath()}%)`,
    };
  });

  onCleanup(() => setStartEvent());

  return (
    <Box class={styles.background_container} sx={{ backgroundColor: previous()?.bgColor ?? Colors.theme }}>
      <Box
        class={styles.background}
        sx={{ backgroundColor: props.color, transition: `clip-path ${active()?.transition ?? 2}s ease-out`, ...state() }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
