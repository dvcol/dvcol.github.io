import { createSignal, onCleanup } from 'solid-js';

export const useWatchResize = () => {
  const [resize, seResize] = createSignal();
  const resizeListener = (event: Event) => seResize(event);
  window.addEventListener('resize', resizeListener);
  onCleanup(() => window.removeEventListener('resize', resizeListener));
  return {
    resize,
  };
};
