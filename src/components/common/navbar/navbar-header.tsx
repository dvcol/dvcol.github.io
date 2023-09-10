import { useNavigate } from '@solidjs/router';
import { Button, Stack, useMediaQuery } from '@suid/material';

import ArrowLeftSvg from 'line-md/svg/arrow-small-left.svg?component-solid';
import HomeSvg from 'line-md/svg/home.svg?component-solid';
import StackSvg from 'line-md/svg/text-box-multiple.svg?component-solid';

import type { Component } from 'solid-js';

import { Routes, useNavbar } from '~/services';
import { useI18n } from '~/services/i18n';
import { BreakPoints, BreakPointsStop } from '~/themes';

export const NavbarHeader: Component = () => {
  const navigate = useNavigate();
  const [t] = useI18n();
  const { open } = useNavbar();

  const isMobile = useMediaQuery(`(max-width: ${BreakPoints.mobile}px)`);
  return (
    <Stack
      direction={'row'}
      sx={{
        gap: {
          [BreakPointsStop.default]: '0.75rem',
          [BreakPointsStop.mobile]: '1rem',
        },
        mt: {
          [BreakPointsStop.default]: '0.5rem',
          [BreakPointsStop.mobile]: '1rem',
        },
        justifyContent: 'flex-start',
      }}
    >
      <Button sx={{ alignItems: 'flex-start' }} startIcon={<ArrowLeftSvg />} onclick={() => window.history.back()}>
        {t(`navbar_header.back${isMobile() ? '_short' : ''}`)}
      </Button>
      <Button sx={{ alignItems: 'flex-start', mb: '0.25em' }} startIcon={<HomeSvg />} onclick={() => navigate(Routes.Home)}>
        {t(`navbar_header.home${isMobile() ? '_short' : ''}`)}
      </Button>
      <Button
        sx={{ alignItems: 'flex-start' }}
        startIcon={<StackSvg />}
        onclick={(e: MouseEvent) => {
          e.stopPropagation();
          open();
        }}
      >
        {t(`navbar_header.navbar${isMobile() ? '_short' : ''}`)}
      </Button>
    </Stack>
  );
};
