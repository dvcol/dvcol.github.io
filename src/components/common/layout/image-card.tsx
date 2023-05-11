import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@suid/material';

import { Show, splitProps } from 'solid-js';

import type CardProps from '@suid/material/Card/CardProps';
import type { CardActionsProps } from '@suid/material/CardActions';
import type { CardMediaProps } from '@suid/material/CardMedia';
import type { JSX, ParentComponent } from 'solid-js';

import type { LottiePlayerProps } from '~/components';

import type { ResponsiveStyleValue } from '~/themes';

import { LottiePlayer } from '~/components';

type ImageCardMediaProps = CardMediaProps & {
  component?: keyof JSX.IntrinsicElements;
  height?: ResponsiveStyleValue<string | number>;
};
export type ImageCardProps = {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  imageProps?: ImageCardMediaProps & { alt?: string };
  lottieProps?: LottiePlayerProps;
  actionProps?: CardActionsProps;
} & CardProps;
export const ImageCard: ParentComponent<ImageCardProps> = props => {
  const [_props, cardProps] = splitProps(props, ['title', 'description', 'imageProps', 'actionProps', 'children']);

  return (
    <Card
      {...cardProps}
      sx={{
        whiteSpace: 'pre-line',
        ...cardProps.sx,
      }}
    >
      <CardActionArea
        {..._props.actionProps}
        sx={{
          height: '100%',
          ..._props.actionProps?.sx,
        }}
      >
        <CardMedia {..._props.imageProps}>
          <Show when={props.lottieProps}>
            <LottiePlayer autoplay loop mode="normal" {...props.lottieProps} />
          </Show>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {_props.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {_props.description}
          </Typography>
          {_props.children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
