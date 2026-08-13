const fetch = require('node-fetch');

async function test() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=TEST_INVALID_KEY`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "สวัสดี" }] }]
      })
    });
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Response body:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
