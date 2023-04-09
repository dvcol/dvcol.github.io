import type { Component } from 'solid-js';

const injectConfig = (id: string) => {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ 'gtm-tag': id });
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
};

const injectScript = (tag: string, id: string) => {
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${tag}`;
  script.onload = () => console.debug('Google tag manger loaded', { tag, script, dataLayer: window.dataLayer });
  script.onerror = error => console.error('Google tag manager failed to load', { tag, error, dataLayer: window.dataLayer });
  document.head.appendChild(script);
};

export const GoogleTagId = 'GTM-KKW7FKC';

export const GoogleTagManager: Component<{ tag?: string }> = (props = { tag: GoogleTagId }) => {
  const tag = props.tag ?? GoogleTagId;
  const id = `google-tag-${tag}`;

  if (!document.head.querySelector(`#${id}`)) {
    injectConfig(tag);
    injectScript(tag, id);
  }

  return <div hidden aria-hidden="true" id="google-tag" data-tag={tag} />;
};

export default GoogleTagManager;
