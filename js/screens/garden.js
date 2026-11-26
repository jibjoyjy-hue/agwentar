// js/screens/garden.js: สวน ปลูกผัก
// ==========================================
// GARDEN FARMING & VEGETABLE PLANTING ENGINE
// ==========================================

const CROPS = {
  carrot: { id: "carrot", name: "แครอท", seedEmoji: "🌱", cropEmoji: "🥕", duration: 60, seedPrice: 10, sellPrice: 30, exp: 10 },
  tomato: { id: "tomato", name: "มะเขือเทศ", seedEmoji: "🌱", cropEmoji: "🍅", duration: 120, seedPrice: 20, sellPrice: 60, exp: 15 },
  potato: { id: "potato", name: "มันฝรั่ง", seedEmoji: "🌱", cropEmoji: "🥔", duration: 180, seedPrice: 30, sellPrice: 90, exp: 20 },
  corn: { id: "corn", name: "ข้าวโพด", seedEmoji: "🌱", cropEmoji: "🌽", duration: 300, seedPrice: 40, sellPrice: 120, exp: 25 },
  broccoli: { id: "broccoli", name: "บล็อคโคลี่", seedEmoji: "🌱", cropEmoji: "🥦", duration: 420, seedPrice: 50, sellPrice: 160, exp: 30 },
  strawberry: { id: "strawberry", name: "สตรอว์เบอร์รี่", seedEmoji: "🌱", cropEmoji: "🍓", duration: 600, seedPrice: 60, sellPrice: 200, exp: 40 },
  avocado: { id: "avocado", name: "อะโวคาโด", seedEmoji: "🌱", cropEmoji: "🥑", duration: 900, seedPrice: 80, sellPrice: 280, exp: 55 },
  watermelon: { id: "watermelon", name: "แตงโม", seedEmoji: "🌱", cropEmoji: "🍉", duration: 1200, seedPrice: 100, sellPrice: 350, exp: 70 },
  grapes: { id: "grapes", name: "องุ่น", seedEmoji: "🌱", cropEmoji: "🍇", duration: 1500, seedPrice: 120, sellPrice: 450, exp: 85 },
  pumpkin: { id: "pumpkin", name: "ฟักทอง", seedEmoji: "🌱", cropEmoji: "🎃", duration: 1800, seedPrice: 150, sellPrice: 550, exp: 100 }
};

let activeSelectedSeed = "carrot";
let farmIntervalId = null;

function startGardenFarmGame() {
  if (!checkLevelUnlock(25, "การปลูกผักและดูแลสวน")) return;
  if (state.activeScreen !== "screen-8") {
    nav("screen-8");
  }
  const area = document.getElementById("gardenFarmGameArea");
  if (area) area.style.display = "flex";
  
  if (!state.farmPlots || state.farmPlots.length < 6) {
    state.farmPlots = [
      { id: 0, crop: null, plantedTime: 0, stage: "empty" },
      { id: 1, crop: null, plantedTime: 0, stage: "empty" },
      { id: 2, crop: null, plantedTime: 0, stage: "empty" },
      { id: 3, crop: null, plantedTime: 0, stage: "empty" },
      { id: 4, crop: null, plantedTime: 0, stage: "empty" },
      { id: 5, crop: null, plantedTime: 0, stage: "empty" }
    ];
  }
  
  renderFullFarmGame();
}

function closeGardenFarmGame() {
  const area = document.getElementById("gardenFarmGameArea");
  if (area) area.style.display = "none";
}

