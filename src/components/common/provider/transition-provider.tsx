import { createSignal, useTransition } from 'solid-js';

import type { ParentComponent } from 'solid-js';

import type { TransitionProps } from '~/components';
import type { TransitionOption } from '~/services';

import type { TransitionState } from '~/services/navbar/transition.context';

import { TransitionContext } from '~/services';

export const TransitionProvider: ParentComponent = props => {
  const [state, setState] = createSignal<TransitionProps>({ open: false });
  const [startEvent, setStartEvent] = createSignal<MouseEvent>();

  const [pending, startTransition] = useTransition();

  const value: TransitionState = {
    state,
    pending,
    startEvent,
    setStartEvent,
    transition: async ({ event, then, ...options }: TransitionOption) =>
      startTransition(async () => {
        setStartEvent(event);
        setState({
          open: true,
          ...options,
        });
        await new Promise(r => {
          setTimeout(r, 500);
        });
        await then?.();
        setState({
          open: false,
        });
      }),
  };
  return <TransitionContext.Provider value={value}>{props.children}</TransitionContext.Provider>;
};
