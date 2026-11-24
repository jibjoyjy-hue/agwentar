// js/screens/healing-music.js: ดนตรีบำบัด / เสียงธรรมชาติ
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
    const audio = new Audio("audio/" + sound.file);
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
      const audio = new Audio("audio/" + sound.file);
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
