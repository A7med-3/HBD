document.addEventListener("DOMContentLoaded", () => {
  applySiteConfig();

  const stack = document.querySelector("[data-reason-stack]");
  const btn = document.querySelector("[data-next-reason]");
  const progress = document.querySelector("[data-reason-progress]");
  const reasons = SITE_CONFIG.reasons;
  let index = 0;

  spawnFloaters();

  function showReason() {
    if (index >= reasons.length) return;

    const r = reasons[index];
    stack.innerHTML = `<div class="reason-card">${r.emoji} ${r.text}</div>`;
    progress.textContent = `${index + 1} of ${reasons.length}`;
    index++;

    if (index === reasons.length) {
      btn.textContent = SITE_CONFIG.closing.buttonText.replace("One more surprise", "See our photos");
      btn.textContent = "See our memories 📸";
      btn.onclick = () => navigateWithFade("memories.html");
    }
  }

  btn.addEventListener("click", () => {
    if (index < reasons.length) {
      showReason();
    } else {
      navigateWithFade("memories.html");
    }
  });

  progress.textContent = `Tap to begin — ${reasons.length} messages waiting`;
});
