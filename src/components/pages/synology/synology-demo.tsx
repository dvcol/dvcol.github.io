import { Button, Stack, Typography } from '@suid/material';

import type { Component } from 'solid-js';
import type { ContentAppHtmlElement, StandaloneAppHtmlElement } from '~/apps/synology-extension/entry';

import { activateDemo, defineComponents, en } from '~/apps/synology-extension/entry';
import { Page, Section } from '~/components/common';

const wcStyle: any = {
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
  return (
    <Page>
      <Section ref>
        <Typography variant="h2" gutterBottom component="div">
          Synology Demo
        </Typography>
      </Section>
      <Section>
        <Stack direction="row">
          <Button
            variant="outlined"
            onClick={() => {
              window._synology?.mock?.task?.add();
              standalone.poll();
            }}
          >
            Add download
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              content.dialog?.({
                open: true,
              })
            }
          >
            Open modal
          </Button>
          <Button
            variant="outlined"
            onClick={event =>
              content.anchor?.({
                event,
                anchor: null,
                form: {},
              })
            }
          >
            Open Quick menu
          </Button>
        </Stack>
        <wc-synology-download-content ref={content!} />
      </Section>
      <Section>
        <wc-synology-download-standalone ref={standalone!} basename="synology" style={wcStyle}>
          {/* TODO skeleton loading here */}
        </wc-synology-download-standalone>
      </Section>
    </Page>
  );
};

export default SynologyDemo;
