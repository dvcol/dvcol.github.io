import type { GoogleTagWindow } from '~/models/google-tag.model';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface -- necessary for global typing
  interface Window extends GoogleTagWindow {
    // empty interface for extension
  }
}

declare module '@suid/system/createTheme/createBreakpoints' {
  export interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    default: true;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    hd: true;
    fhd: true;
    qhd: true;
    uhd: true;
  }
}
