import type { LottiePlayer, PlayerState, PlayMode } from '@lottiefiles/lottie-player';

import type { SolidWebComponent } from '~/utils';

const LottieWebComponent = 'lottie-player';

// type LottiePlayerComponent = LottiePlayer & { mode: keyof typeof PlayMode };

export type LottiePlayerComponent = Partial<Omit<typeof LottiePlayer.prototype, 'mode' | 'currentState'>> & {
  mode?: `${PlayMode}`;
  currentState?: `${PlayerState}`;
};

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      [LottieWebComponent]: SolidWebComponent<LottiePlayerComponent>;
    }
  }
}

const defineComponent = async () => {
  if (!customElements.get(LottieWebComponent)) {
    await import('@lottiefiles/lottie-player');
  }
};

defineComponent().catch(err => console.error('Lottie web component failed to define.', err));
