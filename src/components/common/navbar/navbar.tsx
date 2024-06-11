import { Link } from '@solidjs/router';

import { Box } from '@suid/material';
import ChevronDown from 'line-md/svg/chevron-down.svg?component-solid';
import ChevronUp from 'line-md/svg/chevron-up.svg?component-solid';
import EmailSvg from 'line-md/svg/email.svg?component-solid';
import LinkedInSvg from 'line-md/svg/linkedin.svg?component-solid';

import { For, Show } from 'solid-js';

import { NavbarSocial } from './navbar-social';
import styles from './navbar.module.scss';

import type { Component } from 'solid-js';

import type { BaseRoute } from '~/services';

import { GithubLoop } from '~/components/common/svg';

import { AppLink } from '~/models';
import { RoutesMeta, useNavbar, useRouteData } from '~/services';
import { useI18n } from '~/services/i18n';
import { BreakPointsStop } from '~/themes';
import { camelToSnakeCase } from '~/utils';

export const Navbar: Component<{ routes?: BaseRoute[]; more?: BaseRoute[] }> = props => {
  const [t] = useI18n();
  const { active } = useRouteData();
  const { isOpen, close, isShowMore, toggleMore } = useNavbar();

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
                target={route.external ? '_blank' : undefined}
                onclick={close}
                title={t(`routes.title.${camelToSnakeCase(route.name)}`)?.toString()}
              >
                {t(`routes.${camelToSnakeCase(route.name)}`)?.toString()}
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
      <Box sx={{ alignSelf: 'center' }} class={styles.pages_nav__show_more}>
        <Show
          when={props.more?.length && isShowMore()}
          fallback={
            <span title={t('navbar.show_more')?.toString()}>
              <ChevronDown class={styles.pages_nav__show_more__chevron} onClick={() => toggleMore()} />
            </span>
          }
        >
          <span title={t('navbar.show_less')?.toString()}>
            <ChevronUp class={styles.pages_nav__show_more__chevron} onClick={() => toggleMore()} />
          </span>
        </Show>
      </Box>
      <Show when={isShowMore()}>
        <div class={styles.pages_nav__items} classList={{ [styles.pages_nav__more__open]: isShowMore() ?? false }}>
          <For each={props.more}>
            {route => (
              <div class={styles.pages_nav__item}>
                <Link
                  class={`${styles.link} ${styles.link__more} ${styles.link__faded}`}
                  href={route.path}
                  target={route.external ? '_blank' : undefined}
                  title={t(`routes.title.${camelToSnakeCase(route.name)}`)?.toString()}
                >
                  {t(`routes.${camelToSnakeCase(route.name)}`)?.toString()}
                </Link>
              </div>
            )}
          </For>
        </div>
      </Show>
    </nav>
  );
};

export default Navbar;
