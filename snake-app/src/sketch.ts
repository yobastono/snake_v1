import p5 from "p5";

let app: p5.Element | null;
let canvas: p5.Renderer;
let p: p5;
let food: IFood | null;

const SPEED = 20;

interface ISnake {
  x: number;
  y: number;
  // data: Array<p5>
}

interface IFood {
  x: number;
  y: number;
  // data: Array<p5>
}


class Snake implements ISnake {
  constructor(public x: number, public y: number) {}
}

class Food implements IFood {
  x: number;
  y: number;
  constructor() {
  this.x = createRandomNumber();
  this.y = createRandomNumber();
  }
}

const snakes: Array<ISnake> = [];

const canvasDimension = {
  width: 400,
  height: 400
}

function initCanvas () {
  app = p.select('#app');
  canvas = p.createCanvas(canvasDimension.width, canvasDimension.height);
}

function initConfig() {
  console.log("initConfig")
  initCanvas();
  if (app) {
    canvas.parent(app);
    p.frameRate(10);
    const snake = initSnake();
    snakes.push(snake);
  }
}

function initSnake() {
  const x  = createRandomNumber();
  const y  = createRandomNumber();
  return new Snake(x, y);
}

export const sketch = new p5((pArg: p5) => {
  p = pArg;
  p.setup = () => {
    // const canvas = p.initCanvas(p.windowWidth / 2, p.windowHeight / 2);
    initConfig(); 
  }
  
  p.draw = () => {
    p.background(200);
    // let x = fps % 100;
    if (!food) {
      food = new Food();
    }
    renderFood();
    shiftSnake();
    renderSnake();
    eat();
    console.log("snakes", snakes);

  

    // for (var x = 0; x < p.width; x += p.width / 20) {
    //   for (var y = 0; y < p.height; y += p.height / 20) {
    //     p.stroke(0);
    //     p.strokeWeight(1);
    //     p.line(x, 0, x, p.height);
    //     p.line(0, y, p.width, y);
    //   }
    // }
  }
});

function eat() {
  if (snakes[0].x === food?.x && snakes[0].y === food?.y) {
    const lastSnakeItem = snakes[snakes.length -1];
    snakes.push(new Snake(lastSnakeItem.x, lastSnakeItem.y));
    food = null;
  }
}

function renderSnake() {
  p.fill('#00FF00')
  snakes.forEach((snake) => {
      p.rect(snake.x, snake.y, 20, 20);
  });
}

function renderFood() {
  if (food) {
    p.fill('#FF0000'); // Set fill color to red
    p.rect(food.x, food.y, 20, 20);
  }
}

function snakeDirection() {
  switch(p.keyCode) {
    case p.UP_ARROW:
      snakes[0].y -= SPEED;
      break;
    case p.DOWN_ARROW:
      snakes[0].y += SPEED;
      break;
    case p.LEFT_ARROW:
      snakes[0].x -= SPEED;
    break;
    case p.RIGHT_ARROW:
      snakes[0].x += SPEED;
    break;
  }


  const lastSnakeItem = snakes[snakes.length -1];

}

let prev = {
  x: 0,
  y: 0
}

function shiftSnake() {
  snakes.forEach((snake, index) => {
    if (index > 0) {
      //prev.x = snakes[index-1].x;
      //prev.y = snakes[index-1].y;
    }
    if (index === 0) {
      prev.x = snake.x;
      prev.y = snake.y;
      snakeDirection();
    } else {
      let tempX = snake.x;
      let tempY = snake.y;
      snake.x = prev.x;
      snake.y = prev.y;
      prev.x = tempX;
      prev.y = tempY;
    }
  })
}

function createRandomNumber() {
  return Math.floor(Math.random() * 20) * 20;
}
 
