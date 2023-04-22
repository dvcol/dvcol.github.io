import type { Component } from 'solid-js';

import type { LottiePlayerComponent } from '~/apps/lottie/entry';

export const LottiePlayer: Component<LottiePlayerComponent> = props => {
  import('~/apps/lottie/entry').catch(() => console.error('Failed to define lottie web components'));

  return <lottie-player {...props} />;
};

export default LottiePlayer;
