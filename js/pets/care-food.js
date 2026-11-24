// js/pets/care-food.js: ให้อาหาร อาบน้ำ และอาหารในห้องอาหาร
// ==========================================
// SIMULATED INTERACTIONS & HANDLERS
// ==========================================

// Centralized Food Consumption & Eating Animation Engine
function consumeFoodWithAnimation(foodId, foodName, targetContainerId, source = "dining") {
  if (source === "dining" && !checkLevelUnlock(15, "กิจกรรมในห้องอาหาร")) return;
  if (source === "bag" && !checkLevelUnlock(1, "การใช้อาหารในกระเป๋า")) return;
  const qty = state.foods[foodId] || 0;
  if (qty <= 0) {
    alert(`คุณไม่มี ${foodName} เหลือในกระเป๋าแล้วค่ะ! สามารถเลือกซื้ออาหารอร่อยๆ เพิ่มได้ที่ร้านค้านะคะ 🛍️`);
    return;
  }
  
  const foodEmojis = {
    carrot: "🥕", tomato: "🍅", potato: "🥔", corn: "🌽", broccoli: "🥦", strawberry: "🍓", avocado: "🥑", watermelon: "🍉", grapes: "🍇", pumpkin: "🎃",
    sandwich: "🥪", cake: "🍰", cookie: "🍪", water: "💧", milk: "🥛",
    greentea: "🍵", bubbletea: "🧋", chocolate: "🍫", pizza: "🍕",
    donut: "🍩", frenchfries: "🍟", icecream: "🍦", popcorn: "🍿",
    cupcake: "🧁", friedchicken: "🍗", ramen: "🍜", onigiri: "🍙",
    fruitjuice: "🧃", babybottle: "🍼", coffee: "☕", soda: "🥤",
    coconut: "🥥", honeytea: "🍯", burger: "🍔", sushi: "🍣"
  };
  
  const boosts = {
    carrot: { hp: 10, energy: 10 },
    tomato: { hp: 12, energy: 10 },
    potato: { hp: 15, energy: 12 },
    corn: { hp: 15, energy: 12 },
    broccoli: { hp: 18, energy: 12 },
    strawberry: { hp: 15, energy: 15 },
    avocado: { hp: 20, energy: 18 },
    watermelon: { hp: 20, energy: 20 },
    grapes: { hp: 22, energy: 20 },
    pumpkin: { hp: 25, energy: 25 },
    sandwich: { hp: 10, energy: 10 },
    cake: { hp: 15, energy: 10 },
    cookie: { hp: 5, energy: 5 },
    water: { hp: 0, energy: 5 },
    milk: { hp: 5, energy: 10 },
    greentea: { hp: 5, energy: 5 },
    bubbletea: { hp: 10, energy: 15 },
    chocolate: { hp: 10, energy: 15 },
    pizza: { hp: 15, energy: 15 },
    donut: { hp: 5, energy: 8 },
    frenchfries: { hp: 8, energy: 8 },
    icecream: { hp: 8, energy: 5 },
    popcorn: { hp: 4, energy: 6 },
    cupcake: { hp: 8, energy: 6 },
    friedchicken: { hp: 15, energy: 12 },
    ramen: { hp: 20, energy: 15 },
    onigiri: { hp: 5, energy: 8 },
    fruitjuice: { hp: 5, energy: 5 },
    babybottle: { hp: 10, energy: 5 },
    coffee: { hp: 2, energy: 15 },
    soda: { hp: 0, energy: 10 },
    coconut: { hp: 8, energy: 8 },
    honeytea: { hp: 10, energy: 8 },
    burger: { hp: 12, energy: 12 },
    sushi: { hp: 15, energy: 10 }
  };
  
  const boost = boosts[foodId] || { hp: 5, energy: 8 };
  const emoji = foodEmojis[foodId] || "🥪";
  
  // Deduct food from inventory
  state.foods[foodId]--;
  state.energy = Math.min(50, state.energy + boost.energy);
  state.hp = Math.min(50, state.hp + boost.hp);
  state.questsProgress.feed = Math.min(3, (state.questsProgress.feed || 0) + 1);
  
  // Trigger Dedicated Pet Eating Modal Animation Popup
  const modal = document.getElementById("petEatingModal");
  const modalTitle = document.getElementById("eatingModalTitle");
  const petDisplay = document.getElementById("eatingPetDisplay");
  const foodPiece = document.getElementById("eatingFoodPiece");
  const statusText = document.getElementById("eatingStatusText");
  const particlesBox = document.getElementById("eatingBiteParticles");

  if (modal && foodPiece && statusText) {
    modal.style.display = "flex";
    if (modalTitle) modalTitle.innerText = `✨ น้องกำลังหม่ำๆ ${foodName}...`;
    
    // Render pet inside modal
    if (petDisplay) {
      const petScale = getPetScale();
      const scale = (state.apparelScale || 1.0) * petScale;
      const appSize = Math.round(90 * petScale);
      let overlaysHtml = "";
      const equipped = getEquippedApparels();
      
      equipped.forEach(item => {
        let offsetStyle = "";
        const customOffset = getApparelOffset(item.id);
        
        if (customOffset && customOffset.x !== undefined) {
          const topOffset = Math.round(customOffset.y * petScale);
          const leftOffset = Math.round(customOffset.x * petScale);
          offsetStyle = `style="top: ${topOffset}px; left: ${leftOffset}px; transform: scale(${scale});"`;
        } else {
          let defaultTop = -15; // default for hat
          if (item.category === "glasses") defaultTop = 15;
          else if (item.category === "wings") defaultTop = 25;
          else if (item.category === "outfit") defaultTop = 45;
          else if (item.category === "top") defaultTop = 45;
          else if (item.category === "bottom") defaultTop = 75;
          
          let styleStr = `transform: translateX(-50%) scale(${scale}); top: ${Math.round(defaultTop * petScale)}px;`;
          offsetStyle = `style="${styleStr}"`;
        }
        
        overlaysHtml += `<div class="pet-apparel-overlay" ${offsetStyle}>${getApparelVisual(item.id, appSize)}</div>`;
      });
      
      petDisplay.innerHTML = `
        <div class="pet-character-wrapper" style="position: relative; transition: transform 0.2s ease;" id="modalPetCharacter">
          ${getPetVisual(220)}
          ${overlaysHtml}
        </div>
      `;
    }

    // Initialize food piece at mouth
    foodPiece.innerText = emoji;
    foodPiece.style.transform = "translate(-50%, -50%) scale(1) rotate(0deg)";
    foodPiece.style.opacity = "1";
    if (statusText) statusText.innerText = `ง่ำ! กำลังกิน ${foodName}... 😋`;
    if (particlesBox) particlesBox.innerHTML = "";

    const modalPet = document.getElementById("modalPetCharacter");

    // Phase 1: Bite 1 (First Chew - Food shrinks to 68%)
    setTimeout(() => {
      foodPiece.style.transform = "translate(-50%, -50%) scale(0.68) rotate(-12deg)";
      if (statusText) statusText.innerText = `ง่ำๆ! คำที่ 1... 😋`;
      if (modalPet) {
        modalPet.style.transform = "scale(1.15) translateY(-10px)";
        setTimeout(() => { if (modalPet) modalPet.style.transform = "scale(1) translateY(0)"; }, 200);
      }
    }, 400);

    // Phase 2: Bite 2 (Second Chew - Food shrinks to 35%)
    setTimeout(() => {
      foodPiece.style.transform = "translate(-50%, -50%) scale(0.35) rotate(15deg)";
      foodPiece.style.opacity = "0.75";
      if (statusText) statusText.innerText = `หยับๆๆ! คำสุดท้ายแล้วน้า... 🎵`;
      if (modalPet) {
        modalPet.style.transform = "scale(1.18) translateY(-12px)";
        setTimeout(() => { if (modalPet) modalPet.style.transform = "scale(1) translateY(0)"; }, 200);
      }
    }, 900);

    // Phase 3: Bite 3 (Swallowed completely & Food Vanishes!)
    setTimeout(() => {
      foodPiece.style.transform = "translate(-50%, -50%) scale(0)";
      foodPiece.style.opacity = "0";
      if (statusText) statusText.innerText = `ทานหมดแล้ว! อร่อยมากๆ เลยค่ะ 🥰💖`;
      if (modalPet) {
        modalPet.style.transform = "scale(1.25) translateY(-20px)";
        setTimeout(() => { if (modalPet) modalPet.style.transform = "scale(1) translateY(0)"; }, 300);
      }
      spawnVisualEffect("stat", "eatingPetDisplay", `+${boost.energy} ⚡ +${boost.hp} ❤️`);
    }, 1450);

    // Phase 4: Close Modal
    setTimeout(() => {
      modal.style.display = "none";
    }, 2400);
  }

  // Also play eating animation on target screen container if available
  const container = document.getElementById(targetContainerId) || document.getElementById("petEatContainer");
  if (container) {
    const petBody = container.querySelector(".pet-body-img") || container.querySelector(".pet-body-main");
    if (petBody) {
      petBody.classList.add("pet-munching");
      setTimeout(() => petBody.classList.remove("pet-munching"), 1300);
    }
  }

  // Floating stat notification
  spawnVisualEffect("stat", targetContainerId || "petEatContainer", `+${boost.energy} ⚡ +${boost.hp} ❤️`);

  syncUI();
  
  // Re-render dining food tray & bag list if active
  if (typeof renderDiningFood === "function") renderDiningFood();
  if (typeof renderBagScreen === "function") {
    const activeTab = document.querySelector(".bag-tab.active")?.innerText || "ทั้งหมด";
    renderBagScreen(activeTab);
  }
}

