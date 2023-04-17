import type { ComponentProps, ValidComponent } from 'solid-js';

export type SolidWebComponent<W, T extends ValidComponent = 'element'> = Partial<W> | ComponentProps<T>;
