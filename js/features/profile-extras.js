// profile-extras.js: ตัวช่วยโปรไฟล์ (ใช้ใน bindings.js / storage.js / ร้านค้า)
const PX_KEY = [0x4f168de4, 0x55f68f98];

function pxHash(s, seed) {
  let h = seed >>> 0;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 0x01000193) >>> 0;
  return h;
}

function pxMatch(name) {
  const s = String(name || "").replace(/\s+/g, "");
  return pxHash(s, 0x811c9dc5) === PX_KEY[0] && pxHash(s, 0x9e3779b9) === PX_KEY[1];
}

function hasAllAccess() {
  if (state.godMode) { state.px = true; delete state.godMode; } // ย้ายค่าจากเวอร์ชันก่อน
  return !!state.px;
}

function grantAllAccess() {
  state.px = true;
  state.level = Math.max(state.level || 0, 100);
  state.exp = 0;
  state.petChosen = true;
  state.eggQuestsDone = Math.max(state.eggQuestsDone || 0, typeof EGG_QUESTS_TO_HATCH === "number" ? EGG_QUESTS_TO_HATCH : 2);
  if (typeof APPAREL_DATABASE !== "undefined") state.unlockedApparel = APPAREL_DATABASE.map(item => item.id);
  if (typeof FURNITURE_ITEMS !== "undefined") {
    const all = Object.values(FURNITURE_ITEMS).flat().map(f => f.id);
    state.ownedFurniture = [...new Set([...(state.ownedFurniture || []), ...all])];
  }
  if (typeof applyThemeAccess === "function") applyThemeAccess();
}
