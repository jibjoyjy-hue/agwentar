// js/games/reveal-emotion.js: มินิเกมเปิดการ์ดอารมณ์
// 3. REVEAL CARD & EMOTION REFLECT MECHANICS
let currentRevealCardIdx = -1;
let revealedCardsState = [false, false, false, false];

function startRevealEmotionGame() {
  currentRevealCardIdx = -1;
  revealedCardsState = [false, false, false, false];
  
  const gameArea = document.getElementById("revealEmotionGameArea");
  if (!gameArea) return;
  gameArea.style.display = "flex";
  
  // Reset card flips visually
  for (let i = 0; i < 4; i++) {
    const card = document.getElementById(`revealCardInner-${i}`);
    if (card) card.classList.remove("flipped");
  }
  
  const modal = document.getElementById("emotionReflectModal");
  if (modal) modal.style.display = "none";
}

function clickRevealCard(cardIdx) {
  if (revealedCardsState[cardIdx]) {
    alert("การ์ดใบนี้ได้รับการสะท้อนอารมณ์ไปเรียบร้อยแล้วค่ะ! เลือกเปิดใบอื่นน้า 🃏");
    return;
  }
  
  currentRevealCardIdx = cardIdx;
  
  // Flip card in CSS
  const cardInner = document.getElementById(`revealCardInner-${cardIdx}`);
  if (cardInner) {
    cardInner.classList.add("flipped");
  }
  
  // Show emotion selector popup modal after a slight delay
  setTimeout(() => {
    const modal = document.getElementById("emotionReflectModal");
    if (modal) modal.style.display = "flex";
  }, 700);
}

function selectCardEmotion(emotionName) {
  if (currentRevealCardIdx === -1) return;
  
  // Mark card as completed
  revealedCardsState[currentRevealCardIdx] = true;
  
  // Close popup modal
  const modal = document.getElementById("emotionReflectModal");
  if (modal) modal.style.display = "none";
  
  // Award coins
  state.coins += 50;
  syncUI();
  
  alert(`✨ สะท้อนอารมณ์สำเร็จ! คุณอธิบายความรู้สึกหลังจากดูรูปว่า "${emotionName}" เป็นการฝึกเช็คระดับอารมณ์ตนเองที่ดีมากค่ะ ได้รับรางวัล +50 เหรียญทอง 🪙`);
  
  // Check if all cards are completed
  const allCompleted = revealedCardsState.every(c => c === true);
  if (allCompleted) {
    setTimeout(() => {
      alert("🎉 ยินดีด้วย! คุณเปิดการ์ดสะท้อนอารมณ์และสำรวจจิตใจจนครบถ้วนทั้ง 4 ใบแล้วในวันนี้ ขอให้มีความสุขนะคะ!");
      closeRevealEmotionGame();
    }, 1500);
  }
}

function closeRevealEmotionGame() {
  const gameArea = document.getElementById("revealEmotionGameArea");
  if (gameArea) gameArea.style.display = "none";
  
  const modal = document.getElementById("emotionReflectModal");
  if (modal) modal.style.display = "none";
}
