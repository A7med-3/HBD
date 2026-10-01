document.addEventListener("DOMContentLoaded", () => {
  applySiteConfig();
  spawnFloaters();
  burstConfetti(30);

  const cfg = SITE_CONFIG.memories;
  document.querySelector("[data-memories-heading]").textContent = cfg.heading;
  document.querySelector("[data-memories-intro]").textContent = cfg.intro;

  const gallery = document.querySelector("[data-gallery]");
  gallery.innerHTML = "";

  cfg.photos.forEach((photo, i) => {
    const src = `images/${photo.file}`;
    const card = document.createElement("article");
    card.className = "memory-card";
    card.innerHTML = `
      <div class="memory-img-wrap">
        <img src="${src}" alt="${photo.caption}" loading="lazy" data-photo="${i + 1}">
        <div class="placeholder-label" data-placeholder="${i + 1}">
          <span>📷 Photo ${i + 1}</span>
          <small>Add <strong>${photo.file}</strong> in the images folder</small>
        </div>
      </div>
      <div class="memory-body">
        <div class="memory-caption">${photo.caption}</div>
        <div class="memory-note">${photo.note}</div>
      </div>
    `;
    gallery.appendChild(card);

    const img = card.querySelector("img");
    const placeholder = card.querySelector("[data-placeholder]");
    img.addEventListener("load", () => {
      if (img.naturalWidth > 0) placeholder.style.display = "none";
    });
    img.addEventListener("error", () => {
      img.classList.add("is-missing");
    });
  });

  const close = SITE_CONFIG.closing;
  document.querySelector("[data-closing-title]").textContent = close.title;
  const pWrap = document.querySelector("[data-closing-paras]");
  pWrap.innerHTML = close.paragraphs.map((p) => `<p>${p}</p>`).join("");

  const finalEl = document.querySelector("[data-final-line]");
  const closingBtn = document.querySelector("[data-closing-btn]");
  finalEl.textContent = close.finalLine;
  closingBtn.textContent = close.buttonText;

  closingBtn.addEventListener("click", () => {
    finalEl.classList.remove("is-hidden");
    finalEl.classList.add("is-visible");
    finalEl.setAttribute("aria-hidden", "false");
    closingBtn.classList.add("is-used");
    burstConfetti(80);
    finalEl.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
