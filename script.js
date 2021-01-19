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
const box = 10;
let snake = [];
snake[0] = { x: 50, y: 5 * box };
// snake[1] = { x: 3 * box, y: 5 * box };

let snakeDirection;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || (e.key == "ArrowRight" && snakeDirection != "left")) {
    snakeDirection = "right";
  } else if (
    e.key == "Left" ||
    (e.key == "ArrowLeft" && snakeDirection != "right")
  ) {
    snakeDirection = "left";
  } else if (
    e.key == "Up" ||
    (e.key == "ArrowUp" && snakeDirection != "down")
  ) {
    snakeDirection = "up";
  } else if (
    e.key == "Down" ||
    (e.key == "ArrowDown" && snakeDirection != "up")
  ) {
    snakeDirection = "down";
  }
}

window.onload = function () {
  var framesPerSecond = 15;
  setInterval(function () {
    drawEverything();
    moveEverything();
  }, 1000 / framesPerSecond);
};

function drawBoard() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(2, 7, 159)";
  for (let x = 0; x < bw; x += box) {
    for (let y = 0; y < bh; y += box) {
      ctx.strokeRect(x, y, box, box);
    }
  }
}
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

function drawEverything() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 300, 150);
  drawBoard();
  drawBall();
  drawSnake();
}

function moveEverything() {
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (snakeDirection == "right") {
    snakeX += box;
  } else if (snakeDirection == "left") {
    snakeX - +box;
  } else if (snakeDirection == "up") {
    snakeY - +box;
  } else if (snakeDirection == "down") {
    snakeY += box;
  }
  snake.pop();
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  snake.unshift(newHead);
}
