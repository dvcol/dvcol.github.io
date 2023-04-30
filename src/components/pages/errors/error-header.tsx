import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Button, Stack } from '@suid/material';

import ArrowLeftSvg from 'line-md/svg/arrow-small-left.svg?component-solid';
import HomeSvg from 'line-md/svg/home.svg?component-solid';
import StackSvg from 'line-md/svg/text-box-multiple.svg?component-solid';

import type { Component } from 'solid-js';

import { PageHeader } from '~/components';
import { Routes, useNavbar } from '~/services';

export type ErrorHeaderProps = { title?: string; subtitle?: string; description?: string };
export const ErrorHeader: Component<ErrorHeaderProps> = props => {
  const navigate = useNavigate();
  const [t] = useI18n();
  const { open } = useNavbar();
  return (
    <PageHeader title={props.title} subtitle={props.subtitle} description={props.description}>
      <Stack
        direction={{
          default: 'column',
          mobile: 'row',
        }}
        spacing={2}
        sx={{
          gap: '1em',
          justifyContent: {
            default: 'center',
            mobile: 'flex-start',
          },
          mt: '1rem',
        }}
      >
        <Button sx={{ alignItems: 'flex-start' }} startIcon={<ArrowLeftSvg />} onclick={() => window.history.back()}>
          {t('error_header.back')}
        </Button>
        <Button sx={{ alignItems: 'flex-start' }} startIcon={<HomeSvg />} onclick={() => navigate(Routes.Home)}>
          {t('error_header.home')}
        </Button>
        <Button
          sx={{ alignItems: 'flex-start' }}
          startIcon={<StackSvg />}
          onclick={(e: MouseEvent) => {
            e.stopPropagation();
            open();
          }}
        >
          {t('error_header.navbar')}
        </Button>
      </Stack>
    </PageHeader>
  );
};

export default ErrorHeader;
