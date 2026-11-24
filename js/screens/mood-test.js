// js/screens/mood-test.js: แบบทดสอบอารมณ์ และคำแนะนำ
// ==========================================
// SCREEN 11: 50 QUESTIONS & RECOMMENDATIONS SYSTEM
// ==========================================

const ALL_MOOD_QUESTIONS = [
{
    text: "ตื่นนอนวันนี้ คุณรู้สึกอย่างไร?",
    choices: [
      { text: "วันนี้น่าจะเป็นวันที่ดี 😊", scores: { Happy: 3, Motivation: 2 } },
      { text: "ขอหลับต่ออีกหน่อย 😴", scores: { Tired: 3, SelfCare: 1 } },
      { text: "ก็วันธรรมดาวันหนึ่ง 😐", scores: { Calm: 2, Bored: 1 } },
      { text: "ไม่ค่อยอยากเริ่มวันเลย", scores: { Sad: 3, Tired: 1 } }
    ]
  },
{
    text: "ถ้าวันนี้ไม่มีเรียนหรือไม่มีงาน คุณอยากทำอะไร?",
    choices: [
      { text: "ออกไปเที่ยว", scores: { Happy: 2, Social: 2 } },
      { text: "นอนพัก", scores: { Tired: 3 } },
      { text: "เล่นเกมหรือดูหนัง", scores: { Bored: 2, Happy: 1 } },
      { text: "อยู่เงียบ ๆ คนเดียว", scores: { Calm: 2, SelfCare: 1 } }
    ]
  },
{
    text: "ถ้าเพื่อนชวนไปทำกิจกรรม คุณจะ...",
    choices: [
      { text: "ไปเลย!", scores: { Social: 3, Happy: 2 } },
      { text: "ขอคิดดูก่อน", scores: { Calm: 2 } },
      { text: "ขออยู่บ้านดีกว่า", scores: { SelfCare: 2, Tired: 1 } },
      { text: "ไม่ค่อยอยากเจอใคร", scores: { Sad: 2, Anxiety: 2 } }
    ]
  },
{
    text: "วันนี้คุณยิ้มเพราะอะไร?",
    choices: [
      { text: "มีเรื่องดี ๆ เกิดขึ้น", scores: { Happy: 3 } },
      { text: "เพื่อนทำให้หัวเราะ", scores: { Happy: 2, Social: 2 } },
      { text: "ยังไม่มีเรื่องให้ยิ้ม", scores: { Bored: 2 } },
      { text: "ไม่ค่อยมีอารมณ์ยิ้ม", scores: { Sad: 3 } }
    ]
  },
{
    text: "เวลามีปัญหา คุณมักจะ...",
    choices: [
      { text: "ค่อย ๆ แก้ทีละอย่าง", scores: { Confidence: 2, Calm: 2 } },
      { text: "ขอคำปรึกษา", scores: { Social: 2, Confidence: 1 } },
      { text: "พักก่อน", scores: { SelfCare: 2 } },
      { text: "คิดวนไปเรื่อย ๆ", scores: { Anxiety: 3 } }
    ]
  },
{
    text: "วันนี้คุณอยากอยู่กับ...",
    choices: [
      { text: "เพื่อน", scores: { Social: 3 } },
      { text: "ครอบครัว", scores: { Happy: 2, Social: 1 } },
      { text: "น้อง Blob", scores: { Calm: 2, SelfCare: 1 } },
      { text: "อยู่คนเดียว", scores: { Calm: 2 } }
    ]
  },
{
    text: "ตอนนี้คุณมีแรงทำสิ่งต่าง ๆ ไหม?",
    choices: [
      { text: "พร้อมลุย", scores: { Motivation: 3 } },
      { text: "มีบ้าง", scores: { Motivation: 2 } },
      { text: "ขอพักก่อน", scores: { Tired: 2 } },
      { text: "ยังไม่อยากทำอะไร", scores: { Sad: 2, Tired: 2 } }
    ]
  },
{
    text: "เวลาฟังเพลง คุณมักเลือก...",
    choices: [
      { text: "เพลงสนุก", scores: { Happy: 2 } },
      { text: "เพลงสบาย ๆ", scores: { Calm: 2 } },
      { text: "เพลงเศร้า", scores: { Sad: 2 } },
      { text: "ไม่อยากฟังอะไร", scores: { Bored: 2 } }
    ]
  },
{
    text: "ถ้าวันนี้ฝนตก คุณจะ...",
    choices: [
      { text: "ออกไปเดินเล่น", scores: { Motivation: 2 } },
      { text: "ฟังเสียงฝน", scores: { Calm: 2 } },
      { text: "นอน", scores: { Tired: 2 } },
      { text: "รู้สึกเหงา", scores: { Sad: 2 } }
    ]
  },
{
    text: "ตอนเห็นงานกองโต คุณคิดว่า...",
    choices: [
      { text: "เริ่มทำเลย", scores: { Confidence: 3 } },
      { text: "วางแผนก่อน", scores: { Calm: 2 } },
      { text: "เดี๋ยวค่อยทำ", scores: { Bored: 2 } },
      { text: "เครียดจัง", scores: { Stress: 3 } }
    ]
  },
{
    text: "วันนี้คุณหัวเราะกี่ครั้ง?",
    choices: [
      { text: "หลายครั้ง", scores: { Happy: 3 } },
      { text: "นิดหน่อย", scores: { Happy: 1 } },
      { text: "แทบไม่ได้หัวเราะ", scores: { Bored: 2 } },
      { text: "ไม่เลย", scores: { Sad: 2 } }
    ]
  },
{
    text: "วันนี้คุณรู้สึกภูมิใจในตัวเองไหม?",
    choices: [
      { text: "มาก", scores: { Confidence: 3 } },
      { text: "มีนิดหน่อย", scores: { Confidence: 2 } },
      { text: "ยังไม่แน่ใจ", scores: { Calm: 1 } },
      { text: "ไม่ค่อยเลย", scores: { Sad: 2 } }
    ]
  },
{
    text: "เมื่อมีคนชม คุณจะ...",
    choices: [
      { text: "ยิ้มและขอบคุณ", scores: { Confidence: 2, Happy: 1 } },
      { text: "เขิน", scores: { Social: 1 } },
      { text: "ไม่ค่อยเชื่อ", scores: { Anxiety: 2 } },
      { text: "เปลี่ยนเรื่อง", scores: { Calm: 1 } }
    ]
  },
{
    text: "วันนี้คุณอยากทำอะไรใหม่ ๆ ไหม?",
    choices: [
      { text: "อยากมาก", scores: { Motivation: 3 } },
      { text: "ถ้ามีโอกาส", scores: { Motivation: 2 } },
      { text: "ยังไม่แน่ใจ", scores: { Calm: 1 } },
      { text: "ไม่อยากเลย", scores: { Tired: 2 } }
    ]
  },
{
    text: "เวลาหิว คุณจะ...",
    choices: [
      { text: "หาอะไรกินทันที", scores: { SelfCare: 2 } },
      { text: "กินทีหลัง", scores: { Stress: 1 } },
      { text: "ดื่มน้ำก่อน", scores: { SelfCare: 2 } },
      { text: "ไม่อยากกิน", scores: { Sad: 2 } }
    ]
  },
{
    text: "วันนี้คุณอยากกอดใครสักคนไหม?",
    choices: [
      { text: "อยาก", scores: { Social: 2 } },
      { text: "น้อง Blob ก็พอ", scores: { Calm: 2 } },
      { text: "ไม่เป็นไร", scores: { Calm: 1 } },
      { text: "อยากแต่ไม่มีใคร", scores: { Lonely: 3 } }
    ]
  },
{
    text: "วันนี้คุณอยากให้ Blob ทำอะไร?",
    choices: [
      { text: "เล่นด้วย", scores: { Happy: 2 } },
      { text: "กอดเรา", scores: { Calm: 2 } },
      { text: "นั่งเป็นเพื่อน", scores: { SelfCare: 2 } },
      { text: "ชวนพักผ่อน", scores: { Tired: 2 } }
    ]
  },
{
    text: "วันนี้คุณรู้สึกเบื่อไหม?",
    choices: [
      { text: "ไม่เลย", scores: { Happy: 2 } },
      { text: "นิดหน่อย", scores: { Bored: 1 } },
      { text: "ค่อนข้างเบื่อ", scores: { Bored: 2 } },
      { text: "เบื่อมาก", scores: { Bored: 3 } }
    ]
  },
{
    text: "คืนนี้คุณอยากให้เป็นแบบไหน?",
    choices: [
      { text: "ได้ทำทุกอย่างครบ", scores: { Motivation: 2 } },
      { text: "ได้พักผ่อน", scores: { SelfCare: 2 } },
      { text: "ได้คุยกับคนสำคัญ", scores: { Social: 2 } },
      { text: "ขอให้นอนหลับสบาย", scores: { Calm: 2 } }
    ]
  },
{
    text: "โดยรวม วันนี้คุณรู้สึกเหมือนคำไหนที่สุด?",
    choices: [
      { text: "สดใส", scores: { Happy: 3 } },
      { text: "สงบ", scores: { Calm: 3 } },
      { text: "เหนื่อย", scores: { Tired: 3 } },
      { text: "สับสน", scores: { Anxiety: 2, Stress: 1 } }
    ]
  },
{
    text: "เมื่อมีเรื่องไม่เป็นไปตามแผน คุณมักจะ...",
    choices: [
      { text: "ปรับตัวแล้วไปต่อ", scores: { Confidence: 2, Calm: 2 } },
      { text: "แอบเสียดายนิดหน่อย", scores: { Calm: 1, Sad: 1 } },
      { text: "หงุดหงิดทันที", scores: { Angry: 3 } },
      { text: "คิดวนทั้งวัน", scores: { Anxiety: 2, Stress: 2 } }
    ]
  },
{
    text: "ถ้ามีคนชวนคุยตอนนี้ คุณจะ...",
    choices: [
      { text: "คุยด้วยเลย", scores: { Social: 3 } },
      { text: "คุยสักพัก", scores: { Social: 2 } },
      { text: "ขอตอบทีหลัง", scores: { Tired: 2 } },
      { text: "ไม่ค่อยอยากคุย", scores: { Sad: 2, Lonely: 2 } }
    ]
  },
{
    text: "วันนี้คุณคิดถึงใครเป็นพิเศษไหม?",
    choices: [
      { text: "เพื่อน", scores: { Social: 2 } },
      { text: "ครอบครัว", scores: { Happy: 2 } },
      { text: "คนสำคัญ", scores: { Lonely: 2 } },
      { text: "ยังไม่มีเป็นพิเศษ", scores: { Calm: 1 } }
    ]
  },
{
    text: "ถ้าเลือกของวิเศษได้ 1 อย่าง คุณจะเลือก...",
    choices: [
      { text: "มีพลังงานไม่หมด", scores: { Energy: 3 } },
      { text: "ใจสงบตลอดวัน", scores: { Calm: 3 } },
      { text: "มีความมั่นใจมากขึ้น", scores: { Confidence: 3 } },
      { text: "มีเรื่องดี ๆ เกิดขึ้นทุกวัน", scores: { Happy: 3 } }
    ]
  },
{
    text: "เวลามีคนขอบคุณ คุณจะ...",
    choices: [
      { text: "ยิ้มและดีใจ", scores: { Happy: 2 } },
      { text: "ยิ้มเขิน ๆ", scores: { Social: 2 } },
      { text: "บอกว่าไม่เป็นไร", scores: { Calm: 2 } },
      { text: "รู้สึกว่าตัวเองมีคุณค่า", scores: { Confidence: 2 } }
    ]
  },
{
    text: "วันนี้คุณอยากใช้เวลากับอะไร?",
    choices: [
      { text: "งานอดิเรก", scores: { Happy: 2 } },
      { text: "เพลง", scores: { Calm: 2 } },
      { text: "การนอน", scores: { Tired: 3 } },
      { text: "คนที่รัก", scores: { Social: 2 } }
    ]
  },
{
    text: "ถ้าวันนี้เป็นอาหาร จะเป็น...",
    choices: [
      { text: "ไอศกรีม", scores: { Happy: 2 } },
      { text: "ซุปร้อน ๆ", scores: { Calm: 2 } },
      { text: "กาแฟ", scores: { Tired: 2 } },
      { text: "ช็อกโกแลต", scores: { Sad: 1, Happy: 1 } }
    ]
  },
{
    text: "เมื่อทำผิดพลาด คุณจะ...",
    choices: [
      { text: "ยอมรับแล้วแก้ไข", scores: { Confidence: 3 } },
      { text: "ขำกับตัวเอง", scores: { Happy: 2 } },
      { text: "รู้สึกเสียใจ", scores: { Sad: 2 } },
      { text: "คิดมาก", scores: { Anxiety: 3 } }
    ]
  },
{
    text: "ตอนนี้คุณอยากได้อะไรมากที่สุด?",
    choices: [
      { text: "วันหยุด", scores: { Tired: 2 } },
      { text: "กำลังใจ", scores: { Sad: 2, Social: 1 } },
      { text: "ความสงบ", scores: { Calm: 3 } },
      { text: "ความสนุก", scores: { Happy: 2 } }
    ]
  },
{
    text: "วันนี้คุณอยากพูดคำไหนกับตัวเอง?",
    choices: [
      { text: "เก่งมาก", scores: { Confidence: 3 } },
      { text: "พักบ้างนะ", scores: { SelfCare: 3 } },
      { text: "ไม่เป็นไร", scores: { Calm: 2 } },
      { text: "สู้ต่ออีกนิด", scores: { Motivation: 3 } }
    ]
  },
{
    text: "ถ้าตอนนี้มีสัตว์เลี้ยงอยู่ข้าง ๆ คุณจะ...",
    choices: [
      { text: "เล่นด้วย", scores: { Happy: 2 } },
      { text: "กอด", scores: { Calm: 2 } },
      { text: "ถ่ายรูป", scores: { Happy: 2 } },
      { text: "นอนด้วยกัน", scores: { Tired: 2 } }
    ]
  },
{
    text: "วันนี้คุณรู้สึกว่าเวลาผ่านไป...",
    choices: [
      { text: "เร็วมาก", scores: { Happy: 1 } },
      { text: "กำลังดี", scores: { Calm: 2 } },
      { text: "ช้า", scores: { Bored: 2 } },
      { text: "ช้ามากจนเบื่อ", scores: { Bored: 3 } }
    ]
  },
{
    text: "เมื่อเจอคำชม คุณจะคิดว่า...",
    choices: [
      { text: "ขอบคุณมาก", scores: { Confidence: 2 } },
      { text: "ดีใจจัง", scores: { Happy: 2 } },
      { text: "ยังไม่เก่งขนาดนั้น", scores: { Anxiety: 2 } },
      { text: "ไม่รู้จะตอบยังไง", scores: { Social: 1 } }
    ]
  },
{
    text: "วันนี้คุณอยากทำสิ่งไหนที่สุด?",
    choices: [
      { text: "เรียนรู้สิ่งใหม่", scores: { Motivation: 3 } },
      { text: "พักผ่อน", scores: { SelfCare: 2 } },
      { text: "เล่นกับเพื่อน", scores: { Social: 2 } },
      { text: "อยู่เงียบ ๆ", scores: { Calm: 2 } }
    ]
  },
{
    text: "เวลาคิดถึงอนาคต คุณรู้สึก...",
    choices: [
      { text: "ตื่นเต้น", scores: { Motivation: 3 } },
      { text: "มีความหวัง", scores: { Happy: 2 } },
      { text: "ยังไม่แน่ใจ", scores: { Calm: 1 } },
      { text: "กังวล", scores: { Anxiety: 3 } }
    ]
  },
{
    text: "ถ้าวันนี้มีเวลาเพิ่มอีก 2 ชั่วโมง คุณจะ...",
    choices: [
      { text: "ทำสิ่งที่ชอบ", scores: { Happy: 2 } },
      { text: "นอน", scores: { Tired: 2 } },
      { text: "อยู่กับคนสำคัญ", scores: { Social: 2 } },
      { text: "ทำงานให้เสร็จ", scores: { Motivation: 2 } }
    ]
  },
{
    text: "คุณอยากให้วันนี้จบลงด้วย...",
    choices: [
      { text: "รอยยิ้ม", scores: { Happy: 3 } },
      { text: "ความสงบ", scores: { Calm: 3 } },
      { text: "การพักผ่อน", scores: { SelfCare: 2 } },
      { text: "ความภูมิใจ", scores: { Confidence: 2 } }
    ]
  },
{
    text: "เวลามีเรื่องดี ๆ คุณมักจะ...",
    choices: [
      { text: "รีบเล่าให้คนอื่นฟัง", scores: { Social: 3 } },
      { text: "เก็บไว้ยิ้มคนเดียว", scores: { Happy: 2 } },
      { text: "เขียนบันทึก", scores: { SelfCare: 2 } },
      { text: "ถ่ายรูปเก็บไว้", scores: { Happy: 2 } }
    ]
  },
{
    text: "ตอนนี้ Blob ชวนคุณไปทำกิจกรรม คุณจะเลือก...",
    choices: [
      { text: "เล่นมินิเกม", scores: { Happy: 2 } },
      { text: "ปลูกต้นไม้", scores: { Calm: 2 } },
      { text: "นอนพัก", scores: { Tired: 2 } },
      { text: "เดินเล่น", scores: { SelfCare: 2 } }
    ]
  },
{
    text: "ถ้าให้เลือกคำหนึ่งคำแทนวันนี้ คุณจะเลือก...",
    choices: [
      { text: "สนุก", scores: { Happy: 3 } },
      { text: "สบาย", scores: { Calm: 3 } },
      { text: "เหนื่อย", scores: { Tired: 3 } },
      { text: "วุ่นวาย", scores: { Stress: 3 } }
    ]
  },
{
    text: "ก่อนจบวันนี้ คุณอยากบอกอะไรกับตัวเอง?",
    choices: [
      { text: "ขอบคุณที่พยายามนะ ❤️", scores: { Confidence: 2, Happy: 2 } },
      { text: "พรุ่งนี้เริ่มใหม่ได้เสมอ 🌱", scores: { Motivation: 2, Calm: 2 } },
      { text: "พักผ่อนให้เต็มที่นะ 😴", scores: { SelfCare: 3, Tired: 1 } },
      { text: "เดี๋ยวมันก็ผ่านไป 💙", scores: { Calm: 2, Sad: 1 } }
    ]
  }
];

