import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@suid/material';

import { createSignal, Show, splitProps } from 'solid-js';

import type CardProps from '@suid/material/Card/CardProps';
import type { CardActionsProps } from '@suid/material/CardActions';
import type { CardMediaProps } from '@suid/material/CardMedia';
import type { JSX, ParentComponent } from 'solid-js';

import type { LottiePlayerProps } from '~/components/common/lottie';

import type { ResponsiveStyleValue } from '~/themes';

import { LottiePlayer } from '~/components/common/lottie';

type ImageCardMediaProps = CardMediaProps & {
  component?: keyof JSX.IntrinsicElements;
  height?: ResponsiveStyleValue<string | number>;
};

type VideoProps = Partial<Pick<HTMLVideoElement, 'autoplay' | 'muted' | 'loop' | 'controls'>> & {
  source: Pick<HTMLSourceElement, 'src' | 'type'>;
  fit?: 'cover' | 'fill' | 'contain';
  position?: 'top' | 'bottom' | 'center' | 'left' | 'right';
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
  const [hover, setHover] = createSignal<boolean>(matchMedia(`only screen and (hover: none)`).matches);
  return (
    <Card
      {...cardProps}
      sx={{
        height: '100%',
        width: '100%',
        whiteSpace: 'pre-line',
        borderRadius: '0.5rem',
        ...cardProps.sx,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <CardActionArea
        {..._props.actionProps}
        sx={{
          height: '100%',
          position: 'relative',
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
              sx={{
                width: '100%',
                height: '100%',
                objectFit: props.videoProps?.fit ?? 'cover',
                objectPosition: props.videoProps?.position ?? 'top',
              }}
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
            position: 'absolute',
            width: '-webkit-fill-available',
            bottom: '0',
            padding: '1.25rem',
            background: 'linear-gradient(transparent 0%, black 100%)',
            translate: hover() ? '0 0' : '0 calc(100% - 4rem)',
            transition: 'translate 1s, background 1s',
          }}
        >
          <Typography gutterBottom variant="h5" component="div" sx={{ marginBottom: '1rem', fontWeight: 'bolder' }}>
            {_props.title}
          </Typography>
          <Typography variant="body1" color="white">
            {_props.description}
          </Typography>
          {_props.children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
