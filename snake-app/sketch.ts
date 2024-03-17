import p5 from "p5";

const position = {
  x: 0,
  y: 0
}

const canvasDimension = {
  width: 400,
  height: 400
}

export const sketch = new p5((p: p5) => {
  p.setup = () => {
    const mainDiv = p.select('#app'); // Select the div element with id 'main'
    const canvas = p.createCanvas(canvasDimension.width, canvasDimension.height);
    if (mainDiv) {
      canvas.parent(mainDiv);
    }
    const { width, height}  = createRandomNumber();
    position.x = width;
    position.y = height;
  }

  p.draw = () => {
    p.background(200);
    p.rect(position.x, position.y, 20, 20);
    keyPressed(p);
  }
});

function keyPressed(p: p5) {
  switch(p.keyCode) {
    case p.UP_ARROW:
      position.y--;
      break;
    case p.DOWN_ARROW:
      position.y++;
      break;
    case p.LEFT_ARROW:
      position.x--;
    break;
    case p.RIGHT_ARROW:
      position.x++;
    break;
  }
}

function createRandomNumber() {
  const width = Math.floor(Math.random() * 399) + 1;
  const height = Math.floor(Math.random() * 399) + 1;
  return {
    width,
    height
  }
}
 
