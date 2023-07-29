import type { Component, JSX } from 'solid-js';

import type { PropsWithRef } from '~/utils';

import { NavbarHeader, PageHeader } from '~/components';

export type ErrorHeaderProps = PropsWithRef<{
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  description?: JSX.Element | string;
}>;
export const ErrorHeader: Component<ErrorHeaderProps> = props => {
  return (
    <PageHeader
      ref={props.ref}
      title={props.title}
      subtitle={props.subtitle}
      description={props.description}
      sectionProps={{
        sx: { flex: '1 1 auto' },
      }}
    >
      <NavbarHeader />
    </PageHeader>
  );
};

export default ErrorHeader;
