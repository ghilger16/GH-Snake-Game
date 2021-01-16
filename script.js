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
let rightPressed = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

var framesPerSecond = 30;
setInterval(function () {
  drawEverything();

  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      snakeSpeedY = 0;
      snakeX = snakeX + snakeSpeedX;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
      snakeSpeedY = 0;
      snakeX = snakeX - snakeSpeedX;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
      snakeSpeedX = 0;
      snakeY = snakeY + snakeSpeedY;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
      snakeSpeedX = 0;
      snakeY = snakeY - snakeSpeedY;
    }
  }
}, 1000 / framesPerSecond);

function drawSnake() {
  ctx.beginPath();
  ctx.fillRect(snakeX, snakeY, 8, 5);
  ctx.fillStyle = "green";
  ctx.fill();
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
  drawBall();
  drawSnake();
}

// function moveEverything() {
//   function moveRight() {
//     snakeSpeedY = 0;
//     snakeX = snakeX + snakeSpeedX;
//   }
//   function moveLeft() {
//     snakeSpeedY = 0;
//     snakeX = snakeX - snakeSpeedX;
//   }
//   function moveDown() {
//     snakeSpeedX = 0;
//     snakeY = snakeY + snakeSpeedY;
//   }
//   function moveUp() {
//     snakeSpeedX = 0;
//     snakeY = snakeY - snakeSpeedY;
//   }
//   //   if (rightPressed) {
//   //     moveRight();
//   //   } else if (leftPressed) {
//   //     moveLeft();
//   //   } else if (downPressed) {
//   //     moveDown();
//   //   } else if (upPressed) {
//   //     moveUp();
//   //   }
// }
