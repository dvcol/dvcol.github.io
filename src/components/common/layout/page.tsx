import { Motion } from '@motionone/solid';

import { Box, Container, useMediaQuery, useTheme } from '@suid/material';

import { createMemo, Show } from 'solid-js';

import { Background } from './background';

import { Section } from './section';

import type { BackgroundProps } from './background';

import type { SectionProps } from './section';

import type { MotionComponentProps } from '@motionone/solid';

import type BoxProps from '@suid/material/Box/BoxProps';

import type { ContainerProps } from '@suid/material/Container';
import type { JSX, ParentComponent } from 'solid-js';
import type { BreakPoints } from '~/themes';

const sideBySideSx: any = {
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

const fade: MotionComponentProps = { animate: { opacity: [0, 1] }, transition: { opacity: { duration: 1 } } };
const scale: MotionComponentProps = { animate: { scale: [0, 1] }, transition: { scale: { duration: 1 } } };
const slideLeft: MotionComponentProps = { animate: { translate: ['50%', 0] }, transition: { translate: { duration: 1 } } };
const slideRight: MotionComponentProps = { animate: { translate: ['-50%', 0] }, transition: { translate: { duration: 1 } } };

export type PageProps = {
  ref?: HTMLDivElement;
  header?: JSX.Element;
  headerProps?: BoxProps;
  footer?: JSX.Element;
  footerProps?: BoxProps;
  contentProps?: SectionProps;
  background?: BackgroundProps;
  maxWidth?: keyof typeof BreakPoints;
  sx?: ContainerProps['sx'];
  sideBySide?: boolean;
  animate?: 'fade' | 'scale' | 'slide';
  motion?: { header?: MotionComponentProps; content?: MotionComponentProps };
};
export const Page: ParentComponent<PageProps> = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('fhd'));
  const isSideBySide = createMemo(() => props.sideBySide && matches());
  const motionHeader = createMemo<MotionComponentProps | undefined>(() => {
    if (props.motion?.header) return props.motion.header;
    if (props.animate === 'slide' && isSideBySide()) return slideLeft;
    if (props.animate === 'scale') return fade;
    if (props.animate) return fade;
  });
  const motionContent = createMemo(() => {
    if (props.motion?.content) return props.motion.content;
    if (props.animate === 'slide' && isSideBySide()) return slideRight;
    if (props.animate === 'scale') return scale;
    if (props.animate === 'fade') return fade;
    if (props.animate) return scale;
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
      {/* Background */}
      <Show when={!!props.background} keyed>
        <Background {...props.background} />
      </Show>

      {/* Header */}
      <Show when={!!props.header} keyed>
        <Box component="header" {...props.headerProps} sx={{ display: 'flex', ...props.headerProps?.sx }}>
          <Show when={motionHeader()} fallback={props.header}>
            <Motion animate={motionHeader()?.animate} transition={motionHeader()?.transition}>
              {props.header}
            </Motion>
          </Show>
        </Box>
      </Show>

      {/* Content */}
      <Section
        {...props.contentProps}
        sx={{
          maxWidth: props.sideBySide ? { fhd: '40%' } : undefined,
          ...props.contentProps?.sx,
        }}
      >
        <Show when={motionContent()} fallback={props.children}>
          <Motion style={{ width: '100%', height: '100%' }} animate={motionContent()?.animate} transition={motionContent()?.transition}>
            {props.children}
          </Motion>
        </Show>
      </Section>

      {/* Footer */}
      <Show when={!!props.footer} keyed>
        <Box component="footer" {...props.footerProps} sx={{ display: 'flex', ...props.footerProps?.sx }}>
          {props.footer}
        </Box>
      </Show>
    </Container>
  );
};

export default Page;
