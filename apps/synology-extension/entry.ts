import { defineComponents } from '@dvcol/synology-extension';
import en from '@dvcol/synology-extension/dist/_locales/en/messages.json';

defineComponents({ patch: true, locales: { en } })
  .then(() => console.debug('Web components defined.'))
  .catch(err => console.error('Web components failed to define.', err));
