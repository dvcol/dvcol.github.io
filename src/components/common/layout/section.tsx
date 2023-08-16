import { Box } from '@suid/material';

import { splitProps } from 'solid-js';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { ParentComponent } from 'solid-js';

import { BreakPointsStop } from '~/themes';

export type SectionProps = BoxProps & { ref?: HTMLDivElement | ((el: HTMLDivElement) => void); component?: string };
export const Section: ParentComponent<SectionProps> = props => {
  const [{ children, sx }, _props] = splitProps(props, ['children', 'sx']);

  return (
    <Box
      {..._props}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        margin: {
          [BreakPointsStop.default]: '0 0.75rem',
          [BreakPointsStop.mobile]: '0 2rem',
          [BreakPointsStop.tablet]: '0 3rem',
          [BreakPointsStop.qhd]: '0 4rem',
          [BreakPointsStop.uhd]: '0 6rem',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
