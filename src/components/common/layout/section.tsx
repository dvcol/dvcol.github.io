import { Box } from '@suid/material';

import styles from './section.module.scss';

import type { ParentComponent } from 'solid-js';

export const Section: ParentComponent = props => {
  return <Box class={styles.section_container}>{props.children}</Box>;
};
