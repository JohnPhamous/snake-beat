// Used https://getsongbpm.com/tools/audio to get the BPM
// of the song
// then used http://guitargearfinder.com/guides/convert-ms-milliseconds-bpm-beats-per-minute-vice-versa/
// to convert to ms
// This is used so the snake moves in beat with the song
const BPM_TO_MS = 143 / 2;

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

function speedUp(factor) {
  clearInterval(game);
  game = setInterval(draw, BPM_TO_MS / factor);
}

function updateSound() {
  if (SOUNDTRACK.currentTime === 0) {
    SOUNDTRACK.play();
  }
  if (SOUNDTRACK.currentTime > 21.5) {
    speedUp(2);
  }
  if (SOUNDTRACK.currentTime > 43) {
    speedUp(4);
  }
}

function drawBackground() {
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