function initMoodTest() {
  // Reset scores
  for (let key in state.moodScores) {
    state.moodScores[key] = 0;
  }
  
  // Shuffle and pick 10 random questions
  const shuffled = ALL_MOOD_QUESTIONS.slice().sort(() => 0.5 - Math.random());
  state.moodTestQuestions = shuffled.slice(0, 10);
  state.moodTestQuestion = 0;
  
  // Show question view, hide result view
  document.getElementById("moodQuestionContainer").style.display = "flex";
  document.getElementById("moodTestResultView").style.display = "none";
  
  renderMoodQuestion();
}

function renderMoodQuestion() {
  const currentQ = state.moodTestQuestions[state.moodTestQuestion];
  document.getElementById("qNum").innerText = `ข้อ ${state.moodTestQuestion + 1}/10`;
  document.getElementById("qText").innerText = currentQ.text;
  
  // Render choices
  const choicesContainer = document.getElementById("qChoices");
  choicesContainer.innerHTML = "";
  
  currentQ.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerHTML = `<span class="choice-num">${String.fromCharCode(65 + idx)}</span> ${choice.text}`;
    btn.addEventListener("click", () => {
      choicesContainer.querySelectorAll(".choice-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      btn.dataset.selectedIdx = idx;
    });
    choicesContainer.appendChild(btn);
  });
}

