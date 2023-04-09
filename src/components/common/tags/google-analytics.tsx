import type { Component } from 'solid-js';

const injectConfig = (id: string) => {
  if (!window.dataLayer) window.dataLayer = [];
  if (!window.gtag) window.gtag = (...args) => window.dataLayer?.push(args);

  window.gtag('js', new Date());
  window.gtag('config', id);
};

const injectScript = (tag: string, id: string) => {
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${tag}`;
  script.onload = () => console.debug('Google analytics loaded', { tag, script, dataLayer: window.dataLayer });
  script.onerror = error => console.error('Google analytics failed to load', { tag, error, dataLayer: window.dataLayer });
  document.head.appendChild(script);
};

export const GoogleAnalyticId = 'G-VTFBLLVCLQ';

export const GoogleAnalytics: Component<{ tag?: string }> = (props = { tag: GoogleAnalyticId }) => {
  const tag = props.tag ?? GoogleAnalyticId;
  const id = `google-analytic-${tag}`;

  if (!document.head.querySelector(`#${id}`)) {
    injectConfig(tag);
    injectScript(tag, id);
  }

  return <div hidden aria-hidden="true" id="google-analytics" data-tag={tag} />;
};

export default GoogleAnalytics;
