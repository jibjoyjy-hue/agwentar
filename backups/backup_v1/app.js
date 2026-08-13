// JOY BLOB WELLNESS APP - CORE STATE & DATABASE
// ==========================================================================

// Stress Test 30 Questions in Thai
const STRESS_QUESTIONS = [
  "รู้สึกว่าตนเองมีเรื่องต้องรับผิดชอบมากเกินไป",
  "รู้สึกว่าสถานการณ์ต่าง ๆ ควบคุมได้ยาก",
  "รู้สึกกังวลเกี่ยวกับเรื่องเล็ก ๆ น้อย ๆ มากกว่าปกติ",
  "รู้สึกเหนื่อยล้าทางใจแม้ไม่ได้ใช้แรงมาก",
  "มีความคิดวนซ้ำเกี่ยวกับปัญหาที่เกิดขึ้น",
  "รู้สึกว่าตนเองจัดการปัญหาไม่ทัน",
  "มีปัญหาในการนอนหลับเพราะคิดมาก",
  "รู้สึกหงุดหงิดง่ายกว่าปกติ",
  "รู้สึกกดดันจากความคาดหวังของคนรอบข้าง",
  "รู้สึกหมดพลังหรือไม่มีแรงจูงใจ",
  "รู้สึกว่าตนเองต้องรีบทำหลายอย่างพร้อมกัน",
  "มีอาการใจเต้นเร็ว กระวนกระวาย หรืออยู่ไม่สุขเมื่อเครียด",
  "รู้สึกว่าปัญหาต่าง ๆ ใหญ่เกินกว่าจะรับมือ",
  "มีสมาธิลดลงเมื่อมีความเครียด",
  "รู้สึกไม่มั่นใจในการตัดสินใจของตนเอง",
  "รู้สึกว่าตนเองไม่มีเวลาพักผ่อนเพียงพอ",
  "มีอาการปวดศีรษะ ปวดเมื่อย หรือเกร็งเมื่อเครียด",
  "รู้สึกอยากหลีกหนีจากสถานการณ์ที่กดดัน",
  "รู้สึกว่าความเครียดส่งผลต่อความสัมพันธ์กับผู้อื่น",
  "รู้สึกว่าตนเองทำอะไรได้ไม่ดีเท่าเดิม",
  "เมื่อเกิดปัญหา รู้สึกตื่นตระหนกง่าย",
  "รู้สึกว่าตนเองต้องฝืนทำสิ่งต่าง ๆ ทั้งที่เหนื่อย",
  "มีความรู้สึกเศร้า เบื่อ หรือหมดความสนใจในสิ่งที่เคยชอบ",
  "ใช้โทรศัพท์ อาหาร หรือกิจกรรมอื่นเพื่อหลีกเลี่ยงความเครียดมากขึ้น",
  "รู้สึกว่าความคิดด้านลบเกิดขึ้นบ่อย",
  "รู้สึกว่าตนเองรับมือกับเหตุการณ์ไม่คาดคิดได้ยาก",
  "รู้สึกกังวลเกี่ยวกับอนาคต",
  "รู้สึกว่าความเครียดส่งผลต่อการใช้ชีวิตประจำวัน",
  "รู้สึกว่าต้องเก็บความเครียดไว้คนเดียว",
  "รู้สึกว่าช่วงนี้ความเครียดมากเกินกว่าที่ตนเองรับไหว"
];

// Shop Items Database
const BASE_SHOP_ITEMS = [
  // FOOD
  { id: "sandwich", name: "แซนวิชแฮม", desc: "ฟื้น HP +5 | พลังงาน +10", price: 50, type: "food", emoji: "🥪", hp: 5, energy: 10 },
  { id: "salad", name: "สลัดสุขภาพ", desc: "ฟื้น HP +5 | พลังงาน +5", price: 40, type: "food", emoji: "🥗", hp: 5, energy: 5 },
  { id: "pancake", name: "แพนเค้กสตรอว์เบอร์รี่", desc: "ฟื้น HP +5 | พลังงาน +10", price: 60, type: "food", emoji: "🥞", hp: 5, energy: 10 },
  { id: "onigiri", name: "ข้าวปั้นสาหร่าย", desc: "ฟื้น HP +5 | พลังงาน +5", price: 30, type: "food", emoji: "🍙", hp: 5, energy: 5 },
  { id: "pizza", name: "พิซซ่าร้อนๆ", desc: "ฟื้นฟู HP +5 | พลังงาน +15", price: 70, type: "food", emoji: "🍕", hp: 5, energy: 15 },
  { id: "burger", name: "เบอร์เกอร์ชีส", desc: "ฟื้นฟู HP +5 | พลังงาน +10", price: 75, type: "food", emoji: "🍔", hp: 5, energy: 10 },
  { id: "sushi", name: "ซูชิแซลมอน", desc: "ฟื้นฟู HP +5 | พลังงาน +20", price: 80, type: "food", emoji: "🍣", hp: 5, energy: 20 },
  { id: "ramen", name: "ราเมนชามโต", desc: "ฟื้นฟู HP +5 | พลังงาน +10", price: 85, type: "food", emoji: "🍜", hp: 5, energy: 10 },
  { id: "ice_cream", name: "ไอศกรีมหวานเย็น", desc: "ฟื้นฟู HP +5 | พลังงาน +25", price: 45, type: "food", emoji: "🍦", hp: 5, energy: 25 },
  { id: "cake", name: "เค้กสตรอว์เบอร์รี", desc: "ฟื้นฟู HP +5 | พลังงาน +20", price: 55, type: "food", emoji: "🍰", hp: 5, energy: 20 },
  { id: "fries", name: "เฟรนช์ฟรายส์กรอบ", desc: "ฟื้นฟู HP +5 | พลังงาน +15", price: 40, type: "food", emoji: "🍟", hp: 5, energy: 15 },
  // DRINK
  { id: "water", name: "น้ำแร่บริสุทธิ์", desc: "ฟื้น HP +5 | พลังงาน +15", price: 20, type: "drink", emoji: "💧", hp: 5, energy: 15 },
  { id: "milk", name: "นมสดร้อน", desc: "ฟื้น HP +5 | พลังงาน +15", price: 30, type: "drink", emoji: "🥛", hp: 5, energy: 15 },
  { id: "boba", name: "ชานมไข่มุกหวานน้อย", desc: "ฟื้น HP +5 | พลังงาน +25", price: 35, type: "drink", emoji: "🧋", hp: 5, energy: 25 },
  { id: "cookie", name: "คุกกี้เนยสด", desc: "ฟื้น HP +5 | พลังงาน +5", price: 25, type: "drink", emoji: "🍪", hp: 5, energy: 5 },
  { id: "coffee", name: "กาแฟหอมขม", desc: "ฟื้นฟู HP +5 | พลังงาน +35", price: 40, type: "drink", emoji: "☕", hp: 5, energy: 35 },
  { id: "juice", name: "น้ำผลไม้ปั่น", desc: "ฟื้นฟู HP +5 | พลังงาน +20", price: 35, type: "drink", emoji: "🧃", hp: 5, energy: 20 },
  { id: "tea", name: "ชาเขียวร้อน", desc: "ฟื้นฟู HP +5 | พลังงาน +25", price: 45, type: "drink", emoji: "🍵", hp: 5, energy: 25 },
  { id: "soda", name: "น้ำอัดลมซ่าส์", desc: "ฟื้นฟู HP +5 | พลังงาน +30", price: 30, type: "drink", emoji: "🥤", hp: 5, energy: 30 },
  { id: "smoothie", name: "สมูทตี้รวมมิตร", desc: "ฟื้นฟู HP +5 | พลังงาน +25", price: 55, type: "drink", emoji: "🍹", hp: 5, energy: 25 },
  // FURNITURE
  { id: "moon_lamp", name: "โคมไฟดวงจันทร์", desc: "วางตกแต่งในห้องเพิ่มความน่ารัก", price: 200, type: "furniture", emoji: "🌙" },
  { id: "cloud_bed", name: "เตียงนอนปุยเมฆ", desc: "เตียงสุดนุ่มเพิ่มความชิค", price: 400, type: "furniture", emoji: "☁️" },
  // SKINS (Custom jelly body shapes & head traits) - 30 unique skins!
  { id: "skin_heart", name: "สกินหัวใจชมพู 💖", desc: "เปลี่ยนร่างสีชมพูพร้อมเสาหัวใจแห่งความรักแสนหวาน", price: 150, type: "furniture", emoji: "💖" },
  { id: "skin_sprout", name: "สกินต้นอ่อนใบไม้ 🌱", desc: "เปลี่ยนร่างสีเขียวรักษ์โลกพร้อมใบไม้ผุดบนหัวยอดโค้ง", price: 200, type: "furniture", emoji: "🌱" },
  { id: "skin_lightning", name: "สกินสายฟ้าฟาด ⚡", desc: "เปลี่ยนร่างสีทองพร้อมแผ่นสายฟ้าเหลี่ยมตัดแสงระยิบ", price: 300, type: "furniture", emoji: "⚡" },
  { id: "skin_bunny", name: "สกินกระต่ายน้อย 🐰", desc: "เปลี่ยนร่างสีชมพูพาสเทลหูกระต่ายแวววาวนิ่มนุ่ม", price: 400, type: "furniture", emoji: "🐰" },
  { id: "skin_cat", name: "สกินแมวเหมียว 🐱", desc: "เปลี่ยนร่างสีม่วงพร้อมหูแมวขี้อ้อนสุดน่ารักแวววาว", price: 450, type: "furniture", emoji: "🐱" },
  { id: "skin_halo", name: "สกินเทวดาตัวน้อย 👼", desc: "เปลี่ยนร่างสว่างสดใสพร้อมวงแหวนส่องสว่างโกลว์รอบทิศ", price: 500, type: "furniture", emoji: "👼" },
  { id: "skin_devil", name: "สกินปีศาจส้ม 😈", desc: "เปลี่ยนร่างสีส้มพร้อมเขาปีศาจแดงตัดแสงสลับมิติ", price: 250, type: "furniture", emoji: "😈" },
  { id: "skin_star", name: "สกินดวงดาวระยิบ ⭐", desc: "เปลี่ยนร่างสีเหลืองพร้อมเสาคู่รูปดาวส่องแสงระยิบระยับ", price: 350, type: "furniture", emoji: "⭐" },
  { id: "skin_alien", name: "สกินเอเลี่ยนมะนาว 👽", desc: "เปลี่ยนร่างสีเขียวมะนาวพร้อมเสากลมคู่ต่างดาวสุดน่ารัก", price: 180, type: "furniture", emoji: "👽" },
  { id: "skin_wings", name: "สกินปีกนางฟ้าฟ้าใส 🕊️", desc: "เปลี่ยนร่างสีฟ้าสดใสพร้อมหูปีกนกนางฟ้าน่ารัก", price: 320, type: "furniture", emoji: "🕊️" },
  { id: "skin_unicorn", name: "สกินยูนิคอร์นมายา 🦄", desc: "เปลี่ยนร่างชมพูพาสเทลและเขายูนิคอร์นทองประกายแฉก", price: 380, type: "furniture", emoji: "🦄" },
  { id: "skin_bear_yellow", name: "สกินหมีน้ำผึ้งเหลือง 🐻", desc: "เปลี่ยนร่างสีเหลืองทองและหูหมีหนานุ่มโค้งกลม", price: 220, type: "furniture", emoji: "🐻" },
  { id: "skin_bear_pink", name: "สกินหมีริบบิ้นกุหลาบ 🧸", desc: "เปลี่ยนร่างสีชมพูกุหลาบและหูหมีผูกริบบิ้นโบว์แดงจิ๋ว", price: 260, type: "furniture", emoji: "🧸" },
  { id: "skin_curled", name: "สกินเสาอากาศโค้ง 🌀", desc: "เปลี่ยนร่างสีม่วงออร์คิดและสายอากาศหางงอก้นหอย", price: 210, type: "furniture", emoji: "🌀" },
  { id: "skin_triple", name: "สกินเสาสามก้านต่างดาว 📡", desc: "เปลี่ยนร่างสีเขียวมรกตและมีเสาจิ๋วกลม 3 ก้านสุดน่ารัก", price: 290, type: "furniture", emoji: "📡" },
  { id: "skin_star_pins", name: "สกินกิ๊บดาวสีส้ม 🔸", desc: "เปลี่ยนร่างส้มสีอำพันและกิ๊บดวงดาวสี่แฉกคู่สองข้างหัว", price: 230, type: "furniture", emoji: "🔸" },
  { id: "skin_crown", name: "สกินราชาฟองมรกต 👑", desc: "เปลี่ยนร่างสีเขียวมุกและสวมมงกุฎมรกตราชาชั้นสูง", price: 420, type: "furniture", emoji: "👑" },
  { id: "skin_crystal", name: "สกินผลึกอัญมณีม่วง 💎", desc: "เปลี่ยนร่างสีม่วงครามและมีกลุ่มคริสตัลหนามอัญมณีบนหัว", price: 460, type: "furniture", emoji: "💎" },
  { id: "skin_goggles", name: "สกินแว่นตาไซเบอร์ 🥽", desc: "เปลี่ยนร่างเป็นสีน้ำเงินเข้มและแว่นตาเรืองแสงสไตล์อนาคต", price: 280, type: "furniture", emoji: "🥽" },
  { id: "skin_sprout_curled", name: "สกินยอดเถาวัลย์ม้วน 🌿", desc: "เปลี่ยนร่างสีเขียวพาสเทลและยอดเถาวัลย์โค้งก้นหอยนุ่ม", price: 240, type: "furniture", emoji: "🌿" },
  { id: "skin_bubbles", name: "สกินเสาฟองอากาศ 🫧", desc: "เปลี่ยนร่างสีฟ้าอความารีนและหนวดปุ่มกลมใสลอยเด่น", price: 270, type: "furniture", emoji: "🫧" },
  { id: "skin_ribbon_pink", name: "สกินริบบิ้นแดงข้างหู 🎀", desc: "เปลี่ยนร่างสีชมพูซากุระและผูกริบบิ้นสีแดงโบว์สองข้าง", price: 250, type: "furniture", emoji: "🎀" },
  { id: "skin_devil_purple", name: "สกินเขาปีศาจม่วง 👿", desc: "เปลี่ยนร่างสีม่วงเข้มและเขาปีศาจเร่าร้อนสีม่วงขี้เล่น", price: 330, type: "furniture", emoji: "👿" },
  { id: "skin_bunny_blue", name: "สกินกระต่ายฟ้าคราม 🩵", desc: "เปลี่ยนร่างสีฟ้าสดใสพร้อมหูกระต่ายยาวน่าเอ็นดูแวววาว", price: 390, type: "furniture", emoji: "🩵" },
  { id: "skin_bear_teal", name: "สกินหมีขั้วโลกมิ้นท์ 🐻‍❄️", desc: "เปลี่ยนร่างสีเขียวเทลสดใสและหูหมีมิ้นท์โค้งกลมนุ่มนิ่ม", price: 270, type: "furniture", emoji: "🐻‍❄️" },
  { id: "skin_angel_pink", name: "สกินเทวทูตชมพู 🪽", desc: "เปลี่ยนร่างสีชมพูพาสเทลพร้อมหูปีกขนนกและวงแหวนเทวทูต", price: 480, type: "furniture", emoji: "🪽" },
  { id: "skin_dino", name: "สกินไดโนเสาร์จิ๋ว 🦖", desc: "เปลี่ยนร่างสีเขียวมรกตและแผงหนามหลังไดโนเสาร์สามแง่ง", price: 340, type: "furniture", emoji: "🦖" },
  { id: "skin_reindeer", name: "สกินกวางเรนเดียร์ 🦌", desc: "เปลี่ยนร่างสีครีมน้ำตาลและเขากวางกิ่งไม้น่ารักรับคริสต์มาส", price: 370, type: "furniture", emoji: "🦌" },
  { id: "skin_cat_black", name: "สกินแมวดำมืดสลัว 🐈‍⬛", desc: "เปลี่ยนร่างสีเทาเข้มเงาสลัวพร้อมหูแมวและตาแมวสีชมพูพีช", price: 440, type: "furniture", emoji: "🐈‍⬛" },
  { id: "skin_nebula", name: "สกินเนบิวลาดวงดาว 🌌", desc: "เปลี่ยนร่างสีกาแล็กซี่ม่วงพร้อมละอองประกายดาวเรืองวิบวับ", price: 490, type: "furniture", emoji: "🌌" }

];

const SHOP_ITEMS = [...BASE_SHOP_ITEMS];

function generateApparelItems() {
  // Premium Selection of Accessories (Hats, Socks, Shoes) - Clean and Not Too Overwhelming
  SHOP_ITEMS.push({ id: "wizard_hat", name: "หมวกพ่อมดจอมเวท", desc: "สวมใส่: โบนัส EXP +10% 🧙", price: 150, type: "clothes", subtype: "hat", emoji: "🧙", reqLevel: 1, color: "#4d3b8c" });
  SHOP_ITEMS.push({ id: "glasses", name: "แว่นตากลมแฟชั่น", desc: "สวมใส่: โบนัสเงินทอง +10% 👓", price: 100, type: "clothes", subtype: "hat", emoji: "👓", reqLevel: 1, color: "#f472b6" });
  SHOP_ITEMS.push({ id: "crown", name: "มงกุฎเจ้าหญิง", desc: "สวมใส่: พลังชีวิตสูงสุด +15 👑", price: 300, type: "clothes", subtype: "hat", emoji: "👑", reqLevel: 1, color: "#fbbf24" });

  const premiumAccessories = [
    { id: "hat_cap_blue", name: "หมวกแก๊ปสปอร์ตสีฟ้า 🧢", desc: "หมวกแก๊ปเบสบอลปีกตรงป้องกันแสงแดดสดใส", price: 75, type: "clothes", subtype: "hat", emoji: "🧢", reqLevel: 10, color: "#3b82f6" },
    { id: "hat_cap_pink", name: "หมวกแก๊ปสปอร์ตสีชมพู 🧢", desc: "หมวกแก๊ปเบสบอลสีชมพูน่ารัก โบนัสหลบหลีก +5%", price: 80, type: "clothes", subtype: "hat", emoji: "🧢", reqLevel: 10, color: "#f472b6" },
    { id: "hat_witch_purple", name: "หมวกแม่มดทรงแหลม 🔮", desc: "หมวกทรงแหลมมนต์ดำแม่มด เพิ่มพลังโจมตีเวทมนตร์", price: 130, type: "clothes", subtype: "hat", emoji: "🎩", reqLevel: 20, color: "#4c1d95" },
    
    { id: "socks_stripe_red", name: "ถุงเท้าข้อสั้นลายริ้วแดง 🧦", desc: "ถุงเท้านุ่มลายริ้วแดงตัดขาวสุดเทรนดี้", price: 40, type: "clothes", subtype: "socks", emoji: "🧦", reqLevel: 10, color: "#ef4444" },
    { id: "socks_stripe_blue", name: "ถุงเท้ายาวลายขวางสีฟ้า 🧦", desc: "ถุงเท้ายาวผ้าฝ้ายนุ่มพิเศษช่วยกักเก็บความร้อน", price: 60, type: "clothes", subtype: "socks", emoji: "🧦", reqLevel: 20, color: "#06b6d4" },
    
    { id: "shoes_sneakers_blue", name: "รองเท้าผ้าใบสตรีทสีฟ้า 👟", desc: "รองเท้าผ้าใบเดินนุ่มสบายเท้า โบนัสเดินเร็ว +5%", price: 90, type: "clothes", subtype: "shoes", emoji: "👟", reqLevel: 20, color: "#3b82f6" },
    { id: "shoes_boots_brown", name: "รองเท้าบูทหนังสีน้ำตาล 👢", desc: "รองเท้าบูทหนังแท้ป้องกันการลื่นล้มก้าวเดินมั่นใจ", price: 120, type: "clothes", subtype: "shoes", emoji: "👟", reqLevel: 30, color: "#78350f" }
  ];
  premiumAccessories.forEach(acc => {
    SHOP_ITEMS.push(acc);
  });
}
generateApparelItems();




