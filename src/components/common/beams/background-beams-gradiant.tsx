import { animate } from 'motion';

import { createMemo, createSignal, onMount } from 'solid-js';

import type { Component } from 'solid-js';

export type BackgroundBeamsGradiantProps = {
  id: string;
  stop?: {
    head: string;
    tail: string;
  };
  animated?: boolean;
};

export const BackgroundBeamsGradiant: Component<BackgroundBeamsGradiantProps> = props => {
  const [elementRef, setElementRef] = createSignal<SVGLinearGradientElement | null>(null);
  const [progress, setProgress] = createSignal(0);

  const coefficient = (93 + Math.random() * 8) / 100;
  const position = createMemo(() => ({
    x1: `${progress()}%`,
    x2: `${progress() * 0.95}%`,
    y1: `${progress()}%`,
    y2: `${progress() * coefficient}%`,
  }));

  onMount(() => {
    if (!elementRef()) return;
    if (!props.animated) return;
    animate(_progress => setProgress(Number((_progress * 100).toFixed(2))), {
      duration: Math.random() * 100 + 10,
      easing: 'ease-in-out',
      repeat: Infinity,
      delay: Math.random(),
    });
  });
  return (
    <linearGradient ref={setElementRef} id={props.id} x1={position().x1} x2={position().x2} y1={position().y1} y2={position().y2}>
      <stop stop-opacity="0" />
      <stop stop-color={props.stop?.head ?? '#18CCFC'} />
      <stop stop-color={props.stop?.tail ?? '#6344F5'} offset="32.5%" />
      <stop offset="100%" stop-opacity="0" />
    </linearGradient>
  );
};
export default BackgroundBeamsGradiant;
