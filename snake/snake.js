import { RECT_SIZE, INTERVAL, DIRECTION, COLOR } from "./constants.js";
import { setIntervalX } from "./setIntervalX.js";

class Rect {
  constructor({ x, y, width, height, color }) {
    this.x = x;
    this.y = y;
    this.width = width || RECT_SIZE;
    this.height = height || RECT_SIZE;
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
  constructor({
    startPos,
    initLength = 0,
    headColor = COLOR.HEAD,
    bodyColor = COLOR.BODY,
  }) {
    this.direction = DIRECTION.RIGHT;
    this.headColor = headColor;
    this.bodyColor = bodyColor;
    this.head = new Rect({ ...startPos, color: this.headColor });
    this.score = 0;
    this.body = [];

    let x = this.head.x - RECT_SIZE;
    let y = this.head.y;

    for (let i = 0; i < initLength; i++) {
      const rect = new Rect({ x, y, color: this.bodyColor });

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

  moveSnake(food, canvasWidth, canvasHeight) {
    const rect = new Rect({
      x: this.head.x,
      y: this.head.y,
      color: this.bodyColor,
    });

    this.body.unshift(rect);

    const isEatFood = this.head.x === food.x && this.head.y === food.y;
    if (!isEatFood) {
      this.body.pop();
    } else {
      this.score++;
    }

    switch (this.direction) {
      case DIRECTION.UP: {
        this.head.y -= this.head.height;
        break;
      }
      case DIRECTION.DOWN: {
        this.head.y += this.head.height;
        break;
      }
      case DIRECTION.LEFT: {
        this.head.x -= this.head.width;
        break;
      }
      case DIRECTION.RIGHT: {
        this.head.x += this.head.width;
        break;
      }
    }

    const isHit = isHitSelfOrBorder(this, canvasWidth, canvasHeight);

    return { isEatFood, isHit };
  }
}

function isHitSelfOrBorder(snake, canvasWidth, canvasHeight) {
  const head = snake.head;

  const reachX = head.x < 0 || head.x > canvasWidth;
  const reachY = head.y < 0 || head.y > canvasHeight;
  const reachSelf = snake.body.find(({ x, y }) => x === head.x && y === head.y);

  return reachX || reachY || reachSelf;
}

function operateSnake(snake) {
  return function (e) {
    switch (e.key) {
      case DIRECTION.UP: {
        if (snake.direction !== DIRECTION.DOWN) {
          snake.direction = DIRECTION.UP;
        }
        break;
      }
      case DIRECTION.DOWN: {
        if (snake.direction !== DIRECTION.UP) {
          snake.direction = DIRECTION.DOWN;
        }
        break;
      }
      case DIRECTION.LEFT: {
        if (snake.direction !== DIRECTION.RIGHT) {
          snake.direction = DIRECTION.LEFT;
        }
        break;
      }
      case DIRECTION.RIGHT: {
        if (snake.direction !== DIRECTION.LEFT) {
          snake.direction = DIRECTION.RIGHT;
        }
        break;
      }
    }
  };
}

function createRandomFood(snake, canvasWidth, canvasHeight) {
  const isOverlap = (x, y) => {
    if (x === snake.head.x && y === snake.head.y) {
      return true;
    }

    if (snake.body.find((rect) => rect.x === x && rect.y === y)) {
      return true;
    }

    return false;
  };

  let randomX, randomY;

  while (true) {
    randomX =
      Math.round((Math.random() * (canvasWidth - RECT_SIZE)) / RECT_SIZE) *
      RECT_SIZE;
    randomY =
      Math.round((Math.random() * (canvasHeight - RECT_SIZE)) / RECT_SIZE) *
      RECT_SIZE;

    if (!isOverlap(randomX, randomY)) {
      break;
    }
  }

  return new Rect({ x: randomX, y: randomY, color: COLOR.FOOD });
}

function init() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const [canvasWidth, canvasHeight] = [canvas.width, canvas.height];

  const snake = new Snake({
    startPos: { x: canvasWidth / 2, y: canvasHeight / 2 },
    initLength: 5,
  });
  snake.drawSnake(ctx);

  let food = createRandomFood(snake, canvasWidth, canvasHeight);
  food.draw(ctx);

  const intervalX = setIntervalX();
  intervalX.intervalFn(INTERVAL, animate);

  document.addEventListener("keydown", operateSnake(snake));

  function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const { isEatFood, isHit } = snake.moveSnake(
      food,
      canvasWidth,
      canvasHeight
    );
    if (isHit) {
      intervalX.cancelInterval();
      document.removeEventListener("keydown", operateSnake(snake));

      const con = window.confirm(
        `总共吃了${snake.score}个食物，重新开始吗?`
      );

      if (con) {
        init();
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      return;
    }
    if (isEatFood) {
      food = createRandomFood(snake, canvasWidth, canvasHeight);
    }
    
    food.draw(ctx);
    snake.drawSnake(ctx);
  }
}

init();
