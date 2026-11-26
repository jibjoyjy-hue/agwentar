// js/screens/select-pet.js: หน้าเลือกสัตว์เลี้ยง
const PET_TEMPLATES = [
  { id: "Bunny", name: "Bunny", emoji: "🐰" },
  { id: "Cat", name: "Cat", emoji: "🐱" },
  { id: "Puppy", name: "Puppy", emoji: "🐶" },
  { id: "Penguin", name: "Penguin", emoji: "🐧" },
  { id: "Panda", name: "Panda", emoji: "🐼" },
  { id: "Bear", name: "Bear", emoji: "🐻" },
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
    const stdPetKey = petLower === "gwentar" ? "bear" : petLower;
    const avatarHtml = (window.hasStandardPet && stdPetKey === "aimee")
      ? `<span style="display:inline-block; width:34px; height:34px;">${getStandardPetSvg(stdPetKey, 34, "")}</span>` // น้องตัวมาตรฐาน (หมีเป็น 2 มิติ)
      : `<img src="assets/${petLower}.png?v=12" style="width: 34px; height: 34px; object-fit: contain;" onerror="this.outerHTML='${p.emoji}'">`;
    
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

  if (state.lang === "en") {
    const screen2 = document.getElementById("screen-2");
    if (screen2) applyLanguageToNode(screen2, "en");
  }
}
