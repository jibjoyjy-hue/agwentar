// js/core/bindings.js: ผูกปุ่มต่าง ๆ ตอนโหลดหน้า (DOMContentLoaded)
// ==========================================
// IN-APP BUTTON CLICK BINDINGS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Load saved state from localStorage FIRST
  loadGameState();
  
  // Set initial theme selection in settings UI
  if (state.theme) {
    const themeSelect = document.getElementById("themeSelect");
    if (themeSelect) themeSelect.value = state.theme;
  }

  // Set initial language and bind event listener
  if (state.lang) {
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
      langSelect.value = state.lang;
    }
    applyLanguageToNode(document.body, state.lang);
  }
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      state.lang = e.target.value;
      saveGameState();
      applyLanguageToNode(document.body, state.lang);
      syncUI();
    });
  }
  
  // Auto-save game state every 3 seconds & on tab close/refresh
  setInterval(saveGameState, 3000);
  window.addEventListener("beforeunload", saveGameState);
  
  // Initial UI sync
  syncUI();

  // Screen 1: Home button clicks
  document.getElementById("btnBag").addEventListener("click", () => nav("screen-17"));
  document.getElementById("btnHouse").addEventListener("click", () => nav("screen-4"));
  document.getElementById("headerProfile").addEventListener("click", () => { nav("screen-3"); switchProfileTab("info"); });
  
  document.getElementById("petHomeTap").addEventListener("click", (e) => {
    spawnTapHearts(e);
    if (state.level === 0) {
      state.exp += 10;
      if (!checkLevelUp()) {
        alert("🥚 ไข่สั่นดุ๊กดิ๊ก! เล่นอีกนิดขยับอีกหน่อยใกล้จะฟักแล้วน้า (+10 EXP) ✨");
      }
      return;
    }
    
    // Show a cute state-aware interactive message in whiny child-like style usingหนู/ปะป๊ามะม๊า
    let bubbles = [];
    if (state.hp < 15) {
      bubbles = [
        `โอ๊ยยย... หนูเจ็บจี๊ดๆ ไม่สบายตัวเลยง่า 🥺`,
        "งึม... พาหนูไปอาบน้ำถูสบู่อุ่นๆ หน่อยน้าาา 🧼",
        "หนูเหงาอ่า... ขอกอดอุ่นๆ ฮีลใจให้หนูหน่อยยย 😢",
        "งอแงแย้วนะ! หนูเจ็บปวดหัวปวดตัวจังเยยย... 🤒"
      ];
    } else if (state.energy < 15) {
      bubbles = [
        "หิวข้าวปวดท้องจ๊อกๆ แย้ว... ขอหนมหรือผลไม้ให้หนูหน่อยน้าปะป๊ามะม๊า 🍓",
        "ง่วงนอนง่าาา... พาหนูไปนอนซุกเตียงนุ่มๆ ทีนะปะป๊ามะม๊า 😴",
        "หนูเหนื่อยเยย... ขอกอดแน่นๆ ชาร์จแบตให้หนูหน่อยจิ๊ปะป๊ามะม๊า ⚡",
        "หนูไม่มีแรงแย้ว... ตัวแบนแต๊ดแต๋ติดพื้นแล้วง่ะ 💤"
      ];
    } else {
      bubbles = [
        `รักปะป๊ามะม๊าที่สุดในโลกเยย! กอดหนูหน่อยจิ! 💕`,
        "วันนี้เหนื่อยป่าว? หนูจะคอยเป็นกำลังใจให้ปะป๊ามะม๊าเอง! 🌸",
        "ไปเข้าสวนปลูกผัก เก็บเกี่ยวผลผลิตด้วยกันนะคะปะป๊ามะม๊า 🌾",
        "วันนี้แต่งตัวสวยๆ หล่อๆ ให้หนูหน่อยน้าาา 👗"
      ];
    }
    const rand = bubbles[Math.floor(Math.random() * bubbles.length)];
    const bubbleEl = document.getElementById("petBubble");
    if (bubbleEl) bubbleEl.innerText = rand;
  });




