import sys

with open('C:/Users/Joy/Desktop/โครงงานจริงเเท้/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''  // Wait for the animation to finish (4 seconds), then show the Rebirth Modal Choices!
  setTimeout(() => {
    // Show rebirth modal overlay
    const rebirthModal = document.getElementById("modalRebirth");
    if (rebirthModal) {
      rebirthModal.style.display = "flex";
    }
    
    const pName = document.getElementById("rebirthPetName");
    if (pName) pName.innerText = state.petName;
    
    document.getElementById("rebirthStepGender").style.display = "block";
    document.getElementById("rebirthStepPath").style.display = "none";
    
    // Reset background light
    if (celestialBg) {
      celestialBg.style.background = "radial-gradient(circle, rgba(253, 224, 71, 0) 0%, rgba(30, 27, 75, 0) 100%)";
    }
    
    // Hide petWrapper temporarily until they make a choice
    if (petWrapper) {
      petWrapper.style.opacity = "0";
    }
  }, 4000);'''

replacement = '''  // Wait for the animation to finish (4 seconds), then trigger DEATH!
  setTimeout(() => {
    // Reset background light
    if (celestialBg) {
      celestialBg.style.background = "radial-gradient(circle, rgba(253, 224, 71, 0) 0%, rgba(30, 27, 75, 0) 100%)";
    }
    
    // Death & Reset to Egg Logic
    alert(สัตว์เลี้ยงของคุณได้จากไปแล้ว... ขอบคุณที่ดูแลกันมาจนถึงเลเวล 90 นะ! 😇);
    
    // Hard reset state to Egg
    state.petSpecies = "egg";
    state.petName = "Joy Blob";
    state.level = 0;
    state.exp = 0;
    state.hp = 20;
    state.hpMax = 50;
    state.energy = 20;
    state.energyMax = 50;
    state.isRebirthTriggered = false;
    
    saveState();
    
    if (petWrapper) {
      petWrapper.classList.remove("pet-float-fade-animation");
      petWrapper.style.opacity = "1";
    }
    
    updateUI();
    updatePetAvatar();
    
    // Force open Pet Selection screen
    openModal('modalPetSelection');
    
  }, 4000);'''

if target in content:
    content = content.replace(target, replacement)
    with open('C:/Users/Joy/Desktop/โครงงานจริงเเท้/app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Success: Replaced using Python.")
else:
    print("Error: Target not found in Python script.")