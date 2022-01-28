export function setIntervalX() {
  let timer = { value: null };

  const intervalFn = (interval, cb) => {
    if (!window || !window.requestAnimationFrame) return;

    let startTime = Date.now();
    let endTime = startTime;

    const loop = () => {
      timer.value = window.requestAnimationFrame(loop);

      endTime = Date.now();
      if (endTime - startTime > interval) {
        cb(timer);
        startTime = endTime = Date.now();
      }
    };

    timer.value = window.requestAnimationFrame(loop);
  };

  const cancelInterval = () => {
    if (!window || !window.requestAnimationFrame) return;

    window.cancelAnimationFrame(timer.value);
  };

  return { intervalFn, cancelInterval };
}