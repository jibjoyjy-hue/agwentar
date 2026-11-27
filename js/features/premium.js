// สมาชิกพรีเมียม (รายปี)
// สมัคร: แอดไลน์แอดมิน → โอนเงิน/ส่งสลิป → แอดมินส่งโค้ด → กรอกโค้ดในเกม (เมนู "แลกโค้ด" หรือหน้าพรีเมียม)
// สิทธิ์หลัก: พบจิตแพทย์ฟรีปีละ 2 ครั้ง เลือกโรงพยาบาลแล้วรับตั๋วนัดได้
// ราคาสมาชิกรายปี (บาท) ตั้งเมื่อ 27 พ.ย. 2569
const PREMIUM_PRICE_PER_YEAR = 700; // ← ราคา (บาท/ปี)
const PREMIUM_FREE_VISITS_PER_YEAR = 2;
const PREMIUM_LINE_URL = "https://line.me/ti/p/XI8CFsVN3h"; // ลิงก์แอดไลน์แอดมิน (จาก QR)
const PREMIUM_LINE_QR = "assets/premium/line_qr.jpg";

// ---------- โค้ดพรีเมียม: PRM-XXXX-XXXX ----------
// โค้ดสร้างและตรวจที่ Cloudflare Worker (ai-proxy/worker.js) เท่านั้น เกมไม่มีวิธีสร้างโค้ดเอง
// แอดมินออกโค้ดจากหน้า premium_codes.html
function premiumApiUrl(path) {
  return (typeof AI_PROXY_URL === "string" ? AI_PROXY_URL : "https://agwentar-ai.jibjoyjy.workers.dev") + path;
}
async function premiumPost(path, body) {
  const r = await fetch(premiumApiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  return { status: r.status, data };
}
function normalizePremiumCode(raw) {
  const c = String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  return c.length === 11 && c.startsWith("PRM") ? `PRM-${c.slice(3, 7)}-${c.slice(7)}` : String(raw || "").trim().toUpperCase();
}
const PREMIUM_ERRORS = {
  bad_code: "รูปแบบโค้ดไม่ถูกต้อง ตรวจตัวอักษรอีกครั้ง",
  not_found: "ไม่พบโค้ดนี้ ตรวจตัวอักษรอีกครั้ง หรือทักแอดมินทางไลน์",
  expired: "โค้ดนี้หมดอายุแล้ว",
  revoked: "โค้ดนี้ถูกยกเลิกแล้ว ทักแอดมินทางไลน์",
  too_many: "โค้ดนี้ถูกใช้ครบจำนวนเครื่องแล้ว ทักแอดมินทางไลน์",
  too_many_tries: "ลองกรอกโค้ดหลายครั้งเกินไป ลองใหม่พรุ่งนี้นะ",
};
// ---- โค้ดทดลอง (ชั่วคราว) ----
// พิมพ์ iamaimee ในช่องแลกโค้ด = พรีเมียมทดลอง PREMIUM_TRIAL_DAYS วัน ตรวจในเครื่องเท่านั้น
// ได้ธีมพิเศษและสิทธิ์อื่นในแอป แต่รับตั๋วพบจิตแพทย์ไม่ได้ (ตั๋วออกจาก server ด้วยโค้ดจริงเท่านั้น)
// โค้ดนี้อยู่ในไฟล์ที่ใครก็เปิดดูได้ เลิกทดลองเมื่อไหร่ให้ตั้ง PREMIUM_TRIAL_CODE = ""
const PREMIUM_TRIAL_CODE = "iamaimee";
const PREMIUM_TRIAL_DAYS = 7;
function isPremiumTrial() {
  return !!(state.premium && state.premium.trial);
}
function redeemPremiumTrial() {
  if (isPremiumMember() && !isPremiumTrial()) return { ok: false, msg: "คุณเป็นสมาชิกพรีเมียมอยู่แล้ว" };
  const end = new Date(Date.now() + PREMIUM_TRIAL_DAYS * 864e5);
  state.premium = { plan: "trial", trial: true, start: new Date().toISOString(), end: end.toISOString(), code: "TRIAL" };
  premiumSave();
  return { ok: true, msg: `เปิดพรีเมียมทดลองแล้ว ถึง ${pDate(end)}` };
}

// คืน { ok, msg }
async function redeemPremiumCode(raw) {
  if (PREMIUM_TRIAL_CODE && String(raw || "").trim().toLowerCase().replace(/\s+/g, "") === PREMIUM_TRIAL_CODE) {
    return redeemPremiumTrial();
  }
  const code = normalizePremiumCode(raw);
  if (!/^PRM-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(code)) return { ok: false, msg: PREMIUM_ERRORS.bad_code };
  let res;
  try {
    res = await premiumPost("/premium/redeem", {
      code,
      startAfter: isPremiumMember() && state.premium.code !== code ? state.premium.end : undefined,
    });
  } catch (e) {
    return { ok: false, msg: "เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง" };
  }
  if (!res.data.ok) return { ok: false, msg: PREMIUM_ERRORS[res.data.error] || "ใช้โค้ดไม่ได้ ทักแอดมินทางไลน์" };
  state.premium = { plan: "yearly", start: res.data.start, end: res.data.end, code: res.data.code };
  state.premiumCodesUsed = (state.premiumCodesUsed || []).filter(c => c !== res.data.code).concat(res.data.code);
  premiumSave();
  return { ok: true, msg: `เปิดใช้พรีเมียมแล้ว ถึง ${pDate(res.data.end)}` };
}

const PREMIUM_BENEFITS = [
  { icon: "🩺", title: "พบจิตแพทย์ฟรี ปีละ 2 ครั้ง", desc: "เลือกโรงพยาบาลที่สะดวก แล้วรับตั๋วนัดได้ทันที" },
  { icon: "💎", title: "เพชรฟรีทุกเดือน", desc: "รับเพชรเข้ากระเป๋าอัตโนมัติทุกเดือน" },
  { icon: "🤖", title: "คุยกับเกวนทาร์ได้มากขึ้น", desc: "แชต AI ได้ยาวขึ้นและบ่อยขึ้น" },
  { icon: "👑", title: "ตราพรีเมียม", desc: "มีมงกุฎเล็ก ๆ ข้างชื่อน้อง" },
  { icon: "🎨", title: "ธีมพิเศษ", desc: "เปลี่ยนสีแอปได้ 6 แบบ ทั้งธีมมืด ป่า ท้องฟ้า และกาแล็กซี" },
];

// โรงพยาบาลตัวอย่าง (ชื่อสมมุติ) — เปลี่ยนเป็นโรงพยาบาลที่ร่วมโครงการจริงได้ภายหลัง
const PREMIUM_HOSPITALS = [
  { id: "h1", name: "โรงพยาบาลใจสบาย", area: "กรุงเทพฯ · บางนา", hours: "จ.–ศ. 09:00–16:00" },
  { id: "h2", name: "โรงพยาบาลรักษ์ใจ", area: "นนทบุรี · เมือง", hours: "จ.–ส. 08:30–15:30" },
  { id: "h3", name: "ศูนย์สุขภาพใจเชียงใหม่", area: "เชียงใหม่ · เมือง", hours: "จ.–ศ. 09:00–17:00" },
  { id: "h4", name: "โรงพยาบาลอุ่นใจขอนแก่น", area: "ขอนแก่น · เมือง", hours: "อ.–ส. 09:00–16:00" },
  { id: "h5", name: "คลินิกใจดีภูเก็ต", area: "ภูเก็ต · กะทู้", hours: "จ.–ศ. 10:00–18:00" },
];

let premiumView = "info";      // info | line | redeem | done | member | pick | ticket
let premiumCodeMsg = "";
let premiumPickedHospital = "";
let premiumLastTicket = null;

const pDate = (iso) => new Date(iso).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" });
function premiumPriceText() {
  return PREMIUM_PRICE_PER_YEAR ? `฿${Number(PREMIUM_PRICE_PER_YEAR).toLocaleString()} / ปี` : "ยังไม่กำหนดราคา · ทดลองสมัครได้ฟรี";
}
function isPremiumMember() {
  return !!(state.premium && state.premium.end && new Date(state.premium.end) > new Date());
}
function premiumTicketsThisTerm() {
  if (!isPremiumMember()) return [];
  // นับเฉพาะปีสมาชิกปัจจุบัน (ต่ออายุแล้วได้สิทธิ์ 2 ครั้งใหม่ทุกปี)
  const start = new Date(state.premium.start), now = new Date();
  let yearStart = new Date(start);
  while (true) { const next = new Date(yearStart); next.setFullYear(next.getFullYear() + 1); if (next > now) break; yearStart = next; }
  return (state.psyTickets || []).filter(t => new Date(t.issued) >= yearStart);
}
function premiumVisitsLeft() {
  if (isPremiumTrial()) return 0;   // โค้ดทดลองไม่มีสิทธิ์พบจิตแพทย์
  return Math.max(0, PREMIUM_FREE_VISITS_PER_YEAR - premiumTicketsThisTerm().length);
}
function premiumSave() {
  if (typeof saveGameState === "function") saveGameState();
  premiumUpdateBadge();
}
function premiumUpdateBadge() {
  const btn = document.querySelector(".premium-btn");
  if (btn) btn.classList.toggle("is-member", isPremiumMember());
  if (typeof applyThemeAccess === "function") applyThemeAccess();
}

function renderPremiumModal() {
  const box = document.getElementById("premiumModalBody");
  if (!box) return;
  if (isPremiumMember() && premiumView === "info") premiumView = "member";
  if (!isPremiumMember() && ["member", "pick", "ticket"].includes(premiumView)) premiumView = "info";

  const hero = (title, sub) => `
    <div class="premium-hero">
      <div class="premium-crown">👑</div>
      <div class="premium-title">${title}</div>
      <div class="premium-sub">${sub}</div>
    </div>`;
  const demo = `<div class="premium-demo">ชื่อโรงพยาบาลเป็นตัวอย่าง · แอดมินจะยืนยันวันเวลานัดให้ทางไลน์</div>`;
  const codeBox = `
      <label class="premium-code-label" for="premiumCodeInput">มีโค้ดจากแอดมินแล้ว? กรอกตรงนี้</label>
      <div class="premium-code-row">
        <input id="premiumCodeInput" class="premium-code-input" placeholder="PRM-XXXX-XXXX" autocomplete="off" autocapitalize="characters" spellcheck="false">
        <button type="button" class="premium-code-btn" data-act="redeem">ใช้โค้ด</button>
      </div>
      ${premiumCodeMsg ? `<div class="premium-code-msg">${premiumCodeMsg}</div>` : ""}`;

  if (premiumView === "info") {
    box.innerHTML = hero("Gwentar พรีเมียม", "สมาชิกรายปี ดูแลใจได้มากขึ้น") + `
      <div class="premium-price-wrap"><span class="premium-price ${PREMIUM_PRICE_PER_YEAR ? "" : "is-pending"}">${premiumPriceText()}</span></div>
      <ul class="premium-list">${PREMIUM_BENEFITS.map(b => `<li><span class="premium-li-icon">${b.icon}</span><span><b>${b.title}</b><br><small>${b.desc}</small></span></li>`).join("")}</ul>
      <button type="button" class="premium-cta" data-act="toLine">สมัครสมาชิกรายปีผ่าน LINE</button>
      <button type="button" class="premium-link" data-act="toRedeem">มีโค้ดแล้ว</button>`;
  } else if (premiumView === "line") {
    box.innerHTML = hero("สมัครผ่าน LINE", "คุยกับแอดมินได้เลย") + `
      <div class="premium-qr"><img src="${PREMIUM_LINE_QR}" alt="QR Code แอดไลน์แอดมิน" width="170" height="170"></div>
      <a class="premium-line-btn" href="${PREMIUM_LINE_URL}" target="_blank" rel="noopener">เพิ่มเพื่อนใน LINE</a>
      <ol class="premium-steps">
        <li>สแกน QR หรือกดปุ่มด้านบน เพื่อแอดไลน์แอดมิน</li>
        <li>พิมพ์ว่า <b>"สมัครพรีเมียม"</b> แอดมินจะแจ้งราคาและเลขบัญชี/พร้อมเพย์</li>
        <li>โอนเงินแล้วส่งสลิปให้แอดมิน</li>
        <li>รับ <b>โค้ดพรีเมียม</b> แล้วกรอกด้านล่าง</li>
      </ol>${codeBox}
      <button type="button" class="premium-link" data-act="toInfo">ย้อนกลับ</button>`;
  } else if (premiumView === "redeem") {
    box.innerHTML = hero("แลกโค้ด", "กรอกโค้ดพรีเมียมที่ได้จากแอดมิน") + codeBox + `
      <button type="button" class="premium-link" data-act="toLine">ยังไม่มีโค้ด? สมัครผ่าน LINE</button>`;
  } else if (premiumView === "done") {
    box.innerHTML = hero("เปิดใช้พรีเมียมแล้ว! 🎉", `เป็นสมาชิกถึง ${pDate(state.premium.end)}`) + `
      ${isPremiumTrial()
        ? `<p class="premium-text">ลองใช้ธีมพิเศษได้ที่ ตั้งค่า → ธีม (โค้ดทดลองรับตั๋วพบจิตแพทย์ไม่ได้)</p>`
        : `<p class="premium-text">ตอนนี้คุณพบจิตแพทย์ได้ฟรี <b>${PREMIUM_FREE_VISITS_PER_YEAR} ครั้ง</b> ในปีนี้ เลือกโรงพยาบาลเพื่อรับตั๋วได้เลย</p>
      <button type="button" class="premium-cta" data-act="toPick">🩺 เลือกโรงพยาบาลรับตั๋ว</button>`}
      <button type="button" class="premium-link" data-act="toMember">ไว้ทีหลัง</button>`;
  } else if (premiumView === "member") {
    const left = premiumVisitsLeft(), tickets = premiumTicketsThisTerm();
    box.innerHTML = hero(isPremiumTrial() ? "พรีเมียมทดลอง" : "คุณเป็นสมาชิกพรีเมียม", `หมดอายุ ${pDate(state.premium.end)}`) + `
      ${isPremiumTrial() ? `<div class="premium-text">โค้ดทดลองใช้ธีมพิเศษและสิทธิ์ในแอปได้ แต่รับตั๋วพบจิตแพทย์ไม่ได้ ต้องใช้โค้ดจริงจากแอดมิน</div>` : ""}
      <div class="premium-visits">
        <div class="premium-visits-num">${left}<small>/${PREMIUM_FREE_VISITS_PER_YEAR}</small></div>
        <div>สิทธิ์พบจิตแพทย์ฟรีที่เหลือในปีนี้</div>
      </div>
      <button type="button" class="premium-cta" data-act="toPick" ${left ? "" : "disabled"}>${left ? "🩺 เลือกโรงพยาบาลรับตั๋ว" : isPremiumTrial() ? "ต้องใช้โค้ดจริงจากแอดมิน" : "ใช้สิทธิ์ครบแล้วในปีนี้"}</button>
      ${tickets.length ? `<div class="premium-section">ตั๋วของฉัน</div>` + tickets.slice().reverse().map(t => ticketHtml(t, true)).join("") : ""}
      <div class="premium-text" style="margin-top:12px">ต่ออายุ: ทักแอดมินทางไลน์ แล้วกรอกโค้ดใหม่ ระยะเวลาจะต่อจากวันหมดอายุเดิม</div>
      <button type="button" class="premium-link" data-act="toLine">ติดต่อแอดมิน / ต่ออายุ</button>${demo}`;
  } else if (premiumView === "pick") {
    box.innerHTML = hero("เลือกโรงพยาบาล", `เหลือสิทธิ์ ${premiumVisitsLeft()} ครั้ง`) + `
      <div class="premium-hospitals" role="radiogroup" aria-label="โรงพยาบาล">
        ${PREMIUM_HOSPITALS.map(h => `
          <label class="premium-hospital ${premiumPickedHospital === h.id ? "is-picked" : ""}">
            <input type="radio" name="premiumHospital" id="ph_${h.id}" value="${h.id}" ${premiumPickedHospital === h.id ? "checked" : ""}>
            <span><b>${h.name}</b><br><small>📍 ${h.area} · 🕘 ${h.hours}</small></span>
          </label>`).join("")}
      </div>
      <button type="button" class="premium-cta" data-act="claim" ${premiumPickedHospital ? "" : "disabled"}>🎫 รับตั๋วฟรี</button>
      ${premiumCodeMsg ? `<div class="premium-code-msg">${premiumCodeMsg}</div>` : ""}
      <button type="button" class="premium-link" data-act="toMember">ย้อนกลับ</button>${demo}`;
  } else if (premiumView === "ticket") {
    box.innerHTML = hero("รับตั๋วเรียบร้อย", "แสดงตั๋วนี้ที่จุดลงทะเบียนของโรงพยาบาล") + ticketHtml(premiumLastTicket, false) + `
      <button type="button" class="premium-cta" data-act="toMember">เสร็จสิ้น</button>${demo}`;
  }

  box.querySelectorAll("[data-act]").forEach(el => (el.onclick = () => premiumAction(el.dataset.act)));
  const ci = document.getElementById("premiumCodeInput");
  if (ci) ci.addEventListener("keydown", (e) => { if (e.key === "Enter") premiumAction("redeem"); });
  box.querySelectorAll('input[name="premiumHospital"]').forEach(r => (r.onchange = () => { premiumPickedHospital = r.value; renderPremiumModal(); }));
}

function ticketHtml(t, small) {
  if (!t) return "";
  return `
    <div class="premium-ticket ${small ? "is-small" : ""}">
      <div class="premium-ticket-top"><span>🎫 ตั๋วพบจิตแพทย์ฟรี</span><span class="premium-ticket-tag">ครั้งที่ ${t.no}/${PREMIUM_FREE_VISITS_PER_YEAR}</span></div>
      <div class="premium-ticket-hosp">${t.hospital}</div>
      <div class="premium-ticket-meta">${t.area}</div>
      <div class="premium-ticket-code">${t.code}</div>
      <div class="premium-ticket-meta">รับเมื่อ ${pDate(t.issued)} · ใช้ได้ถึง ${pDate(t.expires)}</div>
    </div>`;
}

function premiumAction(act) {
  if (act !== "redeem") premiumCodeMsg = "";
  if (act === "toLine") premiumView = "line";
  else if (act === "toRedeem") premiumView = "redeem";
  else if (act === "redeem") {
    const inp = document.getElementById("premiumCodeInput");
    const btn = document.querySelector('[data-act="redeem"]');
    if (btn) { btn.disabled = true; btn.textContent = "กำลังตรวจ..."; }
    redeemPremiumCode(inp ? inp.value : "").then(r => {
      if (r.ok) { premiumCodeMsg = ""; premiumView = "done"; }
      else premiumCodeMsg = "⚠️ " + r.msg;
      renderPremiumModal();
    });
    return;
  }
  else if (act === "toInfo") premiumView = "info";
  else if (act === "toMember") premiumView = "member";
  else if (act === "toPick") { premiumPickedHospital = ""; premiumView = "pick"; }
  else if (act === "claim") {
    const h = PREMIUM_HOSPITALS.find(x => x.id === premiumPickedHospital);
    if (!h || !premiumVisitsLeft()) return;
    premiumPost("/premium/ticket", { code: state.premium.code, hospital: h.name }).then(res => {
      if (!res.data.ok) {
        premiumCodeMsg = res.data.error === "no_visits" ? "⚠️ ใช้สิทธิ์พบจิตแพทย์ครบแล้วในปีนี้" : "⚠️ รับตั๋วไม่ได้ ทักแอดมินทางไลน์";
        renderPremiumModal();
        return;
      }
      const tk = res.data.ticket;
      const t = { code: tk.id, hospital: h.name, area: h.area, issued: tk.issued, expires: tk.expires, no: tk.no };
      state.psyTickets = (state.psyTickets || []).concat(t);
      premiumLastTicket = t;
      premiumSave();
      premiumView = "ticket";
      renderPremiumModal();
    }).catch(() => { premiumCodeMsg = "⚠️ เชื่อมต่อไม่ได้ ลองใหม่อีกครั้ง"; renderPremiumModal(); });
    return;
  }
  renderPremiumModal();
}

function openPremiumModal(view) {
  const m = document.getElementById("premiumModal");
  if (!m) return;
  premiumCodeMsg = "";
  premiumView = view || (isPremiumMember() ? "member" : "info");
  renderPremiumModal();
  m.style.display = "flex";
}
// เมนู "แลกโค้ด" ในหน้าตั้งค่า
function openRedeemCode() { openPremiumModal("redeem"); }
function closePremiumModal() {
  const m = document.getElementById("premiumModal");
  if (m) m.style.display = "none";
}
document.addEventListener("DOMContentLoaded", () => setTimeout(premiumUpdateBadge, 300));