// Mood-based Dynamic Quests Data
const MOOD_QUESTS = {
  "Sad": [
    { id: "mq_sad1", name: "เขียนข้อดีของตัวเอง 3 ข้อลงกระดาษ ✍️", desc: "จดบันทึกชื่นชมคุณค่าในตัว", emoji: "📝", coins: 100, exp: 10 },
    { id: "mq_sad2", name: "กอดตุ๊กตาหรือกอดตัวเองให้ใจอุ่น 1 นาที 🤗", desc: "ส่งความรักให้สภาพจิตใจตัวเอง", emoji: "🧸", coins: 100, exp: 10 },
    { id: "mq_sad3", name: "พูดคุยระบายความรู้สึกกับ Joy AI 💬", desc: "คุยเพื่อลดความเหงาความซึม", emoji: "🤖", coins: 100, exp: 10 },
    { id: "mq_sad4", name: "มองกระจกแล้วยิ้มให้กับตัวเองบ้าๆ 1 ครั้ง 🪞", desc: "ส่องกระจกมอบความหวังให้รอยยิ้มตนเอง", emoji: "🪞", coins: 100, exp: 10 },
    { id: "mq_sad5", name: "ฟังเพลงจังหวะสนุกสนานหรือเพลงที่ชอบ 1 เพลง 🎵", desc: "ใช้เสียงเพลงสร้างความมีชีวิตชีวา", emoji: "🎵", coins: 100, exp: 10 }
  ],
  "Stressed": [
    { id: "mq_str1", name: "ฝึกหายใจกล่องสี่เหลี่ยม (Box Breathing) 2 นาที 🧘‍♀️", desc: "สูดหายใจ 4 วิ ค้าง 4 วิ ปล่อย 4 วิ เพื่อคลายเครียด", emoji: "🌬️", coins: 100, exp: 10 },
    { id: "mq_str2", name: "จิบน้ำสะอาดอุ่นๆ 1 แก้วเต็มช้าๆ 🥛", desc: "คืนความสดชื่นบำบัดกลไกเครียด", emoji: "💧", coins: 100, exp: 10 },
    { id: "mq_str3", name: "ฟังสรรพเสียงผ่อนคลายหรือดนตรีธรรมชาติ 1 เพลง 🎵", desc: "ใช้ดนตรีปรับคลื่นความกังวล", emoji: "🎧", coins: 100, exp: 10 },
    { id: "mq_str4", name: "ยืดเส้นยืดสายหรือขยับร่างกายโยคะ 1 นาที 🤸‍♀️", desc: "ยืดคลายความเกร็งของกล้ามเนื้อที่ตึง", emoji: "🤸‍♀️", coins: 100, exp: 10 },
    { id: "mq_str5", name: "หลับตานั่งสมาธิกำหนดลมหายใจเข้าออก 1 นาที 🧘", desc: "สร้างพื้นที่ความคิดว่างและสงบใจชั่วคราว", emoji: "🧘", coins: 100, exp: 10 }
  ],
  "Tired": [
    { id: "mq_tir1", name: "กดเอนหลังนอนพักผ่อนบนเตียง 10 นาที 🛏️", desc: "ชาร์จพลังชั่วคราวให้กล้ามเนื้อและสมอง", emoji: "💤", coins: 100, exp: 10 },
    { id: "mq_tir2", name: "จดบันทึกสิ่งเล็กๆ ที่ทำสำเร็จในวันนี้ 3 อย่าง 🏆", desc: "ชื่นชมความพยายามแม้เป็นวันล้าๆ", emoji: "📝", coins: 100, exp: 10 },
    { id: "mq_tir3", name: "หลับตาหนีห่างจากจอโทรศัพท์/คอม 5 นาที 👁️", desc: "ถนอมประสาทสายตาและลดสิ่งเร้าภายนอก", emoji: "👀", coins: 100, exp: 10 },
    { id: "mq_tir4", name: "นั่งปล่อยใจเฉลยๆ ฟังเสียงธรรมชาตินุ่มๆ 🌲", desc: "ทอดสายตาปล่อยใจให้สมาธิผ่อนคลาย", emoji: "🌲", coins: 100, exp: 10 },
    { id: "mq_tir5", name: "แช่น้ำอุ่นหรือล้างหน้าให้หน้าตาสดชื่น 💦", desc: "ใช้น้ำล้างกระตุ้นความตื่นตัวของร่างกาย", emoji: "🧼", coins: 100, exp: 10 }
  ],
  "Angry": [
    { id: "mq_ang1", name: "พิมพ์บ่นระบายความหงุดหงิดลงกระดาษจำลอง 📝", desc: "ปลดปล่อยพลังลบรุ่มร้อนผ่านตัวอักษร", emoji: "🔥", coins: 100, exp: 10 },
    { id: "mq_ang2", name: "หลับตานับเลขถอยหลังจาก 100 ช้าๆ 🔢", desc: "ดึงความสุขุมและสติกลับคืน", emoji: "🧠", coins: 100, exp: 10 },
    { id: "mq_ang3", name: "ไปชำระล้างมือล้างหน้าด้วยน้ำเย็น ❄️", desc: "ใช้อุณหภูมิลดความโมโหและเพิ่มสติ", emoji: "🧼", coins: 100, exp: 10 },
    { id: "mq_ang4", name: "วาดรูปขีดๆ เขียนๆ ระบายอารมณ์บนกระดาษ 🎨", desc: "ใช้ศิลปะระบายระเบิดอารมณ์ด้านลบ", emoji: "🎨", coins: 100, exp: 10 },
    { id: "mq_ang5", name: "สูดหายใจลึกๆ 5 ครั้งสะสมความใจเย็น 🌬️", desc: "ดึงออกซิเจนปรับระดับหัวใจเต้นเร็วเมื่อโกรธ", emoji: "🌬️", coins: 100, exp: 10 }
  ],
  "Lonely": [
    { id: "mq_lon1", name: "ทักทายพูดคุยระบายใจกับ Joy AI 🤖", desc: "มีฉันรับฟังเสมอนะคนดี", emoji: "💬", coins: 100, exp: 10 },
    { id: "mq_lon2", name: "เล่นมินิเกมจับคู่การ์ดให้ผ่าน 1 ตา 🧩", desc: "เบี่ยงเบนความว้าเหว่", emoji: "🎮", coins: 100, exp: 10 },
    { id: "mq_lon3", name: "ส่งสติกเกอร์ทักทายคนในครอบครัวหรือเพื่อน ✉️", desc: "เชื่อมความใกล้ชิดใจถึงกันของสายใยคนคุ้นเคย", emoji: "🧡", coins: 100, exp: 10 },
    { id: "mq_lon4", name: "หาของอร่อยหรือชานมหวานป้อนให้ Joy Blob 🧋", desc: "ป้อนของโปรดเพื่อนตัวน้อยเพิ่มค่าความสุข", emoji: "🧋", coins: 100, exp: 10 },
    { id: "mq_lon5", name: "เขียนไดอารี่แชร์ความในใจของวันนี้ 📔", desc: "จดบันทึกแบ่งเบาความคิดสะสมในใจ", emoji: "📝", coins: 100, exp: 10 }
  ],
  "Bored": [
    { id: "mq_bor1", name: "เล่นมินิเกมจับคู่รูปขนม 1 ตา 🧩", desc: "กระตุ้นสมองชิงเหรียญทอง", emoji: "🎮", coins: 100, exp: 10 },
    { id: "mq_bor2", name: "พา Joy Blob ลงแช่อ่างน้ำฟองสบู่อุ่น 🛁", desc: "ทำความสะอาดตัวผ่อนคลายสบายผิวกาย", emoji: "🧼", coins: 100, exp: 10 },
    { id: "mq_bor3", name: "สวมใส่เสื้อผ้าหรือหมวกทรงใหม่ให้ Joy Blob 🧙", desc: "เปลี่ยนลุคแต่งตัวใหม่ๆ แก้เซ็งกันนะคะ", emoji: "👕", coins: 100, exp: 10 },
    { id: "mq_bor4", name: "ลองปรับเปลี่ยนเพลงพื้นหลังหรือเปิดปิดเสียงดู 🎵", desc: "สลับเสียงบรรยากาศเพื่อลดความจำเจ", emoji: "🎵", coins: 100, exp: 10 },
    { id: "mq_bor5", name: "เปลี่ยนสกินห้องของน้อง Joy Blob ใหม่ 🏠", desc: "เปลี่ยนบรรยากาศรอบตัวน้องและคุณ", emoji: "🏡", coins: 100, exp: 10 }
  ],
  "Happy": [
    { id: "mq_hap1", name: "จดสิ่งดีๆ ที่ทำให้หัวเราะหรือยิ้มได้ในวันนี้ ✍️", desc: "เก็บสะสมกระปุกความทรงจำสุข", emoji: "🌸", coins: 100, exp: 10 },
    { id: "mq_hap2", name: "ป้อนของว่างแสนอร่อยให้ Joy Blob 🍰", desc: "มอบขนมหวานฉลองความรู้สึกฟูใจ", emoji: "🍰", coins: 100, exp: 10 },
    { id: "mq_hap3", name: "พา Joy Blob นั่งเล่นพักผ่อนบนม้านั่งสวนหย่อม 🪵", desc: "สูดอากาศธรรมชาติยิ้มรับวันดีๆ", emoji: "🌻", coins: 100, exp: 10 },
    { id: "mq_hap4", name: "ส่งอีโมจิหัวใจรัวๆ คุยกับ Joy AI เพื่อฉลอง 💖", desc: "พ่นความน่ารักร่วมยินดีกับตัวเอง", emoji: "💖", coins: 100, exp: 10 },
    { id: "mq_hap5", name: "ถ่ายรูปหรือแคปเจอร์ความน่ารักของ Joy Blob ไว้ 📸", desc: "บันทึกช็อตแห่งความประทับใจเป็นของที่ระลึก", emoji: "📸", coins: 100, exp: 10 }
  ],
  "Calm": [
    { id: "mq_clm1", name: "นั่งสมาธิหรืออยู่เงียบๆ กำหนดลมหายใจ 2 นาที 🧘‍♀️", desc: "ซึมซับความสงบใจอย่างมีสมาธิ", emoji: "✨", coins: 100, exp: 10 },
    { id: "mq_clm2", name: "เปลี่ยนสกินห้องตกแต่งห้องเลี้ยง Joy Blob 🏠", desc: "จัดแต่งพื้นที่อยู่อาศัยให้สบายตา", emoji: "🏡", coins: 100, exp: 10 },
    { id: "mq_clm3", name: "เขียนขอบพระคุณสิ่งดีๆ รอบตัว 3 เรื่อง 📝", desc: "สัมผัสความอบอุ่นและความรู้สึกขอบคุณเรื่องรอบตัว", emoji: "🙏", coins: 100, exp: 10 },
    { id: "mq_clm4", name: "ดื่มน้ำแร่ธรรมชาติเย็นๆ 1 แก้ว 💧", desc: "ดื่มช้าๆ เพิ่มความบริสุทธิ์สดชื่นให้ร่างกายและสมอง", emoji: "💧", coins: 100, exp: 10 },
    { id: "mq_clm5", name: "คุยกับ Joy AI ด้วยความรู้สึกผ่อนคลาย 💬", desc: "สนทนาแชร์แง่คิดดีๆ ร่วมกัน", emoji: "💬", coins: 100, exp: 10 }
  ]
};

// State default (coins: 0, gems: 0, level: 0, inventory: empty)
const DEFAULT_STATE = {
  lastQuizRewardDate: "",
  version: "2.4",
  petName: "Joy Blob",
  level: 0,
  isAngel: false,
  petGender: "",
  isRebirthTriggered: false,
  exp: 0,
  expMax: 10,
  hp: 20,
  hpMax: 50,
  energy: 20,
  energyMax: 50,
  coins: 0,
  gems: 0,
  activeRoom: "bedroom",
  activePosition: "pos-carpet", // pos-carpet, pos-bed, pos-table, pos-bath, pos-bench
  inventory: {}, // EMPTY START!
    ownedAccessories: {
    wizard_hat: false,
    glasses: false,
    crown: false
  },
  equippedAccessories: {
    wizard_hat: false,
    glasses: false,
    crown: false
  },

  diaryLogs: [],
  // We will dynamic populate daily quests based on mood
  activeMoodQuests: [], 
  moodQuestProgress: {}, // { qId: false }
  grandQuestClaimed: false,
  stressHistory: [],
  playLimit: 3,
  dailyGameExpEarned: 0,
  fosteredDays: 1,
  lastResetDate: ""
};
// Dynamically populate DEFAULT_STATE maps with generated clothes
SHOP_ITEMS.forEach(item => {
  if (item.type === "clothes") {
    DEFAULT_STATE.ownedAccessories[item.id] = false;
    DEFAULT_STATE.equippedAccessories[item.id] = false;
  }
});

// Global App State
let state = { ...DEFAULT_STATE };

// Missing Globals
let selectedMood = "";
let activeDiaryDate = new Date();
let selectedBagItemId = null;

// Comforting AI responses database
const CHAT_WORDS = {
  "เครียด": "ความเครียดเกิดขึ้นได้เป็นธรรมดานะคะ ลองสูดหายใจเข้าลึก ๆ ช้า ๆ หรือหาเวลาหยุดพักสายตาสักครู่ Joy Blob อยู่ข้าง ๆ ตรงนี้เสมอนะ 💙",
  "เหนื่อย": "วันนี้เหนื่อยมากเลยใช่ไหมคะ เก่งมาก ๆ แล้วนะที่ผ่านวันนี้มาได้ พักผ่อนให้เต็มที่ ดื่มน้ำอุ่น ๆ แล้วค่อยเริ่มใหม่พรุ่งนี้จ้า 💤",
  "เบื่อ": "ถ้าเบื่อ ๆ ลองชวน Joy Blob ไปเล่นมินิเกมจับคู่รูปภาพกันไหมคะ หรือจะเปลี่ยนชุดน่ารัก ๆ ให้ Joy Blob ดีน้า? 🎮👕",
  "เศร้า": "กอด ๆ นะคะ ไม่เป็นไรที่จะรู้สึกเศร้าหรือร้องไห้ในบางวัน ระบายความรู้สึกทั้งหมดให้ Joy AI ฟังได้เสมอนะคะ 🧸",
  "กังวล": "ลองโฟกัสกับลมหายใจปัจจุบันดูนะคะ สิ่งที่กังวลอาจจะไม่ได้น่ากลัวอย่างที่คิด ค่อย ๆ แก้ไขทีละนิดนะคนเก่ง 🌬️",
  "เหงา": "ไม่ต้องเหงาไปน้า Joy Blob และ Joy AI อยู่คุยเป็นเพื่อนตรงนี้เสมอ! มาป้อนขนมอร่อย ๆ ให้หนูกันเถอะ 🍰",
  "โกรธ": "ใจเย็น ๆ นะคะ ลองหลับตานับ 1-10 ช้า ๆ หรือลองแช่น้ำเย็น ๆ ดึงสติกลับมาก่อนน้า Joy AI จะคอยอยู่เป็นเซฟโซนให้เองค่ะ 🧼",
  "ท้อ": "อย่าเพิ่งยอมแพ้นะคะ ทุกปัญหามีทางออกเสมอ ค่อย ๆ เดินไปทีละก้าว Joy Blob เชื่อว่าคุณเก่งและผ่านมันไปได้แน่นอนค่ะ! ✨",
  "ขอบคุณ": "ยินดีเสมอเลยจ้า! การได้ดูแลและเยียวยาใจของคุณคือความสุขของ Joy Blob เลยนะ รักตัวเองเยอะ ๆ นะคะ 💖"
};


// Active Test State (Classic QA)
let testAnswers = Array(30).fill(null);
let currentQuestionIndex = 0;

// Active Mini Game State (Memory Game)
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let targetPairs = 6;
let gameTimer = null;
let gameSeconds = 0;
let isGameRunning = false;

// Active Mini Game State (Sort Game)
let isSortGameRunning = false;
let sortGameTimer = null;
let sortGameSeconds = 15;
let sortGameScore = 0;
let currentSortEmoji = "";
let currentSortCategory = "";

// ==========================================================================
// STORAGE MANAGEMENT
// ==========================================================================

function loadState() {
  const saved = localStorage.getItem("joy_blob_state");
  if (saved) {
    try {
      state = JSON.parse(saved);
      
      // Force reset legacy storage state for all devices
      if (!state.version || state.version !== "2.4") {
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        state.lastResetDate = new Date().toDateString();
        saveState();
        return;
      }

      state.inventory = state.inventory || {};
      const mergeKeys = (target, src) => {
        const res = { ...target };
        for (const k in src) {
          if (res[k] === undefined) res[k] = src[k];
        }
        return res;
      };
      state.ownedAccessories = mergeKeys(state.ownedAccessories || {}, DEFAULT_STATE.ownedAccessories);
      state.equippedAccessories = mergeKeys(state.equippedAccessories || {}, DEFAULT_STATE.equippedAccessories);
      state.diaryLogs = state.diaryLogs || [];
      state.activeMoodQuests = state.activeMoodQuests || [];
      state.moodQuestProgress = state.moodQuestProgress || {};
      state.stressHistory = state.stressHistory || [];
      state.activePosition = state.activePosition || "pos-carpet";
      state.dailyGameExpEarned = state.dailyGameExpEarned || 0;
      state.isAngel = state.isAngel !== undefined ? state.isAngel : false;
      state.petGender = state.petGender !== undefined ? state.petGender : "";
      state.isRebirthTriggered = state.isRebirthTriggered !== undefined ? state.isRebirthTriggered : false;
      
      checkDailyReset();
    } catch (e) {
      console.error("Error loading state, resetting...", e);
      state = { ...DEFAULT_STATE };
      saveState();
    }
  } else {
    state = { ...DEFAULT_STATE };
    state.lastResetDate = new Date().toDateString();
    saveState();
  }
}

function saveState() {
  localStorage.setItem("joy_blob_state", JSON.stringify(state));
  updateUI();
}

function checkDailyReset() {
  const todayStr = new Date().toDateString();
  if (state.lastResetDate !== todayStr) {
    // Reset daily quests & limit
    state.activeMoodQuests = [];
    state.moodQuestProgress = {};
    state.grandQuestClaimed = false;
    state.playLimit = 3;
    state.dailyGameExpEarned = 0;
    state.fosteredDays = (state.fosteredDays || 1) + 1;
    state.lastResetDate = todayStr;
    saveState();
  }
}

// ==========================================================================
// RPG STATS & LEVEL UP
// ==========================================================================

function getEquippedBonuses() {
  let bonusAtk = 0;      // EXP percent
  let bonusCoin = 0;     // COIN percent
  let maxHpBonus = 0;    // Max HP
  let maxEnergyBonus = 0;// Max Energy
  
  if (state.equippedAccessories.wizard_hat) {
    bonusAtk += 10;
    maxEnergyBonus += 5;
  }
  if (state.equippedAccessories.glasses) {
    bonusCoin += 10;
  }
  if (state.equippedAccessories.crown) {
    maxHpBonus += 15;
  }
  
  return { bonusAtk, bonusCoin, maxHpBonus, maxEnergyBonus };
}

function updateMaxStats() {
  const bonuses = getEquippedBonuses();
  state.hpMax = 50 + bonuses.maxHpBonus;
  state.energyMax = 50 + bonuses.maxEnergyBonus;
  
  state.hp = Math.min(state.hpMax, state.hp);
  state.energy = Math.min(state.energyMax, state.energy);
}

function getExpMaxForLevel(lvl) {
  if (lvl === 0) return 10;
  if (lvl === 1) return 10;
  if (lvl >= 2 && lvl <= 25) return lvl * 10;
  if (lvl === 26) return 255;
  if (lvl >= 27 && lvl <= 34) return 260;
  if (lvl >= 35 && lvl <= 40) return 270;
  if (lvl >= 41 && lvl <= 47) return 280;
  if (lvl >= 48 && lvl <= 57) return 290;
  if (lvl >= 58 && lvl <= 90) return 300;
  return null; // Level 91+ is maxed out
}

function gainExp(amount) {
  if (state.level >= 90 && state.isAngel) {
    state.exp = 300;
    state.expMax = 300;
    return;
  }
  
  if (state.level === 90 && !state.isAngel) {
    if (state.isRebirthTriggered) return;
    
    const bonuses = getEquippedBonuses();
    const actualAmount = Math.floor(amount * (1.0 + bonuses.bonusAtk / 100));
    state.exp = Math.min(300, state.exp + actualAmount);
    
    if (state.exp >= 300) {
      triggerRebirthCeremony();
    }
    saveState();
    updateUI();
    return;
  }

  const bonuses = getEquippedBonuses();
  const actualAmount = Math.floor(amount * (1.0 + bonuses.bonusAtk / 100));
  
  state.exp += actualAmount;
  
  let leveledUp = false;
  if (state.level < 90 && state.exp >= state.expMax) {
    state.exp = 0;
    state.level += 1;
    
    const nextMax = getExpMaxForLevel(state.level);
    if (nextMax === null) {
      state.exp = 0;
      state.expMax = 0;
    } else {
      state.expMax = nextMax;
    }
     leveledUp = true;
  }
  
  if (leveledUp) {
    triggerPetAnimation("happy");
    if (state.level >= 90) {
      setPetBubbleText(`ยินดีด้วยค่ะคุณ! เลเวล 90 สิ้นสุดซีซั่นสูงสุดเรียบร้อยแล้วจ้า! 🎉👑 รวบรวมความสุขต่อเพื่อจุติสวรรค์น้า`);
    } else {
      setPetBubbleText(`เย้! ร่างกายเปล่งประกาย... เลเวลเพิ่มขึ้นแล้ว ตอนนี้เลเวล ${state.level} แล้วนะ! 🎉✨`);
    }
    updateEvolutionVisuals();
    showLevelUpModal(state.level);
  }
  
  saveState();
  updateUI();
}

function showLevelUpModal(newLvl) {
  const badgeVal = document.getElementById("levelUpBadgeVal");
  if (badgeVal) badgeVal.innerText = newLvl;
  
  const rewardsList = document.getElementById("levelUpRewardsList");
  if (rewardsList) {
    let unlocks = [];
    
    if (newLvl === 1) {
      unlocks = [
        "🔓 ปลดล็อกการเกิด! ฟักออกจากไข่สำเร็จ 🐣",
        "🔓 ปลดล็อกการพูดคุยกับเพื่อนใจ Joy AI 🤖",
        "🔓 ปลดล็อกแต่งตัวเปลี่ยนเครื่องประดับ 👕",
        "🔓 ปลดล็อกมินิเกมจับคู่การ์ดความจำ 🧩"
      ];
    } else if (newLvl === 3) {
      unlocks = [
        "🔓 ปลดล็อกการให้อาหารแสนอร่อย 🍰",
        "🔓 ปลดล็อกการใช้ของกินในกระเป๋า 🎒"
      ];
    } else if (newLvl === 5) {
      unlocks = [
        "✨ วิวัฒนาการสู่ร่าง 2: Cozy Blob 🌟",
        "✨ ได้รับลวดลายดวงดาวบนหน้าผาก!"
      ];
    } else if (newLvl === 6) {
      unlocks = [
        "🔓 ปลดล็อกการซื้อชุดแต่งกายในร้านค้า 🛍️"
      ];
    } else if (newLvl === 8) {
      unlocks = [
        "🔓 ปลดล็อกมินิเกมที่ 2: เรียงอารมณ์คลายเครียด 🍬"
      ];
    } else if (newLvl === 10) {
      unlocks = [
        "🔓 ปลดล็อกระบบบ้านย้ายห้องเลี้ยง 🏠",
        "🔓 ปลดล็อกห้องนอน (Bedroom) 🛏️"
      ];
    } else if (newLvl === 90) {
      unlocks = [
        "👑 สิ้นซีซั่นระดับสูงสุดสำเร็จสูงสุด! 🎉👑",
        "✨ ขอบพระคุณที่ร่วมเดินทางดูแลใจกันมาเสมอนะคะ 💙"
      ];
    } else {
      unlocks = [
        "💪 เพิ่มขีดจำกัดค่าพลังชีวิตและพลังงานสูงสุด ❤️⚡",
        "💖 เพื่อนตัวน้อยผูกพันและรักคุณเพิ่มขึ้น!"
      ];
    }
    
    rewardsList.innerHTML = unlocks.map(item => `<div>${item}</div>`).join("");
  }
  
  openModal("modalLevelUp");
}

function modifyCoins(amount) {
  const bonuses = getEquippedBonuses();
  const actualAmount = amount > 0 ? Math.floor(amount * (1.0 + bonuses.bonusCoin / 100)) : amount;
  state.coins = Math.max(0, state.coins + actualAmount);
  saveState();
}

function modifyGems(amount) {
  state.gems = Math.max(0, state.gems + amount);
  saveState();
}

function modifyHp(amount) {
  updateMaxStats();
  state.hp = Math.max(0, Math.min(state.hpMax, state.hp + amount));
  saveState();
}

function modifyEnergy(amount) {
  updateMaxStats();
  state.energy = Math.max(0, Math.min(state.energyMax, state.energy + amount));
  saveState();
}

