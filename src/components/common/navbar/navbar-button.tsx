import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './navbar-buttion.module.scss';

import type { Component } from 'solid-js';

import { NavbarButtonId, useNavbar, useRouteData } from '~/services';

const boundary = { collapse: 200, expand: 100 };

export const NavbarButton: Component = () => {
  const { isScrolled, isOpen, toggle } = useNavbar();
  const { active } = useRouteData();
  const accent = createMemo(() => active()?.accentColor || active()?.color);

  const [hover, setHover] = createSignal<keyof typeof boundary | false>('collapse');

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const offsetX = window.innerWidth - clientX;
    const offsetY = clientY;

    if (hover() !== 'collapse' && (offsetX > boundary.collapse || offsetY > boundary.collapse)) {
      setHover('collapse');
    } else if (
      hover() !== 'expand' &&
      offsetX < boundary.collapse &&
      offsetY < boundary.collapse &&
      (offsetX > boundary.expand || offsetY > boundary.expand)
    ) {
      setHover('expand');
    } else if (hover() && offsetX <= boundary.expand && offsetY <= boundary.expand) {
      setHover(false);
    }
  };

  onMount(() => window.addEventListener('mousemove', onMouseMove));
  onCleanup(() => window.removeEventListener('mousemove', onMouseMove));

  const collapsed = createMemo<boolean>(() => !!isScrolled() && hover() === 'collapse');
  const expand = createMemo<boolean>(() => !!isScrolled() && hover() === 'expand');

  return (
    <Box
      component="button"
      id={NavbarButtonId}
      class={styles.menu_button}
      classList={{
        [styles.menu_button__open]: isOpen(),
        [styles.menu_button__collapsed]: collapsed(),
        [styles.menu_button__expand]: expand(),
      }}
      sx={{
        '& span': { color: accent() },
        '&::before': { color: accent() },
        '&::after': { color: accent() },
      }}
      onClick={() => toggle()}
    >
      <span>Menu</span>
    </Box>
  );
};

export default NavbarButton;
