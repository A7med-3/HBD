document.addEventListener("DOMContentLoaded", () => {
  const cfg = SITE_CONFIG.landing;
  const titleEl = document.querySelector("[data-landing-title]");
  const subEl = document.querySelector("[data-landing-sub]");
  const typingEl = document.querySelector("[data-typing]");
  const btn = document.querySelector("[data-enter]");

  if (titleEl) titleEl.innerHTML = `${cfg.title}, <span data-her-name></span>`;
  if (subEl) subEl.textContent = cfg.subtitle;
  applySiteConfig();

  startTogetherCounter(document.querySelector("[data-counter]"));
  spawnFloaters();
  burstConfetti(50);

  setTimeout(() => typeText(typingEl, cfg.typingLine), 600);

  if (btn) {
    btn.textContent = cfg.buttonText;
    btn.addEventListener("click", () => navigateWithFade("reasons.html"));
  }
});