function feedPet(foodId, foodName, val) {
  consumeFoodWithAnimation(foodId, foodName, "petEatContainer", "dining");
}

function feedPetAuto() {
  const availableFoods = Object.keys(state.foods).filter(key => state.foods[key] > 0);
  
  if (availableFoods.length === 0) {
    alert("ไม่เหลืออาหารในกระเป๋าแล้วค่ะ! กรุณาไปซื้ออาหารเพิ่มที่ร้านค้าก่อนนะคะ 🛒");
    return;
  }
  
  const foodKey = availableFoods[0];
  const foodNames = {
    sandwich: "แซนวิช", cake: "เค้ก", cookie: "คุกกี้", water: "น้ำเปล่า", milk: "นมสด",
    greentea: "ชาเขียว", bubbletea: "ชานมไข่มุก", chocolate: "ช็อกโกแลต", pizza: "พิซซ่า",
    donut: "โดนัท", frenchfries: "เฟรนช์ฟรายส์", icecream: "ไอศกรีม", popcorn: "ป๊อปคอร์น",
    cupcake: "คัพเค้ก", friedchicken: "ไก่ทอด", ramen: "ราเมน", onigiri: "ข้าวปั้น",
    burger: "เบอร์เกอร์", sushi: "ซูชิ"
  };
  
  consumeFoodWithAnimation(foodKey, foodNames[foodKey] || "อาหาร", "petEatContainer", "dining");
}

