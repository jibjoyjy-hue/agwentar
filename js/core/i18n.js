// js/core/i18n.js: ระบบแปลภาษา ไทย/อังกฤษ
// ==========================================
// TRANSLATION & LOCALIZATION SYSTEM
// ==========================================
const APP_TRANSLATIONS = {
  text: {
    // Top Bar & UI
    "เริ่มทำกิจกรรม": "Start Activity",
    "🎉 ทำกิจกรรมสำเร็จ! สามารถรับรางวัลความสุขได้แล้วน้า 🌟": "🎉 Activity completed! You can claim your reward now 🌟",
    "กรุณาพิมพ์ข้อความก่อนส่งให้ตรวจนะคะ!": "Please type your response before submitting!",
    "🤖 เกวนทาร์กำลังอ่านข้อความของคุณ...": "🤖 Gwentar is reading your message...",
    "กำลังประเมินผล...": "Analyzing...",
    "💖 เกวนทาร์รับรู้ความรู้สึกและอยู่เคียงข้างคุณแล้วค่ะ!": "💖 Gwentar acknowledges your feelings and is here for you!",
    "🥺 ลองใช้เวลาตั้งใจเขียนใหม่อีกนิดน้าเก่งแล้วค่ะ": "🥺 Try to reflect and write a bit more, you're doing great!",
    "กรุณาใช้เวลาทบทวนและอธิบายความรู้สึกเขียนระบายเพิ่มเติมอีกสักนิดนะคะ 💕": "Please take a moment to reflect and write a bit more detail 💕",
    "ลองเขียนบอกสิ่งของสีน้ำเงิน 3 อย่างรอบตัวคุณให้ชัดเจนหน่อยนะคะ 🛋️": "Please list 3 blue objects around you clearly 🛋️",
    "ลองนึกทบทวนเขียนความสำเร็จเล็กๆ 3 อย่างให้ครบถ้วนนะคะ 🌟": "Please list 3 small achievements completely 🌟",
    "ลองนึกทบทวนเขียนขอบคุณสิ่งดีๆ ให้ครบ 3 อย่างนะคะ 🌟": "Please list 3 things you are grateful for completely 🌟",
    "ระบายความโกรธของคุณออกมาให้หมดใจได้เลยค่ะ เกวนทาร์รอรับฟังอยู่นะคะ 😡": "Feel free to express your anger completely, Gwentar is listening 😡",
    "ส่งให้เกวนทาร์ตรวจ ✨": "Submit to Gwentar ✨",
    "ยืนยันทำสำเร็จ ✨": "Confirm Done ✨",
    "พิมพ์ขอบคุณสิ่งดีๆ 3 ข้อที่นี่...": "Type 3 things you are grateful for here...",
    "พิมพ์สิ่งเล็กๆ ที่ทำได้ดี 3 ข้อที่นี่...": "Type 3 small achievements here...",
    "พิมพ์สิ่งของสีน้ำเงิน 3 อย่างรอบตัวที่นี่...": "Type 3 blue objects around you here...",
    "🧱 หอคอยบล็อกสายรุ้ง (Block Stack Jump)": "🧱 Rainbow Block Tower (Block Stack Jump)",
    "🔒 ปลดล็อกเมื่อถึง เลเวล 5": "🔒 Unlocks at Level 5",
    "คะแนน: ": "Score: ",
    "คะแนนสูงสุด: ": "High Score: ",
    "กระโดด!": "Jump!",
    "Next Block": "Next Block",
    "เล่นอีกครั้ง 🔄": "Play Again 🔄",
    "ออก ✕": "Exit ✕",
    "ได้รับ: ": "Earned: ",
    "พลังชีวิต / สุขภาพกาย": "HP / Physical Health",
    "พลังงาน / ความกระปรี้กระเปร่า": "Energy / Vitality",
    "ไข่สั่นดุ๊กดิ๊ก! เล่นอีกนิดขยับอีกหน่อยใกล้จะฟักแล้วน้า (+10 EXP) ✨": "The egg is shaking! Play a bit more to hatch it (+10 EXP) ✨",
    "🥚 เลือกคู่หูเกวนทาร์": "🥚 Select Gwentar Companion",
    "เลือกน้องคู่หูเพื่อร่วมเดินทางดูแลจิตใจกันนะคะ": "Select a companion to join your mindfulness journey",
    "ยืนยันเลือก": "Confirm Selection",
    
    // Stand / Sit / Idle
    "🧍 ยืน": "🧍 Stand",
    "🧎 นั่ง": "🧎 Sit",
    "💃 ดุ๊กดิ๊ก": "💃 Wiggle",
    
    // Quick Actions
    "กระเป๋า": "Bag",
    "บ้าน": "House",
    "เช็คอิน": "Check-in",
    
    // Select Pet
    "เลือกสัตว์เลี้ยง": "Select Companion",
    "เลือกเพื่อนที่จะร่วมเดินทางดูแลใจไปกับคุณ": "Select a companion to join your journey",
    "ยืนยันเลือกน้อง": "Confirm Selection",
    "✨ เลือกเพื่อนคู่หูตัวแรกของคุณได้ฟรี!": "✨ Select your first companion for free!",
    "🪙 การเปลี่ยนตัวละครสัตว์เลี้ยงใหม่ใช้ 10,000 เหรียญทอง": "🪙 Switching companions costs 10,000 Coins",
    "✨ ใช้งานอยู่": "✨ Active",
    
    // Profile
    "ข้อมูลสัตว์เลี้ยง": "Pet Information",
    "♂ ชาย": "♂ Boy",
    "♀ หญิง": "♀ Girl",
    "ความสุข": "Happiness",
    "พลังงาน": "Energy",
    "นิสัย": "Personality",
    "ขี้อ้อน, รักสงบ, รักธรรมชาติ": "Sweet, Calm, Nature-lover",
    "วันเกิด": "Birthday",
    "15 ธันวาคม": "December 15",
    "ของที่ชอบ": "Fav Items",
    "ขนม, ของเล่นบางชนิด, ดอกไม้": "Snacks, Toys, Flowers",
    "ดูตัวละครอื่น": "View Other Pets",
    
    // Home map / Rooms
    "บ้านของน้อง": "Companion House",
    "ห้องนอน": "Bedroom",
    "ห้องอาหาร": "Dining Room",
    "ห้องนั่งเล่น": "Living Room",
    "ห้องน้ำ": "Bathroom",
    "สวน": "Garden",
    "ห้องกิจกรรม": "Activity Room",
    "ห้องแต่งตัว": "Dressing Room",
    "💖 ความสุข +10": "💖 Happiness +10",
    "⚡ พลังงาน +20": "⚡ Energy +20",
    "💖 ความสุข +15": "💖 Happiness +15",
    "⚡ พลังงาน +15": "⚡ Energy +15",
    "💖 ความสุข +8": "💖 Happiness +8",
    "⚡ พลังงาน +10": "⚡ Energy +10",
    "💖 ความสุข +15": "💖 Happiness +15",
    "⚡ พลังงาน -10": "⚡ Energy -10",
    "นอน": "Sleep",
    "อ่านหนังสือ": "Read Book",
    "ฟังเพลง": "Listen Music",
    "อาบน้ำ": "Bath",
    "ถูสบู่": "Scrub Soap",
    "ทำความสะอาด": "Clean Up",
    "อุปกรณ์": "Supplies",
    "สบู่": "Soap",
    "แชมพู": "Shampoo",
    
    // Garden & Farm
    "🌱 แปลงปลูกผักของน้อง:": "🌱 Your Crop Plots:",
    "🪴 รดน้ำต้นไม้": "🪴 Water Plants",
    "🌱 เลือกปลูกผัก": "🌱 Choose Seed",
    "🍃 เดินเล่น": "🍃 Walk Around",
    "← กลับสวน": "← Back to Garden",
    "🌾 ฟาร์มปลูกผักหรรษา": "🌾 Happy Farm Garden",
    "🌱 แตะแปลงดินเพื่อเลือกเมล็ดพันธุ์ / รดน้ำ / เก็บเกี่ยวผัก": "🌱 Tap plots to select seed / water / harvest",
    "💧 รดน้ำเร่งโต (-5s)": "💧 Speed Water (-5s)",
    "🧺 เก็บเกี่ยวทั้งหมด": "🧺 Harvest All",
    "🌾 เมล็ดพันธุ์ผัก (แตะเลือกเพื่อปลูก):": "🌾 Vegetable Seeds (Tap to plant):",

    // Dressing room
    "บันทึก": "Save",
    "ขนาดเครื่องประดับ:": "Apparel Size:",
    "เครื่องแต่งกาย": "Clothes",
    "หมวก": "Hats",
    "แว่นตา": "Glasses",
    "ปีก": "Wings",
    "ชุดเซ็ต": "Outfits",
    
    // Activity room
    "🎹 เล่นเปียโน/ฟังเพลง": "🎹 Piano / Music",
    "🎨 วาดรูป/ระบายสี": "🎨 Draw / Color",
    "⚽ มินิเกมฮีลใจ": "⚽ Healing Games",
    
    // Mood test
    "ทดสอบอารมณ์ + AI": "Mood Test + AI",
    "แบบทดสอบอารมณ์": "Mood Test Questionnaire",
    "ข้อ 1/10": "Question 1/10",
    "ตื่นนอนวันนี้ คุณรู้สึกอย่างไร?": "How do you feel waking up today?",
    "ต่อไป": "Next",
    "วิเคราะห์อารมณ์ของคุณวันนี้": "Daily Mood Analysis",
    "คำแนะนำเพื่อหัวใจที่แข็งแรงจาก Gwentar": "Supportive words from Gwentar for a healthy heart",
    "😊 วิเคราะห์อารมณ์": "😊 Analysis",
    "คำอธิบายผสมผสานอารมณ์ของคุณ...": "Combining your mood stats...",
    "คะแนนอารมณ์ของคุณ": "Your Mood Score",
    "ทำแบบทดสอบอีกครั้ง": "Restart Test",
    "สวัสดีค่ะ เราพร้อมรับฟังและให้กำลังใจคุณเสมอนะ 💙": "Hello! I am always here to listen and comfort you 💙",
    "พิมพ์ข้อความ...": "Type message...",
    
    // Diary
    "กรกฎาคม 2569": "July 2026",
    "อา": "Sun",
    "จ": "Mon",
    "อ": "Tue",
    "พ": "Wed",
    "พฤ": "Thu",
    "ศ": "Fri",
    "ส": "Sat",
    "มีความสุข": "Happy",
    "สงบ": "Calm",
    
    // Coloring
    "📝 วาดอิสระ": "📝 Free Drawing",
    "🧽 ยางลบ": "🧽 Eraser",
    "ขนาดหัวแปรง:": "Brush Size:",
    "ล้างภาพ": "Clear",
    "🔍 ซูม x2": "🔍 Zoom x2",
    "บันทึกความสุข (+50 🪙)": "Save Happiness (+50 🪙)",
    "ออก": "Exit",
    
    // Shop & Bag tabs
    "อาหาร": "Food",
    "เครื่องดื่ม": "Drinks",
    "แลกเปลี่ยน": "Exchange",
    "ขายผลผลิต": "Sell Crops",
    
    // Settings
    "ชื่อน้อง": "Pet Name",
    "เสียง": "Sound FX",
    "ดนตรี": "BGM Volume",
    "ภาษา": "Language",
    "ภาษาไทย": "Thai",
    "ภาษาอังกฤษ": "English",
    "ธีม (Theme)": "App Theme",
    "เสียงดนตรีประกอบ (Background Music) 🎵": "Background Music (BGM) 🎵",
    "❌ ปิดเสียงเพลงประกอบ": "❌ Mute BGM",
    "🐱 Cat Bag - ชิลสบายๆ": "🐱 Cat Bag - Chill Out",
    "😺 Cat Friend - อบอุ่นสนุกสนาน": "😺 Cat Friend - Warm & Cozy",
    "🌟 Catch the Star - ชวนฝันผ่อนคลาย": "🌟 Catch the Star - Relaxing Dream",
    "🌙 Dream Cat - เคลิ้มเคลิ้มสบายใจ": "🌙 Dream Cat - Sleepy Purr",
    "🍋 Lemon - สดใสน่ารัก": "🍋 Lemon - Cute & Fresh",
    "🍐 Pear - หวานๆ นุ่มนวล": "🍐 Pear - Sweet & Gentle",
    "💖 Together Always - อบอุ่นอบอวล": "💖 Together Always - Warmly Together",
    "🌌 Lonely Echoes - ค่ำคืนสงบเงียบ": "🌌 Lonely Echoes - Quiet Midnight",
    "▶️ เล่นเพลง": "▶️ Play",
    "⏹️ หยุดเพลง": "⏹️ Stop",
    "แจ้งเตือน": "Notifications",
    "สำรองข้อมูล": "Backup Data",
    "🧹 รีเซ็ตข้อมูลเกมทั้งหมด (เลเวล 0)": "🧹 Reset All Game Data (Level 0)",
    "เวอร์ชัน 1.0.0": "Version 1.0.0",
    
    // More menu
    "เมนูเพิ่มเติม": "More Menu",
    "เสียงดนตรีบำบัดใจ": "Mindfulness Soundscapes",
    "กล่องจดหมาย": "Mailbox",
    "กิจกรรม": "Activities",
    "เชิญเพื่อน": "Invite Friends",
    "แลกโค้ด": "Redeem Code",
    "ช่วยเหลือ": "Help Support",
    "เกี่ยวกับเรา": "About Us",
    "รีเซ็ตข้อมูลเกมทั้งหมด": "Reset Game Data",
    "1.โฮม": "1.Home",

    // Nav items
    "1.หน้าหลัก": "1.Home",
    "2.ข้อมูล": "2.Info",
    "3.บ้าน": "3.Home Map",
    "4.ทดสอบ+AI": "4.AI Mood",
    "5.ไดอารี่": "5.Diary",
    "6.เควส": "6.Quests",
    "7.มินิเกม": "7.Games",
    "8.ร้านค้า": "8.Shop",
    "9.กระเป๋า": "9.Bag",
    "10.ดนตรีบำบัด": "10.Music",
    "11.ตั้งค่า": "11.Settings",
    
    // Profile / Info Screen
    "คู่หูของปะป๊ามะม๊า": "Our Companion",
    "ข้อมูลทั่วไป": "General Info",
    "ระดับพลังงาน": "Stats & Energy",
    "ความทรงจำ": "Memories",
    "เพศคู่หู": "Gender",
    "เลเวลคู่หู": "Pet Level",
    "เหรียญสะสม": "Gold Coins",
    "เพชรสะสม": "Gems Owned",
    "ชาย ♂️": "Boy ♂️",
    "หญิง ♀️": "Girl ♀️",
    "เลเวล": "Level",
    "เหรียญ": "Coins",
    "เพชร": "Gems",
    "ข้อมูลระดับพลังงาน": "Energy & Status Levels",
    "หัวใจ/ความสุข": "Happiness",
    "ความกระปรี้กระเปร่า": "Energy",
    "ความทรงจำแสนอบอุ่น": "Warm Memories",
    "นี่คืออัลบั้มบันทึกความจำของปะป๊ามะม๊ากับน้องเกวนทาร์ค่ะ": "This is the memory album of you and Gwentar",
    "ยังไม่มีความทรงจำที่ถูกบันทึกไว้ในระบบเลยค่ะ...": "No memories saved yet...",
    "ไปคุยเล่น หรือปลูกผักสะสมอารมณ์กันเถอะนะคะ!": "Let's chat or grow crops to collect moments!",
    
    // Home Screen
    "ส่ง": "Send",
    "🥛 ป้อนอาหาร": "🥛 Feed",
    "🧼 อาบน้ำ": "🧼 Clean",
    "💖 กอดน้อง": "💖 Hug",
    "😴 พานอน": "😴 Sleep",
    "กำลังคิด... 🤔": "Thinking... 🤔",
    
    // Gardening
    "แปลงผักบำบัดใจ": "Mindfulness Garden",
    "รดน้ำต้นไม้จิตใจ": "Water Garden",
    "รดน้ำจิตใจ (+5 🪙)": "Water Garden (+5 🪙)",
    "🌱 เลือกเมล็ดพันธุ์ปลูกผัก": "🌱 Select Seed to Plant",
    "แครอท": "Carrot",
    "มะเขือเทศ": "Tomato",
    "ข้าวโพด": "Corn",
    "สตรอว์เบอร์รี่": "Strawberry",
    "ใช้เวลา": "Time:",
    "รับรางวัล": "Claim",
    "กำลังเติบโต...": "Growing...",
    "เก็บเกี่ยวสำเร็จ!": "Harvest Success!",
    
    // AI Mood Therapy
    "ทดสอบความรู้สึก & AI บำบัด": "Mood Test & AI Therapy",
    "ประเมินอารมณ์ของคุณวันนี้เพื่อรับคำปรึกษาและภารกิจบำบัดใจเฉพาะบุคคลค่ะ": "Evaluate your mood today to receive personalized therapy and daily quests.",
    "1. วันนี้ปะป๊ามะม๊ารู้สึกอย่างไรมากที่สุดคะ?": "1. How do you feel the most today?",
    "มีความสุข / ร่าเริง": "Happy / Cheerful",
    "สงบ / ผ่อนคลาย": "Calm / Relaxed",
    "ตื่นเต้น / ตกใจ": "Shocked / Excited",
    "หงุดหงิด / รำคาญใจ": "Frustrated / Irritated",
    "โกรธ / ฉุนเฉียว": "Angry / Furious",
    "เหนื่อยล้า / เพลียกายใจ": "Tired / Exhausted",
    "เศร้า / หมองหม่น": "Sad / Depressed",
    "ฟุ้งซ่าน / ว้าวุ่น": "Restless / Distracted",
    "ท้อแท้ / สิ้นหวัง": "Discouraged / Hopeless",
    "2. บอกรายละเอียดความรู้สึกเพิ่มเติมให้เกวนทาร์ฟังหน่อยนะคะ (ถ้ามี)": "2. Tell me more details about your feelings (optional)",
    "วิเคราะห์อารมณ์ด้วย AI เกวนทาร์ 🧠✨": "Analyze Mood with Gwentar AI 🧠✨",
    
    // Diary
    "สมุดบันทึกไดอารี่อารมณ์": "Personal Mood Diary",
    "บันทึกเหตุการณ์และความรู้สึกย้อนหลังเพื่อติดตามสภาวะจิตใจ": "Record past events and feelings to track your mental state.",
    "ยังไม่มีประวัติบันทึกไดอารี่เลยค่ะ...": "No diary entries yet...",
    "มาทดสอบอารมณ์และเขียนบันทึกกันนะคะ!": "Let's test your mood and write a diary entry!",
    "ประวัติบันทึกอารมณ์": "Mood Log History",
    
    // Quests
    "ภารกิจของปะป๊ามะม๊า": "Daily Quests",
    "ช่วยหนูทำภารกิจบำบัดจิตใจ ปลูกฝัก เลี้ยงดูหนู หรือเล่นมินิเกม เพื่อสะสมเหรียญทองมาแต่งตัวให้หนูกันเถอะนะคะ ✨": "Complete mindfulness tasks, gardening, or mini-games to earn coins to dress me up! ✨",
    "โบนัสทำเควสครบทุกข้อประจำวัน": "Daily Quest Completion Bonus",
    "รับรางวัล 5 เพชร เรียบร้อยแล้ว": "Claimed 5 Gems successfully",
    "รับโบนัสสำเร็จครบวัน (+5💎)": "Claim Daily Bonus (+5💎)",
    "🎁 รับโบนัสสำเร็จครบวัน (+5💎)": "🎁 Claim Daily Bonus (+5💎)",
    "รับแล้ว": "Claimed",
    "รับรางวัล": "Claim",
    "นำไปทำ": "Go Do",
    "กรุณาเข้าไประบันทึกอารมณ์ของคุณในหน้าไดอารี่ก่อน เพื่อปลดล็อกและรับเควสประจำวันนะคะ": "Please record your mood in the diary first to unlock daily quests.",
    "ไปหน้าบันทึกอารมณ์ ✍️": "Go to Diary ✍️",
    
    // Mini Games
    "สวนสนุกมินิเกม": "Mini Games",
    "เล่นเกม": "Play",
    
    // Shop
    "ห้างสรรพสินค้า": "Shopping Mall",
    "🍎 ร้านอาหาร": "🍎 Food Shop",
    "🌱 เมล็ดผัก": "🌱 Seeds Shop",
    "👕 ร้านแต่งตัว": "👕 Clothes Shop",
    "ซื้อ": "Buy",
    "เงินเหรียญไม่พอค่ะ! 🪙": "Not enough coins! 🪙",
    "เพชรไม่พอค่ะ! 💎": "Not enough gems! 💎",
    "ซื้อไอเทมสำเร็จ! 🛍️": "Item purchased successfully! 🛍️",
    
    // Bag
    "กระเป๋าเป้คู่หู": "Backpack",
    "ทั้งหมด": "All Items",
    "🍎 อาหาร": "🍎 Food",
    "🌱 เมล็ดพันธุ์": "🌱 Seeds",
    "👕 เสื้อผ้า": "👕 Clothes",
    "จำนวน:": "Qty:",
    "สวมใส่": "Equip",
    "ถอดออก": "Unequip",
    "ป้อน": "Feed",
    
    // Soundscapes
    "ดนตรีบำบัดธรรมชาติ": "Natural Healing Music",
    "เสียงฝนตกพรำๆ": "Gentle Rain",
    "คลื่นทะเลซัดสาด": "Ocean Waves",
    "ป่าไม้และนกร้อง": "Forest Birds",
    "กองไฟแคมป์ไฟ": "Campfire Crackle",
    "เสียงคาเฟ่ชิลๆ": "Chill Cafe Ambience",
    "เสียงเปียโนนุ่มๆ": "Soft Piano",
    
    // Settings
    "ตั้งค่า": "Settings",
    "เสียงเอฟเฟกต์": "Sound FX",
    "เพลงประกอบ": "BGM Volume",
    "ภาษาแอป": "Language",
    "ธีมสีแอป": "App Theme",
    "ล้างข้อมูลเกมทั้งหมด": "Reset All Game Data",
    "กลับหน้าหลัก": "Back to Home",
    "ย้อนกลับ": "Back",
    "ปิด": "Close",
    "ทำสำเร็จแล้ว ✨": "Done ✨",
    "ยืนยันทำสำเร็จ ✨": "Confirm Done ✨",
    "ส่งให้เกวนทาร์ตรวจ ✨": "Submit to Gwentar ✨",
    "กำลังประเมินผล...": "Analyzing...",
    "พิมพ์บันทึกของคุณที่นี่...": "Type your log here...",
    "ปิดเสียงเพลงประกอบ": "Turn Off BGM",
    "Cat Bag - ชิลสบายๆ": "Cat Bag - Chill",
    "เล่นเพลง": "Play Music",
    "หยุดเพลง": "Stop Music",
    "เวอร์ชัน 1.0.0": "Version 1.0.0",
    
    // Bedtime Stories
    "✨ เรื่องเล่าดาวตกแสนหวาน": "✨ Sweet Shooting Star Story",
    "☁️ การเดินทางของน้องก้อนเมฆ": "☁️ Journey of Little Cloud",
    "💖 บทความโอบกอดตัวเองก่อนนอน": "💖 Bedtime Hug Article",
    "🍵 ร้านน้ำชาดวงจันทร์ของกระต่ายน้อย": "🍵 Little Bunny's Moon Tea Shop",
    "🌲 ป่าแห่งเสียงกระซิบอันอบอุ่น": "🌲 Warm Whisper Forest",
    "⛵ เรือกระดาษพาความเครียดลอยไป": "⛵ Paper Boat Floating Away Stress",
    "🐱 เสียงแมวน้อยกล่อมนอน": "🐱 Kitten Purring Lullaby",
    "🎈 ลูกโป่งความฝันลอยสู่ห้วงอวกาศ": "🎈 Dream Balloon in Space",
    "🌸 สวนดอกไมียามค่ำคืนใต้แสงจันทร์": "🌸 Midnight Moonlight Garden",
    "🌸 สวนดอกไม้ยามค่ำคืนใต้แสงจันทร์": "🌸 Midnight Moonlight Garden",
    "🕯️ เทียนหอมลาเวนเดอร์ผ่อนคลาย": "🕯️ Relaxing Lavender Candle",
    "📖 อ่านนิทาน +10 HP +10 ⚡": "📖 Read Story +10 HP +10 ⚡",
    "หน้าก่อนหน้า": "Prev Page",
    "หน้าถัดไป": "Next Page",
    "📖 นิทานและบทความฮีลใจก่อนนอน": "📖 Bedtime Stories & Heart Healing Articles",
    
    // Quest Descriptions
    "บันทึกเรื่องราวดีๆ และความสุขประจำวัน 😊": "Record good things and daily happiness 😊",
    "เขียนขอบคุณสิ่งดีๆ วันนี้ 3 อย่าง 🌟": "Write 3 things you are grateful for today 🌟",
    "แบ่งปันรอยยิ้มหรือคำพูดดีๆ ให้คนอื่น 😊": "Share a smile or kind words with someone 😊",
    "หลับตานิ่งๆ ทบทวนความทรงจำแสนสุข 💭": "Close your eyes and reflect on happy memories 💭",
    "ให้ของขวัญหรือรางวัลเล็กๆ แก่ตัวเอง 🎁": "Give yourself a little gift or reward 🎁",
    "บันทึกช่วงเวลาที่สงบผ่อนคลายลงไดอารี่ 😌": "Record a calm, relaxing moment in your diary 😌",
    "ฝึกหายใจช้าเข้า 4 วิ ออก 6 วิ 10 ครั้ง 🧘": "Practice breathing in for 4s, out for 6s (10 times) 🧘",
    "จิบเครื่องดื่มอุ่นช้าๆ อย่างมีสติ 🥛": "Sip a warm drink slowly and mindfully 🥛",
    "ยืดเหยียดกายคลายความเกร็งคอไหล่ 🚶": "Stretch to relieve neck and shoulder tension 🚶",
    "นั่งนิ่งเงียบไร้จอมือถือ 5 นาที 🤫": "Sit quietly without your phone for 5 minutes 🤫",
    "เขียนระบายเรื่องตื่นเต้นตกใจลงไดอารี่ 😳": "Write down exciting or shocking events in your diary 😳",
    "สูดหายใจเข้าลึกพรูลมออกยาว 5 ครั้ง 🌬️": "Inhale deeply and exhale slowly 5 times 🌬️",
    "สังเกตระบุสิ่งของสีน้ำเงินรอบตัว 3 อย่าง 🛋️": "Identify 3 blue objects around you 🛋️",
    "จดรายละเอียดความจริงของเรื่องที่ตกใจ ✍️": "Write down the facts about what shocked you ✍️",
    "จิบน้ำเย็นจัด 1 แก้วกระตุ้นประสาท 🥤": "Sip a glass of ice-cold water 🥤",
    "เขียนระบายสิ่งกวนใจหงุดหงิดลงไดอารี่ 😒": "Write down frustrating/irritating things in your diary 😒",
    "เขียนเรื่องน่าหงุดหงิดใส่กระดาษแล้วฉีกทิ้ง 📄": "Write frustrations on paper and tear it up 📄",
    "ละสายตาจากจอมือถือไปเดินเล่น 5 นาที 🚶": "Take a break from your phone and walk for 5 minutes 🚶",
    "หมุนคอช้าๆ ยักไหล่ผ่อนคลายเส้นเอ็น 🧘": "Roll your neck slowly and shrug to relax 🧘",
    "เขียนสิ่งเล็กๆ ที่ทำได้ดีวันนี้ 3 อย่าง 💭": "Write 3 small achievements you did well today 💭",
    "เขียนระบายปลดปล่อยความโกรธลงไดอารี่ 😡": "Write down your anger to vent in your diary 😡",
    "เขียนสิ่งที่โกรธลงกระดาษขยำแน่นๆ ขว้างทิ้ง ✍️": "Write down what angered you, crumple it, and throw it away ✍️",
    "นั่งสงบนิ่งหลับตาทบทวนสาเหตุโกรธ 💭": "Sit quietly with eyes closed and analyze what made you angry 💭",
    "หยุดการพูดจา สูดหายใจยาวนับ 1 ถึง 10 🧘": "Stop talking, take deep breaths, and count 1 to 10 🧘",
    "ล้างหน้าล้างมือด้วยน้ำเย็นดับหัวร้อน 💦": "Wash your face and hands with cold water 💦",
    "บันทึกความรู้สึกเหนื่อยล้าลงไดอารี่ 🥱": "Record your feelings of exhaustion in your diary 🥱",
    "เอนกายหลับตาพักในความเงียบ 10 นาที 😴": "Lie down, close your eyes, and rest in silence for 10 mins 😴",
    "อาบน้ำอุ่นชำระร่างกายผ่อนคลายกล้ามเนื้อ 🛁": "Take a warm shower to relax your muscles 🛁",
    "ดื่มน้ำสะอาดแก้วใหญ่หรือนมอุ่น 1 แก้ว 🥛": "Drink a large glass of clean water or warm milk 🥛",
    "ยืดเหยียดเบาๆ บนฟูกนอน 🧘": "Perform gentle stretching exercises on your bed 🧘",
    "กอดตัวเองและเขียนระบายเรื่องเศร้าลงไดอารี่ 😢": "Hug yourself and write down sad feelings in your diary 😢",
    "นอนซุกใต้ผ้าห่มหนานุ่มห่อหุ้มความรู้สึก 🛌": "Snuggle under a soft blanket to comfort yourself 🛌",
    "โอบกอดตัวเองลูบไหล่ส่งกำลังใจ 🧎": "Hug yourself, pat your shoulders, and send self-encouragement 🧎",
    "อนุญาตให้น้ำตาไหลออกโดยไม่ตัดสิน 💧": "Allow yourself to cry freely without judgment 💧",
    "เขียนการ์ดหรือคำปลอบโยนให้ตัวเอง ✍️": "Write a card or words of comfort to yourself ✍️",
    "ระบายความฟุ้งซ่านว้าวุ่นจิตใจลงในไดอารี่ 🌀": "Vent your restlessness and distraction in your diary 🌀",
    "เพ่งสมาธิจดจ่อลมหายใจที่ปลายจมูก 🧘": "Focus your attention on your breathing at the tip of your nose 🧘",
    "จัดระเบียบสิ่งของบนโต๊ะ 3 นาที 🧹": "Organize items on your desk for 3 minutes 🧹",
    "จดลิสต์สิ่งที่ต้องทำเรียงลำดับในสมอง ✍️": "Write a list of things to do, ordered in your mind ✍️",
    "ปิดเสียงแจ้งเตือนมือถือ 15 นาที 🔇": "Mute all phone notifications for 15 minutes 🔇",
    "เขียนทบทวนความท้อแท้สิ้นหวังลงไดอารี่ 😔": "Review and write down feelings of hopelessness in your diary 😔",
    "จดบันทึกความสำเร็จอดีต 3 สิ่งฟื้นใจ 🏆": "Record 3 achievements from your past to revive your heart 🏆",
    "อ่านคำคมหรือคำพูดบวกสร้างแรงใจ 📖": "Read positive quotes or phrases to inspire you 📖",
    "ย่อยเป้าหมายใหญ่ให้เล็กสุดเพื่อทำทันที 🧘": "Break down a large goal to the smallest step and do it now 🧘",
    "เขียนจดหมายให้กำลังใจตนเองแบบกัลยาณมิตร ✍️": "Write an encouraging letter to yourself like a good friend ✍️",
    
    // Apparel items
    "หมวกพ่อมด": "Wizard Hat",
    "มงกุฎทอง": "Golden Crown",
    "หมวกรับปริญญา": "Graduation Cap",
    "หมวกซานต้า": "Santa Hat",
    "มงกุฎดอกไม้": "Flower Crown",
    "หูกระต่าย": "Bunny Ears",
    "หูฟังเกมเมอร์": "Gamer Headphones",
    "หูแมว": "Cat Ears",
    "หมวกปาร์ตี้สายรุ้ง": "Rainbow Party Hat",
    "หมวกฟางชาวสวน": "Straw Garden Hat",
    "หมวกเชฟแสนอร่อย": "Delicious Chef Hat",
    "หูหมีพาสเทล": "Pastel Bear Ears",
    "วงแหวนเทวดา": "Angel Halo",
    "แว่นกันแดด": "Sunglasses",
    "โบว์ชมพู": "Pink Ribbon",
    "แว่นตากรอบทอง": "Golden Glasses",
    "แว่นตาหัวใจชมพู": "Pink Heart Glasses",
    "แว่นตาข้างเดียว": "Monocle",
    "ผ้าปิดตาโจรสลัด": "Pirate Eyepatch",
    "สติกเกอร์แก้มแดง": "Red Blush Sticker",
    "ปีกนางฟ้า": "Angel Wings",
    "ปีกแฟรี่มิ้นท์": "Mint Fairy Wings",
    "ปีกค้างคาวฮาโลวีน": "Halloween Bat Wings",
    "ปีกผีเสื้อแสนหวาน": "Sweet Butterfly Wings",
    "เป้จรวดเจ็ทแพ็ค": "Jetpack Rocket",
    "เจ้าหญิงสีชมพู": "Pink Princess",
    "ราตรีสีน้ำเงิน": "Blue Nightgown",
    "ชุดทานตะวัน": "Sunflower Outfit",
    "ชุดรุ้ง": "Rainbow Outfit",
    "ชุดผึ้งน้อย": "Little Bee Outfit",
    "ชุดกระต่ายมิ้นท์": "Mint Bunny Outfit",
    "ชุดนักบินอวกาศ": "Astronaut Suit",
    "ชุดโจรสลัดสุดเท่": "Cool Pirate Suit",
    "ชุดนางเงือกมรกต": "Emerald Mermaid",
    "ชุดหุ่นยนต์โรโบ": "Robo Suit",
    "ชุดนางเงือกพาสเทล": "Pastel Mermaid",
    "ชุด Onesie แมวน้อย": "Kitten Onesie",
    "ชุด Onesie กระต่ายขาว": "White Bunny Onesie",
    "ชุด Onesie แพนด้า": "Panda Onesie",
    
    // Food Shop items
    "เค้กสตรอว์เบอร์รี่": "Strawberry Cake",
    "คุกกี้": "Cookie",
    "แฮมเบอร์เกอร์": "Hamburger",
    "ซูชิ": "Sushi",
    "พิซซ่า": "Pizza",
    "โดนัท": "Donut",
    "เฟรนช์ฟรายส์": "French Fries",
    "ไอศกรีม": "Ice Cream",
    "ป๊อปคอร์น": "Popcorn",
    "คัพเค้ก": "Cupcake",
    "ไก่ทอด": "Fried Chicken",
    "ราเมน": "Ramen",
    "ข้าวปั้น": "Onigiri",
    "น้ำเปล่า": "Water",
    "นมสด": "Fresh Milk",
    "ชาเขียว": "Green Tea",
    "ชานมไข่มุก": "Bubble Tea",
    "ช็อกโกแลต": "Chocolate",
    "น้ำผลไม้": "Fruit Juice",
    "ขวดนม": "Milk Bottle",
    "กาแฟร้อน": "Hot Coffee",
    "น้ำอัดลม": "Soda",
    "น้ำมะพร้าว": "Coconut Water",
    "ชาผสมน้ำผึ้ง": "Honey Tea",
    
    // Furniture Items
    "หน้าต่างฝนตก": "Rainy Window",
    "กรอบรูปป่าไม้": "Forest Painting",
    "ไฟนีออนสายรุ้ง": "Rainbow Neon Light",
    "ดาวส่องแสง": "Shining Star",
    "ต้นมอนสเตอร่า": "Monstera Plant",
    "หมีตุ๊กตายักษ์": "Giant Teddy Bear",
    "กีตาร์ไม้": "Wooden Guitar",
    "กล่องกระดาษน้อง": "Cardboard Box",
    "โคมไฟลาวา": "Lava Lamp",
    "โกโก้ร้อน": "Hot Cocoa",
    "วิทยุวินเทจ": "Vintage Radio",
    "ลูกแก้วหิมะ": "Snow Globe",
    
    // Bubble Texts
    "ดุ๊กดิ๊กๆ... หนูอยากออกไปเล่นข้างนอกแย้วง่า! 🥚": "Wiggle wiggle... I want to go out and play! 🥚",
    "จิ้มหนูจิ! หนูอยากฟักออกมาหาปะป๊ามะม๊าแย้ว! ✨": "Tap me! I want to hatch and see you! ✨",
    "งึมๆ... ข้างในนี้แคบจังเยยย 🥚": "Hmm... It's so cramped in here 🥚",
    "งือออ... หนูเจ็บจี๊ดๆ ไม่สบายตัวเลยง่า 🥺": "Ouch... I feel sick and uncomfortable 🥺",
    "ตัวหนูร้อนจี๋เยย... พาหนูไปอาบน้ำถูสบู่หน่อยน้าาา 🧼": "My body is so hot... please take me to take a bath 🧼",
    "เหงาจังเยย... หนูอยากให้ปะป๊ามะม๊ากอดแน่นๆ น้าาา 😢": "I feel so lonely... I want a warm hug from you 😢",
    "งอแงแย้วนะ! หนูเจ็บปวดหัวจังเยยย... 🤒": "I'm whining! My head hurts... 🤒",
    "หนูหิวข้าวแย้วง่าาา! ท้องร้องดังจ๊อกๆ เลยเนี่ยยย 🍞": "I'm hungry! My tummy is rumbling 🍞",
    "ง่วงนอนจังเยย... ตาหนูจะปิดอยู่แย้วนะปะป๊ามะม๊า 😴": "I'm so sleepy... my eyes are closing 😴",
    "หนูเหนื่อยจัง... ขอกินนมอุ่นๆ หรือขนมปังหน่อยจิ๊ 🥛": "I'm so tired... can I have some warm milk or bread? 🥛",
    "หนูไม่มีแรงเยยย... ตัวแบนแต๊ดแต๋ติดพื้นแย้วง่ะ 💤": "I have no strength left... I'm flat on the floor 💤",
    "รักปะป๊ามะม๊าที่สุดในโลกเยย! กอดหนูหน่อยจิ! 💕": "I love you the most in the world! Hug me please! 💕",
    "วันนี้เหนื่อยป่าว? หนูจะคอยเป็นกำลังใจให้ปะป๊ามะม๊าเอง! 🌸": "Are you tired today? I will always be here to support you! 🌸",
    "ไปเข้าสวนปลูกผัก เก็บเกี่ยวผลผลิตด้วยกันนะคะปะป๊ามะม๊า 🌾": "Let's go to the garden and harvest crops together! 🌾",
    "วันนี้แต่งตัวสวยๆ หล่อๆ ให้หนูหน่อยน้าาา 👗": "Please dress me up nicely today 👗",
    "ปะป๊ามะม๊ากลับมาแว้วหรอคะ! หนูคิดถึงปะป๊ามะม๊าที่สุดเยยย 💖": "You are back! I missed you so much! 💖",
    "ปะป๊ามะม๊ากลับมาแว้วหรอคะ! หนูคิดถึงปะป๊ามะม๊าที่สุดเยยย 💙": "You are back! I missed you so much! 💙",
    "ปะป๊ามะม๊ากลับมาแว้วหรอคะ! หนูคิดถึงปะป๊ามะม๊าที่สุดเยยย": "You are back! I missed you so much!",
    
    // Miscellaneous
    "กระเป๋าว่างเปล่า สามารถไปช้อปปิ้งได้ที่ร้านค้าค่ะ 🛍️": "Your backpack is empty! Go shopping at the mall 🛍️"
  }
};

