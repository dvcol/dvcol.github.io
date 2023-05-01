import { Box } from '@suid/material';

import styles from './spinner.module.scss';

import type BoxProps from '@suid/material/Box/BoxProps';

import type { Component } from 'solid-js';

export const Spinner: Component<{ color?: string; accent?: string; size?: string; sx?: BoxProps['sx'] }> = props => {
  return (
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
        ...props.sx,
      }}
    />
  );
};

export default Spinner;
