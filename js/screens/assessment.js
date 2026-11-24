// js/screens/assessment.js: แบบประเมินที่มีแหล่งอ้างอิง (ST-5 และ PHQ-A ฉบับภาษาไทย)
//
// - ผลเก็บในเครื่องผู้ใช้เท่านั้น (state.assessmentHistory) ไม่ส่งออกไปไหน
// - เกณฑ์แปลผลและข้อความแนะนำต้องให้ที่ปรึกษาทางคลินิกตรวจก่อนเปิดใช้จริง
//   (ASSESSMENT_REVIEW.approvedBy ยังว่างอยู่ = ยังไม่ผ่านการตรวจ)
// - ผลการประเมินไม่ใช่การวินิจฉัยโรค

const ASSESSMENT_REVIEW = { approvedBy: null, approvedOn: null };

const ASSESSMENTS = {
  st5: {
    id: "st5",
    icon: "🌧️",
    title: "แบบประเมินความเครียด (ST-5)",
    short: "ความเครียด · 5 ข้อ",
    intro: "ในช่วง 2–4 สัปดาห์ที่ผ่านมา เธอมีอาการหรือความรู้สึกต่อไปนี้มากน้อยแค่ไหน",
    options: ["แทบไม่มี", "เป็นบางครั้ง", "บ่อยครั้ง", "เป็นประจำ"],
    items: [
      "มีปัญหาการนอน นอนไม่หลับหรือนอนมาก",
      "มีสมาธิน้อยลง",
      "หงุดหงิด กระวนกระวาย ว้าวุ่นใจ",
      "รู้สึกเบื่อ เซ็ง",
      "ไม่อยากพบปะผู้คน",
    ],
    max: 15,
    levels: [
      { min: 0, max: 4, label: "เครียดน้อย", tone: "ok" },
      { min: 5, max: 7, label: "เครียดปานกลาง", tone: "mid" },
      { min: 8, max: 9, label: "เครียดมาก", tone: "high" },
      { min: 10, max: 15, label: "เครียดมากที่สุด", tone: "high" },
    ],
    source: "กรมสุขภาพจิต กระทรวงสาธารณสุข · อรวรรณ ศิลปกิจ. แบบวัดความเครียดฉบับศรีธัญญา (ST-5). วารสารสุขภาพจิตแห่งประเทศไทย 2551;16(3)",
  },
  phqa: {
    id: "phqa",
    icon: "🌙",
    title: "แบบประเมินภาวะซึมเศร้าในวัยรุ่น (PHQ-A)",
    short: "อารมณ์เศร้า · 9 ข้อ",
    intro: "ในช่วง 2 สัปดาห์ที่ผ่านมา เธอมีอาการต่อไปนี้บ่อยแค่ไหน",
    options: ["ไม่มีเลย", "มีบางวัน", "มีมากกว่า 7 วัน", "มีแทบทุกวัน"],
    items: [
      "รู้สึกซึม เศร้า หงุดหงิด หรือสิ้นหวัง",
      "เบื่อ ไม่ค่อยสนใจหรือไม่เพลิดเพลิน เวลาทำสิ่งต่าง ๆ",
      "นอนหลับยาก รู้สึกง่วงทั้งวัน หรือนอนมากเกินไป",
      "ไม่อยากอาหาร น้ำหนักลด หรือกินมากกว่าปกติ",
      "รู้สึกเหนื่อยล้า หรือไม่ค่อยมีพลัง",
      "รู้สึกแย่กับตัวเอง หรือรู้สึกว่าตัวเองล้มเหลว หรือทำให้ตัวเองหรือครอบครัวผิดหวัง",
      "จดจ่อกับสิ่งต่าง ๆ ได้ยาก เช่น ทำการบ้าน อ่านหนังสือ หรือดูโทรทัศน์",
      "พูดหรือทำอะไรช้าลงมากจนคนอื่นสังเกตเห็นได้ หรือในทางตรงกันข้ามคือ กระสับกระส่ายหรือกระวนกระวาย จนต้องเคลื่อนไหวไปมามากกว่าปกติ",
      "คิดว่าถ้าตายไปเสียจะดีกว่า หรือคิดจะทำร้ายตัวเองด้วยวิธีใดวิธีหนึ่ง",
    ],
    riskItem: 8,         // ข้อ 9 (นับจาก 0) ตอบมากกว่า 0 = เปิดหน้าขอความช่วยเหลือทันที
    max: 27,
    levels: [
      { min: 0, max: 4, label: "ไม่มีภาวะซึมเศร้าหรือมีน้อยมาก", tone: "ok" },
      { min: 5, max: 9, label: "มีภาวะซึมเศร้าเล็กน้อย", tone: "mid" },
      { min: 10, max: 14, label: "มีภาวะซึมเศร้าปานกลาง", tone: "high" },
      { min: 15, max: 19, label: "มีภาวะซึมเศร้ามาก", tone: "high" },
      { min: 20, max: 27, label: "มีภาวะซึมเศร้ารุนแรง", tone: "high" },
    ],
    referAt: 10,          // คะแนนตั้งแต่ 10 แนะนำให้คุยกับผู้ใหญ่/ผู้เชี่ยวชาญ
    source: "สถาบันสุขภาพจิตเด็กและวัยรุ่นราชนครินทร์ กรมสุขภาพจิต (ฉบับภาษาไทย พ.ศ. 2560) · Panyawong W, Pavasuthipaisit C, Santitadakul R. คุณภาพของแบบประเมินภาวะซึมเศร้าในวัยรุ่น ฉบับภาษาไทย ในบริบทโรงเรียน. วารสารสุขภาพจิตแห่งประเทศไทย · ต้นฉบับ: Johnson JG, Harris ES, Spitzer RL, Williams JB (2002)",
  },
};

