export enum BreakPointsStop {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  default = 'default',
  mobile = 'mobile',
  tablet = 'tablet',
  laptop = 'laptop',
  desktop = 'desktop',
  hd = 'hd',
  fhd = 'fhd',
  qhd = 'qhd',
  uhd = 'uhd',
}

export enum BreakPoints {
  default = 0,
  mobile = 600,
  tablet = 900,
  laptop = 1024,
  desktop = 1200,
  desktopXl = 1900,
  hd = 1280,
  fhd = 1920,
  qhd = 2560,
  uhd = 3840,
}

export type BreakPointsKeys = keyof typeof BreakPoints;