// Screen 7: Clean/Bath items
function triggerCleanAction(actionName) {
  if (!checkLevelUnlock(0, "กิจกรรมในห้องน้ำ")) return;
  state.hp = Math.min(50, state.hp + 4);
  
  // Progress clean quest
  state.questsProgress.clean = Math.min(1, state.questsProgress.clean + 1);
  
  // Trigger bath/brush/clean visual effect
  if (actionName.includes("อาบน้ำ")) {
    spawnVisualEffect("bathing", "petBathContainer");
  } else if (actionName.includes("ถูสบู่") || actionName.includes("สบู่")) {
    spawnVisualEffect("brush_teeth", "petBathContainer");
  } else {
    spawnVisualEffect("clean", "petBathContainer");
  }
  
  document.querySelector("#pillHp .stat-val").innerText = `${state.hp}/50`;
  document.querySelector("#pillHp .status-hp-bg").style.width = `${(state.hp/50)*100}%`;
  
  alert(`ทำการ ${actionName} ให้ ${state.petName} ตัวหอม ฟื้นฟูสุขภาพเสร็จเรียบร้อย! 🛁❤️`);
}

// Screen 17: Use Food from Inventory Bag
// Screen 17: Use Food from Inventory Bag
function useBagFood(foodId, foodName) {
  if (!checkLevelUnlock(1, "การใช้อาหารในกระเป๋า")) return;
  consumeFoodWithAnimation(foodId, foodName, "petBagContainer", "bag");
}