function renderFullFarmGame() {
  const coinsValEl = document.getElementById("farmCoinsVal");
  if (coinsValEl) coinsValEl.innerText = (state.coins || 0).toLocaleString();
  
  const fullGrid = document.getElementById("fullFarmPlotsGrid");
  const smallGrid = document.getElementById("farmPlotsGrid");
  
  if (!state.farmPlots) {
    state.farmPlots = [
      { id: 0, crop: null, plantedTime: 0, stage: "empty" },
      { id: 1, crop: null, plantedTime: 0, stage: "empty" },
      { id: 2, crop: null, plantedTime: 0, stage: "empty" },
      { id: 3, crop: null, plantedTime: 0, stage: "empty" },
      { id: 4, crop: null, plantedTime: 0, stage: "empty" },
      { id: 5, crop: null, plantedTime: 0, stage: "empty" }
    ];
  }
  
  if (!farmIntervalId) {
    farmIntervalId = setInterval(renderFullFarmGame, 1000);
  }
  
  const now = Math.floor(Date.now() / 1000);
  let htmlFull = "";
  let htmlSmall = "";
  
  state.farmPlots.forEach((plot, idx) => {
    if (plot.stage === "growing") {
      const cropInfo = CROPS[plot.crop] || CROPS.carrot;
      const elapsed = now - plot.plantedTime;
      if (elapsed >= cropInfo.duration) {
        plot.stage = "ready";
      }
    }
    
    const cropInfo = CROPS[plot.crop] || CROPS.carrot;
    const remaining = Math.max(0, cropInfo.duration - (now - plot.plantedTime));
    
    if (plot.stage === "empty") {
      htmlFull += `
        <div class="full-farm-plot" onclick="clickFarmPlot(${idx})" style="background: linear-gradient(135deg, #78350f 0%, #451a03 100%); border: 2px dashed #fde68a; border-radius: 16px; padding: 12px 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s ease;">
          <span style="font-size: 30px; margin-bottom: 2px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">🟤</span>
          <span style="font-size: 10px; font-weight: 800; color: #fde68a;">แปลงดิน #${idx + 1}</span>
          <span style="font-size: 9px; color: #86efac; font-weight: 700; margin-top: 2px;">🌱 แตะลงเมล็ด</span>
        </div>
      `;
    } else if (plot.stage === "growing") {
      htmlFull += `
        <div class="full-farm-plot" onclick="clickFarmPlot(${idx})" style="background: linear-gradient(135deg, #14532d 0%, #064e3b 100%); border: 2px solid #4ade80; border-radius: 16px; padding: 12px 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s ease;">
          <span style="font-size: 30px; margin-bottom: 2px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));">🌱</span>
          <span style="font-size: 10px; font-weight: 800; color: #ffffff;">${cropInfo.name}</span>
          <span style="font-size: 9px; color: #67e8f9; font-weight: 700; margin-top: 2px; background: rgba(0,0,0,0.3); padding: 1px 6px; border-radius: 10px;">💧 ${remaining}s</span>
        </div>
      `;
    } else if (plot.stage === "ready") {
      htmlFull += `
        <div class="full-farm-plot" onclick="clickFarmPlot(${idx})" style="background: linear-gradient(135deg, #ca8a04 0%, #854d0e 100%); border: 2px solid #facc15; border-radius: 16px; padding: 12px 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s ease; box-shadow: 0 0 14px rgba(250, 204, 21, 0.6);">
          <span style="font-size: 32px; margin-bottom: 2px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));">${cropInfo.cropEmoji}</span>
          <span style="font-size: 11px; font-weight: 800; color: #fef08a;">พร้อมเก็บ!</span>
          <span style="font-size: 9px; color: #ffffff; background: #15803d; padding: 2px 8px; border-radius: 10px; font-weight: 800; margin-top: 2px;">✨ เก็บเกี่ยว</span>
        </div>
      `;
    }
    
    if (plot.stage === "empty") {
      htmlSmall += `
        <div class="farm-plot-card" onclick="startGardenFarmGame()" style="background: rgba(120, 53, 15, 0.7); border: 1.5px dashed rgba(252, 211, 77, 0.6); border-radius: 14px; padding: 8px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <span style="font-size: 22px; margin-bottom: 2px;">🟤</span>
          <span style="font-size: 9px; font-weight: 700; color: #fde68a;">แปลง #${idx + 1}</span>
          <span style="font-size: 8px; color: #86efac; font-weight: 700; margin-top: 1px;">🌱 แตะฟาร์ม</span>
        </div>
      `;
    } else if (plot.stage === "growing") {
      htmlSmall += `
        <div class="farm-plot-card" onclick="startGardenFarmGame()" style="background: rgba(20, 83, 45, 0.85); border: 1.5px solid #4ade80; border-radius: 14px; padding: 8px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <span style="font-size: 22px; margin-bottom: 2px;">🌱</span>
          <span style="font-size: 9px; font-weight: 700; color: #ffffff;">${cropInfo.name}</span>
          <span style="font-size: 8px; color: #67e8f9; font-weight: 700; margin-top: 1px;">💧 ${remaining}s</span>
        </div>
      `;
    } else if (plot.stage === "ready") {
      htmlSmall += `
        <div class="farm-plot-card" onclick="startGardenFarmGame()" style="background: rgba(161, 98, 7, 0.9); border: 2px solid #facc15; border-radius: 14px; padding: 8px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer; box-shadow: 0 0 10px rgba(250, 204, 21, 0.5);">
          <span style="font-size: 24px; margin-bottom: 2px;">${cropInfo.cropEmoji}</span>
          <span style="font-size: 9px; font-weight: 800; color: #fef08a;">พร้อมเก็บ!</span>
          <span style="font-size: 8px; color: #ffffff; background: #15803d; padding: 1px 5px; border-radius: 8px; font-weight: 700; margin-top: 1px;">✨ เก็บเกี่ยว</span>
        </div>
      `;
    }
  });
  
  if (fullGrid) fullGrid.innerHTML = htmlFull;
  if (smallGrid) smallGrid.innerHTML = htmlSmall;
  
  // Update water button dynamically based on daily magic water limit
  const waterBtn = document.querySelector("button[onclick='waterAllFarmPlots()']");
  if (waterBtn) {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    if (state.lastMagicWaterDate === todayStr) {
      waterBtn.innerHTML = "🔒 รดน้ำวิเศษแล้ว";
      waterBtn.style.background = "#64748b";
      waterBtn.style.cursor = "not-allowed";
    } else {
      waterBtn.innerHTML = "💧 รดน้ำวิเศษ (โตทันที)";
      waterBtn.style.background = "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)";
      waterBtn.style.cursor = "pointer";
    }
  }
  
  renderSeedSelectionBar();
}

