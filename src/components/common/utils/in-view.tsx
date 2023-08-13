import type { ParentComponent } from 'solid-js';

import type { InViewEvent, InViewOptions } from '~/directives/in-view.directive';

import { inViewDirective } from '~/directives/in-view.directive';

export type InViewProps = InViewOptions & {
  onEnter?: (event: InViewEvent) => void;
  onLeave?: (event: InViewEvent) => void;
};
export const InView: ParentComponent<InViewProps> = props => {
  const directive = inViewDirective;
  return (
    <div
      use:directive={{ margin: props.margin, options: props.options }}
      on:enter={event => props.onEnter?.(event?.detail)}
      on:leave={event => props.onLeave?.(event?.detail)}
    >
      {props.children}
    </div>
  );
};
