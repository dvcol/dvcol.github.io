import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createEffect, createMemo, For } from 'solid-js';

import { StackPage } from './stack-page';
import styles from './stack.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { getRouteData, RoutesMetas } from '~/services';

type TransformOptions = { offset?: number; opacity?: number } & Omit<JSX.CSSProperties, 'offset' | 'opacity' | 'transform'>;
const offsetTransform = (options: TransformOptions = {}): JSX.CSSProperties => {
  const { offset, opacity: _opacity, ...props } = { offset: 2, ...options };
  const transform = `translate3d(0,15%,-${offset * 100}px)`;
  const opacity = _opacity ?? (10 - offset) / 10;
  return { transform, opacity, ...props };
};

const computeTransform = (open = false): ((options: TransformOptions, _styles?: JSX.CSSProperties) => JSX.CSSProperties | undefined) =>
  open ? offsetTransform : (_, _styles) => _styles;

type StackProps = { open?: boolean; onClick?: (_open?: boolean) => void };
export const Stack: ParentComponent<StackProps> = props => {
  const routes = [...RoutesMetas];

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
    if (props.open) {
      document.body.style.overflow = 'hidden';
    } else if (_overflow !== previous) {
      setTimeout(() => {
        document.body.style.overflow = previous ?? '';
      }, 450);
    }
    return _overflow;
  });

  const stackTransform = createMemo<JSX.CSSProperties>(() => {
    const height = document.querySelector('#navbar')?.clientHeight;
    return { transform: `translateY(${props.open ? height : 0}px)` };
  });

  return (
    <div class={styles.pages_stack} classList={{ [styles.pages_stack__open]: props.open }} style={stackTransform()}>
      <For each={pages()}>
        {({ path, title, color, bgColor }, index) => (
          <StackPage
            open={props.open}
            class={styles.page}
            style={{ ...transform()({ offset: 3 - index() / 2 }), color, 'background-color': bgColor }}
            onClick={() => navigate(path)}
          >
            <Box class={styles.page__title}>{t(title)}</Box>
          </StackPage>
        )}
      </For>
      <StackPage active={true} open={props.open} class={styles.page} style={transform()({ offset: 2, opacity: 1 })} onClick={props.onClick}>
        {props.children}
      </StackPage>
    </div>
  );
};

export default Stack;
