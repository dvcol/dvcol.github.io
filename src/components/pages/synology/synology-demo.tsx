import { Button, Grid } from '@suid/material';

import { onMount } from 'solid-js';

import styles from './synology-demo.module.scss';

import type { Component } from 'solid-js';
import type { ContentAppHtmlElement, StandaloneAppHtmlElement } from '~/apps/synology-extension/entry';

import { Page, PageHeader, Section, Spinner } from '~/components/common';

export const SynologyDemo: Component = () => {
  let content: ContentAppHtmlElement;
  let standalone: StandaloneAppHtmlElement;

  import('~/apps/synology-extension/entry').catch(() => console.error('Failed to define synology web components'));

  onMount(() => standalone?.poll);

  return (
    <Page
      sideBySide
      maxWidth="qhd"
      header={
        <PageHeader
          title={'Synology Demo'}
          subtitle={'Welcome to the live demo for synology download'}
          description={'This is a simulated version of the extension, please use the following buttons to trigger task or download events.'}
        >
          <Grid container spacing={2} sx={{ mt: '0.5em' }}>
            <Grid item xs={6} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                id="add-task"
                onClick={() => {
                  window._synology?.mock?.task?.add();
                  standalone.poll();
                }}
              >
                Add task
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} class={styles.grid_item}>
              <Button
                id="add-task"
                onClick={() => {
                  window._synology?.mock?.download?.add();
                  standalone.poll();
                }}
              >
                Add download
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} class={styles.grid_item}>
              <Button
                id="open-modal"
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
            </Grid>
            <Grid item xs={6} sm={3} class={styles.grid_item}>
              <Button
                id="quick-menu"
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
            </Grid>
          </Grid>
        </PageHeader>
      }
      headerProps={{
        sx: {
          maxWidth: {
            fhd: '50vw',
            qhd: '30vw',
          },
        },
      }}
    >
      <Section
        sx={{
          m: { default: '1em', tablet: '2em 3em' },
          maxWidth: {
            fhd: '40vw',
          },
          height: {
            fhd: '70vh',
            qhd: '60vh',
          },
          alignItems: 'center',
        }}
      >
        <wc-synology-download-content ref={content!} />
        <wc-synology-download-standalone class={styles.web_component} ref={standalone!} basename="synology/demo" data-over-scroll="false">
          <Spinner size={'5em'} sx={{ alignSelf: 'center' }} />
        </wc-synology-download-standalone>
      </Section>
    </Page>
  );
};

export default SynologyDemo;