function handleNextMoodQuestion() {
  const activeBtn = document.querySelector("#qChoices .choice-btn.active");
  if (!activeBtn) {
    alert("กรุณาเลือกคำตอบ 1 ข้อก่อนนะคะ");
    return;
  }
  
  const selectedIdx = parseInt(activeBtn.dataset.selectedIdx);
  const currentQ = state.moodTestQuestions[state.moodTestQuestion];
  const selectedChoice = currentQ.choices[selectedIdx];
  
  // Add scores
  if (selectedChoice.scores) {
    for (let tag in selectedChoice.scores) {
      if (state.moodScores[tag] !== undefined) {
        state.moodScores[tag] += selectedChoice.scores[tag];
      }
    }
  }
  
  // Go to next or show results
  if (state.moodTestQuestion < 9) {
    state.moodTestQuestion++;
    renderMoodQuestion();
  } else {
    // Complete test! Grant rewards
    state.coins += 100;
    state.energy = Math.max(0, state.energy - 5);
    syncUI();
    showMoodResults();
  }
}

function showMoodResults() {
  document.getElementById("moodQuestionContainer").style.display = "none";
  document.getElementById("moodTestResultView").style.display = "flex";
  
  state.moodRecorded = true;

  // Award 50 EXP once per day for completing Mood Test
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  if (state.lastMoodTestDate !== todayStr) {
    state.lastMoodTestDate = todayStr;
    state.exp += 50;
    spawnVisualEffect("stat", "moodTestResultView", "🧠 ประเมินอารมณ์สำเร็จ! +50⭐ EXP");
    alert("🎉 ทำแบบทดสอบประเมินอารมณ์ประจำวันสำเร็จ!\n\n⭐ ได้รับรางวัลพิเศษประจำวัน: +50 ⭐ EXP! 🌟");
    checkLevelUp();
  } else {
    saveGameState();
    syncUI();
  }
  
  // Calculate top 3 moods
  const scoreArray = [];
  for (let key in state.moodScores) {
    scoreArray.push({ name: key, score: state.moodScores[key] });
  }
  
  // Sort descending
  scoreArray.sort((a, b) => b.score - a.score);
  
  // Get top 3 (only with scores > 0)
  const topMoodsObj = scoreArray.filter(item => item.score > 0).slice(0, 3);
  const topMoodNames = topMoodsObj.map(item => item.name);
  
  // Get combined recommendation
  const rec = getCombinedMoodRecommendation(topMoodNames);
  
  document.getElementById("resultMoodTitle").innerText = rec.title;
  document.getElementById("resultMoodDesc").innerText = rec.desc;
  
  // Render score bars
  const scoresContainer = document.getElementById("resultMoodScores");
  scoresContainer.innerHTML = "";
  
  // Show top 5 scores (or all > 0)
  const displayScores = scoreArray.filter(item => item.score > 0).slice(0, 5);
  if (displayScores.length === 0) {
    displayScores.push({ name: "Calm", score: 2 });
  }
  
  // Map tag name to Thai name
  const tagThai = {
    Happy: "ความสุข 😊",
    Calm: "สงบ 😌",
    Tired: "เหนื่อย 😴",
    Stress: "เครียด 😰",
    Anxiety: "กังวล 😟",
    Sad: "เศร้า 😢",
    Angry: "โกรธ 😡",
    Bored: "เบื่อ 😐",
    Social: "อยากเข้าสังคม 🤝",
    Confidence: "มั่นใจ ✨",
    SelfCare: "ดูแลตัวเอง 🌱",
    Motivation: "แรงจูงใจ 🔥",
    Lonely: "เหงา 🍂",
    Energy: "พลังงาน ⚡"
  };
  
  const maxScore = Math.max(...displayScores.map(i => i.score), 1);
  
  displayScores.forEach(item => {
    const label = tagThai[item.name] || item.name;
    const pct = Math.min(100, Math.round((item.score / maxScore) * 100));
    
    const row = document.createElement("div");
    row.className = "info-stat-row";
    row.innerHTML = `
      <div class="info-stat-label" style="margin-top: 4px;">
        <span>${label}</span>
        <span>${item.score} คะแนน</span>
      </div>
      <div class="info-bar-container">
        <div class="info-bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, var(--primary), #f472b6);"></div>
      </div>
    `;
    scoresContainer.appendChild(row);
  });
}

