import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@suid/material';

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

type VideoProps = Pick<HTMLVideoElement, 'autoplay' | 'muted' | 'loop' | 'controls'> & {
  source: Pick<HTMLSourceElement, 'src' | 'type'>;
  fit: 'cover' | 'fill' | 'contain';
  position: 'top' | 'bottom' | 'center' | 'left' | 'right';
};

export type ImageCardProps = {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  imageProps?: ImageCardMediaProps & { alt?: string };
  videoProps?: VideoProps;
  lottieProps?: LottiePlayerProps;
  actionProps?: CardActionsProps;
} & CardProps;
export const ImageCard: ParentComponent<ImageCardProps> = props => {
  const [_props, cardProps] = splitProps(props, ['title', 'description', 'imageProps', 'actionProps', 'children']);

  return (
    <Card
      {...cardProps}
      sx={{
        height: '100%',
        width: '100%',
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
          <Show when={props.videoProps}>
            <Box
              component="video"
              sx={{ width: '100%', objectFit: props.videoProps?.fit ?? 'cover', objectPosition: props.videoProps?.position ?? 'top' }}
              autoplay
              muted
              loop
              playsinline
              {...props.videoProps}
            >
              <source {...props.videoProps?.source} />
            </Box>
          </Show>
        </CardMedia>
        <CardContent
          sx={{
            height: '100%',
          }}
        >
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
