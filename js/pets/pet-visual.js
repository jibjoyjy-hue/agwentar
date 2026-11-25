// js/pets/pet-visual.js: รูปสัตว์เลี้ยง ชุดที่สวม และการแสดงผลสัตว์เลี้ยง
// Helper to get scale factor based on level
function getPetScale() {
  if (state.level === 0) {
    return 110 / 180; // Egg scale
  }
  const minScale = 130 / 180;
  const maxScale = 1.0;
  const maxGrowthLevel = 10;
  const currentLvl = Math.min(state.level, maxGrowthLevel);
  return minScale + ((currentLvl - 1) / (maxGrowthLevel - 1)) * (maxScale - minScale);
}

// Helper to get pet visual element (image or emoji fallback)
function getPetVisual(sizePx = 90) {
  const scale = getPetScale();
  const finalSize = Math.round(sizePx * scale);
  
  // ร่างตามเลเวล (js/pets/pet-stages.js)
  let stageKey = (state.petId || "aimee").toLowerCase(); if (stageKey === "gwentar") stageKey = "bear";
  const stage = typeof getPetStage === "function" ? getPetStage() : { id: state.level === 0 ? "egg" : "baby" };
  const stageArt = typeof petStageArt === "function" ? petStageArt(stageKey, stage.id) : "";
  if (stageArt) {
    const anim = stage.id === "egg" ? " animation: petEggWobble 2s infinite ease-in-out; cursor:pointer;" : "";
    return `<img src="${stageArt}" class="pet-body-img pet-stage-${stage.id}" style="width:${finalSize}px; height:${finalSize}px; object-fit:contain;${anim}" alt="${state.petName}">`;
  }
  if (stage.id === "egg") {
    return typeof getEggSvg === "function" ? getEggSvg(finalSize - 6)
      : `<div class="pet-body-main" style="font-size:${finalSize - 6}px; display:inline-block; animation: petEggWobble 2s infinite ease-in-out; cursor:pointer;">🥚</div>`;
  }

  // น้องตัวมาตรฐาน: ลำตัวทรงเดียวกันทุกตัว ชุดจึงพอดีทุกตัว (pets_std.js)
  let stdKey = (state.petId || "aimee").toLowerCase(); if (stdKey === "gwentar") stdKey = "bear";
  if (window.hasStandardPet && hasStandardPet(stdKey) && stdKey === "aimee") {
    const outfit = ""; // ปิดระบบชุดเต็มตัวแล้ว เหลือแต่เครื่องประดับ
    return `<span class="pet-body-img pet-outfit-stack" style="position:relative; display:inline-block; width:${finalSize}px; height:${finalSize}px; line-height:0;">${getStandardPetSvg(stdKey, finalSize, outfit)}</span>`;
  }

  // ชุดเต็มตัว (F1–F25): สวมทับบนสัตว์เลี้ยงตัวเดิม แทนการเปลี่ยนเป็นรูปหมี
  const fullOutfitId = ""; // เอาระบบชุดเต็มตัวออกแล้ว
  if (fullOutfitId) {
    // ชุดกับตัวสัตว์อยู่ในกล่องเดียวกัน จึงขยับ/เด้ง/เอียงไปพร้อมกัน
    const bare = getBarePetVisual(finalSize).replace('class="pet-body-img" style="', 'class="pet-body-inner" style="object-fit:contain; ');
    let petKey = (state.petId || "aimee").toLowerCase(); if (petKey === "gwentar") petKey = "bear";
    return `<span class="pet-body-img pet-outfit-stack" style="position:relative; display:inline-block; width:${finalSize}px; height:${finalSize}px; line-height:0;">${bare}${window.getOutfitSvg ? getOutfitSvg(fullOutfitId, finalSize, "wear", petKey) : ""}</span>`;
  }
  return getBarePetVisual(finalSize);
}

