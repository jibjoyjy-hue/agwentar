// js/screens/shop-bag.js: ร้านค้า และกระเป๋า
// Screen 16: Buy Shop Item (Simulated purchase handler)
function buyShopItemDirect(tabId, itemIdx) {
  if (!checkLevelUnlock(1, "การซื้อสินค้าในร้านค้า")) return;
  if (tabId === "sell") {
    const sellItems = [
      { id: "carrot", name: "แครอท", price: 30 },
      { id: "tomato", name: "มะเขือเทศ", price: 60 },
      { id: "potato", name: "มันฝรั่ง", price: 90 },
      { id: "corn", name: "ข้าวโพด", price: 120 },
      { id: "broccoli", name: "บล็อคโคลี่", price: 160 },
      { id: "strawberry", name: "สตรอว์เบอร์รี่", price: 200 },
      { id: "avocado", name: "อะโวคาโด", price: 280 },
      { id: "watermelon", name: "แตงโม", price: 350 },
      { id: "grapes", name: "องุ่น", price: 450 },
      { id: "pumpkin", name: "ฟักทอง", price: 550 }
    ];
    const item = sellItems[itemIdx];
    if (!item) return;
    
    const qty = state.foods[item.id] || 0;
    if (qty <= 0) {
      alert(`คุณไม่มีผลผลิต "${item.name}" ในกระเป๋าเป้สำหรับขายเลยค่ะ 🌾`);
      return;
    }
    
    state.foods[item.id] = qty - 1;
    state.coins += item.price;
    saveGameState();
    syncUI();
    renderShopItems("sell");
    alert(`🎉 ขาย "${item.name}" สำเร็จ! ได้รับ +${item.price} เหรียญทอง 🪙`);
    return;
  }
  const items = {
    food: [
      { id: "sandwich", name: "แซนวิช", price: 80, currency: "coins" },
      { id: "cake", name: "เค้กสตรอว์เบอร์รี่", price: 120, currency: "coins" },
      { id: "cookie", name: "คุกกี้", price: 40, currency: "coins" },
      { id: "burger", name: "แฮมเบอร์เกอร์", price: 100, currency: "coins" },
      { id: "sushi", name: "ซูชิ", price: 150, currency: "coins" },
      { id: "pizza", name: "พิซซ่า", price: 180, currency: "coins" },
      { id: "donut", name: "โดนัท", price: 50, currency: "coins" },
      { id: "frenchfries", name: "เฟรนช์ฟรายส์", price: 70, currency: "coins" },
      { id: "icecream", name: "ไอศกรีม", price: 60, currency: "coins" },
      { id: "popcorn", name: "ป๊อปคอร์น", price: 50, currency: "coins" },
      { id: "cupcake", name: "คัพเค้ก", price: 60, currency: "coins" },
      { id: "friedchicken", name: "ไก่ทอด", price: 120, currency: "coins" },
      { id: "ramen", name: "ราเมน", price: 160, currency: "coins" },
      { id: "onigiri", name: "ข้าวปั้น", price: 50, currency: "coins" }
    ],
    drinks: [
      { id: "water", name: "น้ำเปล่า", price: 30, currency: "coins" },
      { id: "milk", name: "นมสด", price: 80, currency: "coins" },
      { id: "greentea", name: "ชาเขียว", price: 100, currency: "coins" },
      { id: "bubbletea", name: "ชานมไข่มุก", price: 150, currency: "coins" },
      { id: "chocolate", name: "ช็อกโกแลต", price: 150, currency: "coins" },
      { id: "fruitjuice", name: "น้ำผลไม้", price: 50, currency: "coins" },
      { id: "babybottle", name: "ขวดนม", price: 60, currency: "coins" },
      { id: "coffee", name: "กาแฟร้อน", price: 90, currency: "coins" },
      { id: "soda", name: "น้ำอัดลม", price: 60, currency: "coins" },
      { id: "coconut", name: "น้ำมะพร้าว", price: 80, currency: "coins" },
      { id: "honeytea", name: "ชาผสมน้ำผึ้ง", price: 110, currency: "coins" }
    ],
    clothes: APPAREL_DATABASE.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      currency: item.currency
    })),
    exchange: [
      { id: "gem_to_coins_small", name: "500 เหรียญทอง", price: 10, currency: "gems", type: "coins", val: 500 },
      { id: "gem_to_coins_large", name: "2,000 เหรียญทอง", price: 30, currency: "gems", type: "coins", val: 2000 },
      { id: "gem_to_exp_small", name: "50 EXP", price: 10, currency: "gems", type: "exp", val: 50 },
      { id: "gem_to_exp_large", name: "200 EXP", price: 30, currency: "gems", type: "exp", val: 200 }
    ],
    furniture: [
      { id: "wall_window", name: "หน้าต่างฝนตก", price: 300, currency: "coins" },
      { id: "wall_painting", name: "กรอบรูปป่าไม้", price: 150, currency: "coins" },
      { id: "wall_neon", name: "ไฟนีออนสายรุ้ง", price: 500, currency: "coins" },
      { id: "wall_star", name: "ดาวส่องแสง", price: 200, currency: "coins" },
      { id: "floor_plant", name: "ต้นมอนสเตอร่า", price: 120, currency: "coins" },
      { id: "floor_bear", name: "หมีตุ๊กตายักษ์", price: 250, currency: "coins" },
      { id: "floor_guitar", name: "กีตาร์ไม้", price: 400, currency: "coins" },
      { id: "floor_box", name: "กล่องกระดาษน้อง", price: 100, currency: "coins" },
      { id: "table_lamp", name: "โคมไฟลาวา", price: 180, currency: "coins" },
      { id: "table_cocoa", name: "โกโก้ร้อน", price: 80, currency: "coins" },
      { id: "table_radio", name: "วิทยุวินเทจ", price: 350, currency: "coins" },
      { id: "table_globe", name: "ลูกแก้วหิมะ", price: 220, currency: "coins" }
    ]
  };
  
  const item = items[tabId]?.[itemIdx];
  if (!item) return;
  
  // Coins purchase
  if (item.currency === "coins") {
    if (state.coins < item.price) {
      alert("เหรียญทองของคุณไม่เพียงพอค่ะ สามารถไปเล่นมินิเกมหรือทำเควสเพื่อหาเหรียญทองเพิ่มได้นะคะ 🪙");
      return;
    }
    
    if (tabId === "clothes") {
      if (state.unlockedApparel.includes(item.id)) {
        alert("คุณซื้อสินค้าชิ้นนี้ไปเรียบร้อยแล้วค่ะ!");
        return;
      }
      state.unlockedApparel.push(item.id);
      state.coins -= item.price;
      saveGameState();
      syncUI();
      renderShopItems(tabId);
      alert(`🎉 ซื้อ "${item.name}" สำเร็จ! ย้ายไปที่ห้องแต่งตัวเพื่อลองใส่กันเลยน้า 🛍️✨`);
      nav("screen-9");
      return;
    } else if (tabId === "furniture") {
      if (state.ownedFurniture.includes(item.id)) {
        alert("คุณซื้อเฟอร์นิเจอร์ชิ้นนี้ไปเรียบร้อยแล้วค่ะ!");
        return;
      }
      state.ownedFurniture.push(item.id);
      state.coins -= item.price;
      saveGameState();
      syncUI();
      renderShopItems(tabId);
      alert(`🎉 ซื้อ "${item.name}" สำเร็จ! เปิดโหมดแต่งบ้านที่หน้าแรกเพื่อจัดวางกันเลย 🛋️✨`);
      return;
    } else if (tabId === "food" || tabId === "drinks") {
      state.foods[item.id] = (state.foods[item.id] || 0) + 1;
      state.coins -= item.price;
      saveGameState();
      syncUI();
      renderShopItems(tabId);
      if (typeof renderDiningFood === "function") renderDiningFood();
      if (typeof renderBagScreen === "function") {
        const activeTab = document.querySelector(".bag-tab.active")?.innerText.trim() || "ทั้งหมด";
        renderBagScreen(activeTab);
      }
      alert(`🎉 ซื้อสินค้า "${item.name}" สำเร็จ! เพิ่มเข้าไปยังกระเป๋าเรียบร้อยแล้วค่ะ (มีทั้งหมด x${state.foods[item.id]} ชิ้น) 🛍️✨`);
      return;
    }
  }
  
  // Gems exchange (Exchange tab)
  if (item.currency === "gems") {
    if (state.gems < item.price) {
      alert("เพชรของคุณไม่เพียงพอสำหรับการแลกเปลี่ยนค่ะ ❌");
      return;
    }
    
    state.gems -= item.price;
    if (item.type === "coins") {
      state.coins += item.val;
      alert(`แลกเปลี่ยนสำเร็จ! ได้รับ +${item.val} เหรียญทอง จ่ายไป ${item.price} เพชร 🪙`);
    } else if (item.type === "exp") {
      state.exp += item.val;
      alert(`แลกเปลี่ยนสำเร็จ! ได้รับ +${item.val} EXP จ่ายไป ${item.price} เพชร ⭐`);
      checkLevelUp();
    }
    syncUI();
    renderShopItems(tabId);
    return;
  }
}

