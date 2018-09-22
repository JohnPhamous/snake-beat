const SCORE_VIEW = document.querySelector("#score");
const HIGH_SCORE_VIEW = document.querySelector("#high-score");

function setHighScore(highScore) {
  localStorage.setItem("highScore", JSON.stringify(highScore));
  HIGH_SCORE_VIEW.innerText = highScore;
}

function getHighScore() {
  return localStorage.getItem("highScore");
}
