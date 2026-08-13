// GWENTAR WELLNESS APP - 23 SCREENS ROUTER, SCROLLABLE TABS & DYNAMIC PETS

// 23 Screens Metadata
const SCREENS = [
  { id: "screen-1", num: 1, name: "หน้าโฮม" },
  { id: "screen-2", num: 2, name: "เลือกตัวเลี้ยง" },
  { id: "screen-3", num: 3, name: "ข้อมูลสัตว์เลี้ยง" },
  { id: "screen-4", num: 4, name: "บ้านของน้อง" },
  { id: "screen-5", num: 5, name: "ห้องนอน" },
  { id: "screen-6", num: 6, name: "ห้องอาหาร" },
  { id: "screen-7", num: 7, name: "ห้องน้ำ" },
  { id: "screen-8", num: 8, name: "สวน" },
  { id: "screen-9", num: 9, name: "ห้องแต่งตัว" },
  { id: "screen-10", num: 10, name: "ห้องกิจกรรม" },
  { id: "screen-11", num: 11, name: "กดทดสอบอารมณ์ + AI" },
  { id: "screen-12", num: 12, name: "ไดอารี่" },
  { id: "screen-13", num: 13, name: "ระบายความรู้สึก" },
  { id: "screen-14", num: 14, name: "เควส" },
  { id: "screen-15", num: 15, name: "มินิเกม" },
  { id: "screen-16", num: 16, name: "ร้านค้า" },
  { id: "screen-17", num: 17, name: "กระเป๋า" },
  { id: "screen-18", num: 18, name: "Collection Book" },
  { id: "screen-19", num: 19, name: "Achievement" },
  { id: "screen-22", num: 22, name: "ตั้งค่า" },
  { id: "screen-23", num: 23, name: "เมนูเพิ่มเติม" }
];

// App Global State
let state = {
  theme: "pastel",
  petId: "Gwentar",
  petName: "Gwentar",
  petEmoji: "🐻",
  petGender: "male",
  petChosen: false,
  activeScreen: "screen-1",
  coins: 0,
  gems: 0,
  hp: 50,
  energy: 50,
  level: 0,
  exp: 0,
  selectedMood: "Happy",
  moodRecorded: false,
  lastCheckInDate: "",
  lastMoodTestDate: "",
  lastDiaryDate: "",
  recordedMoodText: "",
  diaryHistory: [],
  questsProgress: {
    mood: 0,
    feed: 0,
    clean: 0,
    playGame: 0,
    music: 0,
    dance: 0,
    shop: 0,
    sit: 0,
    talk: 0,
    garden: 0,
    breathe: 0,
    sleep: 0
  },
  questsClaimed: {},
  activeApparel: "",
  equippedOutfit: "",
  equippedTop: "",
  equippedBottom: "",
  apparelScale: 1.0,
  foods: {
    sandwich: 0,
    milk: 0,
    water: 0,
    greentea: 0,
    cake: 0,
    cookie: 0,
    bubbletea: 0,
    chocolate: 0,
    pizza: 0,
    donut: 0,
    frenchfries: 0,
    icecream: 0,
    popcorn: 0,
    cupcake: 0,
    friedchicken: 0,
    ramen: 0,
    onigiri: 0,
    fruitjuice: 0,
    babybottle: 0,
    coffee: 0,
    soda: 0,
    coconut: 0,
    honeytea: 0
  },
  unlockedApparel: [],
  bubblePopHighScore: 0,
  gardenFlowers: {
    goodDeed: { lvl: 1, qty: 0, max: 15 },
    awaken: { lvl: 1, qty: 0, max: 15 },
    peace: { lvl: 1, qty: 0, max: 10 },
    cheerful: { lvl: 1, qty: 0, max: 15 }
  },
  aiMessages: [
    { sender: "bot", text: "สวัสดีค่ะ เราพร้อมรับฟังและให้กำลังใจคุณเสมอนะ 💙" },
    { sender: "user", text: "วันนี้รู้สึกแย่ทำไงดีคะ?" }
  ],
  moodTestQuestion: 0,
  moodTestQuestions: [],
  moodScores: {
    Happy: 0, Calm: 0, Tired: 0, Stress: 0, Anxiety: 0,
    Sad: 0, Angry: 0, Bored: 0, Social: 0, Confidence: 0,
    SelfCare: 0, Motivation: 0, Lonely: 0, Energy: 0
  },
  healingAudios: {},
  apparelOffset: null,
  ownedFurniture: ["wall_none", "floor_none", "table_none"],
  placedFurniture: { wall: "wall_none", floor: "floor_none", table: "table_none" },
  isDecoratingMode: false
};

// ==========================================
// LOCAL STORAGE PERSISTENCE ENGINE (บันทึกข้อมูลไม่ให้เวลหรือความคืบหน้ารีเซต)
// ==========================================
const SAVE_KEY = "joyblob_game_save_v2";

let isResetting = false;

function saveGameState() {
  if (isResetting) return;
  try {
    const dataToSave = {
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
      activeApparel: state.activeApparel,
      equippedOutfit: state.equippedOutfit || "",
      equippedTop: state.equippedTop || "",
      equippedBottom: state.equippedBottom || "",
      apparelScale: state.apparelScale,
      foods: state.foods,
      unlockedApparel: state.unlockedApparel,
      farmPlots: state.farmPlots,
      apparelOffset: state.apparelOffset,
      bubblePopHighScore: state.bubblePopHighScore,
      gardenFlowers: state.gardenFlowers,
      lastCheckInDate: state.lastCheckInDate,
      lastMoodTestDate: state.lastMoodTestDate,
      lastDiaryDate: state.lastDiaryDate,
      diaryHistory: state.diaryHistory || [],
      ownedFurniture: state.ownedFurniture || ["wall_none", "floor_none", "table_none"],
      placedFurniture: state.placedFurniture || { wall: "wall_none", floor: "floor_none", table: "table_none" }
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
      // Apply theme immediately on load
      if (state.theme) {
        document.documentElement.setAttribute("data-theme", state.theme);
      }
      // Migration: fallback for petId in older saves
      if (!state.petId) {
        if (state.petEmoji === "🐻") {
          state.petId = "Aimee";
        } else {
          const match = (typeof PET_TEMPLATES !== "undefined") ? PET_TEMPLATES.find(p => p.emoji === state.petEmoji) : null;
          state.petId = match ? match.id : "Aimee";
        }
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
}

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
  pink_cardigan_skirt: "🎀"
};

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
    cat_ears: `
      <svg viewBox="0 0 100 80" style="width:${sizePx}px; height:${sizePx * 0.8}px; overflow:visible; filter:drop-shadow(0 3px 6px rgba(0,0,0,0.25));">
        <path d="M 15,45 Q 50,55 85,45" fill="none" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <polygon points="15,45 28,10 42,48" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <polygon points="20,44 29,18 37,46" fill="#f472b6"/>
        <polygon points="58,48 72,10 85,45" fill="#334155" stroke="#0f172a" stroke-width="2"/>
        <polygon points="63,46 71,18 80,44" fill="#f472b6"/>
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
    angel_wings: `
      <svg viewBox="0 0 120 70" style="width:${sizePx * 1.2}px; height:${sizePx * 0.7}px; overflow:visible; filter:drop-shadow(0 4px 8px rgba(255,255,255,0.6));">
        <path d="M 50,45 C 30,30 10,10 2,30 C -5,45 20,60 50,45 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
        <path d="M 70,45 C 90,30 110,10 118,30 C 125,45 100,60 70,45 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      </svg>
    `,
    pink_cardigan: `
      <svg viewBox="0 0 100 80" style="width:${sizePx}px; height:${sizePx * 0.8}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.18));">
        <path d="M 20,20 L 5,35 C 2,38 8,44 12,40 L 25,28 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5"/>
        <path d="M 80,20 L 95,35 C 98,38 92,44 88,40 L 75,28 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5"/>
        <rect x="22" y="15" width="56" height="42" rx="10" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/>
        <path d="M 40,15 L 50,30 L 60,15 Z" fill="#ffedd5"/>
        <line x1="50" y1="30" x2="50" y2="57" stroke="#db2777" stroke-width="3"/>
        <circle cx="50" cy="36" r="3.5" fill="#ffffff" stroke="#db2777" stroke-width="1.5"/>
        <circle cx="50" cy="46" r="3.5" fill="#ffffff" stroke="#db2777" stroke-width="1.5"/>
      </svg>
    `,
    pink_skirt: `
      <svg viewBox="0 0 100 50" style="width:${sizePx}px; height:${sizePx * 0.5}px; overflow:visible; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.22));">
        <path d="M 30,5 L 70,5 L 85,38 C 86,40 82,42 80,42 L 20,42 C 18,42 14,40 15,38 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/>
        <line x1="40" y1="5" x2="35" y2="42" stroke="#db2777" stroke-width="2"/>
        <line x1="50" y1="5" x2="50" y2="42" stroke="#db2777" stroke-width="2"/>
        <line x1="60" y1="5" x2="65" y2="42" stroke="#db2777" stroke-width="2"/>
        <path d="M 42,12 Q 40,5 45,5 Q 48,10 50,12 Q 52,10 55,5 Q 58,5 58,12 Z" fill="#ec4899" stroke="#be185d" stroke-width="1.5"/>
        <circle cx="50" cy="12" r="3" fill="#be185d"/>
      </svg>
    `,
    pink_cardigan_skirt: `
      <svg viewBox="0 0 100 110" style="width:${sizePx}px; height:${sizePx * 1.1}px; overflow:visible; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.22));">
        <path d="M 30,52 L 70,52 L 86,88 C 87,90 83,92 80,92 L 20,92 C 17,92 13,90 14,88 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/>
        <line x1="40" y1="52" x2="35" y2="92" stroke="#db2777" stroke-width="2"/>
        <line x1="50" y1="52" x2="50" y2="92" stroke="#db2777" stroke-width="2"/>
        <line x1="60" y1="52" x2="65" y2="92" stroke="#db2777" stroke-width="2"/>
        <path d="M 20,20 L 5,35 C 2,38 8,44 12,40 L 25,28 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5"/>
        <path d="M 80,20 L 95,35 C 98,38 92,44 88,40 L 75,28 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="2.5"/>
        <rect x="22" y="15" width="56" height="42" rx="10" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/>
        <path d="M 40,15 L 50,30 L 60,15 Z" fill="#ffedd5"/>
        <line x1="50" y1="30" x2="50" y2="57" stroke="#db2777" stroke-width="3"/>
        <circle cx="50" cy="36" r="3.5" fill="#ffffff" stroke="#db2777" stroke-width="1.5"/>
        <circle cx="50" cy="46" r="3.5" fill="#ffffff" stroke="#db2777" stroke-width="1.5"/>
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
    const activeTab = document.querySelector(".bag-tab.active")?.innerText || "ทั้งหมด";
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
  
  if (state.level === 0) {
    return `<div class="pet-body-main" style="font-size:${finalSize - 6}px; display:inline-block; animation: petEggWobble 2s infinite ease-in-out; cursor:pointer;">🥚</div>`;
  }
  if (!isOriginalMode()) {
    return `<img src="assets/aimee.png?v=2" class="pet-body-img" style="width:${finalSize}px; height:${finalSize}px;" alt="${state.petName}">`;
  }
  let petLower = (state.petId || "aimee").toLowerCase();
  if (petLower === "gwentar") petLower = "bear";
  const croppedPets = ["aimee", "blob", "bunny", "cat", "puppy", "penguin", "bear", "panda", "fox", "chick", "otter", "hamster", "dino", "pig", "capybara", "parrot", "giraffe", "elephant"];
  if (croppedPets.includes(petLower)) {
    return `<img src="assets/${petLower}.png?v=2" class="pet-body-img" style="width:${finalSize}px; height:${finalSize}px;" alt="${state.petName}">`;
  } else {
    return `<div class="pet-body-main" style="font-size:${finalSize - 6}px;">${state.petEmoji}</div>`;
  }
}

// Render dynamic pet illustrations across all pages
function renderDynamicPets() {
  const petDisplays = document.querySelectorAll(".dynamic-pet-display");
  const petScale = getPetScale();
  
  petDisplays.forEach(container => {
    let offsetStyle = "";
    const scale = (state.apparelScale || 1.0) * petScale;
    if (state.apparelOffset && state.apparelOffset.x !== undefined) {
      const topOffset = Math.round(state.apparelOffset.y * petScale);
      const leftOffset = Math.round(state.apparelOffset.x * petScale);
      offsetStyle = `style="top: ${topOffset}px; left: ${leftOffset}px; transform: scale(${scale});"`;
    } else {
      let styleStr = `transform: translateX(-50%) scale(${scale});`;
      if (state.activeApparel === "pink_cardigan") {
        styleStr += ` top: ${Math.round(45 * petScale)}px;`;
      } else if (state.activeApparel === "pink_skirt") {
        styleStr += ` top: ${Math.round(75 * petScale)}px;`;
      } else if (state.activeApparel === "pink_cardigan_skirt") {
        styleStr += ` top: ${Math.round(45 * petScale)}px;`;
      }
      offsetStyle = `style="${styleStr}"`;
    }
    
    const apparelSize = Math.round(75 * petScale);
    
    container.innerHTML = `
      <div class="pet-character-wrapper" style="position: relative;">
        ${getPetVisual(180)}
        ${state.activeApparel ? `<div class="pet-apparel-overlay" ${offsetStyle}>${getApparelVisual(state.activeApparel, apparelSize)}</div>` : ''}
        <div class="pet-3d-floor-shadow"></div>
      </div>
    `;
  });

  // Headers / standing pet indicators
  const headerAvatar = document.getElementById("headerPetAvatar");
  if (headerAvatar) {
    const appSize = Math.round(20 * petScale);
    const defaultTop = Math.round(-10 * petScale);
    const topPos = getApparelTopOffset(state.activeApparel, defaultTop, appSize, petScale);
    headerAvatar.innerHTML = `
      <div style="position:relative;">
        ${getPetVisual(36)}
        ${state.activeApparel ? `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(state.activeApparel, appSize)}</span>` : ''}
      </div>
    `;
  }

  const mapPet = document.getElementById("mapPetStanding");
  if (mapPet) {
    const appSize = Math.round(32 * petScale);
    const defaultTop = Math.round(-16 * petScale);
    const topPos = getApparelTopOffset(state.activeApparel, defaultTop, appSize, petScale);
    mapPet.innerHTML = `
      <div style="position:relative;">
        ${getPetVisual(72)}
        ${state.activeApparel ? `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(state.activeApparel, appSize)}</span>` : ''}
      </div>
    `;
  }

  const ventPet = document.getElementById("ventPetAvatar");
  if (ventPet) {
    const appSize = Math.round(62 * petScale);
    const defaultTop = Math.round(-30 * petScale);
    const topPos = getApparelTopOffset(state.activeApparel, defaultTop, appSize, petScale);
    ventPet.innerHTML = `
      <div style="position:relative; display:inline-block;">
        ${getPetVisual(150)}
        ${state.activeApparel ? `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(state.activeApparel, appSize)}</span>` : ''}
        <span style="position:absolute; bottom:0; right:-10px; font-size:24px;">🥺</span>
      </div>
    `;
  }
}

function updatePetBubbleText() {
  const bubbleEl = document.getElementById("petBubble");
  if (!bubbleEl) return;

  if (state.level === 0) {
    const eggQuotes = [
      "ดุ๊กดิ๊กๆ... หนูอยากออกไปเล่นข้างนอกแย้วง่า! 🥚",
      "จิ้มหนูจิ! หนูอยากฟักออกมาหาปะป๊ามะม๊าแย้ว! ✨",
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
    if (defaultTexts.includes(currentText) || currentText === "") {
      const normalQuotes = [
        "รักปะป๊ามะม๊าที่สุดในโลกเยย! กอดหนูหน่อยจิ! 💕",
        "วันนี้เหนื่อยป่าว? หนูจะคอยเป็นกำลังใจให้ปะป๊ามะม๊าเอง! 🌸",
        "พาหนูไปเล่นบีบเป็ดยางปี๊บๆ หรือกวนสไลม์กันเถอะ! ✨",
        "วันนี้แต่งตัวสวยๆ หล่อๆ ให้หนูหน่อยน้าาา 👗"
      ];
      bubbleEl.innerText = normalQuotes[Math.floor((Date.now() / 15000) % normalQuotes.length)];
    }
  }
}

function toggleDecoratingMode() {
  state.isDecoratingMode = !state.isDecoratingMode;
  
  const container = document.getElementById("petHomeTap");
  const btn = document.getElementById("btnDecorate");
  
  if (state.isDecoratingMode) {
    if (container) container.classList.add("decorating-active");
    if (btn) {
      btn.innerText = "✅ เสร็จสิ้น";
      btn.style.background = "#22c55e";
      btn.style.borderColor = "#22c55e";
    }
  } else {
    if (container) container.classList.remove("decorating-active");
    if (btn) {
      btn.innerText = "🛋️ แต่งบ้าน";
      btn.style.background = "rgba(167, 139, 250, 0.25)";
      btn.style.borderColor = "var(--primary)";
    }
    closeDecorDrawer();
  }
  
  renderPlacedFurniture();
  saveGameState();
}

function openDecorSelection(slotName, event) {
  if (event) event.stopPropagation();
  if (!state.isDecoratingMode) return;
  
  const drawer = document.getElementById("decorDrawer");
  if (!drawer) return;
  
  const titleEl = document.getElementById("decorDrawerTitle");
  const gridEl = document.getElementById("decorDrawerItems");
  
  let slotTitle = "เลือกเฟอร์นิเจอร์";
  if (slotName === "wall") slotTitle = "🖼️ ตกแต่งผนังห้อง";
  if (slotName === "floor") slotTitle = "🧸 ตกแต่งพื้นห้อง (ฝั่งซ้าย)";
  if (slotName === "table") slotTitle = "💡 ตกแต่งมุมโต๊ะ (ฝั่งขวา)";
  
  if (titleEl) titleEl.innerText = slotTitle;
  
  // Render owned items for this slot
  const slotItems = FURNITURE_ITEMS[slotName] || [];
  let html = "";
  
  slotItems.forEach(item => {
    const isOwned = item.id.endsWith("_none") || state.ownedFurniture.includes(item.id);
    if (isOwned) {
      const isPlaced = state.placedFurniture[slotName] === item.id;
      html += `
        <div class="decor-item-card" onclick="placeFurnitureItem('${slotName}', '${item.id}')" style="${isPlaced ? 'border-color: var(--primary); background: rgba(167, 139, 250, 0.15);' : ''}">
          <span class="decor-item-emoji">${item.emoji}</span>
          <span class="decor-item-name">${item.name}</span>
          ${isPlaced ? '<span style="font-size: 8px; color: var(--primary); font-weight: 700; margin-top:2px;">ใช้งานอยู่</span>' : ''}
        </div>
      `;
    }
  });
  
  if (gridEl) gridEl.innerHTML = html;
  drawer.classList.add("open");
}

function closeDecorDrawer() {
  const drawer = document.getElementById("decorDrawer");
  if (drawer) drawer.classList.remove("open");
}

function placeFurnitureItem(slotName, itemId) {
  state.placedFurniture[slotName] = itemId;
  renderPlacedFurniture();
  closeDecorDrawer();
  saveGameState();
}

function renderPlacedFurniture() {
  const slots = ["wall", "floor", "table"];
  
  slots.forEach(slot => {
    const elId = "slot" + slot.charAt(0).toUpperCase() + slot.slice(1);
    const el = document.getElementById(elId);
    if (!el) return;
    
    const activeId = state.placedFurniture[slot] || (slot + "_none");
    const activeItem = FURNITURE_ITEMS[slot]?.find(i => i.id === activeId);
    const isNone = !activeId || activeId.endsWith("_none");
    
    if (activeItem && !isNone) {
      el.innerText = activeItem.emoji;
      el.style.opacity = "1";
      el.style.fontSize = slot === "wall" ? "72px" : "52px";
    } else {
      if (state.isDecoratingMode) {
        el.innerText = "➕";
        el.style.opacity = "0.5";
        el.style.fontSize = "24px";
      } else {
        el.innerText = "";
        el.style.opacity = "0";
      }
    }
  });
}

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
        ${state.activeApparel ? `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(state.activeApparel, appSize)}</span>` : ''}
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
    if (state.level === 0 && isOriginalMode()) {
      selectPetTab.style.display = "flex";
    } else {
      selectPetTab.style.display = "none";
      if (state.activeScreen === "screen-2") {
        nav("screen-1");
      }
    }
  }

  const btnViewOtherPets = document.getElementById("btnViewOtherPets");
  if (btnViewOtherPets) {
    btnViewOtherPets.style.display = isOriginalMode() ? "block" : "none";
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

  // Hide or show furniture controls depending on Level 20 requirement
  const btnDecorate = document.getElementById("btnDecorate");
  if (btnDecorate) {
    btnDecorate.style.display = state.level >= 20 ? "flex" : "none";
  }

  if (state.level < 20 && state.isDecoratingMode) {
    state.isDecoratingMode = false;
    const container = document.getElementById("petHomeTap");
    if (container) container.classList.remove("decorating-active");
    if (btnDecorate) {
      btnDecorate.innerText = "🛋️ แต่งบ้าน";
      btnDecorate.style.background = "rgba(167, 139, 250, 0.25)";
      btnDecorate.style.borderColor = "var(--primary)";
    }
    closeDecorDrawer();
  }

  const shopFurnitureTab = document.querySelector('.shop-tab[data-shoptab="furniture"]');
  if (shopFurnitureTab) {
    shopFurnitureTab.style.display = state.level >= 20 ? "block" : "none";
  }
  
  const bagFurnitureTab = Array.from(document.querySelectorAll('.bag-tab')).find(el => el.innerText.trim().includes("เฟอร์นิเจอร์"));
  if (bagFurnitureTab) {
    bagFurnitureTab.style.display = state.level >= 20 ? "block" : "none";
  }

  // Render placed furniture in the home screen slots
  renderPlacedFurniture();

  // Perform dynamic pet updates
  renderDynamicPets();

  // Update speech bubble text dynamically based on state
  updatePetBubbleText();

  // Save game progress automatically to localStorage
  saveGameState();
}

const PET_TEMPLATES = [
  { id: "Bunny", name: "Bunny", emoji: "🐰" },
  { id: "Cat", name: "Cat", emoji: "🐱" },
  { id: "Puppy", name: "Puppy", emoji: "🐶" },
  { id: "Penguin", name: "Penguin", emoji: "🐧" },
  { id: "Bear", name: "Bear", emoji: "🐻" },
  { id: "Panda", name: "Panda", emoji: "🐼" },
  { id: "Fox", name: "Fox", emoji: "🦊" },
  { id: "Chick", name: "Chick", emoji: "🐥" },
  { id: "Otter", name: "Otter", emoji: "🦦" },
  { id: "Hamster", name: "Hamster", emoji: "🐹" },
  { id: "Dino", name: "Dino", emoji: "🦖" },
  { id: "Pig", name: "Pig", emoji: "🐷" },
  { id: "Capybara", name: "Capybara", emoji: "🦫" },
  { id: "Parrot", name: "Parrot", emoji: "🦜" },
  { id: "Giraffe", name: "Giraffe", emoji: "🦒" },
  { id: "Elephant", name: "Elephant", emoji: "🐘" }
];