function renderBagScreen(tab = "ทั้งหมด") {
  const container = document.querySelector(".bag-grid");
  if (!container) return;
  
  // Highlight active tab
  document.querySelectorAll(".bag-tab").forEach(t => {
    if (t.innerText.trim() === tab) {
      t.classList.add("active");
    } else {
      t.classList.remove("active");
    }
  });

  let html = "";
  
  // Foods & Drinks
  const isFoodTab = tab === "ทั้งหมด" || tab === "อาหาร";
  const isDrinkTab = tab === "ทั้งหมด" || tab === "เครื่องดื่ม";
  
  if (isFoodTab) {
    const foodList = [
      { id: "carrot", name: "แครอท", emoji: "🥕" },
      { id: "tomato", name: "มะเขือเทศ", emoji: "🍅" },
      { id: "potato", name: "มันฝรั่ง", emoji: "🥔" },
      { id: "corn", name: "ข้าวโพด", emoji: "🌽" },
      { id: "broccoli", name: "บล็อคโคลี่", emoji: "🥦" },
      { id: "strawberry", name: "สตรอว์เบอร์รี่", emoji: "🍓" },
      { id: "avocado", name: "อะโวคาโด", emoji: "🥑" },
      { id: "watermelon", name: "แตงโม", emoji: "🍉" },
      { id: "grapes", name: "องุ่น", emoji: "🍇" },
      { id: "pumpkin", name: "ฟักทอง", emoji: "🎃" },
      { id: "sandwich", name: "แซนวิช", emoji: "🥪" },
      { id: "cake", name: "เค้กสตรอว์เบอร์รี่", emoji: "🍰" },
      { id: "cookie", name: "คุกกี้", emoji: "🍪" },
      { id: "burger", name: "แฮมเบอร์เกอร์", emoji: "🍔" },
      { id: "sushi", name: "ซูชิ", emoji: "🍣" },
      { id: "chocolate", name: "ช็อกโกแลต", emoji: "🍫" },
      { id: "pizza", name: "พิซซ่า", emoji: "🍕" },
      { id: "donut", name: "โดนัท", emoji: "🍩" },
      { id: "frenchfries", name: "เฟรนช์ฟรายส์", emoji: "🍟" },
      { id: "icecream", name: "ไอศกรีม", emoji: "🍦" },
      { id: "popcorn", name: "ป๊อปคอร์น", emoji: "🍿" },
      { id: "cupcake", name: "คัพเค้ก", emoji: "🧁" },
      { id: "friedchicken", name: "ไก่ทอด", emoji: "🍗" },
      { id: "ramen", name: "ราเมน", emoji: "🍜" },
      { id: "onigiri", name: "ข้าวปั้น", emoji: "🍙" }
    ];
    foodList.forEach(f => {
      const qty = state.foods[f.id] || 0;
      if (qty > 0) {
        html += `
          <div class="bag-item-card" onclick="useBagFood('${f.id}', '${f.name}')">
            <span class="bag-item-emoji">${f.emoji}</span>
            <span class="bag-item-qty">${f.name} (x${qty})</span>
          </div>
        `;
      }
    });
  }
  
  if (isDrinkTab) {
    const drinkList = [
      { id: "water", name: "น้ำเปล่า", emoji: "💧" },
      { id: "milk", name: "นมสด", emoji: "🥛" },
      { id: "greentea", name: "ชาเขียว", emoji: "🍵" },
      { id: "bubbletea", name: "ชานมไข่มุก", emoji: "🧋" },
      { id: "fruitjuice", name: "น้ำผลไม้", emoji: "🧃" },
      { id: "babybottle", name: "ขวดนม", emoji: "🍼" },
      { id: "coffee", name: "กาแฟร้อน", emoji: "☕" },
      { id: "soda", name: "น้ำอัดลม", emoji: "🥤" },
      { id: "coconut", name: "น้ำมะพร้าว", emoji: "🥥" },
      { id: "honeytea", name: "ชาผสมน้ำผึ้ง", emoji: "🍯" }
    ];
    drinkList.forEach(d => {
      const qty = state.foods[d.id] || 0;
      if (qty > 0) {
        html += `
          <div class="bag-item-card" onclick="useBagFood('${d.id}', '${d.name}')">
            <span class="bag-item-emoji">${d.emoji}</span>
            <span class="bag-item-qty">${d.name} (x${qty})</span>
          </div>
        `;
      }
    });
  }
  
  // Clothes (Fashion)
  if (tab === "ทั้งหมด" || tab === "เครื่องแต่งกาย") {
    APPAREL_DATABASE.forEach(a => {
      if (state.unlockedApparel.includes(a.id)) {
        html += `
          <div class="bag-item-card" onclick="nav('screen-9')">
            <div style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; margin: 0 auto 2px auto;">${getApparelVisual(a.id, 36)}</div>
            <span class="bag-item-qty">${a.name} (ซื้อแล้ว)</span>
          </div>
        `;
      }
    });
  }
  
  // Furniture (Decorations) removed
  
  if (!html) {
    html = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); font-size: 11px; padding: 20px;">กระเป๋าว่างเปล่า สามารถไปช้อปปิ้งได้ที่ร้านค้าค่ะ 🛍️</p>`;
  }
  
  container.innerHTML = html;
  if (state.lang === "en") {
    applyLanguageToNode(container, "en");
  }
}

