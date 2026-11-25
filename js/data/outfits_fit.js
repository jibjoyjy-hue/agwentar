// ชุดตัดตามตัวน้อง: ใช้สัดส่วนจริงของน้องแต่ละตัว (คอ ไหล่ เอว สะโพก แขน ขา) มาสร้างชุด
// - เสื้อ = ผ้าคลุมลำตัวตามรูปทรงน้อง
// - แขนสั้น/แขนยาว/ไม่มีแขน = คลุมแขนน้องแค่ส่วนที่ชุดคลุมจริง ส่วนที่เหลือเห็นแขนน้อง
// - กระโปรงเริ่มที่เอวน้องและบานตามความกว้างตัวน้อง / กางเกงคลุมขาน้องพอดีขา
// พิกัด 0–100 เท่ากรอบรูปน้อง (รูปวางแบบ contain)
(function () {
  // ---------- สัดส่วนน้อง (วัดจากรูปจริง) ----------
  // neck: แนวคอ, tL/tR: ขอบไหล่ซ้าย/ขวา, waist/wL/wR: แนวเอวและขอบ, hip: จุดเริ่มขา
  // legs: [[x1,x2], ...] ช่วงขา, bottom: ปลายเท้า, arms: [[ไหล่x,ไหล่y, มือx,มือy, รัศมี], ...]
  const BODY = {
    aimee:    { neck: 45, tL: 31, tR: 73, waist: 60, wL: 34, wR: 70, hip: 62, legs: [[36, 51], [54, 69]], bottom: 78, arms: [[33, 49, 27, 61, 4.5], [71, 49, 75, 60, 4]] },
    blob:     { neck: 57, tL: 13, tR: 96, waist: 76, wL: 12, wR: 98, hip: 88, legs: [], bottom: 88, arms: [[32, 63, 26, 67, 3.5], [83, 63, 89, 67, 3.5]] },
    bunny:    { neck: 53, tL: 37, tR: 78, waist: 80, wL: 34, wR: 80, hip: 87, legs: [[38, 54], [57, 74]], bottom: 98, arms: [[37, 57, 45, 71, 3.5], [72, 57, 65, 71, 3.5]] },
    cat:      { neck: 51, tL: 14, tR: 60, waist: 80, wL: 17, wR: 58, hip: 85, legs: [[20, 37], [38, 56]], bottom: 98, arms: [[13, 58, 9, 72, 4.5], [59, 58, 63, 72, 4.5]] },
    puppy:    { neck: 52, tL: 31, tR: 84, waist: 80, wL: 36, wR: 80, hip: 86, legs: [[39, 56], [59, 77]], bottom: 98, arms: [[31, 57, 28, 72, 4.5], [84, 57, 87, 72, 4.5]] },
    penguin:  { neck: 47, tL: 25, tR: 85, waist: 82, wL: 27, wR: 85, hip: 90, legs: [[31, 47], [59, 77]], bottom: 97, arms: [[27, 53, 17, 69, 4.5], [83, 53, 92, 69, 4.5]] },
    bear:     { neck: 57, tL: 30, tR: 72, waist: 82, wL: 33, wR: 69, hip: 86, legs: [[35, 50], [52, 67]], bottom: 92, arms: [[31, 62, 27, 78, 4.5], [70, 62, 74, 78, 4.5]] },
    panda:    { neck: 54, tL: 24, tR: 78, waist: 84, wL: 25, wR: 72, hip: 86, legs: [[25, 43], [51, 69]], bottom: 97, arms: [[24, 58, 18, 76, 6.5], [77, 58, 81, 76, 6.5]] },
    fox:      { neck: 55, tL: 15, tR: 61, waist: 87, wL: 17, wR: 59, hip: 90, legs: [[17, 35], [37, 58]], bottom: 99, arms: [[15, 62, 8, 76, 4.5], [61, 62, 66, 76, 4.5]] },
    chick:    { neck: 52, tL: 22, tR: 92, waist: 82, wL: 25, wR: 88, hip: 89, legs: [[37, 53], [63, 78]], bottom: 98, arms: [[26, 56, 19, 70, 4.5], [85, 56, 96, 70, 4.5]] },
    otter:    { neck: 46, tL: 26, tR: 80, waist: 84, wL: 28, wR: 79, hip: 88, legs: [[31, 49], [59, 76]], bottom: 98, arms: [[32, 52, 44, 60, 4], [77, 52, 63, 60, 4]] },
    hamster:  { neck: 52, tL: 20, tR: 80, waist: 84, wL: 21, wR: 80, hip: 88, legs: [[24, 39], [57, 72]], bottom: 93, arms: [[34, 57, 37, 68, 3.5], [65, 57, 62, 68, 3.5]] },
    dino:     { neck: 54, tL: 9, tR: 60, waist: 85, wL: 12, wR: 58, hip: 88, legs: [[18, 33], [41, 57]], bottom: 98, arms: [[13, 57, 9, 72, 4], [45, 57, 43, 69, 3.5]] },
    pig:      { neck: 53, tL: 13, tR: 82, waist: 86, wL: 18, wR: 80, hip: 89, legs: [[21, 50], [53, 79]], bottom: 98, arms: [[15, 58, 14, 77, 4], [77, 58, 79, 77, 4]] },
    capybara: { neck: 52, tL: 16, tR: 84, waist: 82, wL: 15, wR: 85, hip: 86, legs: [[16, 34], [66, 85]], bottom: 97, arms: [[43, 70, 41, 95, 4.5], [57, 70, 59, 95, 4.5]] },
    parrot:   { neck: 46, tL: 18, tR: 76, waist: 82, wL: 22, wR: 72, hip: 88, legs: [[29, 43], [54, 70]], bottom: 97, arms: [[24, 52, 20, 70, 4.5], [68, 52, 76, 78, 6]] },
    giraffe:  { neck: 60, tL: 30, tR: 84, waist: 82, wL: 28, wR: 86, hip: 86, legs: [[27, 45], [51, 71]], bottom: 95, arms: [[36, 70, 35, 90, 4.5], [61, 70, 61, 90, 4.5]] },
    elephant: { neck: 58, tL: 22, tR: 84, waist: 82, wL: 23, wR: 84, hip: 84, legs: [[25, 59], [66, 84]], bottom: 95, arms: [[24, 60, 23, 77, 4.5], [82, 60, 83, 77, 4.5]] },
  };

  // ---------- แบบชุด ----------
  // top: สีเสื้อ, pat: ลาย, sleeve: none/short/long, bottom: skirt/gown/tutu/pants/tail/none
  const SPEC = {
    F1:  { top: "#f472b6", line: "#be185d", sleeve: "short", sc: "#f9a8d4", puff: true, bottom: "skirt", bc: ["#ffc2dc", "#f472b6"], feet: "#ec4899", collar: "#fff0f7", deco: "heart", trim: "#fde047" },
    F2:  { top: "#1d4ed8", line: "#1e3a8a", sleeve: "none", bottom: "gown", bc: ["#60a5fa", "#1e3a8a"], feet: null, deco: "sash", sparkles: true },
    F3:  { top: "#fde047", line: "#a16207", sleeve: "short", sc: "#fef9c3", puff: true, bottom: "skirt", bc: ["#fde047", "#facc15"], pat: "sunflower", feet: "#b45309", collar: "#ffffff", deco: "buttons" },
    F5:  { top: "#ffffff", line: "#6b21a8", sleeve: "short", sc: "#ffffff", puff: true, bottom: "tutu", feet: "#a78bfa", deco: "rainbowband" },
    F8:  { top: "#facc15", line: "#111827", sleeve: "short", sc: "#fde047", bottom: "skirt", bc: ["#facc15", "#eab308"], pat: "beestripes", topPat: "beestripes", feet: "#111827", wings: true },
    F9:  { top: "#6ee7b7", line: "#047857", sleeve: "short", sc: "#d1fae5", puff: true, bottom: "skirt", bc: ["#a7f3d0", "#6ee7b7"], pat: "dots", feet: "#f9a8d4", collar: "#ffffff", deco: "bow" },
    F11: { top: "#f8fafc", line: "#475569", sleeve: "long", sc: "#f8fafc", bottom: "pants", bc: ["#f8fafc"], feet: "#f97316", deco: "astro" },
    F12: { top: "#ffffff", line: "#334155", sleeve: "long", sc: "#ffffff", topPat: "redstripes", bottom: "pants", bc: ["#1f2937"], feet: "#78350f", deco: "vest" },
    F13: { top: null, line: "#065f46", sleeve: "none", bottom: "tail", bc: ["#34d399", "#047857"], shell: ["#a78bfa", "#6d28d9"] },
    F14: { top: "#cbd5e1", line: "#334155", sleeve: "long", sc: "#94a3b8", bottom: "pants", bc: ["#94a3b8"], feet: "#475569", deco: "robot" },
    F15: { top: null, line: "#7c3aed", sleeve: "none", bottom: "tail", bc: ["#f9a8d4", "#c4b5fd"], shell: ["#99f6e4", "#0f766e"] },
    F16: { top: "#fdba74", line: "#c2410c", sleeve: "long", sc: "#fdba74", bottom: "pants", bc: ["#fdba74"], feet: "#fff7ed", belly: "#fff7ed", zip: true, tail: "cat", pat2: "tabby" },
    F17: { top: "#f8fafc", line: "#94a3b8", sleeve: "long", sc: "#f8fafc", bottom: "pants", bc: ["#f8fafc"], feet: "#fbcfe8", belly: "#fbcfe8", zip: true, tail: "pom" },
    F18: { top: "#f8fafc", line: "#334155", sleeve: "long", sc: "#1f2937", bottom: "pants", bc: ["#1f2937"], feet: "#1f2937", belly: "#e2e8f0", zip: true },
    F19: { top: "#fbbf24", line: "#a16207", sleeve: "long", sc: "#fbbf24", bottom: "pants", bc: ["#fbbf24"], feet: "#fef3c7", belly: "#fef3c7", zip: true, tail: "lion", mane: true },
    F20: { top: "#a16207", line: "#451a03", sleeve: "long", sc: "#a16207", bottom: "pants", bc: ["#a16207"], feet: "#fde68a", belly: "#fde68a", zip: true, tail: "bear" },
    F21: { top: "#60a5fa", line: "#1e40af", sleeve: "long", sc: "#60a5fa", bottom: "pants", bc: ["#60a5fa"], feet: "#f8fafc", belly: "#f8fafc", zip: true, tail: "shark" },
    F22: { top: "#fdf2f8", line: "#db2777", sleeve: "long", sc: "#fdf2f8", bottom: "pants", bc: ["#fdf2f8"], feet: "#c4b5fd", belly: "#fbcfe8", zip: true, tail: "rainbow" },
    F24: { top: "#ea580c", line: "#7c2d12", sleeve: "long", sc: "#ea580c", bottom: "pants", bc: ["#ea580c"], feet: "#fed7aa", belly: "#fed7aa", zip: true, tail: "squirrel" },
  };

  const n1 = (v) => (+v).toFixed(1);
  // น้องที่แขนไม่แยกจากลำตัวชัดเจน (ชุดคลุมทั้งตัว ไม่ทำแขนเสื้อแยก)
  const ARMLESS = new Set(["bear", "capybara", "giraffe", "elephant", "aimee", "parrot", "dino"]);
  // แคปซูล (รูปแขน) จากจุด a ถึง b รัศมี r ตั้งแต่สัดส่วน t0 ถึง t1
  function capsule(arm, t0, t1, grow = 0) {
    const [sx, sy, hx, hy, r0] = arm, r = r0 + grow;
    const ax = sx + (hx - sx) * t0, ay = sy + (hy - sy) * t0;
    const bx = sx + (hx - sx) * t1, by = sy + (hy - sy) * t1;
    let dx = bx - ax, dy = by - ay; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
    const nx = -dy * r, ny = dx * r;
    return `<path d="M${n1(ax + nx)},${n1(ay + ny)} L${n1(bx + nx)},${n1(by + ny)} A${r},${r} 0 0 1 ${n1(bx - nx)},${n1(by - ny)} L${n1(ax - nx)},${n1(ay - ny)} A${r},${r} 0 0 1 ${n1(ax + nx)},${n1(ay + ny)}Z"/>`;
  }
  // คอเสื้อโค้งลงตรงกลางตามคาง (ไม่เป็นเส้นตรง)
  const neckCurve = (B) => `M${B.tL - 1},${B.neck - 1.5} Q${n1((B.tL + B.tR) / 2)},${B.neck + 5} ${B.tR + 1},${B.neck - 1.5}`;
  const torsoPoly = (B, yBot = B.hip) =>
    `<path d="${neckCurve(B)} L${B.wR + 1},${B.waist} L${B.wR + 1},${yBot} L${B.wL - 1},${yBot} L${B.wL - 1},${B.waist}Z"/>`;
  const legRects = (B, y1, y2) => B.legs.map(([a, b]) => `<rect x="${a - 1}" y="${n1(y1)}" width="${b - a + 2}" height="${n1(y2 - y1)}"/>`).join("");
  const sleeveRange = (s) => (s === "long" ? [0, 0.92] : s === "short" ? [0, 0.38] : null);

  function wear(u, id, petKey) {
    const B = BODY[petKey], S = SPEC[id];
    if (!B || !S) return null;
    const img = `<image href="assets/${petKey}.png?v=11" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet"/>`;
    const span = B.bottom - B.hip, foot = B.bottom - Math.max(3, 0.35 * span);
    const cx = (B.tL + B.tR) / 2, wcx = (B.wL + B.wR) / 2, tw = B.wR - B.wL, chestW = B.tR - B.tL;
    const sr = sleeveRange(S.sleeve);
    let defs = "", out = "";

    defs += `<mask id="${u}pm" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">${img}</mask>`;
    defs += `<filter id="${u}ed" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feMorphology in="SourceAlpha" operator="erode" radius="0.9" result="er"/><feComposite in="SourceAlpha" in2="er" operator="out" result="rim"/><feFlood flood-color="${S.line}"/><feComposite in2="rim" operator="in"/></filter>`;
    defs += `<linearGradient id="${u}sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".14"/></linearGradient>`;
    // ลายผ้า
    defs += `<pattern id="${u}rs" patternUnits="userSpaceOnUse" width="10" height="5"><rect width="10" height="5" fill="#fff"/><rect y="3" width="10" height="2" fill="#dc2626"/></pattern>`;
    defs += `<pattern id="${u}bs" patternUnits="userSpaceOnUse" width="10" height="9"><rect width="10" height="9" fill="#facc15"/><rect y="5" width="10" height="4" fill="#1f2937"/></pattern>`;
    defs += `<pattern id="${u}dt" patternUnits="userSpaceOnUse" width="7" height="7"><circle cx="2" cy="2" r="1.1" fill="#fff"/><circle cx="5.5" cy="5.5" r="1.1" fill="#fff"/></pattern>`;
    defs += `<pattern id="${u}sf" patternUnits="userSpaceOnUse" width="11" height="10"><g transform="translate(3 3)">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<ellipse cx="${n1(2 * Math.cos(i * 0.785))}" cy="${n1(2 * Math.sin(i * 0.785))}" rx="1" ry="1" fill="#f59e0b"/>`).join("")}<circle r="1.2" fill="#78350f"/></g></pattern>`;
    defs += `<pattern id="${u}sc" patternUnits="userSpaceOnUse" width="6" height="4"><path d="M0,4 Q3,0 6,4" fill="none" stroke="#000" stroke-opacity=".18" stroke-width=".6"/></pattern>`;
    defs += `<pattern id="${u}tb" patternUnits="userSpaceOnUse" width="12" height="7"><rect width="12" height="7" fill="none"/><path d="M1,2 L5,3 M7,5 L11,6" stroke="#c2410c" stroke-width="1.3" stroke-linecap="round"/></pattern>`;
    const topFill = S.topPat === "redstripes" ? `url(#${u}rs)` : S.topPat === "beestripes" ? `url(#${u}bs)` : S.top;

    // แขนของน้องตัดตามเส้นขอบจริง (assets/petmasks) — น้องที่แขนไม่แยกจากตัวชัด ชุดจะคลุมทั้งตัว
    const hasArms = !ARMLESS.has(petKey);
    const fillRects = (fill) => `<rect x="0" y="0" width="100" height="100" fill="${fill}"/>${S.pat2 === "tabby" ? `<rect x="0" y="0" width="100" height="100" fill="url(#${u}tb)"/>` : ""}<rect x="0" y="0" width="100" height="100" fill="url(#${u}sh)"/>`;
    if (hasArms) {
      defs += `<mask id="${u}am" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><image href="assets/petmasks/${petKey}_arms.png?v=1" x="0" y="0" width="100" height="100"/></mask>`;
      defs += `<mask id="${u}nm" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><image href="assets/petmasks/${petKey}_noarms.png?v=1" x="0" y="0" width="100" height="100"/></mask>`;
    }
    // แขนยาว: เสื้อคลุมแขนไปด้วยได้เลย / แขนสั้นหรือไม่มีแขน: เว้นแขนน้องไว้
    const noArms = (inner) => (hasArms && S.sleeve !== "long" ? `<g mask="url(#${u}nm)">${inner}</g>` : inner);
    // ---------- 1) เสื้อ: คลุมลำตัวตามรูปน้อง (ไม่ทับแขน) ----------
    if (S.top) {
      defs += `<clipPath id="${u}tc">${torsoPoly(B)}</clipPath>`;
      out += `<g mask="url(#${u}pm)">${noArms(`<g clip-path="url(#${u}tc)">${fillRects(topFill)}</g>`)}</g>`;
      out += `<g clip-path="url(#${u}tc)">${noArms(`<g filter="url(#${u}ed)">${img}</g>`)}</g>`;
      out += `<path d="${neckCurve(B)}" fill="none" stroke="${S.line}" stroke-width="1.3" mask="url(#${u}pm)"/>`;
    }
    // ---------- 2) แขนเสื้อ: คลุมแขนน้องตามรูปแขนจริง ยาวแค่ไหนตามแบบชุด ----------
    if (sr && hasArms) {
      const sl = B.arms.map((a) => capsule(a, -0.4, sr[1], 9)).join("");
      defs += `<clipPath id="${u}sl">${sl}</clipPath>`;
      const sFill = S.topPat ? topFill : S.sc;
      out += `<g mask="url(#${u}am)"><g clip-path="url(#${u}sl)">${fillRects(sFill)}</g></g>`;
      if (S.sleeve === "long") {
        // เก็บส่วนแขนที่อยู่นอกเส้นขอบแขน (ไหล่/ข้างตัว) ให้คลุมหมด
        defs += `<clipPath id="${u}sw">${B.arms.map((a) => capsule(a, -0.3, sr[1], 2.5)).join("")}</clipPath>`;
        out += `<g mask="url(#${u}pm)"><g clip-path="url(#${u}sw)">${fillRects(sFill)}</g></g>`;
        out += `<g clip-path="url(#${u}sw)"><g filter="url(#${u}ed)">${img}</g></g>`;
      }
      out += `<g clip-path="url(#${u}sl)"><g mask="url(#${u}am)"><g filter="url(#${u}ed)">${img}</g></g></g>`;
      // ขอบปลายแขนเสื้อ (ตัดพอดีแขน)
      let cuffs = "";
      B.arms.forEach((a) => {
        const [sx, sy, hx, hy, r] = a, t = sr[1];
        const ex = sx + (hx - sx) * t, ey = sy + (hy - sy) * t;
        let dx = hx - sx, dy = hy - sy; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
        const nx = -dy * (r + 6), ny = dx * (r + 6);
        cuffs += `<path d="M${n1(ex + nx)},${n1(ey + ny)} L${n1(ex - nx)},${n1(ey - ny)}" stroke="${S.line}" stroke-width="1.5"/>`;
        if (S.puff && S.sleeve === "short") {
          const mx = sx + (hx - sx) * 0.15, my = sy + (hy - sy) * 0.15;
          out += `<ellipse cx="${n1(mx)}" cy="${n1(my)}" rx="${n1(r + 1.6)}" ry="${n1(r + 0.6)}" fill="${S.sc}" stroke="${S.line}" stroke-width="1.1"/>`;
        }
      });
      out += `<g mask="url(#${u}am)">${cuffs}</g>`;
    }
    // ---------- 4) ท่อนล่าง ----------
    if (S.bottom === "pants") {
      defs += `<clipPath id="${u}pc"><rect x="${B.wL - 1}" y="${B.waist}" width="${tw + 2}" height="${n1(B.hip - B.waist + 1)}"/>${legRects(B, B.hip - 1, foot)}</clipPath>`;
      out += `<g mask="url(#${u}pm)"><g clip-path="url(#${u}pc)"><rect x="0" y="0" width="100" height="100" fill="${S.bc[0]}"/>${S.pat2 === "tabby" ? `<rect x="0" y="0" width="100" height="100" fill="url(#${u}tb)"/>` : ""}<rect x="0" y="0" width="100" height="100" fill="url(#${u}sh)"/></g></g>`;
      out += `<g clip-path="url(#${u}pc)"><g filter="url(#${u}ed)">${img}</g></g>`;
      B.legs.forEach(([a, b]) => (out += `<path d="M${a},${n1(foot)} L${b},${n1(foot)}" stroke="${S.line}" stroke-width="1.3" mask="url(#${u}pm)"/>`));
    }
    if (S.bottom === "tail") {
      const ty = B.waist - 4;
      defs += `<linearGradient id="${u}tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.bc[0]}"/><stop offset="1" stop-color="${S.bc[1]}"/></linearGradient>`;
      defs += `<clipPath id="${u}tl"><rect x="${B.wL - 2}" y="${ty}" width="${tw + 4}" height="${n1(B.bottom - ty + 2)}"/></clipPath>`;
      out += `<g mask="url(#${u}pm)"><g clip-path="url(#${u}tl)"><rect x="0" y="0" width="100" height="100" fill="url(#${u}tg)"/><rect x="0" y="0" width="100" height="100" fill="url(#${u}sc)"/><rect x="0" y="0" width="100" height="100" fill="url(#${u}sh)"/></g></g>`;
      out += `<g clip-path="url(#${u}tl)"><g filter="url(#${u}ed)">${img}</g></g>`;
      const fx = wcx, fy = B.bottom - 1, fw = Math.max(8, tw * 0.35);
      out += `<path d="M${n1(fx)},${n1(fy - 3)} Q${n1(fx - fw)},${n1(fy - 2)} ${n1(fx - fw)},${n1(fy + 4)} Q${n1(fx - fw / 3)},${n1(fy + 1)} ${n1(fx)},${n1(fy + 3)} Q${n1(fx + fw / 3)},${n1(fy + 1)} ${n1(fx + fw)},${n1(fy + 4)} Q${n1(fx + fw)},${n1(fy - 2)} ${n1(fx)},${n1(fy - 3)}Z" fill="${S.bc[1]}" stroke="${S.line}" stroke-width="1.1"/>`;
      out += `<path d="M${n1(B.wL)},${n1(ty)} Q${n1(wcx)},${n1(ty + 3)} ${n1(B.wR)},${n1(ty)}" fill="none" stroke="#fde68a" stroke-width="2"/>`;
    }
    if (S.bottom === "skirt" || S.bottom === "gown" || S.bottom === "tutu") {
      const top = B.waist - 1, xl = B.wL - 1.5, xr = B.wR + 1.5;
      let hem = S.bottom === "gown" ? B.bottom - 1 : B.hip + Math.max(4, (B.bottom - B.hip) * 0.45);
      if (!B.legs.length) hem = Math.min(hem, B.bottom - 1); // ไม่มีขา (ไข่ขาว): กระโปรงไม่ยื่นเลยตัว
      const fl = Math.max(4, tw * (S.bottom === "gown" ? 0.2 : 0.22));
      if (S.bottom === "tutu") {
        const cols = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa", "#a78bfa"];
        const layers = 4, step = (hem - top) / layers;
        for (let i = layers - 1; i >= 0; i--) {
          const y0 = top + i * step * 0.55, y1 = top + (i + 1) * step + 1, f = fl * (0.6 + i * 0.25);
          const ca = cols[(i * 2) % 6], cb = cols[(i * 2 + 1) % 6];
          out += `<path d="M${n1(xl - f * 0.3)},${n1(y0)} L${n1(xr + f * 0.3)},${n1(y0)} L${n1(xr + f)},${n1(y1)} Q${n1(wcx)},${n1(y1 + 3)} ${n1(xl - f)},${n1(y1)}Z" fill="${i % 2 ? ca : cb}" stroke="${S.line}" stroke-width=".9"/>`;
        }
      } else {
        defs += `<linearGradient id="${u}kg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S.bc[0]}"/><stop offset="1" stop-color="${S.bc[1]}"/></linearGradient>`;
        // ชายกระโปรงหยัก
        const n = Math.max(4, Math.round((xr - xl + 2 * fl) / 9));
        let hemPath = "";
        for (let i = n; i > 0; i--) {
          const x1 = xr + fl - ((xr - xl + 2 * fl) * (n - i)) / n, x0 = xr + fl - ((xr - xl + 2 * fl) * (n - i + 1)) / n;
          hemPath += ` Q${n1((x0 + x1) / 2)},${n1(hem + (S.bottom === "gown" ? 1.5 : 3.5))} ${n1(x0)},${n1(hem)}`;
        }
        const d = `M${n1(xl)},${n1(top)} Q${n1(wcx)},${n1(top + 2.5)} ${n1(xr)},${n1(top)} L${n1(xr + fl)},${n1(hem)}${hemPath} Z`;
        out += `<path d="${d}" fill="url(#${u}kg)" stroke="${S.line}" stroke-width="1.2" stroke-linejoin="round"/>`;
        const patId = S.pat === "dots" ? "dt" : S.pat === "sunflower" ? "sf" : S.pat === "beestripes" ? "bs" : "";
        if (patId) {
          defs += `<clipPath id="${u}kc"><path d="${d}"/></clipPath>`;
          out += `<g clip-path="url(#${u}kc)"><rect x="0" y="0" width="100" height="100" fill="url(#${u}${patId})"/></g><path d="${d}" fill="none" stroke="${S.line}" stroke-width="1.2" stroke-linejoin="round"/>`;
        }
        if (id === "F1") out += `<path d="M${n1(wcx - tw * 0.18)},${n1(top + 1)} Q${n1(wcx)},${n1(top + (hem - top) * 0.75)} ${n1(wcx + tw * 0.18)},${n1(top + 1)}" fill="#fff0f7" stroke="#ec4899" stroke-width="1"/>`;
        if (S.sparkles) [[0.2, 0.5], [0.55, 0.3], [0.75, 0.65], [0.4, 0.8]].forEach(([fx, fy]) => {
          const x = xl - fl + (xr - xl + 2 * fl) * fx, y = top + (hem - top) * fy;
          out += `<path d="M${n1(x)},${n1(y - 1.6)} Q${n1(x)},${n1(y)} ${n1(x + 1.6)},${n1(y)} Q${n1(x)},${n1(y)} ${n1(x)},${n1(y + 1.6)} Q${n1(x)},${n1(y)} ${n1(x - 1.6)},${n1(y)} Q${n1(x)},${n1(y)} ${n1(x)},${n1(y - 1.6)}Z" fill="#fff"/>`;
        });
      }
    }
    // ---------- 5) รองเท้า / ถุงเท้า ----------
    if (S.feet && B.legs.length) {
      defs += `<clipPath id="${u}fc">${legRects(B, foot, 110)}</clipPath>`;
      out += `<g mask="url(#${u}pm)"><g clip-path="url(#${u}fc)"><rect x="0" y="0" width="100" height="110" fill="${S.feet}"/></g></g>`;
      out += `<g clip-path="url(#${u}fc)"><g filter="url(#${u}ed)">${img}</g></g>`;
    }

    // ---------- 6) รายละเอียดบนตัว ----------
    const chestY = B.neck + (B.waist - B.neck) * 0.3;
    if (S.collar) {
      const cw = Math.min(chestW * 0.28, 12);
      out += `<path d="M${n1(cx - cw)},${n1(B.neck + 0.5)} Q${n1(cx - cw * 0.5)},${n1(B.neck + 5)} ${n1(cx)},${n1(B.neck + 2.5)} Q${n1(cx + cw * 0.5)},${n1(B.neck + 5)} ${n1(cx + cw)},${n1(B.neck + 0.5)} Q${n1(cx)},${n1(B.neck + 2)} ${n1(cx - cw)},${n1(B.neck + 0.5)}Z" fill="${S.collar}" stroke="${S.line}" stroke-width="1"/>`;
    }
    if (S.trim) out += `<path d="M${n1(B.wL)},${n1(B.waist - 1)} Q${n1(wcx)},${n1(B.waist + 1.5)} ${n1(B.wR)},${n1(B.waist - 1)}" fill="none" stroke="${S.trim}" stroke-width="1.6"/>`;
    if (S.deco === "heart") out += `<path d="M${n1(cx)},${n1(chestY)} c-2,-3 -5,0 0,4 c5,-4 2,-7 0,-4Z" fill="#fde047" stroke="#ca8a04" stroke-width=".8"/>`;
    if (S.deco === "buttons") [0, 1, 2].forEach((i) => (out += `<circle cx="${n1(cx)}" cy="${n1(chestY + i * 4)}" r="1.1" fill="${S.line}"/>`));
    if (S.deco === "bow") out += `<path d="M${n1(cx)},${n1(chestY)} l-4,-2.5 v5Z M${n1(cx)},${n1(chestY)} l4,-2.5 v5Z" fill="#f9a8d4" stroke="#be185d" stroke-width=".8"/><circle cx="${n1(cx)}" cy="${n1(chestY)}" r="1.2" fill="#f472b6"/>`;
    if (S.deco === "sash") out += `<path d="M${n1(B.wL)},${n1(B.waist - 2.5)} Q${n1(wcx)},${n1(B.waist + 1)} ${n1(B.wR)},${n1(B.waist - 2.5)} L${n1(B.wR)},${n1(B.waist)} Q${n1(wcx)},${n1(B.waist + 3.5)} ${n1(B.wL)},${n1(B.waist)}Z" fill="#e0f2fe" stroke="${S.line}" stroke-width=".8"/>`;
    if (S.deco === "rainbowband") ["#f9a8d4", "#93c5fd"].forEach((col, i) => (out += `<path d="M${n1(B.tL + 3)},${n1(chestY + i * 3)} Q${n1(cx)},${n1(chestY + 3 + i * 3)} ${n1(B.tR - 3)},${n1(chestY + i * 3)}" fill="none" stroke="${col}" stroke-width="1.6" mask="url(#${u}pm)"/>`));
    if (S.deco === "vest") {
      defs += `<clipPath id="${u}vc">${torsoPoly(B)}</clipPath>`;
      const vw = Math.max(5, chestW * 0.28);
      out += `<g mask="url(#${u}pm)"><g clip-path="url(#${u}vc)"><path d="M0,0 L${n1(B.tL + vw)},${B.neck} L${n1(B.wL + vw * 0.8)},${B.hip} L0,100Z M100,0 L${n1(B.tR - vw)},${B.neck} L${n1(B.wR - vw * 0.8)},${B.hip} L100,100Z" fill="#7c2d12" stroke="#431407" stroke-width="1"/></g></g>`;
      out += `<rect x="${B.wL}" y="${n1(B.waist - 1.5)}" width="${tw}" height="3.6" rx="1" fill="#78350f" stroke="#431407" stroke-width=".8" mask="url(#${u}pm)"/><rect x="${n1(wcx - 2.2)}" y="${n1(B.waist - 2)}" width="4.4" height="4.6" rx=".8" fill="#fde047" stroke="#a16207" stroke-width=".8"/>`;
    }
    if (S.deco === "astro") {
      out += `<path d="M${n1(B.tL + 1)},${n1(chestY - 2)} Q${n1(cx)},${n1(chestY + 1)} ${n1(B.tR - 1)},${n1(chestY - 2)} L${n1(B.tR - 1)},${n1(chestY + 1)} Q${n1(cx)},${n1(chestY + 4)} ${n1(B.tL + 1)},${n1(chestY + 1)}Z" fill="#3b82f6" mask="url(#${u}pm)"/>`;
      const pw = Math.min(16, chestW * 0.4), py = chestY + 5;
      out += `<rect x="${n1(cx - pw / 2)}" y="${n1(py)}" width="${n1(pw)}" height="${n1(pw * 0.6)}" rx="1.5" fill="#e2e8f0" stroke="#475569" stroke-width=".9"/>` +
        ["#ef4444", "#facc15", "#22c55e"].map((col, i) => `<circle cx="${n1(cx - pw / 4 + (i * pw) / 4)}" cy="${n1(py + pw * 0.3)}" r="${n1(pw * 0.08)}" fill="${col}"/>`).join("");
      out += `<rect x="${B.wL}" y="${n1(B.waist - 1)}" width="${tw}" height="3" fill="#94a3b8" mask="url(#${u}pm)"/>`;
    }
    if (S.deco === "robot") {
      const pw = Math.min(24, chestW * 0.55), ph = (B.waist - B.neck) * 0.42, py = B.neck + 4;
      out += `<rect x="${n1(cx - pw / 2)}" y="${n1(py)}" width="${n1(pw)}" height="${n1(ph)}" rx="2" fill="#0f172a" stroke="#334155" stroke-width="1"/>` +
        `<path d="M${n1(cx - pw * 0.4)},${n1(py + ph / 2)} l${n1(pw * 0.2)},0 l${n1(pw * 0.08)},-${n1(ph * 0.3)} l${n1(pw * 0.12)},${n1(ph * 0.55)} l${n1(pw * 0.08)},-${n1(ph * 0.25)} l${n1(pw * 0.32)},0" fill="none" stroke="#22d3ee" stroke-width="1"/>` +
        ["#ef4444", "#facc15", "#22c55e"].map((col, i) => `<circle cx="${n1(cx - pw / 3 + (i * pw) / 3)}" cy="${n1(py + ph + 4)}" r="1.6" fill="${col}" stroke="#334155" stroke-width=".6"/>`).join("");
    }
    if (S.belly) out += `<ellipse cx="${n1(wcx)}" cy="${n1(B.neck + (B.hip - B.neck) * 0.55)}" rx="${n1(tw * 0.28)}" ry="${n1((B.hip - B.neck) * 0.3)}" fill="${S.belly}" mask="url(#${u}pm)"/>`;
    if (S.zip) out += `<path d="M${n1(cx)},${n1(B.neck + 2)} L${n1(cx)},${n1(B.neck + (B.waist - B.neck) * 0.45)}" stroke="${S.line}" stroke-width=".8" opacity=".6"/><circle cx="${n1(cx)}" cy="${n1(B.neck + 3)}" r=".9" fill="${S.line}"/>`;
    if (S.mane) {
      const m = Math.max(5, Math.round(chestW / 6));
      for (let i = 0; i < m; i++) out += `<circle cx="${n1(B.tL + 2 + ((chestW - 4) * i) / (m - 1))}" cy="${n1(B.neck + 1)}" r="3.2" fill="${i % 2 ? "#b45309" : "#d97706"}" stroke="#78350f" stroke-width=".8"/>`;
    }
    if (S.shell) {
      const sw = Math.min(9, chestW * 0.18), y = chestY;
      [-1, 1].forEach((sgn) => {
        const x = cx + sgn * sw * 0.62;
        out += `<path d="M${n1(x - sw / 2)},${n1(y + 2)} Q${n1(x - sw / 2)},${n1(y - 4)} ${n1(x)},${n1(y - 4)} Q${n1(x + sw / 2)},${n1(y - 4)} ${n1(x + sw / 2)},${n1(y + 2)} Q${n1(x)},${n1(y + 4)} ${n1(x - sw / 2)},${n1(y + 2)}Z" fill="${S.shell[0]}" stroke="${S.shell[1]}" stroke-width="1"/>`;
      });
      out += `<path d="M${n1(B.tL + 4)},${n1(y - 1)} Q${n1(cx)},${n1(y - 6)} ${n1(B.tR - 4)},${n1(y - 1)}" fill="none" stroke="${S.shell[1]}" stroke-width=".7"/>`;
    }
    if (S.wings) {
      const wy = B.neck + 4;
      out = `<ellipse cx="${n1(B.tL - 2)}" cy="${n1(wy)}" rx="7" ry="4.5" fill="#e0f2fe" fill-opacity=".8" stroke="#0284c7" stroke-width=".9" transform="rotate(-25 ${n1(B.tL - 2)} ${n1(wy)})"/>` +
        `<ellipse cx="${n1(B.tR + 2)}" cy="${n1(wy)}" rx="7" ry="4.5" fill="#e0f2fe" fill-opacity=".8" stroke="#0284c7" stroke-width=".9" transform="rotate(25 ${n1(B.tR + 2)} ${n1(wy)})"/>` + out;
    }
    // หางชุด onesie (ติดข้างเอว)
    if (S.tail) {
      const tx = B.wR + 1, ty = (B.waist + B.hip) / 2;
      const T = {
        cat: `<path d="M${tx},${ty} q10,1 11,-9 q1,-6 -3,-7" fill="none" stroke="${S.line}" stroke-width="4.4" stroke-linecap="round"/><path d="M${tx},${ty} q10,1 11,-9 q1,-6 -3,-7" fill="none" stroke="${S.top}" stroke-width="2.6" stroke-linecap="round"/>`,
        pom: `<circle cx="${tx + 2}" cy="${ty}" r="3.8" fill="#fff" stroke="${S.line}" stroke-width=".9"/>`,
        lion: `<path d="M${tx},${ty} q8,2 10,-6" fill="none" stroke="${S.line}" stroke-width="2"/><circle cx="${tx + 10}" cy="${ty - 7}" r="2.8" fill="#b45309" stroke="#78350f" stroke-width=".8"/>`,
        bear: `<circle cx="${tx + 1.5}" cy="${ty}" r="3" fill="#92400e" stroke="${S.line}" stroke-width=".9"/>`,
        shark: `<path d="M${tx},${ty - 3} q9,0 13,-6 l1,10 l-6,-2 q-4,3 -8,2Z" fill="${S.top}" stroke="${S.line}" stroke-width=".9"/>`,
        rainbow: ["#f87171", "#60a5fa", "#a78bfa"].map((col, i) => `<path d="M${tx},${ty - 2 + i * 2} q7,${-2 + i * 2} 10,${3 + i * 2}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/>`).join(""),
        squirrel: `<path d="M${tx - 1},${ty + 4} q16,4 14,-18 q-2,-10 -10,-6 q7,5 4,13 q-3,6 -8,5Z" fill="#c2410c" stroke="${S.line}" stroke-width=".9"/>`,
      };
      out += T[S.tail] || "";
    }
    return `<defs>${defs}</defs>${out}`;
  }

  window.getFittedOutfitBody = function (u, id, petKey) {
    return wear(u, id, petKey);
  };
  window.hasFittedBody = (petKey) => !!BODY[petKey];
})();
