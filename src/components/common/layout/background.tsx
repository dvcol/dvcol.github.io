import { Box } from '@suid/material';

import { createSignal, onMount } from 'solid-js';

import styles from './background.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { useRouteData } from '~/services';
import { Colors } from '~/themes';

export type BackgroundProps = { show?: boolean; color?: JSX.CSSProperties['background-color'] };
export const Background: ParentComponent<BackgroundProps> = props => {
  const { previous, active } = useRouteData();

  const [clipPath, setClipPath] = createSignal<number>(previous() ? 0 : 100);
  onMount(() => setClipPath(100));

  return (
    <Box class={styles.background_container} sx={{ backgroundColor: previous()?.bgColor ?? Colors.theme }}>
      <Box
        class={styles.background}
        sx={{ backgroundColor: props.color, transition: `clip-path ${active()?.transition ?? 2}s ease-out`, clipPath: `circle(${clipPath()}%)` }}
      >
        {props.children}
      </Box>
    </Box>
  );
};
