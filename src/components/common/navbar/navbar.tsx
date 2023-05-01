import { useI18n } from '@solid-primitives/i18n';
import { Link } from '@solidjs/router';

import LinkedInSvg from 'line-md/svg/linkedin.svg?component-solid';

import { For } from 'solid-js';

import { GithubLoop } from './navbar-github';

import { NavbarSocial } from './navbar-social';
import styles from './navbar.module.scss';

import type { Component } from 'solid-js';

import type { RouteMeta } from '~/services';

import { AppLink } from '~/models';
import { useNavbar, useRouteData } from '~/services';
import { camelToSnakeCase } from '~/utils';

export const Navbar: Component<{ routes?: RouteMeta[] }> = props => {
  const [t] = useI18n();
  const { active } = useRouteData();
  const { isOpen, close } = useNavbar();
  return (
    <nav class={styles.pages_nav} classList={{ [styles.pages_nav__open]: isOpen() ?? false }} id="navbar">
      <div class={styles.pages_nav__items}>
        <For each={props.routes}>
          {route => (
            <div class={styles.pages_nav__item}>
              <Link
                class={`${styles.link} ${styles.link__page}`}
                classList={{ [styles.link__active]: active()?.path === route.path }}
                href={route.path}
                onclick={close}
              >
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
            link={AppLink.github}
            label={t('navbar.social.github')}
            show={isOpen()}
            delay={400}
          >
            <GithubLoop />
          </NavbarSocial>
        </div>
        <div class={`${styles.pages_nav__item} ${styles.pages_nav__item__social}`}>
          <NavbarSocial
            class={`${styles.link} ${styles.link__social} ${styles.link__faded}`}
            link={AppLink.linkedIn}
            label={t('navbar.social.linked')}
            show={isOpen()}
            delay={400}
          >
            <LinkedInSvg style={{ margin: '0 0 6px 1px' }} />
          </NavbarSocial>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
