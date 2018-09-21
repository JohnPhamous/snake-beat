const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const UNIT_SIZE = 32;
const SOUNDTRACK = document.querySelector("#soundtrack");
const SCORE_VIEW = document.querySelector("#score");
const GAME_CONTAINER = document.querySelector("#game-container");
const ABOUT = document.querySelector("#about");
const blurKeyframes = [10, 20, 30, 40, 50];
let keyframePointer = 0;
let pointerDirection = 1;
const sizeKeyframes = [0.5, 0.6, 0.7, 0.8, 0.9];

// Used https://getsongbpm.com/tools/audio to get the BPM
// of the song
// then used http://guitargearfinder.com/guides/convert-ms-milliseconds-bpm-beats-per-minute-vice-versa/
// to convert to ms
// This is used so the snake moves in beat with the song
const BPM_TO_MS = 143 / 2;

document.addEventListener("keydown", getDirection);
let directionMoving = "RIGHT";

function getDirection(e) {
  if (e.key === "ArrowUp" && directionMoving !== "DOWN") directionMoving = "UP";
  else if (e.key === "ArrowDown" && directionMoving !== "UP")
    directionMoving = "DOWN";
  else if (e.key === "ArrowLeft" && directionMoving !== "RIGHT")
    directionMoving = "LEFT";
  else if (e.key === "ArrowRight" && directionMoving !== "LEFT")
    directionMoving = "RIGHT";
  else return;
}
let snake = [
  {
    x: 9 * UNIT_SIZE,
    y: 10 * UNIT_SIZE
  }
];

function spawnFood() {
  let newFood = {
    x: Math.floor(Math.random() * 17 + 1) * UNIT_SIZE,
    y: Math.floor(Math.random() * 15 + 3) * UNIT_SIZE
  };

  return newFood;
}
let food = spawnFood();

let score = 0;

function eatFood(snake, food) {
  if (snake.x === food.x && snake.y === food.y) {
    return true;
  }
  return false;
}

function checkBounds(snake) {
  if (
    snake.x < 0 ||
    snake.x > canvas.width - UNIT_SIZE ||
    snake.y <= -UNIT_SIZE ||
    snake.y >= canvas.height
  ) {
    endGame();
  }
}

function checkIntersection(head, snake) {
  snake.forEach(segment => {
    if (head.x === segment.x && head.y === segment.y) {
      endGame();
      return true;
    }
  });
  return false;
}

function endGame() {
  clearInterval(game);
  SOUNDTRACK.pause();
  SOUNDTRACK.currentTime = 0;
}

function speedUp(factor) {
  clearInterval(game);
  game = setInterval(draw, BPM_TO_MS / factor);
}

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

function draw() {
  if (SOUNDTRACK.currentTime === 0) {
    SOUNDTRACK.play();
  }
  if (SOUNDTRACK.currentTime > 21.5) {
    speedUp(2);
  }
  if (SOUNDTRACK.currentTime > 43) {
    speedUp(4);
  }

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawFood();

  let startingOpacity = 0.9;
  snake.forEach((segment, index) => {
    let segmentColor;

    if (index === 0) {
      segmentColor = "white";
      ctx.shadowBlur = 50;
      ctx.shadowColor = "white";
    } else {
      segmentColor = `rgba(255, 255, 255, ${startingOpacity})`;
      startingOpacity -= 0.05;
      ctx.shadowBlur = 0;
    }
    ctx.fillStyle = segmentColor;
    ctx.fillRect(segment.x, segment.y, UNIT_SIZE * 0.95, UNIT_SIZE * 0.95);
  });

  // updating the snake position
  let x = snake[0].x;
  let y = snake[0].y;

  if (eatFood(snake[0], food)) {
    score += 1;
    SCORE_VIEW.innerText = score;
    food = spawnFood();
  } else {
    snake.pop();
  }

  if (directionMoving === "UP") y -= UNIT_SIZE;
  else if (directionMoving === "DOWN") y += UNIT_SIZE;
  else if (directionMoving === "LEFT") x -= UNIT_SIZE;
  else if (directionMoving === "RIGHT") x += UNIT_SIZE;

  const newHead = {
    x,
    y
  };

  checkBounds(newHead);
  checkIntersection(newHead, snake);
  snake.unshift(newHead);
}

let game;

function startGame() {
  game = setInterval(draw, BPM_TO_MS);
  ABOUT.style = "display: none";
  GAME_CONTAINER.style = "display: block";
  keyframePointer = 0;
  pointerDirection = 1;
  directionMoving = "RIGHT";
}
