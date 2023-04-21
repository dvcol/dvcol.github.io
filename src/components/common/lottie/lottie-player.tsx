import type { Component } from 'solid-js';

import type { LottiePlayerComponent } from '~/apps/lottie/entry';

import { defineComponent } from '~/apps/lottie/entry';

export const LottiePlayer: Component<LottiePlayerComponent> = props => {
  defineComponent().catch(err => console.error('Lottie web component failed to define.', err));
  return <lottie-player {...props} />;
};

export default LottiePlayer;
