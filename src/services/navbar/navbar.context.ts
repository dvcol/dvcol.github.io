import { createContext, useContext } from 'solid-js';

import type { Accessor, Setter } from 'solid-js';

export type NavbarState = {
  isOpen: Accessor<boolean>;
  isShowMore: Accessor<boolean>;
  inFlight: Accessor<boolean>;
  isDisabled: Accessor<boolean>;
  setDisabled: Setter<boolean>;
  isScrolled: Accessor<number>;
  setScrolled: (offset?: number) => void;
  isScrollable: Accessor<boolean>;
  setScrollable: (disabled?: boolean) => void;
  currentPage: Accessor<HTMLDivElement | undefined>;
  setCurrentPage: Setter<HTMLDivElement | undefined>;
  open: () => void;
  close: () => void;
  toggle: (_open?: boolean) => void;
  showMore: () => void;
  hideMore: () => void;
  toggleMore: (_show?: boolean) => void;
};

export const NavbarContext = createContext<NavbarState>({} as NavbarState);

export const useNavbar = () => useContext<NavbarState>(NavbarContext);

export const NavbarButtonId = 'navbar-button';
export const NavbarBackId = 'navbar-back';
