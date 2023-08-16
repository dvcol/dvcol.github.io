import { Box } from '@suid/material';

import { createMemo } from 'solid-js';

import styles from './navbar-back.module.scss';

import type { Component } from 'solid-js';

import { NavbarBackId, useNavbar, useRouteData } from '~/services';
import { watchMouse } from '~/utils';

export const NavbarBack: Component = () => {
  const { isScrolled, isOpen, isScrollable, currentPage } = useNavbar();
  const { active } = useRouteData();
  const accent = createMemo(() => active()?.accentColor || active()?.color);

  const { hover } = watchMouse({ corner: 'bottom-right' });

  const visible = createMemo(() => !isOpen() && isScrollable() && !!isScrolled());
  const collapsed = createMemo<boolean>(() => visible() && hover() === 'collapse');
  const expand = createMemo<boolean>(() => visible() && hover() === 'expand');

  const onClick = () => {
    if (!currentPage()) return console.warn('No current page set', currentPage());
    currentPage()?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="button"
      id={NavbarBackId}
      class={styles.back_button}
      classList={{
        [styles.back_button__collapsed]: collapsed(),
        [styles.back_button__visible]: visible(),
        [styles.back_button__hidden]: !visible(),
        [styles.back_button__expand]: expand(),
      }}
      sx={{
        '& span': { color: accent() },
        '&::before': { color: accent() },
        '&::after': { color: accent() },
      }}
      onClick={onClick}
    >
      <span class={styles.top} />
      <span class={styles.middle} />
      <span class={styles.bottom} />
    </Box>
  );
};

export default NavbarBack;
