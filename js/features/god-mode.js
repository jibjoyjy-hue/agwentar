// god-mode.js: รหัสลับทดสอบ ใช้ร่วมกับ processPetNameWithLevelCode ใน bindings.js
// โหมดเทพเจ้า (รหัสลับทดสอบ): ตั้งชื่อน้องว่า "ข้า คือ เทพเจ้า" → ปลดล็อกทุกอย่าง ซื้อของฟรี เลเวล 100
// ⚠️ ปิดก่อนเปิดใช้งานจริง: ตั้ง GOD_MODE_ENABLED = false
const GOD_MODE_ENABLED = true;
const GOD_MODE_NAME = "ข้าคือเทพเจ้า"; // เทียบแบบไม่สนช่องว่าง
const GOD_MODE_LEVEL = 100;

function isGodMode() {
  return GOD_MODE_ENABLED && !!state.godMode;
}

function activateGodMode() {
  state.godMode = true;
  state.level = Math.max(state.level || 0, GOD_MODE_LEVEL);
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