function renderSeedSelectionBar() {
  const seedBar = document.getElementById("seedSelectionBar");
  if (!seedBar) return;
  
  let html = "";
  Object.keys(CROPS).forEach(cropKey => {
    const crop = CROPS[cropKey];
    const isSelected = activeSelectedSeed === cropKey;
    let timeStr = crop.duration + "s";
    if (crop.duration >= 60) {
      timeStr = Math.floor(crop.duration / 60) + "ม.";
    }
    html += `
      <div onclick="selectActiveSeed('${cropKey}')" style="width: 53px; background: ${isSelected ? 'rgba(250, 204, 21, 0.35)' : 'rgba(255, 255, 255, 0.12)'}; border: 1.5px solid ${isSelected ? '#facc15' : 'rgba(255, 255, 255, 0.25)'}; border-radius: 10px; padding: 4px 1px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.15s ease;">
        <span style="font-size: 16px;">${crop.cropEmoji}</span>
        <span style="font-size: 8px; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 50px;">${crop.name}</span>
        <span style="font-size: 7px; color: #fef08a; font-weight: 700;">${crop.seedPrice}🪙</span>
        <span style="font-size: 7px; color: #86efac; font-weight: 700;">${timeStr}</span>
      </div>
    `;
  });
  seedBar.innerHTML = html;
}

function selectActiveSeed(cropKey) {
  activeSelectedSeed = cropKey;
  renderSeedSelectionBar();
}

function clickFarmPlot(plotIdx) {
  if (!state.farmPlots) return;
  const plot = state.farmPlots[plotIdx];
  if (!plot) return;
  
  if (plot.stage === "empty") {
    const cropInfo = CROPS[activeSelectedSeed] || CROPS.carrot;
    if (!hasAllAccess() && state.coins < cropInfo.seedPrice) {
      alert(`🔒 เหรียญทองไม่เพียงพอซื้อเมล็ดพันธุ์ ${cropInfo.name} ค่ะ (ต้องการ ${cropInfo.seedPrice} 🪙)`);
      return;
    }
    if (!hasAllAccess()) state.coins -= cropInfo.seedPrice;
    plot.crop = activeSelectedSeed;
    plot.stage = "growing";
    plot.plantedTime = Math.floor(Date.now() / 1000);
    spawnVisualEffect("stat", "petGardenContainer", `🌱 ซื้อและปลูก ${cropInfo.name} แล้ว! (-${cropInfo.seedPrice}🪙)`);
    syncUI();
  } else if (plot.stage === "growing") {
    plot.plantedTime -= 5;
    spawnVisualEffect("stat", "petGardenContainer", "💧 รดน้ำเร่งโต -5s!");
  } else if (plot.stage === "ready") {
    harvestCrop(plotIdx);
  }
  renderFullFarmGame();
}

