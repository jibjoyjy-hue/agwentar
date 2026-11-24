// js/screens/rooms.js: กิจกรรมในห้องกิจกรรม
// Screen 10: Activity Play
function playActivity(actName) {
  if (!checkLevelUnlock(10, "กิจกรรมในห้องเล่นของเล่น")) return;
  if (actName.includes("วาดรูป")) {
    startColoringGame();
    return;
  }
  if (actName.includes("เปียโน") || actName.includes("ฟังเพลง")) {
    openHealingMusic();
    return;
  }
  if (actName.includes("ของเล่น")) {
    setPetPostureDirect("petActivityContainer", "playing", 25, 45);
    state.energy = Math.max(0, state.energy - 5);
    state.hp = Math.min(50, state.hp + 8);
    spawnVisualEffect("stat", "petActivityContainer", "🧸 เล่นของเล่น +8 💖");
    spawnVisualEffect("toys", "petActivityContainer");
    syncUI();
  }
}
