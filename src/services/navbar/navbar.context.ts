import { createContext, useContext } from 'solid-js';

import type { Accessor } from 'solid-js';

export type NavbarState = { isOpen: Accessor<boolean>; open: () => void; close: () => void; toggle: (_open?: boolean) => void };

export const NavbarContext = createContext<NavbarState>();

export const useNavbar = () => useContext<NavbarState>(NavbarContext);

export const NavbarButtonId = 'navbar-button';