function waterAllFarmPlots() {
  if (!state.farmPlots) return;
  
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  
  if (state.lastMagicWaterDate === todayStr) {
    alert("🔒 วันนี้ปะป๊ามะม๊าใช้ \"น้ำวิเศษเร่งโต\" ไปแล้วค่ะ! พรุ่งนี้ค่อยกลับมาใช้ใหม่น้าาา 💧");
    return;
  }
  
  let growingCount = 0;
  state.farmPlots.forEach(plot => {
    if (plot.stage === "growing") {
      growingCount++;
    }
  });
  
  if (growingCount === 0) {
    alert("ไม่มีแปลงผักที่กำลังเจริญเติบโตให้รดน้ำวิเศษค่ะ 💧");
    return;
  }
  
  state.farmPlots.forEach(plot => {
    if (plot.stage === "growing") {
      const cropInfo = CROPS[plot.crop] || CROPS.carrot;
      plot.plantedTime = Math.floor(Date.now() / 1000) - cropInfo.duration;
      plot.stage = "ready";
    }
  });
  
  state.lastMagicWaterDate = todayStr;
  saveGameState();
  syncUI();
  
  spawnVisualEffect("stat", "petGardenContainer", `✨ รดน้ำวิเศษสำเร็จ! ผักโตทันที ${growingCount} แปลง! 🌾🧺`);
  alert(`✨ รดน้ำวิเศษสำเร็จ!\n\nพืชผักที่กำลังเติบโตทั้งหมด ${growingCount} แปลง เจริญเติบโตเต็มที่พร้อมเก็บเกี่ยวทันทีแล้วค่ะ! 🎉💧`);
  renderFullFarmGame();
}

function harvestAllFarmPlots() {
  if (!state.farmPlots) return;
  let harvestedCount = 0;
  let totalExp = 0;
  
  state.farmPlots.forEach((plot, idx) => {
    if (plot.stage === "ready") {
      const cropInfo = CROPS[plot.crop] || CROPS.carrot;
      totalExp += cropInfo.exp;
      state.foods[cropInfo.id] = (state.foods[cropInfo.id] || 0) + 1;
      plot.crop = null;
      plot.stage = "empty";
      plot.plantedTime = 0;
      harvestedCount++;
    }
  });
  
  if (harvestedCount > 0) {
    state.exp += totalExp;
    spawnVisualEffect("stat", "petGardenContainer", `🧺 เก็บเกี่ยว ${harvestedCount} แปลง! +${totalExp}⭐`);
    checkLevelUp();
  } else {
    alert("ไม่มีผักที่โตเต็มวัยพร้อมเก็บเกี่ยวในขณะนี้ค่ะ 🌾");
  }
  renderFullFarmGame();
}

function harvestCrop(plotIdx) {
  if (!state.farmPlots) return;
  const plot = state.farmPlots[plotIdx];
  if (!plot || plot.stage !== "ready") return;
  
  const cropInfo = CROPS[plot.crop] || CROPS.carrot;
  state.exp += cropInfo.exp;
  state.foods[cropInfo.id] = (state.foods[cropInfo.id] || 0) + 1;
  
  plot.crop = null;
  plot.stage = "empty";
  plot.plantedTime = 0;
  
  spawnVisualEffect("stat", "petGardenContainer", `+1 ${cropInfo.cropEmoji} +${cropInfo.exp} ⭐`);
  checkLevelUp();
}

function triggerGardenAction(actName) {
  if (!checkLevelUnlock(25, "การปลูกผักและดูแลสวน")) return;
  if (actName === "ปลูกผัก" || actName.includes("ปลูก")) {
    startGardenFarmGame();
  } else if (actName === "รดน้ำต้นไม้") {
    waterAllFarmPlots();
    state.hp = Math.min(50, state.hp + 5);
    state.energy = Math.min(50, state.energy + 5);
  } else if (actName === "เดินเล่น") {
    setPetPostureDirect("petGardenContainer", "standing", 50, 60);
    state.energy = Math.min(50, state.energy + 10);
    spawnVisualEffect("stat", "petGardenContainer", "🍃 เดินเล่นในสวน +10 ⚡");
  }
  syncUI();
}