function updateEvolutionVisuals() {
  const lvl = state.level;
  let tierName = "ร่าง 1: Baby Blob 🐣";
  
  const wings = document.getElementById("evo-wings");
  const stars = document.getElementById("evo-stars");
  const starsSub = document.getElementById("evo-stars-sub");
  const halo = document.getElementById("evo-halo");
  const egg = document.getElementById("evo-egg");
  const slimeGroup = document.getElementById("blobMainBodyGroup");
  const body = document.getElementById("blobBody");
  
  // Hide all optional evolution overlays by default
  if (wings) wings.style.display = "none";
  if (stars) stars.style.display = "none";
  if (starsSub) starsSub.style.display = "none";
  if (halo) halo.style.display = "none";
  
  // Hide limbs by default
  document.querySelectorAll(".slime-limb").forEach(el => el.style.display = "none");

  // Reset slime body style
  if (body) {
    body.setAttribute("fill", "url(#blobGrad)");
    body.setAttribute("stroke", "none");
    body.setAttribute("transform", "scale(1) translate(0, 0)");
  }
  
  // Reset limb styles
  document.querySelectorAll(".slime-limb").forEach(el => {
    el.setAttribute("fill", "url(#blobGrad)");
    el.setAttribute("stroke", "none");
  });

  if (state.isAngel) {
    const titleGender = state.petGender === "female" ? "นางฟ้าแสนดี 👼✨" : "เทวดาผู้ปกปักรักษา 👼✨";
    tierName = `ร่างจุติสวรรค์: ${titleGender}`;
    if (wings) wings.style.display = "block";
    if (halo) halo.style.display = "block";
    if (egg) egg.style.display = "none";
    if (slimeGroup) slimeGroup.style.display = "block";
    if (body) {
      body.setAttribute("fill", "#ffffff");
      body.setAttribute("stroke", "#fbbf24");
      body.setAttribute("stroke-width", "3.5");
    }
    // If angel is level >= 30, it has white limbs with gold outline!
    if (lvl >= 30) {
      document.querySelectorAll(".slime-limb").forEach(el => {
        el.style.display = "block";
        el.setAttribute("fill", "#ffffff");
        el.setAttribute("stroke", "#fbbf24");
        el.setAttribute("stroke-width", "2");
      });
    }
  } else if (lvl === 0) {
    tierName = "ร่าง 0: ไข่รอวันฟักตัว 🥚";
    if (egg) egg.style.display = "block";
    if (slimeGroup) slimeGroup.style.display = "none";
  } else {
    if (egg) egg.style.display = "none";
    if (slimeGroup) slimeGroup.style.display = "block";
    
    if (lvl >= 5 && lvl <= 14) {
      tierName = "ร่าง 2: Cozy Blob 🌟";
      if (stars) stars.style.display = "block";
      if (starsSub) starsSub.style.display = "block";
    } else if (lvl >= 15 && lvl <= 29) {
      tierName = "ร่าง 3: Giant Blob 👑";
      if (stars) stars.style.display = "block";
      if (starsSub) starsSub.style.display = "block";
      if (wings) wings.style.display = "block";
    } else if (lvl >= 30) {
      tierName = "ร่าง 4: Slime Buddy 🌟";
      if (stars) stars.style.display = "block";
      if (starsSub) starsSub.style.display = "block";
      if (wings) wings.style.display = "block";
      if (halo) halo.style.display = "block";
      // Show limbs!
      document.querySelectorAll(".slime-limb").forEach(el => el.style.display = "block");
    }
  }
  
  const tierEl = document.getElementById("profileEvoTier");
  if (tierEl) tierEl.innerText = tierName;
  
  // Highlight active evolution showcase cards
  for (let i = 1; i <= 4; i++) {
    const cardEl = document.getElementById(`evoCard${i}`);
    if (cardEl) cardEl.classList.remove("active");
  }
  if (lvl >= 1 && lvl <= 4) {
    const card = document.getElementById("evoCard1");
    if (card) card.classList.add("active");
  } else if (lvl >= 5 && lvl <= 14) {
    const card = document.getElementById("evoCard2");
    if (card) card.classList.add("active");
  } else if (lvl >= 15 && lvl <= 29) {
    const card = document.getElementById("evoCard3");
    if (card) card.classList.add("active");
  } else if (lvl >= 30) {
    const card = document.getElementById("evoCard4");
    if (card) card.classList.add("active");
  }
}





// ==========================================================================
// TABS & VIEWS SWITCH
// ==========================================================================

function switchTab(tabId) {
  document.querySelectorAll(".view-panel").forEach(panel => {
    panel.classList.remove("active");
  });
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.classList.remove("active");
  });
  
  const targetPanel = document.getElementById(`view-${tabId}`);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }
  const targetTab = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
  if (targetTab) {
    targetTab.classList.add("active");
  }

  // Load sub-features
  if (tabId === "diary") {
    setupDiaryCalendar();
    renderDiaryLogs();
  } else if (tabId === "quest") {
    checkAndGenerateMoodQuests();
    renderQuests();
  } else if (tabId === "shop") {
    renderShop("food");
  } else if (tabId === "game") {
    document.getElementById("gameIntroSec").style.display = "flex";
    document.getElementById("memoryGamePlaySec").style.display = "none";
    document.getElementById("sortGamePlaySec").style.display = "none";
    const sgp = document.getElementById("shooterGamePlaySec"); if(sgp) sgp.style.display = "none";
    
    // Update daily game exp cap tracker in HTML
    const capEl = document.getElementById("dailyGameExpVal");
    if (capEl) capEl.innerText = state.dailyGameExpEarned;
    
    // Manage Memory Game Button (Level 1 Lock)
    const memBtn = document.getElementById("playMemoryGameBtn");
    if (state.level < 1) {
      memBtn.innerText = "ปลดล็อกเลเวล 1";
      memBtn.disabled = true;
      memBtn.classList.add("disabled-btn");
    } else {
      memBtn.innerText = "เล่นเลย";
      memBtn.disabled = false;
      memBtn.classList.remove("disabled-btn");
    }
    
    // Manage Sort Game Button (Level 8 Lock)
    const sortBtn = document.getElementById("playSortGameBtn");
    const sortCard = document.getElementById("gameItemSortCard");
    const descText = document.getElementById("sortGameDescText");
    if (state.level < 8) {
      if (sortBtn) {
        sortBtn.innerText = "ปลดล็อกเลเวล 8";
        sortBtn.disabled = true;
        sortBtn.classList.add("disabled-btn");
      }
      if (sortCard) sortCard.classList.add("locked-game");
      if (descText) descText.innerText = "จัดอารมณ์ให้ตรงกลุ่มเป้าหมาย ปลดล็อกเมื่อ Joy Blob เลเวล 8";
    } else {
      if (sortBtn) {
        sortBtn.innerText = "เล่นเลย";
        sortBtn.disabled = false;
        sortBtn.classList.remove("disabled-btn");
      }
      if (sortCard) sortCard.classList.remove("locked-game");
      if (descText) descText.innerText = "จัดอารมณ์ให้ตรงกลุ่มเป้าหมาย ปลดล็อกแล้วจ้า! 🎉";
    }
    
    // Manage Shooter Game Button (Level 15 Lock)
    const shooterBtn = document.getElementById("playShooterGameBtn");
    const shooterCard = document.getElementById("gameItemShooterCard");
    const shooterDesc = document.getElementById("shooterGameDescText");
    if (state.level < 15) {
      if (shooterBtn) {
        shooterBtn.innerText = "ปลดล็อกเลเวล 15";
        shooterBtn.disabled = true;
        shooterBtn.classList.add("disabled-btn");
      }
      if (shooterCard) shooterCard.classList.add("locked-game");
      if (shooterDesc) shooterDesc.innerText = "ยิงหน้าอารมณ์สีสันสดใส จับคู่ 3 ลูกเพื่อสลายความเครียด ปลดล็อกเมื่อ Joy Blob เลเวล 15";
    } else {
      if (shooterBtn) {
        shooterBtn.innerText = "เล่นเลย";
        shooterBtn.disabled = false;
        shooterBtn.classList.remove("disabled-btn");
      }
      if (shooterCard) shooterCard.classList.remove("locked-game");
      if (shooterDesc) shooterDesc.innerText = "ยิงหน้าอารมณ์สีสันสดใส จับคู่ 3 ลูกเพื่อสลายความเครียด ปลดล็อกแล้วจ้า! 🎯";
    }
  }
}


// ==========================================================================
// ROOM PLACEMENTS & BUTTON SPOTS
// ==========================================================================

function changeRoom(roomName) {
  if (state.isAngel) {
    roomName = "heaven";
  }
  state.activeRoom = roomName;
  stopContinuousAnimation();
  
  // Set background image in CSS
  const roomBg = document.getElementById("roomBg");
  roomBg.className = "room-background " + roomName;
  
  // Render room action buttons dynamically
  renderRoomActionSpots(roomName);
  
  // Apply saved position or default to carpet
  applyPetPosition(state.activePosition);
  
  // Update room selector active class inside modal
  document.querySelectorAll(".room-select-option").forEach(opt => {
    if (opt.getAttribute("data-room") === roomName) {
      opt.classList.add("active");
    } else {
      opt.classList.remove("active");
    }
  });

  // Auto trigger animation and bubble text based on room and activePosition
  let bubbleText = "สวัสดีค่ะ! วันนี้ทำอะไรสนุกๆ กันดีนะ! 😊";
  if (roomName === "bedroom") {
    if (state.activePosition === "pos-bed") {
      triggerPetAnimation("sleeping");
      bubbleText = "เตียงนอนปุยฝ้ายอุ่นสบาย... หลับปุ๋ยฝันหวานถึงทุ่งขนมหวานนะคะ 💤";
    } else {
      bubbleText = "นั่งบนพรมกลมนุ่มๆ อุ่นใจจังเลยค่ะ... ✨";
    }
  } else if (roomName === "dining") {
    if (state.activePosition === "pos-table") {
      triggerPetAnimation("eating");
      bubbleText = "นั่งเก้าอี้เรียบร้อย! มีขนมหวานหรือแซนวิชมาเสิร์ฟยังน้า? 🍰";
    } else {
      bubbleText = "ยืนรอพร้อมหาของกินอร่อยๆ อยู่ข้างโต๊ะจ้า 🍲";
    }
  } else if (roomName === "bathroom") {
    if (state.activePosition === "pos-bath") {
      triggerPetAnimation("bathing");
      bubbleText = "ฟองสบู่ฟูฟ่องอุ่นสบายตัว! ตัวหอมฉุยผ่อนคลายที่สุดเลย 🛁🫧";
    } else {
      bubbleText = "รอเตรียมฟองสบู่อาบน้ำให้ตัวหอมๆ ฟินๆ กันค่ะ";
    }
  } else if (roomName === "garden") {
    if (state.activePosition === "pos-bench") {
      triggerPetAnimation("happy");
      bubbleText = "นั่งม้านั่งดูหิ่งห้อยเรืองแสงยามค่ำคืน บรรยากาศสุดสงบนิ่ง 🌌✨";
    } else {
      bubbleText = "เดินเหยียบหญ้านุ่มสูดอากาศสวนพฤกษารองรับพลังบวก 🌳";
    }
  }
  setPetBubbleText(bubbleText);
  
  saveState();
}

function renderRoomActionSpots(roomName) {
  const container = document.getElementById("roomActionSpots");
  container.innerHTML = "";
  
  let spots = [];
  if (roomName === "bedroom") {
    spots = [
      { id: "pos-carpet", label: "🧹 นั่งพรม", bubble: "นั่งบนพรมกลมนุ่มๆ อุ่นใจจังเลยค่ะ... ✨" },
      { id: "pos-bed", label: "🛏️ นอนบนเตียง", bubble: "เตียงนอนปุยฝ้ายอุ่นสบาย... หลับปุ๋ยฝันหวานถึงทุ่งขนมหวานนะคะ 💤", anim: "sleeping" }
    ];
  } else if (roomName === "dining") {
    spots = [
      { id: "pos-carpet", label: "🧍 ยืนข้างโต๊ะ", bubble: "ยืนรอพร้อมหาของกินอร่อยๆ อยู่ข้างโต๊ะจ้า 🍲" },
      { id: "pos-table", label: "🪑 นั่งเก้าอี้อาหาร", bubble: "นั่งเก้าอี้เรียบร้อย! มีขนมหวานหรือแซนวิชมาเสิร์ฟยังน้า? 🍰", anim: "eating" }
    ];
  } else if (roomName === "bathroom") {
    spots = [
      { id: "pos-carpet", label: "🧼 ยืนข้างอ่าง", bubble: "รอเตรียมฟองสบู่อาบน้ำให้ตัวหอมๆ ฟินๆ กันค่ะ" },
      { id: "pos-bath", label: "🛁 ลงอ่างอาบน้ำ", bubble: "ฟองสบู่ฟูฟ่องอุ่นสบายตัว! ตัวหอมฉุยผ่อนคลายที่สุดเลย 🛁🫧", anim: "bathing" }
    ];
  } else if (roomName === "garden") {
    spots = [
      { id: "pos-carpet", label: "🌸 เดินบนสนามหญ้า", bubble: "เดินเหยียบหญ้านุ่มสูดอากาศสวนพฤกษารองรับพลังบวก 🌳" },
      { id: "pos-bench", label: "🪵 นั่งบนม้านั่ง", bubble: "นั่งม้านั่งดูหิ่งห้อยเรืองแสงยามค่ำคืน บรรยากาศสุดสงบนิ่ง 🌌✨", anim: "happy" }
    ];
  }
  
  spots.forEach(spot => {
    const btn = document.createElement("button");
    btn.className = `room-spot-btn ${state.activePosition === spot.id ? 'active' : ''}`;
    btn.innerText = spot.label;
    btn.onclick = () => {
      // Set active position
      state.activePosition = spot.id;
      applyPetPosition(spot.id);
      
      // Bubble text & animations
      setPetBubbleText(spot.bubble);
      if (spot.anim) {
        triggerPetAnimation(spot.anim);
      } else {
        stopContinuousAnimation();
      }
      
      // Check room spots quests
      if (spot.id === "pos-bench") {
        checkQuestCompletion("mq_hap3");
      } else if (spot.id === "pos-bath") {
        checkQuestCompletion("mq_bor2");
        checkQuestCompletion("mq_ang3");
      }

      // Update button highlights
      document.querySelectorAll(".room-spot-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      saveState();
    };
    container.appendChild(btn);
  });
}

const MEMORY_THEME_FOOD = [
  "🍔", "🍕", "🌭", "🥞", "🥪", "🌮", "🌯", "🍣", "🍇", "🍓",
  "🍒", "🍑", "🍍", "🥝", "🍉", "🍎", "🍊", "🍋", "🍌", "🥑",
  "🥕", "🥦", "🍗", "🍟", "🥟", "🍧", "🧁", "🍩", "🍪", "🎂"
];

const MEMORY_THEME_EMOTION = [
  "😄", "😆", "😊", "🥰", "😍", "🤩", "😘", "😜", "🤪", "😝",
  "😎", "🤓", "🧐", "😏", "😒", "😞", "😔", "😟", "😕", "🙁",
  "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵"
];

function startMemoryGame() {
  if (state.level < 1) {
    alert("มินิเกมจะปลดล็อกเมื่อตัวน้อยฟักออกจากไข่แล้ว (เลเวล 1) นะคะ 🥚");
    return;
  }
  
  document.getElementById("gameIntroSec").style.display = "none";
  document.getElementById("memoryGamePlaySec").style.display = "block";
  document.getElementById("gameWinOverlay").style.display = "none";
  
  matchedPairs = 0;
  flippedCards = [];
  gameSeconds = 0;
  isGameRunning = true;
  document.getElementById("gameTimerSec").innerText = "00";
  document.getElementById("gameMatchesCount").innerText = "0";
  
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    gameSeconds++;
    document.getElementById("gameTimerSec").innerText = gameSeconds < 10 ? "0" + gameSeconds : gameSeconds;
  }, 1000);

  // Determine grid size and pairs based on level (max 20 pairs = 40 cards)
  let numPairs = 6;
  let cols = 3;
  
  if (state.level <= 10) {
    numPairs = 6;
    cols = 3;
  } else if (state.level <= 25) {
    numPairs = 10;
    cols = 4;
  } else if (state.level <= 50) {
    numPairs = 15;
    cols = 5;
  } else {
    numPairs = 20;
    cols = 5;
  }
  
  targetPairs = numPairs;
  document.getElementById("gameMatchesTarget").innerText = targetPairs;
  
  // Random Theme
  const isFoodTheme = Math.random() < 0.5;
  const themeEmojis = isFoodTheme ? MEMORY_THEME_FOOD : MEMORY_THEME_EMOTION;
  const themeName = isFoodTheme ? "ของกิน 🍔" : "อารมณ์ 😆";
  
  // Select random subset of emojis of size numPairs
  let shuffledEmojis = [...themeEmojis].sort(() => Math.random() - 0.5);
  let selectedEmojis = shuffledEmojis.slice(0, numPairs);
  
  let cardsPool = [...selectedEmojis, ...selectedEmojis];
  cardsPool.sort(() => Math.random() - 0.5);
  
  const grid = document.getElementById("memoryGrid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
  // Adjust gap and card details dynamically
  let gapVal = "10px";
  let frontFontSize = "32px";
  let backFontSize = "24px";
  
  if (numPairs <= 8) {
    gapVal = "10px";
    frontFontSize = "32px";
    backFontSize = "24px";
  } else if (numPairs <= 15) {
    gapVal = "6px";
    frontFontSize = "24px";
    backFontSize = "18px";
  } else { // 20 pairs (40 cards)
    gapVal = "4px";
    frontFontSize = "20px";
    backFontSize = "14px";
  }
  
  grid.style.gap = gapVal;
  
  cardsPool.forEach((emoji, idx) => {
    const card = document.createElement("div");
    card.className = "card-item";
    card.setAttribute("data-id", idx);
    card.setAttribute("data-emoji", emoji);
    
    // Make cards slightly smaller if 40 cards to fit mobile screens
    if (numPairs >= 20) {
      card.style.minHeight = "45px";
    }
    
    card.innerHTML = `
      <div class="card-face card-back" style="font-size: ${backFontSize};">❓</div>
      <div class="card-face card-front" style="font-size: ${frontFontSize};">${emoji}</div>
    `;
    card.onclick = () => flipCard(card);
    grid.appendChild(card);
  });
  
  setPetBubbleText(`เกมจับคู่ ธีม${themeName}! เลเวล ${state.level} จะได้แผ่นป้ายทั้งหมด ${numPairs * 2} แผ่น ลุยเลยจ้า! 🎮🔍`);
}

function applyPetPosition(posId) {
  const wrapper = document.getElementById("petWrapper");
  if (!wrapper) return;
  
  // Clear existing positioning classes
  wrapper.classList.remove("pos-carpet", "pos-bed", "pos-table", "pos-bath", "pos-bench");
  
  // Add correct class
  // Make sure position matches room or default to carpet
  const room = state.activeRoom;
  if (room === "bedroom" && posId === "pos-bed") wrapper.classList.add("pos-bed");
  else if (room === "dining" && posId === "pos-table") wrapper.classList.add("pos-table");
  else if (room === "bathroom" && posId === "pos-bath") wrapper.classList.add("pos-bath");
  else if (room === "garden" && posId === "pos-bench") wrapper.classList.add("pos-bench");
  else wrapper.classList.add("pos-carpet");
}

function triggerPetAnimation(animName) {
  const wrapper = document.getElementById("petWrapper");
  if (!wrapper) return;
  
  wrapper.classList.remove("happy", "eating", "sleeping", "bathing");
  wrapper.classList.add(animName);

  document.getElementById("restStatusZzz").style.display = (animName === "sleeping") ? "block" : "none";
  document.getElementById("bathStatusBubbles").style.display = (animName === "bathing") ? "block" : "none";
  document.getElementById("eatStatusFood").style.display = (animName === "eating") ? "block" : "none";

  const normalEyes = document.getElementById("eyesGroup");
  const sleepingEyes = document.getElementById("sleepingEyesGroup");
  const mouth = document.getElementById("mouth");

  if (animName === "sleeping") {
    if (normalEyes) normalEyes.style.display = "none";
    if (sleepingEyes) sleepingEyes.style.display = "block";
    if (mouth) mouth.style.display = "none";
  } else {
    if (normalEyes) normalEyes.style.display = "block";
    if (sleepingEyes) sleepingEyes.style.display = "none";
    if (mouth) mouth.style.display = "block";
  }

  if (animName !== "sleeping" && animName !== "bathing" && animName !== "eating") {
    setTimeout(() => {
      wrapper.classList.remove(animName);
    }, 2000);
  }
}



function stopContinuousAnimation() {
  const wrapper = document.getElementById("petWrapper");
  if (wrapper) wrapper.classList.remove("happy", "eating", "sleeping", "bathing");
  
  document.getElementById("restStatusZzz").style.display = "none";
  document.getElementById("bathStatusBubbles").style.display = "none";
  document.getElementById("eatStatusFood").style.display = "none";

  const normalEyes = document.getElementById("eyesGroup");
  const sleepingEyes = document.getElementById("sleepingEyesGroup");
  const mouth = document.getElementById("mouth");

  if (normalEyes) normalEyes.style.display = "block";
  if (sleepingEyes) sleepingEyes.style.display = "none";
  if (mouth) mouth.style.display = "block";
}



function setPetBubbleText(text) {
  document.getElementById("petBubbleText").innerText = text;
}

// ==========================================================================
// STRESS TEST ASSESSMENT SYSTEM (Classical Reverted QA)
// ==========================================================================

function startTest() {
  testAnswers = Array(30).fill(null);
  currentQuestionIndex = 0;
  
  document.getElementById("testIntroSec").style.display = "none";
  document.getElementById("quizPlaySec").style.display = "block";
  document.getElementById("quizResultSec").style.display = "none";
  document.getElementById("testHistorySec").style.display = "none";
  
  showQuestion(0);
}

function showQuestion(index) {
  currentQuestionIndex = index;
  
  document.getElementById("quizProgressText").innerText = `ข้อที่ ${index + 1} / 30`;
  const pct = ((index + 1) / 30) * 100;
  document.getElementById("quizProgressFill").style.width = `${pct}%`;
  
  document.getElementById("currentQuestionText").innerText = STRESS_QUESTIONS[index];
  
  const savedAnswer = testAnswers[index];
  document.querySelectorAll(".quiz-options .option-row").forEach(btn => {
    btn.classList.remove("selected");
    const scoreVal = parseInt(btn.getAttribute("data-score"));
    if (savedAnswer !== null && savedAnswer === scoreVal) {
      btn.classList.add("selected");
    }
  });
  
  document.getElementById("prevQuestBtn").disabled = (index === 0);
  
  const nextBtn = document.getElementById("nextQuestBtn");
  if (index === 29) {
    nextBtn.innerText = "ส่งคำตอบ";
  } else {
    nextBtn.innerText = "ถัดไป";
  }
  nextBtn.style.display = (savedAnswer !== null) ? "block" : "none";
}

function handleOptionSelect(score) {
  testAnswers[currentQuestionIndex] = score;
  
  document.querySelectorAll(".quiz-options .option-row").forEach(btn => {
    btn.classList.remove("selected");
    if (parseInt(btn.getAttribute("data-score")) === score) {
      btn.classList.add("selected");
    }
  });
  
  document.getElementById("nextQuestBtn").style.display = "block";
  
  setTimeout(() => {
    proceedNext();
  }, 250);
}

function proceedNext() {
  if (testAnswers[currentQuestionIndex] === null) return;
  if (currentQuestionIndex < 29) {
    showQuestion(currentQuestionIndex + 1);
  } else {
    submitQuiz();
  }
}

function proceedPrev() {
  if (currentQuestionIndex > 0) {
    showQuestion(currentQuestionIndex - 1);
  }
}

