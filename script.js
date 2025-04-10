const button = document.getElementById("askButton");
const question = document.getElementById("promQuestion");
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

button.addEventListener("click", () => {
  question.classList.add("visible");
  startConfetti();
});

// Confetti
let confetti = [];
const colors = ["#ffd700", "#ffffff", "#87ceeb", "#ff69b4", "#98fb98"];

function createConfettiPiece() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 10 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 6 + 2,
    drift: (Math.random() - 0.5) * 2
  };
}

function startConfetti() {
  confetti = Array.from({ length: 150 }, createConfettiPiece);
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((c) => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.speed;
    c.x += c.drift;
    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animate);
}
