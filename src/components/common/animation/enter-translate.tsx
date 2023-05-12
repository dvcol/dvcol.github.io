import { Box } from '@suid/material';

import { createMemo, createSignal, onMount } from 'solid-js';

import type { ParentComponent } from 'solid-js';

export type Coordinate<T = number> = { x: T; y: T };
export type EnterTranslateProps = {
  from?: Coordinate;
  to?: Coordinate;
  disabled?: boolean;
  duration?: number;
  initialDelay?: number;
  initialState?: Coordinate;
  initialOpacity?: number;
};
export const EnterTranslate: ParentComponent<EnterTranslateProps> = props => {
  const [disabled, setDisabled] = createSignal(true);

  const from = createMemo<string>(() => `${props.from?.x ?? 0}% ${props.from?.y ?? 100}%`);
  const to = createMemo<string>(() => `${props.to?.x ?? 0}% ${props.to?.y ?? 0}%`);

  const translate = createMemo<string>(() => {
    if (props.disabled ?? disabled()) return props.initialState ? `${props.initialState?.x ?? 50}% ${props.initialState?.y ?? 50}%` : from();
    return to();
  });

  const opacity = createMemo<number>(() => {
    if (props.disabled ?? disabled()) return props.initialOpacity ?? 0;
    return 1;
  });

  onMount(() => {
    setTimeout(() => setDisabled(false), props.initialDelay);
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        opacity: opacity(),
        translate: translate(),
        transition: 'translate 1s, opacity 1s',
        willChange: 'translate',
      }}
    >
      {props.children}
    </Box>
  );
};

export default EnterTranslate;
