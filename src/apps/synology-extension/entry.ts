import { defineComponents, generateTask } from '@dvcol/synology-extension';

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

export { en, defineComponents, generateTask, StandaloneAppHtmlElement, ContentAppHtmlElement };
