import styles from './navbar-buttion.module.scss';

import type { Component } from 'solid-js';

import { NavbarButtonId, useNavbar } from '~/services';

export const NavbarButton: Component = () => {
  const { isOpen, toggle } = useNavbar();
  return (
    <button id={NavbarButtonId} class={styles.menu_button} classList={{ [styles.menu_button__open]: isOpen() }} onClick={() => toggle()}>
      <span>Menu</span>
    </button>
  );
};

export default NavbarButton;
