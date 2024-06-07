import { lazy } from 'solid-js';

import type { ParentComponent } from 'solid-js';

import type { RouteMeta } from '~/services';

import { NavbarProvider } from '~/components/common/provider';
import { TransitionProvider } from '~/components/common/provider/transition-provider';
import { externalRoutes } from '~/services';

const NavbarButton = lazy(() => import('~/components/common/navbar/navbar-button'));
const NavbarBack = lazy(() => import('~/components/common/navbar/navbar-back'));
const Navbar = lazy(() => import('~/components/common/navbar/navbar'));
const Stack = lazy(() => import('~/components/common/stack/stack'));
export const Shell: ParentComponent<{ routes?: RouteMeta[] }> = props => {
  return (
    <TransitionProvider>
      <NavbarProvider>
        <header style={{ position: 'absolute', top: '0', width: '100%' }}>
          <NavbarButton />
          <Navbar
            routes={props.routes?.filter(r => r.navbar && !r.more)}
            more={[...(props.routes?.filter(r => r.navbar && r.more) ?? []), ...externalRoutes]}
          />
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
