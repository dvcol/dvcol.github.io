import { Button, Stack, Typography } from '@suid/material';

import type { ContentAppHtmlElement, StandaloneAppHtmlElement } from '@dvcol/synology-extension/dist/types/pages/web/models';

import type { Component } from 'solid-js';

import { Page, Section } from '~/components/common';

const wcStyle: any = {
  display: 'flex',
  flex: '1 1 auto',
  'flex-direction': 'column',
  'max-height': '80dvh',
  'max-width': '100dvw',
  'min-height': '50dvh',
};

export const SynologyDemo: Component = () => {
  // Lazy load entry script
  import(/* @vite-ignore */ `../../../apps/synology-extension/entry`);

  let content: Partial<ContentAppHtmlElement>;
  let standalone: Partial<StandaloneAppHtmlElement>;
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
              console.info({ content, standalone });
              (window as any).content = content;
              (window as any).standalone = standalone;
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
        <wc-synology-download-standalone ref={standalone!} basename="synology" style={wcStyle} />
      </Section>
    </Page>
  );
};

export default SynologyDemo;
