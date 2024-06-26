import { createMemo, createSignal } from 'solid-js';

import { SimpleHeader } from './simple-header';

import type { SimpleHeaderProps } from './simple-header';
import type { ParentComponent } from 'solid-js';

import type { PageProps } from '~/components/common/layout';

import { Page } from '~/components/common/layout';
import { BreakPointsStop } from '~/themes';

export type SimplePageProps = SimpleHeaderProps & { page?: Omit<PageProps, 'header'>; contentProps?: PageProps['contentProps'] };
export const SimplePage: ParentComponent<SimplePageProps> = props => {
  const [headerRef, setHeaderRef] = createSignal<HTMLDivElement>();

  const headerHeight = createMemo(() => headerRef()?.clientHeight);

  return (
    <Page
      {...props.page}
      maxWidth="uhd"
      sideBySide
      animate="slide"
      header={<SimpleHeader title={props.title} subtitle={props.subtitle} description={props.description} />}
      headerProps={{
        ref: setHeaderRef,
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
            [BreakPointsStop.default]: `calc(100dvh - ${headerHeight() || 310}px)`,
            [BreakPointsStop.mobile]: `calc(100dvh - ${headerHeight() || 250}px)`,
            [BreakPointsStop.tablet]: `calc(100dvh - ${headerHeight() || 300}px)`,
          },
          ...props.contentProps?.sx,
        },
      }}
    >
      {props.children}
    </Page>
  );
};
