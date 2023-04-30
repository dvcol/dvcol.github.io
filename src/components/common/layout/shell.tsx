import { Navbar, NavbarButton } from '../navbar';
import { Stack } from '../stack';

import type { ParentComponent } from 'solid-js';

import type { RouteMeta } from '~/services';

import { NavbarProvider } from '~/components';

export const Shell: ParentComponent<{ routes?: RouteMeta[] }> = props => {
  return (
    <NavbarProvider>
      <header style={{ position: 'absolute', top: '0', width: '100%' }}>
        <NavbarButton />
        <Navbar routes={props.routes?.filter(r => r.navbar)} />
      </header>
      <main>
        <Stack>{props.children}</Stack>
      </main>
    </NavbarProvider>
  );
};

export default Shell;