// รูปสัตว์เลี้ยงเปล่า (ไม่มีชุดเต็มตัว)
function getBarePetVisual(finalSize) {
  let petLower = (state.petId || "aimee").toLowerCase();
  if (petLower === "gwentar") petLower = "bear";
  const croppedPets = ["aimee", "blob", "bunny", "cat", "puppy", "penguin", "bear", "panda", "fox", "chick", "otter", "hamster", "dino", "pig", "capybara", "parrot", "giraffe", "elephant"];
  if (croppedPets.includes(petLower)) {
    return `<img src="assets/${petLower}.png?v=11" class="pet-body-img" style="width:${finalSize}px; height:${finalSize}px;" alt="${state.petName}">`;
  } else {
    return `<div class="pet-body-main" style="font-size:${finalSize - 6}px;">${state.petEmoji}</div>`;
  }
}

function getEquippedApparels() {
  const list = [];
  if (state.equippedWings) list.push({ id: state.equippedWings, category: "wings" });
  if (state.equippedOutfit) list.push({ id: state.equippedOutfit, category: "outfit" });
  if (state.equippedTop) list.push({ id: state.equippedTop, category: "top" });
  if (state.equippedBottom) list.push({ id: state.equippedBottom, category: "bottom" });
  if (state.equippedGlasses) list.push({ id: state.equippedGlasses, category: "glasses" });
  if (state.equippedHat) list.push({ id: state.equippedHat, category: "hat" });
  
  // Filter only items present in APPAREL_DATABASE
  const filtered = list.filter(item => APPAREL_DATABASE.some(dbItem => dbItem.id === item.id));
  
  // If a body-replacing outfit is equipped, remove it from the equipped overlays list
    const bodyReplacingId = [
    state.equippedOutfit, state.equippedTop, state.equippedBottom
  ].find(id => id && [
    "pink_cardigan_skirt", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
    "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25",
    "pink_cardigan", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8",
    "pink_skirt", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8",
    "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"
  ].includes(id));
  
  if (bodyReplacingId) {
    return filtered.filter(item => item.id !== bodyReplacingId);
  }
  return filtered;
}

function getApparelOffset(itemId) {
  if (state.apparelOffsets && state.apparelOffsets[itemId]) {
    return state.apparelOffsets[itemId];
  }
  if (state.activeApparel === itemId && state.apparelOffset) {
    if (!state.apparelOffsets) state.apparelOffsets = {};
    state.apparelOffsets[itemId] = { ...state.apparelOffset };
    return state.apparelOffset;
  }
  return null;
}

