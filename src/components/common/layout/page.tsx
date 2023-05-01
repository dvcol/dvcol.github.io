import { Box, Container } from '@suid/material';

import { Show } from 'solid-js';

import { Background } from './background';

import type { BackgroundProps } from './background';
import type BoxProps from '@suid/material/Box/BoxProps';

import type { ContainerProps } from '@suid/material/Container';
import type { JSX, ParentComponent } from 'solid-js';

import type { BreakPoints } from '~/themes';

const sideBySideSx = {
  flexDirection: {
    default: 'column',
    fhd: 'row',
  },
  justifyContent: {
    fhd: 'center',
  },
  alignItems: {
    fhd: 'center',
  },
};

export type PageProps = {
  ref?: HTMLDivElement;
  header?: JSX.Element;
  headerProps?: BoxProps;
  footer?: JSX.Element;
  footerProps?: BoxProps;
  background?: BackgroundProps;
  maxWidth?: keyof typeof BreakPoints;
  sx?: ContainerProps['sx'];
  sideBySide?: boolean;
};
export const Page: ParentComponent<PageProps> = props => {
  return (
    <Container
      ref={props.ref}
      component="section"
      disableGutters
      maxWidth={props.maxWidth ?? 'desktop'}
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        ...(props.sideBySide ? sideBySideSx : {}),
        ...props?.sx,
      }}
    >
      <Show when={!!props.background} keyed>
        <Background {...props.background} />
      </Show>
      <Show when={!!props.header} keyed>
        <Box component="header" {...props.headerProps} sx={{ display: 'flex', ...props.headerProps?.sx }}>
          {props.header}
        </Box>
      </Show>
      {props.children}
      <Show when={!!props.footer} keyed>
        <Box component="footer" {...props.footerProps} sx={{ display: 'flex', ...props.footerProps?.sx }}>
          {props.footer}
        </Box>
      </Show>
    </Container>
  );
};

export default Page;