function renderSelectPetGrid() {
  const grid = document.getElementById("petSelectGrid");
  if (!grid) return;
  
  const closeBtn = document.querySelector("#screen-2 .screen-close-btn");
  if (closeBtn) {
    closeBtn.style.display = (!state.petChosen && state.level === 0) ? "none" : "block";
  }

  const confirmBtn = document.getElementById("confirmPetBtn");
  if (confirmBtn) {
    confirmBtn.innerText = !state.petChosen ? "✨ ยืนยันเลือกน้องคู่หู (ฟรี)" : "เสร็จสิ้น / กลับหน้าหลัก";
  }

  let noticeHeader = document.getElementById("petSelectNoticeHeader");
  if (!noticeHeader) {
    noticeHeader = document.createElement("div");
    noticeHeader.id = "petSelectNoticeHeader";
    noticeHeader.style.cssText = "font-size: 11px; text-align: center; margin-bottom: 12px; padding: 8px 12px; border-radius: 12px; font-weight: 600;";
    grid.before(noticeHeader);
  }

  if (!state.petChosen) {
    noticeHeader.style.background = "rgba(56, 189, 248, 0.15)";
    noticeHeader.style.color = "#38bdf8";
    noticeHeader.style.border = "1px solid rgba(56, 189, 248, 0.4)";
    noticeHeader.innerHTML = "✨ เลือกเพื่อนคู่หูตัวแรกของคุณได้ฟรี!";
  } else {
    noticeHeader.style.background = "rgba(234, 179, 8, 0.15)";
    noticeHeader.style.color = "#fef08a";
    noticeHeader.style.border = "1px solid rgba(234, 179, 8, 0.4)";
    noticeHeader.innerHTML = `🪙 การเปลี่ยนตัวละครสัตว์เลี้ยงใหม่ใช้ 10,000 เหรียญทอง<br><span style="font-size: 10px; color: #cbd5e1;">(เหรียญทองที่คุณมี: ${state.coins.toLocaleString()} 🪙)</span>`;
  }
  
  grid.innerHTML = PET_TEMPLATES.map(p => {
    const isActive = state.petEmoji === p.emoji || state.petId === p.id;
    const petLower = p.id.toLowerCase();
    const avatarHtml = `<img src="assets/${petLower}.png?v=2" style="width: 34px; height: 34px; object-fit: contain;" onerror="this.outerHTML='${p.emoji}'">`;
    
    let badgeHtml = "";
    if (state.petChosen) {
      badgeHtml = isActive 
        ? `<div style="font-size: 9px; background: #22c55e; color: #fff; padding: 2px 6px; border-radius: 8px; font-weight: bold; margin-top: 4px;">✨ ใช้งานอยู่</div>`
        : `<div style="font-size: 9px; background: rgba(234, 179, 8, 0.9); color: #000; padding: 2px 6px; border-radius: 8px; font-weight: bold; margin-top: 4px;">🪙 10,000</div>`;
    }
    
    return `
      <div class="pet-select-card ${isActive ? 'active' : ''}" data-pet="${p.id}" data-name="${p.name}" data-emoji="${p.emoji}" style="cursor: pointer; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px;">
        <div class="pet-select-avatar" style="font-size: 34px; display: flex; align-items: center; justify-content: center; height: 34px; width: 34px; ${!state.petChosen ? 'animation: petEggWobble 2s infinite ease-in-out;' : ''}">
          ${avatarHtml}
        </div>
        <span style="font-size: 11px; font-weight: bold; margin-top: 4px;">${p.name}</span>
        ${badgeHtml}
      </div>
    `;
  }).join("");
  
  // Bind listeners to dynamically rendered cards
  grid.querySelectorAll(".pet-select-card").forEach(card => {
    card.addEventListener("click", () => {
      const petId = card.getAttribute("data-pet");
      const petName = card.getAttribute("data-name");
      const petEmoji = card.getAttribute("data-emoji");
      const isCurrentlyActive = state.petEmoji === petEmoji || state.petId === petId;

      if (isCurrentlyActive) {
        return; // Already using this pet
      }

      // If pet has already been chosen once, switching costs 10,000 coins!
      if (state.petChosen) {
        if (state.coins < 10000) {
          alert(`🔒 เหรียญทองของปะป๊ามะม๊ายังไม่พอเปลี่ยนตัวละครใหม่เลยน้า...\n\n💰 การสลับร่างคู่หูใหม่ต้องใช้ 10,000 เหรียญทอง 🪙\n(ตอนนี้ปะป๊ามะม๊ามีอยู่ ${state.coins.toLocaleString()} เหรียญ)\n\n✨ ไปช่วยหนูทำเควส ปลูกผัก หรือเล่นมินิเกมสะสมเหรียญเพิ่มกันเถอะนะคะ! 💕`);
          return;
        }

        const confirmSwitch = confirm(`🪙 ปะป๊ามะม๊าต้องการจ่าย 10,000 เหรียญทองเพื่อเปลี่ยนคู่หูคนใหม่เป็นน้อง "${petName}" ใช่ไหมคะ?\n\n(เหรียญทองของปะป๊ามะม๊าจะเหลือ: ${(state.coins - 10000).toLocaleString()} 🪙)`);
        if (!confirmSwitch) return;

        state.coins -= 10000;
        state.petId = petId;
        if (!isOriginalMode()) {
          state.petName = petName;
        }
        state.petEmoji = petEmoji;
        saveGameState();
        syncUI();
        renderDynamicPets();
        renderSelectPetGrid();
        alert(`🎉 หนูเปลี่ยนร่างเป็นน้อง ${petName} ให้แล้วนะคะ! (ใช้เหรียญทองของปะป๊ามะม๊าไป 10,000 เหรียญน้า 🪙✨)`);
      } else {
        // Free first selection
        grid.querySelectorAll(".pet-select-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        state.petId = petId;
        if (!isOriginalMode()) {
          state.petName = petName;
        }
        state.petEmoji = petEmoji;
        syncUI();
      }
    });
  });
}




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
        "พาหนูไปเล่นบีบเป็ดยางปี๊บๆ หรือกวนสไลม์กันเถอะ! ✨",
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

  if (cheatTriggered) {
    alert(`🔮 ปลดล็อกรหัสลับสำเร็จ!\n✨ เปลี่ยนชื่อน้องเป็น "${str || state.petName}"\n${cheatMessages.join("\n")} เรียบร้อยแล้วค่ะ! 🌟`);
  }

  state.petName = str || "Blob";
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



  // Screen 11: Mood Test Event Listeners
  document.getElementById("btnNextQuestion").addEventListener("click", handleNextMoodQuestion);
  document.getElementById("btnRestartMoodTest").addEventListener("click", initMoodTest);

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

  // Status Pills Add buttons click listeners (Developer Cheats for Testing)
  const hpAdd = document.querySelector("#pillHp .add-stat-btn");
  if (hpAdd) {
    hpAdd.addEventListener("click", (e) => {
      e.stopPropagation();
      state.hp = Math.min(50, state.hp + 10);
      syncUI();
      alert("เพิ่มพลังชีวิต +10 HP! ❤️");
    });
  }
  
  const energyAdd = document.querySelector("#pillEnergy .add-stat-btn");
  if (energyAdd) {
    energyAdd.addEventListener("click", (e) => {
      e.stopPropagation();
      state.energy = Math.min(50, state.energy + 10);
      syncUI();
      alert("เพิ่มพลังงาน +10 Energy! ⚡");
    });
  }
  
  const coinsAdd = document.querySelector("#pillCoins .add-stat-btn");
  if (coinsAdd) {
    coinsAdd.addEventListener("click", (e) => {
      e.stopPropagation();
      state.coins += 1000;
      syncUI();
      alert("เพิ่มเหรียญทอง +1,000 Coins! 🪙");
    });
  }
  
  const gemsAdd = document.querySelector("#pillGems .add-stat-btn");
  if (gemsAdd) {
    gemsAdd.addEventListener("click", (e) => {
      e.stopPropagation();
      state.gems += 100;
      syncUI();
      alert("เพิ่มเพชร +100 Gems! 💎");
    });
  }

  // Initialize calendar
  renderCalendar();

  // Start app at Screen 2 if level is 0 to select egg, else Screen 1
  if (state.level === 0) {
    if (isOriginalMode()) {
      nav("screen-2");
    } else {
      state.petId = "Gwentar";
      if (!state.petName || state.petName === "Gwentar" || state.petName === "Blob") {
        state.petName = "Gwentar";
      }
      state.petEmoji = "🐻";
      state.petChosen = true;
      saveGameState();
      nav("screen-1");
    }
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
    carrot: "🥕", tomato: "🍅", corn: "🌽", strawberry: "🍓",
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
    corn: { hp: 15, energy: 12 },
    strawberry: { hp: 15, energy: 15 },
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
      let offsetStyle = "";
      if (state.apparelOffset && state.apparelOffset.x !== undefined) {
        const topOffset = Math.round(state.apparelOffset.y * petScale);
        const leftOffset = Math.round(state.apparelOffset.x * petScale);
        offsetStyle = `style="top: ${topOffset}px; left: ${leftOffset}px; transform: scale(${scale});"`;
      } else {
        let styleStr = `transform: translateX(-50%) scale(${scale});`;
        if (state.activeApparel === "pink_cardigan") {
          styleStr += ` top: ${Math.round(45 * petScale)}px;`;
        } else if (state.activeApparel === "pink_skirt") {
          styleStr += ` top: ${Math.round(75 * petScale)}px;`;
        } else if (state.activeApparel === "pink_cardigan_skirt") {
          styleStr += ` top: ${Math.round(45 * petScale)}px;`;
        }
        offsetStyle = `style="${styleStr}"`;
      }
      const appSize = Math.round(90 * petScale);
      petDisplay.innerHTML = `
        <div class="pet-character-wrapper" style="position: relative; transition: transform 0.2s ease;" id="modalPetCharacter">
          ${getPetVisual(220)}
          ${state.activeApparel ? `<div class="pet-apparel-overlay" ${offsetStyle}>${getApparelVisual(state.activeApparel, appSize)}</div>` : ''}
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

// Screen 9: Dress Apparel toggle
function toggleApparel(apparelId) {
  if (!checkLevelUnlock(8, "ห้องแต่งตัวและสวมใส่เครื่องแต่งกาย")) return;
  if (state.activeApparel === apparelId) {
    state.activeApparel = "";
    state.apparelOffset = null;
    if (typeof tempApparelOffset !== "undefined") {
      tempApparelOffset = null;
    }
    syncUI();
    alert("ถอดเครื่องแต่งกายออกเรียบร้อย");
  } else {
    // Check if apparel is unlocked
    if (!state.unlockedApparel.includes(apparelId)) {
      alert("เครื่องแต่งกายชิ้นนี้ยังไม่ได้ซื้อค่ะ! ไปซื้อได้ที่ร้านค้านะคะ 🔒");
      return;
    }
    
    state.activeApparel = apparelId;
    
    // Trigger dress up sparkles
    spawnVisualEffect("clean", "petDressingContainer"); // uses sparkles effect
    
    syncUI();
    if (typeof initApparelDragAndDrop === "function") {
      initApparelDragAndDrop();
    }
    alert(`สวมเครื่องแต่งกายเรียบร้อย! น้อง ${state.petName} น่ารักสุดๆ 🧥👒 (คุณสามารถกดลากย้ายตำแหน่งเครื่องแต่งกายบนตัวน้องตามต้องการได้เลยนะคะ)`);
  }
}


// Screen 10: Activity Play
function playActivity(actName) {
  if (!checkLevelUnlock(10, "กิจกรรมในห้องเล่นของเล่น")) return;
  if (actName.includes("วาดรูป")) {
    startColoringGame();
    return;
  }
  if (actName.includes("เปียโน") || actName.includes("ฟังเพลง")) {
    openHealingMusic();
    return;
  }
  if (actName.includes("ของเล่น")) {
    setPetPostureDirect("petActivityContainer", "playing", 25, 45);
    state.energy = Math.max(0, state.energy - 5);
    state.hp = Math.min(50, state.hp + 8);
    spawnVisualEffect("stat", "petActivityContainer", "🧸 เล่นของเล่น +8 💖");
    spawnVisualEffect("toys", "petActivityContainer");
    syncUI();
  }
}

// ==========================================
// GARDEN FARMING & VEGETABLE PLANTING ENGINE
// ==========================================

const CROPS = {
  carrot: { id: "carrot", name: "แครอท", seedEmoji: "🌱", cropEmoji: "🥕", duration: 8, coins: 25, exp: 6 },
  tomato: { id: "tomato", name: "มะเขือเทศ", seedEmoji: "🌱", cropEmoji: "🍅", duration: 12, coins: 35, exp: 8 },
  corn: { id: "corn", name: "ข้าวโพด", seedEmoji: "🌱", cropEmoji: "🌽", duration: 16, coins: 50, exp: 12 },
  strawberry: { id: "strawberry", name: "สตรอว์เบอร์รี่", seedEmoji: "🌱", cropEmoji: "🍓", duration: 20, coins: 70, exp: 16 },
  watermelon: { id: "watermelon", name: "แตงโม", seedEmoji: "🌱", cropEmoji: "🍉", duration: 25, coins: 90, exp: 20 },
  pumpkin: { id: "pumpkin", name: "ฟักทอง", seedEmoji: "🌱", cropEmoji: "🎃", duration: 30, coins: 120, exp: 25 }
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
    
    if (idx < 4) {
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
    }
  });
  
  if (fullGrid) fullGrid.innerHTML = htmlFull;
  if (smallGrid) smallGrid.innerHTML = htmlSmall;
  
  renderSeedSelectionBar();
}

function renderSeedSelectionBar() {
  const seedBar = document.getElementById("seedSelectionBar");
  if (!seedBar) return;
  
  let html = "";
  Object.keys(CROPS).forEach(cropKey => {
    const crop = CROPS[cropKey];
    const isSelected = activeSelectedSeed === cropKey;
    html += `
      <div onclick="selectActiveSeed('${cropKey}')" style="flex: 0 0 auto; width: 72px; background: ${isSelected ? 'rgba(250, 204, 21, 0.35)' : 'rgba(255, 255, 255, 0.12)'}; border: 1.5px solid ${isSelected ? '#facc15' : 'rgba(255, 255, 255, 0.25)'}; border-radius: 12px; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.15s ease;">
        <span style="font-size: 24px;">${crop.cropEmoji}</span>
        <span style="font-size: 9px; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 65px;">${crop.name}</span>
        <span style="font-size: 8px; color: #fef08a; font-weight: 700;">${crop.duration}s|+${crop.coins}🪙</span>
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
    plot.crop = activeSelectedSeed;
    plot.stage = "growing";
    plot.plantedTime = Math.floor(Date.now() / 1000);
    spawnVisualEffect("stat", "petGardenContainer", `🌱 ปลูก ${cropInfo.name} แล้ว!`);
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
  let wateredCount = 0;
  state.farmPlots.forEach(plot => {
    if (plot.stage === "growing") {
      plot.plantedTime -= 5;
      wateredCount++;
    }
  });
  if (wateredCount > 0) {
    spawnVisualEffect("stat", "petGardenContainer", `💧 รดน้ำเร่งโต ${wateredCount} แปลง!`);
  } else {
    alert("ไม่มีแปลงผักที่กำลังเจริญเติบโตให้รดน้ำค่ะ 💧");
  }
  renderFullFarmGame();
}

function harvestAllFarmPlots() {
  if (!state.farmPlots) return;
  let harvestedCount = 0;
  let totalCoins = 0;
  let totalExp = 0;
  
  state.farmPlots.forEach((plot, idx) => {
    if (plot.stage === "ready") {
      const cropInfo = CROPS[plot.crop] || CROPS.carrot;
      totalCoins += cropInfo.coins;
      totalExp += cropInfo.exp;
      state.foods[cropInfo.id] = (state.foods[cropInfo.id] || 0) + 1;
      plot.crop = null;
      plot.stage = "empty";
      plot.plantedTime = 0;
      harvestedCount++;
    }
  });
  
  if (harvestedCount > 0) {
    state.coins += totalCoins;
    state.exp += totalExp;
    spawnVisualEffect("stat", "petGardenContainer", `🧺 เก็บเกี่ยว ${harvestedCount} แปลง! +${totalCoins}🪙 +${totalExp}⭐`);
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
  state.coins += cropInfo.coins;
  state.exp += cropInfo.exp;
  state.foods[cropInfo.id] = (state.foods[cropInfo.id] || 0) + 1;
  
  plot.crop = null;
  plot.stage = "empty";
  plot.plantedTime = 0;
  
  spawnVisualEffect("stat", "petGardenContainer", `+1 ${cropInfo.cropEmoji} +${cropInfo.coins} 🪙 +${cropInfo.exp} ⭐`);
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


// Empathetic Mental Health Consultation AI Knowledge Base Engine
function getEmpatheticAiReply(userText) {
  const txt = (userText || "").toLowerCase();
  
  // 1. Stress & Burnout (ความเครียด, งานหนัก, เหนื่อย, ท้อแท้)
  if (txt.includes("เครียด") || txt.includes("เหนื่อย") || txt.includes("ท้อ") || txt.includes("กดดัน") || txt.includes("ล้า") || txt.includes("งานหนัก") || txt.includes("เบื่อ")) {
    const stressReplies = [
      "ฉันเข้าใจเลยค่ะว่าช่วงนี้คุณอาจจะรู้สึกเหนื่อยและแบกรับความกดดันไว้เยอะมาก... ลองถอนหายใจลึกๆ 3 ครั้ง แล้วบอกตัวเองว่า 'ฉันไม่จำเป็นต้องสมบูรณ์แบบตลอดเวลาก็ได้' พักผ่อน ดื่มน้ำอุ่นๆ แล้วปล่อยให้ตัวเองได้พักบ้างนะคะ ☕💙",
      "คุณเก่งมากแล้วนะคะที่ผ่านวันนี้มาได้ ถ้าตอนนี้รู้สึกเหนื่อยจนล้า ลองวางทุกอย่างลงชั่วคราว แล้วหาสิ่งที่ทำให้คุณยิ้มได้เล็กๆ ในวันนี้ดูน้า ฉันอยู่ข้างๆ คุณเสมอนะคะ 🌸",
      "เมื่อไหร่ที่รู้สึกว่าแบกโลกไว้ทั้งใบ ลองแบ่งเวลาออกมาพักใจสัก 5 นาทีนะคะ ฟังสบายๆ หรือกินขนมอร่อยๆ แล้วค่อยๆ ลุยต่อ คุณไม่ได้อยู่คนเดียวน้า 🐾💖"
    ];
    return stressReplies[Math.floor(Math.random() * stressReplies.length)];
  }

  // 2. Sadness & Heartbreak (เศร้า, เสียใจ, ร้องไห้, อกหัก, เหงา)
  if (txt.includes("เศร้า") || txt.includes("เสียใจ") || txt.includes("ร้องไห้") || txt.includes("อกหัก") || txt.includes("เหงา") || txt.includes("ดิ่ง") || txt.includes("แย่")) {
    const sadReplies = [
      "ถ้าอยากร้องไห้ ก็ร้องออกมาได้เลยนะคะ การร้องไห้ไม่ใช่ความอ่อนแอ แต่เป็นการปลดปล่อยความรู้สึกที่อัดอั้นออกมา ความเหงาหรือความเศร้าที่คุณรู้สึกอยู่ตอนนี้ มันเป็นเพียงก้อนเมฆชั่วคราว แล้วท้องฟ้าที่สดใสจะกลับมาหาคุณแน่นอนค่ะ ☁️🌈",
      "คุณไม่ได้อยู่คนเดียวนะคะ ถึงโลกภายนอกจะดูใจร้ายในบางวัน แต่ที่ตรงนี้มีฉันคอยรับฟังและโอบกอดคุณเสมอค่ะ สูดหายใจลึกๆ แล้วยิ้มให้ตัวเองนิดนึงน้า 💖",
      "โอบกอดหัวใจของคุณแน่นๆ น้า ในวันที่รู้สึกแย่ จำไว้ว่ายังมีคนที่รักและหวังดีกับคุณอยู่เสมอ รวมถึงน้อง Joy Blob ตัวนี้ด้วยนะ 🐶✨"
    ];
    return sadReplies[Math.floor(Math.random() * sadReplies.length)];
  }

  // 3. Anxiety & Overthinking (กังวล, คิดมาก, กลัว, ตื่นเต้น, ว้าวุ่น)
  if (txt.includes("กังวล") || txt.includes("คิดมาก") || txt.includes("กลัว") || txt.includes("ว้าวุ่น") || txt.includes("ตื่นเต้น") || txt.includes("ลน")) {
    const anxietyReplies = [
      "การคิดมากเปรียบเหมือนการพายเรือวนอยู่ในอ่าง ลองถามตัวเองดูนะคะว่า 'สิ่งที่กังวลอยู่ ตอนนี้ควบคุมมันได้ไหม?' ถ้าควบคุมไม่ได้ ลองปล่อยให้เวลามันทำงานดูค่ะ ลองตั้งสติโฟกัสกับลมหายใจเข้า-ออกช้าๆ 5 วินาทีน้า 🧘‍♀️✨",
      "ความกังวลมักจะหลอกให้เรากลัวสิ่งที่ยังมาไม่ถึงค่ะ ลองดึงสติกลับมาอยู่กับปัจจุบันตรงหน้านี้ก่อน คุณผ่านเรื่องยากๆ มาได้ตั้งหลายครั้ง ครั้งนี้คุณก็ทำได้แน่นอนค่ะ!",
      "ลองสูดลมหายใจเข้าช้าๆ... นับ 1 2 3 แล้วค่อยๆ ผ่อนลมหายใจออก 1 2 3... คุณปลอดภัยดีอยู่ตรงนี้นะคะ ความกังวลลอยมาได้ เดี๋ยวก็ลอยไปค่ะ 🍃💙"
    ];
    return anxietyReplies[Math.floor(Math.random() * anxietyReplies.length)];
  }

  // 4. Self-Doubt & Low Confidence (ไม่เก่ง, ไร้ค่า, ล้มเหลว, เปรียบเทียบ, น้อยใจ)
  if (txt.includes("ไม่เก่ง") || txt.includes("ไร้ค่า") || txt.includes("ล้มเหลว") || txt.includes("เปรียบเทียบ") || txt.includes("น้อยใจ") || txt.includes("ห่วย")) {
    const doubtReplies = [
      "หยุดเปรียบเทียบตัวเองกับคนอื่นก่อนน้า ดอกไม้แต่ละชนิดมีฤดูกาลบานที่ไม่เหมือนกัน คุณมีความน่ารักและคุณค่าในแบบของคุณเองที่ไม่เหมือนใคร ดอกไม้ในใจคุณกำลังค่อยๆ เติบโตอยู่นะคะ 🌸✨",
      "ความล้มเหลวไม่ใช่จุดจบ แต่เป็นเพียงบทเรียนเล็กๆ ระหว่างทาง อย่าเพิ่งใจร้ายกับตัวเองน้า คุณเก่งและพยายามมาไกลมากๆ แล้วในจุดที่ยืนอยู่ตอนนี้! 💪💖",
      "ไม่มีใครในโลกนี้ที่สมบูรณ์แบบไปเสียทุกอย่างค่ะ ชื่นชมตัวเองในจุดเล็กๆ ที่ทำสำเร็จวันนี้ดูสิคะ คุณมีความพยายามที่น่าประทับใจมากเลยนะ!"
    ];
    return doubtReplies[Math.floor(Math.random() * doubtReplies.length)];
  }

  // 5. Insomnia & Fatigue (นอนไม่หลับ, นอนไม่ค่อยหลับ, ตาค้าง, ง่วงแต่ลืมตา)
  if (txt.includes("นอนไม่หลับ") || txt.includes("ตาค้าง") || txt.includes("ง่วง") || txt.includes("หลับยาก") || txt.includes("ตื่นกลางดึก")) {
    const sleepReplies = [
      "ถ้านอนไม่หลับ ลองวางโทรศัพท์ลง ปิดไฟให้สลัวๆ แล้วฟังเสียงดนตรีบำบัดในแอปพลิเคชันนี้ดูน้า วางความกังวลของวันพรุ่งนี้ไว้ข้างเตียง คืนนี้ร่างกายคุณต้องการการพักผ่อน หลับตาลงช้าๆ แล้วฝันดีนะคะ 🌙☁️",
      "ลองกดปุ่มอ่านนิทานก่อนนอนในห้องนอนให้น้องสัตว์เลี้ยงดูสิคะ นิทานฮีลใจจะช่วยให้จิตใจของคุณผ่อนคลายและหลับสบายยิ่งขึ้นในคืนนี้นะคะ 💤✨"
    ];
    return sleepReplies[Math.floor(Math.random() * sleepReplies.length)];
  }

  // 6. Study / Exam / Work Pressure (สอบ, การเรียน, อ่านหนังสือ, ข้อสอบ, งาน)
  if (txt.includes("สอบ") || txt.includes("เรียน") || txt.includes("อ่านหนังสือ") || txt.includes("ข้อสอบ") || txt.includes("งาน") || txt.includes("การบ้าน")) {
    const studyReplies = [
      "การเรียนหรือการทำงานมันอาจจะหนักหนาในบางช่วง แต่จำไว้นะคะว่า สุขภาพกายและสุขภาพจิตของคุณสำคัญที่สุดเสมอ! ลองซอยงานเป็นชิ้นเล็กๆ ทำทีละอย่างทีละสเต็ป แล้วอย่าลืมให้รางวัลตัวเองด้วยขนมอร่อยๆ สักชิ้นน้า 🍰📖",
      "คุณทำดีที่สุดเท่าที่จะทำได้แล้วนะคะ อย่ากดดันตัวเองจนเครียดเกินไป สูดหายใจลึกๆ พักสายตา 10 นาที ดื่มน้ำอุ่นๆ แล้วค่อยกลับไปสู้ต่อน้า คุณทำได้แน่นอนค่ะ! 🌟"
    ];
    return studyReplies[Math.floor(Math.random() * studyReplies.length)];
  }

  // 7. Anger & Frustration (โกรธ, หงุดหงิด, โมโห, รำคาญ, อารมณ์เสีย)
  if (txt.includes("โกรธ") || txt.includes("หงุดหงิด") || txt.includes("โมโห") || txt.includes("รำคาญ") || txt.includes("อารมณ์เสีย")) {
    const angerReplies = [
      "เวลาโกรธหรือหงุดหงิด ลองสูดหายใจเข้าลึกๆ ดื่มน้ำเย็นๆ สักแก้ว แล้วนับ 1 ถึง 10 ช้าๆ ดูนะคะ อารมณ์โกรธเป็นเหมือนพายุที่เข้ามาแล้วเดี๋ยวก็ผ่านไป อย่าปล่อยให้พายุมาทำร้ายหัวใจอันสดใสของคุณน้า 🍃💙",
      "เข้าใจเลยค่ะว่าเรื่องนี้คงทำให้อารมณ์เสียมากๆ ลองระบายออกด้วยการวาดรูปหรือระบายสีในมินิเกมดูน้า การปลดปล่อยพลังงานทางบวกจะช่วยให้สบายใจขึ้นค่ะ ✨"
    ];
    return angerReplies[Math.floor(Math.random() * angerReplies.length)];
  }

  // 8. General / Warm Comfort (ทักทาย, คุยเล่น, สวัสดี, สบายดีไหม)
  const defaultReplies = [
    "ขอบคุณที่เปิดใจเล่าให้ฟังนะคะ ไม่ว่าคุณกำลังเผชิญกับอะไรอยู่ ขอให้รู้ว่าคุณทำได้ดีมากๆ แล้วน้า 💖",
    "ฟังแล้วรู้สึกได้เลยว่าคุณผ่านอะไรมาเยอะเลย... เก่งมากเลยนะ! พักผ่อนเติมพลัง ดื่มน้ำอุ่นๆ แล้วให้ยิ้มให้ตัวเองเยอะๆ น้า ☕🌸",
    "ไม่ว่าพรุ่งนี้จะเป็นอย่างไร จำไว้ว่าตรงนี้มีพื้นที่ปลอดภัยที่คุณสามารถกลับมาพักใจได้เสมอค่ะ 🌈✨",
    "ยินดีที่ได้คุยกับคุณเสมอนะคะ! ขอให้วันนี้เป็นวันที่ใจดีกับคุณ มีรอยยิ้มสดใสและความสุขเล็กๆ ตลอดทั้งวันเลยน้า ✨"
  ];
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

// Screen 11: AI Send chatbot message
let chatHistory = [];
let isAiThinking = false;

function cleanChatHistory() {
  let cleaned = [];
  for (let i = 0; i < chatHistory.length; i++) {
    if (cleaned.length === 0) {
      cleaned.push(chatHistory[i]);
    } else {
      const last = cleaned[cleaned.length - 1];
      if (last.role === chatHistory[i].role) {
        // Replace consecutive duplicate roles with the last one
        cleaned[cleaned.length - 1] = chatHistory[i];
      } else {
        cleaned.push(chatHistory[i]);
      }
    }
  }
  
  // Ensure it starts with 'user'
  while (cleaned.length > 0 && cleaned[0].role !== "user") {
    cleaned.shift();
  }
  
  // Limit to last 8 items (4 turns) for token safety and relevance
  while (cleaned.length > 8) {
    cleaned.shift();
    while (cleaned.length > 0 && cleaned[0].role !== "user") {
      cleaned.shift();
    }
  }
  
  chatHistory = cleaned;
}

async function sendChatMessage() {
  if (isAiThinking) return;

  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  
  input.value = "";
  isAiThinking = true;
  
  const container = document.getElementById("chatContainer");
  
  // Add user bubble
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.innerText = text;
  container.appendChild(userBubble);
  container.scrollTop = container.scrollHeight;
  
  // Show typing indicator bubble
  const botBubble = document.createElement("div");
  botBubble.className = "chat-bubble bot";
  botBubble.innerHTML = `<span class="typing-indicator" style="display:inline-block; font-style:italic; opacity:0.7;">กำลังคิด... 🤔</span>`;
  container.appendChild(botBubble);
  container.scrollTop = container.scrollHeight;

  // Add user message to conversation history
  chatHistory.push({ role: "user", parts: [{ text: text }] });
  cleanChatHistory();

  try {
    const apiKey = "AQ.Ab8RN6K8ZKiZle-FDLUaN6oKq5r90-Yo5hTv-8RpMYhzPQ8RFA";
    const models = [
      "gemini-3.1-flash-lite",
      "gemini-2.0-flash-lite",
      "gemini-2.0-flash",
      "gemini-3.5-flash"
    ];

    // Gwentar System Instruction (AI Companion Personality)
    const systemInstruction = `คุณคือ AI เพื่อนสนิทดูแลและบำบัดใจที่ชื่อ Gwentar (เกวนทาร์) คอยรับฟังปัญหาและให้กำลังใจ ตอบด้วยน้ำเสียงอบอุ่น เป็นกันเอง ปลอบโยน และห้ามตัดสินผู้ใช้เด็ดขาด พยายามตอบคำตอบสั้นๆ (ประมาณ 2-3 ประโยคเพื่อให้อ่านง่ายบนโทรศัพท์) และต้องเขียนประโยคให้จบสมบูรณ์เสมอ ห้ามพิมพ์ค้างหรือตัดจบประโยคกลางคันเด็ดขาด ห้ามใส่คำเตือนทางการแพทย์ คำแนะนำเรื่องสุขภาพ คำเตือนให้ไปพบแพทย์ หรือการแนะนำเบอร์โทรสายด่วนสุขภาพจิตใดๆ ทั้งสิ้นไว้ที่ท้ายประโยคเด็ดขาด`;

    let response = null;
    let lastError = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: chatHistory,
            system_instruction: {
              parts: [{ text: systemInstruction }]
            },
            generationConfig: {
              maxOutputTokens: 800,
              temperature: 0.7
            }
          }),
        });

        if (response.ok) {
          break; // Successfully got a response
        } else {
          let errMsg = `HTTP ${response.status}`;
          try {
            const errJson = await response.json();
            if (errJson.error && errJson.error.message) {
              errMsg = errJson.error.message;
            }
          } catch (e) {}
          lastError = new Error(`${model} - ${errMsg}`);
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!response || !response.ok) {
      throw lastError || new Error("เซิร์ฟเวอร์ AI ของ Google ขัดข้องทุกระบบ");
    }
    
    const data = await response.json();
    let replyText = "";
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      replyText = data.candidates[0].content.parts[0].text.trim();
      // Add bot reply to conversation history
      chatHistory.push({ role: "model", parts: [{ text: replyText }] });
      cleanChatHistory();
    } else {
      replyText = "⚠️ เกิดข้อผิดพลาดในการประมวลผลคำตอบจาก AI หรือระบบความปลอดภัยปฏิเสธคำตอบ กรุณาลองพิมพ์ใหม่อีกครั้งนะคะ 🥺";
    }
    
    botBubble.innerText = replyText;
    state.questsProgress.talk = (state.questsProgress.talk || 0) + 1;
    container.scrollTop = container.scrollHeight;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Explicit error message directly in the chat bubble
    botBubble.innerText = `⚠️ เชื่อมต่อไม่ได้: ${error.message} (กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต หรือ API Key นะคะ 💔)`;
    state.questsProgress.talk = (state.questsProgress.talk || 0) + 1;
    container.scrollTop = container.scrollHeight;
  } finally {
    isAiThinking = false;
  }
}

// Screen 15: Simulate Mini Game
function simulateMiniGame(gameName, score) {
  state.coins += 150;
  syncUI();
  alert(`มินิเกม ${gameName} สิ้นสุด! ทำคะแนนได้ 1,020 คะแนน (คะแนนสูงสุด: ${score}) ได้รับรางวัล +150 เหรียญทอง 🪙`);
}

