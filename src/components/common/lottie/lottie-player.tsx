import type { Component } from 'solid-js';

import type { LottiePlayerComponent } from '~/apps/lottie/entry';

export const LottiePlayer: Component<LottiePlayerComponent> = props => {
  import('~/apps/lottie/entry');

  return <lottie-player {...props} />;
};

export default LottiePlayer;
