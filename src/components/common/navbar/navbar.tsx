import { useI18n } from '@solid-primitives/i18n';
import { Link } from '@solidjs/router';

import { Box } from '@suid/material';
import EmailSvg from 'line-md/svg/email.svg?component-solid';
import LinkedInSvg from 'line-md/svg/linkedin.svg?component-solid';

import { For } from 'solid-js';

import { NavbarSocial } from './navbar-social';
import styles from './navbar.module.scss';

import type { Component } from 'solid-js';

import type { RouteMeta } from '~/services';

import { GithubLoop } from '~/components/common/svg';

import { AppLink } from '~/models';
import { RoutesMeta, useNavbar, useRouteData } from '~/services';
import { BreakPointsStop } from '~/themes';
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
        <Box class={`${styles.pages_nav__item} ${styles.pages_nav__item__social}`}>
          <NavbarSocial
            class={`${styles.link} ${styles.link__social} ${styles.link__faded}`}
            sx={{ minWidth: '85px' }}
            link={AppLink.github}
            label={t('navbar.social.github')}
            show={isOpen()}
            delay={400}
          >
            <GithubLoop style={{ 'margin-left': '2px' }} />
          </NavbarSocial>
        </Box>
        <Box class={`${styles.pages_nav__item} ${styles.pages_nav__item__social}`}>
          <NavbarSocial
            class={`${styles.link} ${styles.link__social} ${styles.link__faded}`}
            sx={{ minWidth: '83px' }}
            link={AppLink.linkedIn}
            label={t('navbar.social.linked')}
            show={isOpen()}
            delay={400}
          >
            <LinkedInSvg style={{ margin: '0 0 6px 1px' }} />
          </NavbarSocial>
        </Box>
        <Box
          class={`${styles.pages_nav__item} ${styles.pages_nav__item__social}`}
          sx={{
            transitionDelay: {
              [BreakPointsStop.default]: '0.5s !important',
              [BreakPointsStop.mobile]: '0.35s !important',
            },
          }}
        >
          <NavbarSocial
            class={`${styles.link} ${styles.link__social} ${styles.link__faded}`}
            sx={{ minWidth: '97px' }}
            link={`/#${RoutesMeta.Contact.path}`}
            label={t('routes.contact')}
            show={isOpen()}
            delay={400}
          >
            <EmailSvg style={{ 'margin-left': '4px' }} />
          </NavbarSocial>
        </Box>
      </div>
    </nav>
  );
};

export default Navbar;