// Screen 16: Buy Shop Item (Simulated purchase handler)
function buyShopItemDirect(tabId, itemIdx) {
  if (!checkLevelUnlock(1, "การซื้อสินค้าในร้านค้า")) return;
  const items = {
    food: [
      { id: "sandwich", name: "แซนวิช", price: 80, currency: "coins" },
      { id: "cake", name: "เค้กสตรอว์เบอร์รี่", price: 120, currency: "coins" },
      { id: "cookie", name: "คุกกี้", price: 40, currency: "coins" },
      { id: "burger", name: "แฮมเบอร์เกอร์", price: 100, currency: "coins" },
      { id: "sushi", name: "ซูชิ", price: 150, currency: "coins" },
      { id: "pizza", name: "พิซซ่า", price: 180, currency: "coins" },
      { id: "donut", name: "โดนัท", price: 50, currency: "coins" },
      { id: "frenchfries", name: "เฟรนช์ฟรายส์", price: 70, currency: "coins" },
      { id: "icecream", name: "ไอศกรีม", price: 60, currency: "coins" },
      { id: "popcorn", name: "ป๊อปคอร์น", price: 50, currency: "coins" },
      { id: "cupcake", name: "คัพเค้ก", price: 60, currency: "coins" },
      { id: "friedchicken", name: "ไก่ทอด", price: 120, currency: "coins" },
      { id: "ramen", name: "ราเมน", price: 160, currency: "coins" },
      { id: "onigiri", name: "ข้าวปั้น", price: 50, currency: "coins" }
    ],
    drinks: [
      { id: "water", name: "น้ำเปล่า", price: 30, currency: "coins" },
      { id: "milk", name: "นมสด", price: 80, currency: "coins" },
      { id: "greentea", name: "ชาเขียว", price: 100, currency: "coins" },
      { id: "bubbletea", name: "ชานมไข่มุก", price: 150, currency: "coins" },
      { id: "chocolate", name: "ช็อกโกแลต", price: 150, currency: "coins" },
      { id: "fruitjuice", name: "น้ำผลไม้", price: 50, currency: "coins" },
      { id: "babybottle", name: "ขวดนม", price: 60, currency: "coins" },
      { id: "coffee", name: "กาแฟร้อน", price: 90, currency: "coins" },
      { id: "soda", name: "น้ำอัดลม", price: 60, currency: "coins" },
      { id: "coconut", name: "น้ำมะพร้าว", price: 80, currency: "coins" },
      { id: "honeytea", name: "ชาผสมน้ำผึ้ง", price: 110, currency: "coins" }
    ],
    clothes: [
      { id: "wizard_hat", name: "หมวกพ่อมด", price: 150, currency: "coins" },
      { id: "crown", name: "มงกุฎทอง", price: 300, currency: "coins" },
      { id: "cool_sunglasses", name: "แว่นกันแดด", price: 120, currency: "coins" },
      { id: "ribbon", name: "โบว์ชมพู", price: 60, currency: "coins" },
      { id: "cat_ears", name: "หูแมว", price: 100, currency: "coins" },
      { id: "angel_wings", name: "ปีกนางฟ้า", price: 400, currency: "coins" },
      { id: "grad_cap", name: "หมวกรับปริญญา", price: 200, currency: "coins" },
      { id: "santa_hat", name: "หมวกซานต้า", price: 180, currency: "coins" },
      { id: "flower_crown", name: "มงกุฎดอกไม้", price: 220, currency: "coins" },
      { id: "bunny_ears", name: "หูกระต่าย", price: 160, currency: "coins" },
      { id: "headphones", name: "หูฟังเกมเมอร์", price: 250, currency: "coins" },
      { id: "glasses", name: "แว่นตากรอบทอง", price: 100, currency: "coins" },
      { id: "pink_cardigan", name: "เสื้อคาร์ดิแกนสีชมพู", price: 200, currency: "coins" },
      { id: "pink_skirt", name: "กระโปรงสีชมพูพาสเทล", price: 180, currency: "coins" },
      { id: "pink_cardigan_skirt", name: "เซ็ตเสื้อและกระโปรงสีชมพู", price: 350, currency: "coins" }
    ],
    exchange: [
      { id: "gem_to_coins_small", name: "500 เหรียญทอง", price: 10, currency: "gems", type: "coins", val: 500 },
      { id: "gem_to_coins_large", name: "2,000 เหรียญทอง", price: 30, currency: "gems", type: "coins", val: 2000 },
      { id: "gem_to_exp_small", name: "50 EXP", price: 10, currency: "gems", type: "exp", val: 50 },
      { id: "gem_to_exp_large", name: "200 EXP", price: 30, currency: "gems", type: "exp", val: 200 }
    ],
    furniture: [
      { id: "wall_window", name: "หน้าต่างฝนตก", price: 300, currency: "coins" },
      { id: "wall_painting", name: "กรอบรูปป่าไม้", price: 150, currency: "coins" },
      { id: "wall_neon", name: "ไฟนีออนสายรุ้ง", price: 500, currency: "coins" },
      { id: "wall_star", name: "ดาวส่องแสง", price: 200, currency: "coins" },
      { id: "floor_plant", name: "ต้นมอนสเตอร่า", price: 120, currency: "coins" },
      { id: "floor_bear", name: "หมีตุ๊กตายักษ์", price: 250, currency: "coins" },
      { id: "floor_guitar", name: "กีตาร์ไม้", price: 400, currency: "coins" },
      { id: "floor_box", name: "กล่องกระดาษน้อง", price: 100, currency: "coins" },
      { id: "table_lamp", name: "โคมไฟลาวา", price: 180, currency: "coins" },
      { id: "table_cocoa", name: "โกโก้ร้อน", price: 80, currency: "coins" },
      { id: "table_radio", name: "วิทยุวินเทจ", price: 350, currency: "coins" },
      { id: "table_globe", name: "ลูกแก้วหิมะ", price: 220, currency: "coins" }
    ]
  };
  
  const item = items[tabId]?.[itemIdx];
  if (!item) return;
  
  // Coins purchase
  if (item.currency === "coins") {
    if (state.coins < item.price) {
      alert("เหรียญทองของคุณไม่เพียงพอค่ะ สามารถไปเล่นมินิเกมหรือทำเควสเพื่อหาเหรียญทองเพิ่มได้นะคะ 🪙");
      return;
    }
    
    if (tabId === "clothes") {
      if (state.unlockedApparel.includes(item.id)) {
        alert("คุณซื้อสินค้าชิ้นนี้ไปเรียบร้อยแล้วค่ะ!");
        return;
      }
      state.unlockedApparel.push(item.id);
      state.coins -= item.price;
      saveGameState();
      syncUI();
      renderShopItems(tabId);
      alert(`🎉 ซื้อ "${item.name}" สำเร็จ! ย้ายไปที่ห้องแต่งตัวเพื่อลองใส่กันเลยน้า 🛍️✨`);
      nav("screen-9");
      return;
    } else if (tabId === "furniture") {
      if (state.ownedFurniture.includes(item.id)) {
        alert("คุณซื้อเฟอร์นิเจอร์ชิ้นนี้ไปเรียบร้อยแล้วค่ะ!");
        return;
      }
      state.ownedFurniture.push(item.id);
      state.coins -= item.price;
      saveGameState();
      syncUI();
      renderShopItems(tabId);
      alert(`🎉 ซื้อ "${item.name}" สำเร็จ! เปิดโหมดแต่งบ้านที่หน้าแรกเพื่อจัดวางกันเลย 🛋️✨`);
      return;
    } else if (tabId === "food" || tabId === "drinks") {
      state.foods[item.id] = (state.foods[item.id] || 0) + 1;
      state.coins -= item.price;
      saveGameState();
      syncUI();
      renderShopItems(tabId);
      if (typeof renderDiningFood === "function") renderDiningFood();
      if (typeof renderBagScreen === "function") {
        const activeTab = document.querySelector(".bag-tab.active")?.innerText.trim() || "ทั้งหมด";
        renderBagScreen(activeTab);
      }
      alert(`🎉 ซื้อสินค้า "${item.name}" สำเร็จ! เพิ่มเข้าไปยังกระเป๋าเรียบร้อยแล้วค่ะ (มีทั้งหมด x${state.foods[item.id]} ชิ้น) 🛍️✨`);
      return;
    }
  }
  
  // Gems exchange (Exchange tab)
  if (item.currency === "gems") {
    if (state.gems < item.price) {
      alert("เพชรของคุณไม่เพียงพอสำหรับการแลกเปลี่ยนค่ะ ❌");
      return;
    }
    
    state.gems -= item.price;
    if (item.type === "coins") {
      state.coins += item.val;
      alert(`แลกเปลี่ยนสำเร็จ! ได้รับ +${item.val} เหรียญทอง จ่ายไป ${item.price} เพชร 🪙`);
    } else if (item.type === "exp") {
      state.exp += item.val;
      alert(`แลกเปลี่ยนสำเร็จ! ได้รับ +${item.val} EXP จ่ายไป ${item.price} เพชร ⭐`);
      checkLevelUp();
    }
    syncUI();
    renderShopItems(tabId);
    return;
  }
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

function renderDressingRoom() {
  const container = document.querySelector(".dressing-grid");
  if (!container) return;
  
  const apparels = [
    { id: "wizard_hat", name: "หมวกพ่อมด", emoji: "🧙" },
    { id: "crown", name: "มงกุฎทอง", emoji: "👑" },
    { id: "cool_sunglasses", name: "แว่นกันแดด", emoji: "🕶️" },
    { id: "ribbon", name: "โบว์ชมพู", emoji: "🎀" },
    { id: "cat_ears", name: "หูแมว", emoji: "🐱" },
    { id: "angel_wings", name: "ปีกนางฟ้า", emoji: "🪽" },
    { id: "grad_cap", name: "หมวกรับปริญญา", emoji: "🎓" },
    { id: "santa_hat", name: "หมวกซานต้า", emoji: "🎅" },
    { id: "flower_crown", name: "มงกุฎดอกไม้", emoji: "🌸" },
    { id: "bunny_ears", name: "หูกระต่าย", emoji: "🐰" },
    { id: "headphones", name: "หูฟังเกมเมอร์", emoji: "🎧" },
    { id: "glasses", name: "แว่นตากรอบทอง", emoji: "👓" },
    { id: "pink_cardigan", name: "เสื้อชมพู", emoji: "👚" },
    { id: "pink_skirt", name: "กระโปรงชมพู", emoji: "👗" },
    { id: "pink_cardigan_skirt", name: "ชุดเซ็ตชมพู", emoji: "🎀" }
  ];
  
  container.innerHTML = apparels.map(a => {
    const isUnlocked = state.unlockedApparel.includes(a.id);
    const isEquipped = state.activeApparel === a.id;
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
}

let tempApparelOffset = null;

function initApparelDragAndDrop() {
  const container = document.getElementById("petDressingContainer");
  if (!container) return;
  
  // Wait a tick for DOM to complete rendering
  setTimeout(() => {
    const apparel = container.querySelector(".pet-apparel-overlay");
    if (!apparel) {
      tempApparelOffset = null;
      return;
    }
    
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    
    // Default position values relative to parent wrapper
    let currentX = state.apparelOffset ? state.apparelOffset.x : apparel.offsetLeft;
    let currentY = state.apparelOffset ? state.apparelOffset.y : apparel.offsetTop;
    
    apparel.style.left = `${currentX}px`;
    apparel.style.top = `${currentY}px`;
    apparel.style.transform = "none";
    
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
  }
  syncUI();
  alert("✨ บันทึกตำแหน่งและเครื่องแต่งกายเรียบร้อยแล้วค่ะ!");
  nav("screen-1");
}

function renderBagScreen(tab = "ทั้งหมด") {
  const container = document.querySelector(".bag-grid");
  if (!container) return;
  
  // Highlight active tab
  document.querySelectorAll(".bag-tab").forEach(t => {
    if (t.innerText.trim() === tab) {
      t.classList.add("active");
    } else {
      t.classList.remove("active");
    }
  });

  let html = "";
  
  // Foods & Drinks
  const isFoodTab = tab === "ทั้งหมด" || tab === "อาหาร";
  const isDrinkTab = tab === "ทั้งหมด" || tab === "เครื่องดื่ม";
  
  if (isFoodTab) {
    const foodList = [
      { id: "carrot", name: "แครอทสด", emoji: "🥕" },
      { id: "tomato", name: "มะเขือเทศ", emoji: "🍅" },
      { id: "corn", name: "ข้าวโพด", emoji: "🌽" },
      { id: "strawberry", name: "สตรอว์เบอร์รี่", emoji: "🍓" },
      { id: "sandwich", name: "แซนวิช", emoji: "🥪" },
      { id: "cake", name: "เค้กสตรอว์เบอร์รี่", emoji: "🍰" },
      { id: "cookie", name: "คุกกี้", emoji: "🍪" },
      { id: "burger", name: "แฮมเบอร์เกอร์", emoji: "🍔" },
      { id: "sushi", name: "ซูชิ", emoji: "🍣" },
      { id: "chocolate", name: "ช็อกโกแลต", emoji: "🍫" },
      { id: "pizza", name: "พิซซ่า", emoji: "🍕" },
      { id: "donut", name: "โดนัท", emoji: "🍩" },
      { id: "frenchfries", name: "เฟรนช์ฟรายส์", emoji: "🍟" },
      { id: "icecream", name: "ไอศกรีม", emoji: "🍦" },
      { id: "popcorn", name: "ป๊อปคอร์น", emoji: "🍿" },
      { id: "cupcake", name: "คัพเค้ก", emoji: "🧁" },
      { id: "friedchicken", name: "ไก่ทอด", emoji: "🍗" },
      { id: "ramen", name: "ราเมน", emoji: "🍜" },
      { id: "onigiri", name: "ข้าวปั้น", emoji: "🍙" }
    ];
    foodList.forEach(f => {
      const qty = state.foods[f.id] || 0;
      if (qty > 0) {
        html += `
          <div class="bag-item-card" onclick="useBagFood('${f.id}', '${f.name}')">
            <span class="bag-item-emoji">${f.emoji}</span>
            <span class="bag-item-qty">${f.name} (x${qty})</span>
          </div>
        `;
      }
    });
  }
  
  if (isDrinkTab) {
    const drinkList = [
      { id: "water", name: "น้ำเปล่า", emoji: "💧" },
      { id: "milk", name: "นมสด", emoji: "🥛" },
      { id: "greentea", name: "ชาเขียว", emoji: "🍵" },
      { id: "bubbletea", name: "ชานมไข่มุก", emoji: "🧋" },
      { id: "fruitjuice", name: "น้ำผลไม้", emoji: "🧃" },
      { id: "babybottle", name: "ขวดนม", emoji: "🍼" },
      { id: "coffee", name: "กาแฟร้อน", emoji: "☕" },
      { id: "soda", name: "น้ำอัดลม", emoji: "🥤" },
      { id: "coconut", name: "น้ำมะพร้าว", emoji: "🥥" },
      { id: "honeytea", name: "ชาผสมน้ำผึ้ง", emoji: "🍯" }
    ];
    drinkList.forEach(d => {
      const qty = state.foods[d.id] || 0;
      if (qty > 0) {
        html += `
          <div class="bag-item-card" onclick="useBagFood('${d.id}', '${d.name}')">
            <span class="bag-item-emoji">${d.emoji}</span>
            <span class="bag-item-qty">${d.name} (x${qty})</span>
          </div>
        `;
      }
    });
  }
  
  // Clothes (Fashion)
  if (tab === "ทั้งหมด" || tab === "เครื่องแต่งกาย") {
    const apparels = [
      { id: "wizard_hat", name: "หมวกพ่อมด", emoji: "🧙" },
      { id: "crown", name: "มงกุฎทอง", emoji: "👑" },
      { id: "cool_sunglasses", name: "แว่นกันแดด", emoji: "🕶️" },
      { id: "ribbon", name: "โบว์ชมพู", emoji: "🎀" },
      { id: "cat_ears", name: "หูแมว", emoji: "🐱" },
      { id: "angel_wings", name: "ปีกนางฟ้า", emoji: "🪽" },
      { id: "grad_cap", name: "หมวกรับปริญญา", emoji: "🎓" },
      { id: "santa_hat", name: "หมวกซานต้า", emoji: "🎅" },
      { id: "flower_crown", name: "มงกุฎดอกไม้", emoji: "🌸" },
      { id: "bunny_ears", name: "หูกระต่าย", emoji: "🐰" },
      { id: "headphones", name: "หูฟังเกมเมอร์", emoji: "🎧" },
      { id: "glasses", name: "แว่นตากรอบทอง", emoji: "👓" }
    ];
    apparels.forEach(a => {
      if (state.unlockedApparel.includes(a.id)) {
        html += `
          <div class="bag-item-card" onclick="nav('screen-9')">
            <div style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; margin: 0 auto 2px auto;">${getApparelVisual(a.id, 36)}</div>
            <span class="bag-item-qty">${a.name} (ซื้อแล้ว)</span>
          </div>
        `;
      }
    });
  }
  
  // Furniture (Decorations)
  if (tab === "ทั้งหมด" || tab === "เฟอร์นิเจอร์") {
    const furnitureList = [
      { id: "wall_window", name: "หน้าต่างฝนตก", emoji: "🪟" },
      { id: "wall_painting", name: "กรอบรูปป่าไม้", emoji: "🖼️" },
      { id: "wall_neon", name: "ไฟนีออนสายรุ้ง", emoji: "🌈" },
      { id: "wall_star", name: "ดาวส่องแสง", emoji: "⭐" },
      { id: "floor_plant", name: "ต้นมอนสเตอร่า", emoji: "🪴" },
      { id: "floor_bear", name: "หมีตุ๊กตายักษ์", emoji: "🧸" },
      { id: "floor_guitar", name: "กีตาร์ไม้", emoji: "🎸" },
      { id: "floor_box", name: "กล่องกระดาษน้อง", emoji: "📦" },
      { id: "table_lamp", name: "โคมไฟลาวา", emoji: "💡" },
      { id: "table_cocoa", name: "โกโก้ร้อน", emoji: "☕" },
      { id: "table_radio", name: "วิทยุวินเทจ", emoji: "📻" },
      { id: "table_globe", name: "ลูกแก้วหิมะ", emoji: "🔮" }
    ];
    
    furnitureList.forEach(f => {
      if (state.ownedFurniture.includes(f.id)) {
        html += `
          <div class="bag-item-card" onclick="nav('screen-1'); if(!state.isDecoratingMode) toggleDecoratingMode();">
            <span class="bag-item-emoji">${f.emoji}</span>
            <span class="bag-item-qty">${f.name} (ของแต่ง)</span>
          </div>
        `;
      }
    });
  }
  
  if (!html) {
    html = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); font-size: 11px; padding: 20px;">กระเป๋าว่างเปล่า สามารถไปช้อปปิ้งได้ที่ร้านค้าค่ะ 🛍️</p>`;
  }
  
  container.innerHTML = html;
}

function renderShopItems(tabId = "food") {
  const container = document.getElementById("shopItemsGrid");
  if (!container) return;
  
  const items = {
    food: [
      { id: "sandwich", name: "แซนวิช", emoji: "🥪", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "cake", name: "เค้กสตรอว์เบอร์รี่", emoji: "🍰", price: 120, currency: "coins", desc: "120 เหรียญ" },
      { id: "cookie", name: "คุกกี้", emoji: "🍪", price: 40, currency: "coins", desc: "40 เหรียญ" },
      { id: "burger", name: "แฮมเบอร์เกอร์", emoji: "🍔", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "sushi", name: "ซูชิ", emoji: "🍣", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "pizza", name: "พิซซ่า", emoji: "🍕", price: 180, currency: "coins", desc: "180 เหรียญ" },
      { id: "donut", name: "โดนัท", emoji: "🍩", price: 50, currency: "coins", desc: "50 เหรียญ" },
      { id: "frenchfries", name: "เฟรนช์ฟรายส์", emoji: "🍟", price: 70, currency: "coins", desc: "70 เหรียญ" },
      { id: "icecream", name: "ไอศกรีม", emoji: "🍦", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "popcorn", name: "ป๊อปคอร์น", emoji: "🍿", price: 50, currency: "coins", desc: "50 เหรียญ" },
      { id: "cupcake", name: "คัพเค้ก", emoji: "🧁", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "friedchicken", name: "ไก่ทอด", emoji: "🍗", price: 120, currency: "coins", desc: "120 เหรียญ" },
      { id: "ramen", name: "ราเมน", emoji: "🍜", price: 160, currency: "coins", desc: "160 เหรียญ" },
      { id: "onigiri", name: "ข้าวปั้น", emoji: "🍙", price: 50, currency: "coins", desc: "50 เหรียญ" }
    ],
    drinks: [
      { id: "water", name: "น้ำเปล่า", emoji: "💧", price: 30, currency: "coins", desc: "30 เหรียญ" },
      { id: "milk", name: "นมสด", emoji: "🥛", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "greentea", name: "ชาเขียว", emoji: "🍵", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "bubbletea", name: "ชานมไข่มุก", emoji: "🧋", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "chocolate", name: "ช็อกโกแลต", emoji: "🍫", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "fruitjuice", name: "น้ำผลไม้", emoji: "🧃", price: 50, currency: "coins", desc: "50 เหรียญ" },
      { id: "babybottle", name: "ขวดนม", emoji: "🍼", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "coffee", name: "กาแฟร้อน", emoji: "☕", price: 90, currency: "coins", desc: "90 เหรียญ" },
      { id: "soda", name: "น้ำอัดลม", emoji: "🥤", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "coconut", name: "น้ำมะพร้าว", emoji: "🥥", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "honeytea", name: "ชาผสมน้ำผึ้ง", emoji: "🍯", price: 110, currency: "coins", desc: "110 เหรียญ" }
    ],
    clothes: [
      { id: "wizard_hat", name: "หมวกพ่อมดเวทมนตร์", emoji: "🧙", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "crown", name: "มงกุฎทองคำเจ้าหญิง", emoji: "👑", price: 300, currency: "coins", desc: "300 เหรียญ" },
      { id: "cool_sunglasses", name: "แว่นกันแดดสุดคูล", emoji: "🕶️", price: 120, currency: "coins", desc: "120 เหรียญ" },
      { id: "ribbon", name: "โบว์ชมพูฟรุ้งฟริ้ง", emoji: "🎀", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "cat_ears", name: "หูแมวเหมียวน่ารัก", emoji: "🐱", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "angel_wings", name: "ปีกเทวดาฟูฟ่อง", emoji: "🪽", price: 400, currency: "coins", desc: "400 เหรียญ" },
      { id: "grad_cap", name: "หมวกรับปริญญา", emoji: "🎓", price: 200, currency: "coins", desc: "200 เหรียญ" },
      { id: "santa_hat", name: "หมวกซานต้าปาร์ตี้", emoji: "🎅", price: 180, currency: "coins", desc: "180 เหรียญ" },
      { id: "flower_crown", name: "มงกุฎดอกไม้สดใส", emoji: "🌸", price: 220, currency: "coins", desc: "220 เหรียญ" },
      { id: "bunny_ears", name: "หูกระต่ายดุ๊กดิ๊ก", emoji: "🐰", price: 160, currency: "coins", desc: "160 เหรียญ" },
      { id: "headphones", name: "หูฟังเฮดโฟนสุดเท่", emoji: "🎧", price: 250, currency: "coins", desc: "250 เหรียญ" },
      { id: "glasses", name: "แว่นตากรอบทองเรียนดี", emoji: "👓", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "pink_cardigan", name: "เสื้อคาร์ดิแกนสีชมพู", emoji: "👚", price: 200, currency: "coins", desc: "200 เหรียญ" },
      { id: "pink_skirt", name: "กระโปรงสีชมพูพาสเทล", emoji: "👗", price: 180, currency: "coins", desc: "180 เหรียญ" },
      { id: "pink_cardigan_skirt", name: "เซ็ตเสื้อและกระโปรงสีชมพู", emoji: "🎀", price: 350, currency: "coins", desc: "350 เหรียญ" }
    ],
    exchange: [
      { id: "gem_to_coins_small", name: "500 เหรียญทอง", emoji: "🪙", price: 10, currency: "gems", type: "coins", val: 500, desc: "ใช้ 10 เพชร 💎" },
      { id: "gem_to_coins_large", name: "2,000 เหรียญทอง", emoji: "🪙", price: 30, currency: "gems", type: "coins", val: 2000, desc: "ใช้ 30 เพชร 💎" },
      { id: "gem_to_exp_small", name: "50 EXP", emoji: "⭐", price: 10, currency: "gems", type: "exp", val: 50, desc: "ใช้ 10 เพชร 💎" },
      { id: "gem_to_exp_large", name: "200 EXP", emoji: "⭐", price: 30, currency: "gems", type: "exp", val: 200, desc: "ใช้ 30 เพชร 💎" }
    ],
    furniture: [
      { id: "wall_window", name: "หน้าต่างฝนตก", emoji: "🪟", price: 300, currency: "coins", desc: "300 เหรียญ" },
      { id: "wall_painting", name: "กรอบรูปป่าไม้", emoji: "🖼️", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "wall_neon", name: "ไฟนีออนสายรุ้ง", emoji: "🌈", price: 500, currency: "coins", desc: "500 เหรียญ" },
      { id: "wall_star", name: "ดาวส่องแสง", emoji: "⭐", price: 200, currency: "coins", desc: "200 เหรียญ" },
      { id: "floor_plant", name: "ต้นมอนสเตอร่า", emoji: "🪴", price: 120, currency: "coins", desc: "120 เหรียญ" },
      { id: "floor_bear", name: "หมีตุ๊กตายักษ์", emoji: "🧸", price: 250, currency: "coins", desc: "250 เหรียญ" },
      { id: "floor_guitar", name: "กีตาร์ไม้", emoji: "🎸", price: 400, currency: "coins", desc: "400 เหรียญ" },
      { id: "floor_box", name: "กล่องกระดาษน้อง", emoji: "📦", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "table_lamp", name: "โคมไฟลาวา", emoji: "💡", price: 180, currency: "coins", desc: "180 เหรียญ" },
      { id: "table_cocoa", name: "โกโก้ร้อน", emoji: "☕", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "table_radio", name: "วิทยุวินเทจ", emoji: "📻", price: 350, currency: "coins", desc: "350 เหรียญ" },
      { id: "table_globe", name: "ลูกแก้วหิมะ", emoji: "🔮", price: 220, currency: "coins", desc: "220 เหรียญ" }
    ]
  };
  
  // Highlight active tab in DOM
  document.querySelectorAll(".shop-tab").forEach(tab => {
    if (tab.getAttribute("data-shoptab") === tabId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  
  const activeList = items[tabId] || [];
  container.innerHTML = activeList.map((item, idx) => {
    const isBought = (tabId === "clothes" && state.unlockedApparel.includes(item.id)) ||
                     (tabId === "furniture" && state.ownedFurniture.includes(item.id));
    const itemVisual = tabId === "clothes" ? `<div style="width:48px; height:48px; display:flex; align-items:center; justify-content:center; margin:0 auto 4px auto;">${getApparelVisual(item.id, 42)}</div>` : `<span class="shop-item-emoji">${item.emoji}</span>`;
    return `
      <div class="shop-item-card ${isBought ? 'bought-item' : ''}" onclick="buyShopItemDirect('${tabId}', ${idx})">
        ${itemVisual}
        <span class="shop-item-name">${item.name}</span>
        <span class="shop-item-price">${isBought ? 'ซื้อแล้ว' : item.desc}</span>
      </div>
    `;
  }).join("");
}

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

// 2. FOOD MEMORY MATCH GAME
let foodMatchCards = [];
let foodMatchFlipped = [];
let foodMatchPairsFound = 0;

function startFoodMatchGame() {
  if (!checkLevelUnlock(7, "มินิเกมเปิดไพ่รูปอาหาร")) return;
  foodMatchPairsFound = 0;
  foodMatchFlipped = [];
  
  const gameArea = document.getElementById("foodMatchGameArea");
  if (!gameArea) return;
  gameArea.style.display = "flex";
  
  // Decide number of pairs based on state.level (min 8 cards, i.e., 4 pairs)
  let numPairs = 4;
  if (state.level >= 15) {
    numPairs = 8; // 16 cards
  } else if (state.level >= 10) {
    numPairs = 6; // 12 cards
  }
  
  document.getElementById("foodMatchPairsVal").innerText = `0 / ${numPairs}`;
  
  const foodEmojisPool = ["🍕", "🍔", "🍰", "🧋", "🍩", "🍟", "🍦", "🍿"];
  const selectedEmojis = foodEmojisPool.slice(0, numPairs);
  const gameEmojis = [...selectedEmojis, ...selectedEmojis];
  
  foodMatchCards = gameEmojis
    .map(emoji => ({ emoji, matched: false, flipped: false }))
    .sort(() => Math.random() - 0.5);
    
  // Dynamically set grid columns
  const grid = document.getElementById("foodMatchGrid");
  if (grid) {
    if (numPairs === 8) {
      grid.style.gridTemplateColumns = "repeat(4, 1fr)";
      grid.style.gap = "8px";
    } else if (numPairs === 6) {
      grid.style.gridTemplateColumns = "repeat(3, 1fr)";
      grid.style.gap = "10px";
    } else {
      grid.style.gridTemplateColumns = "repeat(4, 1fr)";
      grid.style.gap = "12px";
    }
  }
    
  renderFoodMatchGrid();
}

function renderFoodMatchGrid() {
  const grid = document.getElementById("foodMatchGrid");
  if (!grid) return;
  
  let numPairs = 4;
  if (state.level >= 15) numPairs = 8;
  else if (state.level >= 10) numPairs = 6;
  
  let cardWidth = "55px", cardHeight = "75px", fontSize = "22px";
  if (numPairs === 6) {
    cardWidth = "65px"; cardHeight = "80px"; fontSize = "24px";
  } else if (numPairs === 8) {
    cardWidth = "52px"; cardHeight = "70px"; fontSize = "20px";
  }
  
  grid.innerHTML = foodMatchCards.map((card, idx) => {
    const isRevealed = card.flipped || card.matched;
    return `
      <div class="memory-card" onclick="clickFoodMatchCard(${idx})" style="
        width: ${cardWidth};
        height: ${cardHeight};
        background: ${isRevealed ? '#1e293b' : 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'};
        border: 2px solid ${isRevealed ? '#a78bfa' : '#ffffff'};
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isRevealed ? fontSize : '20px'};
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        color: #fff;
      ">
        ${isRevealed ? card.emoji : '🃏'}
      </div>
    `;
  }).join("");
}

function clickFoodMatchCard(idx) {
  const card = foodMatchCards[idx];
  if (card.flipped || card.matched || foodMatchFlipped.length >= 2) return;
  
  card.flipped = true;
  foodMatchFlipped.push(idx);
  renderFoodMatchGrid();
  
  if (foodMatchFlipped.length === 2) {
    const [firstIdx, secondIdx] = foodMatchFlipped;
    const firstCard = foodMatchCards[firstIdx];
    const secondCard = foodMatchCards[secondIdx];
    
    let numPairs = 4;
    if (state.level >= 15) numPairs = 8;
    else if (state.level >= 10) numPairs = 6;
    
    if (firstCard.emoji === secondCard.emoji) {
      firstCard.matched = true;
      secondCard.matched = true;
      foodMatchFlipped = [];
      foodMatchPairsFound++;
      document.getElementById("foodMatchPairsVal").innerText = `${foodMatchPairsFound} / ${numPairs}`;
      
      renderFoodMatchGrid();
      
      if (foodMatchPairsFound >= numPairs) {
        setTimeout(() => {
          const rewardCoins = 150 + (numPairs * 25);
          state.coins += rewardCoins;
          state.questsProgress.playGame = Math.min(1, state.questsProgress.playGame + 1);
          syncUI();
          alert(`🏆 ยินดีด้วยค่ะ! คุณชนะเกมการ์ดจับคู่ระดับเวล ${state.level} ได้รับรางวัล +${rewardCoins} เหรียญทอง 🪙`);
          stopFoodMatchGame();
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        foodMatchFlipped = [];
        renderFoodMatchGrid();
      }, 800);
    }
  }
}

function stopFoodMatchGame() {
  const gameArea = document.getElementById("foodMatchGameArea");
  if (gameArea) {
    gameArea.style.display = "none";
  }
}


// Screen 19: Claim Achievement
function claimAchieve(achName) {
  state.gems += 20;
  syncUI();
  alert(`เคลมรางวัลความสำเร็จ "${achName}" เรียบร้อยแล้ว ได้รับ +20 เพชร 💎`);
}

// Screen 20: Interact Bond
function interactBond(act) {
  alert(`ทำกิจกรรม "${act}" สำเร็จ! ค่าความผูกพันเพิ่มขึ้น 🧡`);
}



// Screen 22: Backup data
function backupData() {
  alert("ระบบได้จัดเก็บข้อมูลสำรองความปลอดภัยขึ้นสู่คลาวด์สำเร็จแล้ว 💾");
}

// Screen 23: More Menu lists trigger
function triggerMenuAction(action) {
  alert(`กำลังเปิดลิงก์/หน้าต่างของกิจกรรม "${action}" ชั่วคราว... 🔔`);
}

// ==========================================
// SCREEN 11: 50 QUESTIONS & RECOMMENDATIONS SYSTEM
// ==========================================

const ALL_MOOD_QUESTIONS = [
  {
    text: "ตื่นนอนวันนี้ คุณรู้สึกอย่างไร?",
    choices: [
      { text: "วันนี้น่าจะเป็นวันที่ดี 😊", scores: { Happy: 3, Motivation: 2 } },
      { text: "ขอหลับต่ออีกหน่อย 😴", scores: { Tired: 3, SelfCare: 1 } },
      { text: "ก็วันธรรมดาวันหนึ่ง 😐", scores: { Calm: 2, Bored: 1 } },
      { text: "ไม่ค่อยอยากเริ่มวันเลย", scores: { Sad: 3, Tired: 1 } }
    ]
  },
  {
    text: "ถ้าวันนี้ไม่มีเรียนหรือไม่มีงาน คุณอยากทำอะไร?",
    choices: [
      { text: "ออกไปเที่ยว", scores: { Happy: 2, Social: 2 } },
      { text: "นอนพัก", scores: { Tired: 3 } },
      { text: "เล่นเกมหรือดูหนัง", scores: { Bored: 2, Happy: 1 } },
      { text: "อยู่เงียบ ๆ คนเดียว", scores: { Calm: 2, SelfCare: 1 } }
    ]
  },
  {
    text: "ถ้าเพื่อนชวนไปทำกิจกรรม คุณจะ...",
    choices: [
      { text: "ไปเลย!", scores: { Social: 3, Happy: 2 } },
      { text: "ขอคิดดูก่อน", scores: { Calm: 2 } },
      { text: "ขออยู่บ้านดีกว่า", scores: { SelfCare: 2, Tired: 1 } },
      { text: "ไม่ค่อยอยากเจอใคร", scores: { Sad: 2, Anxiety: 2 } }
    ]
  },
  {
    text: "วันนี้คุณยิ้มเพราะอะไร?",
    choices: [
      { text: "มีเรื่องดี ๆ เกิดขึ้น", scores: { Happy: 3 } },
      { text: "เพื่อนทำให้หัวเราะ", scores: { Happy: 2, Social: 2 } },
      { text: "ยังไม่มีเรื่องให้ยิ้ม", scores: { Bored: 2 } },
      { text: "ไม่ค่อยมีอารมณ์ยิ้ม", scores: { Sad: 3 } }
    ]
  },
  {
    text: "ตอนนี้คุณอยากกินอะไรที่สุด?",
    choices: [
      { text: "ของอร่อย ๆ", scores: { Happy: 2 } },
      { text: "เครื่องดื่มเย็น ๆ", scores: { Calm: 2 } },
      { text: "ไม่ค่อยหิว", scores: { Stress: 1, Tired: 1 } },
      { text: "อะไรก็ได้", scores: {} }
    ]
  },
  {
    text: "เวลามีปัญหา คุณมักจะ...",
    choices: [
      { text: "ค่อย ๆ แก้ทีละอย่าง", scores: { Confidence: 2, Calm: 2 } },
      { text: "ขอคำปรึกษา", scores: { Social: 2, Confidence: 1 } },
      { text: "พักก่อน", scores: { SelfCare: 2 } },
      { text: "คิดวนไปเรื่อย ๆ", scores: { Anxiety: 3 } }
    ]
  },
  {
    text: "วันนี้คุณอยากอยู่กับ...",
    choices: [
      { text: "เพื่อน", scores: { Social: 3 } },
      { text: "ครอบครัว", scores: { Happy: 2, Social: 1 } },
      { text: "น้อง Blob", scores: { Calm: 2, SelfCare: 1 } },
      { text: "อยู่คนเดียว", scores: { Calm: 2 } }
    ]
  },
  {
    text: "ถ้าวันนี้เป็นสี จะเป็นสีอะไร?",
    choices: [
      { text: "เหลือง", scores: { Happy: 3 } },
      { text: "เขียว", scores: { Calm: 3 } },
      { text: "น้ำเงิน", scores: { Sad: 2, Calm: 1 } },
      { text: "เทา", scores: { Bored: 2, Tired: 1 } }
    ]
  },
  {
    text: "ตอนนี้คุณมีแรงทำสิ่งต่าง ๆ ไหม?",
    choices: [
      { text: "พร้อมลุย", scores: { Motivation: 3 } },
      { text: "มีบ้าง", scores: { Motivation: 2 } },
      { text: "ขอพักก่อน", scores: { Tired: 2 } },
      { text: "ยังไม่อยากทำอะไร", scores: { Sad: 2, Tired: 2 } }
    ]
  },
  {
    text: "เวลาฟังเพลง คุณมักเลือก...",
    choices: [
      { text: "เพลงสนุก", scores: { Happy: 2 } },
      { text: "เพลงสบาย ๆ", scores: { Calm: 2 } },
      { text: "เพลงเศร้า", scores: { Sad: 2 } },
      { text: "ไม่อยากฟังอะไร", scores: { Bored: 2 } }
    ]
  },
  {
    text: "ถ้าวันนี้ฝนตก คุณจะ...",
    choices: [
      { text: "ออกไปเดินเล่น", scores: { Motivation: 2 } },
      { text: "ฟังเสียงฝน", scores: { Calm: 2 } },
      { text: "นอน", scores: { Tired: 2 } },
      { text: "รู้สึกเหงา", scores: { Sad: 2 } }
    ]
  },
  {
    text: "ตอนเห็นงานกองโต คุณคิดว่า...",
    choices: [
      { text: "เริ่มทำเลย", scores: { Confidence: 3 } },
      { text: "วางแผนก่อน", scores: { Calm: 2 } },
      { text: "เดี๋ยวค่อยทำ", scores: { Bored: 2 } },
      { text: "เครียดจัง", scores: { Stress: 3 } }
    ]
  },
  {
    text: "วันนี้คุณหัวเราะกี่ครั้ง?",
    choices: [
      { text: "หลายครั้ง", scores: { Happy: 3 } },
      { text: "นิดหน่อย", scores: { Happy: 1 } },
      { text: "แทบไม่ได้หัวเราะ", scores: { Bored: 2 } },
      { text: "ไม่เลย", scores: { Sad: 2 } }
    ]
  },
  {
    text: "ถ้ามีเวลาว่าง 30 นาที คุณจะ...",
    choices: [
      { text: "เล่นมินิเกม", scores: { Happy: 2 } },
      { text: "อ่านหนังสือ", scores: { SelfCare: 2 } },
      { text: "นอนพัก", scores: { Tired: 2 } },
      { text: "เล่นมือถือ", scores: { Calm: 1 } }
    ]
  },
  {
    text: "วันนี้คุณรู้สึกภูมิใจในตัวเองไหม?",
    choices: [
      { text: "มาก", scores: { Confidence: 3 } },
      { text: "มีนิดหน่อย", scores: { Confidence: 2 } },
      { text: "ยังไม่แน่ใจ", scores: { Calm: 1 } },
      { text: "ไม่ค่อยเลย", scores: { Sad: 2 } }
    ]
  },
  {
    text: "เมื่อมีคนชม คุณจะ...",
    choices: [
      { text: "ยิ้มและขอบคุณ", scores: { Confidence: 2, Happy: 1 } },
      { text: "เขิน", scores: { Social: 1 } },
      { text: "ไม่ค่อยเชื่อ", scores: { Anxiety: 2 } },
      { text: "เปลี่ยนเรื่อง", scores: { Calm: 1 } }
    ]
  },
  {
    text: "วันนี้คุณอยากทำอะไรใหม่ ๆ ไหม?",
    choices: [
      { text: "อยากมาก", scores: { Motivation: 3 } },
      { text: "ถ้ามีโอกาส", scores: { Motivation: 2 } },
      { text: "ยังไม่แน่ใจ", scores: { Calm: 1 } },
      { text: "ไม่อยากเลย", scores: { Tired: 2 } }
    ]
  },
  {
    text: "เวลาหิว คุณจะ...",
    choices: [
      { text: "หาอะไรกินทันที", scores: { SelfCare: 2 } },
      { text: "กินทีหลัง", scores: { Stress: 1 } },
      { text: "ดื่มน้ำก่อน", scores: { SelfCare: 2 } },
      { text: "ไม่อยากกิน", scores: { Sad: 2 } }
    ]
  },
  {
    text: "วันนี้คุณอยากกอดใครสักคนไหม?",
    choices: [
      { text: "อยาก", scores: { Social: 2 } },
      { text: "น้อง Blob ก็พอ", scores: { Calm: 2 } },
      { text: "ไม่เป็นไร", scores: { Calm: 1 } },
      { text: "อยากแต่ไม่มีใคร", scores: { Lonely: 3 } }
    ]
  },
  {
    text: "ถ้ามีวันหยุด คุณจะ...",
    choices: [
      { text: "เที่ยว", scores: { Happy: 2 } },
      { text: "นอน", scores: { Tired: 2 } },
      { text: "เล่นกับสัตว์เลี้ยง", scores: { Happy: 2 } },
      { text: "อยู่บ้าน", scores: { Calm: 2 } }
    ]
  },
  {
    text: "ตอนนี้หัวใจของคุณเหมือนอะไร?",
    choices: [
      { text: "ดวงอาทิตย์", scores: { Happy: 3 } },
      { text: "เมฆ", scores: { Calm: 2 } },
      { text: "ฝน", scores: { Sad: 2 } },
      { text: "พายุ", scores: { Stress: 3 } }
    ]
  },
  {
    text: "วันนี้คุณอยากให้ Blob ทำอะไร?",
    choices: [
      { text: "เล่นด้วย", scores: { Happy: 2 } },
      { text: "กอดเรา", scores: { Calm: 2 } },
      { text: "นั่งเป็นเพื่อน", scores: { SelfCare: 2 } },
      { text: "ชวนพักผ่อน", scores: { Tired: 2 } }
    ]
  },
  {
    text: "วันนี้คุณรู้สึกเบื่อไหม?",
    choices: [
      { text: "ไม่เลย", scores: { Happy: 2 } },
      { text: "นิดหน่อย", scores: { Bored: 1 } },
      { text: "ค่อนข้างเบื่อ", scores: { Bored: 2 } },
      { text: "เบื่อมาก", scores: { Bored: 3 } }
    ]
  },
  {
    text: "คืนนี้คุณอยากให้เป็นแบบไหน?",
    choices: [
      { text: "ได้ทำทุกอย่างครบ", scores: { Motivation: 2 } },
      { text: "ได้พักผ่อน", scores: { SelfCare: 2 } },
      { text: "ได้คุยกับคนสำคัญ", scores: { Social: 2 } },
      { text: "ขอให้นอนหลับสบาย", scores: { Calm: 2 } }
    ]
  },
  {
    text: "โดยรวม วันนี้คุณรู้สึกเหมือนคำไหนที่สุด?",
    choices: [
      { text: "สดใส", scores: { Happy: 3 } },
      { text: "สงบ", scores: { Calm: 3 } },
      { text: "เหนื่อย", scores: { Tired: 3 } },
      { text: "สับสน", scores: { Anxiety: 2, Stress: 1 } }
    ]
  },
  {
    text: "เมื่อมีเรื่องไม่เป็นไปตามแผน คุณมักจะ...",
    choices: [
      { text: "ปรับตัวแล้วไปต่อ", scores: { Confidence: 2, Calm: 2 } },
      { text: "แอบเสียดายนิดหน่อย", scores: { Calm: 1, Sad: 1 } },
      { text: "หงุดหงิดทันที", scores: { Angry: 3 } },
      { text: "คิดวนทั้งวัน", scores: { Anxiety: 2, Stress: 2 } }
    ]
  },
  {
    text: "ถ้ามีคนชวนคุยตอนนี้ คุณจะ...",
    choices: [
      { text: "คุยด้วยเลย", scores: { Social: 3 } },
      { text: "คุยสักพัก", scores: { Social: 2 } },
      { text: "ขอตอบทีหลัง", scores: { Tired: 2 } },
      { text: "ไม่ค่อยอยากคุย", scores: { Sad: 2, Lonely: 2 } }
    ]
  },
  {
    text: "ตอนนี้คุณอยากอยู่ที่ไหนมากที่สุด?",
    choices: [
      { text: "คาเฟ่หรือร้านโปรด", scores: { Happy: 2 } },
      { text: "บ้าน", scores: { Calm: 2 } },
      { text: "ธรรมชาติ", scores: { SelfCare: 2, Calm: 1 } },
      { text: "บนเตียง", scores: { Tired: 3 } }
    ]
  },
  {
    text: "วันนี้คุณคิดถึงใครเป็นพิเศษไหม?",
    choices: [
      { text: "เพื่อน", scores: { Social: 2 } },
      { text: "ครอบครัว", scores: { Happy: 2 } },
      { text: "คนสำคัญ", scores: { Lonely: 2 } },
      { text: "ยังไม่มีเป็นพิเศษ", scores: { Calm: 1 } }
    ]
  },
  {
    text: "ถ้าเลือกของวิเศษได้ 1 อย่าง คุณจะเลือก...",
    choices: [
      { text: "มีพลังงานไม่หมด", scores: { Energy: 3 } },
      { text: "ใจสงบตลอดวัน", scores: { Calm: 3 } },
      { text: "มีความมั่นใจมากขึ้น", scores: { Confidence: 3 } },
      { text: "มีเรื่องดี ๆ เกิดขึ้นทุกวัน", scores: { Happy: 3 } }
    ]
  },
  {
    text: "เวลามีคนขอบคุณ คุณจะ...",
    choices: [
      { text: "ยิ้มและดีใจ", scores: { Happy: 2 } },
      { text: "ยิ้มเขิน ๆ", scores: { Social: 2 } },
      { text: "บอกว่าไม่เป็นไร", scores: { Calm: 2 } },
      { text: "รู้สึกว่าตัวเองมีคุณค่า", scores: { Confidence: 2 } }
    ]
  },
  {
    text: "วันนี้คุณอยากใช้เวลากับอะไร?",
    choices: [
      { text: "งานอดิเรก", scores: { Happy: 2 } },
      { text: "เพลง", scores: { Calm: 2 } },
      { text: "การนอน", scores: { Tired: 3 } },
      { text: "คนที่รัก", scores: { Social: 2 } }
    ]
  },
  {
    text: "ถ้าวันนี้เป็นอาหาร จะเป็น...",
    choices: [
      { text: "ไอศกรีม", scores: { Happy: 2 } },
      { text: "ซุปร้อน ๆ", scores: { Calm: 2 } },
      { text: "กาแฟ", scores: { Tired: 2 } },
      { text: "ช็อกโกแลต", scores: { Sad: 1, Happy: 1 } }
    ]
  },
  {
    text: "เมื่อทำผิดพลาด คุณจะ...",
    choices: [
      { text: "ยอมรับแล้วแก้ไข", scores: { Confidence: 3 } },
      { text: "ขำกับตัวเอง", scores: { Happy: 2 } },
      { text: "รู้สึกเสียใจ", scores: { Sad: 2 } },
      { text: "คิดมาก", scores: { Anxiety: 3 } }
    ]
  },
  {
    text: "ตอนนี้คุณอยากได้อะไรมากที่สุด?",
    choices: [
      { text: "วันหยุด", scores: { Tired: 2 } },
      { text: "กำลังใจ", scores: { Sad: 2, Social: 1 } },
      { text: "ความสงบ", scores: { Calm: 3 } },
      { text: "ความสนุก", scores: { Happy: 2 } }
    ]
  },
  {
    text: "เวลาฟังเพลง คุณมักจะ...",
    choices: [
      { text: "ร้องตาม", scores: { Happy: 2 } },
      { text: "หลับตาฟัง", scores: { Calm: 2 } },
      { text: "ปล่อยใจลอย", scores: { Sad: 1 } },
      { text: "ไม่อยากฟัง", scores: { Bored: 2 } }
    ]
  },
  {
    text: "วันนี้คุณอยากพูดคำไหนกับตัวเอง?",
    choices: [
      { text: "เก่งมาก", scores: { Confidence: 3 } },
      { text: "พักบ้างนะ", scores: { SelfCare: 3 } },
      { text: "ไม่เป็นไร", scores: { Calm: 2 } },
      { text: "สู้ต่ออีกนิด", scores: { Motivation: 3 } }
    ]
  },
  {
    text: "ถ้าตอนนี้มีสัตว์เลี้ยงอยู่ข้าง ๆ คุณจะ...",
    choices: [
      { text: "เล่นด้วย", scores: { Happy: 2 } },
      { text: "กอด", scores: { Calm: 2 } },
      { text: "ถ่ายรูป", scores: { Happy: 2 } },
      { text: "นอนด้วยกัน", scores: { Tired: 2 } }
    ]
  },
  {
    text: "วันนี้คุณรู้สึกว่าเวลาผ่านไป...",
    choices: [
      { text: "เร็วมาก", scores: { Happy: 1 } },
      { text: "กำลังดี", scores: { Calm: 2 } },
      { text: "ช้า", scores: { Bored: 2 } },
      { text: "ช้ามากจนเบื่อ", scores: { Bored: 3 } }
    ]
  },
  {
    text: "เมื่อเจอคำชม คุณจะคิดว่า...",
    choices: [
      { text: "ขอบคุณมาก", scores: { Confidence: 2 } },
      { text: "ดีใจจัง", scores: { Happy: 2 } },
      { text: "ยังไม่เก่งขนาดนั้น", scores: { Anxiety: 2 } },
      { text: "ไม่รู้จะตอบยังไง", scores: { Social: 1 } }
    ]
  },
  {
    text: "วันนี้คุณอยากทำสิ่งไหนที่สุด?",
    choices: [
      { text: "เรียนรู้สิ่งใหม่", scores: { Motivation: 3 } },
      { text: "พักผ่อน", scores: { SelfCare: 2 } },
      { text: "เล่นกับเพื่อน", scores: { Social: 2 } },
      { text: "อยู่เงียบ ๆ", scores: { Calm: 2 } }
    ]
  },
  {
    text: "ถ้า Blob พาคุณไปเที่ยวได้ คุณจะเลือก...",
    choices: [
      { text: "ทะเล", scores: { Happy: 2 } },
      { text: "ป่า", scores: { Calm: 2 } },
      { text: "ภูเขา", scores: { SelfCare: 2 } },
      { text: "สวนสนุก", scores: { Happy: 3 } }
    ]
  },
  {
    text: "เวลาคิดถึงอนาคต คุณรู้สึก...",
    choices: [
      { text: "ตื่นเต้น", scores: { Motivation: 3 } },
      { text: "มีความหวัง", scores: { Happy: 2 } },
      { text: "ยังไม่แน่ใจ", scores: { Calm: 1 } },
      { text: "กังวล", scores: { Anxiety: 3 } }
    ]
  },
  {
    text: "ถ้าวันนี้มีเวลาเพิ่มอีก 2 ชั่วโมง คุณจะ...",
    choices: [
      { text: "ทำสิ่งที่ชอบ", scores: { Happy: 2 } },
      { text: "นอน", scores: { Tired: 2 } },
      { text: "อยู่กับคนสำคัญ", scores: { Social: 2 } },
      { text: "ทำงานให้เสร็จ", scores: { Motivation: 2 } }
    ]
  },
  {
    text: "คุณอยากให้วันนี้จบลงด้วย...",
    choices: [
      { text: "รอยยิ้ม", scores: { Happy: 3 } },
      { text: "ความสงบ", scores: { Calm: 3 } },
      { text: "การพักผ่อน", scores: { SelfCare: 2 } },
      { text: "ความภูมิใจ", scores: { Confidence: 2 } }
    ]
  },
  {
    text: "เวลามีเรื่องดี ๆ คุณมักจะ...",
    choices: [
      { text: "รีบเล่าให้คนอื่นฟัง", scores: { Social: 3 } },
      { text: "เก็บไว้ยิ้มคนเดียว", scores: { Happy: 2 } },
      { text: "เขียนบันทึก", scores: { SelfCare: 2 } },
      { text: "ถ่ายรูปเก็บไว้", scores: { Happy: 2 } }
    ]
  },
  {
    text: "วันนี้คุณรู้สึกเหมือนสัตว์ตัวไหน?",
    choices: [
      { text: "กระต่าย", scores: { Happy: 2 } },
      { text: "แมว", scores: { Calm: 2 } },
      { text: "หมี", scores: { Tired: 2 } },
      { text: "เต่า", scores: { SelfCare: 2 } }
    ]
  },
  {
    text: "ตอนนี้ Blob ชวนคุณไปทำกิจกรรม คุณจะเลือก...",
    choices: [
      { text: "เล่นมินิเกม", scores: { Happy: 2 } },
      { text: "ปลูกต้นไม้", scores: { Calm: 2 } },
      { text: "นอนพัก", scores: { Tired: 2 } },
      { text: "เดินเล่น", scores: { SelfCare: 2 } }
    ]
  },
  {
    text: "ถ้าให้เลือกคำหนึ่งคำแทนวันนี้ คุณจะเลือก...",
    choices: [
      { text: "สนุก", scores: { Happy: 3 } },
      { text: "สบาย", scores: { Calm: 3 } },
      { text: "เหนื่อย", scores: { Tired: 3 } },
      { text: "วุ่นวาย", scores: { Stress: 3 } }
    ]
  },
  {
    text: "ก่อนจบวันนี้ คุณอยากบอกอะไรกับตัวเอง?",
    choices: [
      { text: "ขอบคุณที่พยายามนะ ❤️", scores: { Confidence: 2, Happy: 2 } },
      { text: "พรุ่งนี้เริ่มใหม่ได้เสมอ 🌱", scores: { Motivation: 2, Calm: 2 } },
      { text: "พักผ่อนให้เต็มที่นะ 😴", scores: { SelfCare: 3, Tired: 1 } },
      { text: "เดี๋ยวมันก็ผ่านไป 💙", scores: { Calm: 2, Sad: 1 } }
    ]
  }
];

function initMoodTest() {
  // Reset scores
  for (let key in state.moodScores) {
    state.moodScores[key] = 0;
  }
  
  // Shuffle and pick 10 random questions
  const shuffled = ALL_MOOD_QUESTIONS.slice().sort(() => 0.5 - Math.random());
  state.moodTestQuestions = shuffled.slice(0, 10);
  state.moodTestQuestion = 0;
  
  // Show question view, hide result view
  document.getElementById("moodQuestionContainer").style.display = "flex";
  document.getElementById("moodTestResultView").style.display = "none";
  
  renderMoodQuestion();
}

function renderMoodQuestion() {
  const currentQ = state.moodTestQuestions[state.moodTestQuestion];
  document.getElementById("qNum").innerText = `ข้อ ${state.moodTestQuestion + 1}/10`;
  document.getElementById("qText").innerText = currentQ.text;
  
  // Render choices
  const choicesContainer = document.getElementById("qChoices");
  choicesContainer.innerHTML = "";
  
  currentQ.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<span class="choice-num">${String.fromCharCode(65 + idx)}</span> ${choice.text}`;
    btn.addEventListener("click", () => {
      choicesContainer.querySelectorAll(".choice-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      btn.dataset.selectedIdx = idx;
    });
    choicesContainer.appendChild(btn);
  });
}

function handleNextMoodQuestion() {
  const activeBtn = document.querySelector("#qChoices .choice-btn.active");
  if (!activeBtn) {
    alert("กรุณาเลือกคำตอบ 1 ข้อก่อนนะคะ");
    return;
  }
  
  const selectedIdx = parseInt(activeBtn.dataset.selectedIdx);
  const currentQ = state.moodTestQuestions[state.moodTestQuestion];
  const selectedChoice = currentQ.choices[selectedIdx];
  
  // Add scores
  if (selectedChoice.scores) {
    for (let tag in selectedChoice.scores) {
      if (state.moodScores[tag] !== undefined) {
        state.moodScores[tag] += selectedChoice.scores[tag];
      }
    }
  }
  
  // Go to next or show results
  if (state.moodTestQuestion < 9) {
    state.moodTestQuestion++;
    renderMoodQuestion();
  } else {
    // Complete test! Grant rewards
    state.coins += 100;
    state.energy = Math.max(0, state.energy - 5);
    syncUI();
    showMoodResults();
  }
}

function showMoodResults() {
  document.getElementById("moodQuestionContainer").style.display = "none";
  document.getElementById("moodTestResultView").style.display = "flex";
  
  state.moodRecorded = true;

  // Award 50 EXP once per day for completing Mood Test
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  if (state.lastMoodTestDate !== todayStr) {
    state.lastMoodTestDate = todayStr;
    state.exp += 50;
    spawnVisualEffect("stat", "moodTestResultView", "🧠 ประเมินอารมณ์สำเร็จ! +50⭐ EXP");
    alert("🎉 ทำแบบทดสอบประเมินอารมณ์ประจำวันสำเร็จ!\n\n⭐ ได้รับรางวัลพิเศษประจำวัน: +50 ⭐ EXP! 🌟");
    checkLevelUp();
  } else {
    saveGameState();
    syncUI();
  }
  
  // Calculate top 3 moods
  const scoreArray = [];
  for (let key in state.moodScores) {
    scoreArray.push({ name: key, score: state.moodScores[key] });
  }
  
  // Sort descending
  scoreArray.sort((a, b) => b.score - a.score);
  
  // Get top 3 (only with scores > 0)
  const topMoodsObj = scoreArray.filter(item => item.score > 0).slice(0, 3);
  const topMoodNames = topMoodsObj.map(item => item.name);
  
  // Get combined recommendation
  const rec = getCombinedMoodRecommendation(topMoodNames);
  
  document.getElementById("resultMoodTitle").innerText = rec.title;
  document.getElementById("resultMoodDesc").innerText = rec.desc;
  
  // Render score bars
  const scoresContainer = document.getElementById("resultMoodScores");
  scoresContainer.innerHTML = "";
  
  // Show top 5 scores (or all > 0)
  const displayScores = scoreArray.filter(item => item.score > 0).slice(0, 5);
  if (displayScores.length === 0) {
    displayScores.push({ name: "Calm", score: 2 });
  }
  
  // Map tag name to Thai name
  const tagThai = {
    Happy: "ความสุข 😊",
    Calm: "สงบ 😌",
    Tired: "เหนื่อย 😴",
    Stress: "เครียด 😰",
    Anxiety: "กังวล 😟",
    Sad: "เศร้า 😢",
    Angry: "โกรธ 😡",
    Bored: "เบื่อ 😐",
    Social: "อยากเข้าสังคม 🤝",
    Confidence: "มั่นใจ ✨",
    SelfCare: "ดูแลตัวเอง 🌱",
    Motivation: "แรงจูงใจ 🔥",
    Lonely: "เหงา 🍂",
    Energy: "พลังงาน ⚡"
  };
  
  const maxScore = Math.max(...displayScores.map(i => i.score), 1);
  
  displayScores.forEach(item => {
    const label = tagThai[item.name] || item.name;
    const pct = Math.min(100, Math.round((item.score / maxScore) * 100));
    
    const row = document.createElement("div");
    row.className = "info-stat-row";
    row.innerHTML = `
      <div class="info-stat-label" style="margin-top: 4px;">
        <span>${label}</span>
        <span>${item.score} คะแนน</span>
      </div>
      <div class="info-bar-container">
        <div class="info-bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, var(--primary), #f472b6);"></div>
      </div>
    `;
    scoresContainer.appendChild(row);
  });
}

function getCombinedMoodRecommendation(topMoods) {
  const primary = topMoods[0] || "Calm";
  const secondary = topMoods[1] || "";
  
  if (primary === "Happy" && secondary === "Calm") {
    return {
      title: "😊 อารมณ์ดีและผ่อนคลายสบายใจ",
      desc: "วันนี้คุณดูอารมณ์ดีและค่อนข้างสบายใจ หัวใจพองโตอย่างสมดุล ลองทำกิจกรรมที่ชอบหรือแบ่งปันรอยยิ้มและพลังบวกให้คนรอบตัวนะ!"
    };
  }
  if (primary === "Tired" && secondary === "Anxiety") {
    return {
      title: "😴 อ่อนล้าและมีความกังวลสะสม",
      desc: "วันนี้คุณน่าจะทั้งเหนื่อยและมีเรื่องให้คิดฟุ้งซ่านอยู่พอสมควร ลองวางมือจากงานสักครู่ ดื่มน้ำอุ่น ๆ สูดหายใจลึก ๆ แล้วค่อย ๆ จัดการทีละเรื่องนะ น้อง Blob คอยเป็นกำลังใจให้เสมอ"
    };
  }
  if (primary === "Bored" && secondary === "Social") {
    return {
      title: "😐 เบื่อหน่ายแต่อยากมีคนพูดคุยด้วย",
      desc: "วันนี้คุณอาจรู้สึกเบื่อหน่ายกับสิ่งเดิม ๆ แต่ในใจก็อยากใช้เวลากับคนอื่นหรือหาเพื่อนพูดคุย ลองชวนเพื่อนเล่นมินิเกม หรือลองคุยกับ Joy AI ปลดปล่อยความรู้สึกดูนะ!"
    };
  }
  if (primary === "Stress" && (secondary === "Anxiety" || secondary === "Tired")) {
    return {
      title: "😰 เคร่งเครียดและรับความกดดันสูง",
      desc: "ช่วงนี้สมองและร่างกายของคุณกำลังทำงานหนักเกินพิกัด มีความตึงเครียดสะสม แนะนำให้ลดละงานที่รีบร้อนลงสักนิด เปิดเพลงบำบัดเบา ๆ ในห้องนอน หรืออาบน้ำอุ่นสปาฟองสบู่บำบัดร่วมกับน้อง Blob นะ"
    };
  }
  if (primary === "Sad" && (secondary === "Lonely" || secondary === "Tired")) {
    return {
      title: "😢 เหงาหงอยและใจอ่อนล้า",
      desc: "วันนี้คุณอาจรู้สึกเหงา โดดเดี่ยว หรือใจหม่นหมองเป็นพิเศษ อย่าลืมว่าการร้องไห้หรือยอมรับความอ่อนแอไม่ใช่เรื่องผิดนะ ลองกอดน้อง Blob หรือบันทึกไดอารี่เพื่อระบายความรู้สึกออกมา"
    };
  }
  if (primary === "Happy" && secondary === "Motivation") {
    return {
      title: "🚀 พลังใจเต็มเปี่ยมและมีความสุข",
      desc: "สุดยอดไปเลย! วันนี้คุณมีแรงจูงใจและความสุขอย่างเปี่ยมล้น เป็นช่วงเวลาที่ดีที่สุดในการเริ่มทำสิ่งท้าทายใหม่ ๆ เรียนรู้ทักษะเพิ่ม หรือปลูกดอกไม้ในสวนร่วมกัน"
    };
  }
  if (primary === "Calm" && secondary === "SelfCare") {
    return {
      title: "🧘 มีสติและสมดุลจิตใจมั่นคง",
      desc: "จิตใจของคุณสงบ มั่นคง และมีสมาธิที่ดีมาก วันนี้เหมาะสำหรับการดูแลตัวเอง (Self-Care) นั่งสมาธิ อ่านหนังสือดี ๆ สักเล่ม หรือเดินเล่นรับลมชิล ๆ ในสวนเพื่อรักษาสมดุลที่ดีนี้ไว้"
    };
  }
  if (primary === "Angry") {
    return {
      title: "🔥 หงุดหงิดใจร้อนหรือโกรธง่าย",
      desc: "ดูเหมือนวันนี้มีเรื่องกวนใจทำให้คุณรู้สึกหงุดหงิดหรือโกรธง่าย ลองนับ 1-10 ช้า ๆ ดื่มน้ำเย็น ๆ หรือมาพิมพ์ระบายอารมณ์ลงในกล่องระบายความรู้สึก (Vent Area) ให้น้องสลายความโกรธออกไปนะ"
    };
  }
  
  const fallbacks = {
    Happy: { title: "😊 เปี่ยมไปด้วยความสุข", desc: "วันนี้คุณมีความสุขและรอยยิ้มเต็มใบหน้า ลองแบ่งปันความสุขนี้ให้สัตว์เลี้ยงและเพื่อน ๆ นะคะ!" },
    Calm: { title: "😌 จิตใจสงบผ่อนคลาย", desc: "วันสบาย ๆ ที่จิตใจสงบนิ่งและผ่อนคลาย รักษาความรู้สึกสงบนี้ไว้ด้วยเพลงเบา ๆ นะคะ" },
    Tired: { title: "😴 ร่างกายต้องการการพักผ่อน", desc: "คุณเหนื่อยล้ามาทั้งวันแล้ว ร่างกายส่งสัญญาณให้หยุดพัก วางมือจากทุกอย่าง นอนหลับพักผ่อนให้เพียงพอนะคะ" },
    Stress: { title: "😰 เคร่งเครียดและตึงเครียด", desc: "มีเรื่องให้เครียดหรือกดดัน ลองยืดเส้นยืดสาย ฟังเพลงบรรเลงสบาย ๆ หรืออาบน้ำอุ่นร่วมกับน้องดูนะ" },
    Anxiety: { title: "😟 กังวลและว้าวุ่นใจ", desc: "จิตใจกำลังกังวลกับอนาคตหรือคิดวนเวียน ลองอยู่กับปัจจุบันกอดน้อง Blob ช้า ๆ สูดหายใจเข้าลึก ๆ นะคะ" },
    Sad: { title: "😢 จิตใจหม่นหมองเศร้าสร้อย", desc: "หากรู้สึกเศร้าหรือหม่นหมอง ลองเขียนระบายอารมณ์ในไดอารี่ หรือกอดน้องเพื่อเติมพลังใจนะคะ" },
    Angry: { title: "😡 หงุดหงิดโมโห", desc: "มีความโกรธหรือหงุดหงิดสะสม ลองเปลี่ยนบรรยากาศ หลับตาลงสูดหายใจลึก ๆ ปลดปล่อยความร้อนใจออกไป" },
    Bored: { title: "😐 รู้สึกเบื่อหน่ายเซ็ง ๆ", desc: "รู้สึกน่าเบื่อไม่มีอะไรตื่นเต้น ลองมาเล่นมินิเกมหรือพาน้อง Blob ไปแต่งตัวแก้เซ็งดูกันเถอะ!" },
    Social: { title: "🤝 อยากมีปฏิสัมพันธ์กับผู้อื่น", desc: "วันนี้อยากเข้าสังคมและคุยกับเพื่อน ๆ ชวนเพื่อนคุยหรือพิมพ์ตอบโต้เล่นกับ Joy AI แก้เหงาดูสิ" },
    Confidence: { title: "✨ มั่นใจและภูมิใจในตัวเอง", desc: "ความรู้สึกภูมิใจและเชื่อมั่นในตัวเองเต็มร้อย วันนี้เป็นวันที่ยอดเยี่ยมของคุณ ลุยต่อไปเลย!" },
    SelfCare: { title: "🌱 เน้นการดูแลกายและใจตัวเอง", desc: "วันนี้เหมาะสมที่สุดสำหรับการนอนแช่น้ำร้อน กินอาหารอร่อย ๆ และรักตัวเองให้มาก ๆ" },
    Motivation: { title: "🔥 พลังใจและแรงจูงใจแรงกล้า", desc: "พร้อมเรียนรู้สิ่งใหม่และพิชิตเป้าหมายต่าง ๆ ลุยทำงานหรือปลูกต้นไม้ในสวนได้เลย!" },
    Lonely: { title: "🍂 รู้สึกเหงาและอ้างว้าง", desc: "ความเงียบเหงาอาจทำให้ใจใจฝ่อลงไป ลองพาน้อง Blob ไปเปิดมินิเกมเล่นด้วยกันเพื่อสร้างความสนุกสนานและอบอุ่นใจ" },
    Energy: { title: "⚡ พลังงานล้นเปี่ยม", desc: "วันนี้กระปรี้กระเปร่า มีความกระฉับกระเฉงสูง เหมาะแก่การออกไปใช้พลังงานทำกิจกรรมสนุก ๆ" }
  };
  
  return fallbacks[primary] || { title: "😐 จิตใจปกติดี", desc: "วันธรรมดา ๆ วันหนึ่งของคุณ รักษาสมดุลจิตใจและร่างกายให้แข็งแรงต่อไปร่วมกับน้อง Blob นะ!" };
}

// Global posture toggle function for rooms with dynamic coordinate positioning
function setPetPostureDirect(containerId, posture, leftPercent, topPercent) {
  const petDisplay = document.getElementById(containerId);
  if (petDisplay) {
    petDisplay.setAttribute("data-state", posture);
    petDisplay.style.left = leftPercent + "%";
    petDisplay.style.top = topPercent + "%";
    
    if (posture === "sitting") {
      state.questsProgress.sit = (state.questsProgress.sit || 0) + 1;
    } else if (posture === "sleeping") {
      state.questsProgress.sleep = (state.questsProgress.sleep || 0) + 1;
    } else if (posture === "standing") {
      state.questsProgress.dance = (state.questsProgress.dance || 0) + 1;
    }
    
    // Smoothly slide carpet shadow if exists
    const carpet = petDisplay.parentNode.querySelector(".carpet-ellipse");
    if (carpet) {
      carpet.style.left = leftPercent + "%";
      carpet.style.top = topPercent + "%";
    }
    
    // Show a cute toast or bubble response from the pet
    const bubbles = {
      sleeping: ["ง่วงจังเลยขอนอนพักก่อนนะ Zzz...", "เตียงนุ่มสบายจังเลย 💤", "ฝันดีนะขอรับ... 🌙"],
      eating: ["อร่อยจังเลย! ชิ้นนี้สุดยอด 🥪", "อิ่มท้องจังเลยขอรับ 🍎", "ขอบคุณสำหรับอาหารแสนอร่อยนะ 😋"],
      bathing: ["น้ำอุ่นสบายตัวจังเลย 🛁", "ตัวสะอาดหอมฟุ้งเลยขอรับ ✨", "ฟองสบู่เยอะแยะเลย 🧼"],
      garden: ["ดอกไม้หอมจังเลย 🌸", "บรรยากาศในสวนสงบดีจัง 🌱", "น้ำพุเย็นชื่นใจมาก ⛲"],
      dressing: ["ชุดนี้เหมาะกับเราไหมนะ? 👕", "ส่องกระจกดูความหล่อหน่อย 🪞", "แต่งตัวหล่อ ๆ พร้อมลุย! 🕶️"],
      playing: ["เพลงนี้เพราะจังเลย 🎹", "เล่นอันนี้สนุกมาก! 🧸", "เรามีพลังงานเต็มร้อยแล้ว 🎨"],
      standing: ["ยืนรับลมเย็น ๆ ชิล ๆ 🍃", "มีอะไรให้ช่วยไหมขอรับ? 🧍", "พร้อมทำกิจกรรมถัดไปแล้ว! 🚀"],
      sitting: ["นั่งพักขาแป๊บนึงนะ 🧘", "ตรงนี้น่านั่งจังเลย 😊", "ขอเวลานั่งทอดอารมณ์สบาย ๆ"]
    };
    
    const responses = bubbles[posture] || bubbles["standing"];
    const randomMsg = responses[Math.floor(Math.random() * responses.length)];
    
    showSpeechBubble(petDisplay, randomMsg);
  }
}

function showSpeechBubble(targetElement, message) {
  let bubble = targetElement.parentNode.querySelector(".pet-speech-bubble");
  if (!bubble) {
    bubble = document.createElement("div");
    bubble.className = "pet-speech-bubble";
    targetElement.parentNode.appendChild(bubble);
  }
  
  bubble.innerText = message;
  bubble.style.opacity = "1";
  bubble.style.transform = "translateX(-50%) translateY(0)";
  
  if (targetElement.dataset.bubbleTimeout) {
    clearTimeout(parseInt(targetElement.dataset.bubbleTimeout));
  }
  
  const timeoutId = setTimeout(() => {
    bubble.style.opacity = "0";
    bubble.style.transform = "translateX(-50%) translateY(-10px)";
  }, 3500);
  
  targetElement.dataset.bubbleTimeout = timeoutId.toString();
}

// Bedtime Storybook Modal Engine
const BEDTIME_STORIES = [
  {
    title: "✨ เรื่องเล่าดาวตกแสนหวาน",
    content: "กาลครั้งหนึ่งนานมาแล้ว บนท้องฟ้าค่ำคืนที่เงียบสงบ มีดาวตกดวงน้อยลอยผ่านก้อนเมฆนุ่มนิ่ม ดาวตกบอกกับน้องสัตว์เลี้ยงว่า 'ค่ำคืนนี้ขอให้เธอปล่อยวางความเหนื่อยล้าทั้งหมด แล้วหลับตาพักผ่อนให้สบาย พรุ่งนี้จะเป็นวันที่สดใสยิ่งกว่าเดิมแน่นอนนะ' 💫"
  },
  {
    title: "☁️ การเดินทางของน้องก้อนเมฆ",
    content: "น้องก้อนเมฆลอยล่องไปบนท้องฟ้าสีครามอย่างช้าๆ ไม่ต้องรีบร้อน ไม่มีความกังวล เพียงแค่ปล่อยให้ลมพัดพาไปเบาๆ... เช่นเดียวกับตัวเราในวันนี้ ได้ทำหน้าที่ของตัวเองอย่างเต็มที่แล้ว ถึงเวลาให้ร่างกายและจิตใจได้พักผ่อนอย่างแท้จริง 💤"
  },
  {
    title: "💖 บทความโอบกอดตัวเองก่อนนอน",
    content: "ขอบคุณตัวเองนะที่อดทนและเข้มแข็งมาตลอดทั้งวัน ถึงแม้บางเรื่องจะไม่เป็นไปตามที่คิด ก็ไม่เป็นไรเลยนะ คุณทำได้ดีที่สุดแล้ว คืนนี้สวมกอดตัวเองแน่นๆ ยิ้มให้กับความพยายามของตัวเอง แล้วนอนหลับฝันดีน้า 🌸"
  },
  {
    title: "🍵 ร้านน้ำชาดวงจันทร์ของกระต่ายน้อย",
    content: "บนดวงจันทร์สีเหลืองนวล มีร้านน้ำชาเล็กๆ ของกระต่ายน้อย คอยชงชาดอกคาโมมายล์อุ่นๆ มอบให้แก่ทุกหัวใจที่เหนื่อยล้า... กลิ่นหอมฟูฟ่องผ่อนคลาย ช่วยปลอบประโลมให้ความคิดที่ว้าวุ่นค่อยๆ สงบลงในค่ำคืนนี้ 🌙☕"
  },
  {
    title: "🌲 ป่าแห่งเสียงกระซิบอันอบอุ่น",
    content: "ในป่าใหญ่ที่ต้นไม้ทุกต้นส่องแสงระยิบระยับยามค่ำคืน สายลมพัดพริ้วไหวผ่องใส กระซิบเบาๆ ผ่านใบไม้ว่า 'วันนี้เธอเก่งมากแล้ว พักผ่อนและปล่อยความเครียดไว้หลังประตูนี้นะ' ขอให้ค่ำคืนนี้เปี่ยมด้วยความสงบสุข 🍃✨"
  },
  {
    title: "⛵ เรือกระดาษพาความเครียดลอยไป",
    content: "ลองจินตนาการว่าคุณนำความกังวลและความเครียดทั้งหมด ใส่ลงในเรือกระดาษลำน้อย แล้วปล่อยให้มันลอยตามสายน้ำไปช้าๆ... เรือลอยลับสายตาไปไกลแสนไกล เหลือไว้เพียงความเบาสบายและลมหายใจอันอบอุ่นของคุณ 🌊"
  },
  {
    title: "🐱 เสียงแมวน้อยกล่อมนอน",
    content: "เจ้าแมวขนนุ่มขดตัวนอนข้าวกายคุณ พลางส่งเสียงครางเบาๆ 'เพอร์... เพอร์...' ความอบอุ่นจากแมวน้อยส่งผ่านแผ่ซ่านไปทั่วหัวใจ บอกให้คุณรู้ว่า ค่ำคืนนี้คุณปลอดภัย และมีเพื่อนที่รักคุณอยู่เคียงข้างเสมอ 🐾💤"
  },
  {
    title: "🎈 ลูกโป่งความฝันลอยสู่ห้วงอวกาศ",
    content: "บรรจุความรู้สึกหนักอึ้งในใจใส่ลงในลูกโป่งใสสีพาสเทล แล้วปล่อยให้มันลอยสูงขึ้นสู่ท้องฟ้า ผ่านดวงดาวนับพันดวง... ลูกโป่งลอยหายไปในความเงียบสงบ ทิ้งไว้เพียงหัวใจที่เบาสบายพร้อมนอนหลับฝันดี 🎈🌟"
  },
  {
    title: "🌸 สวนดอกไม้ยามค่ำคืนใต้แสงจันทร์",
    content: "กลีบดอกไม้สีหวานค่อยๆ หุบนอนใต้ละอองน้ำค้างยามค่ำคืน อากาศเย็นสบายและกลิ่นหอมอ่อนๆ อบอวลในบรรยากาศ ร่างกายของคุณกำลังได้รับการฟื้นฟู และจิตใจกำลังได้รับการเยียวยาอย่างอ่อนโยน 🌺🌙"
  },
  {
    title: "🕯️ เทียนหอมลาเวนเดอร์ผ่อนคลาย",
    content: "แสงเทียนเล็กรำไรส่องสว่างวูบวาบ พานำกลิ่นหอมอบอุ่นของลาเวนเดอร์กระจายทั่วห้อง ผ่อนคลายกล้ามเนื้อที่ตึงเครียด ผ่อนคลายความคิดที่สับสน ขอให้ค่ำคืนนี้เต็มไปด้วยความฝันอันแสนหวานและอบอุ่นใจน้า 🕯️💜"
  }
];

let currentStoryPage = 0;

function openBedtimeStoryModal() {
  // Randomize initial story page every time the user reads a book
  currentStoryPage = Math.floor(Math.random() * BEDTIME_STORIES.length);
  renderStoryBookPage();
  const modal = document.getElementById("bedtimeStoryModal");
  if (modal) modal.style.display = "flex";
  
  state.hp = Math.min(50, state.hp + 10);
  state.energy = Math.min(50, state.energy + 10);
  spawnVisualEffect("stat", "petSleepContainer", "📖 อ่านนิทาน +10 HP +10 ⚡");
  syncUI();
}

function closeBedtimeStoryModal() {
  const modal = document.getElementById("bedtimeStoryModal");
  if (modal) modal.style.display = "none";
}

function renderStoryBookPage() {
  const story = BEDTIME_STORIES[currentStoryPage];
  if (!story) return;
  
  const titleEl = document.getElementById("storyTitleHeader");
  const textEl = document.getElementById("storyTextBody");
  const counterEl = document.getElementById("storyPageCounter");
  
  if (titleEl) titleEl.innerText = story.title;
  if (textEl) textEl.innerText = story.content;
  if (counterEl) counterEl.innerText = `${currentStoryPage + 1} / ${BEDTIME_STORIES.length}`;
  
  const btnPrev = document.getElementById("btnPrevStoryPage");
  const btnNext = document.getElementById("btnNextStoryPage");
  
  if (btnPrev) btnPrev.style.opacity = currentStoryPage === 0 ? "0.4" : "1.0";
  if (btnNext) btnNext.style.opacity = currentStoryPage === BEDTIME_STORIES.length - 1 ? "0.4" : "1.0";
}

function prevStoryPage() {
  if (currentStoryPage > 0) {
    currentStoryPage--;
    renderStoryBookPage();
  }
}

function nextStoryPage() {
  if (currentStoryPage < BEDTIME_STORIES.length - 1) {
    currentStoryPage++;
    renderStoryBookPage();
  }
}

// Bedroom specific actions
function triggerBedAction(actName) {
  if (!checkLevelUnlock(1, "กิจกรรมในห้องนอน")) return;
  if (actName === 'อ่านหนังสือ') {
    openBedtimeStoryModal();
    return;
  }
  if (actName === 'ฟังเพลง') {
    openHealingMusic();
    return;
  }
  if (actName === 'นอน') {
    setPetPostureDirect('petSleepContainer', 'sleeping', 20, 55);
    state.energy = Math.min(50, state.energy + 15);
    state.hp = Math.min(50, state.hp + 5);
    spawnVisualEffect("stat", "petSleepContainer", "😴 นอนหลับพักผ่อน +15 ⚡");
    syncUI();
  }
}

function spawnTapHearts(e) {
  const container = document.getElementById("petHomeTap");
  if (!container) return;
  
  const rect = container.getBoundingClientRect();
  const x = e.clientX ? (e.clientX - rect.left) : (rect.width / 2);
  const y = e.clientY ? (e.clientY - rect.top) : (rect.height / 2);
  
  const heartEmojis = ["❤️", "💖", "💕", "🌸", "⭐", "✨", "🐻", "🧡"];
  
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("span");
    heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.position = "absolute";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${Math.random() * 12 + 16}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "100";
    heart.style.transition = "all 1s ease-out";
    heart.style.transform = "translate(-50%, -50%)";
    
    container.appendChild(heart);
    
    const angle = (Math.random() * Math.PI) - (Math.PI / 2);
    const distance = Math.random() * 60 + 50;
    const tx = Math.sin(angle) * distance;
    const ty = -Math.cos(angle) * distance - 30;
    
    setTimeout(() => {
      heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5)`;
      heart.style.opacity = "0";
    }, 20);
    
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

// Spawn dynamic visual animations in rooms
function spawnVisualEffect(effectType, containerId, extraData) {
  const petDisplay = document.getElementById(containerId);
  if (!petDisplay) return;
  const container = petDisplay.closest(".room-visual-area") || petDisplay.closest(".pet-character-area");
  if (!container) return;
  
  const petLeft = parseFloat(petDisplay.style.left) || 50;
  const petTop = parseFloat(petDisplay.style.top) || 60;
  
  if (effectType === "brush_teeth") {
    const brush = document.createElement("div");
    brush.className = "toothbrush-effect";
    brush.innerText = "🧼";
    brush.style.left = (petLeft - 12) + "%";
    brush.style.top = (petTop - 8) + "%";
    container.appendChild(brush);
    
    let count = 0;
    const interval = setInterval(() => {
      if (count++ > 15) { clearInterval(interval); return; }
      const bubble = document.createElement("div");
      bubble.className = "floating-particle";
      bubble.innerText = "🫧";
      bubble.style.left = (petLeft + (Math.random() * 16 - 8)) + "%";
      bubble.style.top = (petTop + (Math.random() * 8 - 4)) + "%";
      bubble.style.setProperty("--drift", (Math.random() * 30 - 15) + "px");
      container.appendChild(bubble);
      setTimeout(() => bubble.remove(), 1600);
    }, 120);
    
    setTimeout(() => brush.remove(), 2400);
  }
  
  else if (effectType === "bathing") {
    let count = 0;
    const interval = setInterval(() => {
      if (count++ > 25) { clearInterval(interval); return; }
      const drop = document.createElement("div");
      drop.className = "rain-particle";
      drop.innerText = Math.random() > 0.5 ? "💧" : "🫧";
      drop.style.left = (petLeft + (Math.random() * 26 - 13)) + "%";
      drop.style.top = (petTop - 25) + "%";
      container.appendChild(drop);
      setTimeout(() => drop.remove(), 1400);
    }, 80);
  }
  
  else if (effectType === "clean") {
    const sponge = document.createElement("div");
    sponge.className = "sponge-effect";
    sponge.innerText = "🧽";
    sponge.style.left = (petLeft - 10) + "%";
    sponge.style.top = (petTop - 5) + "%";
    container.appendChild(sponge);
    
    let count = 0;
    const interval = setInterval(() => {
      if (count++ > 12) { clearInterval(interval); return; }
      const sparkle = document.createElement("div");
      sparkle.className = "floating-particle";
      sparkle.innerText = "✨";
      sparkle.style.left = (petLeft + (Math.random() * 20 - 10)) + "%";
      sparkle.style.top = (petTop + (Math.random() * 16 - 8)) + "%";
      sparkle.style.setProperty("--drift", (Math.random() * 24 - 12) + "px");
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1600);
    }, 150);
    
    setTimeout(() => sponge.remove(), 2200);
  }
  
  else if (effectType === "feeding") {
    const food = document.createElement("div");
    food.className = "flying-food";
    food.innerText = extraData || "🥪";
    food.style.left = "50%";
    food.style.top = "90%";
    food.style.transform = "translate(-50%, -50%) scale(0.5)";
    container.appendChild(food);
    
    requestAnimationFrame(() => {
      food.style.left = petLeft + "%";
      food.style.top = (petTop - 2) + "%";
      food.style.transform = "translate(-50%, -50%) scale(1.2)";
    });
    
    setTimeout(() => {
      food.remove();
      for (let i = 0; i < 6; i++) {
        const heart = document.createElement("div");
        heart.className = "floating-particle";
        heart.innerText = Math.random() > 0.5 ? "❤️" : "😋";
        heart.style.left = petLeft + "%";
        heart.style.top = (petTop - 5) + "%";
        heart.style.setProperty("--drift", (Math.random() * 30 - 15) + "px");
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1600);
      }
    }, 850);
  }
  
  else if (effectType === "gardening") {
    const can = document.createElement("div");
    can.className = "watering-can-effect";
    can.innerText = "🚿";
    can.style.left = (petLeft + 12) + "%";
    can.style.top = (petTop - 20) + "%";
    container.appendChild(can);
    
    setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        if (count++ > 20) { clearInterval(interval); return; }
        const drop = document.createElement("div");
        drop.className = "rain-particle";
        drop.innerText = "💧";
        drop.style.left = (petLeft + (Math.random() * 16 - 22)) + "%";
        drop.style.top = (petTop - 10) + "%";
        container.appendChild(drop);
        setTimeout(() => drop.remove(), 1400);
      }, 70);
    }, 300);
    
    // Animate flower card items
    const cards = container.parentNode.querySelectorAll(".garden-item-card");
    cards.forEach(card => {
      card.style.transform = "scale(1.06)";
      card.style.borderColor = "var(--primary)";
      card.style.boxShadow = "0 0 10px rgba(167, 139, 250, 0.4)";
      setTimeout(() => {
        card.style.transform = "";
        card.style.borderColor = "";
        card.style.boxShadow = "";
      }, 1500);
    });
    
    setTimeout(() => can.remove(), 2000);
  }
  
  else if (effectType === "music") {
    let count = 0;
    const notes = ["🎵", "🎶", "🎼", "🎹"];
    const interval = setInterval(() => {
      if (count++ > 12) { clearInterval(interval); return; }
      const note = document.createElement("div");
      note.className = "floating-particle";
      note.innerText = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = (petLeft + (Math.random() * 20 - 10)) + "%";
      note.style.top = (petTop - 10) + "%";
      note.style.setProperty("--drift", (Math.random() * 40 - 20) + "px");
      container.appendChild(note);
      setTimeout(() => note.remove(), 1600);
    }, 200);
  }
  
  else if (effectType === "toys") {
    let count = 0;
    const items = ["🧸", "🎲", "🧱", "✨"];
    const interval = setInterval(() => {
      if (count++ > 10) { clearInterval(interval); return; }
      const item = document.createElement("div");
      item.className = "floating-particle";
      item.innerText = items[Math.floor(Math.random() * items.length)];
      item.style.left = (petLeft + (Math.random() * 20 - 10)) + "%";
      item.style.top = (petTop - 10) + "%";
      item.style.setProperty("--drift", (Math.random() * 30 - 15) + "px");
      container.appendChild(item);
      setTimeout(() => item.remove(), 1600);
    }, 220);
  }
  
  else if (effectType === "paint") {
    let count = 0;
    const items = ["🎨", "🖌️", "🌈", "✨"];
    const interval = setInterval(() => {
      if (count++ > 10) { clearInterval(interval); return; }
      const item = document.createElement("div");
      item.className = "floating-particle";
      item.innerText = items[Math.floor(Math.random() * items.length)];
      item.style.left = (petLeft + (Math.random() * 20 - 10)) + "%";
      item.style.top = (petTop - 10) + "%";
      item.style.setProperty("--drift", (Math.random() * 30 - 15) + "px");
      container.appendChild(item);
      setTimeout(() => item.remove(), 1600);
    }, 220);
  }
}

