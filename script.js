"use strict";
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 3;
let ballX = 150;
let ballY = 77;
let snakeSpeedX = 1;
let snakeSpeedY = 1;
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
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
  { x: 5 * gridUnit, y: 5 * gridUnit },
];

let snakeDirection;

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
  var framesPerSecond = 10;
  setInterval(function () {
    drawEverything();
    moveEverything();
    boundaryDetection();
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
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridUnit, gridUnit);
  console.log(food);
}

function drawEverything() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 300, 150);
  drawBoard();
  drawSnake();
  drawFood();
}

function moveEverything() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (snakeDirection == "right") {
    snakeX += gridUnit;
  } else if (snakeDirection == "left") {
    snakeX -= gridUnit;
  } else if (snakeDirection == "up") {
    snakeY -= gridUnit;
  } else if (snakeDirection == "down") {
    snakeY += gridUnit;
  }
  snake.pop();
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead);
}

function boundaryDetection() {
  for (let i = 4; i < snake.length; i++) {
    const snakeBoundary =
      snake[i].x === snake[0].x && snake[i].y === snake[0].y;
    if (snakeBoundary) {
      return true;
    }
    if()
  }
}
