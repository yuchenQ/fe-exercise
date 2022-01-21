import * as fns from './setInterval.js'

const DEFAULT_START_POINT = 10;
const DEFAULT_INTERVAL = 1000;

const setIntervalFn = fns.setIntervalY();
const timer = setIntervalFn.timer;
const intervalFn = setIntervalFn.loop;

let startPoint = DEFAULT_START_POINT;
let interval = DEFAULT_INTERVAL;
let figure = startPoint;

const figureEle = document.getElementById('figure');
figureEle.innerText = figure;

const startPointInput = document.querySelector('#start-point-input');
startPointInput.addEventListener('input', (e) => {
  let val = e.target.value;
  if (!val) val = DEFAULT_START_POINT;

  startPoint = parseInt(val);

  figure = startPoint;
  figureEle.innerText = figure;
});

const intervalInput = document.querySelector('#interval-input');
intervalInput.addEventListener('input', (e) => {
  const val = e.target.value;

  interval = parseInt(val);
});

const startButton = document.getElementById('button-start');
startButton.addEventListener('click', () => {
  if (timer.value) return;

  intervalFn(interval, startPoint, () => {
    figure -= 1;
    figureEle.innerText = figure;
  });
});

const pauseButton = document.getElementById('button-pause');
pauseButton.addEventListener('click', () => {
  if (!timer.value) return;

  window.cancelAnimationFrame(timer.value);
  timer.value = null;
});

const resetButton = document.getElementById('button-reset');
resetButton.addEventListener('click', () => {
  if(timer.value) return;

  startPoint = DEFAULT_START_POINT;
  startPointInput.value = startPoint;

  figure = startPoint;
  figureEle.innerText = figure;

  interval = DEFAULT_INTERVAL;
  intervalInput.value = interval;
});