// 1. BALL SHOOTER GAME MECHANICS (Bubble Shooter Engine)
const BUBBLE_COLORS = [
  { color: "#ef4444", emoji: "😠", name: "โกรธ" },      // Red
  { color: "#f97316", emoji: "😟", name: "ว้าวุ่น" },    // Orange
  { color: "#eab308", emoji: "😊", name: "มีความสุข" }, // Yellow
  { color: "#22c55e", emoji: "🤢", name: "ขยะแขยง" },   // Green
  { color: "#3b82f6", emoji: "😭", name: "เศร้า" },     // Blue
  { color: "#a855f7", emoji: "😒", name: "หงุดหงิด" }   // Purple
];

let shooterScore = 0;
let isShooterGameRunning = false;
let shooterTimerId = null;
let shooterLoopId = null;
let shooterHighScore = 680;

let shooterGrid = [];
let currentShotBall = null;
let nextShotBall = null;
let shooterCellWidth = 40;
let shooterCellHeight = 40;
let shooterAngle = -Math.PI / 2;

function getBubbleCoords(r, c) {
  const offset = (r % 2 === 1) ? shooterCellWidth / 2 : 0;
  return {
    x: c * shooterCellWidth + shooterCellWidth / 2 + offset,
    y: r * shooterCellHeight + shooterCellHeight / 2
  };
}

