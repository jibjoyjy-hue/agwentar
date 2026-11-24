// js/games/coloring.js: มินิเกมระบายสี
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
