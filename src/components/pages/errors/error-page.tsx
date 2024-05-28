import { type ParentComponent } from 'solid-js';

import type { SimplePageProps } from '~/components/common/layout';

import { HoverScale } from '~/components/common/animation';
import { SimplePage } from '~/components/common/layout';

export const ErrorPage: ParentComponent<SimplePageProps> = props => {
  return (
    <SimplePage {...props}>
      <HoverScale initialDelay={1000}>{props.children}</HoverScale>
    </SimplePage>
  );
};