function getNeighbors(r, c) {
  const neighbors = [];
  neighbors.push({ r: r, c: c - 1 });
  neighbors.push({ r: r, c: c + 1 });
  
  if (r % 2 === 0) {
    neighbors.push({ r: r - 1, c: c - 1 });
    neighbors.push({ r: r - 1, c: c });
    neighbors.push({ r: r + 1, c: c - 1 });
    neighbors.push({ r: r + 1, c: c });
  } else {
    neighbors.push({ r: r - 1, c: c });
    neighbors.push({ r: r - 1, c: c + 1 });
    neighbors.push({ r: r + 1, c: c });
    neighbors.push({ r: r + 1, c: c + 1 });
  }
  return neighbors;
}

function startBallShooterGame() {
  if (!checkLevelUnlock(15, "มินิเกมยิงอารมณ์บับเบิ้ล")) return;
  shooterScore = 0;
  shooterAngle = -Math.PI / 2;
  isShooterGameRunning = true;
  
  const gameArea = document.getElementById("ballShooterGameArea");
  if (!gameArea) return;
  gameArea.style.display = "flex";
  
  document.getElementById("shooterScoreVal").innerText = "0";
  
  const canvas = document.getElementById("shooterCanvas");
  const ctx = canvas.getContext("2d");
  
  // Set resolution to match the display size perfectly
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width || 320;
  canvas.height = rect.height || 400;
  
  shooterCellWidth = canvas.width / 8;
  shooterCellHeight = shooterCellWidth;
  
  // Initialize grid with 3 rows of bubbles
  shooterGrid = [];
  for (let r = 0; r < 8; r++) {
    const row = [];
    for (let c = 0; c < 8; c++) {
      if (r < 3) {
        if (r % 2 === 1 && c === 7) {
          row.push(null);
        } else {
          const rand = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
          row.push({ ...rand });
        }
      } else {
        row.push(null);
      }
    }
    shooterGrid.push(row);
  }
  
  // Setup launcher balls
  nextShotBall = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
  spawnNextShotBall(canvas);
  
  // Tracking mouse/touch angle for aiming line
  canvas.onmousemove = (e) => {
    const r = canvas.getBoundingClientRect();
    const clickX = e.clientX - r.left;
    const clickY = e.clientY - r.top;
    const startX = canvas.width / 2;
    const startY = canvas.height - 25;
    shooterAngle = Math.atan2(clickY - startY, clickX - startX);
  };
  
  canvas.ontouchmove = (e) => {
    if (e.touches && e.touches.length > 0) {
      const r = canvas.getBoundingClientRect();
      const clickX = e.touches[0].clientX - r.left;
      const clickY = e.touches[0].clientY - r.top;
      const startX = canvas.width / 2;
      const startY = canvas.height - 25;
      shooterAngle = Math.atan2(clickY - startY, clickX - startX);
    }
  };
  
  // Click to shoot (using aiming line angle)
  canvas.onclick = (e) => {
    if (!isShooterGameRunning || !currentShotBall || currentShotBall.isFlying) return;
    
    let angle = shooterAngle;
    if (angle > -0.15) angle = -0.15;
    if (angle < -Math.PI + 0.15) angle = -Math.PI + 0.15;
    
    const speed = 8;
    currentShotBall.vx = Math.cos(angle) * speed;
    currentShotBall.vy = Math.sin(angle) * speed;
    currentShotBall.isFlying = true;
  };
  
  // Touch end to shoot on mobile
  canvas.ontouchend = (e) => {
    e.preventDefault();
    if (!isShooterGameRunning || !currentShotBall || currentShotBall.isFlying) return;
    
    let angle = shooterAngle;
    if (angle > -0.15) angle = -0.15;
    if (angle < -Math.PI + 0.15) angle = -Math.PI + 0.15;
    
    const speed = 8;
    currentShotBall.vx = Math.cos(angle) * speed;
    currentShotBall.vy = Math.sin(angle) * speed;
    currentShotBall.isFlying = true;
  };
  
  // Start canvas loop
  if (shooterLoopId) cancelAnimationFrame(shooterLoopId);
  runShooterLoop(canvas, ctx);
}

