import { Typography } from '@suid/material';

import { Section } from './section';

import type { SectionProps } from './section';
import type { TypographyProps } from '@suid/material/Typography';
import type { ParentComponent } from 'solid-js';

export type HeaderProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  titleProps?: TypographyProps;
  descriptionProps?: TypographyProps;
  sectionProps?: SectionProps;
};
export const Header: ParentComponent<HeaderProps> = props => {
  return (
    <Section {...props.sectionProps}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          mb: {
            default: '1rem',
            tablet: '1rem',
            desktop: '2rem',
          },
        }}
        {...props.titleProps}
      >
        {props.title}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          mb: {
            default: '0.5rem',
            tablet: 0,
          },
        }}
        {...props.descriptionProps}
      >
        {props.subtitle}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mb: {
            default: '0.5rem',
            tablet: '0.25rem',
          },
        }}
        {...props.descriptionProps}
      >
        {props.description}
      </Typography>
      {props.children}
    </Section>
  );
};
