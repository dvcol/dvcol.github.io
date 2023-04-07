import { definedComponent } from '@dvcol/about-me';

import type { AppWc } from '@dvcol/about-me';

declare module 'solid-js' {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends HTMLElementTagNameMap {
      ['wc-about-me']: Partial<AppWc>;
    }
  }
}

definedComponent();
