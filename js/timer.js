const setIntervalX = (cb, interval) => {
  if (!window) return;

  let timer;
  let start = Date.now();
  let end = start;

  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    end = Date.now();

    if (end - start >= interval) {
      start = end = Date.now();
      cb(timer);
    }
  };

  timer = window.requestAnimationFrame(loop);
  return timer;
};

let figure;
let startPoint;
let interval;

const startPointInput = document.getElementById('start-point');
const intervalInput = document.getElementById('interval');

startPointInput.addEventListener('change', (e) => {
  const val = e.target.value;

  if ()
});