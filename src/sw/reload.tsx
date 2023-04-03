import { Show } from 'solid-js';
import { useRegisterSW } from 'virtual:pwa-register/solid';

import styles from './reload.module.scss';

import type { Component } from 'solid-js';

export const Reload: Component = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: registration => console.debug('SW Registered: ', registration),
    onRegisterError: error => console.debug('SW registration error', error),
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div class={styles.container}>
      <Show when={offlineReady() || needRefresh()}>
        <div class={styles.toast}>
          <div class={styles.message}>
            <Show fallback={<span>New content available, click on reload button to update.</span>} when={offlineReady()}>
              <span>App ready to work offline</span>
            </Show>
          </div>
          <Show when={needRefresh()}>
            <button class={styles.button} onClick={() => updateServiceWorker(true)}>
              Reload
            </button>
          </Show>
          <button class={styles.button} onClick={() => close()}>
            Close
          </button>
        </div>
      </Show>
    </div>
  );
};

export default Reload;