function t(str) {
  if (!str) return "";
  if (state.lang !== "en") return str;
  let res = str.trim();
  
  if (APP_TRANSLATIONS.text[res]) return APP_TRANSLATIONS.text[res];
  
  if (res.includes("ไข่ฟองน้อยได้ฟักออกเป็นตัวน้อง")) {
    return res
      .replace("🥚 ป๊อป! ไข่ฟองน้อยได้ฟักออกเป็นตัวน้อง", "🥚 Pop! The little egg has hatched into")
      .replace("แล้วค่ะ! 🎉 ยินดีต้อนรับสู่โลกใบใหญ่น้าตัวเล็ก! 🌟", "! 🎉 Welcome to the big world, little one! 🌟");
  }
  if (res.includes("เลเวลอัป! สัตว์เลี้ยงของคุณเลเวลเพิ่มขึ้นเป็น")) {
    return res
      .replace("🎉 เลเวลอัป! สัตว์เลี้ยงของคุณเลเวลเพิ่มขึ้นเป็น เลเวล", "🎉 Level Up! Your pet level has increased to Level")
      .replace("แล้วค่ะ! 🌟\n(ใช้", "! 🌟\n(Used")
      .replace("EXP - เลเวลถัดไปต้องการ", "EXP - Next level requires")
      .replace("EXP)", "EXP)");
  }
  if (res.includes("ประเมินอารมณ์สำเร็จ! +50⭐ EXP")) {
    return "🧠 Mood evaluation completed! +50⭐ EXP";
  }
  if (res.includes("ทำแบบทดสอบประเมินอารมณ์ประจำวันสำเร็จ")) {
    return "🎉 Completed daily mood evaluation successfully!\n\n⭐ Special Reward: +50 ⭐ EXP! 🌟";
  }
  if (res.includes("เช็คอินประจำวันสำเร็จ")) {
    return res
      .replace("🎉 เช็คอินประจำวันสำเร็จ! 📅✨", "🎉 Daily Check-in Success! 📅✨")
      .replace("ได้รับ EXP:", "Earned EXP:")
      .replace("เลเวล", "Level")
      .replace("ได้รับโบนัสเหรียญทอง:", "Earned Gold Coins:")
      .replace("เหรียญทอง", "Coins")
      .replace("มาดูแลน้องสัตว์เลี้ยงสม่ำเสมอทุกวันน้า! 🥰", "Please take care of your pet every day! 🥰");
  }
  if (res.includes("รดน้ำวิเศษสำเร็จ")) {
    return res
      .replace("✨ รดน้ำวิเศษสำเร็จ!", "✨ Magic Water Success!")
      .replace("พืชผักที่กำลังเติบโตทั้งหมด", "All")
      .replace("แปลง", "growing crops")
      .replace("เจริญเติบโตเต็มที่พร้อมเก็บเกี่ยวทันทีแล้วค่ะ! 🎉💧", "are fully grown and ready to harvest! 🎉💧");
  }
  if (res.includes("หนูบันทึกไดอารี่ลงเล่มให้เรียบร้อยแล้ว")) {
    return res
      .replace("หนูบันทึกไดอารี่ลงเล่มให้เรียบร้อยแล้วนะคะปะป๊ามะม๊า! 📝✨", "I have saved your diary in the book! 📝✨")
      .replace("ได้รับรางวัลประจำวัน: +50 🪙 และ +50 ⭐ EXP ด้วยน้าาา 💕", "Daily Reward: +50 🪙 and +50 ⭐ EXP! 💕");
  }
  if (res.includes("ซื้อและปลูก") && res.includes("แล้ว!")) {
    return res
      .replace("🌱 ซื้อและปลูก", "🌱 Purchased and planted")
      .replace("แล้ว!", "!");
  }
  if (res.includes("รดน้ำเร่งโต")) {
    return res.replace("💧 รดน้ำเร่งโต", "💧 Water to speed up");
  }
  if (res.includes("เก็บเกี่ยว") && res.includes("แปลง!")) {
    return res
      .replace("🧺 เก็บเกี่ยว", "🧺 Harvested")
      .replace("แปลง!", "plots!");
  }
  
  for (const [thKey, enVal] of Object.entries(APP_TRANSLATIONS.text)) {
    if (thKey.length > 3) {
      res = res.replaceAll(thKey, enVal);
    }
  }
  return res;
}

