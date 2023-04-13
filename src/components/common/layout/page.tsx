import { Show } from 'solid-js';

import type { JSX, ParentComponent } from 'solid-js';

export const Page: ParentComponent<{ header?: JSX.Element; footer?: JSX.Element }> = props => {
  return (
    <>
      <Show when={!!props.header} keyed>
        <header>{props.header}</header>
      </Show>
      {props.children}
      <Show when={!!props.footer} keyed>
        <footer>{props.footer}</footer>
      </Show>
    </>
  );
};
