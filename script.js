"use strict";

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 2;
let x = 5;
let y = 10;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 300, 150);

function drawBall() {
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

drawBall();