const ASSESSMENT_ADVICE = {
  st5: {
    ok: "ตอนนี้ความเครียดอยู่ในระดับที่รับมือได้ ดูแลตัวเองแบบนี้ต่อไปนะ นอนให้พอ และทำสิ่งที่ชอบบ้าง",
    mid: "ช่วงนี้มีความเครียดอยู่พอสมควร ลองพักบ้าง หายใจช้า ๆ ทำกิจกรรมที่ผ่อนคลาย หรือเล่าให้คนที่ไว้ใจฟัง",
    high: "ช่วงนี้เธอเครียดมาก ไม่ต้องรับมือคนเดียวนะ ลองคุยกับพ่อแม่ ครู หรือผู้ใหญ่ที่ไว้ใจ ถ้าอยากคุยกับผู้เชี่ยวชาญ โทร 1323 ได้ฟรี",
  },
  phqa: {
    ok: "ช่วงนี้อารมณ์ของเธอโดยรวมยังดีอยู่ ดูแลตัวเองแบบนี้ต่อไปนะ",
    mid: "ช่วงนี้เธออาจรู้สึกหม่น ๆ อยู่บ้าง ลองทำสิ่งที่ชอบ ออกไปเจอแดด หรือเล่าให้คนที่ไว้ใจฟัง ถ้ายังรู้สึกแบบนี้ต่อเนื่อง ลองทำแบบประเมินอีกครั้งในอีก 2 สัปดาห์",
    high: "สิ่งที่เธอรู้สึกอยู่ตอนนี้สำคัญ และไม่ใช่ความผิดของเธอ ควรคุยกับผู้ใหญ่ที่ไว้ใจหรือผู้เชี่ยวชาญนะ โทรปรึกษาได้ฟรีที่ 1323 หรือ 1387",
  },
};

// ---------- สถานะของหน้าจอ ----------
let asmCurrent = null;   // { id, answers: [] , idx }

function asmRoot() { return document.getElementById("assessmentRoot"); }
function asmEsc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

// เรียกจาก router ตอนเข้าหน้า 11
function initMoodTest() {
  asmCurrent = null;
  if (!state.ageBand) renderAgeStep();
  else renderAssessmentHome();
}

