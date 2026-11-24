// js/games/cake-stack.js: มินิเกมต่อเค้ก
// ============================================================================
// CAKE STACK JUMP MINI-GAME
// ============================================================================
let cakeStackActive = false;
let cakeStackScore = 0;
let cakeStackLives = 3;
let cakeStackCakes = [];
let cakeStackIncoming = null;
let cakeStackPet = { x: 118, y: 24, vx: 0, vy: 0, width: 44, height: 44, jumping: false, onGround: true };
let cakeStackNextType = "🍰";
let cakeStackLoopId = null;
let cakeStackYOffset = 0;
let moveLeftPressed = false;
let moveRightPressed = false;

const CAKE_TYPES = ["🍰", "🍫", "🥞", "🧀", "🧁", "🌀", "🍩"];

function playCakeStackBeep(freq, type = 'sine', duration = 0.1) {
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

function handleCakeStackKeyDown(e) {
  if (!cakeStackActive) return;
  if (e.key === "ArrowLeft") {
    moveLeftPressed = true;
  } else if (e.key === "ArrowRight") {
    moveRightPressed = true;
  } else if (e.key === "ArrowUp" || e.key === " ") {
    triggerCakeStackJump();
    e.preventDefault();
  }
}

function handleCakeStackKeyUp(e) {
  if (!cakeStackActive) return;
  if (e.key === "ArrowLeft") {
    moveLeftPressed = false;
  } else if (e.key === "ArrowRight") {
    moveRightPressed = false;
  }
}

function startCakeStackGame() {
  if (!checkLevelUnlock(5, state.lang === "en" ? "Rainbow Block Tower Mini-game" : "มินิเกมหอคอยบล็อกสายรุ้ง")) return;
  cakeStackActive = true;
  cakeStackScore = 0;
  cakeStackLives = 3;
  cakeStackYOffset = 0;
  moveLeftPressed = false;
  moveRightPressed = false;
  cakeStackCakes = [];
  
  // Base Block (Centered square)
  cakeStackCakes.push({ x: 115, y: 0, width: 50, height: 50, type: "🧱" });
  
  cakeStackPet = { x: 118, y: 50, vx: 0, vy: 0, width: 44, height: 44, jumping: false, onGround: true };
  cakeStackNextType = "🧱";
  
  const gameArea = document.getElementById("cakeStackGameArea");
  if (gameArea) gameArea.style.display = "flex";
  
  const gameOverModal = document.getElementById("cakeGameOverModal");
  if (gameOverModal) gameOverModal.style.display = "none";
  
  window.addEventListener("keydown", handleCakeStackKeyDown);
  window.addEventListener("keyup", handleCakeStackKeyUp);
  
  spawnCakeStackIncoming();
  
  playCakeStackBeep(523.25, 'sine', 0.15); // C5
  setTimeout(() => playCakeStackBeep(659.25, 'sine', 0.15), 100);
  
  if (cakeStackLoopId) cancelAnimationFrame(cakeStackLoopId);
  cakeStackLoopId = requestAnimationFrame(updateCakeStackLoop);
}

function spawnCakeStackIncoming() {
  const topCake = cakeStackCakes[cakeStackCakes.length - 1];
  const targetY = topCake.y + 50;
  const dir = Math.random() > 0.5 ? 1 : -1;
  const startX = dir === 1 ? -50 : 280;
  const speed = 2.0 + Math.min(2.5, cakeStackScore * 0.12);
  
  cakeStackIncoming = {
    x: startX,
    y: targetY,
    width: 50,
    height: 50,
    dir: dir,
    speed: speed,
    type: cakeStackNextType,
    active: true
  };
  
  cakeStackNextType = "🧱";
  const nextVisual = document.getElementById("cakeStackNextVisual");
  if (nextVisual) nextVisual.innerText = "🧱";
}

function triggerCakeStackJump() {
  if (!cakeStackActive) return;
  if (cakeStackPet.onGround) {
    cakeStackPet.vy = 8.5;
    cakeStackPet.jumping = true;
    cakeStackPet.onGround = false;
    playCakeStackBeep(440, 'triangle', 0.12); // A4
  }
}

function moveCakeStackPetLeft(pressed) {
  moveLeftPressed = pressed;
}

function moveCakeStackPetRight(pressed) {
  moveRightPressed = pressed;
}

function stopCakeStackGame(giveRewards = false) {
  cakeStackActive = false;
  window.removeEventListener("keydown", handleCakeStackKeyDown);
  window.removeEventListener("keyup", handleCakeStackKeyUp);
  
  if (cakeStackLoopId) {
    cancelAnimationFrame(cakeStackLoopId);
    cakeStackLoopId = null;
  }
  
  if (giveRewards) {
    const coinsReward = Math.min(100, cakeStackScore * 3);
    const expReward = Math.min(50, cakeStackScore * 2);
    
    state.coins += coinsReward;
    state.exp += expReward;
    
    if (cakeStackScore > state.cakeStackHighScore) {
      state.cakeStackHighScore = cakeStackScore;
    }
    
    syncUI();
    
    // Show visual gain
    spawnCakeStackEffect(`+${coinsReward}🪙 +${expReward}⭐`);
    alert(state.lang === "en" 
      ? `Game Over! Blocks stacked: ${cakeStackScore} 🧱\n🎁 Rewards: +${coinsReward} 🪙 and +${expReward} ⭐ EXP! 💕`
      : `เกมจบแล้วค่ะ! วางบล็อกสำเร็จ: ${cakeStackScore} ชิ้น 🧱\n🎁 ได้รับรางวัล: +${coinsReward} 🪙 และ +${expReward} ⭐ EXP นะคะ 💕`);
  }
  
  const gameArea = document.getElementById("cakeStackGameArea");
  if (gameArea) gameArea.style.display = "none";
  
  const gameOverModal = document.getElementById("cakeGameOverModal");
  if (gameOverModal) gameOverModal.style.display = "none";
}

function updateCakeStackLoop() {
  if (!cakeStackActive) return;
  
  const topCake = cakeStackCakes[cakeStackCakes.length - 1];
  
  // Apply gravity if not on ground
  if (!cakeStackPet.onGround) {
    cakeStackPet.vy -= 0.45;
    cakeStackPet.y += cakeStackPet.vy;
  } else {
    cakeStackPet.vy = 0;
    cakeStackPet.y = topCake.y + 50;
  }
  
  // Apply X movement
  let vx = 0;
  if (moveLeftPressed) vx = -2.5;
  else if (moveRightPressed) vx = 2.5;
  
  cakeStackPet.x += vx;
  
  const playfieldWidth = 280;
  if (cakeStackPet.x < 0) cakeStackPet.x = 0;
  if (cakeStackPet.x > playfieldWidth - cakeStackPet.width) {
    cakeStackPet.x = playfieldWidth - cakeStackPet.width;
  }
  
  // Check if pet walked off the edge
  if (cakeStackPet.onGround) {
    if (cakeStackPet.x + 22 < topCake.x || cakeStackPet.x + 22 > topCake.x + topCake.width) {
      cakeStackPet.onGround = false;
    }
  }
  
  // Handle fall to ground
  if (cakeStackPet.y < 0) {
    playCakeStackBeep(180, 'sawtooth', 0.25);
    cakeStackLives--;
    if (cakeStackLives <= 0) {
      triggerCakeGameOver();
      return;
    } else {
      // Reset pet to top cake
      cakeStackPet.x = topCake.x + (topCake.width - cakeStackPet.width) / 2;
      cakeStackPet.y = topCake.y + 50;
      cakeStackPet.vy = 0;
      cakeStackPet.onGround = true;
      cakeStackPet.jumping = false;
    }
  }
  
  // Move incoming cake
  if (cakeStackIncoming && cakeStackIncoming.active) {
    cakeStackIncoming.x += cakeStackIncoming.dir * cakeStackIncoming.speed;
    
    // Check if cake slid past completely
    if ((cakeStackIncoming.dir === 1 && cakeStackIncoming.x > 280) || 
        (cakeStackIncoming.dir === -1 && cakeStackIncoming.x < -cakeStackIncoming.width)) {
      spawnCakeStackIncoming();
    }
    
    // Check if cake slides and hits the pet's feet/body (Crash)
    if (cakeStackPet.y < cakeStackIncoming.y + 50 && cakeStackPet.y + 36 > cakeStackIncoming.y) {
      const petLeft = cakeStackPet.x;
      const petRight = cakeStackPet.x + cakeStackPet.width;
      const cakeLeft = cakeStackIncoming.x;
      const cakeRight = cakeStackIncoming.x + cakeStackIncoming.width;
      
      if (petRight > cakeLeft && petLeft < cakeRight) {
        // CRASH - INSTANT DEATH!
        playCakeStackBeep(120, 'sawtooth', 0.5);
        cakeStackLives = 0;
        cakeStackIncoming.active = false;
        triggerCakeGameOver();
        return;
      }
    }
  }
  
  // Landing checks (Only check if pet is in the air and falling down)
  if (cakeStackPet.vy < 0 && !cakeStackPet.onGround) {
    // 1. Landing on incoming cake
    if (cakeStackIncoming && cakeStackIncoming.active) {
      if (cakeStackPet.y <= cakeStackIncoming.y + 54) {
        // Lenient horizontal check: as long as the block is overlapping the center stack area
        const isOverlapping = cakeStackIncoming.dir === 1 
          ? cakeStackIncoming.x >= 15 
          : cakeStackIncoming.x <= 215;
          
        if (isOverlapping) {
          // LANDED SUCCESSFULLY!
          cakeStackIncoming.active = false;
          
          // Always snap block to align straight in the stack
          cakeStackIncoming.x = 115;
          playCakeStackBeep(587.33, 'sine', 0.1);
          spawnCakeStackEffect("+1 🧱");
          
          cakeStackCakes.push(cakeStackIncoming);
          cakeStackScore++;
          
          cakeStackPet.y = cakeStackIncoming.y + 50;
          cakeStackPet.vy = 0;
          cakeStackPet.onGround = true;
          cakeStackPet.jumping = false;
          
          spawnCakeStackIncoming();
        }
      }
    }
    
    // 2. Landing back on the top cake in stack
    if (cakeStackPet.y <= topCake.y + 50 && cakeStackPet.y >= topCake.y + 38) {
      const petCenter = cakeStackPet.x + 22;
      if (petCenter >= topCake.x && petCenter <= topCake.x + topCake.width) {
        cakeStackPet.y = topCake.y + 50;
        cakeStackPet.vy = 0;
        cakeStackPet.onGround = true;
        cakeStackPet.jumping = false;
      }
    }
  }
  
  renderCakeStack();
  cakeStackLoopId = requestAnimationFrame(updateCakeStackLoop);
}

function triggerCakeGameOver() {
  cakeStackActive = false;
  playCakeStackBeep(147, 'sawtooth', 0.4);
  
  const gameOverModal = document.getElementById("cakeGameOverModal");
  if (gameOverModal) gameOverModal.style.display = "flex";
  
  const overMsg = document.getElementById("cakeGameOverMsg");
  if (overMsg) {
    overMsg.innerText = state.lang === "en"
      ? `Great job! You stacked blocks up to ${cakeStackScore} stories! 🧱`
      : `เก่งมากๆ เลยน้า! วางบล็อกต่อสูงได้ตั้ง ${cakeStackScore} ชั้นแน่ะ! 🧱`;
  }
  
  const coinsReward = Math.min(100, cakeStackScore * 3);
  const coinRewardEl = document.getElementById("cakeGameCoinReward");
  if (coinRewardEl) coinRewardEl.innerText = coinsReward;
}

function renderCakeStack() {
  const container = document.getElementById("cakeStackContainer");
  if (!container) return;
  
  // Smooth Camera follow: we want the top cake to be around 120px from the bottom
  const topCake = cakeStackCakes[cakeStackCakes.length - 1];
  const targetYOffset = Math.max(0, topCake.y - 120);
  cakeStackYOffset += (targetYOffset - cakeStackYOffset) * 0.1;
  
  container.style.transform = `translateY(${cakeStackYOffset}px)`;
  
  // Render cakes
  let cakesHtml = "";
  
  // Colors mapped by block level index
  const blockColors = [
    { bg: "#fecdd3", border: "#f43f5e", text: "#9f1239" }, // Rose Pink
    { bg: "#fed7aa", border: "#ea580c", text: "#7c2d12" }, // Orange
    { bg: "#fef08a", border: "#ca8a04", text: "#713f12" }, // Yellow
    { bg: "#bbf7d0", border: "#16a34a", text: "#14532d" }, // Green
    { bg: "#bfdbfe", border: "#2563eb", text: "#1e3a8a" }, // Blue
    { bg: "#e9d5ff", border: "#9333ea", text: "#581c87" }, // Purple
    { bg: "#fbcfe8", border: "#db2777", text: "#701a75" }  // Pink
  ];
  
  cakeStackCakes.forEach((cake, index) => {
    const style = blockColors[index % blockColors.length];
    cakesHtml += `
      <div style="position: absolute; bottom: ${cake.y}px; left: ${cake.x}px; width: ${cake.width}px; height: ${cake.height}px; background: linear-gradient(135deg, ${style.bg} 0%, rgba(255,255,255,0.2) 100%); border: 3px solid ${style.border}; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3); box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 900; color: ${style.text}; text-shadow: 0 1px 0 rgba(255,255,255,0.5); pointer-events: none; z-index: 2;">
        ${index + 1}
      </div>
    `;
  });
  
  // Render incoming cake (block)
  if (cakeStackIncoming && cakeStackIncoming.active) {
    const nextIndex = cakeStackCakes.length;
    const style = blockColors[nextIndex % blockColors.length];
    cakesHtml += `
      <div style="position: absolute; bottom: ${cakeStackIncoming.y}px; left: ${cakeStackIncoming.x}px; width: ${cakeStackIncoming.width}px; height: ${cakeStackIncoming.height}px; background: linear-gradient(135deg, ${style.bg} 0%, rgba(255,255,255,0.2) 100%); border: 3px solid ${style.border}; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3); box-sizing: border-box; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 900; color: ${style.text}; text-shadow: 0 1px 0 rgba(255,255,255,0.5); pointer-events: none; z-index: 2;">
        ${nextIndex + 1}
      </div>
    `;
  }
  
  // Render pet
  let overlaysHtml = "";
  const petScale = 40 / 110;
  const appSize = Math.round(52 * petScale);
  const equipped = getEquippedApparels();
  
  equipped.forEach(item => {
    let defaultTop = -22;
    if (item.category === "glasses") defaultTop = 8;
    else if (item.category === "wings") defaultTop = 15;
    else if (item.category === "outfit") defaultTop = 24;
    else if (item.category === "top") defaultTop = 24;
    else if (item.category === "bottom") defaultTop = 40;
    
    const topPos = Math.round(defaultTop * petScale);
    overlaysHtml += `<span style="position:absolute; top:${topPos}px; left:50%; transform:translateX(-50%); width:${appSize}px; height:${appSize}px; display:inline-block;">${getApparelVisual(item.id, appSize)}</span>`;
  });
  
  cakesHtml += `
    <div id="cakeStackPetEl" style="position: absolute; bottom: ${cakeStackPet.y}px; left: ${cakeStackPet.x}px; width: 44px; height: 44px; z-index: 10; display: flex; align-items: center; justify-content: center; pointer-events: none;">
      <div style="position:relative; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">
        ${getPetVisual(40)}
        ${overlaysHtml}
      </div>
    </div>
  `;
  
  container.innerHTML = cakesHtml;
  
  // Update header text/stats
  const countVal = document.getElementById("cakeStackCountVal");
  if (countVal) countVal.innerText = cakeStackScore;
  
  const highVal = document.getElementById("cakeStackHighScoreVal");
  if (highVal) highVal.innerText = state.cakeStackHighScore || 0;
  
  const scoreVal = document.getElementById("cakeStackScoreVal");
  if (scoreVal) scoreVal.innerText = `คะแนน: ${cakeStackScore}`;
  
  const livesContainer = document.getElementById("cakeStackLivesContainer");
  if (livesContainer) {
    let hearts = "";
    for (let i = 0; i < 3; i++) {
      hearts += i < cakeStackLives ? "❤️ " : "🖤 ";
    }
    livesContainer.innerText = hearts;
  }
}

function spawnCakeStackEffect(text) {
  const playfield = document.getElementById("cakeStackPlayfield");
  if (!playfield) return;
  
  const el = document.createElement("div");
  el.innerText = text;
  el.style.position = "absolute";
  el.style.bottom = `${cakeStackPet.y + 45}px`;
  el.style.left = `${cakeStackPet.x + 22}px`;
  el.style.transform = "translateX(-50%)";
  el.style.color = "#facc15";
  el.style.fontSize = "14px";
  el.style.fontWeight = "900";
  el.style.textShadow = "0 2px 4px rgba(0,0,0,0.5)";
  el.style.zIndex = "100";
  el.style.pointerEvents = "none";
  el.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
  
  playfield.appendChild(el);
  
  requestAnimationFrame(() => {
    el.style.transform = "translateX(-50%) translateY(-35px)";
    el.style.opacity = "0";
  });
  
  setTimeout(() => el.remove(), 800);
}
