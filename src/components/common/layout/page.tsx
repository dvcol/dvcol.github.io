import { Motion } from '@motionone/solid';
import { Box, Container, useMediaQuery, useTheme } from '@suid/material';

import { createMemo, Show } from 'solid-js';

import { Background } from './background';

import { Section } from './section';

import type { BackgroundProps } from './background';
import type { SectionProps } from './section';
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
  sectionProps?: SectionProps;
  background?: BackgroundProps;
  maxWidth?: keyof typeof BreakPoints;
  sx?: ContainerProps['sx'];
  sideBySide?: boolean;
  transition?: 'fade' | 'slide' | boolean;
};
export const Page: ParentComponent<PageProps> = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('fhd'));
  const isSideBySide = createMemo(() => props.sideBySide && matches());
  const animateHeader = createMemo(() => {
    if (props.transition === 'slide' && isSideBySide()) return { translate: ['50%', 0] };
    if (props.transition) return { opacity: [0, 1] };
  });
  const animateSection = createMemo(() => {
    if (props.transition === 'slide' && isSideBySide()) return { translate: ['-50%', 0] };
    if (props.transition) return { scale: [0, 1] };
  });
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
        <Motion animate={animateHeader()} transition={{ scale: { duration: 2 }, translate: { duration: 1 } }}>
          <Box component="header" {...props.headerProps} sx={{ display: 'flex', ...props.headerProps?.sx }}>
            {props.header}
          </Box>
        </Motion>
      </Show>
      <Section
        {...props.sectionProps}
        sx={{
          maxWidth: props.sideBySide ? { fhd: '40vw' } : undefined,
          ...props.sectionProps?.sx,
        }}
      >
        <Show when={props.transition} fallback={props.children}>
          <Motion
            style={{ width: '100%', height: '100%' }}
            animate={animateSection()}
            transition={{ scale: { duration: 1 }, translate: { duration: 1 } }}
          >
            {props.children}
          </Motion>
        </Show>
      </Section>
      <Show when={!!props.footer} keyed>
        <Box component="footer" {...props.footerProps} sx={{ display: 'flex', ...props.footerProps?.sx }}>
          {props.footer}
        </Box>
      </Show>
    </Container>
  );
};

export default Page;
