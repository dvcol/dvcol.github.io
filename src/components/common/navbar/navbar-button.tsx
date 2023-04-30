import styles from './navbar-buttion.module.scss';

import type { Component } from 'solid-js';

import { useNavbar } from '~/services';

export const NavbarButton: Component = () => {
  const { isOpen, toggle } = useNavbar();
  return (
    <button id="navbar-button" class={styles.menu_button} classList={{ [styles.menu_button__open]: isOpen() }} onClick={() => toggle()}>
      <span>Menu</span>
    </button>
  );
};

export default NavbarButton;
