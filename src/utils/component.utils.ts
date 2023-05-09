export type PropsWithRef<T, E extends HTMLElement = HTMLDivElement> = T & { ref?: E | ((el: E) => void) };
