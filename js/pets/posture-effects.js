// js/pets/posture-effects.js: ท่าทาง คำพูด เอฟเฟกต์ และการลากสัตว์เลี้ยง
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

function initPetDragAndDrop() {
  document.querySelectorAll(".dynamic-pet-display").forEach(pet => {
    let isDragging = false;
    let startX = 0, startY = 0;
    let originalLeft = 0, originalTop = 0;
    
    pet.addEventListener("pointerdown", (e) => {
      // Prevent dragging pet container in dressing mode
      if (pet.getAttribute("data-state") === "dressing") return;
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
