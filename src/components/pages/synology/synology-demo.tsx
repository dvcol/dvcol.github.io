import { Motion } from '@motionone/solid';
import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Box, Button, Grid, Typography } from '@suid/material';

import TaskSvg from 'line-md/svg/cloud-download-outline-loop.svg?component-solid';
import DownloadSvg from 'line-md/svg/downloading-loop.svg?component-solid';
import MenuSvg from 'line-md/svg/list-3.svg?component-solid';
import ModalSvg from 'line-md/svg/plus-circle.svg?component-solid';
import PageSvg from 'line-md/svg/text-box-multiple.svg?component-solid';

import { createEffect, createSignal, Show } from 'solid-js';

import styles from './synology-demo.module.scss';

import type { Component } from 'solid-js';

import type { ContentAppHtmlElement, StandaloneAppHtmlElement, StandaloneConnectedEvent } from '~/apps/synology-extension/entry';

import { GithubLoop, Page, PageHeader, Spinner, WebstoreSvg } from '~/components/common';
import { AppLink } from '~/models';
import { Routes, RoutesMeta } from '~/services';
import { gradientText } from '~/utils';

const GridContainerSx = {
  mt: '0.5em',
  justifyContent: 'center',
};
const GridItemSx = {
  display: 'flex',
  justifyContent: 'center',
  '> button': {
    margin: 'auto',
    padding: '1em',
    textTransform: 'none',
    fontSize: {
      default: '0.875rem',
      tablet: '1rem',
    },
  },
};

export const SynologyDemo: Component = () => {
  const [t] = useI18n();
  const [contentRef, setContentRef] = createSignal<ContentAppHtmlElement>();
  const [standaloneRef, setStandaloneRef] = createSignal<StandaloneAppHtmlElement>();

  const [loaded, setLoaded] = createSignal(false);
  import('~/apps/synology-extension/entry').then(() => setLoaded(true)).catch(() => console.error('Failed to define synology web components'));

  const onConnected = (e: Event) => (e as StandaloneConnectedEvent).detail?.login();
  createEffect(() => standaloneRef()?.addEventListener('connected', onConnected));

  const navigate = useNavigate();
  return (
    <Page
      sideBySide
      animate="fade"
      maxWidth="qhd"
      header={
        <PageHeader
          title={t('synology.demo.title')}
          titleProps={{
            sx: {
              ...gradientText({
                from: '#90caf9',
                to: RoutesMeta.SynologyDemo.accentColor ?? '#0D63F8',
              }),
            },
          }}
          subtitle={t('synology.demo.subtitle')}
          subtitleProps={{ color: RoutesMeta.SynologyDemo.accentColor }}
          description={
            <>
              <Box sx={{ mb: '0.5em' }}>{t('synology.demo.description_line_1')}</Box>
              <Box>{t('synology.demo.description_line_2')}</Box>
              <Grid
                container
                spacing={2}
                sx={{
                  ...GridContainerSx,
                  mt: '0.5em',
                }}
              >
                <Grid item xs={12} sm={3} xl={5} sx={GridItemSx}>
                  <Button
                    href={AppLink.synologyWebStore}
                    target="_blank"
                    sx={{
                      height: {
                        default: '5rem',
                        fhd: '6rem',
                      },
                    }}
                  >
                    <WebstoreSvg color={'#90caf9'} />
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3} sx={GridItemSx}>
                  <Button endIcon={<GithubLoop />} onclick={() => window.open(AppLink.synologyGithub)}>
                    {t('synology.demo.buttons.github')}
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3} sx={GridItemSx}>
                  <Button endIcon={<PageSvg />} onclick={() => navigate(Routes.Synology)}>
                    {t('synology.demo.buttons.feature')}
                  </Button>
                </Grid>
              </Grid>
            </>
          }
        >
          <Typography variant={'h4'} sx={{ mt: '1rem', color: RoutesMeta.SynologyDemo.accentColor }}>
            {t('synology.demo.button_title')}
          </Typography>
          <Grid container spacing={2} sx={GridContainerSx}>
            <Grid item sm={12} sx={{ mb: GridContainerSx.mt }}>
              <Typography variant={'h6'}>{t('synology.demo.button_description')}</Typography>
            </Grid>
            <Grid item xs={6} sm={3} xl={4} sx={GridItemSx}>
              <Button
                id="add-task"
                endIcon={<TaskSvg />}
                onClick={() => {
                  window._synology?.mock?.task?.add();
                  standaloneRef()?.poll();
                }}
              >
                {t('synology.demo.buttons.add_task')}
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} xl={5} sx={GridItemSx}>
              <Button
                id="add-download"
                endIcon={<DownloadSvg />}
                onClick={() => {
                  window._synology?.mock?.download?.add();
                  standaloneRef()?.poll();
                }}
              >
                {t('synology.demo.buttons.add_download')}
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} xl={4} sx={GridItemSx}>
              <Button
                id="open-modal"
                endIcon={<ModalSvg />}
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
                {t('synology.demo.buttons.open_modal')}
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} xl={5} sx={GridItemSx}>
              <Button
                id="quick-menu"
                endIcon={<MenuSvg />}
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
                {t('synology.demo.buttons.open_menu')}
              </Button>
            </Grid>
          </Grid>
        </PageHeader>
      }
      headerProps={{
        sx: {
          maxWidth: {
            fhd: '56rem',
            qhd: '50%',
          },
        },
      }}
      contentProps={{
        sx: {
          position: 'relative',
          marginTop: {
            default: '1rem',
            tablet: 0,
          },
          padding: { default: '1em', tablet: '2em 5em 2em 3em' },
          maxWidth: {
            fhd: '40%',
          },
          height: {
            fhd: '66%',
            qhd: '60%',
            uhd: '50%',
          },
          alignItems: 'center',
        },
      }}
    >
      <wc-synology-download-content ref={setContentRef} />
      <Show when={loaded()} fallback={<Spinner size={'5em'} sx={{ position: 'absolute', top: 'calc(50% - 2.5em)', left: 'calc(50% - 2.5em)' }} />}>
        <Motion
          class={styles.shadow}
          style={{ width: '100%', height: '100%' }}
          animate={{ opacity: [0, 1] }}
          transition={{ opacity: { duration: 1 }, translate: { duration: 1 } }}
        >
          <wc-synology-download-standalone class={styles.web_component} ref={setStandaloneRef} basename="synology/demo" data-over-scroll="false">
            <Spinner size={'5em'} sx={{ alignSelf: 'center' }} />
          </wc-synology-download-standalone>
        </Motion>
      </Show>
    </Page>
  );
};

export default SynologyDemo;
