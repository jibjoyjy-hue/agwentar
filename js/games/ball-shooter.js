// js/games/ball-shooter.js: มินิเกมลูกบอลอารมณ์
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
  if (!checkLevelUnlock(15, "มินิเกมลูกบอลอารมณ์")) return;
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
  // ไม่มีเส้นเดดไลน์: เกมนี้ไม่มีการแพ้ (ข้อ 14)
  
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
        // ลูกบอลลงมาถึงด้านล่าง: ปล่อยลูกที่อยู่ต่ำสุดให้ลอยขึ้นฟ้า แล้วเล่นต่อได้ ไม่มีการแพ้
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            const b = shooterGrid[r][c];
            if (b && getBubbleCoords(r, c).y >= 250) { shooterAddFloater(r, c, b); shooterGrid[r][c] = null; }
          }
        }
      }
      
      // Load next ball
      spawnNextShotBall(canvas);
    }
  }
  
  // ลูกบอลที่ถูกปล่อย ลอยขึ้นและจางหายไป
  shooterDrawFloaters(ctx);

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
    // ปล่อยให้ลอยขึ้นฟ้า ทุกอารมณ์ได้คะแนนเท่ากัน
    matches.forEach(([r, c]) => {
      shooterAddFloater(r, c, shooterGrid[r][c]);
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
        shooterAddFloater(r, c, shooterGrid[r][c]);
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
    
    if (shooterScore > shooterHighScore) shooterHighScore = shooterScore;
    syncUI();
    if (coinsEarned > 0) alert(`🎈 ปล่อยลูกบอลอารมณ์ลอยไปได้ ${shooterScore} คะแนน ได้รับ +${coinsEarned} เหรียญทอง 🪙`);
  }
}


// ---- ลูกบอลที่ลอยขึ้นฟ้า (แทนการ "ระเบิด") ----
let shooterFloaters = [];
function shooterAddFloater(r, c, bubble) {
  if (!bubble) return;
  const p = getBubbleCoords(r, c);
  shooterFloaters.push({ x: p.x, y: p.y, color: bubble.color, emoji: bubble.emoji, life: 1, drift: (Math.random() - 0.5) * 0.6 });
}
function shooterDrawFloaters(ctx) {
  const r = (typeof shooterCellWidth === "number" ? shooterCellWidth : 32) / 2 - 1;
  shooterFloaters = shooterFloaters.filter(f => f.life > 0);
  shooterFloaters.forEach(f => {
    f.y -= 1.6; f.x += f.drift; f.life -= 0.012;
    ctx.globalAlpha = Math.max(0, f.life);
    ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, Math.PI * 2); ctx.fillStyle = f.color; ctx.fill();
    ctx.beginPath(); ctx.moveTo(f.x, f.y + r); ctx.lineTo(f.x, f.y + r + 10); ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.font = `${Math.round(r * 1.3)}px sans-serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(f.emoji, f.x, f.y + 0.5);
    ctx.globalAlpha = 1;
  });
}
