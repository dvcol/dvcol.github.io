import { useI18n } from '@solid-primitives/i18n';
import { Link } from '@solidjs/router';

import { For } from 'solid-js';

import styles from './navbar.module.scss';

import type { Component } from 'solid-js';

import type { RouteMeta } from '~/services';

import { camelToSnakeCase } from '~/utils';

export const Navbar: Component<{ open?: boolean; routes?: RouteMeta[]; onClick?: (_open?: boolean) => void }> = props => {
  const close = () => props?.onClick?.(false);
  const [t] = useI18n();
  return (
    <nav class={styles.pages_nav} classList={{ [styles.pages_nav__open]: props.open ?? false }} id="navbar">
      <div class={styles.pages_nav__items}>
        <For each={props.routes}>
          {route => (
            <div class={styles.pages_nav__item}>
              <Link class={`${styles.link} ${styles.link__page}`} href={route.path} onclick={close}>
                {t(`routes.${camelToSnakeCase(route.name)}`)}
              </Link>
            </div>
          )}
        </For>
      </div>

      <div class={`${styles.pages_nav__item} ${styles.pages_nav__item__social}`}>
        <a class={`${styles.link} ${styles.link__social} ${styles.link__faded}`} href="https://github.com/dvcol">
          <i class="fa fa-twitter" />
          <span class={styles.textHidden}>Github</span>
        </a>
        <a class={`${styles.link} ${styles.link__social} ${styles.link__faded}`} href="https://linkedin.com/in/dinh-van-colomban-76b513a4">
          <i class="fa fa-linkedin" />
          <span class={styles.textHidden}>LinkedIn</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
