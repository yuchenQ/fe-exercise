export function newSetInterval(cb, interval) {
  let timer;
  let now = Date.now(), prev = now;

  const loop = function () {
    timer = window.requestAnimationFrame(loop);
    now = Date.now();
    if (now - prev >= interval) {
      prev = now = Date.now();
      cb();
    }
  };

  timer = window.requestAnimationFrame(loop);
  return timer;
}