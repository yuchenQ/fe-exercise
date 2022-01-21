const DEFAULT_FIGURE = 0;
const DEFAULT_START_POINT = 0;
const DEFAULT_INTERVAL = 1000;

let timer;
let figure = DEFAULT_FIGURE;
let startPoint = DEFAULT_START_POINT;
let interval = DEFAULT_INTERVAL;

const setIntervalX = (interval, cb) => {
  if (!window) return;

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
};

const startPointInput = document.getElementById("start-point-input");
const intervalInput = document.getElementById("interval-input");

startPointInput.addEventListener("change", (e) => {
  const val = e.target.value;

  startPoint = parseInt(val);
});

intervalInput.addEventListener("change", (e) => {
  const val = e.target.value;

  interval = parseInt(val);
});

const startButton = document.getElementById("button-start");
const pauseButton = document.getElementById("button-pause");
const resetButton = document.getElementById("button-reset");

startButton.addEventListener("click", () => {
  if (timer) return;

  setIntervalX(interval, () => {
    figure += 1;

    const figureEle = document.getElementById("figure");
    figureEle.innerText = figure;
  });
});

pauseButton.addEventListener("click", () => {
  if (!timer) return;

  window.cancelAnimationFrame(timer);
  timer = null;
});

resetButton.addEventListener("click", () => {
  if (timer) return;

  figure = DEFAULT_FIGURE;
  const figureEle = document.getElementById("figure");
  figureEle.innerText = DEFAULT_FIGURE;

  startPoint = DEFAULT_START_POINT;
  const startPointInput = document.getElementById("start-point-input");
  startPointInput.value = DEFAULT_START_POINT;

  interval = DEFAULT_INTERVAL;
  const intervalInput = document.getElementById("interval-input");
  intervalInput.value = DEFAULT_INTERVAL;
});
