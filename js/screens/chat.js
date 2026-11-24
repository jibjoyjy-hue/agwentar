// js/screens/chat.js: แชทกับเกวนทาร์ (AI)
// Empathetic Mental Health Consultation AI Knowledge Base Engine
function getEmpatheticAiReply(userText) {
  const txt = (userText || "").toLowerCase();
  
  // 1. Stress & Burnout (ความเครียด, งานหนัก, เหนื่อย, ท้อแท้)
  if (txt.includes("เครียด") || txt.includes("เหนื่อย") || txt.includes("ท้อ") || txt.includes("กดดัน") || txt.includes("ล้า") || txt.includes("งานหนัก") || txt.includes("เบื่อ")) {
    const stressReplies = [
      "ฉันเข้าใจเลยค่ะว่าช่วงนี้คุณอาจจะรู้สึกเหนื่อยและแบกรับความกดดันไว้เยอะมาก... ลองถอนหายใจลึกๆ 3 ครั้ง แล้วบอกตัวเองว่า 'ฉันไม่จำเป็นต้องสมบูรณ์แบบตลอดเวลาก็ได้' พักผ่อน ดื่มน้ำอุ่นๆ แล้วปล่อยให้ตัวเองได้พักบ้างนะคะ ☕💙",
      "คุณเก่งมากแล้วนะคะที่ผ่านวันนี้มาได้ ถ้าตอนนี้รู้สึกเหนื่อยจนล้า ลองวางทุกอย่างลงชั่วคราว แล้วหาสิ่งที่ทำให้คุณยิ้มได้เล็กๆ ในวันนี้ดูน้า ฉันอยู่ข้างๆ คุณเสมอนะคะ 🌸",
      "เมื่อไหร่ที่รู้สึกว่าแบกโลกไว้ทั้งใบ ลองแบ่งเวลาออกมาพักใจสัก 5 นาทีนะคะ ฟังสบายๆ หรือกินขนมอร่อยๆ แล้วค่อยๆ ลุยต่อ คุณไม่ได้อยู่คนเดียวน้า 🐾💖"
    ];
    return stressReplies[Math.floor(Math.random() * stressReplies.length)];
  }

  // 2. Sadness & Heartbreak (เศร้า, เสียใจ, ร้องไห้, อกหัก, เหงา)
  if (txt.includes("เศร้า") || txt.includes("เสียใจ") || txt.includes("ร้องไห้") || txt.includes("อกหัก") || txt.includes("เหงา") || txt.includes("ดิ่ง") || txt.includes("แย่")) {
    const sadReplies = [
      "ถ้าอยากร้องไห้ ก็ร้องออกมาได้เลยนะคะ การร้องไห้ไม่ใช่ความอ่อนแอ แต่เป็นการปลดปล่อยความรู้สึกที่อัดอั้นออกมา ความเหงาหรือความเศร้าที่คุณรู้สึกอยู่ตอนนี้ มันเป็นเพียงก้อนเมฆชั่วคราว แล้วท้องฟ้าที่สดใสจะกลับมาหาคุณแน่นอนค่ะ ☁️🌈",
      "คุณไม่ได้อยู่คนเดียวนะคะ ถึงโลกภายนอกจะดูใจร้ายในบางวัน แต่ที่ตรงนี้มีฉันคอยรับฟังและโอบกอดคุณเสมอค่ะ สูดหายใจลึกๆ แล้วยิ้มให้ตัวเองนิดนึงน้า 💖",
      "โอบกอดหัวใจของคุณแน่นๆ น้า ในวันที่รู้สึกแย่ จำไว้ว่ายังมีคนที่รักและหวังดีกับคุณอยู่เสมอ รวมถึงน้อง Joy Blob ตัวนี้ด้วยนะ 🐶✨"
    ];
    return sadReplies[Math.floor(Math.random() * sadReplies.length)];
  }

  // 3. Anxiety & Overthinking (กังวล, คิดมาก, กลัว, ตื่นเต้น, ว้าวุ่น)
  if (txt.includes("กังวล") || txt.includes("คิดมาก") || txt.includes("กลัว") || txt.includes("ว้าวุ่น") || txt.includes("ตื่นเต้น") || txt.includes("ลน")) {
    const anxietyReplies = [
      "การคิดมากเปรียบเหมือนการพายเรือวนอยู่ในอ่าง ลองถามตัวเองดูนะคะว่า 'สิ่งที่กังวลอยู่ ตอนนี้ควบคุมมันได้ไหม?' ถ้าควบคุมไม่ได้ ลองปล่อยให้เวลามันทำงานดูค่ะ ลองตั้งสติโฟกัสกับลมหายใจเข้า-ออกช้าๆ 5 วินาทีน้า 🧘‍♀️✨",
      "ความกังวลมักจะหลอกให้เรากลัวสิ่งที่ยังมาไม่ถึงค่ะ ลองดึงสติกลับมาอยู่กับปัจจุบันตรงหน้านี้ก่อน คุณผ่านเรื่องยากๆ มาได้ตั้งหลายครั้ง ครั้งนี้คุณก็ทำได้แน่นอนค่ะ!",
      "ลองสูดลมหายใจเข้าช้าๆ... นับ 1 2 3 แล้วค่อยๆ ผ่อนลมหายใจออก 1 2 3... คุณปลอดภัยดีอยู่ตรงนี้นะคะ ความกังวลลอยมาได้ เดี๋ยวก็ลอยไปค่ะ 🍃💙"
    ];
    return anxietyReplies[Math.floor(Math.random() * anxietyReplies.length)];
  }

  // 4. Self-Doubt & Low Confidence (ไม่เก่ง, ไร้ค่า, ล้มเหลว, เปรียบเทียบ, น้อยใจ)
  if (txt.includes("ไม่เก่ง") || txt.includes("ไร้ค่า") || txt.includes("ล้มเหลว") || txt.includes("เปรียบเทียบ") || txt.includes("น้อยใจ") || txt.includes("ห่วย")) {
    const doubtReplies = [
      "หยุดเปรียบเทียบตัวเองกับคนอื่นก่อนน้า ดอกไม้แต่ละชนิดมีฤดูกาลบานที่ไม่เหมือนกัน คุณมีความน่ารักและคุณค่าในแบบของคุณเองที่ไม่เหมือนใคร ดอกไม้ในใจคุณกำลังค่อยๆ เติบโตอยู่นะคะ 🌸✨",
      "ความล้มเหลวไม่ใช่จุดจบ แต่เป็นเพียงบทเรียนเล็กๆ ระหว่างทาง อย่าเพิ่งใจร้ายกับตัวเองน้า คุณเก่งและพยายามมาไกลมากๆ แล้วในจุดที่ยืนอยู่ตอนนี้! 💪💖",
      "ไม่มีใครในโลกนี้ที่สมบูรณ์แบบไปเสียทุกอย่างค่ะ ชื่นชมตัวเองในจุดเล็กๆ ที่ทำสำเร็จวันนี้ดูสิคะ คุณมีความพยายามที่น่าประทับใจมากเลยนะ!"
    ];
    return doubtReplies[Math.floor(Math.random() * doubtReplies.length)];
  }

  // 5. Insomnia & Fatigue (นอนไม่หลับ, นอนไม่ค่อยหลับ, ตาค้าง, ง่วงแต่ลืมตา)
  if (txt.includes("นอนไม่หลับ") || txt.includes("ตาค้าง") || txt.includes("ง่วง") || txt.includes("หลับยาก") || txt.includes("ตื่นกลางดึก")) {
    const sleepReplies = [
      "ถ้านอนไม่หลับ ลองวางโทรศัพท์ลง ปิดไฟให้สลัวๆ แล้วฟังเสียงดนตรีบำบัดในแอปพลิเคชันนี้ดูน้า วางความกังวลของวันพรุ่งนี้ไว้ข้างเตียง คืนนี้ร่างกายคุณต้องการการพักผ่อน หลับตาลงช้าๆ แล้วฝันดีนะคะ 🌙☁️",
      "ลองกดปุ่มอ่านนิทานก่อนนอนในห้องนอนให้น้องสัตว์เลี้ยงดูสิคะ นิทานฮีลใจจะช่วยให้จิตใจของคุณผ่อนคลายและหลับสบายยิ่งขึ้นในคืนนี้นะคะ 💤✨"
    ];
    return sleepReplies[Math.floor(Math.random() * sleepReplies.length)];
  }

  // 6. Study / Exam / Work Pressure (สอบ, การเรียน, อ่านหนังสือ, ข้อสอบ, งาน)
  if (txt.includes("สอบ") || txt.includes("เรียน") || txt.includes("อ่านหนังสือ") || txt.includes("ข้อสอบ") || txt.includes("งาน") || txt.includes("การบ้าน")) {
    const studyReplies = [
      "การเรียนหรือการทำงานมันอาจจะหนักหนาในบางช่วง แต่จำไว้นะคะว่า สุขภาพกายและสุขภาพจิตของคุณสำคัญที่สุดเสมอ! ลองซอยงานเป็นชิ้นเล็กๆ ทำทีละอย่างทีละสเต็ป แล้วอย่าลืมให้รางวัลตัวเองด้วยขนมอร่อยๆ สักชิ้นน้า 🍰📖",
      "คุณทำดีที่สุดเท่าที่จะทำได้แล้วนะคะ อย่ากดดันตัวเองจนเครียดเกินไป สูดหายใจลึกๆ พักสายตา 10 นาที ดื่มน้ำอุ่นๆ แล้วค่อยกลับไปสู้ต่อน้า คุณทำได้แน่นอนค่ะ! 🌟"
    ];
    return studyReplies[Math.floor(Math.random() * studyReplies.length)];
  }

  // 7. Anger & Frustration (โกรธ, หงุดหงิด, โมโห, รำคาญ, อารมณ์เสีย)
  if (txt.includes("โกรธ") || txt.includes("หงุดหงิด") || txt.includes("โมโห") || txt.includes("รำคาญ") || txt.includes("อารมณ์เสีย")) {
    const angerReplies = [
      "เวลาโกรธหรือหงุดหงิด ลองสูดหายใจเข้าลึกๆ ดื่มน้ำเย็นๆ สักแก้ว แล้วนับ 1 ถึง 10 ช้าๆ ดูนะคะ อารมณ์โกรธเป็นเหมือนพายุที่เข้ามาแล้วเดี๋ยวก็ผ่านไป อย่าปล่อยให้พายุมาทำร้ายหัวใจอันสดใสของคุณน้า 🍃💙",
      "เข้าใจเลยค่ะว่าเรื่องนี้คงทำให้อารมณ์เสียมากๆ ลองระบายออกด้วยการวาดรูปหรือระบายสีในมินิเกมดูน้า การปลดปล่อยพลังงานทางบวกจะช่วยให้สบายใจขึ้นค่ะ ✨"
    ];
    return angerReplies[Math.floor(Math.random() * angerReplies.length)];
  }

  // 8. General / Warm Comfort (ทักทาย, คุยเล่น, สวัสดี, สบายดีไหม)
  const defaultReplies = [
    "ขอบคุณที่เปิดใจเล่าให้ฟังนะคะ ไม่ว่าคุณกำลังเผชิญกับอะไรอยู่ ขอให้รู้ว่าคุณทำได้ดีมากๆ แล้วน้า 💖",
    "ฟังแล้วรู้สึกได้เลยว่าคุณผ่านอะไรมาเยอะเลย... เก่งมากเลยนะ! พักผ่อนเติมพลัง ดื่มน้ำอุ่นๆ แล้วให้ยิ้มให้ตัวเองเยอะๆ น้า ☕🌸",
    "ไม่ว่าพรุ่งนี้จะเป็นอย่างไร จำไว้ว่าตรงนี้มีพื้นที่ปลอดภัยที่คุณสามารถกลับมาพักใจได้เสมอค่ะ 🌈✨",
    "ยินดีที่ได้คุยกับคุณเสมอนะคะ! ขอให้วันนี้เป็นวันที่ใจดีกับคุณ มีรอยยิ้มสดใสและความสุขเล็กๆ ตลอดทั้งวันเลยน้า ✨"
  ];
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

// Screen 11: AI Send chatbot message
let chatHistory = [];
let isAiThinking = false;

function cleanChatHistory() {
  let cleaned = [];
  for (let i = 0; i < chatHistory.length; i++) {
    if (cleaned.length === 0) {
      cleaned.push(chatHistory[i]);
    } else {
      const last = cleaned[cleaned.length - 1];
      if (last.role === chatHistory[i].role) {
        // Replace consecutive duplicate roles with the last one
        cleaned[cleaned.length - 1] = chatHistory[i];
      } else {
        cleaned.push(chatHistory[i]);
      }
    }
  }
  
  // Ensure it starts with 'user'
  while (cleaned.length > 0 && cleaned[0].role !== "user") {
    cleaned.shift();
  }
  
  // Limit to last 8 items (4 turns) for token safety and relevance
  while (cleaned.length > 8) {
    cleaned.shift();
    while (cleaned.length > 0 && cleaned[0].role !== "user") {
      cleaned.shift();
    }
  }
  
  chatHistory = cleaned;
}

async function sendChatMessage() {
  if (isAiThinking) return;

  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  
  input.value = "";
  isAiThinking = true;
  
  const container = document.getElementById("chatContainer");
  
  // Add user bubble
  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble user";
  userBubble.innerText = text;
  container.appendChild(userBubble);
  container.scrollTop = container.scrollHeight;
  
  // Show typing indicator bubble
  const botBubble = document.createElement("div");
  botBubble.className = "chat-bubble bot";
  botBubble.innerHTML = `<span class="typing-indicator" style="display:inline-block; font-style:italic; opacity:0.7;">${t("กำลังคิด... 🤔")}</span>`;
  container.appendChild(botBubble);
  container.scrollTop = container.scrollHeight;

  // สัญญาณอันตราย: ไม่ส่งข้อความออกจากเครื่อง พาไปหน้าขอความช่วยเหลือ
  if (typeof safetyHasRisk === "function" && safetyHasRisk(text)) {
    botBubble.innerText = "เกวนทาร์ห่วงเธอมากนะ เรื่องนี้สำคัญเกินกว่าที่ AI จะช่วยได้คนเดียว ลองโทร 1323 หรือ 1387 หรือบอกผู้ใหญ่ที่ไว้ใจตอนนี้เลยนะ 💙";
    container.scrollTop = container.scrollHeight;
    isAiThinking = false;
    openSafetyHelp("risk");
    return;
  }

  chatHistory.push({ role: "user", text });
  cleanChatHistory();

  try {
    const data = await aiChat(chatHistory);
    let replyText = (data && data.reply) || "";
    if (replyText) {
      chatHistory.push({ role: "model", text: replyText });
      cleanChatHistory();
    } else {
      chatHistory.pop();
      replyText = "เกวนทาร์ตอบเรื่องนี้ไม่ได้ ลองเล่าใหม่อีกแบบได้ไหม หรือคุยกับผู้ใหญ่ที่ไว้ใจก็ได้นะ 💙";
    }
    botBubble.innerText = replyText;
    state.questsProgress.talk = (state.questsProgress.talk || 0) + 1;
    container.scrollTop = container.scrollHeight;
    if (data && data.crisis) openSafetyHelp("risk");
  } catch (error) {
    console.error("AI error:", error);
    chatHistory.pop();
    botBubble.innerText = error.code === "limit"
      ? "วันนี้คุยกันเยอะแล้ว พักสายตาหน่อยนะ พรุ่งนี้มาคุยกันใหม่ 💙 ถ้าไม่โอเค กดปุ่ม \"ฉันไม่โอเค\" ได้เลย"
      : "เชื่อมต่อไม่ได้ ลองใหม่อีกครั้งนะ 💔";
    container.scrollTop = container.scrollHeight;
  } finally {
    isAiThinking = false;
  }
}