function getCombinedMoodRecommendation(topMoods) {
  const primary = topMoods[0] || "Calm";
  const secondary = topMoods[1] || "";
  
  if (primary === "Happy" && secondary === "Calm") {
    return {
      title: "😊 อารมณ์ดีและผ่อนคลายสบายใจ",
      desc: "วันนี้คุณดูอารมณ์ดีและค่อนข้างสบายใจ หัวใจพองโตอย่างสมดุล ลองทำกิจกรรมที่ชอบหรือแบ่งปันรอยยิ้มและพลังบวกให้คนรอบตัวนะ!"
    };
  }
  if (primary === "Tired" && secondary === "Anxiety") {
    return {
      title: "😴 อ่อนล้าและมีความกังวลสะสม",
      desc: "วันนี้คุณน่าจะทั้งเหนื่อยและมีเรื่องให้คิดฟุ้งซ่านอยู่พอสมควร ลองวางมือจากงานสักครู่ ดื่มน้ำอุ่น ๆ สูดหายใจลึก ๆ แล้วค่อย ๆ จัดการทีละเรื่องนะ น้อง Blob คอยเป็นกำลังใจให้เสมอ"
    };
  }
  if (primary === "Bored" && secondary === "Social") {
    return {
      title: "😐 เบื่อหน่ายแต่อยากมีคนพูดคุยด้วย",
      desc: "วันนี้คุณอาจรู้สึกเบื่อหน่ายกับสิ่งเดิม ๆ แต่ในใจก็อยากใช้เวลากับคนอื่นหรือหาเพื่อนพูดคุย ลองชวนเพื่อนเล่นมินิเกม หรือลองคุยกับ Joy AI ปลดปล่อยความรู้สึกดูนะ!"
    };
  }
  if (primary === "Stress" && (secondary === "Anxiety" || secondary === "Tired")) {
    return {
      title: "😰 เคร่งเครียดและรับความกดดันสูง",
      desc: "ช่วงนี้สมองและร่างกายของคุณกำลังทำงานหนักเกินพิกัด มีความตึงเครียดสะสม แนะนำให้ลดละงานที่รีบร้อนลงสักนิด เปิดเพลงบำบัดเบา ๆ ในห้องนอน หรืออาบน้ำอุ่นสปาฟองสบู่บำบัดร่วมกับน้อง Blob นะ"
    };
  }
  if (primary === "Sad" && (secondary === "Lonely" || secondary === "Tired")) {
    return {
      title: "😢 เหงาหงอยและใจอ่อนล้า",
      desc: "วันนี้คุณอาจรู้สึกเหงา โดดเดี่ยว หรือใจหม่นหมองเป็นพิเศษ อย่าลืมว่าการร้องไห้หรือยอมรับความอ่อนแอไม่ใช่เรื่องผิดนะ ลองกอดน้อง Blob หรือบันทึกไดอารี่เพื่อระบายความรู้สึกออกมา"
    };
  }
  if (primary === "Happy" && secondary === "Motivation") {
    return {
      title: "🚀 พลังใจเต็มเปี่ยมและมีความสุข",
      desc: "สุดยอดไปเลย! วันนี้คุณมีแรงจูงใจและความสุขอย่างเปี่ยมล้น เป็นช่วงเวลาที่ดีที่สุดในการเริ่มทำสิ่งท้าทายใหม่ ๆ เรียนรู้ทักษะเพิ่ม หรือปลูกดอกไม้ในสวนร่วมกัน"
    };
  }
  if (primary === "Calm" && secondary === "SelfCare") {
    return {
      title: "🧘 มีสติและสมดุลจิตใจมั่นคง",
      desc: "จิตใจของคุณสงบ มั่นคง และมีสมาธิที่ดีมาก วันนี้เหมาะสำหรับการดูแลตัวเอง (Self-Care) นั่งสมาธิ อ่านหนังสือดี ๆ สักเล่ม หรือเดินเล่นรับลมชิล ๆ ในสวนเพื่อรักษาสมดุลที่ดีนี้ไว้"
    };
  }
  if (primary === "Angry") {
    return {
      title: "🔥 หงุดหงิดใจร้อนหรือโกรธง่าย",
      desc: "ดูเหมือนวันนี้มีเรื่องกวนใจทำให้คุณรู้สึกหงุดหงิดหรือโกรธง่าย ลองนับ 1-10 ช้า ๆ ดื่มน้ำเย็น ๆ หรือมาพิมพ์ระบายอารมณ์ลงในกล่องระบายความรู้สึก (Vent Area) ให้น้องสลายความโกรธออกไปนะ"
    };
  }
  
  const fallbacks = {
    Happy: { title: "😊 เปี่ยมไปด้วยความสุข", desc: "วันนี้คุณมีความสุขและรอยยิ้มเต็มใบหน้า ลองแบ่งปันความสุขนี้ให้สัตว์เลี้ยงและเพื่อน ๆ นะคะ!" },
    Calm: { title: "😌 จิตใจสงบผ่อนคลาย", desc: "วันสบาย ๆ ที่จิตใจสงบนิ่งและผ่อนคลาย รักษาความรู้สึกสงบนี้ไว้ด้วยเพลงเบา ๆ นะคะ" },
    Tired: { title: "😴 ร่างกายต้องการการพักผ่อน", desc: "คุณเหนื่อยล้ามาทั้งวันแล้ว ร่างกายส่งสัญญาณให้หยุดพัก วางมือจากทุกอย่าง นอนหลับพักผ่อนให้เพียงพอนะคะ" },
    Stress: { title: "😰 เคร่งเครียดและตึงเครียด", desc: "มีเรื่องให้เครียดหรือกดดัน ลองยืดเส้นยืดสาย ฟังเพลงบรรเลงสบาย ๆ หรืออาบน้ำอุ่นร่วมกับน้องดูนะ" },
    Anxiety: { title: "😟 กังวลและว้าวุ่นใจ", desc: "จิตใจกำลังกังวลกับอนาคตหรือคิดวนเวียน ลองอยู่กับปัจจุบันกอดน้อง Blob ช้า ๆ สูดหายใจเข้าลึก ๆ นะคะ" },
    Sad: { title: "😢 จิตใจหม่นหมองเศร้าสร้อย", desc: "หากรู้สึกเศร้าหรือหม่นหมอง ลองเขียนระบายอารมณ์ในไดอารี่ หรือกอดน้องเพื่อเติมพลังใจนะคะ" },
    Angry: { title: "😡 หงุดหงิดโมโห", desc: "มีความโกรธหรือหงุดหงิดสะสม ลองเปลี่ยนบรรยากาศ หลับตาลงสูดหายใจลึก ๆ ปลดปล่อยความร้อนใจออกไป" },
    Bored: { title: "😐 รู้สึกเบื่อหน่ายเซ็ง ๆ", desc: "รู้สึกน่าเบื่อไม่มีอะไรตื่นเต้น ลองมาเล่นมินิเกมหรือพาน้อง Blob ไปแต่งตัวแก้เซ็งดูกันเถอะ!" },
    Social: { title: "🤝 อยากมีปฏิสัมพันธ์กับผู้อื่น", desc: "วันนี้อยากเข้าสังคมและคุยกับเพื่อน ๆ ชวนเพื่อนคุยหรือพิมพ์ตอบโต้เล่นกับ Joy AI แก้เหงาดูสิ" },
    Confidence: { title: "✨ มั่นใจและภูมิใจในตัวเอง", desc: "ความรู้สึกภูมิใจและเชื่อมั่นในตัวเองเต็มร้อย วันนี้เป็นวันที่ยอดเยี่ยมของคุณ ลุยต่อไปเลย!" },
    SelfCare: { title: "🌱 เน้นการดูแลกายและใจตัวเอง", desc: "วันนี้เหมาะสมที่สุดสำหรับการนอนแช่น้ำร้อน กินอาหารอร่อย ๆ และรักตัวเองให้มาก ๆ" },
    Motivation: { title: "🔥 พลังใจและแรงจูงใจแรงกล้า", desc: "พร้อมเรียนรู้สิ่งใหม่และพิชิตเป้าหมายต่าง ๆ ลุยทำงานหรือปลูกต้นไม้ในสวนได้เลย!" },
    Lonely: { title: "🍂 รู้สึกเหงาและอ้างว้าง", desc: "ความเงียบเหงาอาจทำให้ใจใจฝ่อลงไป ลองพาน้อง Blob ไปเปิดมินิเกมเล่นด้วยกันเพื่อสร้างความสนุกสนานและอบอุ่นใจ" },
    Energy: { title: "⚡ พลังงานล้นเปี่ยม", desc: "วันนี้กระปรี้กระเปร่า มีความกระฉับกระเฉงสูง เหมาะแก่การออกไปใช้พลังงานทำกิจกรรมสนุก ๆ" }
  };
  
  return fallbacks[primary] || { title: "😐 จิตใจปกติดี", desc: "วันธรรมดา ๆ วันหนึ่งของคุณ รักษาสมดุลจิตใจและร่างกายให้แข็งแรงต่อไปร่วมกับน้อง Blob นะ!" };
}
