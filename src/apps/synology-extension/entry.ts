import type {
  ContentAppHtmlElement,
  StandaloneAppHtmlElement,
  StandaloneConnectedEvent,
  SynologyDownload,
  WebComponents,
} from '@dvcol/synology-extension';

import type { SolidWebComponent } from '~/utils';

import { AppLink } from '~/models';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      [WebComponents.StandaloneApp]: SolidWebComponent<StandaloneAppHtmlElement>;
      [WebComponents.ContentApp]: SolidWebComponent<ContentAppHtmlElement>;
    }
  }
}

const baseUrl = 'synology-download';

const defineSynologyDownloadComponents = async () => {
  if (customElements.get('wc-synology-download-standalone')) return;
  const messages$ = fetch(`${AppLink.pages}/${baseUrl}/_locales/en/messages.json#/`);
  const { defineComponents, activateDemo }: SynologyDownload = await import(/* @vite-ignore */ `${AppLink.pages}/${baseUrl}/entry/index.js`);
  const en = await messages$.then(r => r.json());

  return defineComponents({ patch: true, locales: { en } })
    .then(() => {
      const { task, download } = window._synology?.mock ?? {};
      if (task && download) activateDemo({ task: [task, 3000], download: [download, 3000] });
    })
    .catch(err => console.error('Synology Web components failed to define.', err));
};

export { StandaloneAppHtmlElement, ContentAppHtmlElement, WebComponents, StandaloneConnectedEvent, defineSynologyDownloadComponents };
