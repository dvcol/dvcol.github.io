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
  const baseUrl = 'trakt-extension';

  const domain = import.meta.env.VITE_TRAKT ?? `${AppLink.pages}/${baseUrl}`;
  const trakt: TraktExtension = await import(/* @vite-ignore  */ `${domain}/entry/index.js`);
  return trakt.defineComponent({ baseName: '/trakt/demo', baseUrl: '/trakt-extension/' });
};

export { defineTraktExtensionComponents };
