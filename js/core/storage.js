// js/core/storage.js: บันทึกและโหลดข้อมูลจาก localStorage
// ==========================================
// LOCAL STORAGE PERSISTENCE ENGINE (บันทึกข้อมูลไม่ให้เวลหรือความคืบหน้ารีเซต)
// ==========================================
const SAVE_KEY = "joyblob_game_save_v2";

let isResetting = false;

function saveGameState() {
  if (isResetting) return;
  try {
    const dataToSave = {
      lang: state.lang,
      theme: state.theme,
      petId: state.petId,
      petName: state.petName,
      petEmoji: state.petEmoji,
      petGender: state.petGender,
      petChosen: state.petChosen,
      selectedEggId: state.selectedEggId,
      coins: state.coins,
      gems: state.gems,
      hp: state.hp,
      energy: state.energy,
      level: state.level,
      exp: state.exp,
      selectedMood: state.selectedMood,
      moodRecorded: state.moodRecorded,
      questsProgress: state.questsProgress,
      questsClaimed: state.questsClaimed,
      allQuestsBonusClaimedDate: state.allQuestsBonusClaimedDate || "",
      lastMagicWaterDate: state.lastMagicWaterDate || "",
      activeApparel: state.activeApparel,
      equippedOutfit: state.equippedOutfit || "",
      equippedTop: state.equippedTop || "",
      equippedBottom: state.equippedBottom || "",
      equippedHat: state.equippedHat || "",
      equippedGlasses: state.equippedGlasses || "",
      equippedWings: state.equippedWings || "",
      apparelScale: state.apparelScale,
      apparelOffsets: state.apparelOffsets || {},
      foods: state.foods,
      unlockedApparel: state.unlockedApparel,
      farmPlots: state.farmPlots,
      apparelOffset: state.apparelOffset,
      bubblePopHighScore: state.bubblePopHighScore,
      cakeStackHighScore: state.cakeStackHighScore || 0,
      gardenFlowers: state.gardenFlowers,
      lastCheckInDate: state.lastCheckInDate,
      lastMoodTestDate: state.lastMoodTestDate,
      lastDiaryDate: state.lastDiaryDate,
      diaryHistory: state.diaryHistory || [],
      ownedFurniture: state.ownedFurniture || ["wall_none", "floor_none", "table_none"],
      placedFurniture: state.placedFurniture || { wall: "wall_none", floor: "floor_none", table: "table_none" },
      // แบบประเมิน (เก็บในเครื่องเท่านั้น)
      ageBand: state.ageBand || "",
      assessmentHistory: state.assessmentHistory || [],
      // สมาชิกพรีเมียม (เดิมไม่ได้บันทึก ทำให้สิทธิ์หายเมื่อเปิดแอปใหม่)
      premium: state.premium || null,
      premiumCodesUsed: state.premiumCodesUsed || [],
      psyTickets: state.psyTickets || [],
      // ความยินยอมผู้ปกครอง (js/features/consent.js)
      consent: state.consent || null,
      eggQuestsDone: state.eggQuestsDone || 0,
      eggWarmth: state.eggWarmth || 0
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(dataToSave));
  } catch (e) {
    console.warn("Unable to save game state to localStorage:", e);
  }
}

function isOriginalMode() {
  if (!state.petName) return false;
  return state.petName.toLowerCase().includes("aimee");
}

