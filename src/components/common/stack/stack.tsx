import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createMemo, createSignal, For, onMount } from 'solid-js';

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

const offsetTransform = (offset = 3, shift = computeShift()) =>
  transformToCSSProperties(`translate3d(0,${shift}%,-${offset * 100}px)`, (10 - offset) / 10);

const computeTransform = (open = false): ((offset?: number, shift?: number) => JSX.CSSProperties | undefined) =>
  open ? offsetTransform : () => undefined;

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

  return (
    <div class={styles.pages_stack} classList={{ [styles.pages_stack__open]: props.open }}>
      <For each={pages()}>
        {({ path, title }, index) => (
          <Box
            class={styles.page}
            classList={{ [styles.page__inactive]: true }}
            style={transform()(3 - index() / 2, shift())}
            onClick={() => navigate(path)}
          >
            {t(title)}
          </Box>
        )}
      </For>
      <Box class={styles.page} classList={{ [styles.page__active]: true }} style={transform()(2, shift())} onClick={close}>
        {props.children}
      </Box>
    </div>
  );
};

export default Stack;
