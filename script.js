// Xử lý slide
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Chuyển đổi slide mỗi 3 giây
setInterval(nextSlide, 3000);

// Hiệu ứng pháo hoa
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 2;
    this.speed = Math.random() * 5 + 3;
    this.angle = Math.random() * Math.PI * 2;
    this.life = Math.random() * 60 + 40;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let fireworks = [];

function spawnFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  for (let i = 0; i < 30; i++) {
    fireworks.push(new Firework(x, y, color));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks = fireworks.filter(firework => firework.life > 0);
  fireworks.forEach(firework => {
    firework.update();
    firework.draw();
  });

  if (Math.random() < 0.1) {
    spawnFirework();
  }

  requestAnimationFrame(animate);
}

animate();
