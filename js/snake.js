function createNewSnake() {
  return [
    {
      x: 9 * UNIT_SIZE,
      y: 10 * UNIT_SIZE
    }
  ];
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

function drawSnake(snake) {
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
}
