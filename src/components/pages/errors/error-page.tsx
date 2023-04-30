import { ErrorHeader } from './error-header';

import type { ErrorHeaderProps } from './error-header';

import type { ParentComponent } from 'solid-js';

import { Page, Section } from '~/components';

export type ErrorPageProps = ErrorHeaderProps;
export const ErrorPage: ParentComponent<ErrorPageProps> = props => {
  return (
    <Page
      maxWidth={'uhd'}
      sx={{
        flexDirection: {
          default: 'column',
          fhd: 'row',
        },
        justifyContent: {
          fhd: 'center',
        },
      }}
      header={<ErrorHeader title={props.title} subtitle={props.subtitle} description={props.description} />}
    >
      <Section sx={{ maxWidth: { fhd: '40vw' } }}>{props.children}</Section>
    </Page>
  );
};
