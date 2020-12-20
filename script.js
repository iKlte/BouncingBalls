const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



const section = document.querySelector('.ballCount');
let para1 = document.createElement('p');
para1.classList.add('count');

let CountInfo = 25;
para1.textContent = CountInfo;



function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = new Boolean();
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
  Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size && balls[j].exists == true &&this.exists == true) {



        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}
}

let balls = [];

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );
  
  balls.push(ball);
}


function Ball(x, y, velX, velY, color, size, exists){
  Shape.call(this, x, y, velX, velY);
  this.color = color;
  this.size = size;
  this.exists = true;
}






let evilBall = new EvilCircle(10, 10, 4, 4,20,20,'white', 10, true);
function EvilCircle(x, y, velX, velY, color, size, exists){
  Shape.call(this, x, y, 20, 20, exists);
  this.color = 'white';
  this.size = 10;

}


EvilCircle.prototype.draw = function() {
  ctx.beginPath(3);
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x = -(this.x);
  }

  if ((this.x - this.size) <= 0) {
    this.x = -(this.x);
  }

  if ((this.y + this.size) >= height) {
    this.y = -(this.y);
  }

  if ((this.y - this.size) <= 0) {
    this.y = -(this.y);
  }

let _this = this;
window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }

  EvilCircle.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j].exists)) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.size + balls[j].size && balls[j].exists == true) {
        balls[j].exists = false;
        balls[j].color = 'white';
        CountInfo = CountInfo - 1;
        para1.textContent = CountInfo;

      }
    }
  }
}
}






function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();

  }
  requestAnimationFrame(loop);
}
loop();

section.appendChild(para1);
