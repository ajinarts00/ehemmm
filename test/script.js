const revealBtn = document.getElementById("revealBtn");
const question = document.getElementById("question");
const yesBtn = document.querySelector(".yes");
const noBtn = document.querySelector(".no");
const result = document.getElementById("result");

// Reveal question
revealBtn.addEventListener("click", () => {
  revealBtn.style.display = "none";
  question.classList.remove("hidden");
});

// No button runs away (touch + mouse)
function moveNo() {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener("mouseover", moveNo);
noBtn.addEventListener("touchstart", moveNo);

// YES clicked 💖
yesBtn.addEventListener("click", () => {
  question.classList.add("hidden");
  result.classList.remove("hidden");
  startFireworks();
});


// 🎆 FIREWORKS (Canvas)
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let fireworks = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 5 + 2,
      radius: 2,
      life: 100
    });
  }
  fireworks.push(particles);
}

function drawFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((particles, index) => {
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
      ctx.fill();
    });

    fireworks[index] = particles.filter(p => p.life > 0);
  });

  fireworks = fireworks.filter(p => p.length > 0);
  requestAnimationFrame(drawFireworks);
}

function startFireworks() {
  drawFireworks();
  setInterval(createFirework, 500);
}