/* =========================================================
   Birthday Festival - Shared JS helpers
   ========================================================= */

/* ---- NAV: highlight current + mobile toggle ---- */
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) toggle.addEventListener("click", () => links.classList.toggle("open"));
})();

/* ---- REVEAL on scroll ---- */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
})();

/* ---- FLOATING DECORATIONS (sparkles, hearts, flowers) ---- */
window.spawnFloaters = function (emojis = ["✨", "🌸", "🎀", "⭐", "🎈", "💫"], count = 18) {
  const wrap = document.querySelector(".floaters");
  if (!wrap) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "floater";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 100 + "%";
    el.style.fontSize = (18 + Math.random() * 28) + "px";
    el.style.animationDelay = (-Math.random() * 14) + "s";
    el.style.animationDuration = (10 + Math.random() * 10) + "s";
    el.style.opacity = 0.4 + Math.random() * 0.5;
    wrap.appendChild(el);
  }
};

/* ---- CONFETTI BURST ---- */
window.confettiBurst = function (x, y) {
  const canvas = document.getElementById("confettiCanvas") || (() => {
    const c = document.createElement("canvas");
    c.id = "confettiCanvas"; c.className = "fx-canvas";
    document.body.appendChild(c);
    return c;
  })();
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth; canvas.height = innerHeight;
  const colors = ["#e89bb0", "#ffd6a5", "#d6b27a", "#caffbf", "#bdb2ff", "#ffc6ff"];
  const parts = [];
  const cx = x ?? innerWidth / 2;
  const cy = y ?? innerHeight / 2;
  for (let i = 0; i < 120; i++) {
    parts.push({
      x: cx, y: cy,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 1) * 12,
      g: 0.25,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 1
    });
  }
  let t = 0;
  function frame() {
    t++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.rot += p.vr; p.life -= 0.008;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx.restore();
    });
    if (t < 200) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  frame();
};

/* ---- COUNTDOWN ---- */
window.startCountdown = function (targetISO) {
  const root = document.querySelector(".countdown");
  if (!root) return;
  const target = new Date(targetISO).getTime();
  function tick() {
    let diff = target - Date.now();
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    const cells = root.querySelectorAll(".num");
    if (cells[0]) cells[0].textContent = String(d).padStart(2, "0");
    if (cells[1]) cells[1].textContent = String(h).padStart(2, "0");
    if (cells[2]) cells[2].textContent = String(m).padStart(2, "0");
    if (cells[3]) cells[3].textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
};
