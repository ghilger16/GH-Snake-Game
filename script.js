"use strict";
const WIDTH = 300;
const HEIGHT = 150;
const GRID_UNIT = 10;

let score = 0;
let highScore = localStorage.getItem("highScore");

let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");

let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("high-score");
let playAgainBtn = document.getElementById("play-again-btn");

let food = {
  x: Math.floor((Math.random() * WIDTH) / GRID_UNIT) * GRID_UNIT,
  y: Math.floor((Math.random() * HEIGHT) / GRID_UNIT) * GRID_UNIT,
};

let snake = {
  body: [
    { x: 5 * GRID_UNIT, y: 5 * GRID_UNIT },
    { x: 5 * GRID_UNIT, y: 5 * GRID_UNIT },
    { x: 5 * GRID_UNIT, y: 5 * GRID_UNIT },
    { x: 5 * GRID_UNIT, y: 5 * GRID_UNIT },
  ],
  direction: undefined,
};

setInterval(gamePlay, 1000 / 8);

playAgainBtn.addEventListener("click", () => document.location.reload());

document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e) {
  switch (e.key) {
    case "ArrowRight":
      if (snake.direction !== "left") snake.direction = "right";
      break;
    case "ArrowLeft":
      if (snake.direction !== "right") snake.direction = "left";
      break;
    case "ArrowUp":
      if (snake.direction !== "down") snake.direction = "up";
      break;
    case "ArrowDown":
      if (snake.direction !== "up") snake.direction = "down";
      break;
    case "Enter":
      document.location.reload();
      break;
  }
  document.querySelector(".game-instructions-modal").classList.add("hidden");
}

function gamePlay() {
  drawEverything();
  moveEverything();
  if (boundaryDetection()) gameOver();
  updateScore();
}

function drawEverything() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  drawSnake();
  drawFood();
}
function moveEverything() {
  if (!boundaryDetection()) {
    switch (snake.direction) {
      case "right":
        snake.body[0].x += GRID_UNIT;
        break;
      case "left":
        snake.body[0].x -= GRID_UNIT;
        break;
      case "up":
        snake.body[0].y -= GRID_UNIT;
        break;
      case "down":
        snake.body[0].y += GRID_UNIT;
        break;
    }

    snake.body.pop();
    let snakeHead = {
      x: snake.body[0].x,
      y: snake.body[0].y,
    };
    snake.body.unshift(snakeHead);

    if (snake.body[0].x == food.x && snake.body[0].y == food.y) {
      score++;
      snake.body.unshift(snakeHead);
      food = {
        x: Math.floor((Math.random() * WIDTH) / GRID_UNIT) * GRID_UNIT,
        y: Math.floor((Math.random() * HEIGHT) / GRID_UNIT) * GRID_UNIT,
      };
    }
  }
}
function boundaryDetection() {
  if (
    snake.body[0].x > WIDTH - GRID_UNIT ||
    snake.body[0].x < 0 ||
    snake.body[0].y > HEIGHT - GRID_UNIT ||
    snake.body[0].y < 0
  ) {
    return true;
  }
  for (let i = 4; i < snake.body.length; i++) {
    if (
      snake.direction &&
      snake.body[i].x === snake.body[0].x &&
      snake.body[i].y === snake.body[0].y
    )
      return true;
  }
}
function gameOver() {
  document.querySelector(".game-over-modal").classList.remove("hidden");
  const newBest = document.querySelector(".new-best");

  document.body.classList.add("noscroll");

  if (highScore !== null || highScore === null) {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      newBest.textContent = `CONGRATULATIONS! \n NEW HIGH SCORE: \n ${score}`;
      newBest.classList.remove("hidden");
      document.querySelector(".trophy").classList.remove("hidden");
    }
  } else {
    localStorage.setItem("highScore", score);
  }
}
function updateScore() {
  scoreDisplay.textContent = `Score ${score}`;
  if (highScore) {
    highScoreDisplay.textContent = `High Score ${highScore}`;
  }
}

function drawSnake() {
  for (let i = 0; i < snake.body.length; i++) {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(snake.body[i].x, snake.body[i].y, GRID_UNIT, GRID_UNIT);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake.body[i].x, snake.body[i].y, GRID_UNIT, GRID_UNIT);
    if (boundaryDetection()) {
      ctx.fillStyle = "red";
      ctx.fillRect(snake.body[i].x, snake.body[i].y, GRID_UNIT, GRID_UNIT);
    }
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, GRID_UNIT, GRID_UNIT);
}
