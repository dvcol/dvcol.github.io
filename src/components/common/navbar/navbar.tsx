import { useI18n } from '@solid-primitives/i18n';
import { Link } from '@solidjs/router';

import GithubLoop from 'line-md/svg/github-loop.svg?component-solid';
import LinkedIn from 'line-md/svg/linkedin.svg?component-solid';

import { For } from 'solid-js';

import { NavbarSocial } from './navbar-social';
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

      <div class={`${styles.pages_nav__items} ${styles.pages_nav__items__social}`}>
        <div class={`${styles.pages_nav__item} ${styles.pages_nav__item__social}`}>
          <NavbarSocial
            class={`${styles.link} ${styles.link__social} ${styles.link__faded}`}
            link={'https://github.com/dvcol'}
            label={'Github'}
            show={props.open}
            delay={400}
          >
            <GithubLoop />
          </NavbarSocial>
        </div>
        <div class={`${styles.pages_nav__item} ${styles.pages_nav__item__social}`}>
          <NavbarSocial
            class={`${styles.link} ${styles.link__social} ${styles.link__faded}`}
            link={'https://linkedin.com/in/dinh-van-colomban-76b513a4'}
            label={'Linked'}
            show={props.open}
            delay={400}
          >
            <LinkedIn style={{ margin: '0 0 6px 1px' }} />
          </NavbarSocial>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
