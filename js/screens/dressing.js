// js/screens/dressing.js: ห้องแต่งตัว
// Screen 9: Dress Apparel toggle
function toggleApparel(apparelId) {
  if (!checkLevelUnlock(8, "ห้องแต่งตัวและสวมใส่เครื่องแต่งกาย")) return;
  
  // Get apparel details from database
  const apparel = APPAREL_DATABASE.find(a => a.id === apparelId);
  if (!apparel) return;
  
  // Check if apparel is unlocked
  if (!state.unlockedApparel.includes(apparelId)) {
    alert("เครื่องแต่งกายชิ้นนี้ยังไม่ได้ซื้อค่ะ! ไปซื้อได้ที่ร้านค้านะคะ 🔒");
    return;
  }
  
  let isEquipping = false;
  
  if (apparel.category === "hat") {
    if (state.equippedHat === apparelId) {
      state.equippedHat = "";
    } else {
      state.equippedHat = apparelId;
      isEquipping = true;
    }
  } else if (apparel.category === "glasses") {
    if (state.equippedGlasses === apparelId) {
      state.equippedGlasses = "";
    } else {
      state.equippedGlasses = apparelId;
      isEquipping = true;
    }
  } else if (apparel.category === "wings") {
    if (state.equippedWings === apparelId) {
      state.equippedWings = "";
    } else {
      state.equippedWings = apparelId;
      isEquipping = true;
    }
  } else if (apparel.category === "outfit") {
    if (state.equippedOutfit === apparelId) {
      state.equippedOutfit = "";
    } else {
      state.equippedOutfit = apparelId;
      // Strip separate top and bottom
      state.equippedTop = "";
      state.equippedBottom = "";
      isEquipping = true;
    }
  } else if (apparel.category === "top") {
    if (state.equippedTop === apparelId) {
      state.equippedTop = "";
    } else {
      state.equippedTop = apparelId;
      // Strip full outfit
      state.equippedOutfit = "";
      isEquipping = true;
    }
  } else if (apparel.category === "skirt" || apparel.category === "pant") {
    if (state.equippedBottom === apparelId) {
      state.equippedBottom = "";
    } else {
      state.equippedBottom = apparelId;
      // Strip full outfit
      state.equippedOutfit = "";
      isEquipping = true;
    }
  }
  
  // Set as active apparel for drag-and-drop / offset adjustment
  if (isEquipping) {
    state.activeApparel = apparelId;
    
    // Copy item custom offset to active global offset if it exists
    const customOffset = getApparelOffset(apparelId);
    if (customOffset) {
      state.apparelOffset = { ...customOffset };
    } else {
      state.apparelOffset = null;
    }
    if (typeof tempApparelOffset !== "undefined") {
      tempApparelOffset = state.apparelOffset ? { ...state.apparelOffset } : null;
    }
    
    // Trigger dress up sparkles
    spawnVisualEffect("clean", "petDressingContainer");
    syncUI();
    if (typeof initApparelDragAndDrop === "function") {
      initApparelDragAndDrop();
    }
    alert(`สวมเครื่องแต่งกายเรียบร้อย! น้อง ${state.petName} น่ารักสุดๆ 🧥👒 (คุณสามารถกดลากย้ายตำแหน่งเครื่องแต่งกายบนตัวน้องตามต้องการได้เลยนะคะ)`);
  } else {
    if (state.activeApparel === apparelId) {
      state.activeApparel = "";
      state.apparelOffset = null;
      if (typeof tempApparelOffset !== "undefined") {
        tempApparelOffset = null;
      }
    }
    saveGameState();
    syncUI();
    alert("ถอดเครื่องแต่งกายออกเรียบร้อย");
  }
}