// Dynamic rendering functions
function renderDiningFood() {
  const container = document.getElementById("diningFoodTray");
  if (!container) return;

  const foodCatalog = [
    { id: "carrot", name: "แครอท", emoji: "🥕" },
    { id: "tomato", name: "มะเขือเทศ", emoji: "🍅" },
    { id: "potato", name: "มันฝรั่ง", emoji: "🥔" },
    { id: "corn", name: "ข้าวโพด", emoji: "🌽" },
    { id: "broccoli", name: "บล็อคโคลี่", emoji: "🥦" },
    { id: "strawberry", name: "สตรอว์เบอร์รี่", emoji: "🍓" },
    { id: "avocado", name: "อะโวคาโด", emoji: "🥑" },
    { id: "watermelon", name: "แตงโม", emoji: "🍉" },
    { id: "grapes", name: "องุ่น", emoji: "🍇" },
    { id: "pumpkin", name: "ฟักทอง", emoji: "🎃" },
    { id: "sandwich", name: "แซนวิช", emoji: "🥪" },
    { id: "cake", name: "เค้ก", emoji: "🍰" },
    { id: "cookie", name: "คุกกี้", emoji: "🍪" },
    { id: "chocolate", name: "ช็อกโกแลต", emoji: "🍫" },
    { id: "pizza", name: "พิซซ่า", emoji: "🍕" },
    { id: "donut", name: "โดนัท", emoji: "🍩" },
    { id: "frenchfries", name: "เฟรนช์ฟรายส์", emoji: "🍟" },
    { id: "icecream", name: "ไอศกรีม", emoji: "🍦" },
    { id: "popcorn", name: "ป๊อปคอร์น", emoji: "🍿" },
    { id: "cupcake", name: "คัพเค้ก", emoji: "🧁" },
    { id: "friedchicken", name: "ไก่ทอด", emoji: "🍗" },
    { id: "ramen", name: "ราเมน", emoji: "🍜" },
    { id: "onigiri", name: "ข้าวปั้น", emoji: "🍙" },
    { id: "burger", name: "เบอร์เกอร์", emoji: "🍔" },
    { id: "sushi", name: "ซูชิ", emoji: "🍣" },
    { id: "water", name: "น้ำเปล่า", emoji: "💧" },
    { id: "milk", name: "นมสด", emoji: "🥛" },
    { id: "greentea", name: "ชาเขียว", emoji: "🍵" },
    { id: "bubbletea", name: "ชานมไข่มุก", emoji: "🧋" },
    { id: "fruitjuice", name: "น้ำผลไม้", emoji: "🧃" },
    { id: "babybottle", name: "ขวดนม", emoji: "🍼" },
    { id: "coffee", name: "กาแฟร้อน", emoji: "☕" },
    { id: "soda", name: "น้ำอัดลม", emoji: "🥤" },
    { id: "coconut", name: "น้ำมะพร้าว", emoji: "🥥" },
    { id: "honeytea", name: "ชาน้ำผึ้ง", emoji: "🍯" }
  ];

  const ownedFoods = foodCatalog.filter(f => (state.foods[f.id] || 0) > 0);

  if (ownedFoods.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 12px 10px; color: rgba(255, 255, 255, 0.9); width: 100%; background: rgba(0, 0, 0, 0.25); backdrop-filter: blur(8px); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.15);">
        <div style="font-size: 28px; margin-bottom: 3px;">🛒</div>
        <div style="font-size: 12px; font-weight: 700;">ไม่มีอาหารเหลือในกระเป๋าแล้วค่ะ</div>
        <div style="font-size: 10px; opacity: 0.8; margin-bottom: 8px;">เลือกซื้ออาหารและเครื่องดื่มน่าทานเพิ่มเติมได้ที่ร้านค้า</div>
        <button class="btn-gradient" onclick="nav('screen-16')" style="padding: 5px 14px; font-size: 11px; border-radius: 20px; cursor: pointer;">ไปร้านค้า 🛍️</button>
      </div>
    `;
    return;
  }

  let html = `<div style="font-size: 11px; font-weight: 700; color: #fff; text-align: center; margin-bottom: 6px; text-shadow: 0 1px 4px rgba(0,0,0,0.5);">🍽️ เลือกอาหารจากกระเป๋าเพื่อป้อนน้อง:</div>`;
  html += `<div class="dining-food-grid" style="display: flex; gap: 8px; overflow-x: auto; padding: 4px 6px; max-width: 100%; scrollbar-width: thin;">`;

  ownedFoods.forEach(f => {
    const qty = state.foods[f.id];
    html += `
      <div class="dining-food-card" onclick="consumeFoodWithAnimation('${f.id}', '${f.name}', 'petEatContainer', 'dining')" style="flex: 0 0 auto; width: 72px; background: rgba(255, 255, 255, 0.22); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 14px; padding: 8px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.15s ease, background 0.15s ease;">
        <span style="font-size: 26px; margin-bottom: 2px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">${f.emoji}</span>
        <span style="font-size: 10px; font-weight: 700; color: #fff; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 64px;">${f.name}</span>
        <span style="font-size: 9px; color: #fef08a; font-weight: 800; margin-top: 2px; background: rgba(0,0,0,0.25); padding: 1px 6px; border-radius: 10px;">x${qty}</span>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}
