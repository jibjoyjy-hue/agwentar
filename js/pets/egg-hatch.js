// egg-hatch.js: ฟักไข่ด้วยการแตะและลากไข่ (แทนการทำเควส)
//   แตะไข่ 1 ครั้ง = +1 ความอุ่น, ลากไข่ทุก ๆ 60px = +1 ความอุ่น
//   ครบ EGG_HATCH_POINTS แล้วไข่แตก ออกมาเป็นเบบี๋ (เลเวล 1)
//   ไข่มีรอยร้าวเพิ่มขึ้นเรื่อย ๆ และมีแถบความคืบหน้าใต้ไข่
const EGG_HATCH_POINTS = 40;
const EGG_DRAG_STEP_PX = 80;
const EGG_TAP_MAX_MOVE = 10;

function eggIsActive() { return (state.level || 0) === 0; }
function eggWarmth() { return Math.min(EGG_HATCH_POINTS, state.eggWarmth || 0); }
function eggHatchPercent() { return Math.round(eggWarmth() / EGG_HATCH_POINTS * 100); }

// รอยร้าวบนไข่ ตามความคืบหน้า (0–3 ระดับ)
function eggCrackSvg(level) {
  const paths = [
    "M46 34 L52 42 L46 50 L54 58",
    "M30 64 L38 60 L42 68 L50 64 L56 72",
    "M60 40 L66 48 L60 56 L68 62 L62 70 L70 78",
  ].slice(0, level);
  return `<svg class="egg-cracks" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${paths.map(d => `<path d="${d}" fill="none" stroke="#9d174d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>`).join("")}</svg>`;
}

function eggDecorate(container) {
  container.querySelectorAll(".egg-cracks, .egg-meter").forEach(n => n.remove());
  if (!eggIsActive()) return;
  const pct = eggHatchPercent();
  const crack = pct >= 75 ? 3 : pct >= 50 ? 2 : pct >= 25 ? 1 : 0;
  if (crack) container.insertAdjacentHTML("beforeend", eggCrackSvg(crack));
  container.insertAdjacentHTML("beforeend",
    `<div class="egg-meter" aria-label="ความคืบหน้าการฟักไข่ ${pct}%"><div class="egg-meter-bar"><span style="width:${pct}%"></span></div><div class="egg-meter-text">แตะ/ลากไข่ ${pct}%</div></div>`);
}

function eggDecorateAll() {
  document.querySelectorAll(".dynamic-pet-display").forEach(eggDecorate);
}

// วาดรอยร้าวและแถบความคืบหน้าทุกครั้งที่วาดสัตว์เลี้ยงใหม่
if (typeof renderDynamicPets === "function") {
  const _eggOrigRender = renderDynamicPets;
  renderDynamicPets = function (...args) {
    const r = _eggOrigRender.apply(this, args);
    try { eggDecorateAll(); } catch (e) {}
    return r;
  };
}

function eggSpark(x, y, text) {
  const el = document.createElement("div");
  el.className = "egg-spark";
  el.textContent = text || ["✨", "💗", "⭐", "💫"][Math.floor(Math.random() * 4)];
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function eggJiggle(container) {
  const body = container.querySelector(".pet-body-img, .pet-body-main, .pet-egg-svg");
  if (!body) return;
  body.classList.remove("egg-jiggle");
  void body.offsetWidth; // เริ่มแอนิเมชันใหม่
  body.classList.add("egg-jiggle");
}

function eggAddWarmth(points, container, x, y) {
  if (!eggIsActive() || points <= 0) return;
  state.eggWarmth = Math.min(EGG_HATCH_POINTS, (state.eggWarmth || 0) + points);
  if (container) { eggJiggle(container); eggDecorate(container); }
  if (x !== undefined) eggSpark(x, y);
  if (state.eggWarmth >= EGG_HATCH_POINTS) eggHatch(x, y);
  else if (typeof updatePetBubbleText === "function" && state.eggWarmth % 5 === 0) updatePetBubbleText();
}

function eggHatch(x, y) {
  state.level = 1;
  state.exp = 0;
  state.eggWarmth = 0;
  const cx = x !== undefined ? x : innerWidth / 2, cy = y !== undefined ? y : innerHeight / 2;
  for (let i = 0; i < 10; i++) {
    setTimeout(() => eggSpark(cx + (Math.random() * 120 - 60), cy + (Math.random() * 80 - 40), ["🎉", "✨", "💖", "🌟"][i % 4]), i * 60);
  }
  if (typeof saveGameState === "function") saveGameState();
  if (typeof renderDynamicPets === "function") renderDynamicPets();
  if (typeof updatePetBubbleText === "function") updatePetBubbleText();
  if (typeof syncUI === "function") syncUI();
  setTimeout(() => alert(`🥚✨ ป๊อป! ไข่ฟักแล้ว! น้อง ${state.petName} ออกมาเป็นเบบี๋แล้วค่ะ 🍼\nดูแลน้องต่อไป แล้วน้องจะค่อย ๆ โตขึ้นตามเลเวลนะ`), 350);
}

// ฟังการแตะ/ลาก ในช่วง capture เพื่อให้ทำงานคู่กับการลากสัตว์เลี้ยงเดิม (posture-effects.js)
(function () {
  let active = null; // { container, startX, startY, lastX, lastY, moved, dragAcc }
  document.addEventListener("pointerdown", (e) => {
    if (!eggIsActive()) return;
    const c = e.target.closest && e.target.closest(".dynamic-pet-display");
    if (!c || c.getAttribute("data-state") === "dressing") return;
    active = { container: c, startX: e.clientX, startY: e.clientY, lastX: e.clientX, lastY: e.clientY, moved: 0, dragAcc: 0 };
  }, true);
  document.addEventListener("pointermove", (e) => {
    if (!active || !eggIsActive()) return;
    const d = Math.hypot(e.clientX - active.lastX, e.clientY - active.lastY);
    active.lastX = e.clientX; active.lastY = e.clientY;
    active.moved += d; active.dragAcc += d;
    while (active.dragAcc >= EGG_DRAG_STEP_PX && eggIsActive()) {
      active.dragAcc -= EGG_DRAG_STEP_PX;
      eggAddWarmth(1, active.container, e.clientX, e.clientY);
    }
  }, true);
  const end = (e) => {
    if (!active) return;
    const a = active; active = null;
    if (e.type === "pointerup" && a.moved < EGG_TAP_MAX_MOVE) eggAddWarmth(1, a.container, e.clientX, e.clientY);
    if (typeof saveGameState === "function") saveGameState();
  };
  document.addEventListener("pointerup", end, true);
  document.addEventListener("pointercancel", end, true);
})();
