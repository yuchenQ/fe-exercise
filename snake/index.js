import { newSetInterval } from "./newSetInterval.js";
import { Snake, DIRECTION } from "./snake.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startPos = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const snake = new Snake(startPos, 3, DIRECTION.RIGHT);
snake.drawSnake(ctx);

function optSnake(e, s) {
  switch (e.key) {
    case DIRECTION.LEFT: {
      // 三元表达式，防止右移动时按左，下面同理(贪吃蛇可不能直接掉头)
      if (s.direction !== DIRECTION.RIGHT) {
        s.direction = DIRECTION.LEFT;
      }
      break;
    }
    case DIRECTION.UP: {
      if (s.direction !== DIRECTION.DOWN) {
        s.direction = DIRECTION.UP;
      }
      break;
    }
    case DIRECTION.RIGHT: {
      if (s.direction !== DIRECTION.LEFT) {
        s.direction = DIRECTION.RIGHT;
      }
      break;
    }
    case DIRECTION.DOWN: {
      if (s.direction !== DIRECTION.UP) {
        s.direction = DIRECTION.DOWN;
      }
      break;
    }
  }
}

document.addEventListener("keydown", (e) => optSnake(e, snake));

function animate(s) {
  // 先清空
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 移动
  s.moveSnake();
  // 再画
  s.drawSnake(ctx);
}

let timer = newSetInterval(() => animate(snake), 1000);
