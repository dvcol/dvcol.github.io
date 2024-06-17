import { createEffect, createSignal, onCleanup } from 'solid-js';

import type { Signal } from 'solid-js/types/reactive/signal';

export const useWatchResize = () => {
  const [resize, seResize] = createSignal();
  const resizeListener = (event: Event) => seResize(event);
  window.addEventListener('resize', resizeListener);
  onCleanup(() => window.removeEventListener('resize', resizeListener));
  return {
    resize,
  };
};

export const useThemeColor = (): Signal<string | undefined> => {
  const [themeColor, setThemeColor] = createSignal<string>();

  createEffect(() => {
    const metaTag = document.querySelector('#meta-theme-color');
    const newValue = themeColor();
    if (metaTag && newValue) metaTag?.setAttribute('content', newValue);
  });

  return [themeColor, setThemeColor];
};
