// js/features/consent.js: หน้าขอความยินยอมผู้ปกครองตอนเปิดแอปครั้งแรก (การตัดสินใจข้อ 11)
//
// - แสดงครั้งแรก และแสดงใหม่เมื่อเปลี่ยน CONSENT_VERSION (เช่น เปลี่ยนผู้ให้บริการ AI)
// - การคุยกับ AI เป็นตัวเลือกแยก ผู้ปกครองไม่อนุญาตก็ใช้ส่วนอื่นได้ตามปกติ
// - บันทึกแค่วันที่ยินยอม เวอร์ชัน และการอนุญาต AI ในเครื่องนี้ ไม่ส่งออกไปไหน
// ข้อความนี้ควรให้ผู้รู้กฎหมาย (PDPA) ตรวจก่อนเปิดใช้จริง

const CONSENT_VERSION = 1;
// ชื่อผู้ให้บริการ AI ที่ใช้จริง (ใส่เมื่อเลือกแล้ว) และลิงก์นโยบายความเป็นส่วนตัวของแอป (ถ้ามี)
const CONSENT_AI_PROVIDER = "";
const CONSENT_PRIVACY_URL = "";

function consentNeeded() {
  return !state.consent || state.consent.version !== CONSENT_VERSION;
}
function aiAllowed() {
  return !!(state.consent && state.consent.ai);
}

(function injectConsentStyles() {
  const el = document.createElement("style");
  el.textContent = `
  .cs-overlay { position: fixed; inset: 0; z-index: 2900; display: flex; align-items: center; justify-content: center;
    background: rgba(15, 23, 42, .55); backdrop-filter: blur(6px); padding: 14px; }
  .cs-card { width: 100%; max-width: 460px; max-height: 94vh; overflow-y: auto; background: #fff; color: #1e293b;
    border-radius: 22px; padding: 20px 18px; font-family: inherit; }
  .cs-card h2 { font-size: 19px; margin: 0 0 4px; text-align: center; }
  .cs-card h3 { font-size: 14px; margin: 16px 0 6px; color: #4c1d95; }
  .cs-card p, .cs-card li { font-size: 13px; line-height: 1.6; color: #475569; margin: 0; }
  .cs-card ul { padding-left: 18px; margin: 4px 0 0; display: flex; flex-direction: column; gap: 4px; }
  .cs-box { background: #f5f3ff; border-radius: 14px; padding: 12px; margin-top: 12px; }
  .cs-check { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; line-height: 1.5; color: #1e293b; margin-top: 10px; cursor: pointer; }
  .cs-check input { width: 18px; height: 18px; margin-top: 2px; flex: none; }
  .cs-btn { display: block; width: 100%; border: none; border-radius: 14px; padding: 12px; margin-top: 14px;
    font: 700 15px inherit; font-family: inherit; background: #7c3aed; color: #fff; cursor: pointer; }
  .cs-btn:disabled { opacity: .45; cursor: default; }
  .cs-note { font-size: 11.5px; color: #64748b; text-align: center; margin-top: 10px; }
  `;
  document.head.appendChild(el);
})();

function openConsent() {
  if (document.getElementById("consentOverlay")) return;
  const provider = CONSENT_AI_PROVIDER ? `ผู้ให้บริการ AI (${CONSENT_AI_PROVIDER})` : "ผู้ให้บริการ AI ภายนอก";
  const ov = document.createElement("div");
  ov.id = "consentOverlay";
  ov.className = "cs-overlay";
  ov.setAttribute("role", "dialog");
  ov.setAttribute("aria-modal", "true");
  ov.innerHTML = `
    <div class="cs-card">
      <div style="text-align:center;font-size:36px">🐰</div>
      <h2>ก่อนเริ่มใช้ Gwentar</h2>

      <h3>สำหรับน้อง ๆ</h3>
      <ul>
        <li>Gwentar เป็นเพื่อนช่วยดูแลใจ ไม่ใช่หมอหรือนักจิตวิทยา</li>
        <li>ถ้ารู้สึกไม่โอเค กดปุ่ม 💙 ได้ทุกเมื่อ จะมีเบอร์โทรของคนที่ช่วยได้ (1323, 1387)</li>
        <li>ไม่ต้องบอกชื่อจริง ที่อยู่ เบอร์โทร หรือชื่อโรงเรียนในแอปนะ</li>
      </ul>

      <h3>สำหรับผู้ปกครอง: ข้อมูลของน้องอยู่ที่ไหน</h3>
      <ul>
        <li>ไดอารี่ ผลแบบประเมิน และข้อมูลในเกม <b>เก็บในเครื่องนี้เท่านั้น</b> ไม่ได้ส่งให้ใคร ล้างข้อมูลเบราว์เซอร์แล้วจะหายไป</li>
        <li>ถ้าน้องเขียนข้อความที่มีสัญญาณอันตราย แอปจะแสดงเบอร์สายด่วนให้น้อง <b>แต่จะไม่แจ้งผู้ปกครองอัตโนมัติ</b></li>
        <li>สมาชิกพรีเมียม: เราเก็บแค่รหัสโค้ดและตั๋วพบจิตแพทย์ ไม่เก็บชื่อของน้อง</li>
      </ul>

      <div class="cs-box">
        <p><b>การคุยกับ AI (เกวนทาร์)</b><br>
        ข้อความที่น้องพิมพ์คุยกับ AI จะส่งผ่านเซิร์ฟเวอร์ของเราไปยัง${provider}เพื่อสร้างคำตอบ เซิร์ฟเวอร์ของเราไม่เก็บข้อความ แต่ผู้ให้บริการ AI อาจเก็บตามเงื่อนไขของผู้ให้บริการ AI ตอบผิดได้ และไม่ใช่คำแนะนำทางการแพทย์</p>
        <label class="cs-check"><input type="checkbox" id="csAi"> อนุญาตให้น้องคุยกับ AI (ไม่อนุญาตก็ใช้ส่วนอื่นได้ตามปกติ)</label>
      </div>

      <label class="cs-check"><input type="checkbox" id="csParent"> ฉันเป็นผู้ปกครอง ได้อ่านข้อมูลข้างบนแล้ว และยินยอมให้น้องใช้ Gwentar</label>
      <button type="button" class="cs-btn" id="csOk" disabled>เริ่มใช้งาน</button>
      ${CONSENT_PRIVACY_URL ? `<div class="cs-note"><a href="${CONSENT_PRIVACY_URL}" target="_blank" rel="noopener">อ่านนโยบายความเป็นส่วนตัวฉบับเต็ม</a></div>` : ""}
      <div class="cs-note">เปลี่ยนการอนุญาตคุยกับ AI ได้ภายหลังที่ ตั้งค่า</div>
    </div>`;
  document.body.appendChild(ov);
  const parent = ov.querySelector("#csParent");
  const ok = ov.querySelector("#csOk");
  if (state.consent) ov.querySelector("#csAi").checked = !!state.consent.ai;
  parent.addEventListener("change", () => { ok.disabled = !parent.checked; });
  ok.addEventListener("click", () => {
    state.consent = { version: CONSENT_VERSION, at: new Date().toISOString(), ai: ov.querySelector("#csAi").checked };
    if (typeof saveGameState === "function") saveGameState();
    ov.remove();
  });
}

// ให้หน้าตั้งค่าเรียกได้ เพื่อเปลี่ยนการอนุญาต AI
function openConsentSettings() { openConsent(); }

window.addEventListener("load", () => {
  if (consentNeeded()) setTimeout(openConsent, 300);
});
