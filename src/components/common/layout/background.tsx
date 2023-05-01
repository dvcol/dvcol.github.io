import { Motion, Presence } from '@motionone/solid';
import { Box } from '@suid/material';

import { Show } from 'solid-js';

import styles from './background.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { useRouteData } from '~/services';

export type BackgroundProps = { show?: boolean; color?: JSX.CSSProperties['background-color'] };
export const Background: ParentComponent<BackgroundProps> = props => {
  const { previous } = useRouteData();

  return (
    <Box class={styles.background_container} sx={{ backgroundColor: previous()?.bgColor ?? '#2a2b30' }}>
      <Presence exitBeforeEnter>
        <Show when={props.show ?? true}>
          <Motion
            class={styles.background}
            style={{ 'background-color': props.color, 'border-radius': '100%' }}
            animate={{ scale: [0.25, 2] }}
            exit={{ scale: [2, 0] }}
            transition={{ scale: { duration: 2 } }}
          >
            {props.children}
          </Motion>
        </Show>
      </Presence>
    </Box>
  );
};
