const RECT_SIZE = 40;
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
  constructor(startPos, length = 0, headColor = "red") {
    this.length = length;
    this.head = new Rect(
      startPos.x,
      startPos.y,
      RECT_SIZE,
      RECT_SIZE,
      headColor
    );
    this.body = [];

    if (!length) return;

    let x = this.head.x - RECT_SIZE;
    let y = this.head.y;

    for (let i = 0; i < this.length; i++) {
      const rect = new Rect(x, y, RECT_SIZE, RECT_SIZE, "yellow");
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
}

function draw() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const startPos = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };

  const snake = new Snake(startPos, 3);

  snake.drawSnake(ctx);
}

draw();
