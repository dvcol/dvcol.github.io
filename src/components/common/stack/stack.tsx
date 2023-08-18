import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';

import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal, For, onCleanup } from 'solid-js';

import { StackPage } from './stack-page';
import styles from './stack.module.scss';

import type { JSX, ParentComponent } from 'solid-js';

import { StackPageTransition } from '~/components/common/stack/stack-page-transition';
import { RoutesMetas, useNavbar, useRouteData } from '~/services';
import { Colors } from '~/themes';

type TransformOptions = { offset?: number; brightness?: number } & Omit<JSX.CSSProperties, 'offset' | 'filter' | 'transform'>;
const offsetTransform = (options: TransformOptions = {}, _styles?: JSX.CSSProperties): JSX.CSSProperties => {
  const { offset, brightness: _brightness, ...props } = { offset: 2, ...options };
  const transform = `translate3d(0,15%,-${offset * 100}px)`;
  const filter = `brightness(${_brightness ?? 1 - (10 - offset) / 100})`;
  return { transform, filter, ...props, ..._styles };
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

  const [background, setBackground] = createSignal<string>();

  let backgroundTimeout: NodeJS.Timeout;
  createEffect(() => {
    clearTimeout(backgroundTimeout);

    const activeDelay = active()?.transition;
    const activeBgColor = active()?.bgColor;

    if (activeDelay && activeBgColor) {
      backgroundTimeout = setTimeout(() => setBackground(activeBgColor), activeDelay / 2);
      return;
    }
    if (activeBgColor) return setBackground(activeBgColor);
    return setBackground(Colors.theme);
  });

  createEffect(() => {
    const themeColor = document.querySelector('#meta-theme-color');
    const newValue = background();
    if (themeColor && newValue) themeColor?.setAttribute('content', newValue);
  });

  window.addEventListener('hashchange', listener);
  onCleanup(() => {
    clearTimeout(backgroundTimeout);
    window.removeEventListener('hashchange', listener);
  });

  return (
    <div class={styles.pages_stack} classList={{ [styles.pages_stack__open]: isOpen() }} style={stackTransform()}>
      <For each={pages()}>
        {({ path, name, title, color, bgColor }, index) => (
          <StackPage
            id={`stack-page-${name}`}
            class={styles.page}
            style={{ ...transform()({ offset: 3 - index() / 2 }), color, background: bgColor }}
            onClick={() => navigate(path)}
          >
            <Box class={styles.page__title}>{t(title)}</Box>
          </StackPage>
        )}
      </For>
      <StackPage
        id={`stack-page-active`}
        active={active()}
        open={showOpen()}
        class={styles.page}
        style={transform()({ offset: 2, filter: 'none' }, { color: active()?.color, background: background() })}
        onClick={() => close()}
      >
        <StackPageTransition />
        {props.children}
      </StackPage>
    </div>
  );
};

export default Stack;
