import styles from './navbar-buttion.module.scss';

import type { Component } from 'solid-js';

export const NavbarButton: Component<{ open?: boolean; onClick?: (_open?: boolean) => void }> = props => {
  return (
    <button class={styles.menu_button} classList={{ [styles.menu_button__open]: props.open }} onClick={() => props?.onClick?.(!props.open)}>
      <span>Menu</span>
    </button>
  );
};

export default NavbarButton;
