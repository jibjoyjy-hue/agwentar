// น้องตัวมาตรฐาน (แบบตุ๊กตากระดาษ): ทุกตัวใช้ลำตัวทรงเดียวกัน ต่างกันที่หัว สีตัว และหาง
// หัว = ตัดจากรูปเดิมของน้อง (assets/pethead/*.png) / ลำตัว = วาดใหม่ (SVG)
// ชุดทุกชุดวาดมาให้พอดีลำตัวนี้ จึงใส่ได้พอดีทุกตัว
// พิกัด 0–100 ของกรอบรูปน้อง
(function () {
  // ตำแหน่งหัวในรูปเดิม: top = บนสุดของหัว, neck = แนวคอ, hx = กึ่งกลางหัว, hw = ความกว้างหัว
  const HEAD = {
    aimee:    { top: 6, neck: 45, hx: 52, hw: 44 },
    blob:     { top: 13, neck: 57, hx: 55, hw: 62 },
    bunny:    { top: 6, neck: 53, hx: 57, hw: 52 },
    cat:      { top: 8, neck: 51, hx: 36, hw: 56 },
    puppy:    { top: 6, neck: 52, hx: 57, hw: 52 },
    penguin:  { top: 6, neck: 47, hx: 54, hw: 58 },
    bear:     { top: 12, neck: 57, hx: 47, hw: 46 },
    panda:    { top: 4, neck: 54, hx: 50, hw: 64 },
    fox:      { top: 8, neck: 55, hx: 38, hw: 58 },
    chick:    { top: 12, neck: 52, hx: 50, hw: 60 },
    otter:    { top: 5, neck: 46, hx: 52, hw: 52 },
    hamster:  { top: 10, neck: 52, hx: 47, hw: 62 },
    dino:     { top: 6, neck: 54, hx: 30, hw: 52 },
    pig:      { top: 5, neck: 53, hx: 47, hw: 64 },
    capybara: { top: 6, neck: 52, hx: 46, hw: 52 },
    parrot:   { top: 6, neck: 46, hx: 45, hw: 46 },
    giraffe:  { top: 15, neck: 60, hx: 48, hw: 46 },
    elephant: { top: 7, neck: 58, hx: 52, hw: 56 },
  };

  // สีตัว: fur = ขน, belly = พุง, limb = แขนขา (ถ้าต่างจากขน), feet = เท้า, line = เส้นขอบ, tail = แบบหาง
  const LOOK = {
    aimee:    { fur: "#f0a75a", belly: "#f9d3a8", feet: "#e08a3c", line: "#7a4520", tail: "ball", tailc: "#f0a75a", vectorHead: "bear", bow: true },
    blob:     { fur: "#8fd3f0", belly: "#c4ecfa", feet: "#6cc0e6", line: "#1c5a79", tail: null },
    bunny:    { fur: "#fdc6d4", belly: "#fef1f8", feet: "#f7a8bd", line: "#8a3a55", tail: "pom", tailc: "#fff5f8" },
    cat:      { fur: "#fcb35f", belly: "#ffedd7", feet: "#ffedd7", line: "#5a2a10", stripes: "#e9803a", tail: "curl" },
    puppy:    { fur: "#f2be87", belly: "#fee8d1", feet: "#fee8d1", line: "#5c3317", tail: "thin" },
    penguin:  { fur: "#6f8fcf", belly: "#ffffff", feet: "#fcac35", line: "#1e3a5f", tail: null },
    bear:     { fur: "#c98b55", belly: "#f1cfa5", feet: "#f1cfa5", line: "#5c3317", tail: "ball", tailc: "#c98b55", vectorHead: "bear" },
    panda:    { fur: "#ffffff", belly: "#ffffff", limb: "#3f414a", feet: "#3f414a", line: "#1f2023", tail: "ball", tailc: "#ffffff" },
    fox:      { fur: "#fe8249", belly: "#fdedd7", limb: "#a4401a", feet: "#7c2d12", line: "#4a1a0a", tail: "bushy" },
    chick:    { fur: "#fde26e", belly: "#fff0a0", feet: "#f9a235", line: "#7a4a10", tail: null },
    otter:    { fur: "#b188cb", belly: "#ebccf6", feet: "#8e62af", line: "#3d2357", tail: "thick" },
    hamster:  { fur: "#f6c26b", belly: "#fff6e2", limb: "#fde3b0", feet: "#fbcdc2", line: "#6b3d12", tail: null },
    dino:     { fur: "#8ec992", belly: "#dbf391", feet: "#75b583", line: "#2f5a33", tail: "spiky", tailc: "#c8e07a" },
    pig:      { fur: "#fdc8c4", belly: "#ffe0de", feet: "#f4a9a3", line: "#6b2f2f", tail: "pigcurl" },
    capybara: { fur: "#d39a6a", belly: "#f5ceae", feet: "#b07a4e", line: "#5a3416", tail: null },
    parrot:   { fur: "#e33b3b", belly: "#fbdb16", limb: "#325ea8", feet: "#f9a949", line: "#5a1414", tail: "feathers" },
    giraffe:  { fur: "#f6c26e", belly: "#fdebcc", feet: "#8a5a2b", line: "#7a4a1a", spots: "#c98a3c", tail: "tuft" },
    elephant: { fur: "#b4c6da", belly: "#c9d7e5", feet: "#e6edf4", line: "#3a4a5e", tail: "tuft" },
  };

  // ---------- ลำตัวมาตรฐาน (ชุดทุกชุดออกแบบให้พอดีรูปทรงนี้) ----------
  const TORSO = "M38,51 Q50,55.5 62,51 Q64.5,62 64,78 Q64,87 58,88 L42,88 Q36,87 36,78 Q35.5,62 38,51Z";
  const ARM_L = "M38.5,53 Q30.5,55 28,65 Q27,71 30.5,71.8 Q33.5,72.2 34.5,68 L37.5,61Z";
  const ARM_R = "M61.5,53 Q69.5,55 72,65 Q73,71 69.5,71.8 Q66.5,72.2 65.5,68 L62.5,61Z";
  const LEG_L = "M40.5,85 L40.5,94.5 Q44,97.6 47.5,94.5 L47.5,86Z";
  const LEG_R = "M52.5,86 L52.5,94.5 Q56,97.6 59.5,94.5 L59.5,85Z";
  const SW = 'stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"';
  const P = (d, fill, line, extra = "") => `<path d="${d}" fill="${fill}" stroke="${line}" ${SW} ${extra}/>`;

  function tailSvg(L) {
    const f = L.fur, l = L.line, c = L.tailc || L.belly;
    switch (L.tail) {
      case "curl": return `<path d="M62,82 Q76,84 79,74 Q81,66 76,63" fill="none" stroke="${l}" stroke-width="5.6" stroke-linecap="round"/><path d="M62,82 Q76,84 79,74 Q81,66 76,63" fill="none" stroke="${f}" stroke-width="3.4" stroke-linecap="round"/>` +
        (L.stripes ? `<path d="M70,82.5 l1.5,-2.5 M76.5,77 l2.5,-0.5 M79,69.5 l2.4,0.8" stroke="${L.stripes}" stroke-width="1.6" stroke-linecap="round"/>` : "");
      case "thin": return `<path d="M62,84 Q72,84 75,74" fill="none" stroke="${l}" stroke-width="4.4" stroke-linecap="round"/><path d="M62,84 Q72,84 75,74" fill="none" stroke="${f}" stroke-width="2.4" stroke-linecap="round"/>`;
      case "pom": return `<circle cx="64.5" cy="83" r="5" fill="${c}" stroke="${l}" stroke-width="1.2"/>`;
      case "ball": return `<circle cx="63" cy="84" r="3.4" fill="${c}" stroke="${l}" stroke-width="1.2"/>`;
      case "bushy": return P("M60,84 Q78,90 84,72 Q87,60 80,56 Q82,66 76,72 Q70,78 61,78Z", f, l) + P("M84,72 Q87,60 80,56 Q81,63 79,67 Q83,68 84,72Z", "#fff7ed", l, 'stroke-width="1"');
      case "thick": return P("M61,80 Q74,84 80,74 Q82,70 79,69 Q73,77 62,75Z", f, l);
      case "spiky": return P("M60,78 Q76,88 86,92 Q74,93 60,88Z", f, l) + P("M66,83 l2,-4 l2,5 M72,86 l2,-4 l2,5 M78,89 l2,-3.5 l1.5,4", c, l, 'stroke-width=".9"');
      case "pigcurl": return `<path d="M63,82 q5,-1 5,-4 q0,-3 -3,-2.5 q-2.5,0.5 -1,3 q2,3 6,1" fill="none" stroke="${l}" stroke-width="1.6" stroke-linecap="round"/>`;
      case "feathers": return P("M58,84 L70,94 L66,86Z", "#325ea8", l) + P("M60,82 L74,90 L68,82Z", f, l);
      case "tuft": return `<path d="M63,80 Q70,82 72,76" fill="none" stroke="${l}" stroke-width="1.6"/>` + P("M71,77 q3,-5 2,-7 q-3,1 -4,5Z", L.feet, l, 'stroke-width="1"');
      default: return "";
    }
  }

  function bodySvg(u, L) {
    const limb = L.limb || L.fur;
    let s = tailSvg(L);
    s += P(LEG_L, limb, L.line) + P(LEG_R, limb, L.line);
    s += `<ellipse cx="44" cy="95.6" rx="4.4" ry="2.3" fill="${L.feet}" stroke="${L.line}" stroke-width="1.1"/><ellipse cx="56" cy="95.6" rx="4.4" ry="2.3" fill="${L.feet}" stroke="${L.line}" stroke-width="1.1"/>`;
    s += P(TORSO, L.fur, L.line);
    s += `<defs><clipPath id="${u}tc"><path d="${TORSO}"/></clipPath></defs>`;
    s += `<g clip-path="url(#${u}tc)"><ellipse cx="50" cy="73" rx="10" ry="12" fill="${L.belly}"/>` +
      (L.spots ? `<circle cx="40" cy="60" r="2.4" fill="${L.spots}"/><circle cx="60" cy="64" r="2.8" fill="${L.spots}"/><circle cx="41" cy="80" r="2.2" fill="${L.spots}"/><circle cx="59" cy="82" r="2.4" fill="${L.spots}"/>` : "") +
      (L.stripes ? `<path d="M36,60 l4,1 M36,66 l4,1 M64,60 l-4,1 M64,66 l-4,1" stroke="${L.stripes}" stroke-width="1.6" stroke-linecap="round"/>` : "") +
      `<rect x="30" y="50" width="40" height="40" fill="url(#${u}sh)"/></g>`;
    s += P(ARM_L, limb, L.line) + P(ARM_R, limb, L.line);
    if (L.stripes) s += `<path d="M30.5,62 l3,1 M29.5,66.5 l3,0.6 M69.5,62 l-3,1 M70.5,66.5 l-3,0.6" stroke="${L.stripes}" stroke-width="1.4" stroke-linecap="round"/>`;
    return `<defs><linearGradient id="${u}sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient></defs>` + s;
  }

  // หัว: ปรับให้กว้างเท่ากันทุกตัว (56) วางกึ่งกลาง คางอยู่ที่ y≈53
  const HEAD_W = 56, CHIN_Y = 53.5;
  function headPlace(H) {
    const s = HEAD_W / H.hw;
    return { s, x: 50 - H.hx * s, y: CHIN_Y - H.neck * s, top: CHIN_Y - (H.neck - H.top) * s };
  }

  // หัวหมีแบบ 2 มิติ (วาดใหม่ ลายเส้นเดียวกับน้องตัวอื่น) ใช้แทนรูปหมี 3 มิติ
  // พื้นที่หัว: กว้าง 56 (x 22–78) คางที่ y≈53.5 ด้านบนสุด y≈5
  function bearHead(L, u) {
    // ลายเส้นแบบเดียวกับน้องตัวอื่น: เส้นขอบหนาสีเข้ม แสงเงานุ่ม ตาโตมีประกาย
    const f = L.fur, l = L.line, m = L.belly, dark = L.fur2 || L.line;
    let s = `<defs><radialGradient id="${u}hg" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></radialGradient>` +
      `<radialGradient id="${u}mg" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>`;
    const W = 'stroke-width="2.3" stroke-linejoin="round"';
    // หู
    for (const [x, rot] of [[27, -12], [73, 12]]) {
      s += `<g transform="rotate(${rot} ${x} 14)"><ellipse cx="${x}" cy="14" rx="9.5" ry="9" fill="${f}" stroke="${l}" ${W}/><ellipse cx="${x}" cy="15" rx="5.3" ry="5" fill="#f2b3a6"/></g>`;
    }
    // หัว (แก้มป่องเล็กน้อย)
    const HEADP = "M50,8.5 C66,8.5 78.5,17 78.5,31 C78.5,39 76,45 70,49 C64,53 57,54.3 50,54.3 C43,54.3 36,53 30,49 C24,45 21.5,39 21.5,31 C21.5,17 34,8.5 50,8.5Z";
    s += `<path d="${HEADP}" fill="${f}" stroke="${l}" ${W}/><path d="${HEADP}" fill="url(#${u}hg)"/>`;
    // ปาก/จมูก
    s += `<ellipse cx="50" cy="42" rx="10.5" ry="8" fill="${m}"/><ellipse cx="50" cy="42" rx="10.5" ry="8" fill="url(#${u}mg)"/>`;
    s += `<path d="M46.2,36.8 Q50,35.2 53.8,36.8 Q54.6,38.4 51.6,40.4 Q50,41.4 48.4,40.4 Q45.4,38.4 46.2,36.8Z" fill="#3a2010" stroke="#2a160a" stroke-width=".6"/><ellipse cx="48.6" cy="37.4" rx="1.3" ry=".7" fill="#fff" opacity=".7"/>`;
    s += `<path d="M50,41 L50,43.6 M45.6,43.4 Q47.8,46.6 50,43.6 Q52.2,46.6 54.4,43.4" fill="none" stroke="#3a2010" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;
    // ตา
    for (const x of [38, 62]) {
      s += `<ellipse cx="${x}" cy="32" rx="4.6" ry="5.4" fill="#2c1609"/><ellipse cx="${x}" cy="34.2" rx="3.4" ry="2.6" fill="#6b3d1f" opacity=".85"/>` +
        `<circle cx="${x + 1.5}" cy="30" r="1.9" fill="#fff"/><circle cx="${x - 1.4}" cy="34.4" r=".9" fill="#fff"/>`;
    }
    // แก้ม
    s += `<ellipse cx="29.5" cy="40.5" rx="4.8" ry="3" fill="#f58f9b" opacity=".6"/><ellipse cx="70.5" cy="40.5" rx="4.8" ry="3" fill="#f58f9b" opacity=".6"/>`;
    if (L.bow) {
      s += `<g transform="rotate(-18 27 9)"><path d="M27,9 L15.5,2.5 Q12,9 15.5,15.5Z M27,9 L38.5,2.5 Q42,9 38.5,15.5Z" fill="#f9a8c8" stroke="#a3124f" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<circle cx="19" cy="6.5" r="1.1" fill="#fff"/><circle cx="18" cy="12" r="1.1" fill="#fff"/><circle cx="35" cy="6.5" r="1.1" fill="#fff"/><circle cx="36" cy="12" r="1.1" fill="#fff"/>` +
        `<ellipse cx="27" cy="9" rx="3.2" ry="3.6" fill="#f472b6" stroke="#a3124f" stroke-width="1.6"/></g>`;
    }
    return s;
  }

  let uid = 0;
  // คืน <svg> ของน้องตัวมาตรฐาน (+ชุด ถ้ามี) ขนาด sizePx
  window.getStandardPetSvg = function (petKey, sizePx, outfitId) {
    const H = HEAD[petKey], L = LOOK[petKey];
    if (!H || !L) return "";
    const u = "sp" + uid++;
    const hp = L.vectorHead ? { top: 7 } : headPlace(H);
    const head = L.vectorHead ? bearHead(L, u) : `<image href="assets/pethead/${petKey}.png?v=6" x="${hp.x.toFixed(2)}" y="${hp.y.toFixed(2)}" width="${(100 * hp.s).toFixed(2)}" height="${(100 * hp.s).toFixed(2)}" preserveAspectRatio="xMidYMid meet"/>`;
    let under = "", over = "";
    const draw = outfitId && window.__outfitDraw ? (k) => window.__outfitDraw(outfitId, k) : null;
    if (draw) {
      if (outfitId === "F25") {
        over = draw(u + "g");
      } else {
        // ตัวชุด (ใต้หัว) / ของบนหัว (บนหัว)
        const hs = HEAD_W / 48;
        under = `<defs><clipPath id="${u}cb"><rect x="-20" y="30" width="140" height="90"/></clipPath><clipPath id="${u}ch"><rect x="-20" y="-40" width="140" height="70"/></clipPath></defs>` +
          `<g clip-path="url(#${u}cb)">${draw(u + "b")}</g>`;
        over = `<g transform="matrix(${hs.toFixed(3)} 0 0 ${hs.toFixed(3)} ${(50 - 50 * hs).toFixed(2)} ${(hp.top + 3 - 10 * hs).toFixed(2)})"><g clip-path="url(#${u}ch)">${draw(u + "h")}</g></g>`;
      }
    }
    return `<svg viewBox="0 0 100 100" width="${sizePx}" height="${sizePx}" style="display:block; overflow:visible;" xmlns="http://www.w3.org/2000/svg" aria-label="${petKey}">${bodySvg(u, L)}${under}${head}${over}</svg>`;
  };
  window.hasStandardPet = (petKey) => !!(HEAD[petKey] && LOOK[petKey]);
})();