function renderAgeStep() {
  const root = asmRoot(); if (!root) return;
  root.innerHTML = `
    <div class="card asm-card">
      <div class="asm-title">ก่อนเริ่ม ขอถามอายุหน่อยนะ</div>
      <p class="asm-text">ใช้เลือกแบบประเมินที่เหมาะกับวัย คำตอบเก็บไว้ในเครื่องนี้เท่านั้น</p>
      <div class="asm-options">
        <button type="button" class="choice-btn" data-age="u10">10 ปีหรือน้อยกว่า</button>
        <button type="button" class="choice-btn" data-age="11to18">11–18 ปี</button>
        <button type="button" class="choice-btn" data-age="19plus">19 ปีขึ้นไป</button>
      </div>
    </div>`;
  root.querySelectorAll("[data-age]").forEach(b => b.addEventListener("click", () => {
    state.ageBand = b.dataset.age;
    if (typeof saveGameState === "function") saveGameState();
    renderAssessmentHome();
  }));
}

function renderAssessmentHome() {
  const root = asmRoot(); if (!root) return;
  const last = (state.assessmentHistory || []).slice(-3).reverse();
  const lastHtml = last.length ? `
    <div class="card asm-card">
      <div class="asm-sub">ผลล่าสุด</div>
      ${last.map(h => `<div class="asm-hist"><span>${asmEsc(ASSESSMENTS[h.id]?.short || h.id)}</span><span>${asmEsc(h.level)} · ${new Date(h.at).toLocaleDateString("th-TH", { day: "numeric", month: "short" })}</span></div>`).join("")}
    </div>` : "";

  if (state.ageBand === "u10") {
    root.innerHTML = `
      <div class="card asm-card">
        <div class="asm-title">เช็กอินอารมณ์วันนี้</div>
        <p class="asm-text">สำหรับวัยนี้ เราใช้การเลือกอารมณ์ในไดอารี่แทนแบบทดสอบ ลองบอกเกวนทาร์หน่อยว่าวันนี้รู้สึกอย่างไร</p>
        <button type="button" class="btn-gradient asm-wide" data-go="diary">📔 ไปเลือกอารมณ์ในไดอารี่</button>
      </div>
      <button type="button" class="asm-link" data-go="age">เปลี่ยนช่วงอายุ</button>`;
  } else {
    root.innerHTML = `
      <div class="card asm-card">
        <div class="asm-title">เลือกแบบประเมิน</div>
        <p class="asm-text">แบบประเมินเหล่านี้มาจากกรมสุขภาพจิต ผลที่ได้ช่วยให้รู้จักใจตัวเองมากขึ้น แต่ไม่ใช่การวินิจฉัยโรค</p>
        ${["st5", "phqa"].map(id => {
          const a = ASSESSMENTS[id];
          return `<button type="button" class="asm-pick" data-start="${id}"><span class="asm-pick-icon">${a.icon}</span><span><b>${asmEsc(a.title)}</b><small>${asmEsc(a.short)}</small></span></button>`;
        }).join("")}
      </div>
      ${lastHtml}
      <button type="button" class="asm-link" data-go="age">เปลี่ยนช่วงอายุ</button>`;
  }
  root.onclick = (e) => {
    const s = e.target.closest("[data-start]")?.dataset.start;
    const g = e.target.closest("[data-go]")?.dataset.go;
    if (s) startAssessment(s);
    else if (g === "age") renderAgeStep();
    else if (g === "diary") nav("screen-12");
    else if (g === "home") renderAssessmentHome();
    else if (g === "help") openSafetyHelp("button");
  };
}

function startAssessment(id) {
  asmCurrent = { id, answers: [], idx: 0 };
  renderAssessmentQuestion();
}

