import { Box } from '@suid/material';

import { createMemo } from 'solid-js';

import styles from './stack-page.module.scss';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { JSX, ParentComponent } from 'solid-js';

import type { OnTriggerCallback } from '~/components';

import { useOverScrollHandler } from '~/components';
import { useNavbar } from '~/services';

type StackPageProps = {
  active?: boolean;
  class?: string;
  style?: JSX.CSSProperties;
  onClick?: () => void;
  sx?: BoxProps['sx'];
};
export const StackPage: ParentComponent<StackPageProps> = props => {
  const { isOpen, open } = useNavbar();
  const onTrigger: OnTriggerCallback = () => open();

  const { setContainerRef, progress } = useOverScrollHandler({ onTrigger, threshold: 84 });

  const scale = createMemo(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const hDiff = (height - width) / (width * 100);
    const wDiff = (width - height) / (height * 100);

    const _progress = progress();
    const _scale = _progress > 0.025 ? 0.025 : _progress;
    const _scaleX = 1 - (_scale + hDiff);
    const _scaleY = 1 - (_scale + wDiff);
    return _progress ? `scale(${_scaleX},${_scaleY})` : undefined;
  });

  return (
    <Box
      ref={setContainerRef}
      component={'article'}
      class={[props?.class, styles.stack_page].join(' ')}
      classList={{
        [styles.pages_stack__open]: isOpen(),
        [styles.stack_page__active]: props.active,
        [styles.stack_page__inactive]: !props.active,
      }}
      style={{ ...props.style, transform: props.style.transform ?? scale() }}
      onClick={props.onClick}
      sx={props.sx}
    >
      {props.children}
    </Box>
  );
};

export default StackPage;
