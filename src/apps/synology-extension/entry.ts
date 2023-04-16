import { defineComponents } from '@dvcol/synology-extension';
import en from '@dvcol/synology-extension/dist/_locales/en/messages.json';

import type { ContentAppHtmlElement, StandaloneAppHtmlElement, WebComponents } from '@dvcol/synology-extension/dist/types/pages/web/models';

declare module 'solid-js' {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends HTMLElementTagNameMap {
      [WebComponents.StandaloneApp]: Partial<StandaloneAppHtmlElement> & JSX.IntrinsicAttributes;
      [WebComponents.ContentApp]: Partial<ContentAppHtmlElement> & JSX.IntrinsicAttributes;
    }
  }
}

defineComponents({ patch: true, locales: { en } })
  .then(() => console.debug('Web components defined.'))
  .catch(err => console.error('Web components failed to define.', err));
