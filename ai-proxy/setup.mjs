// ai-proxy/setup.mjs: ตั้งค่าและ deploy Cloudflare Worker ในคำสั่งเดียว
// วิธีใช้: ดับเบิลคลิก setup.bat (Windows) หรือรัน  node setup.mjs  ในโฟลเดอร์ ai-proxy
//
// ทำตามลำดับ:
//  1. ตรวจว่าล็อกอิน Cloudflare แล้ว (ถ้ายัง จะเปิดเบราว์เซอร์ให้ล็อกอิน)
//  2. หา/สร้าง KV ชื่อ RATE และ PREMIUM แล้วใส่ id ลงใน wrangler.toml ให้เอง
//  3. ตั้ง secret GEMINI_API_KEY และ ADMIN_TOKEN ถ้ายังไม่มี (ให้พิมพ์เอง ไม่เก็บไว้ในไฟล์)
//  4. deploy
//  5. ทดสอบ /chat และ /premium/redeem
import { execSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const W = "npx --yes wrangler@4";
const run = (cmd) => execSync(`${W} ${cmd}`, { encoding: "utf8", stdio: ["inherit", "pipe", "pipe"] });
const runLive = (cmd) => {
  const r = spawnSync(`${W} ${cmd}`, { shell: true, stdio: "inherit" });
  if (r.status !== 0) throw new Error(`คำสั่งไม่สำเร็จ: wrangler ${cmd}`);
};
const step = (t) => console.log(`\n=== ${t} ===`);

function parseJson(text) {
  const i = text.indexOf("["), j = text.indexOf("{");
  const start = i < 0 ? j : j < 0 ? i : Math.min(i, j);
  return JSON.parse(text.slice(start));
}

// ใส่หรือแก้บล็อก [[kv_namespaces]] ของ binding ที่กำหนด
export function setKvBinding(toml, binding, id) {
  const block = `[[kv_namespaces]]\nbinding = "${binding}"\nid = "${id}"`;
  // ลบบล็อกเดิมของ binding นี้ (ทั้งแบบเปิดใช้และแบบคอมเมนต์ไว้)
  const re = new RegExp(`(^|\\n)#?\\s*\\[\\[kv_namespaces\\]\\]\\n#?\\s*binding = "${binding}"\\n#?\\s*id = "[^"\\n]*"`, "g");
  let out = toml.replace(re, "");
  return out.replace(/\s*$/, "") + `\n\n${block}\n`;
}

async function main() {
  step("1. ตรวจการล็อกอิน Cloudflare");
  let who = "";
  try { who = run("whoami"); } catch { who = ""; }
  if (!who || /not authenticated|not logged in/i.test(who)) runLive("login");
  else console.log(who.trim().split("\n").slice(0, 4).join("\n"));

  step("2. KV namespaces");
  let list = parseJson(run("kv namespace list"));
  const find = (name) => list.find(n => n.title === name || n.title.endsWith(`-${name}`) || n.title.endsWith(`_${name}`));
  let toml = readFileSync("wrangler.toml", "utf8");
  for (const name of ["RATE", "PREMIUM"]) {
    let ns = find(name);
    if (!ns) {
      console.log(`สร้าง KV ${name} ...`);
      run(`kv namespace create ${name}`);
      list = parseJson(run("kv namespace list"));
      ns = find(name);
    }
    if (!ns) throw new Error(`หา KV ${name} ไม่เจอหลังสร้าง`);
    console.log(`${name} = ${ns.id} (${ns.title})`);
    toml = setKvBinding(toml, name, ns.id);
  }
  writeFileSync("wrangler.toml", toml);
  console.log("อัปเดต wrangler.toml แล้ว");

  step("3. Secrets");
  let secrets = [];
  for (const cmd of ["secret list --format json", "secret list"]) {
    try { secrets = parseJson(run(cmd)).map(s => s.name); break; } catch { /* ลองแบบถัดไป / Worker ยังไม่เคย deploy */ }
  }
  for (const name of ["GEMINI_API_KEY", "ADMIN_TOKEN"]) {
    if (secrets.includes(name)) { console.log(`${name}: มีแล้ว`); continue; }
    console.log(`\nตั้งค่า ${name}` + (name === "ADMIN_TOKEN" ? " (รหัสสำหรับหน้าแอดมิน ตั้งให้ยาวและเดายาก จดไว้ด้วย)" : " (API key จาก Google AI Studio)"));
    runLive(`secret put ${name}`);
  }

  step("4. Deploy");
  runLive("deploy");

  step("5. ทดสอบ");
  const base = "https://agwentar-ai.jibjoyjy.workers.dev";
  const post = (path, body) => fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json", Origin: "http://localhost" }, body: JSON.stringify(body) })
    .then(async r => [r.status, await r.text()]);
  try {
    console.log("/chat (ปกติ)       ->", ...(await post("/chat", { lang: "th", messages: [{ role: "user", text: "สวัสดี วันนี้เหนื่อยนิดหน่อย" }] })));
    console.log("/chat (คำเสี่ยง)    ->", ...(await post("/chat", { lang: "th", messages: [{ role: "user", text: "อยากตาย" }] })));
    console.log("/premium/redeem    ->", ...(await post("/premium/redeem", { code: "PRM-AAAA-AAAA" })), "(ควรได้ 404 not_found)");
  } catch (e) {
    console.log("ทดสอบไม่ได้:", e.message);
  }
  console.log("\nเสร็จแล้ว ถ้า /chat ตอบ 200 และมีข้อความ แปลว่า AI ใช้ได้ ต่อไป push เว็บด้วย  git push origin main");
}

if (process.argv[1] && process.argv[1].endsWith("setup.mjs")) {
  main().catch(e => { console.error("\nผิดพลาด:", e.message); process.exitCode = 1; });
}
