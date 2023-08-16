import { createMemo } from 'solid-js';

import type { ParentComponent } from 'solid-js';

import type { HeaderProps } from '~/components';

import { Header } from '~/components';
import { BreakPointsStop } from '~/themes';

export type PageHeaderProps = HeaderProps & { sideBySide?: boolean | BreakPointsStop };
export const PageHeader: ParentComponent<PageHeaderProps> = props => {
  const sideBySide = createMemo<BreakPointsStop>(() =>
    typeof props.sideBySide === 'boolean' ? BreakPointsStop.desktop : props.sideBySide ?? BreakPointsStop.desktop,
  );
  return (
    <Header
      {...props}
      titleProps={{
        ...props.titleProps,
        sx: {
          mr: {
            [BreakPointsStop.default]: '1.25em',
            [BreakPointsStop.tablet]: '0.5em',
          },
          ...props.titleProps?.sx,
        },
      }}
      sectionProps={{
        ...props.sectionProps,
        sx: {
          mt: {
            [BreakPointsStop.default]: '0.75rem',
            [BreakPointsStop.mobile]: '1.25rem',
            [BreakPointsStop.tablet]: '3rem',
            [sideBySide()]: 0,
          },
          justifyContent: {
            [sideBySide()]: 'center',
          },
          ...props.sectionProps?.sx,
        },
      }}
    >
      {props.children}
    </Header>
  );
};
