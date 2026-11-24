// js/core/sync-ui.js: อัปเดตตัวเลขและหน้าตาตาม state (syncUI)
// Sync visual values like coins, gems, HP, energy, names
function syncUI() {
  // Counters
  document.getElementById("coinCounter").innerText = state.coins.toLocaleString();
  document.getElementById("gemCounter").innerText = state.gems.toLocaleString();
  
  // HP & Energy
  const hpBg = document.querySelector("#pillHp .status-hp-bg");
  if (hpBg) hpBg.style.width = `${(state.hp / 50) * 100}%`;
  const hpVal = document.querySelector("#pillHp .stat-val");
  if (hpVal) hpVal.innerText = `${state.hp}/50`;
  
  const energyBg = document.querySelector("#pillEnergy .status-energy-bg");
  if (energyBg) energyBg.style.width = `${(state.energy / 50) * 100}%`;
  const energyVal = document.querySelector("#pillEnergy .stat-val");
  if (energyVal) energyVal.innerText = `${state.energy}/50`;
  
  const reqExp = getRequiredExp(state.level);
  
  // Level badge
  const lvlBadge = document.querySelector(".lvl-badge");
  if (lvlBadge) lvlBadge.innerText = `Lv. ${state.level}`;
  
  // Update Profile screen (Screen 3) level & EXP UI elements
  const infoLvlBadge = document.querySelector(".info-avatar-section span");
  if (infoLvlBadge) infoLvlBadge.innerText = `เลเวล ${state.level}`;

  const infoStatRows = document.querySelectorAll("#profileTabInfo .info-stat-row");
  if (infoStatRows && infoStatRows.length >= 3) {
    const expRow = infoStatRows[2];
    const labels = expRow.querySelectorAll(".info-stat-label span");
    if (labels.length >= 2) {
      labels[0].innerText = `เลเวล ${state.level}`;
      labels[1].innerText = `EXP ${state.exp}/${reqExp}`;
    }
    const expFill = expRow.querySelector(".info-bar-fill.exp");
    if (expFill) {
      expFill.style.width = `${Math.min(100, (state.exp / reqExp) * 100)}%`;
    }
  }
  
  // Name
  document.getElementById("headerCharName").innerText = state.petName;
  document.getElementById("infoPetName").innerText = state.petName;
  document.getElementById("settingsNameInput").value = state.petName;

  
  // Gender
  if (state.petGender === "male") {
    document.getElementById("malePill").classList.add("active");
    document.getElementById("femalePill").classList.remove("active");
  } else {
    document.getElementById("femalePill").classList.add("active");
    document.getElementById("malePill").classList.remove("active");
  }

  // Large Info page avatar
  const infoPet = document.getElementById("infoPetAvatar");
  if (infoPet) {
    const petScale = getPetScale();
    const appSize = Math.round(75 * petScale);
    const defaultTop = Math.round(-32 * petScale);
    const topPos = getApparelTopOffset(state.activeApparel, defaultTop, appSize, petScale);
    infoPet.innerHTML = `
      <div style="position:relative;">
        ${getPetVisual(180)}
        ${state.activeApparel && !/^F\d+$/.test(state.activeApparel) && [state.equippedHat, state.equippedGlasses, state.equippedWings].includes(state.activeApparel) ? `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(state.activeApparel, appSize)}</span>` : ''}
      </div>
    `;
  }

  // Render lists dynamically if the user is currently on the respective screen
  if (state.activeScreen === "screen-6" && typeof renderDiningFood === "function") renderDiningFood();
  if (state.activeScreen === "screen-9" && typeof renderDressingRoom === "function") renderDressingRoom();
  if (state.activeScreen === "screen-16" && typeof renderShopItems === "function") {
    const activeTab = document.querySelector(".shop-tab.active")?.dataset.shoptab || "food";
    renderShopItems(activeTab);
  }
  if (state.activeScreen === "screen-17" && typeof renderBagScreen === "function") {
    const activeTab = document.querySelector(".bag-tab.active")?.innerText || "ทั้งหมด";
    renderBagScreen(activeTab);
  }

  // Dynamic egg selection rendering and level-based nav tab visibility
  if (typeof renderSelectPetGrid === "function") {
    renderSelectPetGrid();
  }

  const selectPetTab = document.getElementById("navTabSelectPet");
  if (selectPetTab) {
    if (state.level === 0 && !state.petChosen) {
      selectPetTab.style.display = "flex";
    } else {
      selectPetTab.style.display = "none";
      if (state.activeScreen === "screen-2" && state.petChosen) {
        nav("screen-1");
      }
    }
  }

  const btnViewOtherPets = document.getElementById("btnViewOtherPets");
  if (btnViewOtherPets) {
    btnViewOtherPets.style.display = "block";
  }

  // Map level unlock badges
  const bedroomLock = document.getElementById("bedroomLockBadge");
  if (bedroomLock) {
    bedroomLock.innerText = "✨ ปลดล็อก";
    bedroomLock.style.color = "#4ade80";
  }

  const bathroomLock = document.getElementById("bathroomLockBadge");
  if (bathroomLock) {
    bathroomLock.innerText = "✨ ปลดล็อก";
    bathroomLock.style.color = "#4ade80";
  }

  const livingLock = document.getElementById("livingLockBadge");
  if (livingLock) {
    livingLock.innerText = state.level >= 3 ? "✨ ปลดล็อก" : "🔒 Lv.3";
    livingLock.style.color = state.level >= 3 ? "#4ade80" : "#f87171";
  }

  const diningLock = document.getElementById("diningLockBadge");
  if (diningLock) {
    diningLock.innerText = state.level >= 15 ? "✨ ปลดล็อก" : "🔒 Lv.15";
    diningLock.style.color = state.level >= 15 ? "#4ade80" : "#f87171";
  }

  const gardenLock = document.getElementById("gardenLockBadge");
  if (gardenLock) {
    gardenLock.innerText = state.level >= 25 ? "✨ ปลดล็อก" : "🔒 Lv.25";
    gardenLock.style.color = state.level >= 25 ? "#4ade80" : "#f87171";
  }

  const activityLock = document.getElementById("activityLockBadge");
  if (activityLock) {
    activityLock.innerText = state.level >= 10 ? "✨ ปลดล็อก" : "🔒 Lv.10";
    activityLock.style.color = state.level >= 10 ? "#4ade80" : "#f87171";
  }

  const dressingLock = document.getElementById("dressingLockBadge");
  if (dressingLock) {
    dressingLock.innerText = state.level >= 8 ? "✨ ปลดล็อก" : "🔒 Lv.8";
    dressingLock.style.color = state.level >= 8 ? "#4ade80" : "#f87171";
  }

  // Bottom Nav Bar Lock Indicators
  const tabLocks = [
    { selector: '[data-tab="screen-16"] .nav-label', text: "8.ร้านค้า", level: 1 },
    { selector: '[data-tab="screen-17"] .nav-label', text: "9.กระเป๋า", level: 1 },
    { selector: '[data-tab="screen-14"] .nav-label', text: "6.เควส", level: 0 },
    { selector: '[data-tab="screen-12"] .nav-label', text: "5.ไดอารี่", level: 0 },
    { selector: '[data-tab="screen-15"] .nav-label', text: "7.มินิเกม", level: 0 },
    { selector: '[data-tab="screen-11"] .nav-label', text: "4.ทดสอบ+AI", level: 0 },
    { selector: '[data-tab="screen-24"] .nav-label', text: "10.ดนตรีบำบัด", level: 6 }
  ];

  tabLocks.forEach(t => {
    const el = document.querySelector(t.selector);
    if (el) {
      el.innerHTML = state.level >= t.level ? t.text : `${t.text} 🔒`;
    }
  });

  // Mini-game cards lock badges
  const foodBadge = document.getElementById("foodMatchUnlockBadge");
  if (foodBadge) {
    foodBadge.innerText = state.level >= 7 ? "✨ ปลดล็อกแล้ว! แตะเพื่อเล่น" : "🔒 ปลดล็อกเมื่อถึง เลเวล 7";
    foodBadge.style.color = state.level >= 7 ? "#4ade80" : "#f87171";
  }

  const colorBadge = document.getElementById("coloringUnlockBadge");
  if (colorBadge) {
    colorBadge.innerText = state.level >= 10 ? "✨ ปลดล็อกแล้ว! แตะเพื่อระบายสี" : "🔒 ปลดล็อกเมื่อถึง เลเวล 10";
    colorBadge.style.color = state.level >= 10 ? "#4ade80" : "#f87171";
  }

  const shooterBadge = document.getElementById("shooterUnlockBadge");
  if (shooterBadge) {
    shooterBadge.innerText = state.level >= 15 ? "✨ ปลดล็อกแล้ว! (คะแนนสูงสุด: 680)" : "🔒 ปลดล็อกเมื่อถึง เลเวล 15";
    shooterBadge.style.color = state.level >= 15 ? "#4ade80" : "#f87171";
  }

  const cakeBadge = document.getElementById("cakeStackUnlockBadge");
  if (cakeBadge) {
    cakeBadge.innerText = state.level >= 5 ? `✨ ปลดล็อกแล้ว! (คะแนนสูงสุด: ${state.cakeStackHighScore || 0})` : "🔒 ปลดล็อกเมื่อถึง เลเวล 5";
    cakeBadge.style.color = state.level >= 5 ? "#4ade80" : "#f87171";
  }

  // Furniture controls sync removed

  // Render placed furniture in the home screen slots
  renderPlacedFurniture();

  // Perform dynamic pet updates
  renderDynamicPets();

  // Update speech bubble text dynamically based on state
  updatePetBubbleText();

  // Save game progress automatically to localStorage
  saveGameState();

  if (state.lang === "en") {
    applyLanguageToNode(document.querySelector(".app-container") || document.body, "en");
  }
}
