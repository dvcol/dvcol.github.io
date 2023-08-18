import type { Component } from 'solid-js';

import { PageComingSoon } from '~/components/pages';
import { RoutesMeta } from '~/services';

export const TraktHome: Component = () => {
  return <PageComingSoon background={RoutesMeta.Trakt.bgColor} />;
};

export default TraktHome;