const DEFAULT_APPAREL_OFFSETS = {
  // Hats
  "wizard_hat": { x: 52.5, y: -20, scale: 1.0 },
  "crown": { x: 52.5, y: -22, scale: 1.0 },
  "grad_cap": { x: 52.5, y: -15, scale: 1.0 },
  "santa_hat": { x: 52.5, y: -18, scale: 1.0 },
  "flower_crown": { x: 52.5, y: -8, scale: 1.0 },
  "bunny_ears": { x: 52.5, y: -25, scale: 1.0 },
  "headphones": { x: 52.5, y: 10, scale: 1.0 },
  "cat_ears": { x: 52.5, y: -18, scale: 1.0 },
  "hat_party": { x: 52.5, y: -22, scale: 1.0 },
  "hat_straw": { x: 52.5, y: -18, scale: 1.0 },
  "hat_chef": { x: 52.5, y: -28, scale: 1.0 },
  "hat_bear_ears": { x: 52.5, y: -18, scale: 1.0 },
  "hat_halo": { x: 52.5, y: -38, scale: 1.0 },
  
  // Glasses / Face
  "cool_sunglasses": { x: 52.5, y: 32, scale: 1.0 },
  "ribbon": { x: 52.5, y: -8, scale: 1.0 },
  "glasses": { x: 52.5, y: 32, scale: 1.0 },
  "glass_heart": { x: 52.5, y: 32, scale: 1.0 },
  "glass_monocle": { x: 52.5, y: 32, scale: 1.0 },
  "glass_eyepatch": { x: 52.5, y: 32, scale: 1.0 },
  "face_blush": { x: 52.5, y: 38, scale: 1.0 },

  // Wings
  "angel_wings": { x: 52.5, y: 45, scale: 1.1 },
  "wing_fairy": { x: 52.5, y: 45, scale: 1.1 },
  "wing_bat": { x: 52.5, y: 45, scale: 1.1 },
  "wing_butterfly": { x: 52.5, y: 45, scale: 1.1 },
  "wing_jetpack": { x: 52.5, y: 45, scale: 1.1 },
  
  // Sticker body-replacements
  "F1": { x: 52.5, y: 68, scale: 1.15 },
  "F2": { x: 52.5, y: 68, scale: 1.15 },
  "F3": { x: 52.5, y: 68, scale: 1.15 },
  "F5": { x: 52.5, y: 68, scale: 1.15 },
  "F6": { x: 52.5, y: 68, scale: 1.15 },
  "F7": { x: 52.5, y: 68, scale: 1.15 },
  "F8": { x: 52.5, y: 68, scale: 1.15 },
  "F9": { x: 52.5, y: 68, scale: 1.15 },
  "F10": { x: 52.5, y: 68, scale: 1.15 },
  "F11": { x: 52.5, y: 68, scale: 1.15 },
  "F12": { x: 52.5, y: 68, scale: 1.15 },
  "F13": { x: 52.5, y: 68, scale: 1.15 },
  "F14": { x: 52.5, y: 68, scale: 1.15 },
  "F15": { x: 52.5, y: 68, scale: 1.15 },
  "F16": { x: 52.5, y: 68, scale: 1.15 },
  "F17": { x: 52.5, y: 68, scale: 1.15 },
  "F18": { x: 52.5, y: 68, scale: 1.15 },
  "F19": { x: 52.5, y: 68, scale: 1.15 },
  "F20": { x: 52.5, y: 68, scale: 1.15 },
  "F21": { x: 52.5, y: 68, scale: 1.15 },
  "F22": { x: 52.5, y: 68, scale: 1.15 },
  "F23": { x: 52.5, y: 68, scale: 1.15 },
  "F24": { x: 52.5, y: 68, scale: 1.15 },
  "F25": { x: 52.5, y: 68, scale: 1.15 },
  "T1": { x: 52.5, y: 68, scale: 1.15 },
  "T4": { x: 52.5, y: 68, scale: 1.15 },
  "P5": { x: 52.5, y: 68, scale: 1.15 }
};

// Helper to get default preset for an item
function getApparelDefaultPreset(itemId, category) {
  // หมี 2 มิติ (Aimee/Gwentar) ตัวสั้นกว่ารูปเดิม: แว่นอยู่สูงขึ้น ปีกอยู่ต่ำลง
  const stdBear = ["aimee", "bear", "gwentar"].includes((state.petId || "").toLowerCase());
  if (stdBear && DEFAULT_APPAREL_OFFSETS[itemId]) {
    const d = DEFAULT_APPAREL_OFFSETS[itemId];
    if (category === "glasses") return { ...d, y: itemId === "face_blush" ? 30 : itemId === "ribbon" ? d.y : 22 };
    if (category === "wings") return { ...d, y: 72, scale: 1.25 };
  }
  if (DEFAULT_APPAREL_OFFSETS[itemId]) {
    return DEFAULT_APPAREL_OFFSETS[itemId];
  }
  let defaultY = 45;
  let defaultScale = 1.0;
  if (category === "hat") defaultY = -15;
  else if (category === "glasses") defaultY = 30;
  else if (category === "wings") defaultY = 40;
  else if (category === "outfit" || category === "top") { defaultY = 56; defaultScale = 1.15; }
  else if (category === "skirt" || category === "pant" || category === "bottom") { defaultY = 88; defaultScale = 1.15; }
  return { x: 52.5, y: defaultY, scale: defaultScale };
}

