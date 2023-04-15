import { Box } from '@suid/material';

import { createEffect, createMemo, createSignal, Show } from 'solid-js';

import type { ParentComponent } from 'solid-js';
import type { JSX } from 'solid-js/types/jsx';

export const NavbarSocial: ParentComponent<{
  link: string;
  class?: string;
  label?: string;
  show?: boolean;
  delay?: number;
  fallback?: JSX.Element;
}> = props => {
  const [visible, setVisible] = createSignal(false);

  createEffect(() => {
    if (!props.show) return setVisible(false);
    if (!props.delay) return setVisible(true);
    return setTimeout(() => setVisible(true), props.delay);
  });

  const fallback = createMemo(() => props.fallback ?? <Box component={'span'} sx={{ display: 'inline-block', minWidth: '1em' }} />);

  return (
    <Box component={'a'} class={props.class} onMouseEnter={() => setVisible(true)} href={props.link}>
      <Show when={!!props.label} keyed>
        <span>{props.label}</span>
      </Show>
      <Show when={props.show && visible()} keyed fallback={fallback()}>
        {props.children}
      </Show>
    </Box>
  );
};

export default NavbarSocial;
