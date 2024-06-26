import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { ParentComponent } from 'solid-js';

export type HoverScaleProps = {
  from?: number;
  to?: number;
  duration?: number;
  initialDelay?: number;
  disabled?: boolean;
  initialScale?: number;
  boxProps?: BoxProps;
};
export const HoverScale: ParentComponent<HoverScaleProps> = props => {
  const [disabled, setDisabled] = createSignal(!!props.initialDelay);
  const [hover, setHover] = createSignal(false);

  const from = createMemo<number>(() => props.from ?? 0.9);
  const to = createMemo<number>(() => props.to ?? 1);

  const scale = createMemo<number>(() => {
    if (props.disabled ?? disabled()) return props.initialScale ?? from();
    return hover() ? to() : from();
  });

  let timeout: NodeJS.Timeout;
  onMount(() => {
    if (props.initialDelay) timeout = setTimeout(() => setDisabled(false), props.initialDelay);
  });
  onCleanup(() => clearTimeout(timeout));
  return (
    <Box
      {...props.boxProps}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        scale: `${scale()}`,
        transition: 'scale 1s',
        willChange: 'scale',
        ...props.boxProps?.sx,
      }}
      onMouseEnter={e => {
        setHover(true);
        props.boxProps?.onMouseEnter?.(e);
      }}
      onMouseLeave={e => {
        setHover(false);
        props.boxProps?.onMouseLeave?.(e);
      }}
    >
      {props.children}
    </Box>
  );
};

export default HoverScale;
