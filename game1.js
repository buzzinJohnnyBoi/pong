var fxJump = new Audio();
fxJump.src = `sound2.wav`;
fxJump.volume = 0.5;
var fxJump1 = new Audio();
fxJump1.src = `sound1.wav`;
fxJump1.volume = 0.5;

function playSoundHandler(event) {
  fxJump.play();
  fxJump.volume = 0.5;
  fxJump.loop = true;
}

function playSoundHandler1(event) {
  fxJump1.play();
  fxJump1.volume = 0.5;
  fxJump1.loop = true;
}

var ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = 900;
ctx.canvas.height = 900;

var Canvas = {
	width: ctx.canvas.width,
	height: ctx.canvas.height,
	Center: {
		x: ctx.canvas.width/2,
		y: ctx.canvas.height/2
	}
}

var Ball = {
  x: ctx.canvas.width/2,
  y: ctx.canvas.height - (Math.floor(Math.random() * 200 + 30)),
  xv: 5,
  yv: -5
}

var Paddle1 = {
  x: ctx.canvas.width - 20,
  y: 400,
  xv: 0,
  yv: 350
}

var Paddle2 = {
  x: 20,
  y: 400,
  xv: 20,
  yv: 350
}

var score1 = 0;
var score2 = 0;
window.addEventListener('keydown', (e) => {
	if (e.keyCode === 38) {Paddle1.yv = Paddle1.yv - 50; }
	if (e.keyCode === 40) {Paddle1.yv = Paddle1.yv + 50; }
  if (e.keyCode === 87) {Paddle2.yv = Paddle2.yv - 50;}
  if (e.keyCode === 83) {Paddle2.yv = Paddle2.yv + 50;}

});

ctx.fillStyle = "black";
ctx.fillRect(0, 0, Canvas.width, Canvas.height);
UpdateBall();
UpdatePaddles();
document.querySelector("h1").innerHTML = ` P1: ${score1}   P2: ${score2}`;

function start() {

  document.querySelector("button").style.display = "none";
setInterval(update, 1000/60);
}
function update() {

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, Canvas.width, Canvas.height);
  // Drawpladle();
  UpdateBall();
  UpdatePaddles();
  document.querySelector("h1").innerHTML = ` P1: ${score1}   P2: ${score2}`;
}

function UpdatePaddles() {
    Paddle1.y = Paddle1.yv;
    Paddle2.y = Paddle2.yv;


    drawPaddle1();
    drawPaddle2();
}



function UpdateBall() {
    Ball.x += Ball.xv;
    Ball.y += Ball.yv;

    if(Ball.y > ctx.canvas.height - 10 || Ball.y < 0) {
      bonuce();
      Ball.y -= Ball.yv;
      Ball.yv *= -1;
    }
    if( Ball.x < -100) {
      dead(5);
      score2++;
    }

    if(Ball.x > ctx.canvas.width + 100) {
      dead(-5);
      score1++;
    }

    if(Ball.x + 10 >= Paddle1.x && Ball.x + 10 <= Paddle1.x + 10) {
      if (Ball.y >= Paddle1.y && Ball.y <= Paddle1.y + 100) {
        bonuce();
      Ball.x -= Ball.xv;
      Ball.xv *= (-1 * ((Math.floor(Math.random() * 20 + 90)) / 100));
      console.log(Ball.xv);
      }
    }

    if(Ball.x + 10 >= Paddle2.x && Ball.x + 10 <= Paddle2.x + 10) {
      if (Ball.y >= Paddle2.y && Ball.y <= Paddle2.y + 100) {
        bonuce();
      Ball.x -= Ball.xv;
      Ball.xv *= (-1 * ((Math.floor(Math.random() * 20 + 90)) / 100));
      console.log(Ball.xv);
      }
    }
  drawBall();
  drawLine();

}

function bonuce() {
  fxJump.loop = false; fxJump.pause(); fxJump.currentTime = 0; fxJump.play();
}

function drawBall() {
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.lineWidth = 3;
		ctx.lineCap = "round";
		ctx.fillStyle = "rgba(212, 8, 221, 0.3)";
		ctx.rect(Ball.x, Ball.y, 10, 10);
		ctx.fill();
		ctx.stroke();
}

function drawPaddle1() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.moveTo(Paddle1.x, Paddle1.y);
  ctx.lineTo(Paddle1.x, Paddle1.y  + 100);
  ctx.fill();
  ctx.stroke();
}

function drawPaddle2() {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.moveTo(Paddle2.x, Paddle2.y);
  ctx.lineTo(Paddle2.x, Paddle2.y  + 100);
  ctx.fill();
  ctx.stroke();
}

function drawLine() {
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.lineWidth = 3;
		ctx.lineCap = "round";
    ctx.moveTo(ctx.canvas.width/2, 0);
    ctx.lineTo(ctx.canvas.width/2, ctx.canvas.height);
		ctx.fill();
		ctx.stroke();
}

function dead(which) {
  Ball.x = ctx.canvas.width/2;
  Ball.xv = which;
  Ball.y = ctx.canvas.height - (Math.floor(Math.random() * 450 + 30))
  Ball.yv = -5;
    fxJump1.loop = false; fxJump1.pause(); fxJump1.currentTime = 0; fxJump1.play();
}
