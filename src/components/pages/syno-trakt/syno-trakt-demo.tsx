import { Box } from '@suid/material';

import { createEffect, createSignal, onCleanup } from 'solid-js';

import type { Component } from 'solid-js';

import Page from '~/components/common/layout/page';
import { stopScrollPropagation } from '~/components/common/utils';
import { useNavbar } from '~/services';

export const SynoTraktDemo: Component = () => {
  const { close } = useNavbar();
  const [wcRef, setWcRef] = createSignal<HTMLIFrameElement>();

  createEffect(() => {
    const _ref = wcRef();
    if (!_ref?.contentDocument) return;

    stopScrollPropagation(_ref.contentDocument);
    _ref.contentDocument.addEventListener('click', close);
  });

  onCleanup(() => {
    const _ref = wcRef();
    if (!_ref?.contentDocument) return;
    _ref.contentDocument.removeEventListener('click', close);
  });

  return (
    <Page maxWidth="hd" animate="fade">
      <Box sx={{ margin: '2rem 2rem', height: 'calc(100% - 4rem)', width: 'calc(100% - 4rem)' }}>
        <iframe ref={setWcRef} title="syno-trakt-demo" src="https://dvcol.github.io/syno-trakt/" width="100%" height="100%" frameBorder="0" />
      </Box>
    </Page>
  );
};

export default SynoTraktDemo;
