// js/screens/bedroom.js: ห้องนอน นิทานก่อนนอน
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
  
  if (titleEl) titleEl.innerText = t(story.title);
  if (textEl) textEl.innerText = t(story.content);
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
