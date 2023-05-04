import { Typography } from '@suid/material';

import { Section } from './section';

import type { SectionProps } from './section';
import type { TypographyProps } from '@suid/material/Typography';
import type { JSX, ParentComponent } from 'solid-js';

export type HeaderProps = {
  ref?: HTMLDivElement;
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  description?: JSX.Element | string;
  titleProps?: TypographyProps;
  subtitleProps?: TypographyProps;
  descriptionProps?: TypographyProps;
  sectionProps?: SectionProps;
};
export const Header: ParentComponent<HeaderProps> = props => {
  return (
    <Section ref={props.ref} {...props.sectionProps}>
      <Typography
        variant="h2"
        {...props.titleProps}
        sx={{
          fontWeight: 'bold',
          mb: {
            default: '1rem',
            tablet: '1rem',
            desktop: '2rem',
          },
          ...props.titleProps?.sx,
        }}
      >
        {props.title}
      </Typography>
      <Typography
        variant="h4"
        {...props.subtitleProps}
        sx={{
          mb: {
            default: '0.75rem',
            tablet: '1rem',
          },
          ...props.subtitleProps?.sx,
        }}
      >
        {props.subtitle}
      </Typography>
      <Typography
        variant="h6"
        {...props.descriptionProps}
        sx={{
          mb: {
            default: '0.5rem',
            tablet: '0.25rem',
          },
          ...props.descriptionProps?.sx,
        }}
      >
        {props.description}
      </Typography>
      {props.children}
    </Section>
  );
};
