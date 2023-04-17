import { definedComponent } from '@dvcol/about-me';

import type { AppWc } from '@dvcol/about-me';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      ['wc-about-me']: Partial<AppWc>;
    }
  }
}

export { definedComponent };
