import { Button, Stack, TextField, Typography } from '@suid/material';

import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

import type { Component } from 'solid-js';
import type { ContentAppHtmlElement, StandaloneAppHtmlElement } from '~/apps/synology-extension/entry';

import { activateDemo, defineComponents, en } from '~/apps/synology-extension/entry';
import { Page, Section } from '~/components/common';

const wcStyle: any = {
  position: 'relative',
  display: 'flex',
  flex: '1 1 auto',
  'flex-direction': 'column',
  height: '80dvh',
  'max-width': '100dvw',
};

export const SynologyDemo: Component = () => {
  defineComponents({ patch: true, locales: { en } })
    .then(() => {
      console.debug('Web components defined.');
      const _task = window._synology?.mock?.task;
      if (_task) activateDemo(_task);
    })
    .catch(err => console.error('Web components failed to define.', err));

  let content: ContentAppHtmlElement;
  let standalone: StandaloneAppHtmlElement;

  const [min, setMin] = createSignal(5);

  const onTaskChange = () =>
    setTimeout(() => {
      console.info('change');
      if (!window._synology.mock?.task) return;

      const current = window._synology.mock?.task?.tasks.length ?? 0;

      if (current < min()) {
        window._synology.mock.task.add();
        standalone?.poll();
      }
    }, 250);

  createEffect(onTaskChange);

  onMount(() => window._synology.mock?.task?.addListener(onTaskChange));
  onCleanup(() => window._synology.mock?.task?.removeListener(onTaskChange));

  return (
    <Page>
      <Section ref>
        <Typography variant="h2" gutterBottom component="div">
          Synology Demo
        </Typography>
      </Section>
      <Section>
        <Stack direction="row" spacing="2em" sx={{ justifyContent: 'center' }}>
          <Button
            id="add-task"
            variant="outlined"
            onClick={() => {
              window._synology?.mock?.task?.add();
              standalone.poll();
            }}
          >
            Add task
          </Button>
          <Button
            id="open-modal"
            variant="outlined"
            onClick={() =>
              content.dialog?.({
                open: true,
                form: {
                  uri: 'http://my-download-link/modal/payload.pdf',
                  destination: {
                    path: 'modal/path',
                  },
                },
              })
            }
          >
            Open modal
          </Button>
          <Button
            id="quick-menu"
            variant="outlined"
            onClick={event =>
              content.anchor?.({
                event,
                anchor: null,
                form: {
                  uri: 'http://my-download-link/quick-menu/payload.pdf',
                  destination: {
                    path: 'quick/menu/path',
                  },
                },
              })
            }
          >
            Open Quick menu
          </Button>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" value={min()} type="number" onChange={e => setMin(e.target.value)} />
        </Stack>
        <wc-synology-download-content ref={content!} />
      </Section>
      <Section>
        <wc-synology-download-standalone ref={standalone!} basename="synology/demo" style={wcStyle}>
          {/* TODO skeleton loading here */}
        </wc-synology-download-standalone>
      </Section>
    </Page>
  );
};

export default SynologyDemo;
