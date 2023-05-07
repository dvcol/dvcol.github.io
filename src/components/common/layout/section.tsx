import { Box } from '@suid/material';

import { splitProps } from 'solid-js';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { ParentComponent } from 'solid-js';

import { BreakPointsStop } from '~/themes';

export type SectionProps = BoxProps & { component?: string };
export const Section: ParentComponent<SectionProps> = props => {
  const [{ children, sx }, _props] = splitProps(props, ['children', 'sx']);

  return (
    <Box
      {..._props}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        padding: {
          [BreakPointsStop.default]: '0 1rem',
          [BreakPointsStop.tablet]: '0 3rem',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};