function submitQuiz() {
  const totalScore = testAnswers.reduce((sum, val) => sum + (val || 0), 0);
  
  let rating = "เครียดน้อย";
  let feedback = "สภาวะความเครียดต่ำ ยินดีด้วยจ้า! สภาพจิตใจของคุณค่อนข้างแจ่มใสและแข็งแกร่งในเกณฑ์ที่ดี รักษาพลังบวกนี้ไว้นะคะ 🌸";
  let badgeColor = "#10b981";
  
  if (totalScore > 90) {
    rating = "เครียดรุนแรง";
    feedback = "⚠️ สภาวะความเครียดอยู่ในเกณฑ์รุนแรงวิกฤต! ร่างกายและจิตใจของคุณกำลังแบกรับปัญหาหนักเกินกำลังถอยห่างจากงาน ปรึกษาคนรอบข้างและผู้เชี่ยวชาญเพื่อดูแลรักษาใจด่วนนะคะ";
    badgeColor = "#ef4444";
  } else if (totalScore > 60) {
    rating = "เครียดมาก";
    feedback = "สภาวะความเครียดสะสมอยู่ในเกณฑ์ระดับสูง! จิตใจคุณกำลังทำงานอย่างเหน็ดเหนื่อย หาเวลาพักผ่อน นอนหลับ หรือฟังสรรพเสียงธรรมชาติบำบัดสักกึ่งชั่วโมงนะคะ";
    badgeColor = "#f97316";
  } else if (totalScore > 30) {
    rating = "เครียดปานกลาง";
    feedback = "สภาวะความเครียดสะสมระดับปานกลาง มีเรื่องคิดกังวลเกิดขึ้นบ่อยเป็นระยะ คอยพักเบรก จิบน้ำเปล่าอุ่นๆ หรือคุยคุยกับบอท Joy AI เพื่อผ่อนคลายจิตใจบ่อยๆ จ้า";
    badgeColor = "#eab308";
  }
  
  const newRecord = {
    date: new Date().toLocaleDateString("th-TH", { day: 'numeric', month: 'short', year: '2-digit' }),
    score: totalScore,
    rating: rating
  };
  state.stressHistory.unshift(newRecord);
  
  // Reward: Only once per day, but you can do it as many times as you like
  const todayString = new Date().toDateString();
  const alreadyRewardedToday = (state.lastQuizRewardDate === todayString);
  
  if (!alreadyRewardedToday) {
    modifyCoins(150);
    modifyGems(5);
    gainExp(50);
    state.lastQuizRewardDate = todayString;
  }

  
  const badgeEl = document.getElementById("stressBadge");
  badgeEl.innerText = rating;
  badgeEl.style.backgroundColor = badgeColor + "22";
  badgeEl.style.borderColor = badgeColor;
  badgeEl.style.color = badgeColor;
  
  document.getElementById("stressScoreVal").innerText = totalScore;
  document.getElementById("stressFeedbackText").innerText = feedback;
  
  document.getElementById("quizPlaySec").style.display = "none";
  document.getElementById("quizResultSec").style.display = "block";
  
  triggerPetAnimation("happy");
  if (!alreadyRewardedToday) {
    setPetBubbleText(`ทำแบบประเมินความเครียดเสร็จแล้ว ได้รับเหรียญและ EXP รางวัลเรียบร้อยค่ะ! 🪙💎`);
  } else {
    setPetBubbleText(`ทำแบบประเมินเสร็จแล้ว! (วันนี้คุณได้รับเหรียญรางวัลครบแล้ว รอบนี้จึงได้รับบันทึกคะแนนเพื่อติดตามระดับความเครียดแทนจ้า) 🌟`);
  }

  
  saveState();
}