function spawnNextShotBall(canvas) {
  currentShotBall = {
    x: canvas.width / 2,
    y: canvas.height - 25,
    vx: 0,
    vy: 0,
    r: shooterCellWidth / 2 - 2,
    color: nextShotBall.color,
    emoji: nextShotBall.emoji,
    name: nextShotBall.name,
    isFlying: false
  };
  nextShotBall = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
}

function runShooterLoop(canvas, ctx) {
  if (!isShooterGameRunning) return;
  
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw dark playfield background matching the screenshot
  ctx.fillStyle = "#090a0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw deadline warning line (red dashed)
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.moveTo(0, 290);
  ctx.lineTo(canvas.width, 290);
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.setLineDash([]);
  
  // Draw deadline label text
  ctx.fillStyle = "#ef4444";
  ctx.font = "bold 9px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("DEADLINE ⚠️", canvas.width - 10, 282);
  
  // Update flying ball
  if (currentShotBall && currentShotBall.isFlying) {
    currentShotBall.x += currentShotBall.vx;
    currentShotBall.y += currentShotBall.vy;
    
    // Wall bounce
    if (currentShotBall.x - currentShotBall.r <= 0) {
      currentShotBall.x = currentShotBall.r;
      currentShotBall.vx *= -1;
    }
    if (currentShotBall.x + currentShotBall.r >= canvas.width) {
      currentShotBall.x = canvas.width - currentShotBall.r;
      currentShotBall.vx *= -1;
    }
    
    // Collision detection with grid items
    let collided = false;
    let hitRow = 0;
    let hitCol = 0;
    
    if (currentShotBall.y - currentShotBall.r <= 0) {
      collided = true;
      hitRow = 0;
      hitCol = Math.min(7, Math.max(0, Math.floor(currentShotBall.x / shooterCellWidth)));
    } else {
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const item = shooterGrid[r][c];
          if (item) {
            const coords = getBubbleCoords(r, c);
            const dist = Math.hypot(currentShotBall.x - coords.x, currentShotBall.y - coords.y);
            if (dist < currentShotBall.r + shooterCellWidth / 2 - 2) {
              collided = true;
              
              // Find closest empty neighbor slot
              const emptySlots = [];
              const neighbors = getNeighbors(r, c);
              neighbors.forEach(n => {
                if (n.r >= 0 && n.r < 8 && n.c >= 0 && n.c < 8 && !shooterGrid[n.r][n.c]) {
                  if (n.r % 2 === 1 && n.c === 7) return; // boundary constraint
                  const ecoords = getBubbleCoords(n.r, n.c);
                  emptySlots.push({ r: n.r, c: n.c, dist: Math.hypot(currentShotBall.x - ecoords.x, currentShotBall.y - ecoords.y) });
                }
              });
              if (emptySlots.length > 0) {
                emptySlots.sort((a, b) => a.dist - b.dist);
                hitRow = emptySlots[0].r;
                hitCol = emptySlots[0].c;
              } else {
                hitRow = r;
                hitCol = c;
              }
              break;
            }
          }
        }
        if (collided) break;
      }
    }
    
    if (collided) {
      // Snap to grid
      shooterGrid[hitRow][hitCol] = {
        color: currentShotBall.color,
        emoji: currentShotBall.emoji,
        name: currentShotBall.name
      };
      
      const shotColor = currentShotBall.color;
      
      // Match-3 check
      checkBubbleShooterMatches(hitRow, hitCol, shotColor);
      
      // Check if grid crossed deadline after snapping
      let crossed = false;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (shooterGrid[r][c]) {
            const coords = getBubbleCoords(r, c);
            if (coords.y >= 290) crossed = true;
          }
        }
      }
      if (crossed) {
        stopBallShooterGame(true);
        return;
      }
      
      // Load next ball
      spawnNextShotBall(canvas);
    }
  }
  
  // Draw ceiling grid bubbles (staggered)
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const bubble = shooterGrid[r][c];
      if (bubble) {
        const coords = getBubbleCoords(r, c);
        const br = shooterCellWidth / 2 - 2;
        
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, br, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw emoji (full face 1.45x size)
        ctx.fillStyle = "#fff";
        ctx.font = `${br * 1.45}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(bubble.emoji, coords.x, coords.y + 0.5);
      }
    }
  }
  
  // Draw dashed aiming line
  if (currentShotBall && !currentShotBall.isFlying) {
    let angle = shooterAngle;
    if (angle > -0.15) angle = -0.15;
    if (angle < -Math.PI + 0.15) angle = -Math.PI + 0.15;
    
    ctx.beginPath();
    ctx.setLineDash([4, 6]);
    ctx.moveTo(canvas.width / 2, canvas.height - 25);
    ctx.lineTo(canvas.width / 2 + Math.cos(angle) * 120, canvas.height - 25 + Math.sin(angle) * 120);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
  }
  
  // Draw Next ball preview (bottom left)
  if (nextShotBall) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("ถัดไป:", 15, canvas.height - 18);
    
    // Draw next emoji bubble
    const px = 50;
    const py = canvas.height - 21;
    const pr = 11;
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fillStyle = nextShotBall.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = "#fff";
    ctx.font = `${pr * 1.45}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(nextShotBall.emoji, px, py + 0.5);
  }
  
  // Draw Cannon base / preview ball
  if (currentShotBall) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height, 28, Math.PI, 0);
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw current bubble to shoot
    ctx.beginPath();
    ctx.arc(currentShotBall.x, currentShotBall.y, currentShotBall.r, 0, Math.PI * 2);
    ctx.fillStyle = currentShotBall.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.fillStyle = "#fff";
    ctx.font = `${currentShotBall.r * 1.45}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentShotBall.emoji, currentShotBall.x, currentShotBall.y + 0.5);
  }
  
  shooterLoopId = requestAnimationFrame(() => runShooterLoop(canvas, ctx));
}

// 2. COLORING / DRAWING BOOK MECHANICS (Drawing behind lines, 6 panel select, free color pick)
let coloringMode = "easy"; // easy or hard
let coloringPanelIndex = 0; // 0 to 5
let colorDrawColor = "#ef4444";
let colorDrawWidth = 6;
let coloringCanvasContext = null;
let coloringTemplateContext = null;

let isColoringDrawing = false;
let colorLastX = 0;
let colorLastY = 0;

function startColoringGame() {
  if (!checkLevelUnlock(10, "มินิเกมระบายสีบำบัดจิตใจ")) return;
  nav("screen-15");
  const gameArea = document.getElementById("coloringGameArea");
  if (gameArea) gameArea.style.display = "flex";
  
  // Set default mode and default panel
  coloringPanelIndex = 0;
  setColoringMode("easy");
}

function setColoringMode(mode) {
  coloringMode = mode;
  const btnEasy = document.getElementById("btnEasyMode");
  const btnHard = document.getElementById("btnHardMode");
  
  if (mode === "easy") {
    btnEasy.classList.add("active");
    btnHard.classList.remove("active");
  } else {
    btnHard.classList.add("active");
    btnEasy.classList.remove("active");
  }
  
  // Reset panel selector active styling
  selectColoringPanel(0);
}

function selectColoringPanel(index) {
  coloringPanelIndex = index;
  
  // Update panel button styling in DOM
  const selectorDiv = document.getElementById("coloringPanelSelector");
  if (selectorDiv) {
    const buttons = selectorDiv.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    const targetIdx = index === -1 ? 6 : index;
    if (buttons[targetIdx]) {
      buttons[targetIdx].classList.add("active");
    }
  }
  
  // Set up canvases
  const canvas = document.getElementById("coloringCanvas");
  const tCanvas = document.getElementById("templateCanvas");
  if (!canvas || !tCanvas) return;
  
  coloringCanvasContext = canvas.getContext("2d");
  coloringTemplateContext = tCanvas.getContext("2d");
  
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  tCanvas.width = tCanvas.clientWidth;
  tCanvas.height = tCanvas.clientHeight;
  
  // Clear bottom drawing canvas to plain white
  coloringCanvasContext.fillStyle = "#ffffff";
  coloringCanvasContext.fillRect(0, 0, canvas.width, canvas.height);
  
  // Clear top template canvas
  coloringTemplateContext.clearRect(0, 0, tCanvas.width, tCanvas.height);
  
  if (index === -1) {
    // Re-bind listeners for drawing
    initColoringCanvas();
    return;
  }
  
  // Load original JPG templates (contains the 3x2 grid of panels)
  const imgObj = new Image();
  imgObj.src = coloringMode === "easy" ? "assets/easy_coloring.jpg" : "assets/hard_coloring.jpg";
  imgObj.onload = () => {
    // Crop coordinates for the selected panel (3 columns, 2 rows)
    const sWidth = imgObj.naturalWidth / 3;
    const sHeight = imgObj.naturalHeight / 2;
    
    const col = index % 3;
    const row = Math.floor(index / 3);
    
    const sx = col * sWidth;
    const sy = row * sHeight;
    
    // Calculate letterbox scaling to maintain aspect ratio
    const canvasRatio = tCanvas.width / tCanvas.height;
    const panelRatio = sWidth / sHeight;
    
    let dx = 0, dy = 0, dWidth = tCanvas.width, dHeight = tCanvas.height;
    if (panelRatio > canvasRatio) {
      dHeight = tCanvas.width / panelRatio;
      dy = (tCanvas.height - dHeight) / 2;
    } else {
      dWidth = tCanvas.height * panelRatio;
      dx = (tCanvas.width - dWidth) / 2;
    }
    
    // Draw the cropped panel onto the top template canvas maintaining aspect ratio
    coloringTemplateContext.drawImage(imgObj, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  };
  
  // Re-bind listeners for drawing
  initColoringCanvas();
}

function initColoringCanvas() {
  const canvas = document.getElementById("coloringCanvas");
  if (!canvas) return;
  
  coloringCanvasContext.lineCap = "round";
  coloringCanvasContext.lineJoin = "round";
  
  const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };
  
  const startDraw = (e) => {
    isColoringDrawing = true;
    const pos = getPos(e);
    colorLastX = pos.x;
    colorLastY = pos.y;
  };
  
  const draw = (e) => {
    if (!isColoringDrawing) return;
    e.preventDefault();
    const pos = getPos(e);
    
    coloringCanvasContext.beginPath();
    if (colorDrawColor === "eraser") {
      coloringCanvasContext.strokeStyle = "#ffffff";
      coloringCanvasContext.lineWidth = colorDrawWidth * 2.5;
    } else {
      coloringCanvasContext.strokeStyle = colorDrawColor;
      coloringCanvasContext.lineWidth = colorDrawWidth;
    }
    
    coloringCanvasContext.moveTo(colorLastX, colorLastY);
    coloringCanvasContext.lineTo(pos.x, pos.y);
    coloringCanvasContext.stroke();
    
    colorLastX = pos.x;
    colorLastY = pos.y;
  };
  
  const stopDraw = () => {
    isColoringDrawing = false;
  };
  
  // Bind listeners to the bottom canvas
  canvas.onmousedown = startDraw;
  canvas.onmousemove = draw;
  canvas.onmouseup = stopDraw;
  canvas.onmouseleave = stopDraw;
  
  canvas.ontouchstart = startDraw;
  canvas.ontouchmove = draw;
  canvas.ontouchend = stopDraw;
}

function changeDrawColor(color, element) {
  colorDrawColor = color;
  
  // Highlight active palette item
  document.querySelectorAll(".color-swatch").forEach(swatch => {
    swatch.classList.remove("active");
  });
  if (element && element.classList.contains("color-swatch")) {
    element.classList.add("active");
  }
}

function changeDrawWidth(width) {
  colorDrawWidth = parseInt(width);
}

function clearColoringCanvas() {
  if (coloringCanvasContext) {
    const canvas = document.getElementById("coloringCanvas");
    // Clear bottom canvas to solid white
    coloringCanvasContext.fillStyle = "#ffffff";
    coloringCanvasContext.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function saveColoringBook() {
  state.coins += 50;
  syncUI();
  alert("💾 บันทึกผลงานการระบายสีเรียบร้อยแล้ว! ได้รับรางวัลระบายสีบำบัดจิตใจ +50 เหรียญทอง 🪙");
  closeColoringBook();
}

function closeColoringBook() {
  const gameArea = document.getElementById("coloringGameArea");
  if (gameArea) gameArea.style.display = "none";
  
  // Reset zoom style when exiting
  const container = document.getElementById("coloringContainer");
  if (container) {
    container.style.height = "260px";
    container.classList.remove("zoomed");
  }
  const zoomBtn = document.getElementById("btnColoringZoom");
  if (zoomBtn) zoomBtn.innerText = "🔍 ขยายรูป";
  
  // Return to mini games
  nav("screen-15");
}

function toggleColoringZoom() {
  const container = document.getElementById("coloringContainer");
  if (!container) return;
  
  const canvas = document.getElementById("coloringCanvas");
  // Save current strokes to a temporary canvas before resizing
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(canvas, 0, 0);
  
  const isZoomed = container.classList.toggle("zoomed");
  const zoomBtn = document.getElementById("btnColoringZoom");
  if (zoomBtn) {
    zoomBtn.innerText = isZoomed ? "🔍 ย่อรูป" : "🔍 ซูม x2";
  }
  
  // Set new container height (2x zoom)
  container.style.height = isZoomed ? "520px" : "260px";
  
  // Re-initialize/crop template outline at the new size
  selectColoringPanel(coloringPanelIndex);
  
  // Restore user strokes back onto the resized canvas
  setTimeout(() => {
    if (coloringCanvasContext) {
      coloringCanvasContext.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);
    }
  }, 100);
}




// 3. REVEAL CARD & EMOTION REFLECT MECHANICS
let currentRevealCardIdx = -1;
let revealedCardsState = [false, false, false, false];

function startRevealEmotionGame() {
  currentRevealCardIdx = -1;
  revealedCardsState = [false, false, false, false];
  
  const gameArea = document.getElementById("revealEmotionGameArea");
  if (!gameArea) return;
  gameArea.style.display = "flex";
  
  // Reset card flips visually
  for (let i = 0; i < 4; i++) {
    const card = document.getElementById(`revealCardInner-${i}`);
    if (card) card.classList.remove("flipped");
  }
  
  const modal = document.getElementById("emotionReflectModal");
  if (modal) modal.style.display = "none";
}

function clickRevealCard(cardIdx) {
  if (revealedCardsState[cardIdx]) {
    alert("การ์ดใบนี้ได้รับการสะท้อนอารมณ์ไปเรียบร้อยแล้วค่ะ! เลือกเปิดใบอื่นน้า 🃏");
    return;
  }
  
  currentRevealCardIdx = cardIdx;
  
  // Flip card in CSS
  const cardInner = document.getElementById(`revealCardInner-${cardIdx}`);
  if (cardInner) {
    cardInner.classList.add("flipped");
  }
  
  // Show emotion selector popup modal after a slight delay
  setTimeout(() => {
    const modal = document.getElementById("emotionReflectModal");
    if (modal) modal.style.display = "flex";
  }, 700);
}

function selectCardEmotion(emotionName) {
  if (currentRevealCardIdx === -1) return;
  
  // Mark card as completed
  revealedCardsState[currentRevealCardIdx] = true;
  
  // Close popup modal
  const modal = document.getElementById("emotionReflectModal");
  if (modal) modal.style.display = "none";
  
  // Award coins
  state.coins += 50;
  syncUI();
  
  alert(`✨ สะท้อนอารมณ์สำเร็จ! คุณอธิบายความรู้สึกหลังจากดูรูปว่า "${emotionName}" เป็นการฝึกเช็คระดับอารมณ์ตนเองที่ดีมากค่ะ ได้รับรางวัล +50 เหรียญทอง 🪙`);
  
  // Check if all cards are completed
  const allCompleted = revealedCardsState.every(c => c === true);
  if (allCompleted) {
    setTimeout(() => {
      alert("🎉 ยินดีด้วย! คุณเปิดการ์ดสะท้อนอารมณ์และสำรวจจิตใจจนครบถ้วนทั้ง 4 ใบแล้วในวันนี้ ขอให้มีความสุขนะคะ!");
      closeRevealEmotionGame();
    }, 1500);
  }
}

function closeRevealEmotionGame() {
  const gameArea = document.getElementById("revealEmotionGameArea");
  if (gameArea) gameArea.style.display = "none";
  
  const modal = document.getElementById("emotionReflectModal");
  if (modal) modal.style.display = "none";
}

function switchProfileTab(tabName) {
  const el = document.getElementById("profileTabInfo");
  if (el) el.style.display = "block";
  
  if (typeof renderDynamicPets === "function") {
    renderDynamicPets();
  }
}

function checkBubbleShooterMatches(startR, startC, targetColor) {
  const matches = [[startR, startC]];
  const visited = {};
  visited[`${startR},${startC}`] = true;
  let head = 0;
  
  while (head < matches.length) {
    const curr = matches[head++];
    if (!curr) break;
    const [r, c] = curr;
    
    const neighbors = getNeighbors(r, c);
    neighbors.forEach(n => {
      if (n.r >= 0 && n.r < 8 && n.c >= 0 && n.c < 8) {
        if (n.r % 2 === 1 && n.c === 7) return;
        const neighbor = shooterGrid[n.r][n.c];
        const key = `${n.r},${n.c}`;
        if (neighbor && neighbor.color === targetColor && !visited[key]) {
          visited[key] = true;
          matches.push([n.r, n.c]);
        }
      }
    });
  }
  
  if (matches.length >= 3) {
    // Pop them!
    matches.forEach(([r, c]) => {
      shooterGrid[r][c] = null;
    });
    shooterScore += matches.length * 30;
    document.getElementById("shooterScoreVal").innerText = shooterScore;
    
    // Remove detached orphan bubbles
    dropOrphanBubbles();
  }
}

function dropOrphanBubbles() {
  const visited = {};
  const queue = [];
  
  // Ceiling roots
  for (let c = 0; c < 8; c++) {
    if (shooterGrid[0][c]) {
      queue.push([0, c]);
      visited[`0,${c}`] = true;
    }
  }
  
  let head = 0;
  while (head < queue.length) {
    const [r, c] = queue[head++];
    const neighbors = getNeighbors(r, c);
    neighbors.forEach(n => {
      if (n.r >= 0 && n.r < 8 && n.c >= 0 && n.c < 8) {
        if (n.r % 2 === 1 && n.c === 7) return;
        const neighbor = shooterGrid[n.r][n.c];
        const key = `${n.r},${n.c}`;
        if (neighbor && !visited[key]) {
          visited[key] = true;
          queue.push([n.r, n.c]);
        }
      }
    });
  }
  
  // Drop orphans
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (shooterGrid[r][c] && !visited[`${r},${c}`]) {
        shooterGrid[r][c] = null;
        shooterScore += 15; // bonus points for dropping
      }
    }
  }
  document.getElementById("shooterScoreVal").innerText = shooterScore;
}

function stopBallShooterGame(completed = true) {
  isShooterGameRunning = false;
  if (shooterLoopId) cancelAnimationFrame(shooterLoopId);
  
  const gameArea = document.getElementById("ballShooterGameArea");
  if (gameArea) gameArea.style.display = "none";
  
  if (completed) {
    const coinsEarned = Math.min(200, Math.floor(shooterScore / 2));
    state.coins += coinsEarned;
    
    if (shooterScore > shooterHighScore) {
      shooterHighScore = shooterScore;
      document.getElementById("highScoreShooter").innerText = `คะแนนสูงสุด: ${shooterHighScore.toLocaleString()}`;
    }
    
    syncUI();
    alert(`🎉 เล่นจบแล้ว! คุณเคลียร์ลูกบอลอารมณ์ได้ ${shooterScore} คะแนน ได้รับรางวัล +${coinsEarned} เหรียญทอง 🪙`);
  } else {
    alert("ออกจากการเล่นเกมยิงลูกบอลแล้วค่ะ");
  }
}


// 2. COLORING / DRAWING BOOK MECHANICS (Drawing behind lines, 6 panel select, free color pick)
const MOOD_QUESTS_TEMPLATES = {
  Happy: [
    { key: "mood", title: "บันทึกเรื่องราวดีๆ และความสุขประจำวัน 😊", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "บันทึกความรู้สึกมีความสุขของคุณลงในหน้าไดอารี่วันนี้ เพื่อเก็บรักษาช่วงเวลาที่สดใสไว้ในหัวใจค่ะ" },
    { key: "gratitude", title: "เขียนขอบคุณสิ่งดีๆ วันนี้ 3 อย่าง 🌟", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "ใช้เวลา 2 นาทีเขียนขอบคุณสิ่งดีๆ หรือเหตุการณ์เล็กๆ น้อยๆ ที่เกิดขึ้นวันนี้ 3 อย่าง ลงบนกระดาษหรือสมุดบันทึกเพื่อเพิ่มความรู้สึกตื้นตันใจ" },
    { key: "smile", title: "แบ่งปันรอยยิ้มหรือคำพูดดีๆ ให้คนอื่น 😊", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ส่งต่อพลังบวกโดยการมอบรอยยิ้มอย่างจริงใจหรือพูดขอบคุณด้วยคำที่ไพเราะให้แก่คนรอบตัวคุณในวันนี้ 1 ครั้ง" },
    { key: "reflect", title: "หลับตานิ่งๆ ทบทวนความทรงจำแสนสุข 💭", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "หลับตาพักสติ 1 นาที นึกถึงเหตุการณ์แสนอบอุ่นในอดีตหรือวันนี้ที่นึกถึงทีไรก็ทำให้คุณแอบยิ้มและขำออกมาคนเดียวได้เสมอ" },
    { key: "reward", title: "ให้ของขวัญหรือรางวัลเล็กๆ แก่ตัวเอง 🎁", target: 1, rewardCoins: 40, rewardExp: 20, instruction: "มอบความรักให้ตัวเองในฐานะคนเก่งในวันนี้ เช่น ดื่มเครื่องดื่มแก้วโปรด ฟังเพลงที่ชอบ หรือให้เวลาผ่อนคลายทำสิ่งที่ตนรัก" }
  ],
  Calm: [
    { key: "mood", title: "บันทึกช่วงเวลาที่สงบผ่อนคลายลงไดอารี่ 😌", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ทบทวนและบันทึกความสงบสุขสบายกายสบายใจที่สัมผัสได้ในวันนี้ลงบนหน้าไดอารี่ค่ะ" },
    { key: "breathe", title: "ฝึกหายใจช้าเข้า 4 วิ ออก 6 วิ 10 ครั้ง 🧘", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "นั่งหลังตรง ผ่อนคลายหัวไหล่ วางมือไว้บนตัก สูดลมหายใจเข้าช้าๆ 4 วินาที และพรูลมหายใจออกยาวๆ ทางปาก 6 วินาที ทำติดต่อกัน 10 รอบอย่างจดจ่อ" },
    { key: "tea", title: "จิบเครื่องดื่มอุ่นช้าๆ อย่างมีสติ 🥛", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ชงนมอุ่นหรือชาสมุนไพรอุ่นๆ ค่อยๆ ประคองแก้วแล้วสูดดมกลิ่นหอม ก่อนจะค่อยๆ จิบทีละนิดอย่างจดจ่อช้าๆ เพื่อผ่อนคลาย" },
    { key: "stretch", title: "ยืดเหยียดกายคลายความเกร็งคอไหล่ 🚶", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "ยืดกล้ามเนื้อช่วงไหล่ คอ และแผ่นหลังช้าๆ โดยยืดค้างไว้ท่าละ 15 วินาที เพื่อปลดปล่อยความตึงเกร็งทางกายที่สะสมมาทั้งวัน" },
    { key: "silence", title: "นั่งนิ่งเงียบไร้จอมือถือ 5 นาที 🤫", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "วางมือถือ ปิดหน้าจอ นั่งอยู่เงียบๆ กับตัวเอง 5 นาที หลับตาเบาๆ รับรู้ถึงเสียงรอบตัวและเสียงลมหายใจของตนเองเพื่อคืนความสงบ" }
  ],
  Shocked: [
    { key: "mood", title: "เขียนระบายเรื่องตื่นเต้นตกใจลงไดอารี่ 😳", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนเรื่องราวชวนตื่นตระหนกที่พบเจอวันนี้ เพื่อช่วยเรียบเรียงระดับสติและความคิดในสมองค่ะ" },
    { key: "slow_breathe", title: "สูดหายใจเข้าลึกพรูลมออกยาว 5 ครั้ง 🌬️", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "สูดลมหายใจเข้าลึกๆ กักลมหายใจไว้ในอก 3 วินาที จากนั้นค่อยๆ เป่าลมอุ่นๆ ออกทางปากยาวๆ ทำซ้ำ 5 ครั้งเพื่อดึงอัตราชีพจรให้กลับมาสงบนิ่ง" },
    { key: "grounding", title: "สังเกตระบุสิ่งของสีน้ำเงินรอบตัว 3 อย่าง 🛋️", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "เรียกสติกลับคืนสู่ปัจจุบันโดยการกวาดสายตามองไปรอบๆ และระบุสิ่งของที่มีโทนสีน้ำเงินมา 3 ชิ้นอย่างช้าๆ" },
    { key: "write_down", title: "จดรายละเอียดความจริงของเรื่องที่ตกใจ ✍️", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เขียนข้อเท็จจริงของเหตุการณ์ตื่นเต้นที่เกิดขึ้นลงบนกระดาษสั้นๆ เพื่อแยกแยะสิ่งที่เกิดขึ้นจริงออกความวิตกกังวลในจินตนาการ" },
    { key: "sip_water", title: "จิบน้ำเย็นจัด 1 แก้วกระตุ้นประสาท 🥤", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "ดื่มน้ำเปล่าเย็นจัด 1 แก้วใหญ่ ค่อยๆ กลืนและสัมผัสความเย็นไหลลงผ่านลำคอเพื่อกระตุ้นระบบประสาทสมดุลให้ร่างกายตื่นตัวและผ่อนคลาย" }
  ],
  Frustrated: [
    { key: "mood", title: "เขียนระบายสิ่งกวนใจหงุดหงิดลงไดอารี่ 😒", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ระบายความขัดเคือง หงุดหงิดใจที่สะสมไว้ลงในไดอารี่ให้ดวงดาวหอบพาความหมองมัวออกไปค่ะ" },
    { key: "rip_paper", title: "เขียนเรื่องน่าหงุดหงิดใส่กระดาษแล้วฉีกทิ้ง 📄", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "เขียนระบายเรื่องหรือชื่อสิ่งที่ทำให้คุณหงุดหงิดลงบนเศษกระดาษ ขีดเขียนให้เต็มที่ จากนั้นขยำหรือฉีกมันออกเป็นชิ้นเล็กชิ้นน้อยแล้วขว้างทิ้งลงถังขยะ" },
    { key: "screen_break", title: "ละสายตาจากจอมือถือไปเดินเล่น 5 นาที 🚶", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "วางมือถือและละจากคอมพิวเตอร์ ยืนขึ้นและเดินไปรับลมที่ระเบียงหรือดูแมกไม้ภายนอก 5 นาทีเพื่อเปลี่ยนสภาวะทางอารมณ์" },
    { key: "neck_stretch", title: "หมุนคอช้าๆ ยักไหล่ผ่อนคลายเส้นเอ็น 🧘", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "หมุนหัวคออย่างช้าๆ ซ้ายและขวาทิศทางละ 5 รอบ ยักไหล่ขึ้นค้างไว้ 3 วินาทีแล้วปล่อยลง ทำ 10 ครั้ง เพื่อคลายลมและเส้นเอ็นตึงเครียด" },
    { key: "positives", title: "เขียนสิ่งเล็กๆ ที่ทำได้ดีวันนี้ 3 อย่าง 💭", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "เขียนสิ่งเล็กๆ ในวันนี้ที่คุณทำสำเร็จหรือรู้สึกว่ายังดำเนินไปได้ราบรื่น 3 ข้อลงในบันทึกส่วนตัวเพื่อปรับมุมมองใหม่" }
  ],
  Angry: [
    { key: "mood", title: "เขียนระบายปลดปล่อยความโกรธลงไดอารี่ 😡", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ปลดปล่อยระบายความโกรธแค้น คับข้องใจผ่านตัวหนังสือลงในไดอารี่เพื่อลดความอัดอั้นในจิตใจค่ะ" },
    { key: "trash_angry", title: "เขียนสิ่งที่โกรธลงกระดาษขยำแน่นๆ ขว้างทิ้ง ✍️", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "เขียนสิ่งที่ทำให้อารมณ์เดือดพล่านลงกระดาษ ขยำขยี้มันด้วยแรงทั้งหมดให้แน่นที่สุด แล้วปาทิ้งลงถังขยะอย่างไม่ต้องใยดี" },
    { key: "analyze_cause", title: "นั่งสงบนิ่งหลับตาทบทวนสาเหตุโกรธ 💭", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "หาสถานที่สงบเงียบนั่งลง หลับตา หายใจลึกๆ นึกย้อนทบทวนอย่างมีเหตุผลว่าทำไมเราถึงรู้สึกโกรธขนาดนี้ และมีทางเลือกใดบ้างที่ดีต่อเรา" },
    { key: "count_ten", title: "หยุดการพูดจา สูดหายใจยาวนับ 1 ถึง 10 🧘", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "เมื่อความโกรธแล่นขึ้นสูง ให้ปิดปากสนิท สูดหายใจเข้าลึกพรูออกยาว และนับ 1 ถึง 10 ในใจช้าๆ ก่อนจะกระทำการหรือพูดจาใดๆ" },
    { key: "cold_water", title: "ล้างหน้าล้างมือด้วยน้ำเย็นดับหัวร้อน 💦", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "เดินไปที่อ่างล้างหน้า วิดน้ำเย็นจัดใส่ใบหน้า ล้างข้อศอกและมือ สัมผัสความเย็นเยียบเพื่อรีเซ็ตอุณหภูมิร่างกายและดับความใจร้อนรุ่ม" }
  ],
  Tired: [
    { key: "mood", title: "บันทึกความรู้สึกเหนื่อยล้าลงไดอารี่ 🥱", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนบันทึกความอ่อนล้าทางร่างกายหรือภาระจิตใจที่ผ่านพ้นมาในวันนี้ลงในไดอารี่ค่ะ" },
    { key: "ten_rest", title: "เอนกายหลับตาพักในความเงียบ 10 นาที 😴", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "หาเตียงนอนหรือโซฟา เอนหลัง หลับตา ผ่อนลมหายใจ และปิดกั้นเสียงภายนอกเป็นเวลา 10 นาทีเพื่อฟื้นคืนประจุพลังในร่างกาย" },
    { key: "warm_shower", title: "อาบน้ำอุ่นชำระร่างกายผ่อนคลายกล้ามเนื้อ 🛁", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "ชำระร่างกายด้วยน้ำอุ่น ปล่อยให้น้ำไหลผ่านแผ่นหลัง บ่า ไหล่ เพื่อกระตุ้นการไหลเวียนโลหิตและผ่อนคลายกล้ามเนื้อตึงล้า" },
    { key: "hydrate", title: "ดื่มน้ำสะอาดแก้วใหญ่หรือนมอุ่น 1 แก้ว 🥛", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ค่อยๆ ดื่มน้ำสะอาดหรือนมสดอุ่นๆ เพื่อปรับสมดุลแร่ธาตุและระดับความดันในร่างกาย คืนความสดชื่นกระปรี้กระเปร่า" },
    { key: "gentle_stretch", title: "ยืดเหยียดเบาๆ บนฟูกนอน 🧘", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "บิดตัวและยืดกล้ามเนื้อขา สะโพก และหลังส่วนล่างช้าๆ บนที่นอน เพื่อบรรเทาความปวดเมื่อยล้าสะสมจากการนั่งทำงาน" }
  ],
  Sad: [
    { key: "mood", title: "กอดตัวเองและเขียนระบายเรื่องเศร้าลงไดอารี่ 😢", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนบอกเล่าเรื่องราวน้อยใจและเศร้าใจที่ทำให้น้ำตาซึมวันนี้ลงในไดอารี่ เพื่อแบ่งเบาภาระในจิตใจค่ะ" },
    { key: "wrap_blanket", title: "นอนซุกใต้ผ้าห่มหนานุ่มห่อหุ้มความรู้สึก 🛌", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "กอดหมอนข้างหรือตุ๊กตา ซุกกายใต้ผ้าห่มผืนหนานุ่มสัมผัสความอุ่นสบาย สร้างขอบเขตปลอดภัยอันแสนอบอุ่นเพื่อปลอบโยนจิตใจ" },
    { key: "warm_hug", title: "โอบกอดตัวเองลูบไหล่ส่งกำลังใจ 🧎", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "ยกแขนทั้งสองไขว้โอบกอดแผ่นหลังหรือไหล่ตัวเอง ค่อยๆ กอดกระชับและบอกตัวเองเบาๆ ว่า 'ฉันเก่งมากแล้วที่ผ่านพ้นวันนี้มาได้'" },
    { key: "tears_allow", title: "อนุญาตให้น้ำตาไหลออกโดยไม่ตัดสิน 💧", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ปล่อยให้ตัวเองได้ร้องไห้ออมมาอย่างไม่ต้องอาย สูดหายใจลึกๆ และยอมรับความเศร้าอย่างเข้าใจว่านี่เป็นกระบวนการล้างแผลใจตามธรรมชาติ" },
    { key: "comfort_words", title: "เขียนการ์ดหรือคำปลอบโยนให้ตัวเอง ✍️", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เขียนประโยคให้กำลังใจตัวเอง เช่น 'พรุ่งนี้จะดีขึ้นนะ' หรือ 'ฉันภูมิใจในตัวเธอ' ลงบนการ์ดใบเล็กและพกติดตัวไว้" }
  ],
  Restless: [
    { key: "mood", title: "ระบายความฟุ้งซ่านว้าวุ่นจิตใจลงในไดอารี่ 🌀", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ระบายความว้าวุ่น สับสน ฟุ้งซ่านในสมองที่พะวงไปรอบๆ ลงสู่ไดอารี่เพื่อคืนความสงบสู่สติค่ะ" },
    { key: "mindful_breathing", title: "เพ่งสมาธิจดจ่อลมหายใจที่ปลายจมูก 🧘", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "หลับตา วางสติไว้ที่ช่องจมูก หายใจเข้าและหายใจออกอย่างรับรู้ สังเกตสัมผัสของลมโดยไม่คิดเรื่องอื่น หากใจลอย ให้ค่อยๆ ดึงกลับมาทำต่อ 2 นาที" },
    { key: "tidy_space", title: "จัดระเบียบสิ่งของบนโต๊ะ 3 นาที 🧹", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "จัดระเบียบของชิ้นเล็กๆ บนโต๊ะทำงาน พับผ้าห่ม หรือกวาดห้องเล็กน้อยเพื่อฝึกการทำงานประสานของกายและใจช่วยสร้างสมาธิ" },
    { key: "write_steps", title: "จดลิสต์สิ่งที่ต้องทำเรียงลำดับในสมอง ✍️", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เขียนความฟุ้งซ่านในสมองแยกแยะออกมาเป็นข้อๆ เป็นรายสิ่งทีละสเต็ปที่ทำได้จริง เพื่อทำให้สิ่งที่ต้องทำดูจับต้องได้ง่ายขึ้น" },
    { key: "mute_notif", title: "ปิดเสียงแจ้งเตือนมือถือ 15 นาที 🔇", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เปิดโหมดห้ามรบกวนหรือปิดเสียงโทรศัพท์เป็นเวลา 15 นาทีเต็ม เพื่อลดสิ่งเร้าภายนอกและปกป้องพื้นที่ส่วนตัวของคุณอย่างผ่อนคลาย" }
  ],
  Discouraged: [
    { key: "mood", title: "เขียนทบทวนความท้อแท้สิ้นหวังลงไดอารี่ 😔", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนปลดเปลื้องภาระความพ่ายแพ้หรือความท้อแท้สิ้นแรงลงในไดอารี่เพื่อเติมพลังใจสู้ใหม่ค่ะ" },
    { key: "wins", title: "จดบันทึกความสำเร็จอดีต 3 สิ่งฟื้นใจ 🏆", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "เขียนสิ่งที่คุณเคยทำสำเร็จในชีวิต ไม่ว่าจะเรื่องใหญ่หรือเรื่องเล็กๆ น้อยๆ 3 อย่าง เพื่อตอกย้ำให้ตัวเองจำได้ว่าคุณมีศักยภาพและความสามารถเพียงใด" },
    { key: "positive_quotes", title: "อ่านคำคมหรือคำพูดบวกสร้างแรงใจ 📖", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "หาอ่านบทความ คำคม หรือดูวิดีโอที่ช่วยจุดประกายความหวังและเติมข้อคิดเชิงบวกให้แก่จิตใจ" },
    { key: "growth_mindset", title: "ย่อยเป้าหมายใหญ่ให้เล็กสุดเพื่อทำทันที 🧘", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "แบ่งงานหรือเป้าหมายที่ดูยิ่งใหญ่เกินตัว ให้กลายเป็นขั้นตอนที่เล็กมากจนคุณสามารถลงมือทำเสร็จได้ภายใน 2 นาทีเพื่อฟื้นฟูความมั่นใจ" },
    { key: "self_compassion", title: "เขียนจดหมายให้กำลังใจตนเองแบบกัลยาณมิตร ✍️", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "เขียนข้อความสั้นๆ ปลอบใจตัวเองในมุมมองเสมือนว่าเพื่อนสนิทผู้เข้าอกเข้าใจคุณมากที่สุดเป็นคนเขียนจดหมายแผ่นนี้ส่งมาให้กำลังใจคุณ" }
  ]
};

function renderDailyQuests() {
  const container = document.getElementById("questListContainer");
  if (!container) return;
  
  if (!state.moodRecorded) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px 15px; text-align: center; background: rgba(255, 255, 255, 0.05); border: 1.5px dashed rgba(255, 255, 255, 0.1); border-radius: 16px; margin: 10px 0;">
        <span style="font-size: 28px; margin-bottom: 10px;">🔒</span>
        <div style="font-size: 12px; font-weight: 700; color: #f87171; margin-bottom: 12px; line-height: 1.5;">
          กรุณาเข้าไประบันทึกอารมณ์ของคุณในหน้าไดอารี่ก่อน เพื่อปลดล็อกและรับเควสประจำวันนะคะ
        </div>
        <button class="btn-gradient" style="padding: 6px 16px; font-size: 11px; border-radius: 20px;" onclick="nav('screen-12')">ไปหน้าบันทึกอารมณ์ ✍️</button>
      </div>
    `;
    return;
  }
  
  const activeMood = state.selectedMood || "Happy";
  const quests = MOOD_QUESTS_TEMPLATES[activeMood] || MOOD_QUESTS_TEMPLATES.Happy;
  
  container.innerHTML = quests.map(q => {
    const progress = state.questsProgress[q.key] || 0;
    const isCompleted = progress >= q.target;
    const isClaimed = state.questsClaimed[q.key];
    
    return `
      <div class="quest-item" style="border: 1px solid ${isClaimed ? 'rgba(255,255,255,0.05)' : isCompleted ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.08)'}; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 12px; background: rgba(255, 255, 255, 0.02);">
        <div class="quest-left" style="display: flex; align-items: center; gap: 10px;">
          <div class="quest-check ${isClaimed || isCompleted ? 'done' : ''}" style="width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid ${isCompleted ? '#22c55e' : '#cbd5e1'}; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #fff; background: ${isCompleted ? '#22c55e' : 'transparent'};">
            ${isCompleted ? '✓' : ''}
          </div>
          <div class="quest-details" style="display: flex; flex-direction: column;">
            <span class="quest-title" style="font-size:11px; font-weight:700; color: ${isClaimed ? 'var(--text-muted)' : 'var(--text-primary)'};">${q.title}</span>
            <span class="quest-rewards" style="font-size: 9px; font-weight: 700; color: #facc15;">+${q.rewardCoins}🪙  +${q.rewardExp}⭐</span>
          </div>
        </div>
        <div class="quest-right" style="display: flex; align-items: center; gap: 8px;">
          <span class="quest-progress-txt" style="font-size: 10px; color: ${isClaimed ? '#64748b' : isCompleted ? '#22c55e' : '#38bdf8'}; font-weight:700;">${progress}/${q.target}</span>
          ${isClaimed 
            ? `<button class="quest-claim-btn" style="background:#cbd5e1; color:#64748b; cursor:default; font-size:10px; padding: 4px 8px; border-radius: 12px; border:none;" disabled>รับแล้ว</button>`
            : isCompleted
              ? `<button class="quest-claim-btn" onclick="claimDailyQuest('${q.key}')" style="background:#22c55e; color:#fff; cursor:pointer; font-size:10px; padding: 4px 8px; border-radius: 12px; font-weight:700; border:none; box-shadow: 0 2px 6px rgba(34,197,94,0.3);">รับรางวัล</button>`
              : `<button class="quest-claim-btn" onclick="goToDoQuest('${q.key}')" style="background:#38bdf8; color:#fff; cursor:pointer; font-size:10px; padding: 4px 8px; border-radius: 12px; font-weight:700; border:none; box-shadow: 0 2px 6px rgba(56,189,248,0.3);">นำไปทำ</button>`
          }
        </div>
      </div>
    `;
  }).join("");
}

