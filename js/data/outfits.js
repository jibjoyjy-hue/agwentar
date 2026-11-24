// ชุดเซ็ต (F1–F25) วาดเป็นเวกเตอร์ (SVG) ใหม่ทั้งหมด
// พิกัดอยู่ในกรอบ 0–100 เท่ากับกรอบรูปสัตว์เลี้ยง: หัวอยู่ด้านบน ตัวอยู่ช่วงล่าง
// สวมใส่: วางทับรูปสัตว์ทั้งกรอบ   ไอคอนร้านค้า: ใช้รูปเดียวกันแสดงในช่องสินค้า
(function () {
  const SW = 'stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"';
  const p = (d, fill, stroke, extra = "") => `<path d="${d}" fill="${fill}" stroke="${stroke}" ${SW} ${extra}/>`;
  const c = (x, y, r, fill, stroke = "none", extra = "") =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" ${stroke === "none" ? "" : SW} ${extra}/>`;
  const e = (x, y, rx, ry, fill, stroke = "none", extra = "") =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" ${stroke === "none" ? "" : SW} ${extra}/>`;
  const grad = (id, a, b, vertical = true) =>
    `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const star = (x, y, r, fill) => {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r;
      d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + "," + (y + rr * Math.sin(a)).toFixed(1);
    }
    return `<path d="${d}Z" fill="${fill}"/>`;
  };
  const sparkle = (x, y, s, fill = "#fff") =>
    `<path d="M${x},${y - s} Q${x},${y} ${x + s},${y} Q${x},${y} ${x},${y + s} Q${x},${y} ${x - s},${y} Q${x},${y} ${x},${y - s}Z" fill="${fill}" opacity=".9"/>`;
  const flower = (x, y, r, petal, mid) => {
    let s = "";
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4;
      s += e((x + r * 0.75 * Math.cos(a)).toFixed(1), (y + r * 0.75 * Math.sin(a)).toFixed(1), r * 0.42, r * 0.42, petal);
    }
    return s + c(x, y, r * 0.5, mid);
  };

  // LIMBS = true ตอนสวมบนน้องที่มีรูป: แขนขาของน้องถูกระบายสีตามชุดแล้ว จึงไม่ต้องวาดแขน/ขาแบบตายตัว
  let LIMBS = false;

  // ---------- ชิ้นส่วนเดรส ----------
  const SKIRT = "M36,67 C45,70 55,70 64,67 L79,89 Q72,95 65,91 Q58,97 50,92 Q42,97 35,91 Q28,95 21,89 Z";
  const LONG_SKIRT = "M37,67 C45,70 55,70 63,67 L76,92 Q50,99 24,92 Z";
  const BODICE = "M37,52 Q50,57 63,52 L64,68 Q50,71 36,68 Z";
  const puffs = (fill, stroke) => e(33.5, 55.5, 5.6, 4.6, fill, stroke) + e(66.5, 55.5, 5.6, 4.6, fill, stroke);
  const legs = (fill, stroke) => LIMBS ? "" : p("M41,90 L41,96 Q44,98 47,96 L47,91Z", fill, stroke) + p("M53,91 L53,96 Q56,98 59,96 L59,90Z", fill, stroke);

  // ---------- ชิ้นส่วนชุด Onesie ----------
  const ONESIE =
    "M35,51 Q50,56 65,51 L67,80 Q67,88 61,89 L60,95 Q56,98 52,95 L51,89 L49,89 L48,95 Q44,98 40,95 L39,89 Q33,88 33,80 Z";
  const ARM_L = "M35,52 Q27,55 25,66 Q24,71 28,72 Q31,72 32,68 L35,60";
  const ARM_R = "M65,52 Q73,55 75,66 Q76,71 72,72 Q69,72 68,68 L65,60";
  const onesieBase = (main, line, belly, opts = {}) => LIMBS
    ? (belly ? e(50, 72, 9.5, 11.5, belly, "none") : "") + p("M50,55 L50,66", "none", line, 'opacity=".5"') + c(50, 58, 0.9, line) + c(50, 62, 0.9, line)
    : p(ARM_L, main, line) + p(ARM_R, main, line) + p(ONESIE, main, line) +
    (belly ? e(50, 72, 9.5, 11.5, belly, "none") : "") +
    (opts.cuffs ? e(27.5, 70.5, 3.6, 2.6, opts.cuffs, line) + e(72.5, 70.5, 3.6, 2.6, opts.cuffs, line) +
      e(44, 95.5, 4.4, 2.2, opts.cuffs, line) + e(56, 95.5, 4.4, 2.2, opts.cuffs, line) : "") +
    p("M50,55 L50,66", "none", line, 'opacity=".5"') + c(50, 58, 0.9, line) + c(50, 62, 0.9, line);
  const roundEars = (fill, inner, line) =>
    p("M31,13 Q50,4 69,13", "none", line, 'stroke-width="2.4"') +
    c(31, 9, 6.5, fill, line) + c(31, 9, 3.6, inner) + c(69, 9, 6.5, fill, line) + c(69, 9, 3.6, inner);
  const pointEars = (fill, inner, line) =>
    p("M31,14 Q50,5 69,14", "none", line, 'stroke-width="2.4"') +
    p("M26,15 L30,0 L39,10Z", fill, line) + p("M29,12 L31,4 L35,10Z", inner, "none") +
    p("M74,15 L70,0 L61,10Z", fill, line) + p("M71,12 L69,4 L65,10Z", inner, "none");
  const longEars = (fill, inner, line) =>
    p("M31,15 Q50,6 69,15", "none", line, 'stroke-width="2.4"') +
    p("M36,12 Q28,-8 33,-14 Q40,-10 41,10Z", fill, line) + p("M36,8 Q32,-6 34,-10 Q38,-6 39,8Z", inner, "none") +
    p("M64,12 Q72,-8 67,-14 Q60,-10 59,10Z", fill, line) + p("M64,8 Q68,-6 66,-10 Q62,-6 61,8Z", inner, "none");

  // ---------- ชุดแต่ละแบบ ----------
  const OUTFITS = {
    // เจ้าหญิงสีชมพู
    F1: (u) =>
      `<defs>${grad(u + "a", "#ffc2dc", "#f472b6")}</defs>` + legs("#fbcfe8", "#be185d") +
      p(SKIRT, `url(#${u}a)`, "#be185d") +
      p("M36,67 C40,76 37,84 30,90 M64,67 C60,76 63,84 70,90", "none", "#ec4899", 'opacity=".8"') +
      p("M43,70 Q50,84 57,70", "#fff0f7", "#ec4899") + puffs("#fbcfe8", "#be185d") +
      p(BODICE, "#f472b6", "#be185d") + p("M42,54 Q50,60 58,54", "none", "#fff", 'opacity=".8"') +
      p("M50,60 C47,57 44,61 50,65 C56,61 53,57 50,60Z", "#fde047", "#ca8a04") +
      sparkle(30, 82, 2) + sparkle(68, 78, 1.6) + sparkle(50, 88, 1.8) +
      // มงกุฎ
      p("M40,10 L42,2 L46,7 L50,0 L54,7 L58,2 L60,10Z", "#fde047", "#ca8a04") + c(50, 4, 1.4, "#ec4899") +
      c(42.5, 5, 1, "#60a5fa") + c(57.5, 5, 1, "#60a5fa"),

    // ราตรีสีน้ำเงิน
    F2: (u) =>
      `<defs>${grad(u + "a", "#60a5fa", "#1e3a8a")}</defs>` +
      p(LONG_SKIRT, `url(#${u}a)`, "#1e3a8a") +
      p("M44,70 Q41,82 34,94 M56,70 Q59,82 66,94", "none", "#93c5fd", 'opacity=".6"') +
      p("M37,52 Q50,57 63,52 L64,68 Q50,71 36,68 Z", "#1d4ed8", "#1e3a8a") +
      p("M36,52 L33,50 Q31,56 36,58 M64,52 L67,50 Q69,56 64,58", "#93c5fd", "#1e3a8a") +
      p("M36,66 Q50,70 64,66 L64,69 Q50,73 36,69Z", "#e0f2fe", "#1e3a8a") +
      star(50, 68.5, 2.4, "#fde047") +
      sparkle(32, 86, 1.8) + sparkle(44, 80, 1.3) + sparkle(60, 84, 1.8) + sparkle(54, 92, 1.3) + sparkle(68, 90, 1.3) +
      // กิ๊บดาว
      star(36, 9, 4.5, "#93c5fd") + star(36, 9, 2.2, "#fff"),

    // ชุดทานตะวัน
    F3: (u) =>
      legs("#fef3c7", "#a16207") + p(SKIRT, "#facc15", "#a16207") +
      flower(31, 84, 3.2, "#f59e0b", "#78350f") + flower(47, 80, 3.2, "#f59e0b", "#78350f") +
      flower(64, 85, 3.2, "#f59e0b", "#78350f") + flower(56, 74, 2.4, "#f59e0b", "#78350f") +
      puffs("#fef9c3", "#a16207") + p(BODICE, "#fde047", "#a16207") +
      p("M38,52 Q44,59 50,55 Q56,59 62,52 Q56,54 50,53 Q44,54 38,52Z", "#fff", "#a16207") +
      c(50, 61, 1.2, "#a16207") + c(50, 65, 1.2, "#a16207") +
      // ดอกทานตะวันติดหัว
      flower(34, 9, 5.5, "#facc15", "#78350f") + p("M30,15 Q34,20 38,15", "#4ade80", "#15803d"),

    // ชุดรุ้ง
    F5: (u) => {
      const cols = ["#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa", "#a78bfa"];
      let tutu = "";
      cols.slice().reverse().forEach((col, i) => {
        const y = 92 - i * 4.2, w = 30 - i * 2.4;
        tutu += p(`M${50 - w},${y} Q${50 - w * 0.5},${y + 4} 50,${y + 1.5} Q${50 + w * 0.5},${y + 4} ${50 + w},${y} L${50 + w * 0.62},${y - 8} Q50,${y - 5} ${50 - w * 0.62},${y - 8}Z`, col, "#6b21a8", 'stroke-width=".8"');
      });
      return legs("#f5f3ff", "#6b21a8") + tutu + puffs("#fff", "#6b21a8") +
        p(BODICE, "#fff", "#6b21a8") + p("M38,58 Q50,62 62,58", "none", "#f9a8d4", 'stroke-width="1.6"') +
        p("M38,61.5 Q50,65.5 62,61.5", "none", "#93c5fd", 'stroke-width="1.6"') + sparkle(44, 56, 1.5, "#facc15") +
        // กิ๊บเมฆรุ้ง
        p("M27,12 Q27,6 33,7 Q35,2 40,6 Q45,6 44,12Z", "#fff", "#6b21a8") +
        p("M28,12 Q35,4 43,12", "none", "#f87171", 'stroke-width="1.5"') +
        p("M30,12 Q35,7 41,12", "none", "#60a5fa", 'stroke-width="1.5"');
    },

    // ชุดผึ้งน้อย
    F8: (u) =>
      e(30, 58, 9, 6, "#e0f2fe", "#0284c7", 'opacity=".85" transform="rotate(-25 30 58)"') +
      e(70, 58, 9, 6, "#e0f2fe", "#0284c7", 'opacity=".85" transform="rotate(25 70 58)"') +
      legs("#1f2937", "#111827") +
      `<defs><clipPath id="${u}k"><path d="${SKIRT}"/></clipPath><clipPath id="${u}b"><path d="${BODICE}"/></clipPath></defs>` +
      p(SKIRT, "#facc15", "#111827") +
      `<g clip-path="url(#${u}k)"><rect x="0" y="74" width="100" height="5" fill="#1f2937"/><rect x="0" y="84" width="100" height="5" fill="#1f2937"/></g>` +
      p(SKIRT, "none", "#111827") + puffs("#fde047", "#111827") +
      p(BODICE, "#facc15", "#111827") +
      `<g clip-path="url(#${u}b)"><rect x="0" y="58" width="100" height="4" fill="#1f2937"/></g>` + p(BODICE, "none", "#111827") +
      // หนวดผึ้ง
      p("M31,13 Q50,5 69,13", "none", "#111827", 'stroke-width="2.4"') +
      p("M40,9 Q36,2 33,0", "none", "#111827", 'stroke-width="1.6"') + c(33, 0, 2.6, "#facc15", "#111827") +
      p("M60,9 Q64,2 67,0", "none", "#111827", 'stroke-width="1.6"') + c(67, 0, 2.6, "#facc15", "#111827"),

    // ชุดกระต่ายมิ้นท์
    F9: (u) =>
      legs("#ecfdf5", "#047857") + p(SKIRT, "#a7f3d0", "#047857") +
      c(30, 86, 1.6, "#fff") + c(42, 80, 1.6, "#fff") + c(56, 86, 1.6, "#fff") + c(66, 79, 1.6, "#fff") + c(48, 90, 1.6, "#fff") +
      puffs("#d1fae5", "#047857") + p(BODICE, "#6ee7b7", "#047857") +
      p("M38,52 Q44,59 50,55 Q56,59 62,52 Q56,54 50,53 Q44,54 38,52Z", "#fff", "#047857") +
      p("M46,62 Q50,58 54,62 Q50,66 46,62Z M50,62 L44,59 L44,65Z M50,62 L56,59 L56,65Z", "#f9a8d4", "#be185d") +
      longEars("#ecfdf5", "#f9a8d4", "#047857"),

    // ชุดนักบินอวกาศ
    F11: (u) =>
      (LIMBS ? "" : p("M30,55 L28,80 Q28,84 32,84 L35,84 L35,55Z", "#cbd5e1", "#475569") +
      p("M70,55 L72,80 Q72,84 68,84 L65,84 L65,55Z", "#cbd5e1", "#475569")) +
      onesieBase("#f8fafc", "#475569", null, { cuffs: "#f97316" }) +
      p("M36,56 Q50,60 64,56 L64,60 Q50,64 36,60Z", "#3b82f6", "#475569") +
      `<rect x="42" y="66" width="16" height="10" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>` +
      c(46, 71, 1.6, "#ef4444") + c(50, 71, 1.6, "#facc15") + c(54, 71, 1.6, "#22c55e") +
      c(39, 63, 3.2, "#1e3a8a", "#475569") + star(39, 63, 2, "#fff") +
      p("M35,79 Q50,83 65,79 L65,82 Q50,86 35,82Z", "#94a3b8", "#475569") +
      // เสาอากาศ
      p("M31,13 Q50,5 69,13", "none", "#94a3b8", 'stroke-width="2.4"') + p("M50,8 L50,1", "none", "#94a3b8", 'stroke-width="1.6"') + c(50, 0, 2.2, "#f97316", "#475569"),

    // ชุดโจรสลัดสุดเท่
    F12: (u) =>
      `<defs><clipPath id="${u}s"><path d="M34,51 Q50,56 66,51 L67,76 L33,76Z"/></clipPath></defs>` +
      (LIMBS ? "" : p(ARM_L, "#fff", "#334155") + p(ARM_R, "#fff", "#334155") +
      p("M27,58 L33,57 M26,63 L33,62 M25,68 L32,67 M73,58 L67,57 M74,63 L67,62 M75,68 L68,67", "none", "#dc2626", 'stroke-width="1.8"') +
      p("M33,76 L67,76 L66,88 L60,89 L59,96 L52,96 L50,89 L48,96 L41,96 L40,89 L34,88Z", "#1f2937", "#0f172a")) +
      p("M34,51 Q50,56 66,51 L67,76 L33,76Z", "#fff", "#334155") +
      `<g clip-path="url(#${u}s)">${[58, 64, 70].map((y) => `<rect x="0" y="${y}" width="100" height="2.6" fill="#dc2626"/>`).join("")}</g>` +
      p("M34,51 L44,54 L42,76 L33,76Z", "#7c2d12", "#431407") + p("M66,51 L56,54 L58,76 L67,76Z", "#7c2d12", "#431407") +
      `<rect x="33" y="74" width="34" height="5" rx="1" fill="#78350f" stroke="#431407" stroke-width="1"/>` +
      `<rect x="47" y="73.5" width="6" height="6" rx="1" fill="#fde047" stroke="#a16207" stroke-width="1"/>` +
      // หมวกโจรสลัด
      p("M24,13 Q50,-4 76,13 Q50,7 24,13Z", "#1f2937", "#0f172a") + p("M33,8 Q50,-8 67,8", "#1f2937", "#0f172a") +
      p("M28,12 Q50,5 72,12", "none", "#fde047", 'stroke-width="1"') +
      c(50, 3.5, 2.6, "#fff") + p("M47,7 L53,7 M47.5,8.5 L52.5,8.5", "none", "#fff", 'stroke-width=".8"'),

    // ชุดนางเงือกมรกต / พาสเทล
    F13: (u) => mermaid(u, ["#34d399", "#047857", "#065f46"], "#a78bfa", "#6d28d9", "starfish"),
    F15: (u) => mermaid(u, ["#f9a8d4", "#c4b5fd", "#7c3aed"], "#99f6e4", "#0f766e", "pearl"),

    // ชุดหุ่นยนต์โรโบ
    F14: (u) =>
      `<defs>${grad(u + "a", "#e2e8f0", "#94a3b8")}</defs>` +
      (LIMBS ? "" :       p("M33,55 L25,57 L24,72 L30,72 L31,61 L33,60Z", "#94a3b8", "#334155") +
      p("M67,55 L75,57 L76,72 L70,72 L69,61 L67,60Z", "#94a3b8", "#334155") +
      p("M23,72 L31,72 L31,76 L23,76Z M69,72 L77,72 L77,76 L69,76Z", "#64748b", "#334155") +
      `<rect x="40" y="82" width="7" height="12" rx="1" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>` +
      `<rect x="53" y="82" width="7" height="12" rx="1" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>` +
      `<rect x="38" y="93" width="10" height="4" rx="1" fill="#475569"/><rect x="52" y="93" width="10" height="4" rx="1" fill="#475569"/>`) +
      `<rect x="33" y="51" width="34" height="33" rx="5" fill="url(#${u}a)" stroke="#334155" stroke-width="1.4"/>` +
      `<rect x="39" y="57" width="22" height="14" rx="2" fill="#0f172a" stroke="#334155" stroke-width="1"/>` +
      p("M41,64 L45,64 L47,60 L50,68 L52,62 L54,64 L59,64", "none", "#22d3ee", 'stroke-width="1.2"') +
      c(42, 77, 2, "#ef4444", "#334155") + c(50, 77, 2, "#facc15", "#334155") + c(58, 77, 2, "#22c55e", "#334155") +
      c(36, 54, 0.9, "#475569") + c(64, 54, 0.9, "#475569") + c(36, 81, 0.9, "#475569") + c(64, 81, 0.9, "#475569") +
      p("M31,13 Q50,5 69,13", "none", "#64748b", 'stroke-width="2.4"') +
      `<rect x="26" y="8" width="6" height="8" rx="1.5" fill="#94a3b8" stroke="#334155" stroke-width="1"/>` +
      `<rect x="68" y="8" width="6" height="8" rx="1.5" fill="#94a3b8" stroke="#334155" stroke-width="1"/>` +
      p("M29,8 L29,1", "none", "#334155", 'stroke-width="1.4"') + c(29, 0, 1.8, "#ef4444"),

    // Onesie แมวน้อย
    F16: (u) =>
      p("M66,82 Q80,84 82,74 Q84,66 79,64", "none", "#c2410c", 'stroke-width="5"') +
      p("M66,82 Q80,84 82,74 Q84,66 79,64", "none", "#fdba74", 'stroke-width="3"') +
      onesieBase("#fdba74", "#c2410c", "#fff7ed", { cuffs: "#fff7ed" }) +
      p("M35,58 L40,59 M34,64 L39,65 M65,58 L60,59 M66,64 L61,65 M26,62 L31,63 M74,62 L69,63", "none", "#c2410c", 'stroke-width="1.6"') +
      pointEars("#fdba74", "#fecdd3", "#c2410c"),

    // Onesie กระต่ายขาว
    F17: (u) =>
      c(67, 84, 4.5, "#fff", "#94a3b8") +
      onesieBase("#f8fafc", "#94a3b8", "#fbcfe8", { cuffs: "#fbcfe8" }) +
      longEars("#f8fafc", "#fbcfe8", "#94a3b8"),

    // Onesie แพนด้า
    F18: (u) =>
      p(ARM_L, "#1f2937", "#0f172a") + p(ARM_R, "#1f2937", "#0f172a") +
      p(ONESIE, "#f8fafc", "#334155") +
      p("M33,80 Q33,88 39,89 L40,95 Q44,98 48,95 L49,89 L51,89 L52,95 Q56,98 60,95 L61,89 Q67,88 67,80 Q50,84 33,80Z", "#1f2937", "#0f172a") +
      p("M35,51 Q50,56 65,51 L65,55 Q50,60 35,55Z", "#1f2937", "#0f172a") +
      e(50, 70, 8, 9, "#e2e8f0") + c(50, 62, 0.9, "#334155") + c(50, 66, 0.9, "#334155") +
      roundEars("#1f2937", "#475569", "#0f172a"),

    // Onesie สิงโตเจ้าป่า
    F19: (u) => {
      let mane = "";
      for (let i = 0; i < 9; i++) {
        const x = 33 + i * 4.25;
        mane += c(x, 52 + Math.abs(4 - i) * -0.3, 3.6, i % 2 ? "#b45309" : "#d97706", "#78350f");
      }
      return p("M66,84 Q78,86 80,76", "none", "#a16207", 'stroke-width="2.4"') + c(80, 74, 3.4, "#b45309", "#78350f") +
        onesieBase("#fbbf24", "#a16207", "#fef3c7", { cuffs: "#fef3c7" }) + mane +
        roundEars("#fbbf24", "#fde68a", "#a16207");
    },

    // Onesie หมีสีน้ำตาล
    F20: (u) =>
      c(66, 85, 3.6, "#92400e", "#451a03") +
      onesieBase("#a16207", "#451a03", "#fde68a", { cuffs: "#fde68a" }) +
      roundEars("#a16207", "#fde68a", "#451a03"),

    // Onesie ฉลาม
    F21: (u) =>
      p("M64,80 Q76,84 82,76 L84,88 L76,84 Q70,88 64,86Z", "#60a5fa", "#1e40af") +
      onesieBase("#60a5fa", "#1e40af", "#f8fafc", { cuffs: "#f8fafc" }) +
      p("M42,61 Q50,65 58,61 L56,64 L53,62 L50,65 L47,62 L44,64Z", "#fff", "#1e40af", 'stroke-width=".8"') +
      p("M31,13 Q50,5 69,13", "none", "#1e40af", 'stroke-width="2.4"') +
      p("M42,9 Q50,-12 60,8Z", "#60a5fa", "#1e40af") + p("M47,7 Q50,-4 55,6", "none", "#bfdbfe", 'stroke-width="1"'),

    // Onesie ยูนิคอร์น
    F22: (u) =>
      `<defs>${grad(u + "h", "#fde047", "#f9a8d4")}</defs>` +
      p("M65,80 Q76,80 78,88", "none", "#f87171", 'stroke-width="3"') + p("M65,82 Q74,84 75,92", "none", "#60a5fa", 'stroke-width="3"') +
      p("M65,78 Q78,76 82,82", "none", "#a78bfa", 'stroke-width="3"') +
      onesieBase("#fdf2f8", "#db2777", "#fbcfe8", { cuffs: "#c4b5fd" }) +
      sparkle(38, 60, 1.6, "#f472b6") + sparkle(62, 66, 1.6, "#a78bfa") +
      pointEars("#fdf2f8", "#fbcfe8", "#db2777") +
      p("M46,9 L50,-8 L54,9Z", `url(#${u}h)`, "#ca8a04") + p("M47.5,4 L52.5,2 M47,0.5 L53,-1.5", "none", "#ca8a04", 'stroke-width=".7"'),

    // Onesie กระรอกน้อย
    F24: (u) =>
      p("M63,86 Q86,90 84,66 Q82,54 72,58 Q80,64 76,74 Q72,80 63,78Z", "#c2410c", "#7c2d12") +
      p("M70,62 Q79,66 76,74", "none", "#fdba74", 'stroke-width="2"') +
      onesieBase("#ea580c", "#7c2d12", "#fed7aa", { cuffs: "#fed7aa" }) +
      pointEars("#ea580c", "#fed7aa", "#7c2d12"),

    // ชุดผีน้อยบู๋ (คลุมทั้งตัว)
    F25: (u) =>
      `<defs>${grad(u + "g", "#ffffff", "#e2e8f0")}</defs>` +
      p("M50,2 C26,2 18,24 18,46 L16,88 Q22,96 29,90 Q35,97 42,91 Q50,98 58,91 Q65,97 71,90 Q78,96 84,88 L82,46 C82,24 74,2 50,2Z", `url(#${u}g)`, "#94a3b8") +
      p("M18,50 Q10,58 14,66 Q20,64 21,58 M82,50 Q90,58 86,66 Q80,64 79,58", "#f1f5f9", "#94a3b8") +
      e(40, 34, 4.2, 6, "#1e293b") + e(60, 34, 4.2, 6, "#1e293b") + c(41.5, 32, 1.4, "#fff") + c(61.5, 32, 1.4, "#fff") +
      e(50, 47, 4, 5, "#1e293b") + e(33, 42, 4, 2.4, "#fecdd3") + e(67, 42, 4, 2.4, "#fecdd3"),
  };

  function mermaid(u, tail, shell, shellLine, clip) {
    return `<defs>${grad(u + "t", tail[0], tail[1])}</defs>` +
      p("M37,66 Q50,70 63,66 Q66,80 58,88 L62,96 Q56,99 50,94 Q44,99 38,96 L42,88 Q34,80 37,66Z", `url(#${u}t)`, tail[2]) +
      [72, 77, 82].map((y, i) => p(`M${40 + i},${y} Q${43 + i},${y + 3} ${46 + i},${y} Q${49 + i},${y + 3} ${52 + i},${y} Q${55},${y + 3} ${59 - i},${y}`, "none", tail[2], 'stroke-width=".8" opacity=".7"')).join("") +
      p("M36,66 Q50,70 64,66", "none", "#fde68a", 'stroke-width="2.4"') +
      p("M38,58 Q38,52 44,52 Q50,52 49,58 Q44,61 38,58Z", shell, shellLine) +
      p("M51,58 Q50,52 56,52 Q62,52 62,58 Q56,61 51,58Z", shell, shellLine) +
      p("M41,53 L43,58 M44,52.5 L44.5,58 M47,53 L46,58 M53,53 L54,58 M56,52.5 L55.5,58 M59,53 L57,58", "none", shellLine, 'stroke-width=".7"') +
      c(50, 57.5, 1.4, "#fff", shellLine) +
      (clip === "starfish" ? star(35, 9, 5, "#fb923c") + c(35, 9, 1, "#fed7aa")
        : c(33, 9, 2.4, "#fff", "#cbd5e1") + c(37.5, 7, 2, "#fff", "#cbd5e1") + c(37, 11.5, 1.8, "#fdf2f8", "#cbd5e1"));
  }

  // ---------- ขนาดตัวของน้องแต่ละตัว (วัดจากรูปจริง หน่วย 0–100 ของกรอบรูป) ----------
  // ตัว: neck = แนวคอ, bottom = ปลายเท้า, cx = กึ่งกลางลำตัว, w = ความกว้างลำตัวรวมแขน
  // หัว: top = บนสุดของหัว (ไม่นับหู/โบว์), hx = กึ่งกลางหัว, hw = ความกว้างหัว (ไม่นับหู)
  const PET_FIT = {
    aimee:    { neck: 46, bottom: 76, cx: 53, w: 44, top: 6,  hx: 52, hw: 44 },
    blob:     { neck: 56, bottom: 87, cx: 55, w: 70, top: 13, hx: 55, hw: 62 },
    bunny:    { neck: 57, bottom: 97, cx: 55, w: 44, top: 6,  hx: 57, hw: 52 },
    cat:      { neck: 52, bottom: 97, cx: 35, w: 54, top: 8,  hx: 36, hw: 56 },
    puppy:    { neck: 55, bottom: 98, cx: 54, w: 52, top: 6,  hx: 57, hw: 52 },
    penguin:  { neck: 47, bottom: 93, cx: 52, w: 66, top: 6,  hx: 54, hw: 58 },
    bear:     { neck: 52, bottom: 91, cx: 50, w: 46, top: 12, hx: 47, hw: 46 },
    panda:    { neck: 52, bottom: 97, cx: 49, w: 62, top: 4,  hx: 50, hw: 64 },
    fox:      { neck: 55, bottom: 99, cx: 37, w: 56, top: 8,  hx: 38, hw: 58 },
    chick:    { neck: 56, bottom: 92, cx: 57, w: 70, top: 12, hx: 50, hw: 60 },
    otter:    { neck: 52, bottom: 96, cx: 52, w: 48, top: 5,  hx: 52, hw: 52 },
    hamster:  { neck: 55, bottom: 92, cx: 47, w: 52, top: 10, hx: 47, hw: 62 },
    dino:     { neck: 52, bottom: 97, cx: 35, w: 48, top: 6,  hx: 30, hw: 52 },
    pig:      { neck: 55, bottom: 97, cx: 47, w: 64, top: 5,  hx: 47, hw: 64 },
    capybara: { neck: 50, bottom: 96, cx: 48, w: 66, top: 6,  hx: 46, hw: 52 },
    parrot:   { neck: 47, bottom: 95, cx: 48, w: 58, top: 6,  hx: 45, hw: 46 },
    giraffe:  { neck: 52, bottom: 93, cx: 52, w: 52, top: 15, hx: 48, hw: 46 },
    elephant: { neck: 53, bottom: 93, cx: 52, w: 54, top: 7,  hx: 52, hw: 56 },
  };
  const DEFAULT_FIT = { neck: 51, bottom: 96, cx: 50, w: 52, top: 6, hx: 50, hw: 48 };
  // ชุดออกแบบไว้ที่: คอ y51 เท้า y96 กว้างรวมแขน 52 (x24–76) กึ่งกลาง x50 / ที่คาดหัวพอดีหัวกว้าง 48 วางที่ y≈10
  function fitTransforms(petKey) {
    const f = PET_FIT[petKey] || DEFAULT_FIT;
    const sy = (f.bottom - f.neck) / 45;
    const sx = Math.max(sy * 0.7, Math.min(sy * 1.8, f.w / 52));
    const body = `matrix(${sx.toFixed(3)} 0 0 ${sy.toFixed(3)} ${(f.cx - 50 * sx).toFixed(2)} ${(f.neck - 51 * sy).toFixed(2)})`;
    const hs = f.hw / 48;
    const head = `matrix(${hs.toFixed(3)} 0 0 ${hs.toFixed(3)} ${(f.hx - 50 * hs).toFixed(2)} ${(f.top + 4 - 10 * hs).toFixed(2)})`;
    // ชุดคลุมทั้งตัว (ผี): คลุมตั้งแต่เหนือหัวถึงเท้า กว้างเท่าส่วนที่กว้างที่สุดของน้อง
    const wsx = (Math.max(f.w, f.hw) * 1.12) / 68, wsy = (f.bottom - f.top + 8) / 94, wx = (f.cx + f.hx) / 2;
    const whole = `matrix(${wsx.toFixed(3)} 0 0 ${wsy.toFixed(3)} ${(wx - 50 * wsx).toFixed(2)} ${(f.top - 8 - 2 * wsy).toFixed(2)})`;
    return { body, head, whole };
  }

  // ---------- ชุดคลุมแขน/ขาแค่ไหน ----------
  // sleeve: "short" = แขนสั้น (เห็นแขนน้องช่วงล่าง), "long" = แขนยาว (ไม่เห็นแขน เหลือแค่มือ), null = ไม่มีแขน
  // legs:   "short" = ขาสั้น, "long" = ขายาว (ไม่เห็นขา), null = ไม่คลุมขา (เช่นใส่กระโปรง)
  // feet:   สีรองเท้า/ถุงเท้า หรือ null = เท้าเปล่า
  const COVER = {
    F1:  { sleeve: "short", sc: "#f9a8d4", legs: null,   lc: null,      feet: "#ec4899", line: "#be185d" },
    F2:  { sleeve: null,    sc: null,      legs: null,   lc: null,      feet: "#93c5fd", line: "#1e3a8a" },
    F3:  { sleeve: "short", sc: "#fef9c3", legs: null,   lc: null,      feet: "#b45309", line: "#a16207" },
    F5:  { sleeve: "short", sc: "#ffffff", legs: null,   lc: null,      feet: "#a78bfa", line: "#6b21a8" },
    F8:  { sleeve: "short", sc: "#fde047", legs: null,   lc: null,      feet: "#111827", line: "#111827" },
    F9:  { sleeve: "short", sc: "#d1fae5", legs: null,   lc: null,      feet: "#f9a8d4", line: "#047857" },
    F11: { sleeve: "long",  sc: "#f8fafc", legs: "long", lc: "#f8fafc", feet: "#f97316", line: "#475569" },
    F12: { sleeve: "long",  sc: "#ffffff", legs: "long", lc: "#1f2937", feet: "#78350f", line: "#334155", stripes: "#dc2626" },
    F13: { sleeve: null,    sc: null,      legs: "long", lc: "#10b981", feet: "#059669", line: "#065f46" },
    F14: { sleeve: "long",  sc: "#94a3b8", legs: "long", lc: "#94a3b8", feet: "#475569", line: "#334155" },
    F15: { sleeve: null,    sc: null,      legs: "long", lc: "#e9a8e0", feet: "#c4b5fd", line: "#7c3aed" },
    F16: { sleeve: "long",  sc: "#fdba74", legs: "long", lc: "#fdba74", feet: "#fff7ed", line: "#c2410c" },
    F17: { sleeve: "long",  sc: "#f8fafc", legs: "long", lc: "#f8fafc", feet: "#fbcfe8", line: "#94a3b8" },
    F18: { sleeve: "long",  sc: "#1f2937", legs: "long", lc: "#1f2937", feet: "#1f2937", line: "#0f172a" },
    F19: { sleeve: "long",  sc: "#fbbf24", legs: "long", lc: "#fbbf24", feet: "#fef3c7", line: "#a16207" },
    F20: { sleeve: "long",  sc: "#a16207", legs: "long", lc: "#a16207", feet: "#fde68a", line: "#451a03" },
    F21: { sleeve: "long",  sc: "#60a5fa", legs: "long", lc: "#60a5fa", feet: "#f8fafc", line: "#1e40af" },
    F22: { sleeve: "long",  sc: "#fdf2f8", legs: "long", lc: "#fdf2f8", feet: "#c4b5fd", line: "#db2777" },
    F24: { sleeve: "long",  sc: "#ea580c", legs: "long", lc: "#ea580c", feet: "#fed7aa", line: "#7c2d12" },
  };

  // ชุดคลุมแขน/ขาของน้องเฉพาะส่วนที่ชุดนั้นคลุมจริง โดยใช้รูปน้องเป็นแม่พิมพ์ (รูปทรงพอดีตัวทุกตัว)
  // แขนสั้น = คลุมแค่ไหล่กับต้นแขน, แขนยาว = คลุมถึงข้อมือ, กระโปรง = ไม่คลุมขา
  function limbLayer(u, id, petKey) {
    const f = PET_FIT[petKey], C = COVER[id];
    if (!f || !C) return "";
    const img = `<image href="assets/${petKey}.png?v=9" x="0" y="0" width="100" height="100" preserveAspectRatio="xMidYMid meet"/>`;
    const x0 = f.cx - f.w / 2 - 4, w = f.w + 8;
    const top = f.neck + 1.5, span = f.bottom - f.neck;
    const hip = f.neck + 0.66 * span, foot = f.bottom - 0.1 * span;
    const bands = []; // [y1, y2, สี, มีขอบปลาย]
    if (C.sleeve === "short") bands.push([top, top + 0.32 * (hip - top), C.sc, true]);
    if (C.sleeve === "long") bands.push([top, hip - 0.1 * (hip - top), C.sc, true]);
    if (C.legs === "short") bands.push([hip - 1, hip + 0.4 * (foot - hip), C.lc, true]);
    if (C.legs === "long") bands.push([hip - 1, foot + 0.3, C.lc, false]);
    if (C.feet) bands.push([foot, 110, C.feet, false]);
    if (!bands.length) return "";
    let fills = "", cuffs = "";
    for (const [y1, y2, col, cuff] of bands) {
      fills += `<rect x="0" y="${y1.toFixed(1)}" width="100" height="${(y2 - y1).toFixed(1)}" fill="${col}"/>`;
      if (col === C.sc && C.stripes) for (let y = y1 + 4; y < y2 - 1; y += 5) fills += `<rect x="0" y="${y.toFixed(1)}" width="100" height="1.6" fill="${C.stripes}"/>`;
      if (cuff && y2 < 100) cuffs += `<rect x="0" y="${(y2 - 1.6).toFixed(1)}" width="100" height="1.6" fill="${C.line}" opacity=".85"/>`;
    }
    fills += cuffs + `<rect x="0" y="${top}" width="100" height="70" fill="url(#${u}sh)"/>`;
    // ส่วนที่ถูกคลุม (ใช้ทำเส้นขอบเฉพาะบนผ้า)
    const covered = bands.map(([y1, y2]) => `<rect x="-10" y="${y1.toFixed(1)}" width="120" height="${(y2 - y1).toFixed(1)}"/>`).join("");
    return `<defs>` +
      `<mask id="${u}m" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">${img}</mask>` +
      `<clipPath id="${u}lc">${covered}</clipPath>` +
      `<linearGradient id="${u}fg" gradientUnits="userSpaceOnUse" x1="${(x0 - 3).toFixed(1)}" y1="0" x2="${(x0 + w + 3).toFixed(1)}" y2="0">` +
      `<stop offset="0" stop-color="#000"/><stop offset="${(6 / (w + 6)).toFixed(3)}" stop-color="#fff"/>` +
      `<stop offset="${(1 - 6 / (w + 6)).toFixed(3)}" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>` +
      `<mask id="${u}fm" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="130"><rect x="-10" y="-10" width="120" height="130" fill="url(#${u}fg)"/></mask>` +
      `<linearGradient id="${u}sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>` +
      `<filter id="${u}ed" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">` +
      `<feMorphology in="SourceAlpha" operator="erode" radius="0.9" result="er"/>` +
      `<feComposite in="SourceAlpha" in2="er" operator="out" result="rim"/>` +
      `<feFlood flood-color="${C.line}"/><feComposite in2="rim" operator="in"/></filter>` +
      `</defs>` +
      `<g clip-path="url(#${u}lc)"><g mask="url(#${u}fm)"><g mask="url(#${u}m)">${fills}</g><g filter="url(#${u}ed)">${img}</g></g></g>`;
  }

  let uid = 0;
  // mode: "wear" = กรอบเต็มเท่ารูปสัตว์ (ปรับให้พอดีตัว petKey), "icon" = ไอคอนในร้านค้า
  window.getOutfitSvg = function (id, sizePx, mode = "wear", petKey = "") {
    const draw = OUTFITS[id];
    if (!draw) return "";
    const u = "of" + id + "_" + uid++;
    let vb = "0 0 100 100", body = draw(u);
    if (mode === "wear") {
      const t = fitTransforms(petKey);
      // วิธีใหม่: ตัดชุดตามสัดส่วนจริงของน้องตัวนั้น (outfits_fit.js)
      const fitted = id !== "F25" && window.getFittedOutfitBody ? window.getFittedOutfitBody(u, id, petKey) : null;
      if (fitted) {
        body = fitted +
          `<defs><clipPath id="${u}wh"><rect x="-20" y="-40" width="140" height="70"/></clipPath></defs>` +
          `<g transform="${t.head}"><g clip-path="url(#${u}wh)">${draw(u + "h")}</g></g>`;
        const style = `position:absolute; left:0; top:0; width:${sizePx}px; height:${sizePx}px; overflow:visible; pointer-events:none;`;
        return `<svg viewBox="0 0 100 100" class="pet-outfit-svg" style="${style}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
      }
      const limbs = id === "F25" ? "" : limbLayer(u, id, petKey);
      LIMBS = !!limbs;
      try {
        body = id === "F25"
          ? `<g transform="${t.whole}">${body}</g>`
          : limbs +
            `<defs><clipPath id="${u}wb"><rect x="-20" y="30" width="140" height="90"/></clipPath>` +
            `<clipPath id="${u}wh"><rect x="-20" y="-40" width="140" height="70"/></clipPath></defs>` +
            `<g transform="${t.body}"><g clip-path="url(#${u}wb)">${draw(u + "b")}</g></g>` +
            `<g transform="${t.head}"><g clip-path="url(#${u}wh)">${draw(u + "h")}</g></g>`;
      } finally { LIMBS = false; }
    }
    if (mode === "icon" && id !== "F25") {
      // ไอคอน: ยกเครื่องประดับหัวลงมาไว้เหนือชุด ไม่ให้มีช่องว่างตรงหน้า
      vb = "12 10 76 90";
      body = `<defs><clipPath id="${u}cb"><rect x="-20" y="40" width="140" height="80"/></clipPath>` +
        `<clipPath id="${u}ct"><rect x="-20" y="-40" width="140" height="58"/></clipPath></defs>` +
        `<g clip-path="url(#${u}cb)">${body}</g>` +
        `<g transform="translate(0 30)"><g clip-path="url(#${u}ct)">${draw(u + "h")}</g></g>`;
    }
    const style = mode === "icon"
      ? `width:${sizePx}px; height:${sizePx}px; overflow:visible; filter:drop-shadow(0 3px 4px rgba(0,0,0,.18));`
      : `position:absolute; left:0; top:0; width:${sizePx}px; height:${sizePx}px; overflow:visible; pointer-events:none; filter:drop-shadow(0 2px 3px rgba(0,0,0,.15));`;
    return `<svg viewBox="${vb}" class="pet-outfit-svg" style="${style}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
  };
  // ให้น้องตัวมาตรฐาน (pets_std.js) เรียกวาดชุดแบบเต็มตัวได้
  window.__outfitDraw = (id, u) => (OUTFITS[id] ? OUTFITS[id](u) : "");
  window.hasOutfitSvg = (id) => !!OUTFITS[id];
})();
