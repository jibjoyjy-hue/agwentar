// ความปลอดภัย: ตรวจคำเสี่ยงในเครื่อง, หน้าขอความช่วยเหลือ, ปุ่ม "ฉันไม่โอเค" และฝึกหายใจ 1 นาที
// รายการคำเสี่ยงต้องตรงกับ ai-proxy/worker.js และต้องให้ที่ปรึกษาทางคลินิกตรวจก่อนเปิดใช้จริง
// ข้อความที่ตรวจไม่ถูกส่งออกจากเครื่อง

const SAFETY_RISK_TERMS = [
  "อยากตาย", "ไม่อยากมีชีวิต", "ไม่อยากอยู่แล้ว", "ไม่อยากอยู่บนโลก", "ไม่อยากตื่นขึ้นมา",
  "ฆ่าตัวตาย", "ฆ่าตัวเอง", "จบชีวิต", "ปลิดชีพ", "ทำร้ายตัวเอง", "ทำร้ายร่างกายตัวเอง",
  "กรีดข้อมือ", "กรีดแขน", "กรีดตัวเอง", "กินยาเกินขนาด", "กินยาตาย", "กระโดดตึก",
  "โดนทำร้าย", "ถูกทำร้าย", "โดนตบตี", "ถูกตบตี", "โดนข่มขืน", "ถูกข่มขืน", "โดนล่วงละเมิด", "ถูกล่วงละเมิด", "โดนลวนลาม", "ถูกลวนลาม",
  "killmyself", "suicide", "suicidal", "wanttodie", "endmylife", "selfharm", "hurtmyself", "cutmyself",
  "beingabused", "someoneishurtingme",
];

