export const gradientText = ({ from, to }: { from: string; to: string }, options: { start?: number; end?: number; degree?: number } = {}) => {
  const { start, end, degree } = { degree: 120, start: 0, end: 60, ...options };
  return {
    background: `linear-gradient(${degree}deg, ${from} ${start}%, ${to} ${end}%);`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
};
