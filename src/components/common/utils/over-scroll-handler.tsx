import { createEffect, createMemo, createSignal, onCleanup } from 'solid-js';

import type { Accessor } from 'solid-js';

export type WheelEventHandler = (e: WheelEvent) => void;
export type TouchEventHandler = (e: TouchEvent) => void;
export type OnTriggerCallback = (state: State) => void;

export type State = { start: number; offset: number; progress: number };
export type Options = {
  onTrigger?: OnTriggerCallback;
  disabled?: Accessor<boolean>;
  threshold?: number;
  debounce?: number;
};
export const useOverScrollHandler = (options: Options) => {
  const { onTrigger, disabled, threshold, debounce } = { threshold: 100, debounce: 100, ...options };

  const [containerRef, setContainerRef] = createSignal<HTMLDivElement>();

  const [triggered, setTriggered] = createSignal(false);
  const [start, setStart] = createSignal(0);
  const [offset, setOffset] = createSignal(0);
  const progress = createMemo(() => offset() / threshold);

  const clearOffset = () => {
    setStart(0);
    setOffset(0);
    setTriggered(false);
  };

  const [timeout, changeTimeout] = createSignal<NodeJS.Timeout>();
  const resetTimeout = (time = 100) => {
    if (timeout()) clearTimeout(timeout());
    changeTimeout(
      setTimeout(() => {
        clearOffset();
      }, time),
    );
  };

  const isExcluded = (el: EventTarget | null) => {
    if (el instanceof Element) return el.getAttribute('data-over-scroll') === 'false';
    return false;
  };

  const onWheel: WheelEventHandler = e => {
    if (disabled?.()) return clearOffset();
    if (isExcluded(e.target)) return clearOffset();
    const scrollTop = containerRef()?.scrollTop;
    // if we are not a scroll top, reset timer and set start
    if (scrollTop !== undefined && scrollTop !== 0) {
      setStart(scrollTop);
      return resetTimeout();
    }
    // If we have start reset timer to prevent inertial scroll
    if (start()) return resetTimeout();

    if (Math.abs(e.deltaX) > 10) return clearOffset(); // side scrolling
    if (e.deltaY >= 0) return clearOffset(); // scrolling up
    if (e.ctrlKey) return clearOffset(); // pinch/zoom

    // If progress and not refreshed yet, emit refresh
    if (progress() >= 1 && !triggered()) {
      onTrigger?.({ start: start(), offset: offset(), progress: progress() });
      setTriggered(true);
      return resetTimeout(debounce);
    }
    // else update the offset
    if (!triggered()) {
      setOffset(_offset => _offset + Math.abs(e.deltaY / 3));
    }

    resetTimeout();
  };

  const onTouchStart: TouchEventHandler = e => {
    if (disabled?.()) return clearOffset();
    setTriggered(false);
    setStart(e.touches[0].screenY);
  };

  const onTouchMove: TouchEventHandler = e => {
    if (disabled?.()) return clearOffset();
    if (isExcluded(e.target)) return clearOffset();
    if (containerRef()?.scrollTop !== 0) return; // not container scroll top
    const current = e.touches[0].screenY;
    const delta = start() - current;
    if (delta > 0) return; // moving up
    setOffset(Math.abs(delta));
  };

  const onTouchEnd: TouchEventHandler = () => {
    if (disabled?.()) return clearOffset();
    if (progress() >= 1) {
      onTrigger?.({ start: start(), offset: offset(), progress: progress() });
      setTriggered(true);
      return resetTimeout(debounce);
    }

    clearOffset();
  };

  createEffect(() => {
    containerRef()?.addEventListener('wheel', onWheel, { passive: true });
    containerRef()?.addEventListener('touchstart', onTouchStart, { passive: true });
    containerRef()?.addEventListener('touchmove', onTouchMove, { passive: true });
    containerRef()?.addEventListener('touchend', onTouchEnd, { passive: true });
  });
  onCleanup(() => {
    containerRef()?.removeEventListener('wheel', onWheel);
    containerRef()?.removeEventListener('touchstart', onTouchStart);
    containerRef()?.removeEventListener('touchmove', onTouchMove);
    containerRef()?.removeEventListener('touchend', onTouchEnd);
  });

  return {
    handlers: { onWheel, onTouchStart, onTouchMove, onTouchEnd },
    setContainerRef,
    containerRef,
    triggered,
    progress,
    offset,
    start,
  };
};

export const stopScrollPropagation = <T extends HTMLElement>(ref: T) => {
  if (!ref) return;
  const stopPropagation = (e: Event) => e.stopPropagation();

  ref.addEventListener('touchmove', stopPropagation);
  ref.addEventListener('wheel', stopPropagation);

  onCleanup(() => {
    ref.removeEventListener('touchmove', stopPropagation);
    ref.removeEventListener('wheel', stopPropagation);
  });
};
