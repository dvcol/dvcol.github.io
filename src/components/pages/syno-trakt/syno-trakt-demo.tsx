import { Box } from '@suid/material';

import { createSignal, onCleanup } from 'solid-js';

import type { Component } from 'solid-js';

import Page from '~/components/common/layout/page';
import { stopScrollPropagation } from '~/components/common/utils';
import { AppLink } from '~/models';

export const SynoTraktDemo: Component = () => {
  const [boxRef, setBoxRef] = createSignal<HTMLDivElement>();
  const [iframeRef, setIframeRef] = createSignal<HTMLIFrameElement>();

  const onClick = () => boxRef()?.click();

  const onLoad = () => {
    const _ref = iframeRef();
    if (!_ref?.contentDocument) return;

    stopScrollPropagation(_ref.contentDocument);
    _ref.contentDocument.addEventListener('click', onClick);
  };

  onCleanup(() => {
    const _ref = iframeRef();
    if (!_ref?.contentDocument) return;
    _ref.contentDocument.removeEventListener('click', onClick);
  });

  return (
    <Page maxWidth="hd" animate="fade">
      <Box ref={setBoxRef} sx={{ margin: '2rem 2rem', height: 'calc(100% - 4rem)', width: 'calc(100% - 4rem)' }}>
        <iframe
          ref={setIframeRef}
          title="syno-trakt-demo"
          src={`${AppLink.pages}/syno-trakt/`}
          width="100%"
          height="100%"
          frameBorder="0"
          onLoad={onLoad}
        />
      </Box>
    </Page>
  );
};

export default SynoTraktDemo;
