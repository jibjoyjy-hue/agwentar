// js/core/ai.js: เรียก AI ผ่าน Cloudflare Worker (/chat)
// AI เรียกผ่าน Cloudflare Worker (ai-proxy/) เท่านั้น
// system prompt, การตรวจคำเสี่ยง และการจำกัดจำนวนข้อความอยู่ฝั่ง Worker เว็บแก้ไม่ได้
const AI_PROXY_URL = "https://agwentar-ai.jibjoyjy.workers.dev";

// ลบ API key ที่เคยให้ผู้ใช้ใส่ไว้ในเวอร์ชันก่อน (ไม่ใช้แล้ว)
try { localStorage.removeItem("agwentar_gemini_key"); } catch (e) {}

// messages: [{ role: "user" | "model", text }]  →  { reply, crisis }
async function aiChat(messages) {
  const r = await fetch(`${AI_PROXY_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lang: state.lang === "en" ? "en" : "th", messages }),
  });
  if (r.status === 429) {
    const e = new Error("daily limit"); e.code = "limit"; throw e;
  }
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}
