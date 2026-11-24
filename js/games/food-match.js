// js/games/food-match.js: มินิเกมเปิดไพ่จับคู่อาหาร
// 2. FOOD MEMORY MATCH GAME
let foodMatchCards = [];
let foodMatchFlipped = [];
let foodMatchPairsFound = 0;

function startFoodMatchGame() {
  if (!checkLevelUnlock(7, "มินิเกมเปิดไพ่รูปอาหาร")) return;
  foodMatchPairsFound = 0;
  foodMatchFlipped = [];
  
  const gameArea = document.getElementById("foodMatchGameArea");
  if (!gameArea) return;
  gameArea.style.display = "flex";
  
  // Decide number of pairs based on state.level (min 8 cards, i.e., 4 pairs)
  let numPairs = 4;
  if (state.level >= 15) {
    numPairs = 8; // 16 cards
  } else if (state.level >= 10) {
    numPairs = 6; // 12 cards
  }
  
  document.getElementById("foodMatchPairsVal").innerText = `0 / ${numPairs}`;
  
  const foodEmojisPool = ["🍕", "🍔", "🍰", "🧋", "🍩", "🍟", "🍦", "🍿"];
  const selectedEmojis = foodEmojisPool.slice(0, numPairs);
  const gameEmojis = [...selectedEmojis, ...selectedEmojis];
  
  foodMatchCards = gameEmojis
    .map(emoji => ({ emoji, matched: false, flipped: false }))
    .sort(() => Math.random() - 0.5);
    
  // Dynamically set grid columns
  const grid = document.getElementById("foodMatchGrid");
  if (grid) {
    if (numPairs === 8) {
      grid.style.gridTemplateColumns = "repeat(4, 1fr)";
      grid.style.gap = "8px";
    } else if (numPairs === 6) {
      grid.style.gridTemplateColumns = "repeat(3, 1fr)";
      grid.style.gap = "10px";
    } else {
      grid.style.gridTemplateColumns = "repeat(4, 1fr)";
      grid.style.gap = "12px";
    }
  }
    
  renderFoodMatchGrid();
}

function renderFoodMatchGrid() {
  const grid = document.getElementById("foodMatchGrid");
  if (!grid) return;
  
  let numPairs = 4;
  if (state.level >= 15) numPairs = 8;
  else if (state.level >= 10) numPairs = 6;
  
  let cardWidth = "55px", cardHeight = "75px", fontSize = "22px";
  if (numPairs === 6) {
    cardWidth = "65px"; cardHeight = "80px"; fontSize = "24px";
  } else if (numPairs === 8) {
    cardWidth = "52px"; cardHeight = "70px"; fontSize = "20px";
  }
  
  grid.innerHTML = foodMatchCards.map((card, idx) => {
    const isRevealed = card.flipped || card.matched;
    return `
      <div class="memory-card" onclick="clickFoodMatchCard(${idx})" style="
        width: ${cardWidth};
        height: ${cardHeight};
        background: ${isRevealed ? '#1e293b' : 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)'};
        border: 2px solid ${isRevealed ? '#a78bfa' : '#ffffff'};
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isRevealed ? fontSize : '20px'};
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        color: #fff;
      ">
        ${isRevealed ? card.emoji : '🃏'}
      </div>
    `;
  }).join("");
}

function clickFoodMatchCard(idx) {
  const card = foodMatchCards[idx];
  if (card.flipped || card.matched || foodMatchFlipped.length >= 2) return;
  
  card.flipped = true;
  foodMatchFlipped.push(idx);
  renderFoodMatchGrid();
  
  if (foodMatchFlipped.length === 2) {
    const [firstIdx, secondIdx] = foodMatchFlipped;
    const firstCard = foodMatchCards[firstIdx];
    const secondCard = foodMatchCards[secondIdx];
    
    let numPairs = 4;
    if (state.level >= 15) numPairs = 8;
    else if (state.level >= 10) numPairs = 6;
    
    if (firstCard.emoji === secondCard.emoji) {
      firstCard.matched = true;
      secondCard.matched = true;
      foodMatchFlipped = [];
      foodMatchPairsFound++;
      document.getElementById("foodMatchPairsVal").innerText = `${foodMatchPairsFound} / ${numPairs}`;
      
      renderFoodMatchGrid();
      
      if (foodMatchPairsFound >= numPairs) {
        setTimeout(() => {
          const rewardCoins = 150 + (numPairs * 25);
          state.coins += rewardCoins;
          state.questsProgress.playGame = Math.min(1, state.questsProgress.playGame + 1);
          syncUI();
          alert(`🏆 ยินดีด้วยค่ะ! คุณชนะเกมการ์ดจับคู่ระดับเวล ${state.level} ได้รับรางวัล +${rewardCoins} เหรียญทอง 🪙`);
          stopFoodMatchGame();
        }, 500);
      }
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        foodMatchFlipped = [];
        renderFoodMatchGrid();
      }, 800);
    }
  }
}

function stopFoodMatchGame() {
  const gameArea = document.getElementById("foodMatchGameArea");
  if (gameArea) {
    gameArea.style.display = "none";
  }
}
