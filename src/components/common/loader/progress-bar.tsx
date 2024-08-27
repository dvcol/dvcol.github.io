import { Box } from '@suid/material';

import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { Accessor, Component } from 'solid-js';

import { useNavbar } from '~/services';
import { Colors } from '~/themes';

export const ProgressBar: Component<{ container?: Accessor<HTMLElement | undefined>; boxProps?: BoxProps }> = props => {
  const [scrolled, setScrolled] = createSignal();

  const scrollListener = () => {
    if (!scrolled()) setScrolled(true);
  };

  onMount(() => {
    const container = props.container?.();
    if (container) container.addEventListener('scroll', scrollListener);
  });
  onCleanup(() => {
    const container = props.container?.();
    if (container) container.removeEventListener('scroll', scrollListener);
  });

  const { isScrolled } = useNavbar();

  const progress = createMemo(() => {
    if (!isScrolled()) return 0;
    const containerScroll = props.container?.()?.scrollHeight;
    if (!containerScroll) return 0;
    if (window.innerHeight >= containerScroll) return 0;

    return isScrolled() / (containerScroll - window.innerHeight);
  });

  return (
    <Box
      id="progress-bar"
      {...props.boxProps}
      sx={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '0.125rem',
        background: Colors.Accent,
        scale: `${progress()} 1`,
        willChange: 'scale',
        transition: 'scale 100ms',
        zIndex: 9999,
        ...props.boxProps?.sx,
      }}
    />
  );
};
