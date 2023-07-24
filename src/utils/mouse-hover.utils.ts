export type Offset = {
  offsetX: number;
  offsetY: number;
};

export type Boundary = {
  collapse: number;
  expand: number;
};

export type HoverState = 'collapse' | 'expand' | false;

export const computeHoverState = (hover: HoverState, { offsetX, offsetY }: Offset, { collapse = 200, expand = 100 }: Boundary = {}): HoverState => {
  if (hover !== 'collapse' && (offsetX > collapse || offsetY > collapse)) {
    return 'collapse';
  }
  if (hover !== 'expand' && offsetX < collapse && offsetY < collapse && (offsetX > expand || offsetY > expand)) {
    return 'expand';
  }
  if (hover && offsetX <= expand && offsetY <= expand) {
    return false;
  }
  return hover;
};
