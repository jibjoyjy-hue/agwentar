// js/pets/pet-stages.js: ร่างของสัตว์เลี้ยงตามเลเวล
//
//   ไข่      : เริ่มเกม จนกว่าจะทำเควสสำเร็จ 2 อัน (EGG_QUESTS_TO_HATCH)
//   เบบี๋    : เลเวล 1–9
//   เด็กน้อย : เลเวล 10–24
//   โตแล้ว   : เลเวล 25 ขึ้นไป
//
// รูปของแต่ละร่าง: วางไฟล์ไว้ที่ assets/pets/<ชื่อสัตว์>/<ร่าง>.png แล้วเพิ่มชื่อไว้ใน PET_STAGE_ART
//   เช่น PET_STAGE_ART.bunny = ["egg", "baby", "kid", "adult"]
// ร่างที่ยังไม่มีรูป จะใช้รูปเดิมของสัตว์ตัวนั้น (ขนาดเล็ก-ใหญ่ตามเลเวลเหมือนเดิม) และไข่ใช้รูปไข่ SVG

const EGG_QUESTS_TO_HATCH = 2;

const PET_STAGES = [
  { id: "egg",   name: "ไข่",      minLevel: 0 },
  { id: "baby",  name: "เบบี๋",    minLevel: 1 },
  { id: "kid",   name: "เด็กน้อย", minLevel: 10 },
  { id: "adult", name: "โตแล้ว",   minLevel: 25 },
];

// รูปที่วาดเสร็จแล้ว: ชื่อสัตว์ (ตัวพิมพ์เล็ก) -> รายชื่อร่างที่มีไฟล์
const PET_STAGE_ART = {
  // bunny: ["egg", "baby"],
};

function getPetStage(level = state.level) {
  let st = PET_STAGES[0];
  for (const s of PET_STAGES) if (level >= s.minLevel) st = s;
  return st;
}
function petStageArt(petKey, stageId) {
  const list = PET_STAGE_ART[petKey];
  return list && list.includes(stageId) ? `assets/pets/${petKey}/${stageId}.png` : "";
}
function eggQuestsLeft() {
  return Math.max(0, EGG_QUESTS_TO_HATCH - (state.eggQuestsDone || 0));
}

// ไข่ SVG สีพาสเทล (ใช้เมื่อยังไม่มีรูปไข่ที่วาดเอง)
function getEggSvg(size) {
  return `<svg class="pet-body-main pet-egg-svg" viewBox="0 0 100 120" width="${size}" height="${Math.round(size * 1.2)}" style="animation: petEggWobble 2s infinite ease-in-out; cursor:pointer;" aria-label="ไข่">
    <defs><radialGradient id="eggGrad" cx="38%" cy="32%" r="70%"><stop offset="0" stop-color="#fff7fb"/><stop offset="1" stop-color="#f9c6dd"/></radialGradient></defs>
    <path d="M50 4C74 4 94 46 94 74a44 44 0 01-88 0C6 46 26 4 50 4z" fill="url(#eggGrad)" stroke="#ec4899" stroke-width="3"/>
    <circle cx="34" cy="58" r="7" fill="#fbcfe8"/><circle cx="64" cy="44" r="5" fill="#bfdbfe"/><circle cx="62" cy="84" r="8" fill="#fbcfe8"/><circle cx="36" cy="92" r="4" fill="#bfdbfe"/>
    <path d="M30 30q6-8 12-10" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".9"/>
  </svg>`;
}

// เรียกเมื่อรับรางวัลเควส: ตอนเป็นไข่ นับจำนวนเควส ครบแล้วฟักเป็นเบบี๋
function petStageOnQuestClaimed() {
  if (state.level !== 0) return;
  state.eggQuestsDone = (state.eggQuestsDone || 0) + 1;
  if (eggQuestsLeft() > 0) return;
  state.level = 1;
  state.exp = 0;
  alert(`🥚✨ ป๊อป! ไข่ฟักแล้ว! น้อง ${state.petName} ออกมาเป็นเบบี๋แล้วค่ะ 🍼\nดูแลน้องต่อไป แล้วน้องจะค่อย ๆ โตขึ้นตามเลเวลนะ`);
  if (typeof renderDynamicPets === "function") renderDynamicPets();
  if (typeof updatePetBubbleText === "function") updatePetBubbleText();
}

// เรียกหลังเลเวลอัป: แจ้งเมื่อเปลี่ยนร่าง
function petStageAnnounce(oldLevel, newLevel) {
  const a = getPetStage(oldLevel), b = getPetStage(newLevel);
  if (a.id !== b.id && b.id !== "baby") {
    alert(`🌟 น้อง ${state.petName} โตขึ้นเป็นร่าง "${b.name}" แล้ว!`);
  }
}
