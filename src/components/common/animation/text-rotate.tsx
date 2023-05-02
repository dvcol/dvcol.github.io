import { Motion } from '@motionone/solid';
import { Box } from '@suid/material';

import { createMemo, For, Show } from 'solid-js';

import type { Component, JSX } from 'solid-js';

export type TextRotateProps = { value?: string | JSX.Element };
export const TextRotate: Component<TextRotateProps> = props => {
  const letters = createMemo(() => (typeof props.value === 'string' ? props.value?.trim().split('') ?? [] : undefined));
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        perspective: '2000px',
        perspectiveOrigin: 'center left',
        position: 'relative',
        whiteSpace: 'pre',
      }}
    >
      <Show when={letters()?.length} fallback={props.value}>
        <For each={letters()}>
          {(char, index) => (
            <Motion.span
              style={{ display: 'inline-block', 'transform-origin': 'left' }}
              animate={{
                opacity: [0, 1],
                transform: ['translate3d(0px,0px,-200px) rotateY(90deg)', 'translate3d(0px,0px,0px) rotateY(0deg)'],
                rotateY: ['-90deg', '0deg'],
              }}
              transition={{
                duration: 1,
                delay: 0.02 * index(),
              }}
            >
              {char}
            </Motion.span>
          )}
        </For>
      </Show>
    </Box>
  );
};

export default TextRotate;
