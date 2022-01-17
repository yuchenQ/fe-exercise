const RECT_SIZE = 40;

export const DIRECTION = {
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
};

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

export class Snake {
  constructor(
    startPos,
    length = 0,
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
  moveSnake() {
    const rect = new Rect(
      this.head.x,
      this.head.y,
      RECT_SIZE,
      RECT_SIZE,
      this.bodyColor
    );

    // 1、蛇头先右移一个方格距离，蛇身不动
    // 2、蛇身首部加一个方格
    // 3、蛇身尾部的方格去除
    // 4、利用定时器，造成蛇不断向右移动的视觉
    this.body.unshift(rect);
    this.body.pop();

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
  }
}