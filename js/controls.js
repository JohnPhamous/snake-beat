document.addEventListener("keydown", startGame);
document.addEventListener("keydown", getDirection);
let directionMoving = "RIGHT";

const keyMappings = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  s: "DOWN",
  a: "LEFT",
  d: "RIGHT"
};

const complimentMappings = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT"
};

function getDirection(e) {
  const newDirection = keyMappings[e.key];
  const oldDirection = directionMoving;

  if (newDirection && newDirection !== complimentMappings[oldDirection]) {
    directionMoving = newDirection;
  }
}
