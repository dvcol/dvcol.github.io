import { createContext, useContext } from 'solid-js';

import type { Accessor, Setter } from 'solid-js';

import type { TransitionProps } from '~/components/common/layout';

export type TransitionOption = Omit<TransitionProps, 'open'> & {
  event?: MouseEvent;
  then?: () => any | Promise<any>;
};

export type TransitionState = {
  state: Accessor<TransitionProps>;
  pending: Accessor<boolean | undefined>;
  startEvent: Accessor<MouseEvent | undefined>;
  setStartEvent: Setter<MouseEvent | undefined>;
  transition: (options: TransitionOption) => Promise<void>;
};

export const TransitionContext = createContext<TransitionState>({} as TransitionState);

export const usePageTransition = () => useContext<TransitionState>(TransitionContext);