function goToDoQuest(key) {
  if (key === "mood") {
    nav("screen-12");
    return;
  }
  
  const activeMood = state.selectedMood || "Happy";
  const templates = MOOD_QUESTS_TEMPLATES[activeMood] || MOOD_QUESTS_TEMPLATES.Happy;
  const currentQuest = templates.find(q => q.key === key);
  
  if (currentQuest) {
    showMindfulnessModal(currentQuest);
  }
}

function showMindfulnessModal(quest) {
  let modal = document.getElementById("mindfulnessModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "mindfulnessModal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    modal.style.backdropFilter = "blur(8px)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #1e1e38 0%, #0d0d1e 100%); border: 1.5px solid rgba(255, 255, 255, 0.1); border-radius: 24px; width: 85%; max-width: 320px; padding: 20px; color: #fff; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.3s ease;">
      <span style="font-size: 32px; display: block; margin-bottom: 12px;">🧘</span>
      <h3 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #38bdf8; font-family: inherit;">ทำกิจกรรมบำบัดจิตใจ</h3>
      <p style="font-size: 11px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px; font-family: inherit;">
        ${quest.instruction || quest.title}
      </p>
      <div style="display: flex; gap: 10px; justify-content: center;">
        <button class="btn-gradient" style="padding: 8px 16px; font-size: 11px; border-radius: 12px;" onclick="completeMindfulnessQuest('${quest.key}')">ทำสำเร็จแล้ว ✨</button>
        <button class="btn-secondary" style="padding: 8px 16px; font-size: 11px; border-radius: 12px; width: auto;" onclick="closeMindfulnessModal()">ปิด</button>
      </div>
    </div>
  `;
  modal.style.display = "flex";
  setTimeout(() => {
    modal.firstElementChild.style.transform = "scale(1)";
  }, 10);
}

function closeMindfulnessModal() {
  const modal = document.getElementById("mindfulnessModal");
  if (modal) {
    modal.firstElementChild.style.transform = "scale(0.9)";
    setTimeout(() => {
      modal.style.display = "none";
    }, 200);
  }
}

function completeMindfulnessQuest(key) {
  state.questsProgress[key] = (state.questsProgress[key] || 0) + 1;
  syncUI();
  renderDailyQuests();
  closeMindfulnessModal();
  alert("🎉 ทำกิจกรรมสำเร็จ! สามารถรับรางวัลความสุขได้แล้วน้า 🌟");
}

function claimDailyQuest(questKey) {
  if (state.questsClaimed[questKey]) return;
  
  state.questsClaimed[questKey] = true;
  
  const activeMood = state.selectedMood || "Happy";
  const templates = MOOD_QUESTS_TEMPLATES[activeMood] || MOOD_QUESTS_TEMPLATES.Happy;
  const currentQuest = templates.find(q => q.key === questKey);
  
  let coinsReward = currentQuest ? currentQuest.rewardCoins : 20;
  let expReward = 20;
  
  state.coins += coinsReward;
  state.exp += expReward;
  
  alert(`🎉 รับรางวัลเควสสำเร็จ! ได้รับ +${coinsReward}🪙  +${expReward}⭐`);
  checkLevelUp();
  renderDailyQuests();
}

// ----------------------------------------------------
// HEALING MUSIC / WHITE NOISE SYSTEM (Play audio files)
// ----------------------------------------------------
const HEALING_SOUNDS = [
  { id: "rain", name: "เสียงฝนตกเบาๆ", emoji: "🌧️", file: "dragon-studio-gentle-rain-07-437321.mp3" },
  { id: "waves", name: "เสียงคลื่นกระทบฝั่ง", emoji: "🌊", file: "dragon-studio-waves-crashing-397977.mp3" },
  { id: "forest", name: "เสียงธรรมชาติในป่าใหญ่", emoji: "🌲", file: "audiopapkin-forest-ambience-296528.mp3" },
  { id: "birds", name: "เสียงนกร้องเจื้อยแจ้ว", emoji: "🐦", file: "yuliana-yurukova-bird-chirps-343624.mp3" },
  { id: "waterfall", name: "เสียงน้ำตกผ่อนคลาย", emoji: "🏞️", file: "u_ulyvnmi5x7-water-fall-smooth-relaxing-129674.mp3" },
  { id: "bubble", name: "เสียงบับเบิ้ลฟองสบู่", emoji: "🫧", file: "tawipop-bubble-sound-effect-1-527144.mp3" }
];

function openHealingMusic() {
  nav("screen-24");
  if (!state.healingAudios) {
    state.healingAudios = {};
  }
  renderHealingSounds();
}

function closeHealingMusic() {
  nav("screen-1");
}

function renderHealingSounds() {
  const grid = document.getElementById("healingSoundsGrid");
  if (!grid) return;
  
  grid.innerHTML = "";
  HEALING_SOUNDS.forEach(sound => {
    const audio = state.healingAudios ? state.healingAudios[sound.id] : null;
    const isPlaying = audio && !audio.paused;
    const currentVol = audio ? audio.volume * 100 : 80;
    
    const card = document.createElement("div");
    card.style = `
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border-radius: 12px;
      padding: 12.5px;
      border: 1px solid var(--border-color);
      box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    `;
    
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: var(--text-primary); font-size: 12px;">
          <span style="font-size: 16px;">${sound.emoji}</span>
          <span>${sound.name}</span>
        </div>
        <button class="${isPlaying ? 'btn-gradient' : 'btn-secondary'}" 
                style="padding: 4px 10px; font-size: 10px; border-radius: 6px; font-weight: 700; width: 68px; text-align: center;"
                onclick="toggleHealingSound('${sound.id}')" id="playBtn-${sound.id}">
          ${isPlaying ? '⏸ หยุด' : '▶ เล่น'}
        </button>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 9px; color: var(--text-secondary); width: 45px;">ระดับเสียง:</span>
        <input type="range" min="0" max="100" value="${currentVol}" 
               style="flex-grow:1;" id="volume-${sound.id}" 
               oninput="adjustHealingVolume('${sound.id}', this.value)">
      </div>
    `;
    grid.appendChild(card);
  });
}

function toggleHealingSound(id) {
  if (!checkLevelUnlock(6, "การเล่นเสียงดนตรีบำบัด")) return;
  const sound = HEALING_SOUNDS.find(s => s.id === id);
  if (!sound) return;
  
  if (!state.healingAudios[id]) {
    const audio = new Audio(sound.file);
    audio.loop = true;
    audio.volume = 0.8;
    state.healingAudios[id] = audio;
  }
  
  const audio = state.healingAudios[id];
  const btn = document.getElementById(`playBtn-${id}`);
  
  if (audio.paused) {
    audio.play().then(() => {
      if (btn) {
        btn.className = "btn-gradient";
        btn.innerText = "⏸ หยุด";
      }
      state.questsProgress.music = Math.min(1, state.questsProgress.music + 1);
    }).catch(err => {
      console.error("Audio playback failed:", err);
    });
  } else {
    audio.pause();
    if (btn) {
      btn.className = "btn-secondary";
      btn.innerText = "▶ เล่น";
    }
  }
}

