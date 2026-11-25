// js/core/router.js: ปลดล็อกตามเลเวล และการเปลี่ยนหน้า (nav)
// ==========================================
// CORE NAVIGATION & ROUTER SYSTEM
// ==========================================

// Helper for Level Unlocking progression
function checkLevelUnlock(requiredLevel, featureName) {
  if (state.level < requiredLevel) {
    alert(`🔒 ${featureName} จะปลดล็อกเมื่อน้องสัตว์เลี้ยงถึง เลเวล ${requiredLevel} ค่ะ!\n(เลเวลปัจจุบันของคุณ: เลเวล ${state.level}) มาสะสม EXP ด้วยการทำกิจกรรมและป้อนอาหารให้น้องน้า! ✨`);
    return false;
  }
  return true;
}

// Progressive Level EXP Requirement formula:
// Level 0 -> Level 1 = 10 EXP
// Level 1 -> Level 2 = 20 EXP
// Level 2 -> Level 3 = 30 EXP
// ...
// Level 19 -> Level 20 = 200 EXP (Capped at 200 EXP max)
function getRequiredExp(level) {
  if (level <= 0) return 10;
  return Math.min(200, (level + 1) * 10);
}

function checkLevelUp() {
  // ตอนเป็นไข่ ยังไม่เลเวลอัปจาก EXP: ต้องทำเควสให้ครบก่อน (js/pets/pet-stages.js)
  if (state.level === 0) {
    saveGameState();
    syncUI();
    return false;
  }
  const startLevel = state.level;
  let reqExp = getRequiredExp(state.level);
  let leveledUp = false;
  
  while (state.exp >= reqExp) {
    state.exp -= reqExp;
    state.level++;
    leveledUp = true;
    const oldReq = reqExp;
    reqExp = getRequiredExp(state.level);
    
    if (state.level === 1) {
      alert(`🥚 ป๊อป! ไข่ฟองน้อยได้ฟักออกเป็นตัวน้อง ${state.petName} แล้วค่ะ! 🎉 ยินดีต้อนรับสู่โลกใบใหญ่น้าตัวเล็ก! 🌟`);
    } else {
      alert(`🎉 เลเวลอัป! สัตว์เลี้ยงของคุณเลเวลเพิ่มขึ้นเป็น เลเวล ${state.level} แล้วค่ะ! 🌟\n(ใช้ ${oldReq} EXP - เลเวลถัดไปต้องการ ${reqExp} EXP)`);
    }
    if (typeof renderDynamicPets === "function") renderDynamicPets();
  }
  
  if (leveledUp && typeof petStageAnnounce === "function") petStageAnnounce(startLevel, state.level);
  saveGameState();
  syncUI();
  return leveledUp;
}

function renderRoomLockBanner(screenId, requiredLevel, featureName) {
  const activeView = document.getElementById(screenId);
  if (!activeView) return;

  let banner = activeView.querySelector(".room-lock-banner");
  if (state.level < requiredLevel) {
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "room-lock-banner";
      banner.style.cssText = "background: rgba(239, 68, 68, 0.9); color: #ffffff; text-align: center; padding: 7px 12px; font-size: 11px; font-weight: 700; border-radius: 14px; margin: 8px 10px; backdrop-filter: blur(8px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); z-index: 20;";
      
      const header = activeView.querySelector(".screen-header");
      if (header) {
        header.after(banner);
      } else {
        activeView.prepend(banner);
      }
    }
    banner.innerHTML = `🔒 ${featureName} จะใช้งานได้เมื่อถึง เลเวล ${requiredLevel} (เลเวลปัจจุบันของคุณ: เลเวล ${state.level})`;
    banner.style.display = "block";
  } else if (banner) {
    banner.style.display = "none";
  }
}

