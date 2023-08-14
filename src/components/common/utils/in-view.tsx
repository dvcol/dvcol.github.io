import { splitProps } from 'solid-js';

import type { ParentComponent } from 'solid-js';

import type { InViewEvent, InViewOptions } from '~/directives/in-view.directive';

import { inViewDirective } from '~/directives/in-view.directive';

export type InViewProps = InViewOptions & {
  onEnter?: (event: InViewEvent) => void;
  onLeave?: (event: InViewEvent) => void;
} & Partial<HTMLDivElement>;
export const InView: ParentComponent<InViewProps> = props => {
  const directive = inViewDirective;
  const [{ margin, options, onEnter, onLeave }, _props] = splitProps(props, ['margin', 'options', 'onEnter', 'onLeave']);
  return (
    <div
      use:directive={{ margin, options }}
      on:enter={(event: CustomEvent<InViewEvent>) => onEnter?.(event?.detail)}
      on:leave={(event: CustomEvent<InViewEvent>) => onLeave?.(event?.detail)}
      {..._props}
    >
      {props.children}
    </div>
  );
};
