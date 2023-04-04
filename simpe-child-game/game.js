// Set the game time in seconds
const GAME_TIME = 10;

let score = 0;
let timeLeft = GAME_TIME;

const fruit = document.getElementById("fruit");
const startBtn = document.getElementById("start-btn");

function handleClick() {
  score++;
  updateScore();
}

function updateScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
}

function resetGame() {
  score = 0;
  timeLeft = GAME_TIME;
  updateScore();
  startBtn.textContent = "Start";
  fruit.removeEventListener("click", handleClick);
}

function updateTime() {
  document.getElementById("time").textContent = `Time left: ${timeLeft}`;
  timeLeft--;
  if (timeLeft < 0) {
    resetGame();
  }
}

startBtn.addEventListener("click", () => {
  startBtn.textContent = "Playing...";
  fruit.addEventListener("click", handleClick);
  setInterval(updateTime, 1000);

});

updateScore();