import { Motion } from '@motionone/solid';

import { createMemo, createSignal } from 'solid-js';

import type { ParentComponent } from 'solid-js';

export type HoverScaleProps = { from?: number; to?: number; duration?: number; initialDelay?: number; disabled?: boolean; initialScale?: number };
export const HoverScale: ParentComponent<HoverScaleProps> = props => {
  const [disabled, setDisabled] = createSignal(!!props.initialDelay);
  const animations = createMemo(() => ({
    animate: props.disabled ?? disabled() ? { scale: props.initialScale ?? 1 } : { scale: [props.to ?? 1, props.from ?? 0.9] },
    hover: props.disabled ?? disabled() ? { scale: props.initialScale ?? 1 } : { scale: [props.from ?? 0.9, props.to ?? 1] },
  }));

  if (props.initialDelay) setTimeout(() => setDisabled(false), props.initialDelay);
  return (
    <Motion
      style={{ display: 'flex', 'align-items': 'center', width: '100%', height: '100%' }}
      animate={animations().animate}
      hover={animations().hover}
      transition={{ duration: props.duration ?? 1 }}
    >
      {props.children}
    </Motion>
  );
};

export default HoverScale;
