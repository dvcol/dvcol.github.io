import { Box } from '@suid/material';

import { createMemo } from 'solid-js';

import styles from './navbar-buttion.module.scss';

import type { Component } from 'solid-js';

import { NavbarButtonId, useNavbar, useRouteData } from '~/services';

export const NavbarButton: Component = () => {
  const { isScrolled, isOpen, toggle } = useNavbar();
  const { active } = useRouteData();
  const accent = createMemo(() => active()?.accentColor || active()?.color);

  return (
    <Box class={styles.menu_button__container} classList={{ [styles.menu_button__collapsed]: !!isScrolled() }}>
      <Box class={styles.menu_button__trigger}>
        <Box
          component="button"
          id={NavbarButtonId}
          class={styles.menu_button}
          classList={{ [styles.menu_button__open]: isOpen() }}
          sx={{
            '& span': { color: accent() },
            '&::before': { color: accent() },
            '&::after': { color: accent() },
          }}
          onClick={() => toggle()}
        >
          <span>Menu</span>
        </Box>
      </Box>
    </Box>
  );
};

export default NavbarButton;
