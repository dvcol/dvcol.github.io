import { activateDemo, defineComponents } from '@dvcol/synology-extension';

import en from '@dvcol/synology-extension/dist/_locales/en/messages.json';

import type { ContentAppHtmlElement, StandaloneAppHtmlElement, WebComponents } from '@dvcol/synology-extension';

import type { SolidWebComponent } from '~/utils';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      [WebComponents.StandaloneApp]: SolidWebComponent<StandaloneAppHtmlElement>;
      [WebComponents.ContentApp]: SolidWebComponent<ContentAppHtmlElement>;
    }
  }
}

export { StandaloneAppHtmlElement, ContentAppHtmlElement, WebComponents };

defineComponents({ patch: true, locales: { en } })
  .then(() => {
    const { task, download } = window._synology?.mock ?? {};
    if (task && download) activateDemo({ task: [task, 3000], download: [download, 3000] });
  })
  .catch(err => console.error('Synology Web components failed to define.', err));