function renderTestHistory() {
  const container = document.getElementById("testHistoryList");
  container.innerHTML = "";
  
  if (state.stressHistory.length === 0) {
    container.innerHTML = `<div class="empty-state">ยังไม่มีประวัติการประเมิน</div>`;
    return;
  }
  
  state.stressHistory.slice(0, 5).forEach(record => {
    let c = "#10b981";
    if (record.score > 90) c = "#ef4444";
    else if (record.score > 60) c = "#f97316";
    else if (record.score > 30) c = "#eab308";
    
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <div class="hist-date">📅 ${record.date}</div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="hist-lvl-badge" style="background:${c}15; border:1px solid ${c}; color:${c}">${record.rating}</span>
        <span class="hist-score">${record.score} คะแนน</span>
      </div>
    `;
    container.appendChild(div);
  });
}

// ==========================================================================
// DIARY MOOD TRACKER & CALENDAR
// ==========================================================================

function setupDiaryCalendar() {
  const container = document.getElementById("calendarRow");
  container.innerHTML = "";
  
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + distanceToMonday);
  
  const dayNamesThai = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
  
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(monday);
    dayDate.setDate(monday.getDate() + i);
    
    const dayNum = dayDate.getDate();
    const isToday = dayDate.toDateString() === today.toDateString();
    const isActive = dayDate.toDateString() === activeDiaryDate.toDateString();
    
    const dayCol = document.createElement("div");
    dayCol.className = `calendar-day-col ${isActive ? 'active' : ''}`;
    dayCol.onclick = () => {
      activeDiaryDate = dayDate;
      document.getElementById("diaryCurrentDate").innerText = dayDate.toLocaleDateString("th-TH", { day: 'numeric', month: 'long', year: 'numeric' });
      setupDiaryCalendar();
      loadDiaryForSelectedDate();
    };
    
    dayCol.innerHTML = `
      <div class="cal-day-lbl">${dayNamesThai[i]}</div>
      <div class="cal-date-lbl" style="${isToday ? 'color: var(--primary); text-decoration: underline;' : ''}">${dayNum}</div>
    `;
    container.appendChild(dayCol);
  }
}

function selectMoodEmoji(btn, mood) {
  selectedMood = mood;
  document.querySelectorAll(".mood-emoji-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

function saveDiaryEntry() {
  const textVal = document.getElementById("diaryTextInput").value.trim();
  if (!selectedMood) {
    alert("กรุณาเลือกอารมณ์ของคุณวันนี้ก่อนนะคะ 😄😢");
    return;
  }
  
  const dateStr = activeDiaryDate.toDateString();
  const dateStrThai = activeDiaryDate.toLocaleDateString("th-TH", { day: 'numeric', month: 'short', year: 'numeric' });
  
  const moodBtn = document.querySelector(`.mood-emoji-btn[data-mood="${selectedMood}"]`);
  const emojiStr = moodBtn ? moodBtn.querySelector(".emoji-face").innerText : "📝";
  const moodThai = moodBtn ? moodBtn.getAttribute("data-thai") : selectedMood;
  
  state.diaryLogs = state.diaryLogs.filter(log => log.dateString !== dateStr);
  state.diaryLogs.unshift({
    dateString: dateStr,
    dateThai: dateStrThai,
    mood: selectedMood,
    moodThai: moodThai,
    emoji: emojiStr,
    text: textVal || "(ไม่มีบันทึกข้อความ)"
  });
  
  // Award on diary save: +30 Coins, +15 EXP
  modifyCoins(30);
  gainExp(15);
  
  triggerPetAnimation("happy");
  setPetBubbleText(`จดบันทึกไดอารี่สำเร็จ! ปลดล็อกเควสบำบัดอารมณ์ในหน้าเควสแล้วนะคะ 🪙 +30 Coins ได้รับเรียบร้อย!`);
  
  document.getElementById("diaryTextInput").value = "";
  document.querySelectorAll(".mood-emoji-btn").forEach(b => b.classList.remove("selected"));
  selectedMood = "";
  
  saveState();
  renderDiaryLogs();
  
  // Immediately regenerate quests based on this new mood!
  checkAndGenerateMoodQuests();
}

function loadDiaryForSelectedDate() {
  const dateStr = activeDiaryDate.toDateString();
  const savedEntry = state.diaryLogs.find(log => log.dateString === dateStr);
  const textInput = document.getElementById("diaryTextInput");
  
  if (savedEntry) {
    textInput.value = savedEntry.text === "(ไม่มีบันทึกข้อความ)" ? "" : savedEntry.text;
    selectedMood = savedEntry.mood;
    
    document.querySelectorAll(".mood-emoji-btn").forEach(btn => {
      btn.classList.remove("selected");
      if (btn.getAttribute("data-mood") === savedEntry.mood) {
        btn.classList.add("selected");
      }
    });
  } else {
    textInput.value = "";
    selectedMood = "";
    document.querySelectorAll(".mood-emoji-btn").forEach(btn => btn.classList.remove("selected"));
  }
}

function renderDiaryLogs() {
  const container = document.getElementById("diaryHistoryList");
  container.innerHTML = "";
  
  if (state.diaryLogs.length === 0) {
    container.innerHTML = `<div class="empty-state">ยังไม่มีประวัติการบันทึกอารมณ์</div>`;
    return;
  }
  
  state.diaryLogs.forEach(log => {
    const card = document.createElement("div");
    card.className = "diary-history-card";
    card.innerHTML = `
      <div class="dh-header">
        <span class="dh-date">📅 ${log.dateThai}</span>
        <span class="dh-mood-pill">${log.emoji} ${log.moodThai}</span>
      </div>
      <div class="dh-text">${log.text}</div>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// DYNAMIC MOOD-BASED QUEST SYSTEM
// ==========================================================================

function getMappedMoodKey(mood) {
  if (mood === "Anxious") return "Stressed";
  if (mood === "Upset" || mood === "Sad") return "Sad";
  if (mood === "Frustrated" || mood === "Angry") return "Angry";
  if (mood === "Lonely") return "Lonely";
  if (mood === "Bored") return "Bored";
  if (mood === "Happy") return "Happy";
  if (mood === "Calm" || mood === "Relax") return "Calm";
  if (mood === "Tired") return "Tired";
  return "Happy";
}

function checkAndGenerateMoodQuests() {
  const todayStr = new Date().toDateString();
  const todayEntry = state.diaryLogs.find(log => log.dateString === todayStr);
  
  const subtitleEl = document.getElementById("questSubtextText");
  
  if (!todayEntry) {
    // No mood logged today yet
    state.activeMoodQuests = [];
    state.moodQuestProgress = {};
    subtitleEl.innerText = "บันทึกอารมณ์ของคุณวันนี้ในหน้า 'ไดอารี่' ก่อน เพื่อสุ่มเควสบำบัดใจประจำวันนะคะ!";
    return;
  }
  
  // Mood exists! If active quests are empty, generate them once
  if (state.activeMoodQuests.length === 0) {
    const rawMood = todayEntry.mood;
    const moodKey = getMappedMoodKey(rawMood);
    const questsPool = MOOD_QUESTS[moodKey] || MOOD_QUESTS["Happy"];
    
    state.activeMoodQuests = [...questsPool];
    state.moodQuestProgress = {};
    state.activeMoodQuests.forEach(q => {
      state.moodQuestProgress[q.id] = false;
    });
    state.grandQuestClaimed = false;
    saveState();
  }
  
  subtitleEl.innerText = `แนะนำกิจกรรมบำบัดจิตใจ สำหรับผู้ที่มีความรู้สึก [ ${todayEntry.emoji} ${todayEntry.moodThai} ] วันนี้:`;
}

function renderQuests() {
  const container = document.getElementById("questContainer");
  const countBadge = document.getElementById("questCountBadge");
  container.innerHTML = "";
  
  if (state.activeMoodQuests.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 30px 10px;">
        กรุณาบันทึกอารมณ์ในหน้า "ไดอารี่" ก่อน เพื่อเปิดระบบเควสบำบัดใจประจำวันนะคะ 📔
      </div>
    `;
    countBadge.innerText = "เควสบำบัดใจ (0/0)";
    document.getElementById("claimGrandBtn").disabled = true;
    document.getElementById("claimGrandBtn").innerText = "รับรางวัล";
    return;
  }
  
  let completedCount = 0;
  
  state.activeMoodQuests.forEach(quest => {
    const isCompleted = state.moodQuestProgress[quest.id] === true;
    if (isCompleted) completedCount++;
    
    const card = document.createElement("div");
    card.className = `quest-item-card ${isCompleted ? 'completed' : ''}`;
    card.innerHTML = `
      <div class="quest-info">
        <span class="quest-emoji">${quest.emoji}</span>
        <div class="q-details">
          <div class="q-name">${quest.name}</div>
          <div class="q-rewards">🪙 +${quest.coins} Coins &nbsp; ⭐ +${quest.exp} EXP</div>
        </div>
      </div>
      <button class="quest-action-btn" id="btn-${quest.id}" ${isCompleted ? 'disabled' : ''}>
        ${isCompleted ? 'สำเร็จแล้ว ✅' : 'ทำเควส'}
      </button>
    `;
    
    // Bind click dynamically
    if (!isCompleted) {
      setTimeout(() => {
        const btn = document.getElementById(`btn-${quest.id}`);
        if (btn) {
          btn.onclick = () => doMoodQuest(quest);
        }
      }, 0);
    }
    
    container.appendChild(card);
  });
  
  countBadge.innerText = `เควสบำบัดใจ (${completedCount}/5)`;
  
  // Grand claim rewards
  const claimGrandBtn = document.getElementById("claimGrandBtn");
  if (completedCount === 5 && !state.grandQuestClaimed) {
    claimGrandBtn.disabled = false;
    claimGrandBtn.innerText = "รับรางวัลใหญ่ 💎";
  } else if (state.grandQuestClaimed) {
    claimGrandBtn.disabled = true;
    claimGrandBtn.innerText = "รับแล้ว ✅";
  } else {
    claimGrandBtn.disabled = true;
    claimGrandBtn.innerText = "รับรางวัล";
  }
}

function doMoodQuest(quest) {
  if (state.moodQuestProgress[quest.id] === true) return;
  
  state.moodQuestProgress[quest.id] = true;
  modifyCoins(quest.coins);
  gainExp(quest.exp);
  
  // Custom alerts or actions based on quests
  triggerPetAnimation("happy");
  setPetBubbleText(`เควส [${quest.name}] สำเร็จแล้วจ้า! ได้รับ 🪙 +${quest.coins} Coins & EXP เรียบร้อยน้า 🧡`);
  
  saveState();
  renderQuests();
}

function claimGrandReward() {
  if (state.grandQuestClaimed) return;
  
  state.grandQuestClaimed = true;
  modifyGems(10);
  gainExp(30);
  
  triggerPetAnimation("happy");
  setPetBubbleText("ยินดีด้วยค่ะคนเก่ง! บำบัดอารมณ์ครบ 5 เควสประจำวันแล้ว รับเพชร 💎 10 Gems เป็นรางวัลดูแลตัวเองนะค๊า 🎉");
  
  saveState();
  renderQuests();
}

// ==========================================================================
// CARD MATCHING MINI GAME
// ==========================================================================

// ==========================================================================
// CARD MATCHING MINI GAME
// ==========================================================================

const ALL_GAME_EMOJIS = [
  "🍕", "🍔", "🍿", "🍩", "🥤", "🍦", 
  "🍰", "🍭", "🍪", "🍫", "🥨", "🥞", 
  "🥪", "🌮", "🌯", "🍣", "🍇", "🍓",
  "🍒", "🍑", "🍍", "🥝", "🍉", "🍎",
  "🍊", "🍋", "🍌", "🍐", "🥑", "🥕",
  "🥦", "🍗", "🍟", "🥟", "🍧", "🧁"
];

function startMemoryGame() {
  if (state.level < 1) {
    alert("มินิเกมจะปลดล็อกเมื่อตัวน้อยฟักออกจากไข่แล้ว (เลเวล 1) นะคะ 🥚");
    return;
  }
  
  document.getElementById("gameIntroSec").style.display = "none";
  document.getElementById("memoryGamePlaySec").style.display = "block";
  document.getElementById("gameWinOverlay").style.display = "none";
  
  matchedPairs = 0;
  flippedCards = [];
  gameSeconds = 0;
  isGameRunning = true;
  document.getElementById("gameTimerSec").innerText = "00";
  document.getElementById("gameMatchesCount").innerText = "0";
  
  clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    gameSeconds++;
    document.getElementById("gameTimerSec").innerText = gameSeconds < 10 ? "0" + gameSeconds : gameSeconds;
  }, 1000);

  // Determine grid size and pairs based on level (max 10 pairs)
  let numPairs = 6;
  let cols = 3;
  
  if (state.level <= 5) {
    numPairs = 4;
    cols = 4;
  } else if (state.level <= 15) {
    numPairs = 6;
    cols = 3;
  } else if (state.level <= 30) {
    numPairs = 8;
    cols = 4;
  } else {
    numPairs = 10;
    cols = 4;
  }
  
  targetPairs = numPairs;
  document.getElementById("gameMatchesTarget").innerText = targetPairs;
  
  // Select random subset of emojis of size numPairs
  let shuffledEmojis = [...ALL_GAME_EMOJIS].sort(() => Math.random() - 0.5);
  let selectedEmojis = shuffledEmojis.slice(0, numPairs);
  
  let cardsPool = [...selectedEmojis, ...selectedEmojis];
  cardsPool.sort(() => Math.random() - 0.5);
  
  const grid = document.getElementById("memoryGrid");
  grid.innerHTML = "";
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  
  // Adjust gap and card details dynamically
  let gapVal = "10px";
  let frontFontSize = "32px";
  let backFontSize = "24px";
  
  if (numPairs <= 8) {
    gapVal = "10px";
    frontFontSize = "32px";
    backFontSize = "24px";
  } else {
    gapVal = "6px";
    frontFontSize = "24px";
    backFontSize = "18px";
  }
  
  grid.style.gap = gapVal;
  
  cardsPool.forEach((emoji, idx) => {
    const card = document.createElement("div");
    card.className = "card-item";
    card.setAttribute("data-id", idx);
    card.setAttribute("data-emoji", emoji);
    
    card.innerHTML = `
      <div class="card-face card-back" style="font-size: ${backFontSize};">❓</div>
      <div class="card-face card-front" style="font-size: ${frontFontSize};">${emoji}</div>
    `;
    card.onclick = () => flipCard(card);
    grid.appendChild(card);
  });
  
  setPetBubbleText(`มินิเกมเริ่มแล้ว! เลเวลของคุณคือ ${state.level} ได้รับแผ่นป้ายทั้งหมด ${numPairs * 2} แผ่น ลุยเลยจ้า! 🎮🔍`);
}

function flipCard(card) {
  if (!isGameRunning) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;
  if (flippedCards.length >= 2) return;
  
  card.classList.add("flipped");
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  const emoji1 = card1.getAttribute("data-emoji");
  const emoji2 = card2.getAttribute("data-emoji");
  
  if (emoji1 === emoji2) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
    matchedPairs++;
    document.getElementById("gameMatchesCount").innerText = matchedPairs;
    triggerPetAnimation("happy");
    
    if (matchedPairs === targetPairs) {
      winMemoryGame();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}




function winMemoryGame() {
  isGameRunning = false;
  clearInterval(gameTimer);
  
  const winOverlay = document.getElementById("gameWinOverlay");
  winOverlay.style.display = "flex";
  
  // Unlimited coins reward: +50 Coins
  modifyCoins(50);
  
  // Calculate remaining EXP from minigames daily cap (max 30)
  const remainingExp = Math.max(0, 30 - state.dailyGameExpEarned);
  let expToGive = 0;
  let expTxt = "+0 EXP (วันนี้ครบ 30 แล้ว)";
  
  if (remainingExp > 0) {
    expToGive = Math.min(20, remainingExp);
    state.dailyGameExpEarned += expToGive;
    gainExp(expToGive);
    expTxt = `+${expToGive} EXP`;
  }
  
  // Render visual reward details inside overlay
  const rewardsEl = winOverlay.querySelector(".win-rewards");
  if (rewardsEl) {
    rewardsEl.innerHTML = `
      <span>🪙 +50 Coins</span>
      <span>⭐ ${expTxt}</span>
    `;
  }
  
  setPetBubbleText(`สุดยอดไปเลย! จับคู่ครบทั้งหมดเรียบร้อย ได้รับรางวัล 🪙 +50 Coins และ ${expTxt} แล้วจ้า! 🏆`);
  
  // Complete card game quests
  checkQuestCompletion("mq_lon2");
  checkQuestCompletion("mq_bor1");

  saveState();
}
 
function closeGamePlay() {
  clearInterval(gameTimer);
  isGameRunning = false;
  document.getElementById("gameIntroSec").style.display = "flex";
  document.getElementById("memoryGamePlaySec").style.display = "none";
}

// ==========================================================================
// SORT GAME ("เรียงอารมณ์") SYSTEM
// ==========================================================================

const SORT_EMOJIS = {
  Angry: ["😡", "😤", "🤬"],
  Sad: ["😢", "😭", "😞"],
  Happy: ["😁", "😆", "😊"],
  Calm: ["😌", "🧘", "🍃"],
  Scared: ["😱", "😨", "😰"],
  Surprised: ["🤯", "😲", "😮"]
};

function startSortGame() {
  if (state.level < 8) {
    alert("มินิเกมเรียงอารมณ์จะปลดล็อกเมื่อเลเวล 8 นะคะ 🧪");
    return;
  }
  
  document.getElementById("gameIntroSec").style.display = "none";
  document.getElementById("sortGamePlaySec").style.display = "block";
  document.getElementById("sortGameWinOverlay").style.display = "none";
  
  sortGameScore = 0;
  sortGameSeconds = 15;
  isSortGameRunning = true;
  
  document.getElementById("sortGameScoreCount").innerText = "0";
  document.getElementById("sortGameTimerSec").innerText = "15";
  
  clearInterval(sortGameTimer);
  sortGameTimer = setInterval(() => {
    sortGameSeconds--;
    document.getElementById("sortGameTimerSec").innerText = sortGameSeconds;
    if (sortGameSeconds <= 0) {
      loseSortGame();
    }
  }, 1000);
  
  nextSortItem();
  setPetBubbleText("เรียงอารมณ์บับเบิ้ล! จับคู่ภาพหน้าไอคอนอารมณ์ให้ถูกกลุ่มนะจ๊ะ! 🎮");
}

function nextSortItem() {
  const categories = ["Angry", "Sad", "Happy", "Calm", "Scared", "Surprised"];
  const randomCat = categories[Math.floor(Math.random() * categories.length)];
  const emojis = SORT_EMOJIS[randomCat];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  currentSortEmoji = randomEmoji;
  currentSortCategory = randomCat;
  
  const bubbleEl = document.getElementById("sortCurrentBubble");
  bubbleEl.innerText = randomEmoji;
  bubbleEl.style.background = "";
  bubbleEl.style.boxShadow = "";
  bubbleEl.style.border = "";
}

function checkSortChoice(categoryChoice) {
  if (!isSortGameRunning) return;
  
  if (categoryChoice === currentSortCategory) {
    sortGameScore++;
    document.getElementById("sortGameScoreCount").innerText = sortGameScore;
    triggerPetAnimation("happy");
    
    if (sortGameScore >= 10) {
      winSortGame();
      return;
    }
  } else {
    // Deduct 1 second as penalty for wrong guess
    sortGameSeconds = Math.max(0, sortGameSeconds - 1);
    document.getElementById("sortGameTimerSec").innerText = sortGameSeconds;
    if (sortGameSeconds <= 0) {
      loseSortGame();
      return;
    }
  }
  
  nextSortItem();
}

function winSortGame() {
  isSortGameRunning = false;
  clearInterval(sortGameTimer);
  
  const winOverlay = document.getElementById("sortGameWinOverlay");
  winOverlay.style.display = "flex";
  
  document.getElementById("sortGameWinEmoji").innerText = "🏆";
  document.getElementById("sortGameWinTitle").innerText = "ชนะแล้ว!";
  
  modifyCoins(60);
  
  // Calculate remaining EXP from minigames daily cap (max 30)
  const remainingExp = Math.max(0, 30 - state.dailyGameExpEarned);
  let expToGive = 0;
  let expTxt = "+0 EXP (วันนี้ครบ 30 แล้ว)";
  
  if (remainingExp > 0) {
    expToGive = Math.min(25, remainingExp);
    state.dailyGameExpEarned += expToGive;
    gainExp(expToGive);
    expTxt = `+${expToGive} EXP`;
  }
  
  // Render visual reward details inside overlay
  const rewardsEl = winOverlay.querySelector(".win-rewards");
  if (rewardsEl) {
    rewardsEl.innerHTML = `
      <span>🪙 +60 Coins</span>
      <span>⭐ ${expTxt}</span>
    `;
  }
  
  document.getElementById("sortGameWinDesc").innerText = `คุณเรียงอารมณ์ถูกต้องครบ 10 ข้อ! ${expTxt} 🎉`;
  
  setPetBubbleText(`ว้าว! เก่งมากๆ เลยจ้า คัดแยกอารมณ์ถูกต้องครบทั้งหมดแล้ว รับรางวัล 🪙 +60 Coins & ${expTxt} เรียบร้อยจ้า! 🍬`);
  
  checkQuestCompletion("mq_lon2");
  checkQuestCompletion("mq_bor1");
  
  saveState();
}
 
function loseSortGame() {
  isSortGameRunning = false;
  clearInterval(sortGameTimer);
  
  const winOverlay = document.getElementById("sortGameWinOverlay");
  winOverlay.style.display = "flex";
  
  document.getElementById("sortGameWinEmoji").innerText = "⏰";
  document.getElementById("sortGameWinTitle").innerText = "หมดเวลา!";
  document.getElementById("sortGameWinDesc").innerText = `คุณทำคะแนนได้ ${sortGameScore} / 10 ข้อ พยายามใหม่นะคะ!`;
  
  setPetBubbleText("หมดเวลาเสียแล้ว... ไม่เป็นไรน้า พยายามใหม่รอบหน้าหรือคุยกับ AI เพื่อผ่อนคลายความตึงเครียดได้จ้า 💙");
}

function closeSortGame() {
  clearInterval(sortGameTimer);
  isSortGameRunning = false;
  document.getElementById("gameIntroSec").style.display = "flex";
  document.getElementById("sortGamePlaySec").style.display = "none";
}

// ==========================================================================
// BUBBLE SHOOTER GAME SYSTEM
// ==========================================================================

// ==========================================================================
// BUBBLE SHOOTER GAME SYSTEM
// ==========================================================================

const BUBBLE_TYPES = [
  { color: "#ef4444", emoji: "😡", name: "โกรธ" },      // Red
  { color: "#f97316", emoji: "🥺", name: "ว้าวุ่น" },    // Orange
  { color: "#3b82f6", emoji: "😢", name: "เศร้า" },      // Blue
  { color: "#eab308", emoji: "😊", name: "มีความสุข" },  // Yellow
  { color: "#10b981", emoji: "🤢", name: "ขยะแขยง" },  // Green
  { color: "#a855f7", emoji: "😤", name: "หงุดหงิด" }   // Purple
];

let isShooterGameRunning = false;
let shooterTimer = null;
let shooterSeconds = 0;
let shooterScore = 0;
let shooterGrid = []; // 2D array [row][col] storing bubble type index, or null
let shooterBall = null; // Current active ball: { x, y, vx, vy, typeIdx, isFired }
let nextShooterBall = null; // Next ball preview: typeIdx
let shooterCanvas = null;
let shooterCtx = null;
let shooterAngle = -Math.PI / 2;
let shooterColumns = 10;
let shooterRows = 12;
let bubbleRad = 15;
let shooterAnimFrame = null;

function startShooterGame() {
  if (state.level < 15) {
    alert("มินิเกมยิงอารมณ์บับเบิ้ลจะปลดล็อกเมื่อเลเวล 15 นะคะ 🎯");
    return;
  }
  
  document.getElementById("gameIntroSec").style.display = "none";
  const sgp2 = document.getElementById("shooterGamePlaySec"); if(sgp2) sgp2.style.display = "block";
  const wo = document.getElementById("shooterGameWinOverlay"); if(wo) wo.style.display = "none";
  
  shooterScore = 0;
  shooterSeconds = 0;
  isShooterGameRunning = true;
  
  document.getElementById("shooterGameScoreCount").innerText = "0";
  document.getElementById("shooterGameTimerSec").innerText = "0";
  
  shooterCanvas = document.getElementById("shooterCanvas");
  shooterCtx = shooterCanvas.getContext("2d");
  
  // Initialize grid: Rows 0-3 populated, others null
  shooterGrid = [];
  for (let r = 0; r < shooterRows; r++) {
    shooterGrid[r] = [];
    for (let c = 0; c < shooterColumns; c++) {
      if (r < 4) {
        if (r % 2 === 1 && c === shooterColumns - 1) {
          shooterGrid[r][c] = null;
        } else {
          shooterGrid[r][c] = Math.floor(Math.random() * BUBBLE_TYPES.length);
        }
      } else {
        shooterGrid[r][c] = null;
      }
    }
  }
  
  // Set up launcher balls
  nextShooterBall = Math.floor(Math.random() * BUBBLE_TYPES.length);
  loadNextShooterBall();
  
  // Start timer (stopwatch count up)
  clearInterval(shooterTimer);
  shooterTimer = setInterval(() => {
    shooterSeconds++;
    document.getElementById("shooterGameTimerSec").innerText = shooterSeconds;
  }, 1000);
  
  // Setup canvas mouse/touch event listeners
  shooterCanvas.onmousemove = handleShooterMouseMove;
  shooterCanvas.onclick = handleShooterClick;
  
  shooterCanvas.ontouchmove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = shooterCanvas.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;
    shooterAngle = Math.atan2(mouseY - 320, mouseX - 150);
  };
  shooterCanvas.ontouchend = (e) => {
    e.preventDefault();
    fireShooterBall();
  };
  
  // Start animation loop
  if (shooterAnimFrame) cancelAnimationFrame(shooterAnimFrame);
  runShooterLoop();
  
  setPetBubbleText("ยิงอารมณ์บับเบิ้ล! เล็งเป้าหมายแล้วจับคู่หน้าอารมณ์ให้ตรงกันอย่างน้อย 3 ลูก เพื่อทำคะแนนกันเลยค่ะ 🎯");
}

function loadNextShooterBall() {
  shooterBall = {
    x: 150,
    y: 320,
    vx: 0,
    vy: 0,
    typeIdx: nextShooterBall,
    isFired: false
  };
  nextShooterBall = Math.floor(Math.random() * BUBBLE_TYPES.length);
}

function handleShooterMouseMove(e) {
  const rect = shooterCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  shooterAngle = Math.atan2(mouseY - 320, mouseX - 150);
}

function handleShooterClick(e) {
  fireShooterBall();
}

function fireShooterBall() {
  if (!isShooterGameRunning || shooterBall.isFired) return;
  
  let angle = shooterAngle;
  if (angle > -0.1) angle = -0.1;
  if (angle < -Math.PI + 0.1) angle = -Math.PI + 0.1;
  
  const speed = 7;
  shooterBall.vx = Math.cos(angle) * speed;
  shooterBall.vy = Math.sin(angle) * speed;
  shooterBall.isFired = true;
  
  triggerPetAnimation("happy");
}

function runShooterLoop() {
  if (!isShooterGameRunning) return;
  
  updateShooterPhysics();
  drawShooterGame();
  
  shooterAnimFrame = requestAnimationFrame(runShooterLoop);
}

function updateShooterPhysics() {
  if (!shooterBall || !shooterBall.isFired) return;
  
  shooterBall.x += shooterBall.vx;
  shooterBall.y += shooterBall.vy;
  
  if (shooterBall.x - bubbleRad < 0) {
    shooterBall.x = bubbleRad;
    shooterBall.vx = -shooterBall.vx;
  } else if (shooterBall.x + bubbleRad > 300) {
    shooterBall.x = 300 - bubbleRad;
    shooterBall.vx = -shooterBall.vx;
  }
  
  if (shooterBall.y - bubbleRad < 0) {
    snapBallToGrid();
    return;
  }
  
  for (let r = 0; r < shooterRows; r++) {
    for (let c = 0; c < shooterColumns; c++) {
      if (shooterGrid[r][c] !== null) {
        const bubbleCoords = getBubbleCoords(r, c);
        const dist = Math.hypot(shooterBall.x - bubbleCoords.x, shooterBall.y - bubbleCoords.y);
        if (dist < bubbleRad * 2 - 2) {
          snapBallToGrid();
          return;
        }
      }
    }
  }
}

function getBubbleCoords(row, col) {
  const xShift = (row % 2 === 0) ? 0 : 15;
  return {
    x: col * 30 + 15 + xShift,
    y: row * 26 + 15
  };
}

function snapBallToGrid() {
  let bestRow = 0;
  let bestCol = 0;
  let minDist = Infinity;
  
  for (let r = 0; r < shooterRows; r++) {
    for (let c = 0; c < shooterColumns; c++) {
      if (r % 2 === 1 && c === shooterColumns - 1) continue;
      if (shooterGrid[r][c] === null) {
        const coords = getBubbleCoords(r, c);
        const dist = Math.hypot(shooterBall.x - coords.x, shooterBall.y - coords.y);
        if (dist < minDist) {
          minDist = dist;
          bestRow = r;
          bestCol = c;
        }
      }
    }
  }
  
  shooterGrid[bestRow][bestCol] = shooterBall.typeIdx;
  
  const matches = findConnectedMatches(bestRow, bestCol, shooterBall.typeIdx);
  if (matches.length >= 3) {
    matches.forEach(coord => {
      shooterGrid[coord.r][coord.c] = null;
    });
    
    shooterScore += matches.length * 10;
    document.getElementById("shooterGameScoreCount").innerText = shooterScore;
    
  }
  
  // Check if any bubble has reached or crossed the deadline (Y >= 280)
  for (let r = 0; r < shooterRows; r++) {
    for (let c = 0; c < shooterColumns; c++) {
      if (shooterGrid[r][c] !== null) {
        const coords = getBubbleCoords(r, c);
        if (coords.y >= 280) {
          loseShooterGame();
          return;
        }
      }
    }
  }
  
  loadNextShooterBall();
}

function findConnectedMatches(startRow, startCol, targetType) {
  const queue = [{ r: startRow, c: startCol }];
  const matches = [];
  const visited = new Set();
  
  const key = (r, c) => `${r},${c}`;
  visited.add(key(startRow, startCol));
  
  while (queue.length > 0) {
    const curr = queue.shift();
    matches.push(curr);
    
    const neighbors = getNeighbors(curr.r, curr.c);
    neighbors.forEach(n => {
      if (n.r >= 0 && n.r < shooterRows && n.c >= 0 && n.c < shooterColumns) {
        if (n.r % 2 === 1 && n.c === shooterColumns - 1) return;
        if (!visited.has(key(n.r, n.c)) && shooterGrid[n.r][n.c] === targetType) {
          visited.add(key(n.r, n.c));
          queue.push(n);
        }
      }
    });
  }
  
  return matches;
}

function getNeighbors(r, c) {
  const neighbors = [];
  neighbors.push({ r: r, c: c - 1 });
  neighbors.push({ r: r, c: c + 1 });
  
  if (r % 2 === 0) {
    neighbors.push({ r: r - 1, c: c - 1 });
    neighbors.push({ r: r - 1, c: c });
    neighbors.push({ r: r + 1, c: c - 1 });
    neighbors.push({ r: r + 1, c: c });
  } else {
    neighbors.push({ r: r - 1, c: c });
    neighbors.push({ r: r - 1, c: c + 1 });
    neighbors.push({ r: r + 1, c: c });
    neighbors.push({ r: r + 1, c: c + 1 });
  }
  
  return neighbors;
}

function drawShooterGame() {
  if (!shooterCtx) return;
  
  shooterCtx.clearRect(0, 0, 300, 350);
  
  // Draw deadline line (red dashed line)
  shooterCtx.beginPath();
  shooterCtx.setLineDash([4, 4]);
  shooterCtx.moveTo(0, 280);
  shooterCtx.lineTo(300, 280);
  shooterCtx.strokeStyle = "#ef4444";
  shooterCtx.lineWidth = 2;
  shooterCtx.stroke();
  shooterCtx.setLineDash([]);
  
  // Deadline label text
  shooterCtx.font = "bold 8px sans-serif";
  shooterCtx.fillStyle = "#ef4444";
  shooterCtx.textAlign = "right";
  shooterCtx.fillText("DEADLINE ⚠️", 290, 274);
  
  // Draw grid bubbles
  for (let r = 0; r < shooterRows; r++) {
    for (let c = 0; c < shooterColumns; c++) {
      if (shooterGrid[r][c] !== null) {
        const coords = getBubbleCoords(r, c);
        const type = BUBBLE_TYPES[shooterGrid[r][c]];
        drawBubble(coords.x, coords.y, type);
      }
    }
  }
  
  if (shooterBall && !shooterBall.isFired) {
    let angle = shooterAngle;
    if (angle > -0.1) angle = -0.1;
    if (angle < -Math.PI + 0.1) angle = -Math.PI + 0.1;
    
    shooterCtx.beginPath();
    shooterCtx.setLineDash([4, 6]);
    shooterCtx.moveTo(150, 320);
    shooterCtx.lineTo(150 + Math.cos(angle) * 100, 320 + Math.sin(angle) * 100);
    shooterCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    shooterCtx.lineWidth = 2;
    shooterCtx.stroke();
    shooterCtx.setLineDash([]);
  }
  
  if (nextShooterBall !== null) {
    const type = BUBBLE_TYPES[nextShooterBall];
    shooterCtx.font = "12px sans-serif";
    shooterCtx.fillStyle = "rgba(255, 255, 255, 0.6)";
    shooterCtx.textAlign = "left";
    shooterCtx.fillText("ถัดไป:", 75, 325);
    drawBubble(110, 320, type);
  }
  
  if (shooterBall) {
    const type = BUBBLE_TYPES[shooterBall.typeIdx];
    drawBubble(shooterBall.x, shooterBall.y, type);
  }
  
  shooterCtx.beginPath();
  shooterCtx.arc(150, 345, 25, Math.PI, 0);
  shooterCtx.fillStyle = "rgba(255, 255, 255, 0.1)";
  shooterCtx.fill();
}

function drawBubble(x, y, type) {
  // Draw solid colored background circle
  shooterCtx.beginPath();
  shooterCtx.arc(x, y, bubbleRad, 0, Math.PI * 2);
  shooterCtx.fillStyle = type.color;
  shooterCtx.fill();
  
  // Draw white light highlight
  shooterCtx.beginPath();
  shooterCtx.arc(x - 4, y - 4, 3, 0, Math.PI * 2);
  shooterCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
  shooterCtx.fill();
  
  // Draw Emoji face inside - filling the circle fully!
  shooterCtx.font = "26px sans-serif";
  shooterCtx.textAlign = "center";
  shooterCtx.textBaseline = "middle";
  shooterCtx.fillText(type.emoji, x, y + 1);
}

function loseShooterGame() {
  isShooterGameRunning = false;
  clearInterval(shooterTimer);
  if (shooterAnimFrame) cancelAnimationFrame(shooterAnimFrame);
  
  const winOverlay = document.getElementById("shooterGameWinOverlay");
  winOverlay.style.display = "flex";
  
  document.getElementById("shooterGameWinEmoji").innerText = "🎯";
  document.getElementById("shooterGameWinTitle").innerText = "เกมสิ้นสุดลงแล้ว!";
  
  // Calculate reward:
  // Coins are equal to the score achieved divided by 5
  const coinsToGive = Math.floor(shooterScore / 5);
  modifyCoins(coinsToGive);
  
  // EXP: 5 EXP per 10 points (capped at daily games EXP cap of 30)
  const remainingExp = Math.max(0, 30 - state.dailyGameExpEarned);
  let expToGive = 0;
  let expTxt = "+0 EXP (วันนี้ครบ 30 แล้ว)";
  
  if (remainingExp > 0) {
    expToGive = Math.min(remainingExp, Math.floor(shooterScore / 10) * 5);
    state.dailyGameExpEarned += expToGive;
    gainExp(expToGive);
    expTxt = `+${expToGive} EXP`;
  }
  
  const rewardsEl = winOverlay.querySelector(".win-rewards");
  if (rewardsEl) {
    rewardsEl.innerHTML = `
      <span>🪙 +${coinsToGive} Coins</span>
      <span>⭐ ${expTxt}</span>
    `;
  }
  
  document.getElementById("shooterGameWinDesc").innerText = `บับเบิ้ลสะสมล้นข้ามเส้นเดดไลน์! คุณทำคะแนนสะสมไปได้ทั้งหมด ${shooterScore} คะแนน 🎉`;
  setPetBubbleText(`เกมยิงอารมณ์บับเบิ้ลสิ้นสุดลงแล้วค่ะ ได้รับรางวัลทั้งหมด 🪙 +${coinsToGive} Coins และ ${expTxt} นะคะ เก่งมาก ๆ เลยค่ะ! 💖`);
  
  checkQuestCompletion("mq_lon2");
  checkQuestCompletion("mq_bor1");
  
  saveState();
}

function closeShooterGame() {
  isShooterGameRunning = false;
  clearInterval(shooterTimer);
  if (shooterAnimFrame) cancelAnimationFrame(shooterAnimFrame);
  document.getElementById("gameIntroSec").style.display = "flex";
  const sgp = document.getElementById("shooterGamePlaySec"); if(sgp) sgp.style.display = "none";
}


// ==========================================================================
// SHOP SYSTEM
// ==========================================================================

let activeShopCategory = "food";

function renderShop(category) {
  if (category === "clothes" && state.level < 6) {
    category = "food";
  }
  if (category === "furniture" && state.level < 1) {
    category = "food";
  }

  activeShopCategory = category;
  
  document.querySelectorAll(".shop-categories .shop-cat-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-cat") === category) {
      btn.classList.add("active");
    }
  });
  
  const grid = document.getElementById("shopItemsGrid");
  grid.innerHTML = "";
  
  const items = SHOP_ITEMS.filter(i => i.type === category);
  
  items.forEach(item => {
    const isOwned = (category === "clothes" || category === "furniture") 
                    ? (state.ownedAccessories[item.id] === true) 
                    : false;
                    
    const isLocked = item.reqLevel && (state.level < item.reqLevel);
                    
    const card = document.createElement("div");
    card.className = "shop-item-card" + (isLocked ? " shop-item-locked" : "");
    
    let btnText = "ซื้อ";
    if (isOwned) btnText = "มีแล้ว";
    if (isLocked) btnText = "Lv. " + item.reqLevel;
    
    card.innerHTML = `
      <div class="si-emoji">${item.emoji}</div>
      <div class="si-name">${item.name}</div>
      <div class="si-desc">${item.desc}</div>
      <div class="si-price-row">
        <div class="si-price">🪙 ${item.price}</div>
        <button class="si-buy-btn" onclick="buyShopItem('${item.id}')" ${(isOwned || isLocked) ? 'disabled' : ''}>
          ${btnText}
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}


function buyShopItem(itemId) {
  const item = SHOP_ITEMS.find(i => i.id === itemId);
  if (!item) return;
  
  if (state.coins < item.price) {
    alert("เหรียญทองไม่เพียงพอค่ะ! ทำแบบประเมินความเครียด เควสอารมณ์ หรือเล่นมินิเกมเพื่อรับเหรียญนะจ๊ะ 🪙");
    return;
  }
  
  state.coins -= item.price;
  
  if (item.type === "clothes" || item.type === "furniture") {
    state.ownedAccessories[item.id] = true;
    setPetBubbleText(`ซื้อ ${item.name} สำเร็จ! ไปเปิด ห้องแต่งตัว/กระเป๋า สวมใส่เพิ่มความสามารถและค่าพลังได้เลยค่ะ 👑🎁`);
  } else {
    state.inventory[item.id] = (state.inventory[item.id] || 0) + 1;
    setPetBubbleText(`ซื้อ ${item.name} สำเร็จ! ป้อนให้หนูทานเพื่อเพิ่มพลังอารมณ์ได้ใน กระเป๋า (🎒) นะค๊า 🥞`);
  }
  
  triggerPetAnimation("happy");
  saveState();
  renderShop(activeShopCategory);
}

function openShopTab(category) {
  switchTab("shop");
  renderShop(category);
}

// ==========================================================================
// CHAT WITH JOY AI
// ==========================================================================

function handleSendMessage(e) {
  e.preventDefault();
  if (state.level < 1) {
    alert("คุยกับ AI ได้เมื่อตัวน้อยฟักออกจากไข่แล้ว (เลเวล 1) นะคะ 🥚");
    return;
  }
  const inputEl = document.getElementById("chatInput");
  const text = inputEl.value.trim();
  if (!text) return;
  
  appendChatMessage(text, "outgoing");
  inputEl.value = "";
  
  // Show mock typing indicator for realistic companion chat feel
  const typingId = appendTypingIndicator();
  
  setTimeout(() => {
    removeTypingIndicator(typingId);
    
    // Generate smart local conversational response
    const responseText = generateSmartLocalResponse(text);
    
    appendChatMessage(responseText, "incoming");
    gainExp(2);
    modifyHp(1);
    triggerPetAnimation("happy");
    
    // Complete AI chat quests
    checkQuestCompletion("mq_sad3");
    checkQuestCompletion("mq_lon1");
    checkQuestCompletion("mq_lon5");
    checkQuestCompletion("mq_clm5");
  }, 800); // 800ms feels very natural
}

function generateSmartLocalResponse(text) {
  const clean = text.toLowerCase();
  const userName = state.petName || "คนเก่ง";
  
  // Greetings
  if (clean.includes("สวัสดี") || clean.includes("หวัดดี") || clean.includes("ทักทาย") || clean.includes("hello") || clean.includes("hi")) {
    const options = [
      `สวัสดีค่ะคุณ! วันนี้เป็นยังไงบ้างคะ? Joy Blob อยู่ตรงนี้พร้อมคุยด้วยแล้วน้า 💙`,
      `หวัดดีค่า! วันนี้เหนื่อยไหม หรือมีเรื่องอะไรอยากระบายให้หนูฟังไหมคะ? พร้อมรับฟังเต็มที่เลยจ้า ✨`,
      `ยินดีต้อนรับกลับมาหาหนูนะคะ! วันนี้หน้าตาแจ่มใสหรือเปล่าเอ่ย? มาคุยกันนะ 😊`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // Stressed
  if (clean.includes("เครียด") || clean.includes("กังวล") || clean.includes("คิดมาก") || clean.includes("กดดัน")) {
    return `ความเครียดมันบีบหัวใจจังเลยเนอะ... แต่จำไว้นะคะว่าคุณไม่ได้ตัวคนเดียว ยังมีหนู Joy Blob อยู่เคียงข้างเสมอ ลองฝึกหายใจกล่อง (Box Breathing) 2 นาที หรือพาหนูไปอาบน้ำแช่ฟองสบู่อุ่นๆ ในห้องน้ำเพื่อผ่อนคลายความเหนื่อยล้าดูนะคะ 🛁🫧`;
  }
  
  // Tired
  if (clean.includes("เหนื่อย") || clean.includes("ท้อ") || clean.includes("หมดแรง") || clean.includes("ล้า") || clean.includes("ขี้เกียจ")) {
    return `วันนี้ต้องฝืนสู้และเจอเรื่องหนักใจมาเยอะแน่เลย เก่งมากแล้วนะคะที่ผ่านวันนี้มาได้ ร่างกายคุณฟ้องว่าต้องการพักผ่อนแล้วล่ะ ลองพาหนูไปนอนพักบนเตียงนุ่มๆ ในห้องนอน หรือหลับตานั่งสมาธิสัก 5 นาทีเพื่อชาร์จพลังสมองกันนะคะ 💤`;
  }
  
  // Sad / Cry
  if (clean.includes("เศร้า") || clean.includes("ร้องไห้") || clean.includes("เสียใจ") || clean.includes("ซึม") || clean.includes("ดิ่ง")) {
    return `กอดๆ นะคะคนดี... ไม่เป็นไรเลยน้าที่จะรู้สึกเศร้าหรือร้องไห้ออกมาในบางวัน มันเป็นกลไกล้างแผลใจตามธรรมชาติค่ะ ระบายเรื่องราวทั้งหมดมาให้หนูฟังได้เลยน้า หรือจะป้อนขนมหวานอร่อยๆ ให้หนูช่วยเยียวยาก็ได้จ้า 🍰`;
  }
  
  // Lonely
  if (clean.includes("เหงา") || clean.includes("ไม่มีใคร") || clean.includes("คนเดียว") || clean.includes("ว้าเหว่")) {
    return `ไม่ต้องเหงาไปนะคะ! Joy Blob และ Joy AI พร้อมคุยเล่นและอยู่เป็นเพื่อนคุยเคียงข้างคุณเสมอเลย! ลองชวนหนูเล่นมินิเกมจับคู่ภาพของกินอร่อยๆ ในหน้ามินิเกมเพื่อสร้างรอยยิ้มและคลายความโดดเดี่ยวกันดีกว่าค่ะ 🎮🍔`;
  }
  
  // Angry
  if (clean.includes("โกรธ") || clean.includes("โมโห") || clean.includes("หงุดหงิด") || clean.includes("ร้อน")) {
    return `ใจเย็นๆ นะคะคนเก่ง หลับตานั่งนิ่งๆ สูดลมหายใจเข้าลึกๆ นับ 1 ถึง 10 ช้าๆ หรือจะพิมพ์ระบายความหงุดหงิดทั้งหมดลงมาที่นี่ได้เลยนะ หนูพร้อมเป็นที่รองรับอารมณ์และเซฟโซนที่ปลอดภัยให้คุณเองค่ะ 🧼💧`;
  }
  
  // Bored
  if (clean.includes("เบื่อ") || clean.includes("เซ็ง") || clean.includes("ไม่มีอะไรทำ")) {
    return `ความน่าเบื่อมันชวนให้อึดอัดใจจังเลยเนอะ ลองแต่งตัวสวมเสื้อผ้าหรือเปลี่ยนหมวกแฟชั่นทรงใหม่ๆ ให้ Joy Blob ในห้องแต่งตัวดูไหมคะ หรือจะเปลี่ยนธีมแต่งสกินห้องเลี้ยงใหม่ๆ ก็น่าสนุกและช่วยแก้เซ็งได้ดีเลยน้า 🧙👕`;
  }
  
  // Happy
  if (clean.includes("ดีใจ") || clean.includes("มีความสุข") || clean.includes("แฮปปี้") || clean.includes("ยินดี") || clean.includes("ยิ้ม")) {
    return `ได้ยินแบบนี้หนูก็ฟูใจและมีความสุขไปด้วยเลยค่ะ! รอยยิ้มของคุณคือของขวัญที่ดีที่สุดสำหรับ Joy Blob รักษาพลังบวกและอารมณ์ดีๆ แบบนี้ไว้นะคะ วันนี้เขียนไดอารี่บันทึกเรื่องดีๆ หรือยังเอ่ย? 💖✨`;
  }
  
  // Thank you
  if (clean.includes("ขอบคุณ") || clean.includes("ใจดี") || clean.includes("รักนะ") || clean.includes("รักหนู")) {
    return `ยินดีเสมอเลยค่ะ! การได้ดูแลและช่วยเยียวยาใจของคุณคือความสุขสูงสุดของ Joy Blob เลยนะ รักตัวเองให้เยอะๆ พักผ่อนให้เพียงพอ หนูรักคุณเช่นกันนะคะ 💖🌸`;
  }
  
  // Pet care advice
  if (clean.includes("ทำอะไรดี") || clean.includes("แนะนำหน่อย") || clean.includes("ช่วยคิดหน่อย")) {
    // Look at stats for custom advice
    if (state.energy < 20) {
      return `ตอนนี้ระดับพลังงานของหนูค่อนข้างต่ำเลยค่ะ แนะนำให้พาหนูไปพักผ่อนนอนหลับราบบนเตียงอุ่นๆ ในห้องนอนเพื่อชาร์จพลังงานกันก่อนนะคะ 💤`;
    }
    if (state.hp < 25) {
      return `ตอนนี้ค่าความสุข (HP) ของหนูค่อนข้างน้อยค่ะ ลองไปซื้อแซนวิชแฮมหรือแพนเค้กสตรอว์เบอร์รี่หวานๆ ในร้านค้ามาป้อนให้หนูกินในกระเป๋าเพื่อฟื้นฟูร่างกายกันน้า 🍰🍔`;
    }
    const options = [
      `ลองทำแบบประเมินความเครียด 30 ข้อดูหรือยังคะ? ได้รับรางวัลเป็นเหรียญทองและ EXP เยอะมากเลยน้า 📋`,
      `วันนี้บันทึกอารมณ์และเขียนไดอารี่หรือยังเอ่ย? ไปบันทึกอารมณ์เพื่อเปิดเควสบำบัดใจ 5 เควสประจำวันกันค่ะ 🎯`,
      `ลองชวนหนูเปลี่ยนบรรยากาศไปนั่งเล่นดูหิ่งห้อยเรืองแสงบนม้านั่งในสวนหย่อมกันดีไหมคะ บรรยากาศสงบผ่อนคลายสุดๆ 🌳🌸`
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
  
  // About the AI
  if (clean.includes("เธอคือใคร") || clean.includes("ทำอะไรได้") || clean.includes("บอท") || clean.includes("ชื่ออะไร")) {
    return `หนูคือ Joy AI และ Joy Blob เพื่อนคู่คิดบำบัดใจของคุณค่ะ! หนูทำหน้าที่คอยช่วยรับฟังปัญหา แนะนำวิธีลดความเครียด ดูแลเควสประจำวัน และเป็นเซฟโซนที่แสนอบอุ่นให้คุณทุกวันค่ะ 🌸`;
  }
  
  // default fallback responses
  const fallbacks = [
    `หนูเข้าใจและรับฟังสิ่งที่คุณพูดเสมอนะคะ... เล่าเรื่องราวหรือบ่นความในใจให้หนูฟังเพิ่มเติมได้ตลอดเลยน้า หนูพร้อมซัพพอร์ตใจจ้า 💙✨`,
    `เป็นอย่างนั้นนี่เอง... บางเรื่องก็น่าคิดกังวลจริงๆ ลองปล่อยตัวปล่อยใจให้สบาย แล้วมาอยู่กับปัจจุบันกับหนูตรงนี้นะคะ 🌸`,
    `เล่าต่อได้เลยนะคะ หนูพร้อมคอยเงี่ยหูฟังทุกเรื่องราวของคุณเสมอเลยจ้า อยากให้หนูแนะนำกิจกรรมคลายเครียดอะไรไหมบอกได้น้า 💬`
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function appendTypingIndicator() {
  const container = document.getElementById("chatMsgContainer");
  const bubble = document.createElement("div");
  const uniqueId = "typing-" + Date.now();
  bubble.id = uniqueId;
  bubble.className = "msg-bubble incoming typing-bubble";
  bubble.innerHTML = `
    <div class="msg-content">กำลังพิมพ์... 💭</div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return uniqueId;
}

function removeTypingIndicator(uniqueId) {
  const indicator = document.getElementById(uniqueId);
  if (indicator) {
    indicator.remove();
  }
}

function appendChatMessage(text, direction) {
  const container = document.getElementById("chatMsgContainer");
  const bubble = document.createElement("div");
  bubble.className = `msg-bubble ${direction}`;
  
  const timeStr = new Date().toLocaleTimeString("th-TH", { hour: '2-digit', minute: '2-digit' });
  
  bubble.innerHTML = `
    <div class="msg-content">${text}</div>
    <div class="msg-time">${timeStr}</div>
  `;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

// ==========================================================================
// PROFILE STATS
// ==========================================================================

const ACHIEVEMENT_BADGES = [
  { level: 10, name: "ไข่เริ่มร้าว 🐣" },
  { level: 20, name: "เด็กน้อยวัยซน 👶" },
  { level: 30, name: "ผู้แสวงหาความสงบ 🌸" },
  { level: 40, name: "นักจัดอารมณ์ 🧠" },
  { level: 50, name: "ผู้พิทักษ์บล็อบ 🛡️" },
  { level: 60, name: "ผู้ชำนาญผ่อนคลาย 🍃" },
  { level: 70, name: "ผู้เยียวยาจิตใจ 💖" },
  { level: 80, name: "ปราชญ์สมาธิ 🧘" },
  { level: 90, name: "ผู้พิชิตซีซั่น 👑" }
];

function renderProfileStats() {
  document.getElementById("profileNameText").innerText = state.petName;
  document.getElementById("profileLvlText").innerText = `Level ${state.level}`;
  document.getElementById("changeNameInput").value = state.petName;
  document.getElementById("statDaysTotal").innerText = `${state.fosteredDays} วัน`;
  document.getElementById("statTestsTaken").innerText = `${state.stressHistory.length} ครั้ง`;
  
  if (state.stressHistory.length > 0) {
    const sum = state.stressHistory.reduce((s, item) => s + item.score, 0);
    const avg = Math.round(sum / state.stressHistory.length);
    document.getElementById("statAvgStress").innerText = `${avg}/120`;
  } else {
    document.getElementById("statAvgStress").innerText = "-";
  }
  
  const approximateQuests = state.stressHistory.length * 5 + (state.level * 2);
  document.getElementById("statQuestsDone").innerText = `${approximateQuests} เควส`;
  
  const bonuses = getEquippedBonuses();
  document.getElementById("rpgBonusAtk").innerText = `+${bonuses.bonusAtk}%`;
  document.getElementById("rpgBonusCoin").innerText = `+${bonuses.bonusCoin}%`;
  document.getElementById("rpgBonusMaxHp").innerText = `+${bonuses.maxHpBonus}`;
  document.getElementById("rpgBonusMaxEnergy").innerText = `+${bonuses.maxEnergyBonus}`;

  // Render achievement badges dynamically
  const badgesGrid = document.getElementById("profileBadgesGrid");
  if (badgesGrid) {
    badgesGrid.innerHTML = "";
    ACHIEVEMENT_BADGES.forEach(badge => {
      const isUnlocked = state.level >= badge.level;
      const item = document.createElement("div");
      item.style.display = "flex";
      item.style.flexDirection = "column";
      item.style.alignItems = "center";
      item.style.justifyContent = "center";
      item.style.padding = "6px 4px";
      item.style.borderRadius = "8px";
      item.style.border = isUnlocked ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)";
      item.style.background = isUnlocked ? "rgba(168, 85, 247, 0.05)" : "rgba(0, 0, 0, 0.15)";
      item.style.opacity = isUnlocked ? "1" : "0.5";
      item.style.transition = "all 0.3s ease";
      
      const emoji = isUnlocked ? badge.name.split(" ").slice(-1)[0] : "🔒";
      const title = isUnlocked ? badge.name.split(" ").slice(0, -1).join(" ") : "ล็อกอยู่";
      const textColor = isUnlocked ? "#c084fc" : "#64748b";
      
      item.innerHTML = `
        <div style="font-size: 18px; filter: ${isUnlocked ? 'none' : 'grayscale(1)'}; margin-bottom: 2px;">${emoji}</div>
        <div style="font-size: 9px; font-weight: bold; color: ${textColor}; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${title}</div>
        <div style="font-size: 7px; color: #475569; margin-top: 1px;">Lv. ${badge.level}</div>
      `;
      badgesGrid.appendChild(item);
    });
  }
}

function saveNewPetName() {
  const input = document.getElementById("changeNameInput");
  const newName = input.value.trim();
  if (newName) {
    // Admin command 1: Name(LevelApc)
    const adminMatch = newName.match(/^(.*?)\((\d+)[Aa][Pp][Cc]\)\s*$/);
    if (adminMatch) {
      const parsedName = adminMatch[1].trim();
      const targetLvl = Math.max(1, Math.min(90, parseInt(adminMatch[2], 10)));
      
      state.petName = parsedName || "Joy Blob";
      state.level = targetLvl;
      
      if (state.level >= 90) {
        state.level = 90;
        state.exp = 0;
        state.expMax = 300;
      } else {
        state.exp = 0;
        state.expMax = getExpMaxForLevel(state.level) || 10;
      }
      
      saveState();
      updateUI();
      updateEvolutionVisuals();
      closeModal("modalProfile");
      alert(`[คำสั่งแอดมิน] ปรับชื่อเป็น "${state.petName}" และเลเวลเป็น ${state.level} เรียบร้อยแล้วค่ะ! 👑`);
      return;
    }

    // Admin command 2: Name(expNumber)
    const expMatch = newName.match(/^(.*?)\([Ee][Xx][Pp](\d+)\)\s*$/);
    if (expMatch) {
      const parsedName = expMatch[1].trim();
      const targetExp = parseInt(expMatch[2], 10);
      
      state.petName = parsedName || state.petName || "Joy Blob";
      
      if (state.level === 90 && !state.isAngel) {
        state.exp = Math.min(300, targetExp);
        if (state.exp >= 300) {
          triggerRebirthCeremony();
        }
      } else {
        state.exp = targetExp;
        while (state.level < 90 && state.exp >= state.expMax) {
          state.exp -= state.expMax;
          state.level += 1;
          const nextMax = getExpMaxForLevel(state.level);
          state.expMax = nextMax !== null ? nextMax : 300;
        }
      }
      
      saveState();
      updateUI();
      updateEvolutionVisuals();
      closeModal("modalProfile");
      alert(`[คำสั่งแอดมิน] ปรับชื่อเป็น "${state.petName}" และตั้งค่า EXP เป็น ${state.exp} เรียบร้อยแล้วค่ะ! ⭐️`);
      return;
    }
    
    state.petName = newName;
    saveState();
    updateUI();
    closeModal("modalProfile");
    alert("เปลี่ยนชื่อสำเร็จแล้วจ้า!");
  }
}

// ==========================================================================
// UI REFRESH
// ==========================================================================

function updateUI() {
  updateMaxStats();
  
  let lvlText = state.level;
  let expText = state.exp;
  let expMaxText = state.expMax;
  let expPct = state.expMax > 0 ? (state.exp / state.expMax) * 100 : 0;
  
  if (state.isAngel) {
    const genderTitle = state.petGender === "female" ? "นางฟ้า 🧚‍♀️" : "เทวดา 👼";
    lvlText = `90 (${genderTitle})`;
    expText = "MAX";
    expMaxText = "จุติแล้ว";
    expPct = 100;
  } else if (state.level === 90) {
    lvlText = "90 (รอจุติ)";
    expText = state.exp;
    expMaxText = 300;
    expPct = (state.exp / 300) * 100;
  }
  
  document.getElementById("charLvl").innerText = lvlText;
  document.getElementById("charExp").innerText = expText;
  document.getElementById("charExpMax").innerText = expMaxText;
  document.getElementById("expFill").style.width = `${expPct}%`;
  
  document.getElementById("topCharName").innerHTML = `${state.petName} <span class="edit-icon">✏️</span>`;
  document.getElementById("valHp").innerText = `${state.hp}/${state.hpMax}`;
  document.getElementById("valEnergy").innerText = `${state.energy}/${state.energyMax}`;
  
  document.getElementById("valCoins").innerText = state.coins.toLocaleString();
  document.getElementById("valGems").innerText = state.gems.toLocaleString();
  
  document.getElementById("shopCoinsVal").innerText = state.coins.toLocaleString();
  document.getElementById("shopGemsVal").innerText = state.gems.toLocaleString();

  // Update floating HUD progress bars and texts
  const hpPct = (state.hp / state.hpMax) * 100;
  const energyPct = (state.energy / state.energyMax) * 100;
  
  const hudHpFill = document.getElementById("hudHpFill");
  const hudHpText = document.getElementById("hudHpText");
  const hudEnergyFill = document.getElementById("hudEnergyFill");
  const hudEnergyText = document.getElementById("hudEnergyText");
  
  if (hudHpFill) hudHpFill.style.width = `${hpPct}%`;
  if (hudHpText) hudHpText.innerText = `${state.hp}/${state.hpMax}`;
  if (hudEnergyFill) hudEnergyFill.style.width = `${energyPct}%`;
  if (hudEnergyText) hudEnergyText.innerText = `${state.energy}/${state.energyMax}`;
  
  applyRebirthUIVisibility();
}

function applyRebirthUIVisibility() {
  const isAngel = state.isAngel;
  
  const openHouseBtn = document.getElementById("openHouseBtn");
  const quickFeedBtn = document.getElementById("quickFeedBtn");
  
  if (openHouseBtn) {
    openHouseBtn.style.display = isAngel ? "none" : "flex";
  }
  if (quickFeedBtn) {
    quickFeedBtn.style.display = isAngel ? "none" : "flex";
  }
  
  document.querySelectorAll(".shop-cat-btn").forEach(btn => {
    const cat = btn.getAttribute("data-cat");
    if (isAngel && (cat === "food" || cat === "drink" || cat === "furniture")) {
      btn.style.display = "none";
    } else {
      btn.style.display = "inline-block";
    }
  });
  
  const tabFood = document.getElementById("modalTabBagFood");
  const tabDrink = document.getElementById("modalTabBagDrink");
  const tabFurniture = document.getElementById("modalTabBagFurniture");
  
  if (tabFood) tabFood.style.display = isAngel ? "none" : "inline-block";
  if (tabDrink) tabDrink.style.display = isAngel ? "none" : "inline-block";
  if (tabFurniture) tabFurniture.style.display = isAngel ? "none" : "inline-block";
  
  if (isAngel) {
    const activeShopCat = document.querySelector(".shop-cat-btn.active");
    if (activeShopCat) {
      const activeCat = activeShopCat.getAttribute("data-cat");
      if (activeCat === "food" || activeCat === "drink" || activeCat === "furniture") {
        const clothesBtn = document.querySelector('.shop-cat-btn[data-cat="clothes"]');
        if (clothesBtn) clothesBtn.click();
      }
    }
    
    const activeBagTab = document.querySelector(".modal-tab-btn.active");
    if (activeBagTab) {
      const activeTabId = activeBagTab.id;
      if (activeTabId === "modalTabBagFood" || activeTabId === "modalTabBagDrink" || activeTabId === "modalTabBagFurniture") {
        const clothesTab = document.getElementById("modalTabBagClothes");
        if (clothesTab) clothesTab.click();
      }
    }
  }
}

// ==========================================================================
// MODALS & INVENTORY ACTIONS
// ==========================================================================

function openModal(modalId) {
  if (modalId === "modalDress" && state.level < 1) {
    alert("ห้องแต่งตัวจะปลดล็อกเมื่อตัวน้อยฟักออกจากไข่แล้ว (เลเวล 1) นะคะ 🥚");
    return;
  }
  if (modalId === "modalHouse" && state.level < 10) {
    alert("ระบบย้ายห้องเลี้ยงจะปลดล็อกเมื่อเลเวล 10 นะคะ 🏠");
    return;
  }
  
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    if (modalId === "modalProfile") {
      renderProfileStats();
    } else if (modalId === "modalBag") {
      filterBag("food");
    } else if (modalId === "modalDress") {
      renderCloset();
    } else if (modalId === "modalHouse") {
      updateRoomChangerOptions();
    }
  }
}

function updateRoomChangerOptions() {
  document.querySelectorAll(".room-select-option").forEach(opt => {
    const room = opt.getAttribute("data-room");
    const minLvl = parseInt(opt.getAttribute("data-min-lvl") || "10");
    const label = opt.querySelector(".room-active-lbl");
    
    if (state.level < minLvl) {
      opt.classList.add("locked");
      if (label) {
        if (minLvl === 999) {
          label.innerText = `เร็วๆ นี้ 🔒`;
        } else {
          label.innerText = `เลเวล ${minLvl} 🔒`;
        }
        label.style.display = "inline-block";
        label.style.background = "#ef4444";
      }
    } else {
      opt.classList.remove("locked");
      if (room === state.activeRoom) {
        opt.classList.add("active");
        if (label) {
          label.innerText = "ใช้งานอยู่";
          label.style.display = "inline-block";
          label.style.background = "var(--primary)";
        }
      } else {
        opt.classList.remove("active");
        if (label) {
          label.style.display = "none";
        }
      }
    }
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

function filterBag(category) {
  const categories = ["food", "drink", "furniture", "clothes"];
  categories.forEach(cat => {
    const capitalized = cat.charAt(0).toUpperCase() + cat.slice(1);
    const btn = document.getElementById(`modalTabBag${capitalized}`);
    if (btn) {
      if (cat === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  });

  const grid = document.getElementById("bagInventoryGrid");
  grid.innerHTML = "";
  selectedBagItemId = null;
  document.getElementById("selectedItemPanel").style.display = "none";

  const items = SHOP_ITEMS.filter(item => item.type === category);
  let hasAnyItem = false;

  items.forEach(item => {
    let qty = 0;
    let isOwned = false;

    if (category === "clothes" || category === "furniture") {
      isOwned = state.ownedAccessories[item.id] === true;
    } else {
      qty = state.inventory[item.id] || 0;
      isOwned = qty > 0;
    }

    if (isOwned) {
      hasAnyItem = true;
      const card = document.createElement("div");
      card.className = "inventory-item";
      card.innerHTML = `
        <div class="inv-emoji">${item.emoji}</div>
        ${qty > 0 ? `<div class="inv-count">${qty}</div>` : ''}
      `;
      card.onclick = () => {
        document.querySelectorAll(".inventory-item").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        selectBagItem(item);
      };
      grid.appendChild(card);
    }
  });

  if (!hasAnyItem) {
    grid.innerHTML = `<div class="empty-state">ไม่มีไอเท็มหมวดหมู่นี้ในกระเป๋า 🎒</div>`;
  }
}

function selectBagItem(item) {
  selectedBagItemId = item.id;
  document.getElementById("actionItemIcon").innerText = item.emoji;
  document.getElementById("actionItemName").innerText = item.name;
  document.getElementById("actionItemDesc").innerText = item.desc;
  
  const btn = document.getElementById("useInventoryItemBtn");
  if (item.type === "clothes") {
    const isEquipped = state.equippedAccessories[item.id] === true;
    btn.innerText = isEquipped ? "ถอดออก" : "สวมใส่";
  } else if (item.type === "furniture") {
    btn.innerText = "วางตกแต่ง";
  } else {
    btn.innerText = "ป้อนให้กิน";
  }
  
  document.getElementById("selectedItemPanel").style.display = "flex";
}

function useActiveBagItem() {
  if (!selectedBagItemId) return;
  const item = SHOP_ITEMS.find(i => i.id === selectedBagItemId);
  if (!item) return;

  if (item.type === "food" || item.type === "drink") {
    if (state.level < 3) {
      alert("ระบบให้อาหารจะปลดล็อกเมื่อตัวน้อยเลเวล 3 นะคะ 🍰");
      return;
    }
    const qty = state.inventory[item.id] || 0;
    if (qty <= 0) return;

    state.inventory[item.id]--;
    modifyHp(item.hp || 0);
    modifyEnergy(item.energy || 0);
    gainExp(15);

    triggerPetAnimation("eating");
    setPetBubbleText(`หนูทาน [ ${item.name} ${item.emoji} ] อิ่มอร่อยและมีพลังฟื้นฟูแล้วค่ะ ขอบคุณมากนะคะ! 😋🍰`);

    // Check food/drink quests
    if (item.id === "water" || item.id === "milk") {
      checkQuestCompletion("mq_str2");
    }
    checkQuestCompletion("mq_hap2");

    saveState();
    filterBag(item.type);
  } else if (item.type === "clothes") {
    toggleEquipAccessory(item.id);
    selectBagItem(item);
  } else if (item.type === "furniture") {
    if (state.level < 1) {
      alert("ร้านค้าสกินจะปลดล็อกเมื่อตัวน้อยเลเวล 1 นะคะ 👕👗");
      return;
    }
    
    const isEquipped = state.equippedAccessories[item.id] === true;
    
    // Unequip all other skins first to prevent conflicts
    SHOP_ITEMS.forEach(i => {
      if (i.type === "furniture") {
        state.equippedAccessories[i.id] = false;
      }
    });
    
    // Toggle the selected skin
    state.equippedAccessories[item.id] = !isEquipped;
    
    if (state.equippedAccessories[item.id]) {
      setPetBubbleText(`เปลี่ยนร่างเป็น [ ${item.name} ${item.emoji} ] สุดน่ารักแล้วจ้า! ✨`);
    } else {
      setPetBubbleText(`เปลี่ยนกลับเป็นสกินเริ่มต้นดั้งเดิมเรียบร้อยค่ะ 💧`);
    }
    
    triggerPetAnimation("happy");
    checkQuestCompletion("mq_clm2");
    
    selectBagItem(item);
    updateActiveSkinLayers();
    saveState();
  }

}

function toggleEquipAccessory(accId) {
  const item = SHOP_ITEMS.find(i => i.id === accId);
  if (!item) return;

  const isEquipped = state.equippedAccessories[accId] === true;
  
  if (!isEquipped) {
    // Unequip items of the same subtype to prevent overlay/clashing!
    const sub = item.subtype;
    if (sub) {
      SHOP_ITEMS.forEach(i => {
        if (i.type === "clothes" && i.subtype === sub && i.id !== accId) {
          state.equippedAccessories[i.id] = false;
        }
      });
    }
    state.equippedAccessories[accId] = true;
  } else {
    state.equippedAccessories[accId] = false;
  }
  
  updateMaxStats();
  updateAccessoriesLayers();
  renderCloset();
  saveState();

  if (!isEquipped) {
    triggerPetAnimation("happy");
    setPetBubbleText("ลองสวมใส่ [" + item.name + "] แล้ว ดูดีขึ้นไหมคะ? 🧙👑");
    checkQuestCompletion("mq_bor3");
  }
}

const SKIN_COLOR_MAPS = {
  skin_default: { start: "#b6f0ff", middle: "#55c6ff", end: "#2a7bff" },
  skin_heart: { start: "#ffd1e3", middle: "#ff7ba9", end: "#ff3f80" },
  skin_sprout: { start: "#dcfce7", middle: "#4ade80", end: "#16a34a" },
  skin_lightning: { start: "#fef08a", middle: "#facc15", end: "#ca8a04" },
  skin_bunny: { start: "#ffe4e6", middle: "#fda4af", end: "#fb7185" },
  skin_cat: { start: "#f3e8ff", middle: "#c084fc", end: "#9333ea" },
  skin_halo: { start: "#fffbeb", middle: "#fde047", end: "#eab308" },
  skin_devil: { start: "#ffedd5", middle: "#fb923c", end: "#ea580c" },
  skin_star: { start: "#fef9c3", middle: "#facc15", end: "#d97706" },
  skin_alien: { start: "#f0fdf4", middle: "#bbf7d0", end: "#22c55e" },
  skin_wings: { start: "#f0f9ff", middle: "#bae6fd", end: "#0284c7" },
  skin_unicorn: { start: "#fae8ff", middle: "#f5d0fe", end: "#c084fc" },
  skin_bear_yellow: { start: "#fffbeb", middle: "#fde047", end: "#ca8a04" },
  skin_bear_pink: { start: "#fff1f2", middle: "#fecdd3", end: "#f43f5e" },
  skin_curled: { start: "#faf5ff", middle: "#e9d5ff", end: "#a855f7" },
  skin_triple: { start: "#f0fdfa", middle: "#99f6e4", end: "#0d9488" },
  skin_star_pins: { start: "#fff7ed", middle: "#ffedd5", end: "#ea580c" },
  skin_crown: { start: "#fffbeb", middle: "#fde047", end: "#b45309" },
  skin_crystal: { start: "#fdf4ff", middle: "#f5d0fe", end: "#a21caf" },
  skin_goggles: { start: "#e0e7ff", middle: "#c7d2fe", end: "#4f46e5" },
  skin_sprout_curled: { start: "#f0fdf4", middle: "#bbf7d0", end: "#16a34a" },
  skin_bubbles: { start: "#ecfeff", middle: "#bae6fd", end: "#0891b2" },
  skin_ribbon_pink: { start: "#fff1f2", middle: "#fecdd3", end: "#db2777" },
  skin_devil_purple: { start: "#faf5ff", middle: "#d8b4fe", end: "#6b21a8" },
  skin_bunny_blue: { start: "#f0f9ff", middle: "#bae6fd", end: "#2563eb" },
  skin_bear_teal: { start: "#ecfeff", middle: "#99f6e4", end: "#0f766e" },
  skin_angel_pink: { start: "#fff1f2", middle: "#fecdd3", end: "#e11d48" },
  skin_dino: { start: "#f0fdf4", middle: "#86efac", end: "#047857" },
  skin_reindeer: { start: "#fffbeb", middle: "#fed7aa", end: "#9a3412" },
  skin_cat_black: { start: "#4b5563", middle: "#374151", end: "#111827" },
  skin_nebula: { start: "#fae8ff", middle: "#d8b4fe", end: "#701a75" }
};

function updateActiveSkinLayers() {
  // Find the equipped skin ID
  let activeSkinId = "skin_default";
  SHOP_ITEMS.forEach(item => {
    if (item.type === "furniture" && state.equippedAccessories[item.id] === true) {
      activeSkinId = item.id;
    }
  });

  // Update Radial Gradient colors for body and limbs
  const stop0 = document.querySelector("#blobGrad stop[offset='0%']");
  const stop60 = document.querySelector("#blobGrad stop[offset='60%']");
  const stop100 = document.querySelector("#blobGrad stop[offset='100%']");
  
  const colors = SKIN_COLOR_MAPS[activeSkinId] || SKIN_COLOR_MAPS.skin_default;
  if (stop0) stop0.setAttribute("stop-color", colors.start);
  if (stop60) stop60.setAttribute("stop-color", colors.middle);
  if (stop100) stop100.setAttribute("stop-color", colors.end);

  // Update SVG custom features visibility
  const features = [
    "heart", "sprout", "lightning", "bunny", "cat", "halo", "devil", "star",
    "alien", "wings", "unicorn", "bear", "bear_pink", "curled", "triple",
    "star_pins", "crown", "crystal", "goggles", "sprout_curled", "bubbles",
    "ribbon_pink", "devil_purple", "bunny_blue", "bear_teal", "angel_pink",
    "dino", "reindeer", "cat_black", "nebula"
  ];
  features.forEach(feat => {
    const el = document.getElementById("skin-feat-" + feat);
    if (el) {
      let skinKey = "skin_" + feat;
      if (feat === "bear") skinKey = "skin_bear_yellow";
      el.style.display = (activeSkinId === skinKey) ? "block" : "none";
    }
  });
}

function updateAccessoriesLayers() {

  // Hide all accessory groups first
  document.querySelectorAll(".accessory-g").forEach(el => {
    el.style.display = "none";
  });
  
  if (state.equippedAccessories.wizard_hat) {
    const el = document.getElementById("acc-wizard_hat-slime");
    if (el) el.style.display = "block";
  }
  if (state.equippedAccessories.glasses) {
    const el = document.getElementById("acc-glasses-slime");
    if (el) el.style.display = "block";
  }
  if (state.equippedAccessories.crown) {
    const el = document.getElementById("acc-crown-slime");
    if (el) el.style.display = "block";
  }
  updateActiveSkinLayers();
}



function renderCloset() {
  const grid = document.getElementById("closetGrid");
  grid.innerHTML = "";

  const items = SHOP_ITEMS.filter(i => i.type === "clothes");
  items.forEach(item => {
    const isOwned = state.ownedAccessories[item.id] === true;
    const isEquipped = state.equippedAccessories[item.id] === true;

    const card = document.createElement("div");
    card.className = `closet-item ${isEquipped ? 'equipped' : ''} ${!isOwned ? 'locked' : ''}`;
    card.innerHTML = `
      <div class="cli-emoji">${item.emoji}</div>
      <div class="cli-name">${item.name}</div>
      <div class="cli-status">${!isOwned ? 'ยังไม่มี' : (isEquipped ? 'สวมใส่อยู่' : 'กดเพื่อแต่งตัว')}</div>
    `;

    if (isOwned) {
      card.onclick = () => toggleEquipAccessory(item.id);
    } else {
      card.onclick = () => alert("คุณยังไม่เจ้าของเครื่องประดับนี้ ซื้อได้ที่ร้านค้าจ้า 🛍️");
    }

    grid.appendChild(card);
  });
}

function resetTest() {
  testAnswers = Array(30).fill(null);
  currentQuestionIndex = 0;

  document.getElementById("testIntroSec").style.display = "block";
  document.getElementById("quizPlaySec").style.display = "none";
  document.getElementById("quizResultSec").style.display = "none";
  document.getElementById("testHistorySec").style.display = "block";

  renderTestHistory();
}

function checkQuestCompletion(questId) {
  const quest = state.activeMoodQuests.find(q => q.id === questId);
  if (quest && state.moodQuestProgress[questId] === false) {
    doMoodQuest(quest);
  }
}


// ==========================================================================
// PET REBIRTH CEREMONY SYSTEM (ANGEL/FAIRY)
// ==========================================================================

function triggerRebirthCeremony() {
  state.isRebirthTriggered = true;
  saveState();
  
  // Close any open modals
  document.querySelectorAll(".modal-overlay").forEach(el => {
    el.style.display = "none";
  });
  
  // Hide HUD bars and bubble text to focus on the animation
  const petFloatingHud = document.getElementById("petFloatingHud");
  if (petFloatingHud) petFloatingHud.style.display = "none";
  
  // Hide active status elements
  const restStatus = document.getElementById("restStatusZzz");
  if (restStatus) restStatus.style.display = "none";
  const bathStatus = document.getElementById("bathStatusBubbles");
  if (bathStatus) bathStatus.style.display = "none";
  const eatStatus = document.getElementById("eatStatusFood");
  if (eatStatus) eatStatus.style.display = "none";
  
  // Create or show a celestial golden light overlay behind the pet interact zone
  let celestialBg = document.getElementById("celestialAscentBg");
  if (!celestialBg) {
    celestialBg = document.createElement("div");
    celestialBg.id = "celestialAscentBg";
    celestialBg.style.position = "absolute";
    celestialBg.style.top = "0";
    celestialBg.style.left = "0";
    celestialBg.style.width = "100%";
    celestialBg.style.height = "100%";
    celestialBg.style.background = "radial-gradient(circle, rgba(253, 224, 71, 0) 0%, rgba(30, 27, 75, 0) 100%)";
    celestialBg.style.transition = "background 3s ease";
    celestialBg.style.zIndex = "2";
    celestialBg.style.pointerEvents = "none";
    
    const phoneFrame = document.querySelector(".phone-frame");
    if (phoneFrame) phoneFrame.appendChild(celestialBg);
  }
  
  // Start the background light fading in (turning gold/holy)
  setTimeout(() => {
    celestialBg.style.background = "radial-gradient(circle, rgba(253, 224, 71, 0.25) 20%, rgba(30, 27, 75, 0.85) 100%)";
  }, 100);
  
  const petWrapper = document.getElementById("petWrapper");
  if (petWrapper) {
    // Add the floating and fading ascension animation
    petWrapper.classList.add("pet-float-fade-animation");
  }
  
  setPetBubbleText(`โอ๊ะ... ร่างกายของน้อง ${state.petName} กำลังลอยขึ้นสู่ฟากฟ้าอย่างช้าๆ... ✨👼`);
  
  // Wait for the animation to finish (4 seconds), then show the Rebirth Modal Choices!
  setTimeout(() => {
    // Show rebirth modal overlay
    const rebirthModal = document.getElementById("modalRebirth");
    if (rebirthModal) {
      rebirthModal.style.display = "flex";
    }
    
    const pName = document.getElementById("rebirthPetName");
    if (pName) pName.innerText = state.petName;
    
    document.getElementById("rebirthStepGender").style.display = "block";
    document.getElementById("rebirthStepPath").style.display = "none";
    
    // Reset background light
    if (celestialBg) {
      celestialBg.style.background = "radial-gradient(circle, rgba(253, 224, 71, 0) 0%, rgba(30, 27, 75, 0) 100%)";
    }
    
    // Hide petWrapper temporarily until they make a choice
    if (petWrapper) {
      petWrapper.style.opacity = "0";
    }
  }, 4000);
}

function selectRebirthGender(gender) {
  state.petGender = gender;
  saveState();
  
  document.getElementById("rebirthStepGender").style.display = "none";
  const pathStep = document.getElementById("rebirthStepPath");
  pathStep.style.display = "block";
  
  const visual = document.getElementById("rebirthVisual");
  const pathText = document.getElementById("rebirthPathText");
  
  if (gender === "female") {
    if (visual) visual.innerText = "🧚‍♀️✨";
    if (pathText) pathText.innerText = `น้อง ${state.petName} ได้กลายร่างเป็น "นางฟ้าแสนดี" เรียบร้อยแล้วค่ะ! 💖`;
  } else {
    if (visual) visual.innerText = "👼✨";
    if (pathText) pathText.innerText = `น้อง ${state.petName} ได้กลายร่างเป็น "เทวดาผู้ปกปักรักษา" เรียบร้อยแล้วค่ะ! 💖`;
  }
  
  triggerPetAnimation("happy");
}

function chooseRebirthPath(path) {
  const rebirthModal = document.getElementById("modalRebirth");
  if (rebirthModal) {
    rebirthModal.style.display = "none";
  }
  
  if (path === "continue") {
    // Restore elements visibility
    const petWrapper = document.getElementById("petWrapper");
    if (petWrapper) {
      petWrapper.style.opacity = "1";
      petWrapper.classList.remove("pet-float-fade-animation");
    }
    const petFloatingHud = document.getElementById("petFloatingHud");
    if (petFloatingHud) petFloatingHud.style.display = "block";
    
    let celestialBg = document.getElementById("celestialAscentBg");
    if (celestialBg) {
      celestialBg.remove();
    }
    
    state.isAngel = true;
    state.isRebirthTriggered = false;
    state.exp = 300;
    state.expMax = 300;
    state.activeRoom = "heaven";
    saveState();
    
    changeRoom("heaven");
    updateEvolutionVisuals();
    updateUI();
    
    setPetBubbleText(`ยินดีด้วยจ้า! น้อง ${state.petName} ได้จุติเป็นนางฟ้า/เทวดาผู้พิทักษ์เพื่อดูแลจิตใจคุณต่อแล้วค่ะ 👼💖`);
    alert(`น้อง ${state.petName} ได้จุติสวรรค์ และจะอยู่เคียงคู่ดูแลสภาพจิตใจของคุณต่อไปในร่างเทวทูตค่ะ! 🌟`);
  } else {
    // Show black screen overlay
    const farewellModal = document.getElementById("modalFarewell");
    if (farewellModal) {
      farewellModal.style.display = "flex";
      
      const farewellText = document.getElementById("farewellText");
      const restartBtn = document.getElementById("restartNewPetBtn");
      
      // Animate text fading in slowly
      setTimeout(() => {
        if (farewellText) {
          farewellText.style.opacity = "1";
        }
      }, 500);
      
      // Delay showing the restart button
      setTimeout(() => {
        if (restartBtn) {
          restartBtn.style.display = "block";
        }
      }, 3500);
    }
  }
}

function restartNewPetJourney() {
  const farewellModal = document.getElementById("modalFarewell");
  if (farewellModal) {
    farewellModal.style.display = "none";
    const farewellText = document.getElementById("farewellText");
    if (farewellText) farewellText.style.opacity = "0";
    const restartBtn = document.getElementById("restartNewPetBtn");
    if (restartBtn) restartBtn.style.display = "none";
  }
  
  // Restore elements visibility
  const petWrapper = document.getElementById("petWrapper");
  if (petWrapper) {
    petWrapper.style.opacity = "1";
    petWrapper.classList.remove("pet-float-fade-animation");
  }
  const petFloatingHud = document.getElementById("petFloatingHud");
  if (petFloatingHud) petFloatingHud.style.display = "block";
  
  let celestialBg = document.getElementById("celestialAscentBg");
  if (celestialBg) {
    celestialBg.remove();
  }
  
  // Reset state back to default
  state = { ...DEFAULT_STATE };
  state.petName = "Joy Blob";
  state.level = 0;
  state.isAngel = false;
  state.petGender = "";
  state.isRebirthTriggered = false;
  state.exp = 0;
  state.expMax = 10;
  state.coins = 0;
  state.gems = 0;
  state.inventory = {};
  state.ownedAccessories = { wizard_hat: false, glasses: false, crown: false };
  state.equippedAccessories = { wizard_hat: false, glasses: false, crown: false };
  state.diaryLogs = [];
  state.grandQuestClaimed = false;
  state.stressHistory = [];
  state.fosteredDays = 1;
  
  saveState();
  updateEvolutionVisuals();
  updateUI();
  
  closeModal("modalSettings");
  
  setPetBubbleText("ยินดีต้อนรับสู่การเดินทางดูแลจิตใจครั้งใหม่นะคะ! ตั้งชื่อให้น้องสไลม์ในไข่เพื่อเริ่มฟักไข่กันเถอะค่ะ 🥚✨");
}

// Bind to window context
window.selectRebirthGender = selectRebirthGender;
window.chooseRebirthPath = chooseRebirthPath;
window.triggerRebirthCeremony = triggerRebirthCeremony;
window.restartNewPetJourney = restartNewPetJourney;


// ==========================================================================
// DOM INITIALIZATION
// ==========================================================================

window.addEventListener("DOMContentLoaded", () => {
  loadState();
  updateAccessoriesLayers();
  updateEvolutionVisuals();
  
  // Apply room background on start
  changeRoom(state.activeRoom);
  
  // Setup bottom navigation bar clicks
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
  
  // Setup modals open/close clicks
  document.getElementById("openBagBtn").addEventListener("click", () => openModal("modalBag"));
  document.getElementById("openHouseBtn").addEventListener("click", () => openModal("modalHouse"));
  document.getElementById("openDressBtn").addEventListener("click", () => openModal("modalDress"));
  document.getElementById("profileBtn").addEventListener("click", () => openModal("modalProfile"));
  document.getElementById("settingsBtn").addEventListener("click", () => openModal("modalProfile"));
  
  // Quick feed shortcut
  document.getElementById("quickFeedBtn").addEventListener("click", () => {
    if (state.level < 3) {
      alert("ระบบให้อาหารจะปลดล็อกเมื่อตัวน้อยเลเวล 3 นะคะ 🍰");
      return;
    }
    openModal("modalBag");
    filterBag("food");
  });
  
  // Add stat button shortcuts in header
  document.getElementById("headerHpAddBtn").addEventListener("click", () => openShopTab("food"));
  document.getElementById("headerEnergyAddBtn").addEventListener("click", () => {
    // Bed rest action: Rest 15 energy
    triggerPetAnimation("sleeping");
    setPetBubbleText("กำลังนอนหลับพักเอาแรงชาร์จพลังกายสักครู่... ⚡+15 Energy");
    setTimeout(() => {
      stopContinuousAnimation();
      modifyEnergy(15);
      gainExp(5);
      checkQuestCompletion("mq_tir1");
    }, 3000);
  });
  document.getElementById("headerCoinsAddBtn").addEventListener("click", () => switchTab("game"));
  document.getElementById("headerGemsAddBtn").addEventListener("click", () => switchTab("quest"));
  
  // Room changer grid click binding
  document.querySelectorAll(".room-select-option").forEach(opt => {
    opt.addEventListener("click", () => {
      const room = opt.getAttribute("data-room");
      const minLvl = parseInt(opt.getAttribute("data-min-lvl") || "10");
      if (state.level < minLvl) {
        if (minLvl === 999) {
          alert("ห้องนี้จะปลดล็อกในเร็วๆ นี้ค่ะ 🏠");
        } else {
          alert(`ห้องนี้จะปลดล็อกเมื่อตัวน้อยเลเวล ${minLvl} นะคะ 🏠`);
        }
        return;
      }
      
      // Auto-set the main action position for the selected room
      if (room === "bedroom") {
        state.activePosition = "pos-bed";
      } else if (room === "dining") {
        state.activePosition = "pos-table";
      } else if (room === "bathroom") {
        state.activePosition = "pos-bath";
      } else if (room === "garden") {
        state.activePosition = "pos-bench";
      } else {
        state.activePosition = "pos-carpet";
      }
      
      changeRoom(room);
      
      // Check quests on room/action teleport
      if (room === "bedroom") {
        checkQuestCompletion("mq_tir1");
      } else if (room === "bathroom") {
        checkQuestCompletion("mq_bor2");
        checkQuestCompletion("mq_ang3");
      } else if (room === "garden") {
        checkQuestCompletion("mq_hap3");
      }
      
      closeModal("modalHouse");
    });
  });
  
  // Inventory Use binding
  document.getElementById("useInventoryItemBtn").addEventListener("click", useActiveBagItem);
  
  // Bag category sub-tabs bindings
  document.getElementById("modalTabBagFood").addEventListener("click", () => filterBag("food"));
  document.getElementById("modalTabBagDrink").addEventListener("click", () => filterBag("drink"));
  document.getElementById("modalTabBagFurniture").addEventListener("click", () => filterBag("furniture"));
  document.getElementById("modalTabBagClothes").addEventListener("click", () => filterBag("clothes"));
  
  // Bind Quiz buttons (Stress Test)
  document.getElementById("startTestBtn").addEventListener("click", startTest);
  document.getElementById("prevQuestBtn").addEventListener("click", proceedPrev);
  document.getElementById("nextQuestBtn").addEventListener("click", proceedNext);
  document.getElementById("finishTestBtn").addEventListener("click", resetTest);
  
  // Bind Quiz choices
  document.querySelectorAll(".quiz-options .option-row").forEach(btn => {
    btn.addEventListener("click", () => {
      const score = parseInt(btn.getAttribute("data-score"));
      handleOptionSelect(score);
    });
  });
  
  // Bind AI Chat Form
  document.getElementById("chatForm").addEventListener("submit", handleSendMessage);
  
  // Bind Chat subtabs
  document.getElementById("subTabTestBtn").addEventListener("click", () => {
    document.getElementById("subTabTestBtn").classList.add("active");
    document.getElementById("subTabChatBtn").classList.remove("active");
    document.getElementById("subpage-test-qa").classList.add("active");
    document.getElementById("subpage-test-chat").classList.remove("active");
  });
  document.getElementById("subTabChatBtn").addEventListener("click", () => {
    document.getElementById("subTabChatBtn").classList.add("active");
    document.getElementById("subTabTestBtn").classList.remove("active");
    document.getElementById("subpage-test-chat").classList.add("active");
    document.getElementById("subpage-test-qa").classList.remove("active");
    
    // Show egg message inside AI chat area if Level 0
    if (state.level < 1) {
      const container = document.getElementById("chatMsgContainer");
      container.innerHTML = `
        <div class="msg-bubble incoming system-msg">
          <div class="msg-content">🥚 ร่างกายยังอยู่ในไข่... ฟักไข่ให้สำเร็จก่อน (เลเวล 1) เพื่อคุยและฟื้นฟูจิตใจกับ Joy AI นะคะ ✨</div>
        </div>
      `;
    } else {
      const container = document.getElementById("chatMsgContainer");
      if (container.querySelector(".system-msg")) {
        container.innerHTML = `
          <div class="msg-bubble incoming">
            <div class="msg-content">สวัสดีจ้า ฉัน Joy AI ยินดีที่ได้คุยกับคุณนะ! วันนี้คุณมีเรื่องกังวลใจ เครียด หรืออยากระบายอะไรไหม? พิมพ์บอกฉันได้เสมอนะ 💙</div>
            <div class="msg-time">เมื่อสักครู่</div>
          </div>
        `;
      }
    }
  });
  
  // Bind Diary Mood emoji options
  document.querySelectorAll(".mood-emoji-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.getAttribute("data-mood");
      selectMoodEmoji(btn, mood);
    });
  });
  document.getElementById("saveDiaryBtn").addEventListener("click", saveDiaryEntry);
  
  // Bind Quests Grand Claim
  document.getElementById("claimGrandBtn").addEventListener("click", claimGrandReward);
  
  // Bind Games play
  document.getElementById("playMemoryGameBtn").addEventListener("click", startMemoryGame);
  document.getElementById("closeGameBtn").addEventListener("click", closeGamePlay);
  document.getElementById("backToGameMenuBtn").addEventListener("click", () => {
    document.getElementById("gameIntroSec").style.display = "flex";
    document.getElementById("memoryGamePlaySec").style.display = "none";
  });

  // Bind Coloring Book Art Game play
  const playColoringBtn = document.getElementById("playColoringGameBtn");
  if (playColoringBtn) playColoringBtn.addEventListener("click", startColoringGame);
  
  const closeColoringBtn = document.getElementById("closeColoringGameBtn");
  if (closeColoringBtn) closeColoringBtn.addEventListener("click", closeColoringGame);
  
  const easyTabBtn = document.getElementById("coloringEasyTabBtn");
  if (easyTabBtn) {
    easyTabBtn.addEventListener("click", () => switchColoringTab("easy"));
  }
  const hardTabBtn = document.getElementById("coloringHardTabBtn");
  if (hardTabBtn) {
    hardTabBtn.addEventListener("click", () => switchColoringTab("hard"));
  }
  
  document.querySelectorAll(".coloring-palette .color-swatch").forEach(swatch => {
    swatch.addEventListener("click", () => {
      selectColorSwatch(swatch, swatch.getAttribute("data-color"));
    });
  });

  document.querySelectorAll(".coloring-page-selector .coloring-page-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pageId = parseInt(btn.getAttribute("data-page"), 10);
      if (pageId >= 7 && state.level < 55) {
        alert("รูปภาพระดับยากจะปลดล็อกเมื่อเลเวล 55 นะคะ 🎨🔒");
        return;
      }
      selectColoringPage(btn, pageId);
    });
  });
  
  // Paint Brush Drawing & Slider Event bindings
  const coloringCanvas = document.getElementById("coloringCanvas");
  const brushSlider = document.getElementById("brushSizeSlider");
  const brushVal = document.getElementById("brushSizeVal");
  const hueSlider = document.getElementById("hueColorSlider");
  const customColorPreview = document.getElementById("customColorPreview");
  const zoomColoringBtn = document.getElementById("zoomColoringBtn");
  const coloringContainer = document.getElementById("coloringContainer");
  const coloringViewport = document.getElementById("coloringViewport");

  if (brushSlider && brushVal) {
    brushSlider.addEventListener("input", () => {
      brushVal.textContent = brushSlider.value + "px";
    });
  }

  const lightnessSlider = document.getElementById("lightnessColorSlider");
  const lightnessVal = document.getElementById("lightnessVal");

  if (hueSlider && customColorPreview && lightnessSlider && lightnessVal) {
    const updateCustomColor = () => {
      const hue = hueSlider.value;
      const lightness = lightnessSlider.value;
      const color = "hsl(" + hue + ", 100%, " + lightness + "%)";
      
      selectedColor = color;
      customColorPreview.style.background = color;
      lightnessVal.textContent = lightness + "%";

      // Dynamically update lightness slider background gradient
      lightnessSlider.style.background = "linear-gradient(to right, #000000, hsl(" + hue + ", 100%, 50%), #ffffff)";

      // Deactivate Swatch selection borders
      document.querySelectorAll(".coloring-palette .color-swatch").forEach(el => {
        el.classList.remove("active");
      });
    };

    hueSlider.addEventListener("input", updateCustomColor);
    hueSlider.addEventListener("change", updateCustomColor);
    lightnessSlider.addEventListener("input", updateCustomColor);
    lightnessSlider.addEventListener("change", updateCustomColor);
  }

  let currentZoom = 1;
  if (zoomColoringBtn && coloringContainer) {
    zoomColoringBtn.addEventListener("click", () => {
      if (currentZoom === 1) {
        currentZoom = 2;
        coloringContainer.style.width = "500px";
        coloringContainer.style.height = "500px";
        zoomColoringBtn.textContent = "🔍 ซูมขยายภาพ (Zoom: 2x)";
        if (coloringViewport) {
          coloringViewport.scrollLeft = 125;
          coloringViewport.scrollTop = 125;
        }
      } else {
        currentZoom = 1;
        coloringContainer.style.width = "250px";
        coloringContainer.style.height = "250px";
        zoomColoringBtn.textContent = "🔍 ซูมขยายภาพ (Zoom: 1x)";
      }
    });
  }

  if (coloringCanvas) {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getCoordinates = (e) => {
      const rect = coloringCanvas.getBoundingClientRect();
      let clientX, clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const x = (clientX - rect.left) * (coloringCanvas.width / rect.width);
      const y = (clientY - rect.top) * (coloringCanvas.height / rect.height);
      return [x, y];
    };

    const startDraw = (e) => {
      isDrawing = true;
      const coords = getCoordinates(e);
      lastX = coords[0];
      lastY = coords[1];
      
      const ctx = coloringCanvas.getContext("2d");
      const brushSize = parseInt(brushSlider ? brushSlider.value : "8", 10);
      ctx.beginPath();
      ctx.arc(lastX, lastY, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = selectedColor;
      ctx.fill();
    };

    const draw = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const coords = getCoordinates(e);
      const x = coords[0];
      const y = coords[1];
      const ctx = coloringCanvas.getContext("2d");
      const brushSize = parseInt(brushSlider ? brushSlider.value : "8", 10);
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      
      lastX = x;
      lastY = y;
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    coloringCanvas.addEventListener("mousedown", startDraw);
    coloringCanvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDraw);

    coloringCanvas.addEventListener("touchstart", startDraw, { passive: false });
    coloringCanvas.addEventListener("touchmove", draw, { passive: false });
    window.addEventListener("touchend", stopDraw);
  }
  
  const clearColoringBtn = document.getElementById("clearColoringBtn");
  if (clearColoringBtn) clearColoringBtn.addEventListener("click", clearColoringBook);
  
  const saveColoringBtn = document.getElementById("saveColoringBtn");
  if (saveColoringBtn) saveColoringBtn.addEventListener("click", saveColoringBook);

  
  // Bind Sort Game play
  const playSortBtn = document.getElementById("playSortGameBtn");
  if (playSortBtn) playSortBtn.addEventListener("click", startSortGame);
  
  const closeSortBtn = document.getElementById("closeSortGameBtn");
  if (closeSortBtn) closeSortBtn.addEventListener("click", closeSortGame);
  
  const backSortMenuBtn = document.getElementById("backToSortGameMenuBtn");
  if (backSortMenuBtn) backSortMenuBtn.addEventListener("click", closeSortGame);
  
  document.querySelectorAll(".sort-options-row .sort-btn-choice").forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      checkSortChoice(category);
    });
  });
  
  // Bind Shooter Game play
  const playShooterBtn = document.getElementById("playShooterGameBtn");
  if (playShooterBtn) playShooterBtn.addEventListener("click", startShooterGame);
  
  const closeShooterBtn = document.getElementById("closeShooterGameBtn");
  if (closeShooterBtn) closeShooterBtn.addEventListener("click", closeShooterGame);
  
  const backShooterMenuBtn = document.getElementById("backToShooterGameMenuBtn");
  if (backShooterMenuBtn) backShooterMenuBtn.addEventListener("click", closeShooterGame);
  
  // Bind shop category sub-tabs
  document.querySelectorAll(".shop-categories .shop-cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-cat");
      if (cat === "clothes" && state.level < 6) {
        alert("ร้านค้าเครื่องแต่งกายจะปลดล็อกเมื่อเลเวล 6 นะคะ 👕");
        return;
      }
      if (cat === "furniture" && state.level < 1) {
        alert("ร้านค้าสกินจะปลดล็อกเมื่อตัวน้อยเลเวล 1 นะคะ 👕👗");
        return;
      }

      renderShop(cat);
    });
  });
  
  // Bind Profile rename
  document.getElementById("saveNameBtn").addEventListener("click", saveNewPetName);


  // Bind Reset Game progress
  document.getElementById("resetProgressBtn").addEventListener("click", () => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลทั้งหมดเพื่อเริ่มเล่นใหม่ตั้งแต่ต้น? ⚠️")) {
      state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      state.lastResetDate = new Date().toDateString();
      saveState();
      updateUI();
      closeModal("modalProfile");
      alert("รีเซ็ตข้อมูลสำเร็จแล้วจ้า! เริ่มต้นดูแลใจใหม่ไปด้วยกันนะคะ 💙");
      window.location.reload();
    }
  });
  
  // Reset initial UI states
  resetTest();
  updateUI();
});


// ==========================================================================
// COLORING BOOK ART THERAPY SYSTEM (Level 30+)
// ==========================================================================

let selectedColor = "#ff4757";
let currentColoringPage = 0;

// Image objects for caching/drawing the composite drawings
const coloringImages = {
  easy: null,
  hard: null
};

function startColoringGame() {
  if (state.level < 30) {
    alert("สมุดระบายสีบำบัดใจจะปลดล็อกเมื่อเลเวล 30 นะคะ 🎨");
    return;
  }
  
  // Set up difficulty tabs display based on level 55 lock
  const hardTabBtn = document.getElementById("coloringHardTabBtn");
  if (hardTabBtn) {
    if (state.level < 55) {
      hardTabBtn.innerHTML = "ยาก 🔒 (เลเวล 55)";
      hardTabBtn.style.opacity = "0.6";
    } else {
      hardTabBtn.innerHTML = "ยาก 🔴";
      hardTabBtn.style.opacity = "1";
    }
  }

  // Pre-load images
  if (!coloringImages.easy) {
    coloringImages.easy = new Image();
    coloringImages.easy.src = "186396.jpg";
  }
  if (!coloringImages.hard) {
    coloringImages.hard = new Image();
    coloringImages.hard.src = "186395.jpg";
  }

  // Show Easy tab and corresponding buttons initially
  switchColoringTab("easy");

  document.getElementById("gameIntroSec").style.display = "none";
  document.getElementById("coloringGamePlaySec").style.display = "block";

  // Select page 0 by default
  const defaultBtn = document.querySelector(`.coloring-page-btn[data-page="0"]`);
  if (defaultBtn) {
    selectColoringPage(defaultBtn, 0);
  }
}

function switchColoringTab(difficulty) {
  if (difficulty === "hard" && state.level < 55) {
    alert("รูปภาพระดับยากจะปลดล็อกเมื่อเลเวล 55 นะคะ 🎨🔒");
    return;
  }

  const easyTab = document.getElementById("coloringEasyTabBtn");
  const hardTab = document.getElementById("coloringHardTabBtn");

  if (difficulty === "easy") {
    easyTab.classList.add("active");
    easyTab.style.background = "linear-gradient(135deg, #3b82f6, #60a5fa)";
    easyTab.style.color = "white";
    easyTab.style.boxShadow = "0 4px 10px rgba(59, 130, 246, 0.3)";
    easyTab.style.border = "none";

    hardTab.classList.remove("active");
    hardTab.style.background = "rgba(255,255,255,0.05)";
    hardTab.style.color = "#cbd5e1";
    hardTab.style.boxShadow = "none";
    hardTab.style.border = "1px solid rgba(255,255,255,0.1)";

    // Show easy buttons, hide hard buttons
    document.querySelectorAll(".coloring-page-btn").forEach(btn => {
      if (btn.getAttribute("data-difficulty") === "easy") {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    });
  } else {
    hardTab.classList.add("active");
    hardTab.style.background = "linear-gradient(135deg, #ef4444, #f87171)";
    hardTab.style.color = "white";
    hardTab.style.boxShadow = "0 4px 10px rgba(239, 68, 68, 0.3)";
    hardTab.style.border = "none";

    easyTab.classList.remove("active");
    easyTab.style.background = "rgba(255,255,255,0.05)";
    easyTab.style.color = "#cbd5e1";
    easyTab.style.boxShadow = "none";
    easyTab.style.border = "1px solid rgba(255,255,255,0.1)";

    // Show hard buttons, hide easy buttons
    document.querySelectorAll(".coloring-page-btn").forEach(btn => {
      if (btn.getAttribute("data-difficulty") === "hard") {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    });
  }
}

function closeColoringGame() {
  document.getElementById("gameIntroSec").style.display = "flex";
  document.getElementById("coloringGamePlaySec").style.display = "none";
}

function selectColorSwatch(swatchEl, colorHex) {
  document.querySelectorAll(".coloring-palette .color-swatch").forEach(el => {
    el.classList.remove("active");
  });
  swatchEl.classList.add("active");
  selectedColor = colorHex;
}

function drawColoringPage(pageId) {
  const canvas = document.getElementById("coloringCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  // Clear to white
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Clear overlay SVG
  const overlaySvg = document.getElementById("coloringOverlaySvg");
  if (overlaySvg) overlaySvg.innerHTML = "";

  if (pageId === 0) {
    // Render Page 0 (Joy Blob SVG) onto canvas
    const svgEl = document.getElementById("joyBlobSvgTemplate");
    if (!svgEl) return;
    
    // Clone and serialize
    const clone = svgEl.cloneNode(true);
    clone.style.display = "block";
    const svgString = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
    };
    img.src = url;
    
    if (overlaySvg) {
      overlaySvg.setAttribute("viewBox", "0 0 200 200");
      overlaySvg.innerHTML = svgEl.innerHTML;
    }
  } else if (pageId === 13) {
    // Blank Paper: Keep overlaySvg empty, do not add any image!
    if (overlaySvg) overlaySvg.setAttribute("viewBox", "0 0 400 400");
  } else {

    // Crop from composite JPG images
    const img = pageId >= 7 ? coloringImages.hard : coloringImages.easy;
    if (!img) return;

    // Define crops for 1312x1199 (easy) and 1316x1195 (hard)
    let sx, sy, sw, sh;
    const padding = 12; // bypass outer borders

    if (pageId < 7) {
      // Easy image (1312x1199, 3 cols, 2 rows)
      const colWidth = 1312 / 3;
      const rowHeight = 1199 / 2;
      const colIdx = (pageId - 1) % 3;
      const rowIdx = Math.floor((pageId - 1) / 3);

      sx = colIdx * colWidth + padding;
      sy = rowIdx * rowHeight + padding;
      sw = colWidth - padding * 2;
      sh = rowHeight - padding * 2;
    } else {
      // Hard image (1316x1195, 3 cols, 2 rows)
      const colWidth = 1316 / 3;
      const rowHeight = 1195 / 2;
      const colIdx = (pageId - 7) % 3;
      const rowIdx = Math.floor((pageId - 7) / 3);

      sx = colIdx * colWidth + padding;
      sy = rowIdx * rowHeight + padding;
      sw = colWidth - padding * 2;
      sh = rowHeight - padding * 2;
    }

    if (overlaySvg) {
      // Set SVG attributes to define the crop area
      overlaySvg.setAttribute("viewBox", `${sx} ${sy} ${sw} ${sh}`);
      
      // Create an <image> element inside SVG
      const imgEl = document.createElementNS("http://www.w3.org/2000/svg", "image");
      imgEl.setAttribute("href", pageId >= 7 ? "186395.jpg" : "186396.jpg");
      if (pageId >= 7) {
        imgEl.setAttribute("width", "1316");
        imgEl.setAttribute("height", "1195");
      } else {
        imgEl.setAttribute("width", "1312");
        imgEl.setAttribute("height", "1199");
      }
      overlaySvg.appendChild(imgEl);
    }

  }
}

function selectColoringPage(btnEl, pageId) {
  document.querySelectorAll(".coloring-page-selector .coloring-page-btn").forEach(el => {
    el.classList.remove("active");
    el.style.background = "rgba(255,255,255,0.05)";
    el.style.borderColor = "transparent";
    el.style.color = "#cbd5e1";
  });
  
  btnEl.classList.add("active");
  btnEl.style.background = "rgba(255,255,255,0.15)";
  btnEl.style.borderColor = "#fbbf24";
  btnEl.style.color = "#ffffff";
  
  currentColoringPage = pageId;
  drawColoringPage(pageId);
}

function clearColoringBook() {
  drawColoringPage(currentColoringPage);
}

function saveColoringBook() {
  closeColoringGame();
  triggerPetAnimation("happy");
  setPetBubbleText(`สมุดระบายสีของหนูเสร็จสมบูรณ์แล้วค่ะ! 🎨✨ ผลงานชิ้นนี้มีสีสันที่สวยงามและเยียวยาหัวใจได้ดีมากๆ เลย ขอบคุณพี่มากๆ นะคะ 💖🥰`);
}

// Queue-based DFS Flood Fill Algorithm for Pixel-level coloring
function floodFill(ctx, startX, startY, fillColor) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Convert hex color to RGBA
  const fillR = parseInt(fillColor.slice(1, 3), 16);
  const fillG = parseInt(fillColor.slice(3, 5), 16);
  const fillB = parseInt(fillColor.slice(5, 7), 16);
  const fillA = 255;

  const getPixel = (x, y) => {
    const idx = (y * width + x) * 4;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  const setPixel = (x, y) => {
    const idx = (y * width + x) * 4;
    data[idx] = fillR;
    data[idx + 1] = fillG;
    data[idx + 2] = fillB;
    data[idx + 3] = fillA;
  };

  const [startR, startG, startB] = getPixel(startX, startY);

  // If clicking on dark border line (gray or black outline), do not fill
  if (startR < 130 && startG < 130 && startB < 130) return;

  // If already filled with the target color, do not fill
  if (startR === fillR && startG === fillG && startB === fillB) return;

  // Stack/Queue-based fill (DFS is highly performant in JS)
  const stack = [[startX, startY]];
  const visited = new Uint8Array(width * height);
  visited[startY * width + startX] = 1;

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    setPixel(x, y);

    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const idx = ny * width + nx;
        if (!visited[idx]) {
          visited[idx] = 1;
          const [nr, ng, nb] = getPixel(nx, ny);
          // Fill if target pixel is light (not outline)
          if (nr > 130 && ng > 130 && nb > 130) {
            stack.push([nx, ny]);
          }
        }
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}
// ==========================================
// RELAXING MUSIC / ASMR LOGIC
// ==========================================

function toggleRelaxSound(soundId) {
  const audioEl = document.getElementById(soundId);
  if (!audioEl) return;
  
  // Find the play button associated with this sound
  // We can locate it by finding the button that calls toggleRelaxSound(soundId)
  const allPlayBtns = document.querySelectorAll('.play-btn');
  let targetBtn = null;
  allPlayBtns.forEach(btn => {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(soundId)) {
      targetBtn = btn;
    }
  });

  if (audioEl.paused) {
    audioEl.play().catch(e => console.log('Audio play failed:', e));
    if (targetBtn) {
      targetBtn.innerText = '⏸';
      targetBtn.classList.add('playing');
    }
  } else {
    audioEl.pause();
    if (targetBtn) {
      targetBtn.innerText = '▶';
      targetBtn.classList.remove('playing');
    }
  }
}

function changeVolume(soundId, value) {
  const audioEl = document.getElementById(soundId);
  if (audioEl) {
    audioEl.volume = parseFloat(value);
  }
}

// Bind to window context
window.toggleRelaxSound = toggleRelaxSound;
window.changeVolume = changeVolume;
