import type { Component } from 'solid-js';

type GtagParameters = [string, string | Date];
declare global {
  interface Window {
    dataLayer?: [string, string | Date][];
    gtag: (...args: GtagParameters) => void;
  }
}

const injectScript = (id: string) => {
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
};

const injectConfig = (id: string) => {
  if (!window.dataLayer) window.dataLayer = [];
  if (!window.gtag) window.gtag = (...args) => window.dataLayer?.push(args);
  window.gtag('js', new Date());
  window.gtag('config', id);
};

export const GoogleTagId = 'G-VTFBLLVCLQ';

export const GoogleTag: Component<{ tag?: string }> = (props = { tag: GoogleTagId }) => {
  const tag = props.tag ?? GoogleTagId;
  const id = `google-tag-${tag}`;

  if (!document.head.querySelector(`#${id}`)) {
    injectScript(id);
    injectConfig(tag);
  }

  return <div hidden aria-hidden="true" id="google-tag" data-tag={tag} />;
};

export default GoogleTag;
