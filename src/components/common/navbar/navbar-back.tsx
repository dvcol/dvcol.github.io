import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import styles from './navbar-back.module.scss';

import type { Component } from 'solid-js';

import type { HoverState } from '~/utils';

import { NavbarBackId, useNavbar, useRouteData } from '~/services';
import { computeHoverState } from '~/utils';

export const NavbarBack: Component = () => {
  const { isScrolled, isOpen, currentPage } = useNavbar();
  const { active } = useRouteData();
  const accent = createMemo(() => active()?.accentColor || active()?.color);

  const [hover, setHover] = createSignal<HoverState>('collapse');

  const onMouseMove = ({ clientX, clientY }: MouseEvent) => {
    const offsetX = window.innerWidth - clientX;
    const offsetY = window.innerHeight - clientY;
    const _hover = computeHoverState(hover(), { offsetX, offsetY });
    if (hover() !== _hover) setHover(_hover);
  };

  onMount(() => window.addEventListener('mousemove', onMouseMove));
  onCleanup(() => window.removeEventListener('mousemove', onMouseMove));

  const visible = createMemo(() => !!isScrolled() && !isOpen());
  const collapsed = createMemo<boolean>(() => visible() && hover() === 'collapse');
  const expand = createMemo<boolean>(() => visible() && hover() === 'expand');

  const onClick = () => currentPage()?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

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
