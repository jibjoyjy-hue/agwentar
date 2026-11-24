// js/screens/diary.js: ไดอารี่ ปฏิทิน เช็กอิน และสถิติอารมณ์
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

  if (typeof safetyHasRisk === "function" && safetyHasRisk(journalText)) {
    setTimeout(() => openSafetyHelp("risk"), 300);
  }
  
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
    state.exp += 50;
    
    saveGameState();
    syncUI();
    
    if (typeof renderMoodAnalytics === "function") renderMoodAnalytics();
    spawnVisualEffect("stat", "btnSaveDiary", "📝 +50🪙 +50⭐");
    alert(`หนูบันทึกไดอารี่ลงเล่มให้เรียบร้อยแล้วนะคะปะป๊ามะม๊า! 📝✨\n🎁 ได้รับรางวัลประจำวัน: +50 🪙 และ +50 ⭐ EXP ด้วยน้าาา 💕`);
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
