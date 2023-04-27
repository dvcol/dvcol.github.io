import { Button, Grid, Typography } from '@suid/material';

import { onMount } from 'solid-js';

import styles from './synology-demo.module.scss';

import type { Component } from 'solid-js';
import type { ContentAppHtmlElement, StandaloneAppHtmlElement } from '~/apps/synology-extension/entry';

import { Page, Section } from '~/components/common';

export const SynologyDemo: Component = () => {
  let content: ContentAppHtmlElement;
  let standalone: StandaloneAppHtmlElement;

  import('~/apps/synology-extension/entry').catch(() => console.error('Failed to define synology web components'));

  onMount(() => standalone?.poll);

  return (
    <Page>
      <Section>
        <Typography variant="h2" gutterBottom component="div">
          Synology Demo
        </Typography>
      </Section>
      <Section>
        <Grid container spacing={2} class={styles.grid_container}>
          <Grid item xs={6} sm={3} class={styles.grid_item}>
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
          </Grid>
          <Grid item xs={6} sm={3} class={styles.grid_item}>
            <Button
              id="add-task"
              variant="outlined"
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
          </Grid>
          <Grid item xs={6} sm={3} class={styles.grid_item}>
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
          </Grid>
        </Grid>

        <wc-synology-download-content ref={content!} />
      </Section>
      <Section>
        <wc-synology-download-standalone class={styles.web_component} ref={standalone!} basename="synology/demo" data-over-scroll="false">
          {/* TODO skeleton loading here */}
        </wc-synology-download-standalone>
      </Section>
    </Page>
  );
};

export default SynologyDemo;