function nav(screenId) {
  if (state.level === 0 && !state.petChosen && screenId !== "screen-2") {
    alert("กรุณาเลือกน้องสัตว์เลี้ยงก่อนนะคะ! 🐾");
    return;
  }



  // Lock daily quests until mood is recorded (all other activities are always open)
  const lockedScreens = ["screen-14"];
  if (state.level > 0 && !state.moodRecorded && lockedScreens.includes(screenId)) {
    alert("🔒 ระบบเควสประจำวันถูกล็อกอยู่ค่ะ! คุณต้องเข้าไประบุอารมณ์ของคุณในหน้าไดอารี่ประจำวันก่อน จึงจะสามารถดูเควสและรับรางวัลเควสได้นะคะ ✍️");
    nav("screen-12");
    return;
  }

  state.activeScreen = screenId;
  
  // Hide all screens
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  
  // Show active screen
  const activeView = document.getElementById(screenId);
  if (activeView) {
    activeView.classList.add("active");
  }

  // Render Lock Banner if Level Requirement is not met
  const screenLevels = {
    "screen-5": { lvl: 0, name: "กิจกรรมในห้องนอน" },
    "screen-16": { lvl: 1, name: "ระบบร้านค้า" },
    "screen-17": { lvl: 1, name: "การใช้อาหารในกระเป๋า" },
    "screen-7": { lvl: 0, name: "กิจกรรมในห้องน้ำ" },
    "screen-4": { lvl: 3, name: "บ้านและห้องนั่งเล่น" },
    "screen-9": { lvl: 8, name: "ห้องแต่งตัวลองชุด" },
    "screen-10": { lvl: 10, name: "กิจกรรมในห้องเล่นของเล่น" },
    "screen-6": { lvl: 15, name: "กิจกรรมในห้องอาหาร" },
    "screen-8": { lvl: 25, name: "การปลูกผักในสวน" },
    "screen-15": { lvl: 0, name: "ศูนย์รวมมินิเกม" },
    "screen-24": { lvl: 6, name: "ดนตรีบำบัด" }
  };

  if (screenLevels[screenId]) {
    renderRoomLockBanner(screenId, screenLevels[screenId].lvl, screenLevels[screenId].name);
  }

  // If going to Screen 3, default to info tab
  if (screenId === "screen-3") {
    switchProfileTab("info");
  }

  // Handle header visibility
  // Show top stats header only on Home, Test+AI, Diary, Healing Music, Quest, Shop, Settings, and More
  const headerViews = ["screen-1", "screen-11", "screen-12", "screen-13", "screen-14", "screen-16", "screen-22", "screen-23", "screen-24"];
  const header = document.getElementById("appHeader");
  if (headerViews.includes(screenId)) {
    header.style.display = "flex";
  } else {
    header.style.display = "none";
  }

  // If going to Screen 24, initialize and render healing sounds, otherwise turn off
  if (screenId === "screen-24") {
    if (!state.healingAudios) {
      state.healingAudios = {};
    }
    renderHealingSounds();
    } else {
    if (typeof stopAllHealingSounds === "function") {
      stopAllHealingSounds();
    }
  }

  // Highlight active bottom tab button
  document.querySelectorAll(".app-bottom-nav .nav-tab").forEach(tab => {
    tab.classList.remove("active");
    if (tab.getAttribute("data-tab") === screenId) {
      tab.classList.add("active");
    }
  });

  // Center the active tab in scrollable nav bar
  centerActiveTab(screenId);

  if (screenId === "screen-11") {
    if (!state.moodTestQuestions || state.moodTestQuestions.length === 0) {
      initMoodTest();
    }
  }

  // Render lists dynamically when entering screen
  if (screenId === "screen-14") {
    renderDailyQuests();
  } else if (screenId === "screen-6" && typeof renderDiningFood === "function") {
    renderDiningFood();
  } else if (screenId === "screen-9" && typeof renderDressingRoom === "function") {
    renderDressingRoom();
  } else if (screenId === "screen-16" && typeof renderShopItems === "function") {
    const activeTab = document.querySelector(".shop-tab.active")?.dataset.shoptab || "food";
    renderShopItems(activeTab);
  } else if (screenId === "screen-17" && typeof renderBagScreen === "function") {
    const activeTab = document.querySelector(".bag-tab.active")?.innerText || "à¸—à¸±à¹‰à¸‡à¸«à¸¡à¸”";
    renderBagScreen(activeTab);
  } else if (screenId === "screen-8" && typeof renderFarmPlots === "function") {
    renderFarmPlots();
  } else if (screenId === "screen-12" && typeof renderCalendar === "function") {
    renderCalendar();
    if (typeof renderMoodAnalytics === "function") renderMoodAnalytics();
  }

  // Sync state values on UI
  syncUI();
}


// Center active tab inside horizontally scrollable container
function centerActiveTab(screenId) {
  const container = document.getElementById("scrollableTabs");
  const tab = container.querySelector(`.nav-tab[data-tab="${screenId}"]`);
  if (tab) {
    const containerWidth = container.offsetWidth;
    const tabOffsetLeft = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;
    container.scrollTo({
      left: tabOffsetLeft - (containerWidth / 2) + (tabWidth / 2),
      behavior: 'smooth'
    });
  }
}
