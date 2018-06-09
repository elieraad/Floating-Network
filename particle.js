const canvas =document.getElementById("ctx");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const circle = 2 * Math.PI;
const size = 250;
const radius = 3;
const particleColor = "#00ff00";

let x;
let y;

let velX;
let velY;

class Particle {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.velX = Math.random() * 2 - 1,
    this.velY = Math.random() * 2 - 1
  }

  update() {
    if (this.x > width  || this.x < 0) {
      this.velX = -this.velX;
    }
    if (this.y > height || this.y < 0) {
      this.velY = -this.velY;
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = particleColor;
    ctx.arc(this.x, this.y, radius, 0, circle);
    ctx.fill();
  }

}

// Start
let particles = [];
let lastTime = Date.now();

function init() {
  console.log("initializing");
  for (let i = 0; i < size; i++) {
    particles[i] = new Particle(Math.random() * width , Math.random() * height);
  }
}

function update() {
  for (let index = 0; index < particles.length; index++) {
    particles[index].update();
  }
}



function  start() {
  const fps = 60;
  const second = 1000;
  const timePerFrame = second / fps;

  let delta = 0;
  let now;

  init();
  run();

  function run() {
    now = Date.now();
    delta += (now - lastTime)/timePerFrame;
    lastTime = now;
    if(delta >= 1) {
      ctx.clearRect(0, 0, width, height);
      draw();
      update();
      delta--;
    }
    requestAnimationFrame(run);
  }
}

function draw() {
  ctx.globalAlpha=1;
  ctx.clearRect(0,0,width,height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    ctx.beginPath();
    for (let j = particles.length - 1; j > i; j--) {
      let dist = Math.hypot(particles[i].x - particles[j].x,  particles[i].y - particles[j].y);
      if (dist < 100) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = particleColor;
        ctx.globalAlpha =1 -  (dist > 100 ? 0.8: dist / 100);
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
      }
    }
    ctx.stroke();
  }
}

start();