// Render dynamic pet illustrations across all pages
function renderDynamicPets() {
  const petDisplays = document.querySelectorAll(".dynamic-pet-display");
  const petScale = getPetScale();
  const apparelSize = Math.round(75 * petScale);
  
  petDisplays.forEach(container => {
    let overlaysHtml = "";
    const equipped = getEquippedApparels();
    
    equipped.forEach(item => {
      let offsetStyle = "";
      const preset = getApparelDefaultPreset(item.id, item.category);
      const scale = (state.apparelScale || 1.0) * petScale * preset.scale;
      const customOffset = getApparelOffset(item.id);
      
      if (customOffset && customOffset.x !== undefined) {
        const topOffset = Math.round(customOffset.y * petScale);
        const leftOffset = Math.round(customOffset.x * petScale);
        offsetStyle = `style="top: ${topOffset}px; left: ${leftOffset}px; transform: scale(${scale});"`;
      } else {
        const topOffset = Math.round(preset.y * petScale);
        const leftOffset = Math.round(preset.x * petScale);
        offsetStyle = `style="top: ${topOffset}px; left: ${leftOffset}px; transform: scale(${scale});"`;
      }
      
      const isDragTarget = (state.activeApparel === item.id) ? "active-drag-target" : "";
      overlaysHtml += `<div class="pet-apparel-overlay ${isDragTarget}" data-cat="${item.category}" ${offsetStyle}>${getApparelVisual(item.id, apparelSize)}</div>`;
    });
    
    container.innerHTML = `
      <div class="pet-character-wrapper" style="position: relative;">
        ${getPetVisual(180)}
        ${overlaysHtml}
        <div class="pet-3d-floor-shadow"></div>
      </div>
    `;
  });

  // Headers / standing pet indicators
  const headerAvatar = document.getElementById("headerPetAvatar");
  if (headerAvatar) {
    const appSize = Math.round(20 * petScale);
    let overlaysHtml = "";
    const equipped = getEquippedApparels();
    
    equipped.forEach(item => {
      let defaultTop = -10; // hat
      if (item.category === "glasses") defaultTop = 4;
      else if (item.category === "wings") defaultTop = 8;
      else if (item.category === "outfit") defaultTop = 12;
      else if (item.category === "top") defaultTop = 12;
      else if (item.category === "bottom") defaultTop = 20;
      
      const topPos = Math.round(defaultTop * petScale);
      overlaysHtml += `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(item.id, appSize)}</span>`;
    });
    
    headerAvatar.innerHTML = `
      <div style="position:relative;">
        ${getPetVisual(36)}
        ${overlaysHtml}
      </div>
    `;
  }

  const mapPet = document.getElementById("mapPetStanding");
  if (mapPet) {
    const appSize = Math.round(32 * petScale);
    let overlaysHtml = "";
    const equipped = getEquippedApparels();
    
    equipped.forEach(item => {
      let defaultTop = -16; // hat
      if (item.category === "glasses") defaultTop = 6;
      else if (item.category === "wings") defaultTop = 12;
      else if (item.category === "outfit") defaultTop = 18;
      else if (item.category === "top") defaultTop = 18;
      else if (item.category === "bottom") defaultTop = 30;
      
      const topPos = Math.round(defaultTop * petScale);
      overlaysHtml += `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(item.id, appSize)}</span>`;
    });
    
    mapPet.innerHTML = `
      <div style="position:relative;">
        ${getPetVisual(72)}
        ${overlaysHtml}
      </div>
    `;
  }

  const ventPet = document.getElementById("ventPetAvatar");
  if (ventPet) {
    const appSize = Math.round(62 * petScale);
    let overlaysHtml = "";
    const equipped = getEquippedApparels();
    
    equipped.forEach(item => {
      let defaultTop = -30; // hat
      if (item.category === "glasses") defaultTop = 12;
      else if (item.category === "wings") defaultTop = 22;
      else if (item.category === "outfit") defaultTop = 34;
      else if (item.category === "top") defaultTop = 34;
      else if (item.category === "bottom") defaultTop = 58;
      
      const topPos = Math.round(defaultTop * petScale);
      overlaysHtml += `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(item.id, appSize)}</span>`;
    });
    
    ventPet.innerHTML = `
      <div style="position:relative; display:inline-block;">
        ${getPetVisual(150)}
        ${overlaysHtml}
        <span style="position:absolute; bottom:0; right:-10px; font-size:24px;">🥺</span>
      </div>
    `;
  }
}


