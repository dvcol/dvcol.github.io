import type { ParentComponent } from 'solid-js';

import type { HeaderProps } from '~/components';

import { Header } from '~/components';

export const PageHeader: ParentComponent<HeaderProps> = props => {
  return (
    <Header
      {...props}
      sectionProps={{
        sx: {
          mt: {
            default: '1rem',
            tablet: '3rem',
            fhd: 0,
          },
          justifyContent: {
            fhd: 'center',
          },
          ...props.sectionProps,
        },
      }}
    >
      {props.children}
    </Header>
  );
};
