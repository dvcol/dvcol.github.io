import { createSignal, onCleanup, onMount } from 'solid-js';

export type Offset = {
  offsetX: number;
  offsetY: number;
};

export type Boundary = {
  collapse?: number;
  expand?: number;
};

export type HoverState = 'collapse' | 'expand' | false;

export const computeHoverState = (hover: HoverState, { offsetX, offsetY }: Offset, { collapse = 200, expand = 100 }: Boundary = {}): HoverState => {
  if (hover !== 'collapse' && (offsetX > collapse || offsetY > collapse)) {
    return 'collapse';
  }
  if (hover !== 'expand' && offsetX < collapse && offsetY < collapse && (offsetX > expand || offsetY > expand)) {
    return 'expand';
  }
  if (hover && offsetX <= expand && offsetY <= expand) {
    return false;
  }
  return hover;
};

export const computeOffset = ({ clientX, clientY }: MouseEvent, corner?: 'top-right' | 'bottom-right') => {
  switch (corner) {
    case 'bottom-right':
      return {
        offsetX: window.innerWidth - clientX,
        offsetY: window.innerHeight - clientY,
      };
    case 'top-right':
    default:
      return {
        offsetX: window.innerWidth - clientX,
        offsetY: clientY,
      };
  }
};

export const watchMouse = ({ boundary, corner }: { boundary?: Boundary; corner?: 'top-right' | 'bottom-right' } = {}) => {
  const [hover, setHover] = createSignal<HoverState>('collapse');

  const onMouseMove = (event: MouseEvent) => {
    const { offsetX, offsetY } = computeOffset(event, corner);
    const _hover = computeHoverState(hover(), { offsetX, offsetY }, boundary);
    if (hover() !== _hover) setHover(_hover);
  };

  onMount(() => window.addEventListener('mousemove', onMouseMove));
  onCleanup(() => window.removeEventListener('mousemove', onMouseMove));

  return { hover, setHover };
};