function loadGameState() {
  try {
    const rawData = localStorage.getItem(SAVE_KEY);
    if (!rawData) return;
    const parsed = JSON.parse(rawData);
    if (parsed && typeof parsed === "object") {
      Object.assign(state, parsed);
      // ธีมพิเศษใช้ได้เฉพาะสมาชิกพรีเมียม (ตรวจอีกครั้งตอนโหลดหน้าใน applyThemeAccess)
      if (state.theme && !themeAllowed(state.theme)) state.theme = DEFAULT_THEME;
      // Apply theme immediately on load
      if (state.theme) {
        document.documentElement.setAttribute("data-theme", state.theme);
      }
      // Migration: fallback for petId in older saves
      if (!state.petId) {
        const match = (typeof PET_TEMPLATES !== "undefined") ? PET_TEMPLATES.find(p => p.emoji === state.petEmoji) : null;
        state.petId = match ? match.id : "Bunny";
      }
      // เซฟเก่าที่เป็นตัวที่เลิกใช้แล้ว (aimee, gwentar) เปลี่ยนเป็นกระต่าย (ชื่อน้องยังเหมือนเดิม) — หมีกลับมาเลือกได้แล้ว จึงไม่เปลี่ยน
      if (["aimee", "gwentar"].includes(String(state.petId || "").toLowerCase())) {
        state.petId = "Bunny";
        state.petEmoji = "🐰";
      }
      // Safeguard nested objects & arrays
      if (parsed.foods) state.foods = { ...state.foods, ...parsed.foods };
      if (parsed.questsProgress) state.questsProgress = { ...state.questsProgress, ...parsed.questsProgress };
      if (parsed.questsClaimed) state.questsClaimed = { ...state.questsClaimed, ...parsed.questsClaimed };
      if (parsed.unlockedApparel) state.unlockedApparel = [ ...parsed.unlockedApparel ];
      if (parsed.farmPlots) state.farmPlots = parsed.farmPlots;
      if (parsed.diaryHistory) state.diaryHistory = [ ...parsed.diaryHistory ];
      if (parsed.ownedFurniture) state.ownedFurniture = [ ...parsed.ownedFurniture ];
      if (parsed.placedFurniture) state.placedFurniture = { ...state.placedFurniture, ...parsed.placedFurniture };
      if (parsed.apparelOffsets) state.apparelOffsets = { ...parsed.apparelOffsets };

      // Migration for old saves (activeApparel -> slots)
      if (state.activeApparel && !state.equippedHat && !state.equippedGlasses && !state.equippedWings && !state.equippedOutfit && !state.equippedTop && !state.equippedBottom) {
        const item = APPAREL_DATABASE.find(a => a.id === state.activeApparel);
        if (item) {
          if (item.category === "hat") state.equippedHat = item.id;
          else if (item.category === "glasses") state.equippedGlasses = item.id;
          else if (item.category === "wings") state.equippedWings = item.id;
          else if (item.category === "outfit") state.equippedOutfit = item.id;
          else if (item.category === "top") state.equippedTop = item.id;
          else if (item.category === "skirt" || item.category === "pant") state.equippedBottom = item.id;
        }
      }

      // New Day check for Diary / Quests reset
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const todayStr = `${year}-${month}-${day}`;
      if (state.lastDiaryDate !== todayStr) {
        state.moodRecorded = false;
      }
    }
  } catch (e) {
    console.warn("Unable to load game state from localStorage:", e);
  }
}

// ---- ธีม: ผู้ใช้ทั่วไปใช้ธีมเริ่มต้น ธีมอื่นเป็นสิทธิ์พรีเมียม ----
const DEFAULT_THEME = "pastel";
function themeAllowed(themeName) {
  return themeName === DEFAULT_THEME || (typeof isPremiumMember === "function" && isPremiumMember());
}
// แสดงกุญแจบนการ์ดธีมที่ยังใช้ไม่ได้ และกลับไปธีมเริ่มต้นถ้าพรีเมียมหมดอายุ
function applyThemeAccess() {
  document.querySelectorAll(".theme-card").forEach(card => {
    const locked = !themeAllowed(card.getAttribute("data-theme-id"));
    card.classList.toggle("theme-locked", locked);
    card.title = locked ? "ธีมพิเศษสำหรับสมาชิกพรีเมียม" : "";
  });
  if (state.theme && !themeAllowed(state.theme)) changeAppTheme(DEFAULT_THEME);
}
document.addEventListener("DOMContentLoaded", () => setTimeout(applyThemeAccess, 300));

function changeAppTheme(themeName) {
  // Gracefully migrate legacy theme names
  const legacyMap = {
    violet: "pastel",
    pink: "light",
    green: "forest",
    brown: "light"
  };
  if (legacyMap[themeName]) {
    themeName = legacyMap[themeName];
  }
  if (!themeAllowed(themeName)) {
    if (typeof openPremiumModal === "function") openPremiumModal("info");
    themeName = DEFAULT_THEME;
  }

  state.theme = themeName;
  document.documentElement.setAttribute("data-theme", themeName);
  
  // Sync select element if it exists
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) themeSelect.value = themeName;

  // Sync grid visual cards in Settings
  const cards = document.querySelectorAll(".theme-card");
  cards.forEach(card => {
    if (card.getAttribute("data-theme-id") === themeName) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  saveGameState();
}

function selectAppTheme(themeName) {
  // Update visual active classes on cards
  const cards = document.querySelectorAll(".theme-card");
  cards.forEach(card => {
    if (card.getAttribute("data-theme-id") === themeName) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });

  // Apply theme
  changeAppTheme(themeName);

  // Play a premium bubble sound effect
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn("AudioContext failed:", e);
  }
}

