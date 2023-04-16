import { Box, Container } from '@suid/material';

import { Show } from 'solid-js';

import type { JSX, ParentComponent } from 'solid-js';

export const Page: ParentComponent<{ header?: JSX.Element; footer?: JSX.Element }> = props => {
  return (
    <Container component="section" maxWidth="lg" disableGutters sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
      <Show when={!!props.header} keyed>
        <Box component="header">{props.header}</Box>
      </Show>
      {props.children}
      <Show when={!!props.footer} keyed>
        <Box component="footer">{props.footer}</Box>
      </Show>
    </Container>
  );
};

export default Page;