function safetyNormalize(s) {
  return String(s || "").toLowerCase()
    .replace(/[\s​\-_.,!?'"]+/g, "")
    .replace(/(.)\1{2,}/g, "$1");
}
function safetyHasRisk(text) {
  const n = safetyNormalize(text);
  return SAFETY_RISK_TERMS.some(t => n.includes(t));
}

// ---------- หน้าตา ----------
(function injectSafetyStyles() {
  const css = `
  .sf-fab { position: fixed; left: 12px; bottom: 84px; z-index: 900; border: none; border-radius: 999px;
    padding: 8px 12px; font: 700 12px/1.2 inherit; font-family: inherit; color: #1e3a8a; background: #dbeafe;
    box-shadow: 0 4px 14px rgba(30, 58, 138, .25); cursor: pointer; }
  .sf-overlay { position: fixed; inset: 0; z-index: 3000; display: none; align-items: center; justify-content: center;
    background: rgba(15, 23, 42, .6); backdrop-filter: blur(6px); padding: 16px; }
  .sf-overlay.is-open { display: flex; }
  .sf-card { width: 100%; max-width: 380px; max-height: 92vh; overflow-y: auto; background: #fff; color: #1e293b;
    border-radius: 22px; padding: 20px 18px; text-align: center; font-family: inherit; }
  .sf-title { font-size: 19px; font-weight: 800; margin: 4px 0 6px; }
  .sf-text { font-size: 14px; line-height: 1.55; color: #475569; margin: 0 0 14px; }
  .sf-call { display: flex; align-items: center; gap: 10px; text-align: left; text-decoration: none; color: #0f172a;
    background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 14px; padding: 10px 12px; margin: 8px 0; }
  .sf-call b { font-size: 22px; color: #1d4ed8; min-width: 58px; }
  .sf-call small { display: block; color: #64748b; font-size: 12px; }
  .sf-btn { display: block; width: 100%; border: none; border-radius: 14px; padding: 11px; margin-top: 8px;
    font: 700 14px inherit; font-family: inherit; cursor: pointer; background: #1d4ed8; color: #fff; }
  .sf-btn.ghost { background: #f1f5f9; color: #334155; }
  .sf-note { font-size: 12px; color: #64748b; margin-top: 12px; }
  .sf-breath { width: 150px; height: 150px; margin: 18px auto; border-radius: 50%; background: radial-gradient(circle, #bfdbfe, #60a5fa);
    transform: scale(.55); transition: transform 4s ease-in-out; display: flex; align-items: center; justify-content: center;
    color: #1e3a8a; font-weight: 800; font-size: 15px; }
  .sf-breath.in { transform: scale(1); }
  @media (prefers-reduced-motion: reduce) { .sf-breath { transition: none; } }
  `;
  const el = document.createElement("style");
  el.textContent = css;
  document.head.appendChild(el);
})();

function safetyOverlay() {
  let ov = document.getElementById("safetyOverlay");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "safetyOverlay";
    ov.className = "sf-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.innerHTML = `<div class="sf-card" id="safetyCard"></div>`;
    document.body.appendChild(ov);
  }
  return ov;
}

function safetyStopSounds() {
  try { if (typeof stopAllHealingSounds === "function") stopAllHealingSounds(); } catch (e) {}
  try { if (typeof stopSettingsMusicTrack === "function") stopSettingsMusicTrack(); } catch (e) {}
}

let safetyBreathTimer = null;
function safetyClearBreath() {
  if (safetyBreathTimer) { clearInterval(safetyBreathTimer); safetyBreathTimer = null; }
}

const SAFETY_CALLS = `
  <a class="sf-call" href="tel:1323"><b>1323</b><span>สายด่วนสุขภาพจิต<small>กรมสุขภาพจิต · โทรฟรี 24 ชั่วโมง</small></span></a>
  <a class="sf-call" href="tel:1387"><b>1387</b><span>สายเด็ก<small>สำหรับเด็กและเยาวชนอายุต่ำกว่า 18 ปี · โทรฟรี</small></span></a>`;

// reason: "risk" = พบสัญญาณอันตราย, "button" = เด็กกดปุ่มเอง
function openSafetyHelp(reason) {
  safetyStopSounds();
  safetyClearBreath();
  const ov = safetyOverlay();
  const card = document.getElementById("safetyCard");
  const isRisk = reason === "risk";
  const premiumBtn = (typeof isPremiumMember === "function" && isPremiumMember())
    ? `<button type="button" class="sf-btn ghost" data-sf="premium">🩺 ใช้สิทธิ์พบจิตแพทย์</button>` : "";
  card.innerHTML = `
    <div style="font-size:40px">💙</div>
    <div class="sf-title">${isRisk ? "เราห่วงเธอนะ" : "ไม่เป็นไรนะ เราอยู่ตรงนี้"}</div>
    <p class="sf-text">${isRisk
      ? "สิ่งที่เธอเขียนสำคัญมาก เธอไม่ต้องรับมือคนเดียว ลองโทรคุยกับคนที่ช่วยได้จริง หรือบอกผู้ใหญ่ที่ไว้ใจตอนนี้เลยนะ"
      : "ความรู้สึกแบบนี้เกิดขึ้นได้ ลองหายใจช้า ๆ ด้วยกันสักนาที หรือคุยกับคนที่ช่วยได้"}</p>
    ${isRisk ? SAFETY_CALLS : ""}
    <button type="button" class="sf-btn" data-sf="breath">🫧 หายใจช้า ๆ 1 นาที</button>
    ${isRisk ? "" : SAFETY_CALLS}
    ${premiumBtn}
    <button type="button" class="sf-btn ghost" data-sf="close">ปิด</button>
    <div class="sf-note">ถ้าอยู่ในอันตรายตอนนี้ โทร 1669 (เจ็บป่วยฉุกเฉิน) หรือ 191 (เหตุด่วน)</div>`;
  card.onclick = (e) => {
    const act = e.target.closest("[data-sf]")?.dataset.sf;
    if (act === "breath") startSafetyBreathing();
    else if (act === "close") closeSafetyHelp();
    else if (act === "premium") { closeSafetyHelp(); if (typeof openPremiumModal === "function") openPremiumModal("member"); }
  };
  ov.classList.add("is-open");
}

function closeSafetyHelp() {
  safetyClearBreath();
  const ov = document.getElementById("safetyOverlay");
  if (ov) ov.classList.remove("is-open");
}

// หายใจเข้า 4 วินาที ออก 4 วินาที ประมาณ 1 นาที ไม่มีคะแนน ไม่มีเหรียญ
function startSafetyBreathing() {
  safetyClearBreath();
  const card = document.getElementById("safetyCard");
  card.innerHTML = `
    <div class="sf-title">หายใจไปด้วยกันนะ</div>
    <p class="sf-text">ดูวงกลม หายใจเข้าตอนมันขยาย หายใจออกตอนมันหด</p>
    <div class="sf-breath" id="sfBreath">หายใจเข้า</div>
    <div class="sf-text" id="sfLeft">เหลือ 60 วินาที</div>
    ${SAFETY_CALLS}
    <button type="button" class="sf-btn ghost" data-sf="close">พอแล้ว ปิด</button>`;
  const ball = document.getElementById("sfBreath");
  const left = document.getElementById("sfLeft");
  let sec = 60;
  let inhale = true;
  requestAnimationFrame(() => ball.classList.add("in"));
  safetyBreathTimer = setInterval(() => {
    sec -= 1;
    if (sec % 4 === 0) {
      inhale = !inhale;
      ball.classList.toggle("in", inhale);
      ball.textContent = inhale ? "หายใจเข้า" : "หายใจออก";
    }
    left.textContent = sec > 0 ? `เหลือ ${sec} วินาที` : "เก่งมากเลย 💙";
    if (sec <= 0) {
      safetyClearBreath();
      ball.classList.remove("in");
      ball.textContent = "🌿";
    }
  }, 1000);
}

// ปุ่ม "ฉันไม่โอเค" กดได้ทุกหน้า
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("safetyFab")) return;
  const b = document.createElement("button");
  b.type = "button";
  b.id = "safetyFab";
  b.className = "sf-fab";
  b.textContent = "💙 ฉันไม่โอเค";
  b.setAttribute("aria-label", "ฉันเครียดหรือไม่โอเค เปิดหน้าช่วยเหลือ");
  b.addEventListener("click", () => openSafetyHelp("button"));
  document.body.appendChild(b);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSafetyHelp();
});