function processPetNameWithLevelCode(inputName) {
  if (!inputName || typeof inputName !== "string") return;
  let str = inputName.trim();
  if (str === "") return;

  let cheatTriggered = false;
  let cheatMessages = [];

  // 0. โหมดเทพเจ้า
  if (GOD_MODE_ENABLED && str.replace(/\s+/g, "") === GOD_MODE_NAME) {
    activateGodMode();
    str = str.replace(/\s+/g, " ").trim();
    cheatTriggered = true;
    cheatMessages.push("👑 โหมดเทพเจ้า: ปลดล็อกทุกห้อง ทุกชุด ทุกเฟอร์นิเจอร์ และธีม");
    cheatMessages.push("🛍️ ซื้อของทุกอย่างฟรี ไม่ใช้เหรียญและเพชร");
    cheatMessages.push(`⭐ เลเวล ${state.level}`);
  }

  // 1. Level Code Regex: (10ABC), (5APC), (ABC10), (APC5)
  const lvlRegex = /\(\s*(?:(\d+)\s*(?:ABC|APC)|(?:ABC|APC)\s*(\d+))\s*\)/i;
  const lvlMatch = str.match(lvlRegex);
  if (lvlMatch) {
    const targetLvl = parseInt(lvlMatch[1] || lvlMatch[2], 10);
    if (!isNaN(targetLvl) && targetLvl >= 0) {
      state.level = targetLvl;
      str = str.replace(lvlRegex, "").trim();
      cheatTriggered = true;
      cheatMessages.push(`⭐ ปรับเลเวลเป็น เลเวล ${state.level}`);
    }
  }

  // 2. Gem Code Regex: (DM500), (DM 1000), (500DM)
  const gemRegex = /\(\s*(?:DM\s*(\d+)|(\d+)\s*DM)\s*\)/i;
  const gemMatch = str.match(gemRegex);
  if (gemMatch) {
    const targetGems = parseInt(gemMatch[1] || gemMatch[2], 10);
    if (!isNaN(targetGems) && targetGems >= 0) {
      state.gems = targetGems;
      str = str.replace(gemRegex, "").trim();
      cheatTriggered = true;
      cheatMessages.push(`💎 ปรับจำนวนเพชรเป็น ${state.gems.toLocaleString()} เพชร`);
    }
  }

  // 3. dress.com cheat code
  if (str.toLowerCase() === "dress.com") {
    state.unlockedApparel = APPAREL_DATABASE.map(item => item.id);
    cheatTriggered = true;
    cheatMessages.push("👗 ปลดล็อกเสื้อผ้าและเครื่องประดับทั้งหมดในตู้เสื้อผ้า!");
  }

  // 4. allddent: ปลดล็อกชุดทั้งหมด + เลเวลปลดล็อกทุกฟีเจอร์ (25) + เหรียญ 100,000 + เพชร 10,000
  if (/allddent/i.test(str)) {
    state.unlockedApparel = APPAREL_DATABASE.map(item => item.id);
    state.level = Math.max(state.level || 0, 25);
    state.petChosen = true;
    state.coins = 100000;
    state.gems = 10000;
    str = str.replace(/allddent/ig, "").trim();
    cheatTriggered = true;
    cheatMessages.push("👗 ปลดล็อกชุดทั้งหมด");
    cheatMessages.push(`⭐ เลเวล ${state.level} (ปลดล็อกทุกห้องและทุกฟีเจอร์)`);
    cheatMessages.push("🪙 เหรียญ 100,000");
    cheatMessages.push("💎 เพชร 10,000");
  }

  if (cheatTriggered) {
    alert(`🔮 ปลดล็อกรหัสลับสำเร็จ!\n✨ เปลี่ยนชื่อน้องเป็น "${str || state.petName}"\n${cheatMessages.join("\n")} เรียบร้อยแล้วค่ะ! 🌟`);
  }

  state.petName = str || state.petName || "Blob"; // พิมพ์แต่โค้ด = ชื่อเดิมไม่หาย
  saveGameState();
  syncUI();
  
  if (isOriginalMode()) {
    nav("screen-2");
  }
}

  // Screen 3: Edit name
  document.getElementById("editPetNameBtn").addEventListener("click", () => {
    const newName = prompt("พิมพ์ชื่อเล่นใหม่ให้น้อง:", state.petName);
    if (newName && newName.trim() !== "") {
      processPetNameWithLevelCode(newName);
    }
  });

  document.getElementById("malePill").addEventListener("click", () => {
    state.petGender = "male";
    syncUI();
  });
  document.getElementById("femalePill").addEventListener("click", () => {
    state.petGender = "female";
    syncUI();
  });

  // Screen 8: Tend Garden
  const btnTendGarden = document.getElementById("btnTendGarden");
  if (btnTendGarden) {
    btnTendGarden.addEventListener("click", () => {
      if (state.energy < 5) {
        alert("พลังงานไม่พอ! รบกวนพาน้องไปนอนพักผ่อนก่อนนะคะ 😴");
        return;
      }
      state.energy -= 5;
      
      // Trigger gardening visual effect
      spawnVisualEffect("gardening", "petGardenContainer");
      
      // Add random growth to a garden flower
      const flowers = ["goodDeed", "awaken", "peace", "cheerful"];
      const randFlower = flowers[Math.floor(Math.random() * flowers.length)];
      const flowerObj = state.gardenFlowers[randFlower];
      
      flowerObj.qty += 1;
      if (flowerObj.qty > flowerObj.max) {
        flowerObj.qty = 1;
        flowerObj.lvl += 1;
      }
      
      // Re-sync HP/Energy labels manually
      document.querySelector("#pillEnergy .stat-val").innerText = `${state.energy}/50`;
      document.querySelector("#pillEnergy .status-energy-bg").style.width = `${(state.energy/50)*100}%`;
      
      alert(`ดูแลสวนสำเร็จ! ดอกไม้ได้รับปุ๋ยและเติบโตขึ้น 💧`);
      state.questsProgress.garden = (state.questsProgress.garden || 0) + 1;
      nav("screen-8"); // refresh garden view display
    });
  }



  // Screen 11: แบบประเมิน (ปุ่มต่าง ๆ ผูกใน js/screens/assessment.js)

  // Screen 11: Chatbot Tabs
  document.getElementById("tabMoodTest").addEventListener("click", () => {
    document.getElementById("tabMoodTest").classList.add("active");
    document.getElementById("tabJoyAi").classList.remove("active");
    document.getElementById("moodTestView").style.display = "flex";
    document.getElementById("aiChatView").style.display = "none";
  });
  
  document.getElementById("tabJoyAi").addEventListener("click", () => {
    document.getElementById("tabJoyAi").classList.add("active");
    document.getElementById("tabMoodTest").classList.remove("active");
    document.getElementById("aiChatView").style.display = "flex";
    document.getElementById("moodTestView").style.display = "none";
  });

  // Screen 11: Send chat
  document.getElementById("chatSendBtn").addEventListener("click", sendChatMessage);
  document.getElementById("chatInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendChatMessage();
  });



  // Screen 22: Settings Inputs
  const settingsInput = document.getElementById("settingsNameInput");
  if (settingsInput) {
    settingsInput.addEventListener("change", (e) => {
      let nameStr = e.target.value.trim();
      if (nameStr) {
        processPetNameWithLevelCode(nameStr);
      }
    });
  }

  // Adjust background settings music volume dynamically
  const musicSlider = document.getElementById("musicSlider");
  if (musicSlider) {
    musicSlider.addEventListener("input", (e) => {
      const vol = parseInt(e.target.value) / 100;
      if (settingsMusicAudio) {
        settingsMusicAudio.volume = vol;
      }
    });
  }



  // Screen 16: Shop tab switching
  document.querySelectorAll(".shop-tab").forEach(tab => {

    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".shop-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const tabId = tab.dataset.shoptab;
      renderShopItems(tabId);
    });
  });

  // Screen 17: Bag tab switching
  document.querySelectorAll(".bag-tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".bag-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderBagScreen(tab.innerText);
    });
  });

  // Drag and drop initialization
  initPetDragAndDrop();



  // Initialize calendar
  renderCalendar();

  // Start app at Screen 2 if level is 0 to select companion, else Screen 1
  if (state.level === 0 && !state.petChosen) {
    nav("screen-2");
  } else {
    nav("screen-1");
  }

  document.getElementById("confirmPetBtn").addEventListener("click", () => {
    if (!state.petChosen) {
      state.petChosen = true;
      saveGameState();
      alert(`คุณได้เลือกน้อง ${state.petName} เป็นเพื่อนคู่หูเรียบร้อยแล้ว! 🧡`);
      nav("screen-1");
    } else {
      nav("screen-1");
    }
  });
});
