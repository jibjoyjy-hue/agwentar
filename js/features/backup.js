// backup.js: สำรองข้อมูลและกู้คืน (ข้อมูลเกมอยู่ใน localStorage ของเบราว์เซอร์)
//   - บันทึกไฟล์สำรอง (.json) หรือคัดลอกรหัสสำรอง (ข้อความยาว ขึ้นต้นด้วย GWB1:)
//   - กู้ข้อมูล: เลือกไฟล์ หรือวางรหัสสำรอง แล้วโหลดหน้าใหม่
const BACKUP_PREFIX = "GWB1:";

function backupCollect() {
  if (typeof saveGameState === "function") saveGameState();
  let data = null;
  try { data = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); } catch (e) {}
  if (!data) return null;
  let layout = null;
  try { layout = localStorage.getItem("gwentar_layout_mode"); } catch (e) {}
  return { app: "gwentar", v: 1, savedAt: new Date().toISOString(), data, layout };
}

function backupToCode(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return BACKUP_PREFIX + btoa(bin);
}

function backupFromText(text) {
  text = String(text || "").trim();
  let obj;
  if (text.startsWith(BACKUP_PREFIX)) {
    const bin = atob(text.slice(BACKUP_PREFIX.length).replace(/\s+/g, ""));
    const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
    obj = JSON.parse(new TextDecoder().decode(bytes));
  } else {
    obj = JSON.parse(text);
  }
  if (!obj || obj.app !== "gwentar" || typeof obj.data !== "object" || obj.data === null) throw new Error("not_gwentar");
  return obj;
}

// กันข้อความแปลก ๆ จากไฟล์ที่ถูกแก้: เปลี่ยน < > เป็นตัวเต็มความกว้าง เพื่อไม่ให้กลายเป็นโค้ด HTML
function backupSanitize(v) {
  if (typeof v === "string") return v.replace(/</g, "＜").replace(/>/g, "＞");
  if (Array.isArray(v)) return v.map(backupSanitize);
  if (v && typeof v === "object") {
    const o = {};
    for (const k of Object.keys(v)) o[k] = backupSanitize(v[k]);
    return o;
  }
  return v;
}

function backupDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function backupDownload() {
  const obj = backupCollect();
  if (!obj) { alert("ยังไม่มีข้อมูลให้สำรองค่ะ"); return; }
  const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `gwentar-backup-${backupDateStr()}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  backupNote("บันทึกไฟล์สำรองแล้ว เก็บไฟล์ไว้ในที่ปลอดภัย เช่น Google Drive หรือส่งเข้าไลน์ตัวเอง");
}

function backupCopyCode() {
  const obj = backupCollect();
  if (!obj) { alert("ยังไม่มีข้อมูลให้สำรองค่ะ"); return; }
  const code = backupToCode(obj);
  const done = () => backupNote("คัดลอกรหัสสำรองแล้ว นำไปวางเก็บไว้ เช่น ส่งเข้าแชตไลน์ของตัวเอง");
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(done, () => backupShowCode(code));
  } else {
    backupShowCode(code);
  }
}

function backupShowCode(code) {
  openBackupModal();
  const ta = document.getElementById("backupCodeInput");
  if (ta) { ta.value = code; ta.select(); }
  backupModalMsg("คัดลอกอัตโนมัติไม่ได้ ให้กดค้างที่ช่องด้านล่างแล้วเลือก คัดลอก", false);
}

function backupNote(text) {
  const el = document.getElementById("backupNote");
  if (el) { el.textContent = text; el.style.display = "block"; }
}

function openBackupModal() {
  const m = document.getElementById("backupModal");
  if (!m) return;
  const ta = document.getElementById("backupCodeInput");
  if (ta) ta.value = "";
  const f = document.getElementById("backupFileInput");
  if (f) f.value = "";
  backupModalMsg("", true);
  m.style.display = "flex";
}
function closeBackupModal() {
  const m = document.getElementById("backupModal");
  if (m) m.style.display = "none";
}
function backupModalMsg(text, ok) {
  const el = document.getElementById("backupModalMsg");
  if (!el) return;
  el.textContent = text;
  el.style.color = ok ? "#047857" : "#be123c";
}

function backupRestore(text) {
  let obj;
  try { obj = backupFromText(text); }
  catch (e) { backupModalMsg("ไฟล์หรือรหัสนี้ใช้ไม่ได้ ลองตรวจว่าคัดลอกมาครบทั้งหมด", false); return; }
  const d = obj.data;
  const when = obj.savedAt ? new Date(obj.savedAt).toLocaleString("th-TH") : "-";
  const ok = confirm(`กู้ข้อมูลจากที่สำรองไว้เมื่อ ${when}\nน้อง: ${d.petName || "-"} (เลเวล ${d.level ?? "-"})\n\nข้อมูลที่อยู่ในเครื่องนี้ตอนนี้จะถูกแทนที่ทั้งหมด ต้องการกู้ไหมคะ?`);
  if (!ok) return;
  try {
    if (typeof isResetting !== "undefined") isResetting = true; // กันระบบบันทึกอัตโนมัติเขียนทับ
    localStorage.setItem(SAVE_KEY, JSON.stringify(backupSanitize(d)));
    if (obj.layout === "mobile" || obj.layout === "desktop" || obj.layout === "auto") localStorage.setItem("gwentar_layout_mode", obj.layout);
  } catch (e) {
    if (typeof isResetting !== "undefined") isResetting = false;
    backupModalMsg("บันทึกข้อมูลลงเครื่องไม่ได้ (พื้นที่เต็ม หรือเบราว์เซอร์ไม่อนุญาต)", false);
    return;
  }
  alert("กู้ข้อมูลเรียบร้อย แอปจะโหลดใหม่ค่ะ ✨");
  location.reload();
}

function backupRestoreFromCode() {
  const ta = document.getElementById("backupCodeInput");
  if (!ta || !ta.value.trim()) { backupModalMsg("วางรหัสสำรองในช่องก่อนนะคะ", false); return; }
  backupRestore(ta.value);
}

function backupRestoreFromFile(input) {
  const file = input && input.files && input.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { backupModalMsg("ไฟล์ใหญ่เกินไป ไม่ใช่ไฟล์สำรองของแอปนี้", false); return; }
  const reader = new FileReader();
  reader.onload = () => backupRestore(reader.result);
  reader.onerror = () => backupModalMsg("อ่านไฟล์ไม่ได้", false);
  reader.readAsText(file);
}
