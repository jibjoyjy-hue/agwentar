// js/games/coin-catcher.js: มินิเกมรับเหรียญ
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
  
  let overlaysHtml = "";
  const equipped = getEquippedApparels();
  
  equipped.forEach(item => {
    let defaultTop = -22; // hat
    if (item.category === "glasses") defaultTop = 8;
    else if (item.category === "wings") defaultTop = 15;
    else if (item.category === "outfit") defaultTop = 24;
    else if (item.category === "top") defaultTop = 24;
    else if (item.category === "bottom") defaultTop = 40;
    
    const topPos = Math.round(defaultTop * petScale);
    overlaysHtml += `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(item.id, appSize)}</span>`;
  });
  
  container.innerHTML = `
    <div style="position:relative; width:${sizePx}px; height:${sizePx}px; display:flex; align-items:center; justify-content:center;">
      ${getPetVisual(sizePx)}
      ${overlaysHtml}
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
