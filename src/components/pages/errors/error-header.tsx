import type { Component, JSX } from 'solid-js';

import type { PropsWithRef } from '~/utils';

import { PageHeader } from '~/components/common/layout';

export type ErrorHeaderProps = PropsWithRef<{
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  description?: JSX.Element | string;
  navbar?: boolean;
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
      navbar={props.navbar ?? true}
    />
  );
};

export default ErrorHeader;
