import { ErrorHeader } from './error-header';

import type { ErrorHeaderProps } from './error-header';
import type { ParentComponent } from 'solid-js';

import type { PageProps } from '~/components';

import { HoverScale, Page } from '~/components';
import { BreakPointsStop } from '~/themes';

export type ErrorPageProps = ErrorHeaderProps & { page?: Omit<PageProps, 'header'>; contentProps?: PageProps['contentProps'] };
export const ErrorPage: ParentComponent<ErrorPageProps> = props => {
  return (
    <Page
      {...props.page}
      maxWidth="uhd"
      sideBySide
      animate="slide"
      header={<ErrorHeader title={props.title} subtitle={props.subtitle} description={props.description} />}
      headerProps={{
        sx: {
          justifyContent: {
            [BreakPointsStop.desktop]: 'center',
          },
        },
      }}
      contentProps={{
        ...props.contentProps,
        sx: {
          justifyContent: 'center',
          maxHeight: {
            [BreakPointsStop.default]: 'calc(100dvh - 280px)',
            [BreakPointsStop.mobile]: 'calc(100dvh - 250px)',
            [BreakPointsStop.tablet]: 'calc(100dvh - 300px)',
          },
          ...props.contentProps?.sx,
        },
      }}
    >
      <HoverScale initialDelay={1000}>{props.children}</HoverScale>
    </Page>
  );
};
