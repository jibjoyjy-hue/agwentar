// js/screens/settings-music.js: เพลงพื้นหลังในหน้าตั้งค่า
// ============================================================================
// SETTINGS BACKGROUND MUSIC CONTROL SYSTEM
// ============================================================================
let settingsMusicAudio = null;
let settingsMusicCurrentFile = "none";

function changeSettingsMusic(filename) {
  settingsMusicCurrentFile = filename;
  
  if (settingsMusicAudio && !settingsMusicAudio.paused) {
    stopSettingsMusicTrack();
    if (filename !== "none") {
      playSettingsMusicTrack();
    }
  }
}

function playSettingsMusicTrack() {
  if (settingsMusicCurrentFile === "none") {
    alert("โปรดเลือกเพลงประกอบในเมนูก่อนกดเล่นค่ะ 🎵");
    return;
  }
  
  if (settingsMusicAudio) {
    settingsMusicAudio.pause();
    settingsMusicAudio = null;
  }
  
  const volSlider = document.getElementById("musicSlider");
  const currentVolume = volSlider ? parseInt(volSlider.value) / 100 : 0.6;
  
  settingsMusicAudio = new Audio("audio/" + settingsMusicCurrentFile);
  settingsMusicAudio.loop = true;
  settingsMusicAudio.volume = currentVolume;
  
  settingsMusicAudio.play().then(() => {
    const playBtn = document.getElementById("btnPlaySettingsMusic");
    if (playBtn) playBtn.innerText = "⏸️ หยุดชั่วคราว";
  }).catch(err => {
    console.error("Settings music playback failed:", err);
  });
}

function stopSettingsMusicTrack() {
  if (settingsMusicAudio) {
    settingsMusicAudio.pause();
    settingsMusicAudio = null;
  }
  const playBtn = document.getElementById("btnPlaySettingsMusic");
  if (playBtn) playBtn.innerText = "▶️ เล่นเพลง";
  
  const selectEl = document.getElementById("settingsMusicSelect");
  if (selectEl && settingsMusicCurrentFile === "none") {
    // If stopped, we can reset select display
  }
}

function toggleSettingsMusic() {
  if (settingsMusicAudio && !settingsMusicAudio.paused) {
    stopSettingsMusicTrack();
  } else {
    playSettingsMusicTrack();
  }
}
