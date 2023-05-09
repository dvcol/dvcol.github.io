export const setTimoutPromise = (...args: Parameters<typeof setTimeout>) =>
  new Promise(r => {
    const [cb, ..._args] = args;
    setTimeout(() => {
      cb();
      r(null);
    }, ..._args);
  });
