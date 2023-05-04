import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@suid/material';

import { splitProps } from 'solid-js';

import type CardProps from '@suid/material/Card/CardProps';
import type { CardActionsProps } from '@suid/material/CardActions';
import type { CardMediaProps } from '@suid/material/CardMedia';
import type { JSX, ParentComponent } from 'solid-js';

import type { ResponsiveStyleValue } from '~/themes';

type ImageCardMediaProps = CardMediaProps & {
  component?: keyof JSX.IntrinsicElements;
  height?: ResponsiveStyleValue<string | number>;
};
export type ImageCardProps = {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  imageProps?: ImageCardMediaProps;
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
        <CardMedia component="img" {..._props.imageProps} />
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
