import { Motion, Presence } from '@motionone/solid';

import { Box } from '@suid/material';

import { Show } from 'solid-js';

import styles from './background.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

type BackgroundProps = { show?: boolean; color?: JSX.CSSProperties['background-color'] };
export const Background: ParentComponent<BackgroundProps> = props => {
  return (
    <Box class={styles.background_container}>
      <Presence exitBeforeEnter>
        <Show when={props.show ?? true}>
          <Motion
            class={styles.background}
            style={{ 'background-color': props.color }}
            initial={{ scale: 0, position: 'absolute', top: '-50%' }}
            animate={{ scale: 2, borderRadius: '50%' }}
            exit={{ scale: 0 }}
            transition={{ scale: { duration: 2 } }}
          >
            {props.children}
          </Motion>
        </Show>
      </Presence>
    </Box>
  );
};
