import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createEffect, createMemo, For } from 'solid-js';

import styles from './stack.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import type { OnTriggerCallback } from '~/components/common/utils/over-scroll-handler';

import { useOverScrollHandler } from '~/components/common/utils/over-scroll-handler';
import { getRouteData, RoutesMetas } from '~/services';

type TransformOptions = { offset?: number; opacity?: number };
const offsetTransform = (options: TransformOptions = {}): JSX.CSSProperties => {
  const { offset, opacity: _opacity } = { offset: 2, ...options };
  const transform = `translate3d(0,15%,-${offset * 100}px)`;
  const opacity = _opacity ?? (10 - offset) / 10;
  return { transform, opacity };
};

const computeTransform = (open = false): ((options: TransformOptions) => JSX.CSSProperties | undefined) => (open ? offsetTransform : () => undefined);

export const Stack: ParentComponent<{ open?: boolean; onClick?: (_open?: boolean) => void }> = props => {
  const routes = [...RoutesMetas];
  const close = () => props?.onClick?.(false);

  const transform = createMemo(() => computeTransform(props.open), computeTransform(false));
  const active = getRouteData;
  const pages = createMemo(() =>
    routes
      .sort((a, b) => {
        if (a.name === active()?.name) return 1;
        if (b.name === active()?.name) return -1;
        return 0;
      })
      .filter(page => page.name !== active()?.name)
      .slice(-2),
  );
  const navigate = useNavigate();
  const [t] = useI18n();

  createEffect<string>(previous => {
    const _overflow = document.body.style.overflow;
    if (props.open) document.body.style.overflow = 'hidden';
    else if (_overflow !== previous) document.body.style.overflow = previous ?? '';
    return _overflow;
  });

  const stackTransform = createMemo<JSX.CSSProperties>(() => {
    const height = document.querySelector('#navbar')?.clientHeight;
    return { transform: `translateY(${props.open ? height : 0}px)` };
  });

  const onTrigger: OnTriggerCallback = () => {
    props?.onClick?.(true);
  };

  const { setContainerRef, handlers } = useOverScrollHandler({ onTrigger });

  return (
    <div class={styles.pages_stack} classList={{ [styles.pages_stack__open]: props.open }} style={stackTransform()}>
      <For each={pages()}>
        {({ path, title }, index) => (
          <Box
            component={'article'}
            class={styles.page}
            classList={{ [styles.page__inactive]: true }}
            style={transform()({ offset: 3 - index() / 2 })}
            onClick={() => navigate(path)}
          >
            <Box class={styles.page__title}>{t(title)}</Box>
          </Box>
        )}
      </For>
      <Box
        ref={setContainerRef}
        {...handlers}
        component={'article'}
        class={styles.page}
        classList={{ [styles.page__active]: true }}
        style={transform()({ offset: 2, opacity: 1 })}
        onClick={close}
      >
        {props.children}
      </Box>
    </div>
  );
};

export default Stack;
