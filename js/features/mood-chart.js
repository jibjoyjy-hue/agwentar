// mood-chart.js: กราฟอารมณ์ย้อนหลังในหน้าไดอารี่ (จาก state.diaryHistory)
//   - แถบวัน: แต่ละวันแสดงอีโมจิอารมณ์ล่าสุดของวันนั้น
//   - แท่งนับจำนวน: อารมณ์ไหนเจอบ่อยในช่วงนี้ (สีเดียว ไม่แบ่งดี/ไม่ดี เพราะทุกอารมณ์เป็นเรื่องปกติ)
const MOOD_CHART_EMOJI = { Happy: "😊", Calm: "😌", Shocked: "😳", Frustrated: "😒", Angry: "😡", Tired: "🥱", Sad: "😢", Restless: "🌀", Discouraged: "😔" };
const MOOD_CHART_NAME = { Happy: "มีความสุข", Calm: "สงบ", Shocked: "ตกใจ", Frustrated: "หงุดหงิด", Angry: "โกรธ", Tired: "เหนื่อย", Sad: "เศร้า", Restless: "ว้าวุ่น", Discouraged: "ท้อแท้" };
const MOOD_CHART_TH_MONTH = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const MOOD_CHART_TH_DAY = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
let moodChartDays = 7;

function moodChartKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function moodChartSetDays(n) {
  moodChartDays = n;
  renderMoodChart();
}

function renderMoodChart() {
  const box = document.getElementById("moodChartContainer");
  if (!box) return;
  const hist = (state.diaryHistory || []).filter(e => e && e.date && MOOD_CHART_EMOJI[e.mood]);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const days = [];
  for (let i = moodChartDays - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    days.push({ d, key: moodChartKey(d), moods: [] });
  }
  const byKey = Object.fromEntries(days.map(x => [x.key, x]));
  hist.forEach(e => { if (byKey[e.date]) byKey[e.date].moods.push(e.mood); });

  const counts = {};
  days.forEach(x => x.moods.forEach(m => { counts[m] = (counts[m] || 0) + 1; }));
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = rows.length ? rows[0][1] : 1;
  const writtenDays = days.filter(x => x.moods.length).length;

  const seg = [7, 30].map(n => `<button type="button" class="mc-seg${moodChartDays === n ? " active" : ""}" onclick="moodChartSetDays(${n})" aria-pressed="${moodChartDays === n}">${n} วัน</button>`).join("");

  const cells = days.map(x => {
    const last = x.moods[x.moods.length - 1];
    const label = `${x.d.getDate()} ${MOOD_CHART_TH_MONTH[x.d.getMonth()]}`;
    const tip = last ? `${label} · ${x.moods.map(m => MOOD_CHART_NAME[m]).join(", ")}` : `${label} · ยังไม่ได้เขียน`;
    return `<div class="mc-day${last ? "" : " empty"}" title="${tip}" aria-label="${tip}">
      <span class="mc-emoji">${last ? MOOD_CHART_EMOJI[last] : "·"}</span>
      ${moodChartDays === 7 ? `<span class="mc-dlabel">${MOOD_CHART_TH_DAY[x.d.getDay()]}</span>` : ""}
    </div>`;
  }).join("");

  const bars = rows.length ? rows.map(([m, c]) => `
    <div class="mc-row" title="${MOOD_CHART_NAME[m]} ${c} ครั้ง">
      <span class="mc-name">${MOOD_CHART_EMOJI[m]} ${MOOD_CHART_NAME[m]}</span>
      <span class="mc-track"><span class="mc-bar" style="width:${Math.max(6, Math.round(c / max * 100))}%"></span></span>
      <span class="mc-count">${c}</span>
    </div>`).join("") : `<div class="mc-empty">ช่วงนี้ยังไม่มีบันทึกอารมณ์ ลองเขียนไดอารี่วันนี้ดูนะ 📝</div>`;

  const top = rows[0] ? `${MOOD_CHART_EMOJI[rows[0][0]]} ${MOOD_CHART_NAME[rows[0][0]]}` : "";
  const summary = rows.length
    ? `${moodChartDays} วันที่ผ่านมา เขียนไดอารี่ ${writtenDays} วัน · อารมณ์ที่เจอบ่อยสุด: ${top}`
    : "";

  box.innerHTML = `
    <div class="mc-card">
      <div class="mc-head"><h4>📊 กราฟอารมณ์</h4><div class="mc-segs" role="group" aria-label="ช่วงเวลา">${seg}</div></div>
      <div class="mc-days mc-days-${moodChartDays}">${cells}</div>
      ${summary ? `<div class="mc-summary">${summary}</div>` : ""}
      <div class="mc-bars">${bars}</div>
      <div class="mc-note">ทุกอารมณ์เป็นเรื่องปกติ 💗 กราฟนี้เก็บอยู่ในเครื่องนี้เท่านั้น</div>
    </div>`;
}

// วาดกราฟใหม่ทุกครั้งที่หน้าไดอารี่อัปเดตประวัติ
if (typeof renderMoodAnalytics === "function") {
  const _mcOrig = renderMoodAnalytics;
  renderMoodAnalytics = function (...a) {
    const r = _mcOrig.apply(this, a);
    try { renderMoodChart(); } catch (e) {}
    return r;
  };
}
document.addEventListener("DOMContentLoaded", () => setTimeout(() => { try { renderMoodChart(); } catch (e) {} }, 200));
