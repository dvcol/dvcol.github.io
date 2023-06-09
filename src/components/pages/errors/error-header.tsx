import { useI18n } from '@solid-primitives/i18n';
import { useNavigate } from '@solidjs/router';
import { Button, Stack } from '@suid/material';

import ArrowLeftSvg from 'line-md/svg/arrow-small-left.svg?component-solid';
import HomeSvg from 'line-md/svg/home.svg?component-solid';
import StackSvg from 'line-md/svg/text-box-multiple.svg?component-solid';

import type { Component, JSX } from 'solid-js';

import type { PropsWithRef } from '~/utils';

import { PageHeader } from '~/components';
import { Routes, useNavbar } from '~/services';
import { BreakPointsStop } from '~/themes';

export type ErrorHeaderProps = PropsWithRef<{
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  description?: JSX.Element | string;
}>;
export const ErrorHeader: Component<ErrorHeaderProps> = props => {
  const navigate = useNavigate();
  const [t] = useI18n();
  const { open } = useNavbar();
  return (
    <PageHeader
      ref={props.ref}
      title={props.title}
      subtitle={props.subtitle}
      description={props.description}
      sectionProps={{
        sx: { flex: '1 1 auto' },
      }}
    >
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
          {t('error_header.back')}
        </Button>
        <Button sx={{ alignItems: 'flex-start', mb: '0.25em' }} startIcon={<HomeSvg />} onclick={() => navigate(Routes.Home)}>
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
