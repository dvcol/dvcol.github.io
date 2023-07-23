import { baseUrl } from '@dvcol/about-me';

import type { AboutMe, AppWc, WebComponents } from '@dvcol/about-me';

import { AppLink } from '~/models';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      ['wc-about-me']: Partial<AppWc>;
    }
  }
}

const defineAboutMeComponents = async () => {
  const aboutMe: AboutMe = await import(`${AppLink.pages}/${baseUrl}/entry/index.js`);
  aboutMe.defineComponent();
};

export { WebComponents, defineAboutMeComponents };
