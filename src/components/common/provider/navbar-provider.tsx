import { createEffect, createSignal } from 'solid-js';

import type { ParentComponent } from 'solid-js';

import type { NavbarState } from '~/services';

import { NavbarContext } from '~/services';

export const NavbarProvider: ParentComponent = props => {
  const [isOpen, setOpen] = createSignal(false);
  const [inFlight, setInflight] = createSignal(false);

  let timeout: NodeJS.Timeout;
  createEffect(() => {
    setInflight(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => setInflight(false), 450);
    isOpen();
  });

  const state: NavbarState = {
    isOpen,
    inFlight,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: _open => setOpen(_was => _open ?? !_was),
  };

  return <NavbarContext.Provider value={state}>{props.children}</NavbarContext.Provider>;
};
