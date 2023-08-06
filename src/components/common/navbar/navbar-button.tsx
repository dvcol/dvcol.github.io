import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './navbar-buttion.module.scss';

import type { Component } from 'solid-js';

import type { HoverState } from '~/utils';

import { NavbarButtonId, useNavbar, useRouteData } from '~/services';
import { computeHoverState } from '~/utils';

export const NavbarButton: Component = () => {
  const { isScrolled, isOpen, isDisabled, toggle } = useNavbar();
  const { active } = useRouteData();
  const accent = createMemo(() => active()?.accentColor || active()?.color);

  const [hover, setHover] = createSignal<HoverState>('collapse');

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const offsetX = window.innerWidth - clientX;
    const offsetY = clientY;

    const _hover = computeHoverState(hover(), { offsetX, offsetY });
    if (hover() !== _hover) setHover(_hover);
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
        [styles.menu_button__disabled]: isDisabled(),
      }}
      sx={{
        '& span': { color: accent() },
        '&::before': { color: accent() },
        '&::after': { color: accent() },
      }}
      onClick={() => toggle()}
    >
      <span id={`${NavbarButtonId}-middle`} />
    </Box>
  );
};

export default NavbarButton;