function applyLanguageToNode(node, lang) {
  const isEn = lang === "en";
  
  function getTranslation(str) {
    const trimmed = str.trim();
    if (!trimmed) return str;
    if (isEn) {
      return APP_TRANSLATIONS.text[trimmed] || str;
    } else {
      for (const [thKey, enVal] of Object.entries(APP_TRANSLATIONS.text)) {
        if (enVal === trimmed) {
          return thKey;
        }
      }
      return str;
    }
  }

  function traverse(n) {
    if (n.nodeType === Node.TEXT_NODE) {
      const originalText = n.nodeValue;
      if (originalText.trim()) {
        const translated = getTranslation(originalText);
        if (translated !== originalText) {
          n.nodeValue = translated;
        }
      }
    } else if (n.nodeType === Node.ELEMENT_NODE) {
      if (["SCRIPT", "STYLE", "TEXTAREA"].includes(n.tagName)) return;
      if (n.hasAttribute("placeholder")) {
        const pl = n.getAttribute("placeholder");
        const translatedPl = getTranslation(pl);
        if (translatedPl !== pl) {
          n.setAttribute("placeholder", translatedPl);
        }
      }
      n.childNodes.forEach(traverse);
    }
  }
  traverse(node);
}

// Override alert for automatic translation
const originalAlert = window.alert;
window.alert = function (message) {
  if (typeof message === "string") {
    originalAlert(t(message));
  } else {
    originalAlert(message);
  }
};
