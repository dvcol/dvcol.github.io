import type { ParentComponent } from 'solid-js';

import type { HeaderProps } from '~/components';

import { Header } from '~/components';

export const PageHeader: ParentComponent<HeaderProps> = props => {
  return (
    <Header
      {...props}
      titleProps={{
        ...props.titleProps,
        sx: {
          mr: {
            default: '1.25em',
            tablet: '0.5em',
          },
          ...props.titleProps?.sx,
        },
      }}
      sectionProps={{
        ...props.sectionProps,
        sx: {
          mt: {
            default: '1rem',
            tablet: '3rem',
            fhd: 0,
          },
          justifyContent: {
            fhd: 'center',
          },
          ...props.sectionProps?.sx,
        },
      }}
    >
      {props.children}
    </Header>
  );
};
