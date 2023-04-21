import { defineComponent } from '@dvcol/about-me';

import type { AppWc } from '@dvcol/about-me';

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements extends HTMLElementTagNameMap {
      ['wc-about-me']: Partial<AppWc>;
    }
  }
}

defineComponent();
