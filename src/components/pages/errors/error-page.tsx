import { Motion } from '@motionone/solid';

import { useMediaQuery, useTheme } from '@suid/material';

import { createMemo } from 'solid-js';

import { ErrorHeader } from './error-header';

import type { ErrorHeaderProps } from './error-header';
import type { ParentComponent } from 'solid-js';

import type { PageProps } from '~/components';

import { Page, Section } from '~/components';

export type ErrorPageProps = ErrorHeaderProps & { page?: Omit<PageProps, 'header'> };
export const ErrorPage: ParentComponent<ErrorPageProps> = props => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('fhd'));
  const animateHeader = createMemo(() => {
    if (matches()) return { translate: ['50%', 0] };
    return { opacity: [0, 1] };
  });
  const animateSection = createMemo(() => {
    if (matches()) return { translate: ['-50%', 0] };
    return { scale: [0.5, 1] };
  });
  return (
    <Page
      {...props.page}
      maxWidth="uhd"
      sideBySide
      header={
        <Motion animate={animateHeader()} transition={{ scale: { duration: 2 }, translate: { duration: 1 } }}>
          <ErrorHeader title={props.title} subtitle={props.subtitle} description={props.description} />
        </Motion>
      }
    >
      <Section
        sx={{
          justifyContent: 'center',
          maxWidth: { fhd: '40vw' },
          maxHeight: { default: 'calc(100dvh - 270px)', mobile: 'calc(100dvh - 220px)', tablet: 'calc(100dvh - 290px)' },
        }}
      >
        <Motion
          style={{ width: '100%', height: '100%' }}
          animate={animateSection()}
          transition={{ scale: { duration: 1 }, translate: { duration: 1 } }}
        >
          {props.children}
        </Motion>
      </Section>
    </Page>
  );
};