function renderDressingRoom() {
  const container = document.querySelector(".dressing-grid");
  if (!container) return;
  
  let apparels = APPAREL_DATABASE;
  if (currentDressingFilter !== "all") {
    apparels = APPAREL_DATABASE.filter(a => a.category === currentDressingFilter);
  }
  
  container.innerHTML = apparels.map(a => {
    const isUnlocked = state.unlockedApparel.includes(a.id);
    
    // Check if it is currently equipped in its slot
    let isEquipped = false;
    if (a.category === "hat") isEquipped = (state.equippedHat === a.id);
    else if (a.category === "glasses") isEquipped = (state.equippedGlasses === a.id);
    else if (a.category === "wings") isEquipped = (state.equippedWings === a.id);
    else if (a.category === "outfit") isEquipped = (state.equippedOutfit === a.id);
    else if (a.category === "top") isEquipped = (state.equippedTop === a.id);
    else if (a.category === "skirt" || a.category === "pant") isEquipped = (state.equippedBottom === a.id);
    
    return `
      <div class="dressing-card ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked-apparel' : ''}" onclick="toggleApparel('${a.id}')">
        <div class="dressing-emoji" style="width:45px; height:45px; display:flex; align-items:center; justify-content:center; margin:0 auto 4px auto;">${getApparelVisual(a.id, 40)}</div>
        <span class="dressing-name">${a.name} ${!isUnlocked ? '🔒' : ''}</span>
      </div>
    `;
  }).join("");
  
  // Sync the apparel scale slider UI values
  const slider = document.getElementById("apparelScaleSlider");
  if (slider) {
    slider.value = state.apparelScale || 1.0;
  }
  const valLabel = document.getElementById("apparelScaleVal");
  if (valLabel) {
    valLabel.innerText = (state.apparelScale || 1.0).toFixed(2) + "x";
  }
  
  // Initialize drag-and-drop on render
  initApparelDragAndDrop();
}

function updateApparelScale(val) {
  state.apparelScale = parseFloat(val);
  const valLabel = document.getElementById("apparelScaleVal");
  if (valLabel) {
    valLabel.innerText = parseFloat(val).toFixed(2) + "x";
  }
  renderDynamicPets();
  initApparelDragAndDrop();
}

let tempApparelOffset = null;

let currentDressingFilter = "all";

function filterDressingRoom(filterName, tabEl) {
  currentDressingFilter = filterName;
  
  // Highlight the clicked tab
  const tabs = document.querySelectorAll(".dressing-tab");
  tabs.forEach(t => t.classList.remove("active"));
  if (tabEl) {
    tabEl.classList.add("active");
  }
  
  // Re-render the dressing room grid
  renderDressingRoom();
}

function initApparelDragAndDrop() {
  const container = document.getElementById("petDressingContainer");
  if (!container) return;
  
  // Wait a tick for DOM to complete rendering
  setTimeout(() => {
    const apparel = container.querySelector(".pet-apparel-overlay.active-drag-target");
    if (!apparel) {
      tempApparelOffset = null;
      return;
    }
    
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    
    // Default position values relative to parent wrapper
    const customOffset = getApparelOffset(state.activeApparel);
    const category = APPAREL_DATABASE.find(a => a.id === state.activeApparel)?.category;
    const preset = getApparelDefaultPreset(state.activeApparel, category);
    
    const petScale = getPetScale();
    let currentX = customOffset ? customOffset.x : Math.round(preset.x * petScale);
    let currentY = customOffset ? customOffset.y : Math.round(preset.y * petScale);
    
    const scale = (state.apparelScale || 1.0) * petScale * preset.scale;
    apparel.style.left = `${currentX}px`;
    apparel.style.top = `${currentY}px`;
    apparel.style.transform = `scale(${scale})`;
    
    tempApparelOffset = { x: currentX, y: currentY };
    
    apparel.onpointerdown = function(e) {
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      apparel.setPointerCapture(e.pointerId);
      e.stopPropagation();
    };
    
    apparel.onpointermove = function(e) {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      apparel.style.left = `${currentX}px`;
      apparel.style.top = `${currentY}px`;
      tempApparelOffset = { x: currentX, y: currentY };
      e.stopPropagation();
    };
    
    const onEnd = function(e) {
      if (!isDragging) return;
      isDragging = false;
      try {
        apparel.releasePointerCapture(e.pointerId);
      } catch (err) {}
    };
    
    apparel.onpointerup = onEnd;
    apparel.onpointercancel = onEnd;
  }, 100);
}

function saveDressingChanges() {
  if (tempApparelOffset) {
    state.apparelOffset = { ...tempApparelOffset };
    if (state.activeApparel) {
      if (!state.apparelOffsets) state.apparelOffsets = {};
      state.apparelOffsets[state.activeApparel] = { ...tempApparelOffset };
    }
  }
  saveGameState();
  syncUI();
  alert("✨ บันทึกตำแหน่งและเครื่องแต่งกายเรียบร้อยแล้วค่ะ!");
  nav("screen-1");
}
