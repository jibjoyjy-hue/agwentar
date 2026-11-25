// js/features/menu-icons.js: ไอคอน SVG ของแถบเมนู (สีชมพูตาม css/18-menu-theme.css)
// ใช้ SVG แทนอีโมจิ เพราะอีโมจิเปลี่ยนสีไม่ได้ ไอคอนใช้สี currentColor

const MENU_ICON_PATHS = {
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5v.01"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/>',
  check: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3"/><path d="M9 12l2 2 4-4"/>',
  book: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z"/><path d="M4 19a2 2 0 012-2h13"/><path d="M9 7h6"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 01-8 0V4z"/><path d="M8 6H5a3 3 0 003 4"/><path d="M16 6h3a3 3 0 01-3 4"/><path d="M12 13v4"/><path d="M8 20h8"/>',
  game: '<rect x="3" y="7" width="18" height="11" rx="4"/><path d="M8 11v4"/><path d="M6 13h4"/><path d="M15.5 12h.01"/><path d="M17.5 14h.01"/>',
  shop: '<path d="M4 9l1.5-5h13L20 9"/><path d="M4 9h16v2a3 3 0 01-5 2 3 3 0 01-6 0 3 3 0 01-5-2V9z"/><path d="M5 13v7h14v-7"/>',
  bag: '<path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  gear: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
  egg: '<path d="M12 3c3.5 0 6.5 5 6.5 10a6.5 6.5 0 01-13 0C5.5 8 8.5 3 12 3z"/>',
  crown: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8z"/>',
  gift: '<rect x="3" y="9" width="18" height="4" rx="1"/><path d="M5 13v8h14v-8"/><path d="M12 9v12"/><path d="M12 9C10 5 6.5 5 7 7.5S12 9 12 9zM12 9c2-4 5.5-4 5-1.5S12 9 12 9z"/>',
};

function menuSvg(name) {
  const p = MENU_ICON_PATHS[name];
  return p ? `<svg class="menu-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>` : "";
}

// หน้าจอ -> ไอคอน
const NAV_ICON_BY_SCREEN = {
  "screen-1": "home", "screen-2": "egg", "screen-3": "info", "screen-4": "map", "screen-11": "check",
  "screen-12": "book", "screen-14": "trophy", "screen-15": "game", "screen-16": "shop",
  "screen-17": "bag", "screen-24": "music", "screen-22": "gear",
};

function applyMenuIcons() {
  document.querySelectorAll(".app-bottom-nav .nav-tab").forEach(tab => {
    const icon = NAV_ICON_BY_SCREEN[tab.dataset.tab];
    const box = tab.querySelector(".nav-icon");
    if (icon && box && !box.querySelector("svg")) box.innerHTML = menuSvg(icon);
  });
  const set = (sel, name) => { const b = document.querySelector(sel); if (b && !b.querySelector("svg")) b.innerHTML = menuSvg(name); };
  set("#appHeader .premium-btn", "crown");
  set("#appHeader .gift-noti-btn", "gift");
  set("#appHeader .gear-settings-btn", "gear");
}
document.addEventListener("DOMContentLoaded", applyMenuIcons);
