// js/screens/misc.js: ความสำเร็จ ความผูกพัน สำรองข้อมูล เมนูเพิ่มเติม
// Screen 19: Claim Achievement
function claimAchieve(achName) {
  state.gems += 20;
  syncUI();
  alert(`เคลมรางวัลความสำเร็จ "${achName}" เรียบร้อยแล้ว ได้รับ +20 เพชร 💎`);
}

// Screen 20: Interact Bond
function interactBond(act) {
  alert(`ทำกิจกรรม "${act}" สำเร็จ! ค่าความผูกพันเพิ่มขึ้น 🧡`);
}



// Screen 22: Backup data
function backupData() {
  alert("ระบบได้จัดเก็บข้อมูลสำรองความปลอดภัยขึ้นสู่คลาวด์สำเร็จแล้ว 💾");
}

// Screen 23: More Menu lists trigger
function triggerMenuAction(action) {
  alert(`กำลังเปิดลิงก์/หน้าต่างของกิจกรรม "${action}" ชั่วคราว... 🔔`);
}

function switchProfileTab(tabName) {
  const el = document.getElementById("profileTabInfo");
  if (el) el.style.display = "block";
  
  if (typeof renderDynamicPets === "function") {
    renderDynamicPets();
  }
}
