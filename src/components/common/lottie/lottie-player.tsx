import type { Component } from 'solid-js';

import type { LottiePlayerComponent } from '~/apps/lottie/entry';

import type { PropsWithRef } from '~/utils';

export type LottiePlayerProps = PropsWithRef<LottiePlayerComponent>;
export const LottiePlayer: Component<LottiePlayerComponent & { ref?: LottiePlayerComponent | ((el: LottiePlayerComponent) => void) }> = props => {
  import('~/apps/lottie/entry').catch(() => console.error('Failed to define lottie web components'));

  return <lottie-player {...props} />;
};

export default LottiePlayer;
