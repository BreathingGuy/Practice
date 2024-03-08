var canvas = document.getElementById('canvas'); 
var particles = []; 
function loop() { 
  window.requestAnimationFrame(loop); 
  createParticles(); 
  updateParticles(); 
  killParticles(); 
  drawParticles(); 
} 
window.requestAnimationFrame(loop);

function createParticles() {
  if (particles.length < 100) {
    particles.push({
      x: Math.random()*canvas.width,
      y: 0,
      speed: 2 + Math.random() * 3,
      radius: 5 + Math.random() * 5,
      color: "white"
    })
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].y += particles[i].speed;
  }
}

function killParticles () {
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].y > canvas.height) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    var part = particles[i]; 
    ctx.beginPath(); 
    ctx.arc(part.x,part.y, part.radius, 0, Math.PI*2); 
    ctx.closePath(); 
    ctx.fillStyle = part.color; 
    ctx.fill(); 
  }
}