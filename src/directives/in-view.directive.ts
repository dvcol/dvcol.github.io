import { createSignal, onCleanup } from 'solid-js';

export type MarginOptions = {
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
};

export type InViewOptions = {
  margin?: MarginOptions;
  options?: IntersectionObserverInit;
};

export type InViewEvent = { entry: IntersectionObserverEntry; count: number };

export const handleIntersect = () => {
  const [count, setCount] = createSignal(0);
  return {
    count,
    handler: (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const eventName = entry.isIntersecting ? 'enter' : 'leave';
        entry.target.dispatchEvent(new CustomEvent<InViewEvent>(eventName, { detail: { entry, count: count() } }));
        if (eventName === 'enter') setCount(prev => prev + 1);
      });
    },
  };
};

export const parseOptions = (init: IntersectionObserverInit = {}, { right, left, top, bottom }: MarginOptions = {}) => {
  let rootMargin: string | undefined;
  if (!init.rootMargin && (right || left || top || bottom)) {
    const marginRight = right ? right * -1 : 0;
    const marginLeft = left ? left * -1 : 0;
    const marginTop = top ? top * -1 : 0;
    const marginBottom = bottom ? bottom * -1 : 0;
    rootMargin = `${marginTop}px ${marginRight}px ${marginBottom}px ${marginLeft}px`;
  }
  return { rootMargin, ...init };
};

export const inViewDirective = (el: Element, { options, margin }: InViewOptions = {}) => {
  const { handler } = handleIntersect();
  const observer = new IntersectionObserver(handler, parseOptions(options, margin));
  observer.observe(el);
  onCleanup(() => observer.disconnect());
};
