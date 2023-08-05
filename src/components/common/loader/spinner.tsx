import { Box } from '@suid/material';

import { createMemo, createSignal, onMount, Show } from 'solid-js';

import styles from './spinner.module.scss';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { Component } from 'solid-js';

export type SpinnerProps = { color?: string; accent?: string; size?: string; sx?: BoxProps['sx']; center?: boolean; debounce?: number };
export const Spinner: Component<SpinnerProps> = props => {
  const center = createMemo<Partial<BoxProps['sx']>>(() =>
    props.center
      ? {
          position: 'absolute',
          top: 'calc(50% - 5rem)',
          left: 'calc(50% - 5rem)',
        }
      : {},
  );

  const [debounced, setDebounced] = createSignal(false);
  onMount(() => {
    if (props.debounce) return setTimeout(() => setDebounced(true), props.debounce);
    setDebounced(true);
  });

  return (
    <Show when={debounced()}>
      <Box
        component="span"
        class={styles.spinner}
        sx={{
          width: props.size,
          height: props.size,
          color: props.color ?? 'white',
          '&::after': {
            color: props.accent ?? '#90caf9',
          },
          ...center(),
          ...props.sx,
        }}
      />
    </Show>
  );
};

export default Spinner;
