import { toast } from 'solid-toast';
import { useRegisterSW } from 'virtual:pwa-register/solid';

import type { Component } from 'solid-js';

export const Reload: Component = () => {
  useRegisterSW({
    onRegisterError: error => toast.error('SW registration error', error),
    onRegisteredSW: registration => console.debug('SW Registered: ', registration),
    onNeedRefresh: () => toast('New content available, click on reload button to update.', {}),
    onOfflineReady: () => console.debug('App ready to work offline'),
  });

  // const onUpdate = () => updateServiceWorker(true);

  return <div hidden aria-hidden="true" id={'service-worker-reload'} />;
};

export default Reload;
