import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './spinner.module.scss';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { Component } from 'solid-js';

const defaultSize = 5;
export type SpinnerProps = { color?: string; accent?: string; size?: number; sx?: BoxProps['sx']; center?: boolean; debounce?: number };
export const Spinner: Component<SpinnerProps> = props => {
  const center = createMemo<Partial<BoxProps['sx']>>(() =>
    props.center
      ? {
          position: 'absolute',
          top: `calc(50% - ${props.size / 2 ?? defaultSize / 2}em)`,
          left: `calc(50% - ${props.size / 2 ?? defaultSize / 2}em)`,
        }
      : {},
  );

  const [debounced, setDebounced] = createSignal(false);
  let timeout: NodeJS.Timeout;
  onMount(() => {
    if (props.debounce) {
      timeout = setTimeout(() => setDebounced(true), props.debounce);
      return;
    }
    setDebounced(true);
  });

  onCleanup(() => clearTimeout(timeout));

  return (
    <Box
      component="span"
      class={styles.spinner}
      sx={{
        opacity: debounced() ? 1 : 0,
        scale: debounced() ? '1' : '0.8',
        willChange: 'opacity, scale',
        transition: 'opacity 1s, scale 2s',
        width: `${props.size ?? defaultSize}em`,
        height: `${props.size ?? defaultSize}em`,
        color: props.color ?? 'white',
        '&::after': {
          color: props.accent ?? '#90caf9',
        },
        ...center(),
        ...props.sx,
      }}
    />
  );
};

export default Spinner;
