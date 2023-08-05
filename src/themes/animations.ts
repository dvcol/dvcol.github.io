export enum AnimationDuration {
  PageBackground = 2000,
  PageTransition = 1000,
}

export const computeStepDuration = (index: number, step = 1.5, duration = AnimationDuration.PageTransition) => {
  const multiplier = index * step || 1;
  return duration * multiplier;
};
