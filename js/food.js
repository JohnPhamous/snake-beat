function spawnFood() {
  let newFood = {
    x: Math.floor(Math.random() * 17 + 1) * UNIT_SIZE,
    y: Math.floor(Math.random() * 15 + 3) * UNIT_SIZE
  };

  return newFood;
}

function eatFood(snake, food) {
  if (snake.x === food.x && snake.y === food.y) {
    return true;
  }
  return false;
}

const blurKeyframes = [10, 20, 30, 40, 50];
let keyframePointer = 0;
let pointerDirection = 1;
const sizeKeyframes = [0.5, 0.6, 0.7, 0.8, 0.9];

function drawFood() {
  let blurAmount;
  keyframePointer += pointerDirection;
  if (keyframePointer >= blurKeyframes.length || keyframePointer < 0) {
    pointerDirection *= -1;
    keyframePointer += pointerDirection;
  }
  blurAmount = blurKeyframes[keyframePointer];
  ctx.shadowBlur = blurAmount;
  ctx.shadowColor = "#00b7ff";
  ctx.fillStyle = "#00b7ff";

  let sizeOffset = sizeKeyframes[keyframePointer];
  ctx.fillRect(food.x, food.y, UNIT_SIZE, UNIT_SIZE);
}
