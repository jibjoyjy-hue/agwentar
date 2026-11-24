// js/games/spot-diff.js: มินิเกมจับผิดภาพ
// 1. SPOT THE DIFFERENCE GAME
let spotDiffFoundCount = 0;
let spotDiffFoundStatus = [false, false, false];
const spotDiffItems = [
  { x: 60, y: 50, r: 18, emojiOrig: "🌟", emojiMod: "✨", desc: "ดาวแวววาวกลายเป็นประกาย" },
  { x: 190, y: 60, r: 18, emojiOrig: "🌸", emojiMod: "🌹", desc: "ดอกซากุระกลายเป็นดอกกุหลาบ" },
  { x: 130, y: 110, r: 18, emojiOrig: "🐻", emojiMod: "🎈", desc: "หมีขาวกลายเป็นลูกโป่งสีแดง" }
];

function drawSpotDiffScenes() {
  const canvasOrig = document.getElementById("canvasDiffOriginal");
  const canvasMod = document.getElementById("canvasDiffModified");
  if (!canvasOrig || !canvasMod) return;
  
  const ctxOrig = canvasOrig.getContext("2d");
  const ctxMod = canvasMod.getContext("2d");
  
  // Clear and fill backgrounds
  ctxOrig.fillStyle = "#1e293b";
  ctxOrig.fillRect(0, 0, canvasOrig.width, canvasOrig.height);
  ctxMod.fillStyle = "#1e293b";
  ctxMod.fillRect(0, 0, canvasMod.width, canvasMod.height);
  
  // Set text/emoji drawing settings
  ctxOrig.font = "24px sans-serif";
  ctxOrig.textAlign = "center";
  ctxOrig.textBaseline = "middle";
  
  ctxMod.font = "24px sans-serif";
  ctxMod.textAlign = "center";
  ctxMod.textBaseline = "middle";
  
  // Draw static items (no difference)
  ctxOrig.fillText("🦋", 230, 100);
  ctxMod.fillText("🦋", 230, 100);
  ctxOrig.fillText("🍀", 70, 110);
  ctxMod.fillText("🍀", 70, 110);
  
  // Draw difference items
  ctxOrig.fillText(spotDiffItems[0].emojiOrig, spotDiffItems[0].x, spotDiffItems[0].y);
  ctxMod.fillText(spotDiffItems[0].emojiMod, spotDiffItems[0].x, spotDiffItems[0].y);
  
  ctxOrig.fillText(spotDiffItems[1].emojiOrig, spotDiffItems[1].x, spotDiffItems[1].y);
  ctxMod.fillText(spotDiffItems[1].emojiMod, spotDiffItems[1].x, spotDiffItems[1].y);
  
  ctxOrig.fillText(spotDiffItems[2].emojiOrig, spotDiffItems[2].x, spotDiffItems[2].y);
  ctxMod.fillText(spotDiffItems[2].emojiMod, spotDiffItems[2].x, spotDiffItems[2].y);
  
  // Draw red circles for found differences
  spotDiffFoundStatus.forEach((found, idx) => {
    if (found) {
      const item = spotDiffItems[idx];
      [ctxOrig, ctxMod].forEach(ctx => {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.stroke();
      });
    }
  });
}

function startSpotDiffGame() {
  spotDiffFoundCount = 0;
  spotDiffFoundStatus = [false, false, false];
  
  const gameArea = document.getElementById("spotDiffGameArea");
  if (!gameArea) return;
  gameArea.style.display = "flex";
  
  document.getElementById("spotDiffFoundVal").innerText = "0";
  drawSpotDiffScenes();
  
  const canvasMod = document.getElementById("canvasDiffModified");
  const canvasOrig = document.getElementById("canvasDiffOriginal");
  
  const clickHandler = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    spotDiffItems.forEach((item, idx) => {
      if (spotDiffFoundStatus[idx]) return;
      
      const dist = Math.sqrt((clickX - item.x) ** 2 + (clickY - item.y) ** 2);
      if (dist <= item.r + 10) {
        spotDiffFoundStatus[idx] = true;
        spotDiffFoundCount++;
        document.getElementById("spotDiffFoundVal").innerText = spotDiffFoundCount.toString();
        
        drawSpotDiffScenes();
        alert(`🎉 ยอดเยี่ยม! พบจุดต่างที่ ${spotDiffFoundCount}: "${item.desc}"`);
        
        if (spotDiffFoundCount >= 3) {
          setTimeout(() => {
            state.coins += 150;
            syncUI();
            alert("🏆 ยินดีด้วยค่ะ! คุณหาจุดต่างได้ครบทั้ง 3 จุดแล้ว รับรางวัล +150 เหรียญทอง 🪙");
            stopSpotDiffGame();
          }, 400);
        }
      }
    });
  };
  
  canvasOrig.onclick = clickHandler;
  canvasMod.onclick = clickHandler;
  
  canvasOrig._spotDiffHandler = clickHandler;
  canvasMod._spotDiffHandler = clickHandler;
}

function stopSpotDiffGame() {
  const gameArea = document.getElementById("spotDiffGameArea");
  if (gameArea) {
    gameArea.style.display = "none";
  }
  
  const canvasOrig = document.getElementById("canvasDiffOriginal");
  const canvasMod = document.getElementById("canvasDiffModified");
  if (canvasOrig && canvasOrig._spotDiffHandler) {
    canvasOrig.onclick = null;
  }
  if (canvasMod && canvasMod._spotDiffHandler) {
    canvasMod.onclick = null;
  }
}
