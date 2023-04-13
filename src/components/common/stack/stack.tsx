import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal, For, onMount } from 'solid-js';

import styles from './stack.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { getRouteData, RoutesMetas } from '~/services';

const computeShift = (): number => {
  const navbar = document.querySelector('#navbar')?.clientHeight;
  const body = document.querySelector('body')?.clientHeight;
  const shift = navbar && body ? (navbar / body) * 2 * 100 : 40;
  return Math.ceil(shift);
};

const transformToCSSProperties = (transform: string, opacity = 1): JSX.CSSProperties => ({ transform, opacity });

type TransformOptions = { offset: number; opacity?: number; shift: number };
const offsetTransform = ({ offset, opacity, shift }: TransformOptions) =>
  transformToCSSProperties(`translate3d(0,${shift}%,-${offset * 100}px)`, opacity ?? (10 - offset) / 10);

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
      .slice(2),
  );
  const navigate = useNavigate();
  const [t] = useI18n();

  const [shift, setShift] = createSignal(40);

  onMount(() => setShift(computeShift()));

  createEffect<string>(previous => {
    const _overflow = document.body.style.overflow;
    if (props.open) document.body.style.overflow = 'hidden';
    else if (_overflow !== previous) document.body.style.overflow = previous ?? '';
    return _overflow;
  });

  return (
    <div class={styles.pages_stack} classList={{ [styles.pages_stack__open]: props.open }}>
      <For each={pages()}>
        {({ path, title }, index) => (
          <Box
            class={styles.page}
            classList={{ [styles.page__inactive]: true }}
            style={transform()({ shift: shift(), offset: 3 - index() / 2 })}
            onClick={() => navigate(path)}
          >
            <Box class={styles.page__title}>{t(title)}</Box>
          </Box>
        )}
      </For>
      <Box
        class={styles.page}
        classList={{ [styles.page__active]: true }}
        style={transform()({ offset: 2, opacity: 1, shift: shift() })}
        onClick={close}
      >
        {props.children}
      </Box>
    </div>
  );
};

export default Stack;
