import { baseUrl } from '@dvcol/trakt-extension';

import type { TraktExtension } from '@dvcol/trakt-extension';

import { AppLink } from '~/models';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      ['wc-trakt-extension']: Partial<TraktExtension['component']>;
    }
  }
}

const defineTraktExtensionComponents = async () => {
  if (customElements.get('wc-trakt-extension')) return;
  const aboutMe: TraktExtension = await import(/* @vite-ignore  */ `${AppLink.pages}/${baseUrl}/lib/index.js`);
  aboutMe.defineComponent();
};

export { defineTraktExtensionComponents };
