import { defineComponents } from '@dvcol/synology-extension';
import enLocales from '@dvcol/synology-extension/dist/_locales/en/messages.json';

globalThis._locales = { en: enLocales };

defineComponents();
