function applySiteConfig() {
  if (typeof SITE_CONFIG === "undefined") return;

  document.querySelectorAll("[data-her-name]").forEach((el) => {
    el.textContent = SITE_CONFIG.herName;
  });
  document.querySelectorAll("[data-your-name]").forEach((el) => {
    el.textContent = SITE_CONFIG.yourName;
  });
  document.querySelectorAll("[data-age]").forEach((el) => {
    el.textContent = String(SITE_CONFIG.birthdayAge);
  });

  if (SITE_CONFIG.herName) {
    document.title = document.title.replace(/Her Name/g, SITE_CONFIG.herName);
  }
}

function initCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  document.body.classList.add("has-custom-cursor");
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(dot);
  document.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
  });
}

function navigateWithFade(url) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = url;
  }, 700);
}

function startTogetherCounter(container) {
  if (!container || typeof SITE_CONFIG === "undefined") return;

  const met = new Date(SITE_CONFIG.metDate + "T00:00:00");

  function tick() {
    const now = new Date();
    let diff = now - met;
    if (diff < 0) diff = 0;

    const sec = Math.floor(diff / 1000) % 60;
    const min = Math.floor(diff / 60000) % 60;
    const hrs = Math.floor(diff / 3600000) % 24;
    const days = Math.floor(diff / 86400000);

    container.innerHTML = `
      <div class="counter-item"><strong>${days}</strong><span>days</span></div>
      <div class="counter-item"><strong>${hrs}</strong><span>hours</span></div>
      <div class="counter-item"><strong>${min}</strong><span>minutes</span></div>
      <div class="counter-item"><strong>${sec}</strong><span>seconds</span></div>
    `;
  }

  tick();
  setInterval(tick, 1000);
}

function spawnFloaters() {
  const icons = ["💖", "✨", "🌸", "💫", "🎂"];
  setInterval(() => {
    const el = document.createElement("div");
    el.className = "float-emoji";
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.bottom = "-2rem";
    el.style.fontSize = Math.random() * 14 + 18 + "px";
    el.style.animationDuration = Math.random() * 6 + 8 + "s";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 15000);
  }, 1200);
}

function typeText(element, text, speed = 45) {
  if (!element) return;
  let i = 0;
  element.textContent = "";
  function step() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    }
  }
  step();
}

function burstConfetti(count = 40) {
  const layer = document.querySelector(".confetti-layer") || document.body;
  const colors = ["#ff6b9d", "#e879f9", "#fcd34d", "#c4b5fd", "#fda4af"];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    const size = Math.random() * 8 + 6;
    piece.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: ${colors[i % colors.length]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      opacity: 0.9;
      border-radius: 2px;
      pointer-events: none;
      z-index: 0;
      transform: rotate(${Math.random() * 360}deg);
    `;
    layer.appendChild(piece);
    const fall = piece.animate(
      [
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translateY(${window.innerHeight + 20}px) rotate(${720 + Math.random() * 360}deg)`,
          opacity: 0.3,
        },
      ],
      { duration: 2500 + Math.random() * 2000, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
    );
    fall.onfinish = () => piece.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applySiteConfig();
  initCursor();
});
