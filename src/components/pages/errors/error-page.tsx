import { ErrorHeader } from './error-header';

import type { ErrorHeaderProps } from './error-header';
import type { ParentComponent } from 'solid-js';

import type { PageProps } from '~/components';

import { HoverScale, Page } from '~/components';

export type ErrorPageProps = ErrorHeaderProps & { page?: Omit<PageProps, 'header'> };
export const ErrorPage: ParentComponent<ErrorPageProps> = props => {
  return (
    <Page
      {...props.page}
      maxWidth="uhd"
      sideBySide
      animate="slide"
      header={<ErrorHeader title={props.title} subtitle={props.subtitle} description={props.description} />}
      contentProps={{
        sx: {
          justifyContent: 'center',
          maxHeight: { default: 'calc(100dvh - 270px)', mobile: 'calc(100dvh - 220px)', tablet: 'calc(100dvh - 290px)' },
        },
      }}
    >
      <HoverScale>{props.children}</HoverScale>
    </Page>
  );
};
