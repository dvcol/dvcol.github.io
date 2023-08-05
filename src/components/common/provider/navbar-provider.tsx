import { createEffect, createMemo, createSignal } from 'solid-js';

import type { ParentComponent } from 'solid-js';

import type { NavbarState } from '~/services';

import { NavbarContext } from '~/services';

export const NavbarProvider: ParentComponent = props => {
  const [isOpen, setOpen] = createSignal(false);
  const [inFlight, setInflight] = createSignal(false);
  const [isDisabled, setDisabled] = createSignal(false);
  const [isScrolled, setScrolled] = createSignal(0);
  const [isScrollable, setScrollable] = createSignal(true);

  const [currentPage, setCurrentPage] = createSignal<HTMLDivElement>();

  let timeout: NodeJS.Timeout;
  createEffect(() => {
    setInflight(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => setInflight(false), 450);
    isOpen();
  });

  const isNotDisabledAndOpen = createMemo(() => !isDisabled() && isOpen());
  const isNotDisabledAndScrollable = createMemo(() => !isDisabled() && isScrollable());

  const state: NavbarState = {
    isOpen: isNotDisabledAndOpen,
    inFlight,
    isDisabled,
    setDisabled,
    isScrolled,
    setScrolled,
    isScrollable: isNotDisabledAndScrollable,
    setScrollable,
    currentPage,
    setCurrentPage,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: _open => setOpen(_was => _open ?? !_was),
  };

  return <NavbarContext.Provider value={state}>{props.children}</NavbarContext.Provider>;
};
