// js/games/minigames-common.js: ส่วนกลางของมินิเกม
// Screen 15: Simulate Mini Game
function simulateMiniGame(gameName, score) {
  state.coins += 150;
  syncUI();
  alert(`มินิเกม ${gameName} สิ้นสุด! ทำคะแนนได้ 1,020 คะแนน (คะแนนสูงสุด: ${score}) ได้รับรางวัล +150 เหรียญทอง 🪙`);
}
