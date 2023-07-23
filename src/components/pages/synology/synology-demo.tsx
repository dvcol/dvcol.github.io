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

import { defineSynologyDownloadComponents } from '~/apps/synology-extension/entry';

import { GithubLoop, Page, PageHeader, Spinner, WebstoreSvg } from '~/components/common';
import { AppLink } from '~/models';
import { Routes, RoutesMeta } from '~/services';
import { BreakPointsStop } from '~/themes';
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
      [BreakPointsStop.default]: '0.875rem',
      [BreakPointsStop.tablet]: '1rem',
    },
  },
};

export const SynologyDemo: Component = () => {
  const [t] = useI18n();
  const [contentRef, setContentRef] = createSignal<ContentAppHtmlElement>();
  const [standaloneRef, setStandaloneRef] = createSignal<StandaloneAppHtmlElement>();
  const [quickMenuRef, setQuickMenuRef] = createSignal<HTMLButtonElement | null>(null);

  const [loaded, setLoaded] = createSignal(false);

  const navigate = useNavigate();
  defineSynologyDownloadComponents()
    .then(() => setLoaded(true))
    .catch(e => {
      console.error('Failed to define synology web components', e);
      navigate(Routes.Error);
    });

  const onConnected = (e: Event) => (e as StandaloneConnectedEvent).detail?.login();
  // TODO : investigate stop propagation on scroll for mobile
  createEffect(() => standaloneRef()?.addEventListener('connected', onConnected));

  const addTask = () => {
    window._synology?.mock?.task?.add();
    standaloneRef()?.poll();
  };

  const addDownload = () => {
    window._synology?.mock?.download?.add();
    standaloneRef()?.poll();
  };

  const openModal = () =>
    contentRef()?.dialog?.({
      open: true,
      form: {
        uri: 'http://my-download-link/modal/payload.pdf',
        destination: {
          path: 'modal/path',
        },
      },
    });

  const openMenu = () =>
    contentRef()?.anchor?.({
      anchor: quickMenuRef(),
      form: {
        uri: 'http://my-download-link/quick-menu/payload.pdf',
        destination: {
          path: 'quick/menu/path',
        },
      },
    });

  return (
    <Page
      sideBySide
      animate="fade"
      maxWidth="uhd"
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
                <Grid item xs={12} sm={4} xl={4} sx={GridItemSx}>
                  <Button
                    {...{ href: AppLink.synologyWebStore, target: '_blank' }}
                    sx={{
                      height: {
                        [BreakPointsStop.default]: '5rem',
                        [BreakPointsStop.desktop]: '6rem',
                      },
                    }}
                  >
                    <WebstoreSvg color={'#90caf9'} />
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4} sx={GridItemSx}>
                  <Button endIcon={<GithubLoop />} onclick={() => window.open(AppLink.synologyGithub)}>
                    {t('synology.demo.buttons.github')}
                  </Button>
                </Grid>
                <Grid item xs={6} sm={4} sx={GridItemSx}>
                  <Button endIcon={<PageSvg />} onclick={() => navigate(Routes.Synology)}>
                    {t('synology.demo.buttons.feature')}
                  </Button>
                </Grid>
              </Grid>
            </>
          }
        >
          <Typography variant={'h4'} sx={{ mt: '1rem', mb: '0.5em', color: RoutesMeta.SynologyDemo.accentColor }}>
            {t('synology.demo.button_title')}
          </Typography>
          <Typography variant={'h6'} sx={{ mb: '0.5em' }}>
            {t('synology.demo.button_description')}
          </Typography>
          <Grid container spacing={2} sx={GridContainerSx}>
            <Grid item xs={6} sm={3} lg={4} sx={GridItemSx}>
              <Button id="add-task" endIcon={<TaskSvg />} onClick={addTask}>
                {t('synology.demo.buttons.add_task')}
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} lg={5} sx={GridItemSx}>
              <Button id="add-download" endIcon={<DownloadSvg />} onClick={addDownload}>
                {t('synology.demo.buttons.add_download')}
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} lg={4} sx={GridItemSx}>
              <Button id="open-modal" endIcon={<ModalSvg />} onClick={openModal}>
                {t('synology.demo.buttons.open_modal')}
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} lg={5} sx={GridItemSx}>
              <Button ref={setQuickMenuRef} id="quick-menu" endIcon={<MenuSvg />} onClick={openMenu}>
                {t('synology.demo.buttons.open_menu')}
              </Button>
            </Grid>
          </Grid>
        </PageHeader>
      }
      headerProps={{
        sx: {
          maxWidth: {
            [BreakPointsStop.desktop]: '50%',
            [BreakPointsStop.fhd]: '45%',
            [BreakPointsStop.qhd]: '40%',
            [BreakPointsStop.uhd]: '30%',
          },
        },
      }}
      contentProps={{
        sx: {
          position: 'relative',
          marginTop: {
            [BreakPointsStop.default]: '2rem',
            [BreakPointsStop.desktop]: 0,
          },
          margin: {
            [BreakPointsStop.default]: '1rem',
            [BreakPointsStop.tablet]: '2rem 3rem',
            [BreakPointsStop.desktop]: '3rem',
          },
          maxWidth: {
            [BreakPointsStop.desktop]: '50%',
            [BreakPointsStop.fhd]: '40%',
            [BreakPointsStop.qhd]: '40%',
            [BreakPointsStop.uhd]: '30%',
          },
          height: {
            [BreakPointsStop.desktop]: '66%',
            [BreakPointsStop.qhd]: '60%',
            [BreakPointsStop.uhd]: '50%',
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
