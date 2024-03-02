import { lazy } from 'solid-js';

export const lazyWithProps = (importFn: Parameters<typeof lazy>[0], props: Record<string, unknown>) => {
  const LazyComponent = lazy(importFn);
  if (!LazyComponent) throw new Error(`Component not found`);
  return <LazyComponent {...props} />;
};
