import type { GoogleTagWindow } from '~/models/google-tag.model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- necessary for global typing
  interface Window extends GoogleTagWindow {
    // empty interface for extension
  }
}
