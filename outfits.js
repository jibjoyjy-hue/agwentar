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

  // ---------- ชิ้นส่วนเดรส ----------
  const SKIRT = "M36,67 C45,70 55,70 64,67 L79,89 Q72,95 65,91 Q58,97 50,92 Q42,97 35,91 Q28,95 21,89 Z";
  const LONG_SKIRT = "M37,67 C45,70 55,70 63,67 L76,92 Q50,99 24,92 Z";
  const BODICE = "M37,52 Q50,57 63,52 L64,68 Q50,71 36,68 Z";
  const puffs = (fill, stroke) => e(33.5, 55.5, 5.6, 4.6, fill, stroke) + e(66.5, 55.5, 5.6, 4.6, fill, stroke);
  const legs = (fill, stroke) => p("M41,90 L41,96 Q44,98 47,96 L47,91Z", fill, stroke) + p("M53,91 L53,96 Q56,98 59,96 L59,90Z", fill, stroke);

  // ---------- ชิ้นส่วนชุด Onesie ----------
  const ONESIE =
    "M35,51 Q50,56 65,51 L67,80 Q67,88 61,89 L60,95 Q56,98 52,95 L51,89 L49,89 L48,95 Q44,98 40,95 L39,89 Q33,88 33,80 Z";
  const ARM_L = "M35,52 Q27,55 25,66 Q24,71 28,72 Q31,72 32,68 L35,60";
  const ARM_R = "M65,52 Q73,55 75,66 Q76,71 72,72 Q69,72 68,68 L65,60";
  const onesieBase = (main, line, belly, opts = {}) =>
    p(ARM_L, main, line) + p(ARM_R, main, line) + p(ONESIE, main, line) +
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
      p("M30,55 L28,80 Q28,84 32,84 L35,84 L35,55Z", "#cbd5e1", "#475569") +
      p("M70,55 L72,80 Q72,84 68,84 L65,84 L65,55Z", "#cbd5e1", "#475569") +
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
      p(ARM_L, "#fff", "#334155") + p(ARM_R, "#fff", "#334155") +
      p("M27,58 L33,57 M26,63 L33,62 M25,68 L32,67 M73,58 L67,57 M74,63 L67,62 M75,68 L68,67", "none", "#dc2626", 'stroke-width="1.8"') +
      p("M33,76 L67,76 L66,88 L60,89 L59,96 L52,96 L50,89 L48,96 L41,96 L40,89 L34,88Z", "#1f2937", "#0f172a") +
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
      p("M33,55 L25,57 L24,72 L30,72 L31,61 L33,60Z", "#94a3b8", "#334155") +
      p("M67,55 L75,57 L76,72 L70,72 L69,61 L67,60Z", "#94a3b8", "#334155") +
      p("M23,72 L31,72 L31,76 L23,76Z M69,72 L77,72 L77,76 L69,76Z", "#64748b", "#334155") +
      `<rect x="40" y="82" width="7" height="12" rx="1" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>` +
      `<rect x="53" y="82" width="7" height="12" rx="1" fill="#94a3b8" stroke="#334155" stroke-width="1.2"/>` +
      `<rect x="38" y="93" width="10" height="4" rx="1" fill="#475569"/><rect x="52" y="93" width="10" height="4" rx="1" fill="#475569"/>` +
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

  let uid = 0;
  // mode: "wear" = กรอบเต็มเท่ารูปสัตว์, "icon" = ไอคอนในร้านค้า
  window.getOutfitSvg = function (id, sizePx, mode = "wear") {
    const draw = OUTFITS[id];
    if (!draw) return "";
    const u = "of" + id + "_" + uid++;
    let vb = "0 0 100 100", body = draw(u);
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
  window.hasOutfitSvg = (id) => !!OUTFITS[id];
})();
