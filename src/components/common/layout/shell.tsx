import { useBeforeLeave } from '@solidjs/router';

import { createSignal } from 'solid-js';

import { Navbar, NavbarButton } from '../navbar';
import { Stack } from '../stack';

import type { ParentComponent } from 'solid-js';

import type { RouteMeta } from '~/services';

export const Shell: ParentComponent<{ routes?: RouteMeta[] }> = props => {
  const [open, setOpen] = createSignal(false);
  useBeforeLeave(() => setOpen(false));
  return (
    <>
      <header style={{ position: 'absolute', top: '0', width: '100%' }}>
        <NavbarButton open={open()} onClick={setOpen} />
        <Navbar open={open()} routes={props.routes} onClick={setOpen} />
      </header>
      <main>
        <Stack open={open()} onClick={setOpen}>
          {props.children}
        </Stack>
      </main>
    </>
  );
};

export default Shell;
