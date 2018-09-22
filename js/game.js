const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
// size of a tile
const UNIT_SIZE = 32;
const START_SCREEN = document.querySelector("#start-screen");
const GAME_SCREEN = document.querySelector("#game-screen");
const GAME_OVER_SCREEN = document.querySelector("#game-over");
let gameRunning = false;
let highScore;
let game;
let food;
let snake;
let score = 0;

function endGame() {
  clearInterval(game);
  SOUNDTRACK.pause();
  SOUNDTRACK.currentTime = 0;
  if (score > highScore) {
    highScore = score;
    setHighScore(highScore);
  }
  gameRunning = false;
  directionMoving = "RIGHT";
  GAME_OVER_SCREEN.style = "display: block";
  canvas.style = "opacity: 0.2";
}

function draw() {
  updateSound();
  drawBackground();
  drawFood();
  drawSnake(snake);

  let x = snake[0].x;
  let y = snake[0].y;

  if (eatFood(snake[0], food)) {
    score += 1;
    SCORE_VIEW.innerText = score;
    food = spawnFood();
    EAT_SOUND.volume = 0.2;
    EAT_SOUND.currentTime = 0;
    EAT_SOUND.play();
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

function startGame(e) {
  if ((!e || e.key === "Enter" || e.key === " ") && !gameRunning) {
    snake = createNewSnake();
    game = setInterval(draw, BPM_TO_MS);
    START_SCREEN.style = "display: none";
    GAME_SCREEN.style = "display: block";
    GAME_OVER_SCREEN.style = "display: none";
    canvas.style = "opacity: 1";
    gameRunning = true;
    highScore = getHighScore() || 0;
    HIGH_SCORE_VIEW.innerText = highScore;
    food = spawnFood();
  }
}

function goHome() {
  START_SCREEN.style = "display: block";
  GAME_SCREEN.style = "display: none";
}
