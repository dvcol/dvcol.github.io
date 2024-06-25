import { Box } from '@suid/material';

import { createEffect, createSignal } from 'solid-js';

import type { Component } from 'solid-js';

import Page from '~/components/common/layout/page';
import { stopScrollPropagation } from '~/components/common/utils';

export const SynoTraktDemo: Component = () => {
  const [wcRef, setWcRef] = createSignal<HTMLElement>();

  createEffect(() => {
    const _ref = wcRef();
    if (_ref) stopScrollPropagation(_ref);
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
