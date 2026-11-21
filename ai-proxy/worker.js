// agwentar AI proxy (Cloudflare Worker)
// เว็บเรียก  POST https://<worker>/v1beta/models/<model>:generateContent  (ไม่ต้องมี key)
// Worker เติม key จาก secret GEMINI_API_KEY แล้วส่งต่อให้ Google
// key จึงไม่อยู่ในโค้ดหน้าเว็บอีกต่อไป

const ALLOWED_ORIGINS = [
  "https://jibjoyjy-hue.github.io",
];
const ALLOWED_MODELS = ["gemini-3.1-flash-lite"];
const MAX_BODY = 64 * 1024;        // 64 KB ต่อคำขอ
const MAX_OUTPUT_TOKENS = 1000;

function isAllowedOrigin(o) {
  if (!o) return false;
  if (ALLOWED_ORIGINS.includes(o)) return true;
  // ทดสอบในเครื่อง
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(o);
}

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(status, obj, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...(origin ? cors(origin) : {}) },
  });
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    if (!isAllowedOrigin(origin)) return json(403, { error: { message: "origin not allowed" } });
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
    if (req.method !== "POST") return json(405, { error: { message: "POST only" } }, origin);

    const m = new URL(req.url).pathname.match(/^\/v1beta\/models\/([\w.-]+):generateContent$/);
    if (!m || !ALLOWED_MODELS.includes(m[1])) return json(404, { error: { message: "unknown model" } }, origin);
    if (!env.GEMINI_API_KEY) return json(500, { error: { message: "GEMINI_API_KEY not set" } }, origin);

    const raw = await req.text();
    if (raw.length > MAX_BODY) return json(413, { error: { message: "request too large" } }, origin);
    let body;
    try { body = JSON.parse(raw); } catch { return json(400, { error: { message: "bad json" } }, origin); }

    // จำกัดความยาวคำตอบ กันคนเอาไปใช้งานหนัก
    body.generationConfig = body.generationConfig || {};
    const t = Number(body.generationConfig.maxOutputTokens) || MAX_OUTPUT_TOKENS;
    body.generationConfig.maxOutputTokens = Math.min(t, MAX_OUTPUT_TOKENS);

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${m[1]}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_API_KEY },
        body: JSON.stringify(body),
      }
    );
    return new Response(r.body, {
      status: r.status,
      headers: { "Content-Type": "application/json", ...cors(origin) },
    });
  },
};
