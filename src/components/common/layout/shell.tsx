import { Navbar, NavbarBack, NavbarButton } from '../navbar';
import { Stack } from '../stack';

import type { ParentComponent } from 'solid-js';

import type { RouteMeta } from '~/services';

import { NavbarProvider } from '~/components';
import { TransitionProvider } from '~/components/common/provider/transition-provider';

export const Shell: ParentComponent<{ routes?: RouteMeta[] }> = props => {
  return (
    <TransitionProvider>
      <NavbarProvider>
        <header style={{ position: 'absolute', top: '0', width: '100%' }}>
          <NavbarButton />
          <Navbar routes={props.routes?.filter(r => r.navbar)} />
          <NavbarBack />
        </header>
        <main>
          <Stack>{props.children}</Stack>
        </main>
      </NavbarProvider>
    </TransitionProvider>
  );
};

export default Shell;
