"use strict";
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 3;
let ballX = 150;
let ballY = 77;
let snakeSpeedX = 1;
let snakeSpeedY = 1;
let snakeX = 25;
let snakeY = 25;
let bw = 300;
let bh = 150;
const box = 10;

var framesPerSecond = 30;
setInterval(function () {
  drawEverything();
}, 1000 / framesPerSecond);

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
  let snake = [];
  snake[0] = { x: box, y: box };
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "green";
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
