export type GradientFromTo = { from: string; to: string };
export type GradientOptions = { start?: number; end?: number; direction?: number };

export const gradientText = ({ from, to }: GradientFromTo, options: GradientOptions = {}) => {
  const { start, end, direction } = { direction: '120deg', start: 0, end: 60, ...options };
  return {
    background: `linear-gradient(${direction}, ${from} ${start}%, ${to} ${end}%);`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
};
