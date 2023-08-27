import { useBeforeLeave } from '@solidjs/router';

import { createSignal, onCleanup } from 'solid-js';

import type { ParentComponent } from 'solid-js';

import type { TransitionProps } from '~/components/common/layout';
import type { TransitionOption } from '~/services';

import type { TransitionState } from '~/services/navbar/transition.context';

import { TransitionContext } from '~/services';

import { AnimationDuration } from '~/themes';

export const TransitionProvider: ParentComponent = props => {
  const [state, setState] = createSignal<TransitionProps>({ open: false });
  const [startEvent, setStartEvent] = createSignal<MouseEvent>();

  const [pending, setPending] = createSignal<boolean>();

  let timeout: NodeJS.Timeout;

  useBeforeLeave(() => clearTimeout(timeout));

  onCleanup(() => {
    setPending(false);
    clearTimeout(timeout);
  });

  const onExit = async ({ event, then, ...options }: TransitionOption) => {
    setPending(true);
    setStartEvent(event);
    setState({
      open: true,
      ...options,
    });
    await new Promise<void>(r => {
      clearTimeout(timeout);
      timeout = setTimeout(r, AnimationDuration.PageTransition);
    });
    await then?.();
  };

  const onEnter = async ({ event, then, ...options }: TransitionOption) => {
    setState({
      open: true,
      fade: true,
      ...options,
    });
    await new Promise<void>(r => {
      clearTimeout(timeout);
      timeout = setTimeout(r, AnimationDuration.PageTransition);
    });
  };

  const clearState = () => {
    setState({
      open: false,
    });
    setPending(false);
    startEvent();
  };

  const value: TransitionState = {
    state,
    pending,
    startEvent,
    setStartEvent,
    transition: async (options: TransitionOption) => {
      await onExit(options);
      await onEnter(options);
      clearState();
    },
  };
  return <TransitionContext.Provider value={value}>{props.children}</TransitionContext.Provider>;
};
