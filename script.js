"use strict";
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let scoreDisplay = document.getElementById("score");
let highScoreDisplay = document.getElementById("highScore");
let playAgainBtn = document.getElementById("playAgainBtn");

let bw = 300;
let bh = 150;
const gridUnit = 10;

let food = {
  x: Math.floor((Math.random() * bw) / gridUnit) * gridUnit,
  y: Math.floor((Math.random() * bh) / gridUnit) * gridUnit,
};

let snake = [
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
];
let snakeX = snake[0].x;
let snakeY = snake[0].y;

let snakeDirection;

let score = 0;
let highScore = localStorage.getItem("highScore");

playAgainBtn.addEventListener("click", () => {
  document.location.reload();
});

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if (e.key == "ArrowRight" && snakeDirection != "left") {
    snakeDirection = "right";
  } else if (e.key == "ArrowLeft" && snakeDirection != "right") {
    snakeDirection = "left";
  } else if (e.key == "ArrowUp" && snakeDirection != "down") {
    snakeDirection = "up";
  } else if (e.key == "ArrowDown" && snakeDirection != "up") {
    snakeDirection = "down";
  }
}

window.onload = function () {
  let framesPerSecond = 9;
  setInterval(function () {
    drawEverything();
    moveEverything();
    if (boundaryDetection()) {
      gameOver();
    }
    scoreDisplay.textContent = `Score ${score}`;
    if (highScore) {
      highScoreDisplay.textContent = `High Score ${highScore}`;
    }
  }, 1000 / framesPerSecond);
};

function drawBoard() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(2, 7, 159)";
  for (let x = 0; x < bw; x += gridUnit) {
    for (let y = 0; y < bh; y += gridUnit) {
      ctx.strokeRect(x, y, gridUnit, gridUnit);
    }
  }
}
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(snake[i].x, snake[i].y, gridUnit, gridUnit);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, gridUnit, gridUnit);
    if (boundaryDetection()) {
      ctx.fillStyle = "red";
      ctx.fillRect(snake[i].x, snake[i].y, gridUnit, gridUnit);
    }
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridUnit, gridUnit);
}

function drawEverything() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 300, 150);
  drawBoard();
  drawSnake();
  drawFood();
}

function moveEverything() {
  if (!boundaryDetection()) {
    if (snakeDirection == "right") {
      snakeX += gridUnit;
      console.log(snakeX);
    } else if (snakeDirection == "left") {
      snakeX -= gridUnit;
      console.log(snakeX);
    } else if (snakeDirection == "up") {
      snakeY -= gridUnit;
    } else if (snakeDirection == "down") {
      snakeY += gridUnit;
    }
    snake.pop();
    let snakeHead = {
      x: snakeX,
      y: snakeY,
    };
    snake.unshift(snakeHead);

    if (snakeX == food.x && snakeY == food.y) {
      score++;
      snake.unshift(snakeHead);
      food = {
        x: Math.floor((Math.random() * bw) / gridUnit) * gridUnit,
        y: Math.floor((Math.random() * bh) / gridUnit) * gridUnit,
      };
    }
  }
}

function boundaryDetection() {
  if (
    snakeX > bw - gridUnit ||
    snakeX < 0 ||
    snakeY > bh - gridUnit ||
    snakeY < 0
  ) {
    return true;
  }
  for (let i = 4; i < snake.length; i++) {
    if (snakeDirection && snake[i].x === snakeX && snake[i].y === snakeY)
      return true;
  }
}

function gameOver() {
  document.querySelector(".gameOverModal").classList.remove("hidden");
  if (highScore !== null) {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
    }
  } else {
    localStorage.setItem("highScore", score);
  }
}
