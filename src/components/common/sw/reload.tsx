import DownloadSvg from 'line-md/svg/downloading-loop.svg?component-solid';

import { toast } from 'solid-toast';
import { useRegisterSW } from 'virtual:pwa-register/solid';

import type { Component } from 'solid-js';

import { useI18n } from '~/services/i18n';

export const Reload: Component = () => {
  const [t] = useI18n();

  let onUpdate: () => void;
  const { updateServiceWorker } = useRegisterSW({
    onRegisterError: error => {
      console.info('[service-worker]', 'SW registration error', error);
      toast.error('SW registration error', error);
    },
    onRegisteredSW: registration => console.debug('[service-worker]', 'SW Registered: ', registration),
    onNeedRefresh: () => {
      console.info('[service-worker]', 'A new version is available');
      toast(
        () => {
          const onClick = () => {
            onUpdate?.();
            toast.dismiss();
          };
          return (
            <span tabindex="0" role="button" onClick={onClick} onKeyDown={onClick}>
              {t('toast.sw_update')}
            </span>
          );
        },
        {
          icon: <DownloadSvg style={{ scale: 1.5, padding: '0.5rem' }} />,
          position: 'bottom-right',
          duration: Infinity,
        },
      );
    },
    onOfflineReady: () => console.debug('[service-worker]', 'App ready to work offline'),
  });

  onUpdate = () => {
    console.info('Updating service worker version');
    return updateServiceWorker(true);
  };

  return <div hidden aria-hidden="true" id={'service-worker-reload'} />;
};

export default Reload;
