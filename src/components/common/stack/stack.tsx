import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createEffect, createMemo, For, onCleanup } from 'solid-js';

import { StackPage } from './stack-page';
import styles from './stack.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { RoutesMetas, useNavbar, useRouteData } from '~/services';

type TransformOptions = { offset?: number; opacity?: number } & Omit<JSX.CSSProperties, 'offset' | 'opacity' | 'transform'>;
const offsetTransform = (options: TransformOptions = {}, _styles?: JSX.CSSProperties): JSX.CSSProperties => {
  const { offset, opacity: _opacity, ...props } = { offset: 2, ...options };
  const transform = `translate3d(0,15%,-${offset * 100}px)`;
  const opacity = _opacity ?? (10 - offset) / 10;
  return { transform, opacity, ...props, ..._styles };
};

const computeTransform = (open = false): ((options: TransformOptions, _styles?: JSX.CSSProperties) => JSX.CSSProperties | undefined) =>
  open ? offsetTransform : (_, _styles) => _styles;
export const Stack: ParentComponent = props => {
  const routes = [...RoutesMetas];

  const { isOpen, close } = useNavbar();

  const transform = createMemo(() => computeTransform(isOpen()), computeTransform(false));
  const { active } = useRouteData();
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
    if (isOpen()) {
      document.body.style.overflow = 'hidden';
    } else if (_overflow !== previous) {
      setTimeout(() => {
        document.body.style.overflow = previous ?? '';
      }, 500);
    }
    return _overflow;
  });

  const stackTransform = createMemo<JSX.CSSProperties>(() => {
    const height = document.querySelector('#navbar')?.clientHeight;
    return { transform: `translateY(${isOpen() ? height : 0}px)` };
  });

  const listener = (e: HashChangeEvent) => {
    const oldHash = e.oldURL.split('?', 1)?.[0];
    const newHash = e.newURL.split('?', 1)?.[0];
    if (oldHash !== newHash) close();
  };

  window.addEventListener('hashchange', listener);
  onCleanup(() => window.removeEventListener('hashchange', listener));

  return (
    <div class={styles.pages_stack} classList={{ [styles.pages_stack__open]: isOpen() }} style={stackTransform()}>
      <For each={pages()}>
        {({ path, title, color, bgColor }, index) => (
          <StackPage
            class={styles.page}
            style={{ ...transform()({ offset: 3 - index() / 2 }), color, 'background-color': bgColor }}
            onClick={() => navigate(path)}
          >
            <Box class={styles.page__title}>{t(title)}</Box>
          </StackPage>
        )}
      </For>
      <StackPage
        active={active()}
        open={isOpen()}
        class={styles.page}
        style={transform()({ offset: 2, opacity: 1 }, { color: active()?.color, 'background-color': active()?.bgColor })}
        onClick={() => close()}
      >
        {props.children}
      </StackPage>
    </div>
  );
};

export default Stack;
