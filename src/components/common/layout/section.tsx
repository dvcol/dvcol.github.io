import { Box } from '@suid/material';

import { splitProps } from 'solid-js';

import type BoxProps from '@suid/material/Box/BoxProps';
import type { ParentComponent } from 'solid-js';

export type SectionProps = BoxProps;
export const Section: ParentComponent<SectionProps> = props => {
  const [{ children, sx }, _props] = splitProps(props, ['children', 'sx']);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        margin: {
          default: '0 1rem',
          tablet: '0 3rem',
        },
        ...sx,
      }}
      {..._props}
    >
      {children}
    </Box>
  );
};
