import { Button, Grid } from '@suid/material';

import { createEffect, createSignal } from 'solid-js';

import styles from './synology-demo.module.scss';

import type { Component } from 'solid-js';

import type { ContentAppHtmlElement, StandaloneAppHtmlElement, StandaloneConnectedEvent } from '~/apps/synology-extension/entry';

import { Page, PageHeader, Section, Spinner } from '~/components/common';

export const SynologyDemo: Component = () => {
  const [contentRef, setContentRef] = createSignal<ContentAppHtmlElement>();
  const [standaloneRef, setStandaloneRef] = createSignal<StandaloneAppHtmlElement>();

  import('~/apps/synology-extension/entry').catch(() => console.error('Failed to define synology web components'));

  const onConnected = (e: StandaloneConnectedEvent) => e.detail?.login();
  createEffect(() => standaloneRef()?.addEventListener('connected', onConnected));

  return (
    <Page
      sideBySide
      maxWidth="qhd"
      header={
        <PageHeader
          title={'Synology Demo'}
          subtitle={'Welcome to the demo for synology download'}
          description={'This is a simulated version of the extension, please use the buttons to trigger task or download events'}
        >
          <Grid container spacing={2} sx={{ mt: '0.5em' }}>
            <Grid item xs={6} sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                id="add-task"
                onClick={() => {
                  window._synology?.mock?.task?.add();
                  standaloneRef()?.poll();
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
                  standaloneRef()?.poll();
                }}
              >
                Add download
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} class={styles.grid_item}>
              <Button
                id="open-modal"
                onClick={() =>
                  contentRef()?.dialog?.({
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
                  contentRef()?.anchor?.({
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
          m: { default: '1em', tablet: '2em 5em 2em 3em' },
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
        <wc-synology-download-content ref={setContentRef} />
        <wc-synology-download-standalone class={styles.web_component} ref={setStandaloneRef} basename="synology/demo" data-over-scroll="false">
          <Spinner size={'5em'} sx={{ alignSelf: 'center' }} />
        </wc-synology-download-standalone>
      </Section>
    </Page>
  );
};

export default SynologyDemo;
