import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Button, Stack } from '@suid/material';

import ArrowLeftSvg from 'line-md/svg/arrow-small-left.svg?component-solid';
import HomeSvg from 'line-md/svg/home.svg?component-solid';
import StackSvg from 'line-md/svg/text-box-multiple.svg?component-solid';

import type { Component } from 'solid-js';

import { Routes, useNavbar } from '~/services';
import { BreakPointsStop } from '~/themes';

export const NavbarHeader: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();
  const { open } = useNavbar();
  return (
    <Stack
      direction={{
        [BreakPointsStop.default]: 'column',
        [BreakPointsStop.mobile]: 'row',
      }}
      sx={{
        gap: {
          [BreakPointsStop.default]: '0.25em',
          [BreakPointsStop.mobile]: '1em',
        },
        justifyContent: {
          [BreakPointsStop.default]: 'center',
          [BreakPointsStop.mobile]: 'flex-start',
        },
        mt: '1rem',
      }}
    >
      <Button sx={{ alignItems: 'flex-start' }} startIcon={<ArrowLeftSvg />} onclick={() => window.history.back()}>
        {t('navbar_header.back')}
      </Button>
      <Button sx={{ alignItems: 'flex-start', mb: '0.25em' }} startIcon={<HomeSvg />} onclick={() => navigate(Routes.Home)}>
        {t('navbar_header.home')}
      </Button>
      <Button
        sx={{ alignItems: 'flex-start' }}
        startIcon={<StackSvg />}
        onclick={(e: MouseEvent) => {
          e.stopPropagation();
          open();
        }}
      >
        {t('navbar_header.navbar')}
      </Button>
    </Stack>
  );
};
