export function setIntervalX1() {
  const timer = { value: null };

  const loop = (interval, cb) => {
    if (!window || !window.requestAnimationFrame) return;

    let startTime = Date.now();
    let endTime = startTime;

    const fn = () => {
      timer.value = window.requestAnimationFrame(fn);

      endTime = Date.now();
      if(endTime - startTime >= interval) {
        endTime = startTime = Date.now();
        cb(timer);
      }
    };

    timer.value = window.requestAnimationFrame(fn);
  }

  return { timer, loop };
}

export function setIntervalY() {
  const timer = { value: null };

  const loop = (interval, totalTimes, cb) => {
    const startTime = Date.now();
    let count = 0;

    const fn = () => {
      count += 1;
      const offset = Date.now() - startTime - count * interval;
      const nextTime = interval - offset;

      if (nextTime < 0) {
        nextTime = 0;
      }

      timer.value = setTimeout(fn, nextTime);
      cb(timer);

      if (count === totalTimes) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    };
    timer.value = setTimeout(fn, interval);
  };

  return { timer, loop };
}