import type { TraktExtension } from '@dvcol/trakt-extension';

import { AppLink } from '~/models';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      ['wc-trakt-extension']: HTMLElement;
    }
  }
}

const defineTraktExtensionComponents = async () => {
  if (customElements.get('wc-trakt-extension')) return;
  const remoteUrl = 'trakt-extension';
  const baseUrl = import.meta.env.VITE_TRAKT ? './' : `/${remoteUrl}/`;

  const domain = import.meta.env.VITE_TRAKT ?? `${AppLink.pages}/${remoteUrl}`;
  const trakt: TraktExtension = await import(/* @vite-ignore  */ `${domain}/entry/index.js`);
  return trakt.defineComponent({ baseName: '/trakt/demo', baseUrl });
};

export { defineTraktExtensionComponents };