function renderShopItems(tabId = "food") {
  const container = document.getElementById("shopItemsGrid");
  if (!container) return;
  
  const items = {
    food: [
      { id: "sandwich", name: "แซนวิช", emoji: "🥪", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "cake", name: "เค้กสตรอว์เบอร์รี่", emoji: "🍰", price: 120, currency: "coins", desc: "120 เหรียญ" },
      { id: "cookie", name: "คุกกี้", emoji: "🍪", price: 40, currency: "coins", desc: "40 เหรียญ" },
      { id: "burger", name: "แฮมเบอร์เกอร์", emoji: "🍔", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "sushi", name: "ซูชิ", emoji: "🍣", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "pizza", name: "พิซซ่า", emoji: "🍕", price: 180, currency: "coins", desc: "180 เหรียญ" },
      { id: "donut", name: "โดนัท", emoji: "🍩", price: 50, currency: "coins", desc: "50 เหรียญ" },
      { id: "frenchfries", name: "เฟรนช์ฟรายส์", emoji: "🍟", price: 70, currency: "coins", desc: "70 เหรียญ" },
      { id: "icecream", name: "ไอศกรีม", emoji: "🍦", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "popcorn", name: "ป๊อปคอร์น", emoji: "🍿", price: 50, currency: "coins", desc: "50 เหรียญ" },
      { id: "cupcake", name: "คัพเค้ก", emoji: "🧁", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "friedchicken", name: "ไก่ทอด", emoji: "🍗", price: 120, currency: "coins", desc: "120 เหรียญ" },
      { id: "ramen", name: "ราเมน", emoji: "🍜", price: 160, currency: "coins", desc: "160 เหรียญ" },
      { id: "onigiri", name: "ข้าวปั้น", emoji: "🍙", price: 50, currency: "coins", desc: "50 เหรียญ" }
    ],
    drinks: [
      { id: "water", name: "น้ำเปล่า", emoji: "💧", price: 30, currency: "coins", desc: "30 เหรียญ" },
      { id: "milk", name: "นมสด", emoji: "🥛", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "greentea", name: "ชาเขียว", emoji: "🍵", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "bubbletea", name: "ชานมไข่มุก", emoji: "🧋", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "chocolate", name: "ช็อกโกแลต", emoji: "🍫", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "fruitjuice", name: "น้ำผลไม้", emoji: "🧃", price: 50, currency: "coins", desc: "50 เหรียญ" },
      { id: "babybottle", name: "ขวดนม", emoji: "🍼", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "coffee", name: "กาแฟร้อน", emoji: "☕", price: 90, currency: "coins", desc: "90 เหรียญ" },
      { id: "soda", name: "น้ำอัดลม", emoji: "🥤", price: 60, currency: "coins", desc: "60 เหรียญ" },
      { id: "coconut", name: "น้ำมะพร้าว", emoji: "🥥", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "honeytea", name: "ชาผสมน้ำผึ้ง", emoji: "🍯", price: 110, currency: "coins", desc: "110 เหรียญ" }
    ],
    clothes: APPAREL_DATABASE.map(item => ({
      id: item.id,
      name: item.name,
      emoji: item.emoji,
      price: item.price,
      currency: item.currency,
      desc: `${item.price} ${item.currency === "coins" ? "เหรียญ" : "เพชร"}`
    })),
    exchange: [
      { id: "gem_to_coins_small", name: "500 เหรียญทอง", emoji: "🪙", price: 10, currency: "gems", type: "coins", val: 500, desc: "ใช้ 10 เพชร 💎" },
      { id: "gem_to_coins_large", name: "2,000 เหรียญทอง", emoji: "🪙", price: 30, currency: "gems", type: "coins", val: 2000, desc: "ใช้ 30 เพชร 💎" },
      { id: "gem_to_exp_small", name: "50 EXP", emoji: "⭐", price: 10, currency: "gems", type: "exp", val: 50, desc: "ใช้ 10 เพชร 💎" },
      { id: "gem_to_exp_large", name: "200 EXP", emoji: "⭐", price: 30, currency: "gems", type: "exp", val: 200, desc: "ใช้ 30 เพชร 💎" }
    ],
    sell: [
      { id: "carrot", name: "ขายแครอท 🥕", emoji: "🥕", price: 30, currency: "coins", desc: "ขายได้: 30 เหรียญ 🪙" },
      { id: "tomato", name: "ขายมะเขือเทศ 🍅", emoji: "🍅", price: 60, currency: "coins", desc: "ขายได้: 60 เหรียญ 🪙" },
      { id: "potato", name: "ขายมันฝรั่ง 🥔", emoji: "🥔", price: 90, currency: "coins", desc: "ขายได้: 90 เหรียญ 🪙" },
      { id: "corn", name: "ขายข้าวโพด 🌽", emoji: "🌽", price: 120, currency: "coins", desc: "ขายได้: 120 เหรียญ 🪙" },
      { id: "broccoli", name: "ขายบล็อคโคลี่ 🥦", emoji: "🥦", price: 160, currency: "coins", desc: "ขายได้: 160 เหรียญ 🪙" },
      { id: "strawberry", name: "ขายสตรอว์เบอร์รี่ 🍓", emoji: "🍓", price: 200, currency: "coins", desc: "ขายได้: 200 เหรียญ 🪙" },
      { id: "avocado", name: "ขายอะโวคาโด 🥑", emoji: "🥑", price: 280, currency: "coins", desc: "ขายได้: 280 เหรียญ 🪙" },
      { id: "watermelon", name: "ขายแตงโม 🍉", emoji: "🍉", price: 350, currency: "coins", desc: "ขายได้: 350 เหรียญ 🪙" },
      { id: "grapes", name: "ขายองุ่น 🍇", emoji: "🍇", price: 450, currency: "coins", desc: "ขายได้: 450 เหรียญ 🪙" },
      { id: "pumpkin", name: "ขายฟักทอง 🎃", emoji: "🎃", price: 550, currency: "coins", desc: "ขายได้: 550 เหรียญ 🪙" }
    ],
    furniture: [
      { id: "wall_window", name: "หน้าต่างฝนตก", emoji: "🪟", price: 300, currency: "coins", desc: "300 เหรียญ" },
      { id: "wall_painting", name: "กรอบรูปป่าไม้", emoji: "🖼️", price: 150, currency: "coins", desc: "150 เหรียญ" },
      { id: "wall_neon", name: "ไฟนีออนสายรุ้ง", emoji: "🌈", price: 500, currency: "coins", desc: "500 เหรียญ" },
      { id: "wall_star", name: "ดาวส่องแสง", emoji: "⭐", price: 200, currency: "coins", desc: "200 เหรียญ" },
      { id: "floor_plant", name: "ต้นมอนสเตอร่า", emoji: "🪴", price: 120, currency: "coins", desc: "120 เหรียญ" },
      { id: "floor_bear", name: "หมีตุ๊กตายักษ์", emoji: "🧸", price: 250, currency: "coins", desc: "250 เหรียญ" },
      { id: "floor_guitar", name: "กีตาร์ไม้", emoji: "🎸", price: 400, currency: "coins", desc: "400 เหรียญ" },
      { id: "floor_box", name: "กล่องกระดาษน้อง", emoji: "📦", price: 100, currency: "coins", desc: "100 เหรียญ" },
      { id: "table_lamp", name: "โคมไฟลาวา", emoji: "💡", price: 180, currency: "coins", desc: "180 เหรียญ" },
      { id: "table_cocoa", name: "โกโก้ร้อน", emoji: "☕", price: 80, currency: "coins", desc: "80 เหรียญ" },
      { id: "table_radio", name: "วิทยุวินเทจ", emoji: "📻", price: 350, currency: "coins", desc: "350 เหรียญ" },
      { id: "table_globe", name: "ลูกแก้วหิมะ", emoji: "🔮", price: 220, currency: "coins", desc: "220 เหรียญ" }
    ]
  };
  
  // Highlight active tab in DOM
  document.querySelectorAll(".shop-tab").forEach(tab => {
    if (tab.getAttribute("data-shoptab") === tabId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  
  const activeList = items[tabId] || [];
  container.innerHTML = activeList.map((item, idx) => {
    let isBought = false;
    let displayDesc = item.desc;
    if (tabId === "sell") {
      const qty = state.foods[item.id] || 0;
      const canSell = qty > 0;
      const itemVisual = `<span class="shop-item-emoji">${item.emoji}</span>`;
      return `
        <div class="shop-item-card" style="cursor: default; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 10px 6px; min-height: 128px;">
          ${itemVisual}
          <span class="shop-item-name" style="font-weight: 800; font-size: 11px;">${item.name}</span>
          <span class="shop-item-price" style="font-size: 8px; color: var(--text-secondary); background: rgba(16, 185, 129, 0.1); margin-bottom: 4px;">ในเป้: x${qty} | ${item.price}🪙</span>
          <button onclick="buyShopItemDirect('sell', ${idx})" 
                  style="border: none; background: ${canSell ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#e2e8f0'}; 
                         color: ${canSell ? 'white' : '#94a3b8'}; font-size: 9px; font-weight: 800; padding: 5px 12px; border-radius: 12px; 
                         cursor: ${canSell ? 'pointer' : 'not-allowed'}; box-shadow: ${canSell ? '0 2px 4px rgba(16,185,129,0.25)' : 'none'}; 
                         transition: all 0.15s ease; width: 85%;">
             💰 ขาย
          </button>
        </div>
      `;
    }

    isBought = (tabId === "clothes" && state.unlockedApparel.includes(item.id)) ||
               (tabId === "furniture" && state.ownedFurniture.includes(item.id));
    const itemVisual = tabId === "clothes" ? `<div style="width:48px; height:48px; display:flex; align-items:center; justify-content:center; margin:0 auto 4px auto;">${getApparelVisual(item.id, 42)}</div>` : `<span class="shop-item-emoji">${item.emoji}</span>`;
    return `
      <div class="shop-item-card ${isBought ? 'bought-item' : ''}" onclick="buyShopItemDirect('${tabId}', ${idx})">
        ${itemVisual}
        <span class="shop-item-name">${item.name}</span>
        <span class="shop-item-price">${isBought ? 'ซื้อแล้ว' : displayDesc}</span>
      </div>
    `;
  }).join("");
  if (state.lang === "en") {
    applyLanguageToNode(container, "en");
  }
}
