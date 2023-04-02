import type { Component } from 'solid-js';

export const Synology: Component = () => {
  return (
    <div>
      <wc-synology-download-standalone basename="synology" />
      <wc-synology-download-content />
    </div>
  );
};

export default Synology;
