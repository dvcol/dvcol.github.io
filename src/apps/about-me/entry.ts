import { baseUrl } from '@dvcol/about-me';

import type { AboutMe, AppWc } from '@dvcol/about-me';

import { AppLink } from '~/models';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      ['wc-about-me']: Partial<AppWc>;
    }
  }
}

const defineAboutMeComponents = async () => {
  if (customElements.get('wc-about-me')) return;
  const aboutMe: AboutMe = await import(/* @vite-ignore  */ `${AppLink.pages}/${baseUrl}/entry/index.js`);
  aboutMe.defineComponent();
};

export { defineAboutMeComponents };