function updatePetBubbleText() {
  const bubbleEl = document.getElementById("petBubble");
  if (!bubbleEl) return;

  if (state.level === 0) {
    const left = typeof eggQuestsLeft === "function" ? eggQuestsLeft() : 2;
    const eggQuotes = [
      `ดุ๊กดิ๊กๆ... ทำเควสอีก ${left} อัน หนูจะฟักออกมาแล้วน้า! 🥚`,
      `ช่วยหนูทำเควสอีก ${left} อันนะ หนูอยากออกมาเจอแล้ว! ✨`,
      "งึมๆ... ข้างในนี้แคบจังเยยย 🥚"
    ];
    bubbleEl.innerText = eggQuotes[Math.floor((Date.now() / 10000) % eggQuotes.length)];
    return;
  }

  // Check stats for low values (Sulking/sad/complaining quotes like a whiny child using หนู/ปะป๊ามะม๊า)
  if (state.hp < 15) {
    const lowHpQuotes = [
      `งือออ... หนูเจ็บจี๊ดๆ ไม่สบายตัวเลยง่า 🥺`,
      "ตัวหนูร้อนจี๋เยย... พาหนูไปอาบน้ำถูสบู่หน่อยน้าาา 🧼",
      "เหงาจังเยย... หนูอยากให้ปะป๊ามะม๊ากอดแน่นๆ น้าาา 😢",
      "งอแงแย้วนะ! หนูเจ็บปวดหัวจังเยยย... 🤒"
    ];
    bubbleEl.innerText = lowHpQuotes[Math.floor((Date.now() / 8000) % lowHpQuotes.length)];
  } else if (state.energy < 15) {
    const lowEnergyQuotes = [
      `หนูหิวข้าวแย้วง่าาา! ท้องร้องดังจ๊อกๆ เลยเนี่ยยย 🍞`,
      "ง่วงนอนจังเยย... ตาหนูจะปิดอยู่แย้วนะปะป๊ามะม๊า 😴",
      "หนูเหนื่อยจัง... ขอกินนมอุ่นๆ หรือขนมปังหน่อยจิ๊ 🥛",
      "หนูไม่มีแรงเยยย... ตัวแบนแต๊ดแต๋ติดพื้นแย้วง่ะ 💤"
    ];
    bubbleEl.innerText = lowEnergyQuotes[Math.floor((Date.now() / 8000) % lowEnergyQuotes.length)];
  } else {
    // Normal / Happy quotes in cute child style
    const currentText = bubbleEl.innerText;
    const defaultTexts = [
      "ปะป๊ามะม๊ากลับมาแว้วหรอคะ! หนูคิดถึงปะป๊ามะม๊าที่สุดเยยย 💖",
      "ปะป๊ามะม๊ากลับมาแว้วหรอคะ! หนูคิดถึงปะป๊ามะม๊าที่สุดเยยย 💙",
      "ปะป๊ามะม๊ากลับมาแว้วหรอคะ! หนูคิดถึงปะป๊ามะม๊าที่สุดเยยย"
    ];
    // ข้อความตอนเป็นไข่ (มี 🥚 หรือคำว่า ฟัก) ก็เปลี่ยนเป็นข้อความปกติหลังฟัก
    if (defaultTexts.includes(currentText) || currentText === "" || /🥚|ฟัก/.test(currentText)) {
      const normalQuotes = [
        "รักปะป๊ามะม๊าที่สุดในโลกเยย! กอดหนูหน่อยจิ! 💕",
        "วันนี้เหนื่อยป่าว? หนูจะคอยเป็นกำลังใจให้ปะป๊ามะม๊าเอง! 🌸",
        "ไปเข้าสวนปลูกผัก เก็บเกี่ยวผลผลิตด้วยกันนะคะปะป๊ามะม๊า 🌾",
        "วันนี้แต่งตัวสวยๆ หล่อๆ ให้หนูหน่อยน้าาา 👗"
      ];
      bubbleEl.innerText = normalQuotes[Math.floor((Date.now() / 15000) % normalQuotes.length)];
    }
  }
}

function toggleDecoratingMode() {}
function openDecorSelection(slotName, event) {}
function closeDecorDrawer() {}
function placeFurnitureItem(slotName, itemId) {}
function renderPlacedFurniture() {}