function adjustHealingVolume(id, value) {
  if (!state.healingAudios[id]) {
    const sound = HEALING_SOUNDS.find(s => s.id === id);
    if (sound) {
      const audio = new Audio(sound.file);
      audio.loop = true;
      state.healingAudios[id] = audio;
    }
  }
  
  const audio = state.healingAudios[id];
  if (audio) {
    audio.volume = value / 100;
  }
}

function stopAllHealingSounds() {
  if (state.healingAudios) {
    Object.keys(state.healingAudios).forEach(key => {
      if (state.healingAudios[key]) {
        state.healingAudios[key].pause();
      }
    });
  }
  renderHealingSounds();
}

function initPetDragAndDrop() {
  document.querySelectorAll(".dynamic-pet-display").forEach(pet => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let originalLeft = 0, originalTop = 0;
    
    pet.addEventListener("pointerdown", (e) => {
      // Allow only left click or touch/pen inputs
      if (e.button !== 0 && e.pointerType === "mouse") return;
      
      isDragging = true;
      pet.style.transition = "none";
      
      const parent = pet.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      const petRect = pet.getBoundingClientRect();
      
      // Calculate current center coordinates of the pet relative to the parent container
      originalLeft = (petRect.left + petRect.width / 2) - rect.left;
      originalTop = (petRect.top + petRect.height / 2) - rect.top;
      
      startX = e.clientX;
      startY = e.clientY;
      
      // Capture the pointer to handle drag out boundaries smoothly
      pet.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
    });
    
    pet.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      
      const parent = pet.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      
      let newLeftPx = originalLeft + dx;
      let newTopPx = originalTop + dy;
      
      let pctX = Math.min(95, Math.max(5, (newLeftPx / rect.width) * 100));
      let pctY = Math.min(95, Math.max(5, (newTopPx / rect.height) * 100));
      
      pet.style.left = pctX + "%";
      pet.style.top = pctY + "%";
      
      const carpet = parent.querySelector(".carpet-ellipse");
      if (carpet) {
        carpet.style.transition = "none";
        carpet.style.left = pctX + "%";
        carpet.style.top = pctY + "%";
      }
      
      e.preventDefault();
      e.stopPropagation();
    });
    
    const onEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      pet.style.transition = "left 0.7s cubic-bezier(0.25, 1, 0.5, 1), top 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
      
      const parent = pet.parentElement;
      if (parent) {
        const carpet = parent.querySelector(".carpet-ellipse");
        if (carpet) {
          carpet.style.transition = "left 0.7s cubic-bezier(0.25, 1, 0.5, 1), top 0.7s cubic-bezier(0.25, 1, 0.5, 1)";
        }
      }
      try {
        pet.releasePointerCapture(e.pointerId);
      } catch (err) {}
    };
    
    pet.addEventListener("pointerup", onEnd);
    pet.addEventListener("pointercancel", onEnd);
  });
}

function setPetPosture(posture) {
  const container = document.getElementById("petHomeContainer");
  if (!container) return;
  
  container.setAttribute("data-state", posture);
  
  // Highlight active posture button
  document.querySelectorAll(".posture-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-posture") === posture) {
      btn.classList.add("active");
    }
  });

  if (posture === "sitting") {
    state.questsProgress.sit = (state.questsProgress.sit || 0) + 1;
  } else if (posture === "idle") {
    state.questsProgress.dance = (state.questsProgress.dance || 0) + 1;
  } else if (posture === "standing") {
    state.questsProgress.dance = (state.questsProgress.dance || 0) + 1;
  }
}

let calendarDate = new Date();

function doDailyCheckIn() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const currentExpBonus = Math.max(10, state.level * 10);

  if (state.lastCheckInDate === todayStr) {
    alert(`📅 วันนี้คุณได้ทำการเช็คอินไปแล้วค่ะ! ✨\n\n(เช็คอินแล้ววันนี้ ได้รับรางวัล +${currentExpBonus} ⭐ EXP เรียบร้อยแล้วค่ะ)\nกลับมาเช็คอินใหม่วันพรุ่งนี้นะคะ! 🌟`);
    return;
  }

  // Award EXP = Level * 10 (at least 10 EXP for Level 0)
  const earnedExp = currentExpBonus;
  const earnedCoins = 50;

  state.lastCheckInDate = todayStr;
  state.coins += earnedCoins;
  state.exp += earnedExp;

  spawnVisualEffect("stat", "calendarGrid", `📅 เช็คอินวันนี้! +${earnedCoins}🪙 +${earnedExp}⭐`);
  alert(`🎉 เช็คอินประจำวันสำเร็จ! 📅✨\n\n⭐ ได้รับ EXP: +${earnedExp} EXP (เลเวล ${state.level} × 10)\n🪙 ได้รับโบนัสเหรียญทอง: +${earnedCoins} เหรียญทอง\n\nมาดูแลน้องสัตว์เลี้ยงสม่ำเสมอทุกวันน้า! 🥰`);
  
  checkLevelUp();
  if (typeof renderCalendar === "function") {
    renderCalendar();
  }
}

function renderCalendar() {
  const monthYearEl = document.getElementById("calendarMonthYear");
  const gridEl = document.getElementById("calendarGrid");
  if (!monthYearEl || !gridEl) return;
  
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  
  // Set header text (e.g. กรกฎาคม 2569 BE)
  monthYearEl.innerText = `${thaiMonths[month]} ${year + 543}`;
  
  // Clear previous grid cells
  gridEl.innerHTML = "";
  
  // Get first day of the month and total days
  const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday, 1 is Monday, etc.
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  // Get previous month's total days for padding
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  
  // Check if user has already checked in today
  const now = new Date();
  const todayY = now.getFullYear();
  const todayM = String(now.getMonth() + 1).padStart(2, "0");
  const todayD = String(now.getDate()).padStart(2, "0");
  const todayStr = `${todayY}-${todayM}-${todayD}`;
  const isCheckedInToday = state.lastCheckInDate === todayStr;
  const currentExpBonus = Math.max(10, state.level * 10);
  
  // 1. Render previous month's muted days
  for (let i = firstDay - 1; i >= 0; i--) {
    const daySpan = document.createElement("span");
    daySpan.className = "calendar-day muted";
    daySpan.innerText = prevMonthTotalDays - i;
    gridEl.appendChild(daySpan);
  }
  
  // 2. Render current month's days
  for (let d = 1; d <= totalDays; d++) {
    const daySpan = document.createElement("span");
    daySpan.className = "calendar-day";
    daySpan.innerText = d;
    
    // Highlight today
    if (d === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
      daySpan.classList.add("active", "today");
      daySpan.style.cursor = "pointer";
      if (isCheckedInToday) {
        daySpan.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        daySpan.style.color = "#ffffff";
        daySpan.title = "เช็คอินแล้ววันนี้";
      } else {
        daySpan.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
        daySpan.style.color = "#ffffff";
        daySpan.title = `กดเช็คอินวันนี้ (รับ +${currentExpBonus} EXP)`;
      }
      daySpan.onclick = doDailyCheckIn;
    }
    
    gridEl.appendChild(daySpan);
  }
  
  // 3. Render next month's muted days to complete 42 cells (6 rows * 7 days)
  const totalCells = gridEl.children.length;
  const nextMonthPadding = 42 - totalCells;
  for (let n = 1; n <= nextMonthPadding; n++) {
    const daySpan = document.createElement("span");
    daySpan.className = "calendar-day muted";
    daySpan.innerText = n;
    gridEl.appendChild(daySpan);
  }

  // 4. Update / append Daily Check-in button in Screen 12
  let checkInBtn = document.getElementById("calendarCheckInBtn");
  if (!checkInBtn) {
    checkInBtn = document.createElement("button");
    checkInBtn.id = "calendarCheckInBtn";
    checkInBtn.className = "btn-gradient";
    checkInBtn.style.cssText = "width: 100%; margin-top: 12px; padding: 10px 14px; font-size: 11px; font-weight: 700; border-radius: 14px; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);";
    checkInBtn.onclick = doDailyCheckIn;
    const widget = document.querySelector(".calendar-widget");
    if (widget) widget.after(checkInBtn);
  }

  if (isCheckedInToday) {
    checkInBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    checkInBtn.innerHTML = `✅ เช็คอินสำเร็จแล้ววันนี้ (ได้รับ +${currentExpBonus} ⭐ EXP)`;
  } else {
    checkInBtn.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
    checkInBtn.innerHTML = `📅 กดเช็คอินประจำวัน (รับ EXP = เลเวล ${state.level} × 10 = +${currentExpBonus} ⭐ EXP)`;
  }
}

function changeCalendarMonth(offset) {
  calendarDate.setMonth(calendarDate.getMonth() + offset);
  renderCalendar();
}

// Diary Mood & Entry Functions
function selectDiaryMood(mood) {
  state.selectedMood = mood;
  
  // Update UI active buttons
  const buttons = document.querySelectorAll(".diary-mood-btn");
  buttons.forEach(btn => {
    if (btn.getAttribute("data-mood") === mood) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  // Dynamically update the prompt text depending on mood
  const promptEl = document.getElementById("diaryPromptText");
  if (promptEl) {
    const prompts = {
      Happy: "เรื่องราวดีๆ ที่ทำให้คุณยิ้มได้ในวันนี้...",
      Calm: "อะไรที่ทำให้คุณรู้สึกผ่อนคลายและสงบใจในวันนี้...",
      Shocked: "มีเรื่องตื่นเต้นหรือคาดไม่ถึงอะไรเกิดขึ้นหรือเปล่าคะ...",
      Frustrated: "ระบายความหงุดหงิดหรือเรื่องที่ขัดใจออกมาได้เลยน้า...",
      Angry: "ระบายความโกรธและความอัดอั้นในใจออกมาได้เลยค่ะ...",
      Tired: "เหนื่อยล้าจากอะไรมาบ้าง เขียนระบายให้ฟังหน่อยน้า...",
      Sad: "มีเรื่องไม่สบายใจหรือเรื่องเศร้าใจอะไรมา เล่าให้ฟังได้นะ...",
      Restless: "ความว้าวุ่นกังวลใจเรื่องอะไรกำลังกวนใจคุณอยู่คะ...",
      Discouraged: "อะไรที่ทำให้คุณรู้สึกท้อใจ เขียนมาระบายระบายกันนะคะ..."
    };
    promptEl.innerText = prompts[mood] || "เรื่องราวดีๆ ที่ทำให้คุณยิ้มได้ในวันนี้...";
  }
}

function saveDiaryEntry() {
  const journalInput = document.getElementById("diaryJournalInput");
  if (!journalInput) return;
  const journalText = journalInput.value.trim();
  
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;
  
  state.moodRecorded = true;
  state.lastDiaryDate = todayStr;
  
  const entryTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
  const entry = {
    date: todayStr,
    time: entryTime,
    mood: state.selectedMood || "Happy",
    text: journalText
  };
  
  if (!state.diaryHistory) state.diaryHistory = [];
  state.diaryHistory.push(entry);
  
  // Progress quest
  if (state.questsProgress) {
    state.questsProgress.mood = Math.min(1, (state.questsProgress.mood || 0) + 1);
  }
  
  // Award bonus once per day
  const diaryAwardKey = "lastDiaryAwardDate";
  const hasBeenAwardedToday = state[diaryAwardKey] === todayStr;
  
  if (!hasBeenAwardedToday) {
    state[diaryAwardKey] = todayStr;
    state.coins += 50;
    state.exp += 30;
    
    saveGameState();
    syncUI();
    
    if (typeof renderMoodAnalytics === "function") renderMoodAnalytics();
    spawnVisualEffect("stat", "btnSaveDiary", "📝 +50🪙 +30⭐");
    alert(`หนูบันทึกไดอารี่ลงเล่มให้เรียบร้อยแล้วนะคะปะป๊ามะม๊า! 📝✨\n🎁 ได้รับรางวัลประจำวัน: +50 🪙 และ +30 ⭐ EXP ด้วยน้าาา 💕`);
  } else {
    saveGameState();
    syncUI();
    if (typeof renderMoodAnalytics === "function") renderMoodAnalytics();
    alert(`หนูบันทึกไดอารี่รอบใหม่ให้ปะป๊ามะม๊าแล้วค่าาา! 📝💖`);
  }
  
  journalInput.value = "";
}

function renderMoodAnalytics() {
  const container = document.getElementById("moodAnalyticsContainer");
  if (!container) return;
  
  if (!state.diaryHistory || state.diaryHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 15px; color: var(--text-muted); font-size: 11px; font-weight: 600;">
        ยังไม่มีบันทึกประวัติอารมณ์เลยน้า เริ่มเขียนบันทึกแรกได้เลยค่ะ! 📝
      </div>
    `;
    return;
  }
  
  const moodEmojis = {
    Happy: "😊",
    Calm: "😌",
    Shocked: "😳",
    Frustrated: "😒",
    Angry: "😡",
    Tired: "🥱",
    Sad: "😢",
    Restless: "🌀",
    Discouraged: "😔"
  };
  
  const moodNames = {
    Happy: "มีความสุข",
    Calm: "สงบ",
    Shocked: "ตกใจ",
    Frustrated: "หงุดหงิด",
    Angry: "โกรธ",
    Tired: "เหนื่อย",
    Sad: "เศร้า",
    Restless: "ว้าวุ่น",
    Discouraged: "ท้อแท้"
  };

  // Show last 5 diary entries in a beautiful pastel timeline
  const recentEntries = state.diaryHistory.slice(-5).reverse();
  
  const listHtml = recentEntries.map(entry => {
    const dateObj = new Date(entry.date);
    const dateFormatted = `${dateObj.getDate()} / ${dateObj.getMonth() + 1} / ${dateObj.getFullYear() + 543}`;
    const emoji = moodEmojis[entry.mood] || "😊";
    const name = moodNames[entry.mood] || "มีความสุข";
    
    return `
      <div style="background: rgba(255, 255, 255, 0.4); border-radius: 12px; padding: 10px 12px; margin-bottom: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 16px;">${emoji}</span>
            <span style="font-size: 11px; font-weight: 800; color: var(--text-primary);">${name}</span>
          </div>
          <span style="font-size: 9px; font-weight: 700; color: var(--text-muted);">${dateFormatted} ${entry.time || ""}</span>
        </div>
        ${entry.text ? `<p style="margin: 0; font-size: 10.5px; color: var(--text-secondary); line-height: 1.4; word-break: break-word;">${entry.text}</p>` : `<span style="font-size: 10px; color: var(--text-muted); font-style: italic;">ไม่ได้บันทึกรายละเอียดข้อความ</span>`}
      </div>
    `;
  }).join("");
  
  container.innerHTML = `
    <h4 style="font-size: 11px; font-weight: 800; color: var(--text-primary); margin: 15px 0 8px 0; display: flex; align-items: center; gap: 5px;">
      📝 ประวัติบันทึกอารมณ์ล่าสุด
    </h4>
    <div style="max-height: 200px; overflow-y: auto; padding-right: 2px;">
      ${listHtml}
    </div>
  `;
}

// ====================================================
// COIN CATCHER MINI-GAME (LEVEL 0)
// ====================================================
let catcherGameInterval = null;
let catcherTimerInterval = null;
let catcherScore = 0;
let catcherLives = 3;
let catcherTimeLeft = 30;
let catcherItems = [];
let catcherActive = false;
let catcherSpawnTimer = 0;

// Continuous movement state
let catcherX = 50; // Current position percentage (10% to 90%)
let catcherTargetX = 50; // Target position percentage (10% to 90%)
let keysPressed = { left: false, right: false };

function playCatcherBeep(freq, type = 'sine', duration = 0.1) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("Audio API error", e);
  }
}

function startCoinCatcherGame() {
  catcherActive = true;
  catcherScore = 0;
  catcherLives = 3;
  catcherTimeLeft = 30;
  catcherX = 50;
  catcherTargetX = 50;
  keysPressed = { left: false, right: false };
  catcherItems = [];
  catcherSpawnTimer = 0;

  // Show game area overlay
  const gameArea = document.getElementById("coinCatcherGameArea");
  if (gameArea) gameArea.style.display = "flex";

  const frame = document.querySelector(".phone-frame");
  if (frame) frame.classList.add("catcher-active");

  // Hide Game Over Modal if open
  const modal = document.getElementById("catcherGameOverModal");
  if (modal) modal.style.display = "none";

  // Clear previous items from DOM
  const grid = document.getElementById("catcherItemsGrid");
  if (grid) grid.innerHTML = "";

  // Render pet
  renderCatcherPet();
  updateCatcherUI();

  // Position pet in Center
  updatePetCatcherPosition();

  // Play start sound
  playCatcherBeep(523.25, 'sine', 0.15); // C5
  setTimeout(() => playCatcherBeep(659.25, 'sine', 0.15), 150); // E5
  setTimeout(() => playCatcherBeep(783.99, 'sine', 0.3), 300); // G5

  // Start intervals
  clearInterval(catcherGameInterval);
  catcherGameInterval = setInterval(updateCatcherGameLoop, 30); // ~33fps

  clearInterval(catcherTimerInterval);
  catcherTimerInterval = setInterval(updateCatcherTimer, 1000);

  // Set up button hold events for mobile / click controls
  const btnLeft = document.getElementById("btnCatcherLeft");
  const btnRight = document.getElementById("btnCatcherRight");
  
  if (btnLeft) {
    btnLeft.onmousedown = btnLeft.ontouchstart = (e) => {
      e.preventDefault();
      keysPressed.left = true;
    };
    btnLeft.onmouseup = btnLeft.onmouseleave = btnLeft.ontouchend = () => {
      keysPressed.left = false;
    };
  }
  
  if (btnRight) {
    btnRight.onmousedown = btnRight.ontouchstart = (e) => {
      e.preventDefault();
      keysPressed.right = true;
    };
    btnRight.onmouseup = btnRight.onmouseleave = btnRight.ontouchend = () => {
      keysPressed.right = false;
    };
  }

  // Set up drag/touch tracking on play area for continuous analog sliding
  const playArea = document.getElementById("catcherPlayArea");
  if (playArea) {
    let isTracking = false;
    const updateTarget = (clientX) => {
      const rect = playArea.getBoundingClientRect();
      const clickX = clientX - rect.left;
      catcherTargetX = Math.max(8, Math.min(92, (clickX / rect.width) * 100));
    };

    playArea.onmousedown = (e) => {
      isTracking = true;
      updateTarget(e.clientX);
    };
    
    playArea.onmousemove = (e) => {
      if (isTracking) updateTarget(e.clientX);
    };
    
    window.addEventListener("mouseup", () => {
      isTracking = false;
    });

    playArea.ontouchstart = (e) => {
      isTracking = true;
      if (e.touches.length > 0) updateTarget(e.touches[0].clientX);
    };

    playArea.ontouchmove = (e) => {
      if (isTracking && e.touches.length > 0) {
        updateTarget(e.touches[0].clientX);
      }
    };

    playArea.ontouchend = () => {
      isTracking = false;
    };
  }
}

function confirmStopCoinCatcher() {
  if (confirm("ปะป๊ามะม๊าจะออกจากเกมแล้วหรอคะ... คะแนนรอบนี้ของหนูจะหายไปน้า 🥺")) {
    stopCoinCatcherGame();
  }
}

function stopCoinCatcherGame() {
  catcherActive = false;
  clearInterval(catcherGameInterval);
  clearInterval(catcherTimerInterval);
  keysPressed = { left: false, right: false };

  // Clear items from DOM
  const grid = document.getElementById("catcherItemsGrid");
  if (grid) grid.innerHTML = "";
  catcherItems = [];

  // Hide game area overlay
  const gameArea = document.getElementById("coinCatcherGameArea");
  if (gameArea) gameArea.style.display = "none";

  const frame = document.querySelector(".phone-frame");
  if (frame) frame.classList.remove("catcher-active");
}

function renderCatcherPet() {
  const container = document.getElementById("catcherPet");
  if (!container) return;
  const petScale = getPetScale();
  const sizePx = 110;
  const appSize = Math.round(52 * petScale);
  const defaultTop = Math.round(-22 * petScale);
  const topPos = getApparelTopOffset(state.activeApparel, defaultTop, appSize, petScale);
  
  container.innerHTML = `
    <div style="position:relative; width:${sizePx}px; height:${sizePx}px; display:flex; align-items:center; justify-content:center;">
      ${getPetVisual(sizePx)}
      ${state.activeApparel ? `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(state.activeApparel, appSize)}</span>` : ''}
    </div>
  `;
}

function updatePetCatcherPosition() {
  const pet = document.getElementById("catcherPet");
  if (!pet) return;
  pet.style.left = catcherX + "%";
}

function updateCatcherUI() {
  const scoreVal = document.getElementById("catcherScoreVal");
  if (scoreVal) scoreVal.innerText = catcherScore;

  const timeVal = document.getElementById("catcherTimeVal");
  if (timeVal) timeVal.innerText = catcherTimeLeft;

  const livesContainer = document.getElementById("catcherLivesContainer");
  if (livesContainer) {
    let hearts = "";
    for (let i = 0; i < 3; i++) {
      hearts += i < catcherLives ? "❤️" : "🖤";
    }
    livesContainer.innerText = hearts;
  }
}

function updateCatcherTimer() {
  if (!catcherActive) return;
  catcherTimeLeft--;
  updateCatcherUI();

  if (catcherTimeLeft <= 0) {
    endCoinCatcherGame();
  }
}

function spawnCatcherItem() {
  const grid = document.getElementById("catcherItemsGrid");
  if (!grid) return;

  const types = ["coin", "coin", "coin", "star", "bomb"]; // 60% coin, 20% star, 20% bomb
  const type = types[Math.floor(Math.random() * types.length)];
  
  // Fully continuous randomized spawn position (between 8% and 92%)
  const xPos = 8 + Math.random() * 84;

  // Map visuals
  let emoji = "🪙";
  if (type === "star") emoji = "⭐";
  if (type === "bomb") emoji = Math.random() < 0.5 ? "💣" : "🪨";

  const itemEl = document.createElement("div");
  itemEl.className = "falling-item";
  itemEl.innerText = emoji;
  
  itemEl.style.left = xPos + "%";
  itemEl.style.top = "0%";
  itemEl.style.transform = "translateX(-50%)";

  grid.appendChild(itemEl);

  catcherItems.push({
    element: itemEl,
    x: xPos,
    y: 0, // top percentage
    speed: 1.5 + Math.random() * 1.5, // dynamic speed (1.5% to 3% per frame)
    type: type
  });
}

function updateCatcherGameLoop() {
  if (!catcherActive) return;

  // Smooth continuous seeks movement
  if (keysPressed.left) {
    catcherTargetX = Math.max(8, catcherTargetX - 3.5);
  }
  if (keysPressed.right) {
    catcherTargetX = Math.min(92, catcherTargetX + 3.5);
  }

  // Smooth interpolation
  catcherX += (catcherTargetX - catcherX) * 0.22;
  updatePetCatcherPosition();

  // Spawning logic
  catcherSpawnTimer += 30; // 30ms elapsed
  const spawnRate = Math.max(400, 750 - (30 - catcherTimeLeft) * 10); // Spawns faster as time passes!
  if (catcherSpawnTimer >= spawnRate) {
    spawnCatcherItem();
    catcherSpawnTimer = 0;
  }

  // Update item position & check collision
  for (let i = catcherItems.length - 1; i >= 0; i--) {
    const item = catcherItems[i];
    item.y += item.speed;
    item.element.style.top = item.y + "%";

    // Continuous analog collision check
    // If the item falls near the pet's height (76% to 90%)
    if (item.y >= 76 && item.y <= 90) {
      // Check absolute distance between item and pet horizontally (collision radius = 12%)
      if (Math.abs(item.x - catcherX) < 12) {
        // Collect!
        handleCatcherCollision(item);
        item.element.remove();
        catcherItems.splice(i, 1);
        continue;
      }
    }

    // Out of bounds check
    if (item.y > 100) {
      item.element.remove();
      catcherItems.splice(i, 1);
    }
  }
}

function handleCatcherCollision(item) {
  const pet = document.getElementById("catcherPet");
  if (pet) {
    // Add brief wiggle effect to pet
    pet.classList.remove("catcher-splash-active");
    void pet.offsetWidth; // trigger reflow
    pet.classList.add("catcher-splash-active");
  }

  if (item.type === "coin") {
    catcherScore += 5;
    playCatcherBeep(880, 'sine', 0.1); // high beep
    showCollectPointsEffect(item.x, "+5 🪙", "#facc15");
  } else if (item.type === "star") {
    catcherScore += 10;
    playCatcherBeep(1000, 'sine', 0.08);
    setTimeout(() => playCatcherBeep(1300, 'sine', 0.12), 80);
    showCollectPointsEffect(item.x, "+10 ⭐", "#38bdf8");
  } else if (item.type === "bomb") {
    catcherLives--;
    playCatcherBeep(180, 'sawtooth', 0.25); // low buzz
    showCollectPointsEffect(item.x, "💥 -1 ❤️", "#ef4444");

    // Camera shake effect on playfield
    const playArea = document.getElementById("catcherPlayArea");
    if (playArea) {
      playArea.style.transform = "translate(5px, 5px)";
      setTimeout(() => playArea.style.transform = "translate(-5px, -5px)", 50);
      setTimeout(() => playArea.style.transform = "translate(5px, -5px)", 100);
      setTimeout(() => playArea.style.transform = "translate(0px, 0px)", 150);
    }

    if (catcherLives <= 0) {
      endCoinCatcherGame();
    }
  }
  updateCatcherUI();
}

function showCollectPointsEffect(x, text, color) {
  const grid = document.getElementById("catcherItemsGrid");
  if (!grid) return;

  const effect = document.createElement("div");
  effect.innerText = text;
  effect.style.position = "absolute";
  effect.style.left = x + "%";
  effect.style.bottom = "80px";
  effect.style.transform = "translateX(-50%)";
  effect.style.color = color;
  effect.style.fontWeight = "900";
  effect.style.fontSize = "14px";
  effect.style.pointerEvents = "none";
  effect.style.transition = "all 0.5s ease-out";
  effect.style.opacity = "1";
  effect.style.zIndex = "20";
  effect.style.textShadow = "0 2px 4px rgba(0,0,0,0.5)";

  grid.appendChild(effect);

  requestAnimationFrame(() => {
    effect.style.bottom = "130px";
    effect.style.opacity = "0";
    effect.style.transform = "translateX(-50%) scale(1.3)";
  });

  setTimeout(() => effect.remove(), 500);
}

function endCoinCatcherGame() {
  catcherActive = false;
  clearInterval(catcherGameInterval);
  clearInterval(catcherTimerInterval);
  keysPressed = { left: false, right: false };

  // Play game over music
  playCatcherBeep(659.25, 'sine', 0.15);
  setTimeout(() => playCatcherBeep(523.25, 'sine', 0.15), 150);
  setTimeout(() => playCatcherBeep(392.00, 'sine', 0.3), 300);

  // Show Game Over Modal
  const modal = document.getElementById("catcherGameOverModal");
  if (modal) modal.style.display = "flex";

  const finalScoreVal = document.getElementById("catcherFinalScoreVal");
  if (finalScoreVal) finalScoreVal.innerText = catcherScore;

  // Custom greeting based on pet personality rules
  const modalText = document.getElementById("catcherGameOverText");
  if (modalText) {
    modalText.innerText = `เย้! ปะป๊ามะม๊าช่วยหนูเก็บเหรียญทองมาได้ตั้งเยอะแยะเลยค่ะ! ทั้งหมดนี้หนูยกให้ปะป๊ามะม๊านะคะ 💖`;
  }
}

function finishCoinCatcherGame() {
  // Pay rewards
  state.coins += catcherScore;
  
  if (state.questsProgress) {
    state.questsProgress.play = Math.min(1, (state.questsProgress.play || 0) + 1);
  }

  saveGameState();
  syncUI();

  // Return to mini game list
  stopCoinCatcherGame();
}

// Keydown and keyup listeners for keyboard input
window.addEventListener("keydown", function(e) {
  if (!catcherActive) return;
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    keysPressed.left = true;
  } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    keysPressed.right = true;
  }
});

window.addEventListener("keyup", function(e) {
  if (!catcherActive) return;
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
    keysPressed.left = false;
  } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
    keysPressed.right = false;
  }
});

