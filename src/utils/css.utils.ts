export type GradientFromTo = { from: string; to: string };
export type GradientOptions = { start?: number; end?: number; direction?: number };

export const gradientText = ({ from, to }: GradientFromTo, options: GradientOptions = {}) => {
  const { start, end, direction } = { direction: '145deg', start: 0, end: 80, ...options };
  return {
    background: `linear-gradient(${direction}, ${from} ${start}%, ${to} ${end}%);`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    width: 'fit-content',
  };
};
