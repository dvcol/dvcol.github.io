import { Box } from '@suid/material';

import { splitProps } from 'solid-js';

import styles from './section.module.scss';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { ParentComponent } from 'solid-js';

export const Section: ParentComponent<Omit<BoxProps, 'class'>> = props => {
  const [{ children }, _props] = splitProps(props, ['children']);

  return (
    <Box class={styles.section_container} {..._props}>
      {children}
    </Box>
  );
};