function renderAssessmentQuestion() {
  const root = asmRoot(); const a = ASSESSMENTS[asmCurrent.id];
  const i = asmCurrent.idx;
  root.innerHTML = `
    <div class="card asm-card">
      <div class="asm-sub">${asmEsc(a.title)} · ข้อ ${i + 1}/${a.items.length}</div>
      <div class="asm-progress"><div style="width:${Math.round(i / a.items.length * 100)}%"></div></div>
      <p class="asm-text">${asmEsc(a.intro)}</p>
      <div class="asm-q">${asmEsc(a.items[i])}</div>
      <div class="asm-options">
        ${a.options.map((o, v) => `<button type="button" class="choice-btn${asmCurrent.answers[i] === v ? " active" : ""}" data-v="${v}">${asmEsc(o)}</button>`).join("")}
      </div>
      <div class="asm-nav">
        <button type="button" class="asm-link" data-back>${i === 0 ? "ยกเลิก" : "← ข้อก่อนหน้า"}</button>
      </div>
    </div>`;
  root.onclick = (e) => {
    const b = e.target.closest("[data-v]");
    if (b) {
      asmCurrent.answers[i] = Number(b.dataset.v);
      if (asmCurrent.id === "phqa" && i === a.riskItem && asmCurrent.answers[i] > 0) {
        // ข้อเรื่องความคิดอยากตาย/ทำร้ายตัวเอง: เปิดหน้าขอความช่วยเหลือทันที แล้วค่อยให้ทำต่อ
        openSafetyHelp("risk");
      }
      if (i + 1 < a.items.length) { asmCurrent.idx++; renderAssessmentQuestion(); }
      else finishAssessment();
      return;
    }
    if (e.target.closest("[data-back]")) {
      if (i === 0) renderAssessmentHome();
      else { asmCurrent.idx--; renderAssessmentQuestion(); }
    }
  };
}

function finishAssessment() {
  const a = ASSESSMENTS[asmCurrent.id];
  const score = asmCurrent.answers.reduce((s, v) => s + v, 0);
  const level = a.levels.find(l => score >= l.min && score <= l.max) || a.levels[a.levels.length - 1];
  const risk = a.riskItem !== undefined && asmCurrent.answers[a.riskItem] > 0;
  const tone = risk ? "high" : level.tone;

  state.assessmentHistory = state.assessmentHistory || [];
  state.assessmentHistory.push({ id: a.id, score, level: level.label, risk, at: new Date().toISOString() });
  if (state.assessmentHistory.length > 30) state.assessmentHistory = state.assessmentHistory.slice(-30);

  // รางวัลวันละครั้ง ไม่ผูกกับผลคะแนน
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  state.moodRecorded = true;
  if (state.lastMoodTestDate !== todayStr) {
    state.lastMoodTestDate = todayStr;
    state.exp += 50;
    state.coins += 100;
    if (typeof checkLevelUp === "function") checkLevelUp();
  }
  if (typeof syncUI === "function") syncUI();
  if (typeof saveGameState === "function") saveGameState();

  const showHelp = tone === "high" || risk || (a.referAt && score >= a.referAt);
  const root = asmRoot();
  root.innerHTML = `
    <div class="card asm-card asm-result asm-${tone}">
      <div class="asm-sub">${asmEsc(a.title)}</div>
      <div class="asm-score">${score}<small> / ${a.max}</small></div>
      <div class="asm-level">${asmEsc(level.label)}</div>
      <p class="asm-text">${asmEsc(ASSESSMENT_ADVICE[a.id][tone])}</p>
      ${risk ? `<p class="asm-text"><b>เธอตอบว่ามีความคิดอยากตายหรืออยากทำร้ายตัวเอง เรื่องนี้สำคัญมาก ขอให้บอกผู้ใหญ่ที่ไว้ใจ หรือโทร 1323 หรือ 1387 วันนี้เลยนะ</b></p>` : ""}
      ${showHelp ? `<button type="button" class="btn-gradient asm-wide" data-go="help">💙 คุยกับคนที่ช่วยได้</button>` : ""}
    </div>
    <div class="asm-note">ผลนี้เป็นการประเมินเบื้องต้น ไม่ใช่การวินิจฉัยโรค<br>ที่มา: ${asmEsc(a.source)}</div>
    <button type="button" class="asm-link" data-go="home">ทำแบบประเมินอื่น</button>`;
  asmCurrent = null;
  root.onclick = (e) => {
    const g = e.target.closest("[data-go]")?.dataset.go;
    if (g === "home") renderAssessmentHome();
    else if (g === "help") openSafetyHelp(risk ? "risk" : "button");
  };
  if (risk) openSafetyHelp("risk");
}