function resetGameState() {
  if (confirm("คุณต้องการรีเซ็ตข้อมูลเกมทั้งหมดและเริ่มเล่นใหม่ใช่หรือไม่? 🧹")) {
    isResetting = true;
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
}



// Map Apparel IDs to Emojis
const APPAREL_EMOJIS = {
  wizard_hat: "🧙",
  crown: "👑",
  cool_sunglasses: "🕶️",
  ribbon: "🎀",
  cat_ears: "🐱",
  angel_wings: "🪽",
  grad_cap: "🎓",
  santa_hat: "🎅",
  flower_crown: "🌸",
  bunny_ears: "🐰",
  headphones: "🎧",
  glasses: "👓",
  pink_cardigan: "👚",
  pink_skirt: "👗",
  pink_cardigan_skirt: "🎀",
  F1: "👗",
  F2: "⛵",
  F3: "🔮",
  F4: "📚",
  F5: "🌈",
  F6: "🦖",
  T1: "🧸",
  T2: "⛵",
  T3: "🌻",
  T4: "🔮",
  T5: "📚",
  T6: "🎀",
  T7: "🍂",
  T8: "❄️",
  S1: "👗",
  S2: "⛵",
  S3: "🌻",
  S4: "✨",
  S5: "📚",
  S6: "🌈",
  S7: "🧚",
  S8: "🍓",
  P1: "⭐",
  P2: "🩷",
  P3: "🌿",
  P4: "🌌",
  P5: "🧸",
  P6: "🏃",
  P7: "🍂",
  P8: "🌙"
};

// Database of all available apparel items
const APPAREL_DATABASE = [
  // Hats (หมวก)
  { id: "wizard_hat", name: "หมวกพ่อมด", emoji: "🧙", price: 150, currency: "coins", category: "hat" },
  { id: "crown", name: "มงกุฎทอง", emoji: "👑", price: 300, currency: "coins", category: "hat" },
  { id: "grad_cap", name: "หมวกรับปริญญา", emoji: "🎓", price: 200, currency: "coins", category: "hat" },
  { id: "santa_hat", name: "หมวกซานต้า", emoji: "🎅", price: 180, currency: "coins", category: "hat" },
  { id: "flower_crown", name: "มงกุฎดอกไม้", emoji: "🌸", price: 220, currency: "coins", category: "hat" },
  { id: "bunny_ears", name: "หูกระต่าย", emoji: "🐰", price: 160, currency: "coins", category: "hat" },
  { id: "headphones", name: "หูฟังเกมเมอร์", emoji: "🎧", price: 250, currency: "coins", category: "hat" },
  { id: "cat_ears", name: "หูแมว", emoji: "🐱", price: 100, currency: "coins", category: "hat" },
  
  // New Hats
  { id: "hat_party", name: "หมวกปาร์ตี้สายรุ้ง", emoji: "🥳", price: 120, currency: "coins", category: "hat" },
  { id: "hat_straw", name: "หมวกฟางชาวสวน", emoji: "👒", price: 140, currency: "coins", category: "hat" },
  { id: "hat_chef", name: "หมวกเชฟแสนอร่อย", emoji: "👨‍🍳", price: 160, currency: "coins", category: "hat" },
  { id: "hat_bear_ears", name: "หูหมีพาสเทล", emoji: "🧸", price: 110, currency: "coins", category: "hat" },
  { id: "hat_halo", name: "วงแหวนเทวดา", emoji: "😇", price: 50, currency: "gems", category: "hat" },

  // Glasses (แว่นตา)
  { id: "cool_sunglasses", name: "แว่นกันแดด", emoji: "🕶️", price: 120, currency: "coins", category: "glasses" },
  { id: "ribbon", name: "โบว์ชมพู", emoji: "🎀", price: 60, currency: "coins", category: "glasses" },
  { id: "glasses", name: "แว่นตากรอบทอง", emoji: "👓", price: 100, currency: "coins", category: "glasses" },
  
  // New Glasses
  { id: "glass_heart", name: "แว่นตาหัวใจชมพู", emoji: "❤️", price: 130, currency: "coins", category: "glasses" },
  { id: "glass_monocle", name: "แว่นตาข้างเดียว", emoji: "🧐", price: 180, currency: "coins", category: "glasses" },
  { id: "glass_eyepatch", name: "ผ้าปิดตาโจรสลัด", emoji: "🏴‍☠️", price: 150, currency: "coins", category: "glasses" },
  { id: "face_blush", name: "สติกเกอร์แก้มแดง", emoji: "😊", price: 80, currency: "coins", category: "glasses" },

  // Wings (ปีก)
  { id: "angel_wings", name: "ปีกนางฟ้า", emoji: "🪽", price: 400, currency: "coins", category: "wings" },
  
  // New Wings
  { id: "wing_fairy", name: "ปีกแฟรี่มิ้นท์", emoji: "🧚", price: 450, currency: "coins", category: "wings" },
  { id: "wing_bat", name: "ปีกค้างคาวฮาโลวีน", emoji: "🦇", price: 400, currency: "coins", category: "wings" },
  { id: "wing_butterfly", name: "ปีกผีเสื้อแสนหวาน", emoji: "🦋", price: 420, currency: "coins", category: "wings" },
  { id: "wing_jetpack", name: "เป้จรวดเจ็ทแพ็ค", emoji: "🚀", price: 60, currency: "gems", category: "wings" },

];


// Furniture Items database categorized by slots
const FURNITURE_ITEMS = {
  wall: [
    { id: "wall_none", name: "ผนังโล่ง", emoji: "⬜", price: 0, currency: "coins", desc: "เริ่มต้น" },
    { id: "wall_window", name: "หน้าต่างฝนตก", emoji: "🪟", price: 300, currency: "coins", desc: "300 เหรียญ" },
    { id: "wall_painting", name: "กรอบรูปป่าไม้", emoji: "🖼️", price: 150, currency: "coins", desc: "150 เหรียญ" },
    { id: "wall_neon", name: "ไฟนีออนสายรุ้ง", emoji: "🌈", price: 500, currency: "coins", desc: "500 เหรียญ" },
    { id: "wall_star", name: "ดาวส่องแสง", emoji: "⭐", price: 200, currency: "coins", desc: "200 เหรียญ" }
  ],
  floor: [
    { id: "floor_none", name: "พื้นโล่ง", emoji: "⬜", price: 0, currency: "coins", desc: "เริ่มต้น" },
    { id: "floor_plant", name: "ต้นมอนสเตอร่า", emoji: "🪴", price: 120, currency: "coins", desc: "120 เหรียญ" },
    { id: "floor_bear", name: "หมีตุ๊กตาตัวใหญ่", emoji: "🧸", price: 250, currency: "coins", desc: "250 เหรียญ" },
    { id: "floor_guitar", name: "กีตาร์ไม้", emoji: "🎸", price: 400, currency: "coins", desc: "400 เหรียญ" },
    { id: "floor_box", name: "กล่องกระดาษน้อง", emoji: "📦", price: 100, currency: "coins", desc: "100 เหรียญ" }
  ],
  table: [
    { id: "table_none", name: "ขวาโล่ง", emoji: "⬜", price: 0, currency: "coins", desc: "เริ่มต้น" },
    { id: "table_lamp", name: "โคมไฟลาวา", emoji: "💡", price: 180, currency: "coins", desc: "180 เหรียญ" },
    { id: "table_cocoa", name: "โกโก้ร้อน", emoji: "☕", price: 80, currency: "coins", desc: "80 เหรียญ" },
    { id: "table_radio", name: "วิทยุวินเทจ", emoji: "📻", price: 350, currency: "coins", desc: "350 เหรียญ" },
    { id: "table_globe", name: "ลูกแก้วหิมะ", emoji: "🔮", price: 220, currency: "coins", desc: "220 เหรียญ" }
  ]
};

// High Definition SVG Vector Accessories Renderer
function getApparelVisual(apparelId, sizePx = 40) {
  if (!apparelId) return "";

    const newClothes = [
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
    "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", "F21", "F22", "F23", "F24", "F25",
    "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8",
    "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8",
    "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"
  ];
  if (newClothes.includes(apparelId)) {
    if (window.hasOutfitSvg && hasOutfitSvg(apparelId)) return getOutfitSvg(apparelId, sizePx, "icon"); // ชุดเซ็ตวาดใหม่
    const file = `${apparelId}.png?v=22`;
    return `<img src="assets/clothes/${file}" style="width:${sizePx}px; height:${sizePx}px; object-fit:contain; pointer-events:none;" alt="${apparelId}" draggable="false">`;
  }

  const svgMap = {
    wizard_hat: `
      <svg viewBox="0 0 100 100" style="width:${sizePx}px; height:${sizePx}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.35));">
        <path d="M 18,80 L 50,8 C 53,6 58,14 62,32 L 82,80 Z" fill="url(#wizGrad)" stroke="#3b0764" stroke-width="2.5"/>
        <ellipse cx="50" cy="80" rx="42" ry="12" fill="#5b21b6" stroke="#3730a3" stroke-width="2.5"/>
        <ellipse cx="50" cy="80" rx="37" ry="9" fill="#6d28d9"/>
        <path d="M 23,73 Q 50,84 77,73 Q 76,67 73,64 Q 50,75 27,64 Z" fill="#f59e0b"/>
        <polygon points="50,64 52,69 57,69 53,72 55,77 50,74 45,77 47,72 43,69 48,69" fill="#facc15" stroke="#b45309" stroke-width="1"/>
        <path d="M 38,34 L 40,38 L 44,38 L 41,41 L 42,45 L 38,42 L 34,45 L 35,41 L 32,38 L 36,38 Z" fill="#fef08a"/>
        <path d="M 58,46 L 59,49 L 62,49 L 60,51 L 61,54 L 58,52 L 55,54 L 56,51 L 54,49 L 57,49 Z" fill="#fef08a"/>
        <defs><linearGradient id="wizGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="50%" stop-color="#5b21b6"/><stop offset="100%" stop-color="#3b0764"/></linearGradient></defs>
      </svg>
    `,
    crown: `
      <svg viewBox="0 0 100 80" style="width:${sizePx}px; height:${sizePx * 0.8}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
        <path d="M 10,65 L 15,20 L 35,42 L 50,10 L 65,42 L 85,20 L 90,65 Z" fill="url(#crownGrad)" stroke="#b45309" stroke-width="3"/>
        <rect x="10" y="60" width="80" height="12" rx="4" fill="#f59e0b" stroke="#92400e" stroke-width="2"/>
        <circle cx="15" cy="20" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
        <circle cx="50" cy="10" r="6" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
        <circle cx="85" cy="20" r="5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
        <circle cx="30" cy="66" r="3.5" fill="#10b981"/>
        <circle cx="50" cy="66" r="4" fill="#ef4444"/>
        <circle cx="70" cy="66" r="3.5" fill="#10b981"/>
        <defs><linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#f59e0b"/></linearGradient></defs>
      </svg>
    `,
    grad_cap: `
      <svg viewBox="0 0 100 80" style="width:${sizePx}px; height:${sizePx * 0.8}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.35));">
        <path d="M 50,10 L 95,30 L 50,50 L 5,30 Z" fill="#1e293b" stroke="#0f172a" stroke-width="2.5"/>
        <path d="M 25,40 L 25,60 C 25,68 75,68 75,60 L 75,40 Z" fill="#0f172a" stroke="#020617" stroke-width="2"/>
        <path d="M 50,30 Q 75,28 82,45" fill="none" stroke="#facc15" stroke-width="2.5"/>
        <circle cx="50" cy="30" r="3" fill="#facc15"/>
        <polygon points="82,45 80,62 85,62" fill="#eab308"/>
      </svg>
    `,
    santa_hat: `
      <svg viewBox="0 0 100 90" style="width:${sizePx}px; height:${sizePx * 0.9}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
        <path d="M 20,70 Q 30,15 75,25 Q 85,30 85,45 L 80,45 Q 70,25 25,70 Z" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
        <path d="M 10,65 C 10,58 90,58 90,65 C 90,75 10,75 10,65 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
        <circle cx="85" cy="45" r="9" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      </svg>
    `,
    flower_crown: `
      <svg viewBox="0 0 100 60" style="width:${sizePx}px; height:${sizePx * 0.6}px; overflow:visible; filter:drop-shadow(0 3px 5px rgba(0,0,0,0.25));">
        <path d="M 10,40 Q 50,55 90,40" fill="none" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>
        <circle cx="25" cy="38" r="8" fill="#f472b6"/><circle cx="25" cy="38" r="3" fill="#fef08a"/>
        <circle cx="50" cy="42" r="10" fill="#facc15"/><circle cx="50" cy="42" r="4" fill="#ea580c"/>
        <circle cx="75" cy="38" r="8" fill="#38bdf8"/><circle cx="75" cy="38" r="3" fill="#fef08a"/>
        <ellipse cx="16" cy="34" rx="5" ry="3" fill="#4ade80" transform="rotate(-30 16 34)"/>
        <ellipse cx="84" cy="34" rx="5" ry="3" fill="#4ade80" transform="rotate(30 84 34)"/>
      </svg>
    `,
    bunny_ears: `
      <svg viewBox="0 0 100 100" style="width:${sizePx}px; height:${sizePx}px; overflow:visible; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.25));">
        <path d="M 15,50 Q 50,60 85,50" fill="none" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
        <path d="M 28,52 C 10,20 25,0 38,20 C 45,35 38,52 38,52 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
        <path d="M 29,48 C 17,22 27,8 35,22 C 40,33 36,48 36,48 Z" fill="#f472b6"/>
        <path d="M 62,52 C 62,52 55,35 62,20 C 75,0 90,20 72,52 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
        <path d="M 64,48 C 64,48 58,33 64,22 C 73,8 83,22 71,48 Z" fill="#f472b6"/>
      </svg>
    `,
    headphones: `
      <svg viewBox="0 0 100 90" style="width:${sizePx}px; height:${sizePx * 0.9}px; overflow:visible; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
        <path d="M 15,50 C 15,10 85,10 85,50" fill="none" stroke="#0284c7" stroke-width="7" stroke-linecap="round"/>
        <rect x="8" y="42" width="16" height="26" rx="8" fill="#ec4899" stroke="#9d174d" stroke-width="2"/>
        <rect x="76" y="42" width="16" height="26" rx="8" fill="#ec4899" stroke="#9d174d" stroke-width="2"/>
        <circle cx="16" cy="55" r="4" fill="#facc15"/>
        <circle cx="84" cy="55" r="4" fill="#facc15"/>
      </svg>
    `,
    cat_ears: `
      <svg viewBox="0 0 100 80" style="width:${sizePx}px; height:${sizePx * 0.8}px; overflow:visible; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.25));">
        <path d="M 15,45 Q 50,55 85,45" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <polygon points="15,45 28,10 42,48" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <polygon points="20,44 29,18 37,46" fill="#f472b6"/>
        <polygon points="58,48 72,10 85,45" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <polygon points="63,46 71,18 80,44" fill="#f472b6"/>
      </svg>
    `,
    hat_party: `
      <svg viewBox="0 0 100 100" style="width:${sizePx}px; height:${sizePx}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
        <polygon points="50,10 15,85 85,85" fill="#f43f5e" stroke="#be185d" stroke-width="2"/>
        <path d="M 33,48 L 67,48" stroke="#f59e0b" stroke-width="6"/>
        <path d="M 23,70 L 77,70" stroke="#10b981" stroke-width="6"/>
        <circle cx="50" cy="10" r="7" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
      </svg>
    `,
    hat_straw: `
      <svg viewBox="0 0 100 80" style="width:${sizePx}px; height:${sizePx*0.8}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.25));">
        <ellipse cx="50" cy="55" rx="46" ry="14" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
        <path d="M 25,52 C 25,20 75,20 75,52 Z" fill="#fde047" stroke="#ca8a04" stroke-width="2"/>
        <path d="M 26,50 Q 50,54 74,50 Q 74,45 72,45 Q 50,49 28,45 Z" fill="#dc2626"/>
      </svg>
    `,
    hat_chef: `
      <svg viewBox="0 0 100 100" style="width:${sizePx}px; height:${sizePx}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.25));">
        <rect x="28" y="55" width="44" height="25" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
        <path d="M 28,58 C 10,50 15,25 35,32 C 35,15 65,15 65,32 C 85,25 90,50 72,58 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      </svg>
    `,
    hat_bear_ears: `
      <svg viewBox="0 0 100 70" style="width:${sizePx}px; height:${sizePx*0.7}px; overflow:visible; filter:drop-shadow(0 3px 5px rgba(0,0,0,0.2));">
        <path d="M 15,45 Q 50,55 85,45" fill="none" stroke="#fbcfe8" stroke-width="5" stroke-linecap="round"/>
        <circle cx="24" cy="30" r="14" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
        <circle cx="24" cy="30" r="8" fill="#f472b6"/>
        <circle cx="76" cy="30" r="14" fill="#fbcfe8" stroke="#db2777" stroke-width="2"/>
        <circle cx="76" cy="30" r="8" fill="#f472b6"/>
      </svg>
    `,
    hat_halo: `
      <svg viewBox="0 0 100 50" style="width:${sizePx}px; height:${sizePx*0.5}px; overflow:visible; filter:drop-shadow(0 0 8px #fde047);">
        <ellipse cx="50" cy="25" rx="35" ry="10" fill="none" stroke="#facc15" stroke-width="5"/>
        <ellipse cx="50" cy="25" rx="30" ry="7" fill="none" stroke="#fef08a" stroke-width="2"/>
      </svg>
    `,
    glasses: `
      <svg viewBox="0 0 100 50" style="width:${sizePx}px; height:${sizePx * 0.5}px; overflow:visible; filter:drop-shadow(0 3px 5px rgba(0,0,0,0.25));">
        <circle cx="30" cy="25" r="18" fill="rgba(255,255,255,0.3)" stroke="#f59e0b" stroke-width="3.5"/>
        <circle cx="70" cy="25" r="18" fill="rgba(255,255,255,0.3)" stroke="#f59e0b" stroke-width="3.5"/>
        <path d="M 48,22 Q 50,18 52,22" fill="none" stroke="#f59e0b" stroke-width="3.5"/>
        <path d="M 12,22 L 2,18" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
        <path d="M 88,22 L 98,18" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `,
    cool_sunglasses: `
      <svg viewBox="0 0 100 50" style="width:${sizePx}px; height:${sizePx * 0.5}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.35));">
        <path d="M 12,15 L 46,15 L 42,38 C 40,42 16,42 14,38 Z" fill="#0f172a" stroke="#020617" stroke-width="2"/>
        <path d="M 54,15 L 88,15 L 86,38 C 84,42 60,42 58,38 Z" fill="#0f172a" stroke="#020617" stroke-width="2"/>
        <path d="M 46,18 L 54,18" stroke="#0f172a" stroke-width="4"/>
        <path d="M 16,18 L 30,32" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-linecap="round"/>
        <path d="M 58,18 L 72,32" stroke="rgba(255,255,255,0.4)" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `,
    ribbon: `
      <svg viewBox="0 0 100 60" style="width:${sizePx}px; height:${sizePx * 0.6}px; overflow:visible; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.25));">
        <ellipse cx="25" cy="30" rx="20" ry="14" fill="#ec4899" stroke="#be185d" stroke-width="2.5"/>
        <ellipse cx="75" cy="30" rx="20" ry="14" fill="#ec4899" stroke="#be185d" stroke-width="2.5"/>
        <circle cx="50" cy="30" r="9" fill="#f472b6" stroke="#be185d" stroke-width="2.5"/>
        <path d="M 44,36 L 35,55 L 46,50 L 50,38 Z" fill="#db2777"/>
        <path d="M 56,36 L 65,55 L 54,50 L 50,38 Z" fill="#db2777"/>
      </svg>
    `,
    glass_heart: `
      <svg viewBox="0 0 100 50" style="width:${sizePx}px; height:${sizePx*0.5}px; overflow:visible; filter:drop-shadow(0 3px 5px rgba(0,0,0,0.25));">
        <path d="M 12,20 C 12,12 28,10 32,22 C 36,10 52,12 52,20 C 52,32 32,45 32,45 C 32,45 12,32 12,20 Z" fill="rgba(251,113,133,0.4)" stroke="#f43f5e" stroke-width="3"/>
        <path d="M 48,20 C 48,12 64,10 68,22 C 72,10 88,12 88,20 C 88,32 68,45 68,45 C 68,45 48,32 48,20 Z" fill="rgba(251,113,133,0.4)" stroke="#f43f5e" stroke-width="3"/>
        <path d="M 42,22 L 48,22" stroke="#f43f5e" stroke-width="3"/>
      </svg>
    `,
    glass_monocle: `
      <svg viewBox="0 0 100 60" style="width:${sizePx}px; height:${sizePx*0.6}px; overflow:visible; filter:drop-shadow(0 3px 5px rgba(0,0,0,0.2));">
        <circle cx="32" cy="25" r="14" fill="rgba(191,219,254,0.3)" stroke="#fbbf24" stroke-width="3"/>
        <path d="M 46,25 Q 55,45 42,55" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="2 1"/>
      </svg>
    `,
    glass_eyepatch: `
      <svg viewBox="0 0 100 50" style="width:${sizePx}px; height:${sizePx*0.5}px; overflow:visible; filter:drop-shadow(0 3px 5px rgba(0,0,0,0.3));">
        <path d="M 0,18 L 100,28" stroke="#1e293b" stroke-width="3.5"/>
        <ellipse cx="68" cy="26" rx="14" ry="12" fill="#0f172a" stroke="#1e293b" stroke-width="2"/>
      </svg>
    `,
    face_blush: `
      <svg viewBox="0 0 100 40" style="width:${sizePx}px; height:${sizePx*0.4}px; overflow:visible; opacity:0.75;">
        <ellipse cx="20" cy="20" rx="12" ry="6" fill="#f43f5e" filter="blur(2px)"/>
        <ellipse cx="80" cy="20" rx="12" ry="6" fill="#f43f5e" filter="blur(2px)"/>
      </svg>
    `,
    angel_wings: `
      <svg viewBox="0 0 120 70" style="width:${sizePx * 1.2}px; height:${sizePx * 0.7}px; overflow:visible; filter:drop-shadow(0 4px 8px rgba(255,255,255,0.6));">
        <path d="M 50,45 C 30,30 10,10 2,30 C -5,45 20,60 50,45 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
        <path d="M 70,45 C 90,30 110,10 118,30 C 125,45 100,60 70,45 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      </svg>
    `,
    wing_fairy: `
      <svg viewBox="0 0 120 70" style="width:${sizePx*1.2}px; height:${sizePx*0.7}px; overflow:visible; filter:drop-shadow(0 0 6px #67e8f9);">
        <path d="M 50,45 C 30,10 10,0 2,25 C -5,45 25,50 50,45 Z" fill="rgba(34,211,238,0.3)" stroke="#22d3ee" stroke-width="2"/>
        <path d="M 70,45 C 90,10 110,0 118,25 C 125,45 95,50 70,45 Z" fill="rgba(34,211,238,0.3)" stroke="#22d3ee" stroke-width="2"/>
      </svg>
    `,
    wing_bat: `
      <svg viewBox="0 0 120 70" style="width:${sizePx*1.2}px; height:${sizePx*0.7}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.4));">
        <path d="M 50,45 L 10,25 C 8,24 5,28 8,30 L 22,40 L 15,48 C 14,49 18,52 20,50 L 32,45 L 28,58 C 28,60 33,62 35,59 L 50,45 Z" fill="#3b0764" stroke="#1e1b4b" stroke-width="2"/>
        <path d="M 70,45 L 110,25 C 112,24 115,28 112,30 L 98,40 L 105,48 C 106,49 102,52 100,50 L 88,45 L 92,58 C 92,60 87,62 85,59 L 70,45 Z" fill="#3b0764" stroke="#1e1b4b" stroke-width="2"/>
      </svg>
    `,
    wing_butterfly: `
      <svg viewBox="0 0 120 80" style="width:${sizePx*1.2}px; height:${sizePx*0.8}px; overflow:visible; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.25));">
        <path d="M 50,45 C 35,15 15,10 10,30 C 5,50 30,55 50,45 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
        <circle cx="28" cy="32" r="4" fill="#fef08a"/>
        <path d="M 70,45 C 85,15 105,10 110,30 C 115,50 90,55 70,45 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
        <circle cx="92" cy="32" r="4" fill="#fef08a"/>
      </svg>
    `,
    wing_jetpack: `
      <svg viewBox="0 0 100 80" style="width:${sizePx}px; height:${sizePx*0.8}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.25));">
        <rect x="25" y="15" width="22" height="45" rx="5" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
        <rect x="53" y="15" width="22" height="45" rx="5" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
        <path d="M 30,60 L 36,78 L 42,60 Z" fill="#f97316"/>
        <path d="M 58,60 L 64,78 L 70,60 Z" fill="#f97316"/>
      </svg>
    `
  };

  if (svgMap[apparelId]) {
    return svgMap[apparelId];
  }
  const emoji = APPAREL_EMOJIS[apparelId] || "✨";
  return `<span style="font-size:${sizePx}px; display:inline-block;">${emoji}</span>`;
}

function getApparelTopOffset(apparelId, defaultTop, appSize, petScale) {
  if (apparelId === "pink_cardigan") {
    return Math.round(defaultTop + (appSize * 0.72));
  }
  if (apparelId === "pink_skirt") {
    return Math.round(defaultTop + (appSize * 1.15));
  }
  if (apparelId === "pink_cardigan_skirt") {
    return Math.round(defaultTop + (appSize * 0.72));
  }
  return defaultTop;
}
