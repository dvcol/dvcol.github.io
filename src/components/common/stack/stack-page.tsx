import { useLocation } from '@solidjs/router';
import { Box } from '@suid/material';

import { createEffect, createMemo, onCleanup, Show } from 'solid-js';

import styles from './stack-page.module.scss';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { Accessor, JSX, ParentComponent } from 'solid-js';

import type { OnTriggerCallback } from '~/components/common/utils/';

import type { RouteMeta } from '~/services';

import { ProgressBar } from '~/components/common/loader/progress-bar';
import { useOverScrollHandler } from '~/components/common/utils';
import { useNavbar } from '~/services';
import { Colors } from '~/themes';

type StackPageProps = {
  id?: string;
  active?: RouteMeta;
  open?: boolean;
  class?: string;
  style?: JSX.CSSProperties;
  onClick?: () => void;
  sx?: BoxProps['sx'];
};
export const StackPage: ParentComponent<StackPageProps> = props => {
  const { isOpen, open, setScrolled, isScrollable, inFlight, setCurrentPage } = useNavbar();
  const onTrigger: OnTriggerCallback = () => open();

  const { containerRef, setContainerRef, progress } = useOverScrollHandler({ onTrigger, threshold: 84 });

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

  const scrollListener = (e: Event) => setScrolled((e.target as HTMLElement).scrollTop);

  createEffect(() => {
    const container = containerRef();
    if (props.active && container) {
      container.addEventListener('scroll', scrollListener);
      setCurrentPage(container);
    }
  });

  const location = useLocation();
  createEffect(() => {
    if (location && props.active && containerRef()?.scrollTop) {
      containerRef()?.scrollTo({ top: 0, left: 0 });
    }
  });

  const showProgress: Accessor<boolean> = createMemo(() => !!(props.active && !isOpen() && isScrollable() && !inFlight()));
  const accentColor: Accessor<boolean> = createMemo(() => props.active?.accentColor ?? props.active?.color ?? Colors.Accent);

  onCleanup(() => containerRef()?.removeEventListener('scroll', scrollListener));

  return (
    <>
      <Show when={showProgress()}>
        <ProgressBar
          container={containerRef}
          boxProps={{ sx: { background: accentColor(), transition: 'background-color 0.5s', willChange: 'background-color' } }}
        />
      </Show>
      <Box
        ref={setContainerRef}
        component={'article'}
        id={props.id}
        class={[props?.class, styles.stack_page].join(' ')}
        classList={{
          [styles.pages_stack__open]: isOpen(),
          [styles.stack_page__active]: !!props.active,
          [styles.stack_page__inactive]: !props.active,
        }}
        style={{
          ...props.style,
          transform: props.style?.transform ?? scale(),
          overflow: isScrollable() ? 'auto' : 'hidden',
        }}
        onClick={props.onClick}
        sx={props.sx}
      >
        {props.children}
      </Box>
    </>
  );
};

export default StackPage;
