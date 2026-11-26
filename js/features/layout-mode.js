// layout-mode.js: ให้ผู้ใช้เลือกหน้าจอแบบ อัตโนมัติ / มือถือ / คอม
// ค่าเก็บใน localStorage แยกจาก state เพื่อให้ใช้ได้ตั้งแต่ก่อนโหลดข้อมูล (สคริปต์เล็กใน <head> ใช้ key เดียวกัน)
const LAYOUT_MODE_KEY = "gwentar_layout_mode";
const LAYOUT_MODES = ["auto", "mobile", "desktop"];
const DESKTOP_VIEWPORT_WIDTH = 1100; // ความกว้างที่จำลองเมื่อเลือกโหมดคอมบนจอแคบ

function getLayoutMode() {
  try {
    const m = localStorage.getItem(LAYOUT_MODE_KEY);
    return LAYOUT_MODES.includes(m) ? m : "auto";
  } catch (e) { return "auto"; }
}

function applyLayoutMode(mode) {
  const root = document.documentElement;
  root.classList.toggle("layout-mobile", mode === "mobile");
  root.classList.toggle("layout-desktop", mode === "desktop");
  // บนมือถือ (จอแคบ) โหมดคอมต้องขยาย viewport ให้เหมือนเปิดเว็บแบบเดสก์ท็อป
  const vp = document.querySelector('meta[name="viewport"]');
  if (vp) {
    const narrow = isNarrowScreen();
    const scale = (screen.width / DESKTOP_VIEWPORT_WIDTH).toFixed(3);
    const want = mode === "desktop" && narrow
      ? `width=${DESKTOP_VIEWPORT_WIDTH}, initial-scale=${scale}, viewport-fit=cover`
      : "width=device-width, initial-scale=1.0, viewport-fit=cover";
    if (vp.getAttribute("content") !== want) vp.setAttribute("content", want);
  }
  document.querySelectorAll(".layout-mode-seg button").forEach(b => {
    b.classList.toggle("active", b.dataset.layout === mode);
  });
}

function isNarrowScreen() {
  return Math.min(screen.width, screen.height) < 900 && screen.width < DESKTOP_VIEWPORT_WIDTH;
}

function setLayoutMode(mode) {
  if (!LAYOUT_MODES.includes(mode)) mode = "auto";
  const prev = getLayoutMode();
  try { localStorage.setItem(LAYOUT_MODE_KEY, mode); } catch (e) {}
  // มือถือ: เข้า/ออกโหมดคอมต้องโหลดหน้าใหม่ เพื่อให้เบราว์เซอร์ซูมหน้าจอใหม่ให้พอดี
  if (isNarrowScreen() && prev !== mode && (prev === "desktop" || mode === "desktop")) {
    if (typeof saveGameState === "function") { try { saveGameState(); } catch (e) {} }
    location.reload();
    return;
  }
  applyLayoutMode(mode);
  if (typeof renderDynamicPets === "function") setTimeout(renderDynamicPets, 50); // จัดตำแหน่งสัตว์ใหม่ตามขนาดจอ
}

document.addEventListener("DOMContentLoaded", () => applyLayoutMode(getLayoutMode()));
