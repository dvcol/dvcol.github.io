import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount, Show } from 'solid-js';

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
    <Show when={debounced()}>
      <Box
        component="span"
        class={styles.spinner}
        sx={{
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
    </Show>
  );
};

export default Spinner;
