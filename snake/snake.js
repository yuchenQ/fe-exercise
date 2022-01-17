const RECT_SIZE = 40;

const DIRECTION = {
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
};

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const START_POS = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

let snake;
let food;
let timer;

class Rect {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

class Snake {
  constructor(
    startPos,
    length,
    initDirection,
    headColor = "red",
    bodyColor = "yellow"
  ) {
    this.direction = initDirection;
    this.length = length;
    this.headColor = headColor;
    this.bodyColor = bodyColor;
    this.head = new Rect(
      startPos.x,
      startPos.y,
      RECT_SIZE,
      RECT_SIZE,
      this.headColor
    );
    this.body = [];

    if (!length) return;

    let x = this.head.x - RECT_SIZE;
    let y = this.head.y;

    for (let i = 0; i < this.length; i++) {
      const rect = new Rect(x, y, RECT_SIZE, RECT_SIZE, this.bodyColor);
      this.body.push(rect);
      x -= RECT_SIZE;
    }
  }

  drawSnake(ctx) {
    this.head.draw(ctx);

    for (let i = 0; i < this.body.length; i++) {
      this.body[i].draw(ctx);
    }
  }

  // 蛇动起来有两种情况：
  // 1、蛇一开始就会默认向右移动
  // 2、通过方向键控制，往不同方向移动
  moveSnake(food, canvasWidth, canvasHeight) {
    const rect = new Rect(
      this.head.x,
      this.head.y,
      RECT_SIZE,
      RECT_SIZE,
      this.bodyColor
    );

    // 1、蛇身首部加一个方格
    // 2、蛇身尾部的方格去除
    // 3、蛇头往前进方向移一格
    // 4、利用定时器，造成蛇不断向右移动的视觉
    this.body.unshift(rect);

    const isEatFood = this.head.x === food.x && this.head.y === food.y;

    if (!isEatFood) {
      this.body.pop();
    }

    // move 动作
    switch (this.direction) {
      case DIRECTION.LEFT: {
        this.head.x -= RECT_SIZE;
        break;
      }
      case DIRECTION.UP: {
        this.head.y -= RECT_SIZE;
        break;
      }
      case DIRECTION.RIGHT: {
        this.head.x += RECT_SIZE;
        break;
      }
      case DIRECTION.DOWN: {
        this.head.y += RECT_SIZE;
        break;
      }
    }

    const isHit = isHitSelfOrBorder(this, canvasWidth, canvasHeight);

    return { isHit, isEatFood };
  }
}

function isHitSelfOrBorder(snake, canvasWidth, canvasHeight) {
  const head = snake.head;

  const reachX = head.x < 0 || head.x > canvasWidth;
  const reachY = head.y < 0 || head.y > canvasHeight;
  const reachSelf = snake.body.find(({ x, y }) => x === head.x && y === head.y);

  return reachX || reachY || reachSelf;
}

function randomFood(snake, canvasWidth, canvasHeight) {
  const isOverlap = (x, y) => {
    if (x === snake.head.x && y === snake.head.y) {
      return true;
    }

    if (snake.body.find((i) => i.x === x && i.y === y)) {
      return true;
    }

    return false;
  };

  let isInSake = true;
  let rect;

  while (isInSake) {
    const x =
      Math.round((Math.random() * (canvasWidth - RECT_SIZE)) / RECT_SIZE) *
      RECT_SIZE;
    const y =
      Math.round((Math.random() * (canvasHeight - RECT_SIZE)) / RECT_SIZE) *
      RECT_SIZE;

    if (isOverlap(x, y)) {
      isInSake = true;
      continue;
    } else {
      isInSake = false;
      rect = new Rect(x, y, RECT_SIZE, RECT_SIZE, "blue");
    }
  }

  return rect;
}

function optSnake(snake) {
  if (snake) {
    return function (e) {
      switch (e.key) {
        case DIRECTION.LEFT: {
          // 三元表达式，防止右移动时按左，下面同理(贪吃蛇可不能直接掉头)
          if (snake.direction !== DIRECTION.RIGHT) {
            snake.direction = DIRECTION.LEFT;
          }
          break;
        }
        case DIRECTION.UP: {
          if (snake.direction !== DIRECTION.DOWN) {
            snake.direction = DIRECTION.UP;
          }
          break;
        }
        case DIRECTION.RIGHT: {
          if (snake.direction !== DIRECTION.LEFT) {
            snake.direction = DIRECTION.RIGHT;
          }
          break;
        }
        case DIRECTION.DOWN: {
          if (snake.direction !== DIRECTION.UP) {
            snake.direction = DIRECTION.DOWN;
          }
          break;
        }
      }
    };
  }
}

function newSetInterval(cb, interval) {
  let now = Date.now(),
    prev = now;

  const loop = function () {
    timer = window.requestAnimationFrame(loop);
    now = Date.now();
    if (now - prev >= interval) {
      prev = now = Date.now();
      cb();
    }
  };

  timer = window.requestAnimationFrame(loop);
}

function animate() {
  // 先清空
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 移动
  const { isHit, isEatFood } = snake.moveSnake(
    food,
    canvas.width,
    canvas.height
  );
  if (isHit) {
    window.cancelAnimationFrame(timer);
    document.removeEventListener("keydown", optSnake(snake));

    const con = window.confirm(
      `总共吃了${snake.body.length - snake.length}个食物，重新开始吗?`
    );

    if (con) {
      return init();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  if (isEatFood) {
    food = randomFood(snake, canvas.width, canvas.height);
  }
  // 再画出来
  snake.drawSnake(ctx);
  food.draw(ctx);
}

function init() {
  snake = new Snake(START_POS, 3, DIRECTION.RIGHT);
  food = randomFood(snake, canvas.width, canvas.height);

  snake.drawSnake(ctx);
  food.draw(ctx);

  timer = newSetInterval(animate, 500);
  document.addEventListener("keydown", optSnake(snake));
}

init();
