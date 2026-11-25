// js/screens/quests.js: เควสประจำวัน และกิจกรรมฝึกสติ
// 2. COLORING / DRAWING BOOK MECHANICS (Drawing behind lines, 6 panel select, free color pick)
const MOOD_QUESTS_TEMPLATES = {
  Happy: [
    { key: "mood", title: "บันทึกเรื่องราวดีๆ และความสุขประจำวัน 😊", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "บันทึกความรู้สึกมีความสุขของคุณลงในหน้าไดอารี่วันนี้ เพื่อเก็บรักษาช่วงเวลาที่สดใสไว้ในหัวใจค่ะ" },
    { key: "gratitude", title: "เขียนขอบคุณสิ่งดีๆ วันนี้ 3 อย่าง 🌟", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "ใช้เวลา 2 นาทีเขียนขอบคุณสิ่งดีๆ หรือเหตุการณ์เล็กๆ น้อยๆ ที่เกิดขึ้นวันนี้ 3 อย่าง ลงบนกระดาษหรือสมุดบันทึกเพื่อเพิ่มความรู้สึกตื้นตันใจ" },
    { key: "smile", title: "แบ่งปันรอยยิ้มหรือคำพูดดีๆ ให้คนอื่น 😊", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ส่งต่อพลังบวกโดยการมอบรอยยิ้มอย่างจริงใจหรือพูดขอบคุณด้วยคำที่ไพเราะให้แก่คนรอบตัวคุณในวันนี้ 1 ครั้ง" },
    { key: "reflect", title: "หลับตานิ่งๆ ทบทวนความทรงจำแสนสุข 💭", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "หลับตาพักสติ 1 นาที นึกถึงเหตุการณ์แสนอบอุ่นในอดีตหรือวันนี้ที่นึกถึงทีไรก็ทำให้คุณแอบยิ้มและขำออกมาคนเดียวได้เสมอ" },
    { key: "reward", title: "ให้ของขวัญหรือรางวัลเล็กๆ แก่ตัวเอง 🎁", target: 1, rewardCoins: 40, rewardExp: 20, instruction: "มอบความรักให้ตัวเองในฐานะคนเก่งในวันนี้ เช่น ดื่มเครื่องดื่มแก้วโปรด ฟังเพลงที่ชอบ หรือให้เวลาผ่อนคลายทำสิ่งที่ตนรัก" }
  ],
  Calm: [
    { key: "mood", title: "บันทึกช่วงเวลาที่สงบผ่อนคลายลงไดอารี่ 😌", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ทบทวนและบันทึกความสงบสุขสบายกายสบายใจที่สัมผัสได้ในวันนี้ลงบนหน้าไดอารี่ค่ะ" },
    { key: "breathe", title: "ฝึกหายใจช้าเข้า 4 วิ ออก 6 วิ 10 ครั้ง 🧘", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "นั่งหลังตรง ผ่อนคลายหัวไหล่ วางมือไว้บนตัก สูดลมหายใจเข้าช้าๆ 4 วินาที และพรูลมหายใจออกยาวๆ ทางปาก 6 วินาที ทำติดต่อกัน 10 รอบอย่างจดจ่อ" },
    { key: "tea", title: "จิบเครื่องดื่มอุ่นช้าๆ อย่างมีสติ 🥛", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ชงนมอุ่นหรือชาสมุนไพรอุ่นๆ ค่อยๆ ประคองแก้วแล้วสูดดมกลิ่นหอม ก่อนจะค่อยๆ จิบทีละนิดอย่างจดจ่อช้าๆ เพื่อผ่อนคลาย" },
    { key: "stretch", title: "ยืดเหยียดกายคลายความเกร็งคอไหล่ 🚶", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "ยืดกล้ามเนื้อช่วงไหล่ คอ และแผ่นหลังช้าๆ โดยยืดค้างไว้ท่าละ 15 วินาที เพื่อปลดปล่อยความตึงเกร็งทางกายที่สะสมมาทั้งวัน" },
    { key: "silence", title: "นั่งนิ่งเงียบไร้จอมือถือ 5 นาที 🤫", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "วางมือถือ ปิดหน้าจอ นั่งอยู่เงียบๆ กับตัวเอง 5 นาที หลับตาเบาๆ รับรู้ถึงเสียงรอบตัวและเสียงลมหายใจของตนเองเพื่อคืนความสงบ" }
  ],
  Shocked: [
    { key: "mood", title: "เขียนระบายเรื่องตื่นเต้นตกใจลงไดอารี่ 😳", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนเรื่องราวชวนตื่นตระหนกที่พบเจอวันนี้ เพื่อช่วยเรียบเรียงระดับสติและความคิดในสมองค่ะ" },
    { key: "slow_breathe", title: "สูดหายใจเข้าลึกพรูลมออกยาว 5 ครั้ง 🌬️", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "สูดลมหายใจเข้าลึกๆ กักลมหายใจไว้ในอก 3 วินาที จากนั้นค่อยๆ เป่าลมอุ่นๆ ออกทางปากยาวๆ ทำซ้ำ 5 ครั้งเพื่อดึงอัตราชีพจรให้กลับมาสงบนิ่ง" },
    { key: "grounding", title: "สังเกตระบุสิ่งของสีน้ำเงินรอบตัว 3 อย่าง 🛋️", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "เรียกสติกลับคืนสู่ปัจจุบันโดยการกวาดสายตามองไปรอบๆ และระบุสิ่งของที่มีโทนสีน้ำเงินมา 3 ชิ้นอย่างช้าๆ" },
    { key: "write_down", title: "จดรายละเอียดความจริงของเรื่องที่ตกใจ ✍️", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เขียนข้อเท็จจริงของเหตุการณ์ตื่นเต้นที่เกิดขึ้นลงบนกระดาษสั้นๆ เพื่อแยกแยะสิ่งที่เกิดขึ้นจริงออกความวิตกกังวลในจินตนาการ" },
    { key: "sip_water", title: "จิบน้ำเย็นจัด 1 แก้วกระตุ้นประสาท 🥤", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "ดื่มน้ำเปล่าเย็นจัด 1 แก้วใหญ่ ค่อยๆ กลืนและสัมผัสความเย็นไหลลงผ่านลำคอเพื่อกระตุ้นระบบประสาทสมดุลให้ร่างกายตื่นตัวและผ่อนคลาย" }
  ],
  Frustrated: [
    { key: "mood", title: "เขียนระบายสิ่งกวนใจหงุดหงิดลงไดอารี่ 😒", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ระบายความขัดเคือง หงุดหงิดใจที่สะสมไว้ลงในไดอารี่ให้ดวงดาวหอบพาความหมองมัวออกไปค่ะ" },
    { key: "rip_paper", title: "เขียนเรื่องน่าหงุดหงิดใส่กระดาษแล้วฉีกทิ้ง 📄", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "เขียนระบายเรื่องหรือชื่อสิ่งที่ทำให้คุณหงุดหงิดลงบนเศษกระดาษ ขีดเขียนให้เต็มที่ จากนั้นขยำหรือฉีกมันออกเป็นชิ้นเล็กชิ้นน้อยแล้วขว้างทิ้งลงถังขยะ" },
    { key: "screen_break", title: "ละสายตาจากจอมือถือไปเดินเล่น 5 นาที 🚶", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "วางมือถือและละจากคอมพิวเตอร์ ยืนขึ้นและเดินไปรับลมที่ระเบียงหรือดูแมกไม้ภายนอก 5 นาทีเพื่อเปลี่ยนสภาวะทางอารมณ์" },
    { key: "neck_stretch", title: "หมุนคอช้าๆ ยักไหล่ผ่อนคลายเส้นเอ็น 🧘", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "หมุนหัวคออย่างช้าๆ ซ้ายและขวาทิศทางละ 5 รอบ ยักไหล่ขึ้นค้างไว้ 3 วินาทีแล้วปล่อยลง ทำ 10 ครั้ง เพื่อคลายลมและเส้นเอ็นตึงเครียด" },
    { key: "positives", title: "เขียนสิ่งเล็กๆ ที่ทำได้ดีวันนี้ 3 อย่าง 💭", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "เขียนสิ่งเล็กๆ ในวันนี้ที่คุณทำสำเร็จหรือรู้สึกว่ายังดำเนินไปได้ราบรื่น 3 ข้อลงในบันทึกส่วนตัวเพื่อปรับมุมมองใหม่" }
  ],
  Angry: [
    { key: "mood", title: "เขียนระบายปลดปล่อยความโกรธลงไดอารี่ 😡", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ปลดปล่อยระบายความโกรธแค้น คับข้องใจผ่านตัวหนังสือลงในไดอารี่เพื่อลดความอัดอั้นในจิตใจค่ะ" },
    { key: "trash_angry", title: "เขียนสิ่งที่โกรธลงกระดาษขยำแน่นๆ ขว้างทิ้ง ✍️", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "เขียนสิ่งที่ทำให้อารมณ์เดือดพล่านลงกระดาษ ขยำขยี้มันด้วยแรงทั้งหมดให้แน่นที่สุด แล้วปาทิ้งลงถังขยะอย่างไม่ต้องใยดี" },
    { key: "analyze_cause", title: "นั่งสงบนิ่งหลับตาทบทวนสาเหตุโกรธ 💭", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "หาสถานที่สงบเงียบนั่งลง หลับตา หายใจลึกๆ นึกย้อนทบทวนอย่างมีเหตุผลว่าทำไมเราถึงรู้สึกโกรธขนาดนี้ และมีทางเลือกใดบ้างที่ดีต่อเรา" },
    { key: "count_ten", title: "หยุดการพูดจา สูดหายใจยาวนับ 1 ถึง 10 🧘", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "เมื่อความโกรธแล่นขึ้นสูง ให้ปิดปากสนิท สูดหายใจเข้าลึกพรูออกยาว และนับ 1 ถึง 10 ในใจช้าๆ ก่อนจะกระทำการหรือพูดจาใดๆ" },
    { key: "cold_water", title: "ล้างหน้าล้างมือด้วยน้ำเย็นดับหัวร้อน 💦", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "เดินไปที่อ่างล้างหน้า วิดน้ำเย็นจัดใส่ใบหน้า ล้างข้อศอกและมือ สัมผัสความเย็นเยียบเพื่อรีเซ็ตอุณหภูมิร่างกายและดับความใจร้อนรุ่ม" }
  ],
  Tired: [
    { key: "mood", title: "บันทึกความรู้สึกเหนื่อยล้าลงไดอารี่ 🥱", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนบันทึกความอ่อนล้าทางร่างกายหรือภาระจิตใจที่ผ่านพ้นมาในวันนี้ลงในไดอารี่ค่ะ" },
    { key: "ten_rest", title: "เอนกายหลับตาพักในความเงียบ 10 นาที 😴", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "หาเตียงนอนหรือโซฟา เอนหลัง หลับตา ผ่อนลมหายใจ และปิดกั้นเสียงภายนอกเป็นเวลา 10 นาทีเพื่อฟื้นคืนประจุพลังในร่างกาย" },
    { key: "warm_shower", title: "อาบน้ำอุ่นชำระร่างกายผ่อนคลายกล้ามเนื้อ 🛁", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "ชำระร่างกายด้วยน้ำอุ่น ปล่อยให้น้ำไหลผ่านแผ่นหลัง บ่า ไหล่ เพื่อกระตุ้นการไหลเวียนโลหิตและผ่อนคลายกล้ามเนื้อตึงล้า" },
    { key: "hydrate", title: "ดื่มน้ำสะอาดแก้วใหญ่หรือนมอุ่น 1 แก้ว 🥛", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ค่อยๆ ดื่มน้ำสะอาดหรือนมสดอุ่นๆ เพื่อปรับสมดุลแร่ธาตุและระดับความดันในร่างกาย คืนความสดชื่นกระปรี้กระเปร่า" },
    { key: "gentle_stretch", title: "ยืดเหยียดเบาๆ บนฟูกนอน 🧘", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "บิดตัวและยืดกล้ามเนื้อขา สะโพก และหลังส่วนล่างช้าๆ บนที่นอน เพื่อบรรเทาความปวดเมื่อยล้าสะสมจากการนั่งทำงาน" }
  ],
  Sad: [
    { key: "mood", title: "กอดตัวเองและเขียนระบายเรื่องเศร้าลงไดอารี่ 😢", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนบอกเล่าเรื่องราวน้อยใจและเศร้าใจที่ทำให้น้ำตาซึมวันนี้ลงในไดอารี่ เพื่อแบ่งเบาภาระในจิตใจค่ะ" },
    { key: "wrap_blanket", title: "นอนซุกใต้ผ้าห่มหนานุ่มห่อหุ้มความรู้สึก 🛌", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "กอดหมอนข้างหรือตุ๊กตา ซุกกายใต้ผ้าห่มผืนหนานุ่มสัมผัสความอุ่นสบาย สร้างขอบเขตปลอดภัยอันแสนอบอุ่นเพื่อปลอบโยนจิตใจ" },
    { key: "warm_hug", title: "โอบกอดตัวเองลูบไหล่ส่งกำลังใจ 🧎", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "ยกแขนทั้งสองไขว้โอบกอดแผ่นหลังหรือไหล่ตัวเอง ค่อยๆ กอดกระชับและบอกตัวเองเบาๆ ว่า 'ฉันเก่งมากแล้วที่ผ่านพ้นวันนี้มาได้'" },
    { key: "tears_allow", title: "อนุญาตให้น้ำตาไหลออกโดยไม่ตัดสิน 💧", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "ปล่อยให้ตัวเองได้ร้องไห้ออมมาอย่างไม่ต้องอาย สูดหายใจลึกๆ และยอมรับความเศร้าอย่างเข้าใจว่านี่เป็นกระบวนการล้างแผลใจตามธรรมชาติ" },
    { key: "comfort_words", title: "เขียนการ์ดหรือคำปลอบโยนให้ตัวเอง ✍️", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เขียนประโยคให้กำลังใจตัวเอง เช่น 'พรุ่งนี้จะดีขึ้นนะ' หรือ 'ฉันภูมิใจในตัวเธอ' ลงบนการ์ดใบเล็กและพกติดตัวไว้" }
  ],
  Restless: [
    { key: "mood", title: "ระบายความฟุ้งซ่านว้าวุ่นจิตใจลงในไดอารี่ 🌀", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "ระบายความว้าวุ่น สับสน ฟุ้งซ่านในสมองที่พะวงไปรอบๆ ลงสู่ไดอารี่เพื่อคืนความสงบสู่สติค่ะ" },
    { key: "mindful_breathing", title: "เพ่งสมาธิจดจ่อลมหายใจที่ปลายจมูก 🧘", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "หลับตา วางสติไว้ที่ช่องจมูก หายใจเข้าและหายใจออกอย่างรับรู้ สังเกตสัมผัสของลมโดยไม่คิดเรื่องอื่น หากใจลอย ให้ค่อยๆ ดึงกลับมาทำต่อ 2 นาที" },
    { key: "tidy_space", title: "จัดระเบียบสิ่งของบนโต๊ะ 3 นาที 🧹", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "จัดระเบียบของชิ้นเล็กๆ บนโต๊ะทำงาน พับผ้าห่ม หรือกวาดห้องเล็กน้อยเพื่อฝึกการทำงานประสานของกายและใจช่วยสร้างสมาธิ" },
    { key: "write_steps", title: "จดลิสต์สิ่งที่ต้องทำเรียงลำดับในสมอง ✍️", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เขียนความฟุ้งซ่านในสมองแยกแยะออกมาเป็นข้อๆ เป็นรายสิ่งทีละสเต็ปที่ทำได้จริง เพื่อทำให้สิ่งที่ต้องทำดูจับต้องได้ง่ายขึ้น" },
    { key: "mute_notif", title: "ปิดเสียงแจ้งเตือนมือถือ 15 นาที 🔇", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "เปิดโหมดห้ามรบกวนหรือปิดเสียงโทรศัพท์เป็นเวลา 15 นาทีเต็ม เพื่อลดสิ่งเร้าภายนอกและปกป้องพื้นที่ส่วนตัวของคุณอย่างผ่อนคลาย" }
  ],
  Discouraged: [
    { key: "mood", title: "เขียนทบทวนความท้อแท้สิ้นหวังลงไดอารี่ 😔", target: 1, rewardCoins: 100, rewardExp: 20, instruction: "เขียนปลดเปลื้องภาระความพ่ายแพ้หรือความท้อแท้สิ้นแรงลงในไดอารี่เพื่อเติมพลังใจสู้ใหม่ค่ะ" },
    { key: "wins", title: "จดบันทึกความสำเร็จอดีต 3 สิ่งฟื้นใจ 🏆", target: 1, rewardCoins: 35, rewardExp: 20, instruction: "เขียนสิ่งที่คุณเคยทำสำเร็จในชีวิต ไม่ว่าจะเรื่องใหญ่หรือเรื่องเล็กๆ น้อยๆ 3 อย่าง เพื่อตอกย้ำให้ตัวเองจำได้ว่าคุณมีศักยภาพและความสามารถเพียงใด" },
    { key: "positive_quotes", title: "อ่านคำคมหรือคำพูดบวกสร้างแรงใจ 📖", target: 1, rewardCoins: 20, rewardExp: 20, instruction: "หาอ่านบทความ คำคม หรือดูวิดีโอที่ช่วยจุดประกายความหวังและเติมข้อคิดเชิงบวกให้แก่จิตใจ" },
    { key: "growth_mindset", title: "ย่อยเป้าหมายใหญ่ให้เล็กสุดเพื่อทำทันที 🧘", target: 1, rewardCoins: 25, rewardExp: 20, instruction: "แบ่งงานหรือเป้าหมายที่ดูยิ่งใหญ่เกินตัว ให้กลายเป็นขั้นตอนที่เล็กมากจนคุณสามารถลงมือทำเสร็จได้ภายใน 2 นาทีเพื่อฟื้นฟูความมั่นใจ" },
    { key: "self_compassion", title: "เขียนจดหมายให้กำลังใจตนเองแบบกัลยาณมิตร ✍️", target: 1, rewardCoins: 30, rewardExp: 20, instruction: "เขียนข้อความสั้นๆ ปลอบใจตัวเองในมุมมองเสมือนว่าเพื่อนสนิทผู้เข้าอกเข้าใจคุณมากที่สุดเป็นคนเขียนจดหมายแผ่นนี้ส่งมาให้กำลังใจคุณ" }
  ]
};

function renderDailyQuests() {
  const container = document.getElementById("questListContainer");
  if (!container) return;
  
  if (!state.moodRecorded) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px 15px; text-align: center; background: rgba(255, 255, 255, 0.05); border: 1.5px dashed rgba(255, 255, 255, 0.1); border-radius: 16px; margin: 10px 0;">
        <span style="font-size: 28px; margin-bottom: 10px;">🔒</span>
        <div style="font-size: 12px; font-weight: 700; color: #f87171; margin-bottom: 12px; line-height: 1.5;">
          กรุณาเข้าไประบันทึกอารมณ์ของคุณในหน้าไดอารี่ก่อน เพื่อปลดล็อกและรับเควสประจำวันนะคะ
        </div>
        <button class="btn-gradient" style="padding: 6px 16px; font-size: 11px; border-radius: 20px;" onclick="nav('screen-12')">ไปหน้าบันทึกอารมณ์ ✍️</button>
      </div>
    `;
    return;
  }
  
  const activeMood = state.selectedMood || "Happy";
  const quests = MOOD_QUESTS_TEMPLATES[activeMood] || MOOD_QUESTS_TEMPLATES.Happy;
  
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const listHtml = quests.map(q => {
    const progress = state.questsProgress[q.key] || 0;
    const isCompleted = progress >= q.target;
    const isClaimed = state.questsClaimed[q.key];
    
    return `
      <div class="quest-item" style="border: 1px solid ${isClaimed ? 'rgba(255,255,255,0.05)' : isCompleted ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.08)'}; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-radius: 12px; background: rgba(255, 255, 255, 0.02);">
        <div class="quest-left" style="display: flex; align-items: center; gap: 10px;">
          <div class="quest-check ${isClaimed || isCompleted ? 'done' : ''}" style="width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid ${isCompleted ? '#22c55e' : '#cbd5e1'}; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #fff; background: ${isCompleted ? '#22c55e' : 'transparent'};">
            ${isCompleted ? '✓' : ''}
          </div>
          <div class="quest-details" style="display: flex; flex-direction: column;">
            <span class="quest-title" style="font-size:11px; font-weight:700; color: ${isClaimed ? 'var(--text-muted)' : 'var(--text-primary)'};">${q.title}</span>
            <span class="quest-rewards" style="font-size: 9px; font-weight: 700; color: #facc15;">+${q.rewardCoins}🪙  +${q.rewardExp}⭐</span>
          </div>
        </div>
        <div class="quest-right" style="display: flex; align-items: center; gap: 8px;">
          <span class="quest-progress-txt" style="font-size: 10px; color: ${isClaimed ? '#64748b' : isCompleted ? '#22c55e' : '#38bdf8'}; font-weight:700;">${progress}/${q.target}</span>
          ${isClaimed 
            ? `<button class="quest-claim-btn" style="background:#cbd5e1; color:#64748b; cursor:default; font-size:10px; padding: 4px 8px; border-radius: 12px; border:none;" disabled>รับแล้ว</button>`
            : isCompleted
              ? `<button class="quest-claim-btn" onclick="claimDailyQuest('${q.key}')" style="background:#22c55e; color:#fff; cursor:pointer; font-size:10px; padding: 4px 8px; border-radius: 12px; font-weight:700; border:none; box-shadow: 0 2px 6px rgba(34,197,94,0.3);">รับรางวัล</button>`
              : `<button class="quest-claim-btn" onclick="goToDoQuest('${q.key}')" style="background:#38bdf8; color:#fff; cursor:pointer; font-size:10px; padding: 4px 8px; border-radius: 12px; font-weight:700; border:none; box-shadow: 0 2px 6px rgba(56,189,248,0.3);">นำไปทำ</button>`
          }
        </div>
      </div>
    `;
  }).join("");

  const allCompleted = quests.every(q => (state.questsProgress[q.key] || 0) >= q.target);
  const bonusClaimed = state.allQuestsBonusClaimedDate === todayStr;

  let bonusHtml = "";
  if (allCompleted) {
    if (bonusClaimed) {
      bonusHtml = `
        <div class="quest-item bonus-quest" style="border: 1px solid rgba(255,255,255,0.05); margin-top: 15px; display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border-radius: 16px; background: rgba(255, 255, 255, 0.03); box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
          <div class="quest-left" style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">💎</span>
            <div style="display: flex; flex-direction: column; text-align: left;">
              <span style="font-size:11px; font-weight:800; color:var(--text-muted);">โบนัสทำเควสครบทุกข้อประจำวัน</span>
              <span style="font-size: 9px; font-weight: 700; color: #a8a29e;">รับรางวัล 5 เพชร เรียบร้อยแล้ว</span>
            </div>
          </div>
          <button style="background:#cbd5e1; color:#64748b; cursor:default; font-size:10px; padding: 6px 12px; border-radius: 20px; border:none; font-weight:700;" disabled>รับแล้ว</button>
        </div>
      `;
    } else {
      bonusHtml = `
        <div class="quest-item bonus-quest" style="border: 1px solid rgba(234, 179, 8, 0.4); margin-top: 15px; display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border-radius: 16px; background: rgba(234, 179, 8, 0.05); box-shadow: 0 4px 15px rgba(234,179,8,0.15);">
          <div class="quest-left" style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">💎</span>
            <div style="display: flex; flex-direction: column; text-align: left;">
              <span style="font-size:11px; font-weight:800; color:#facc15;">⭐ โบนัสผู้พิชิตเควสประจำวัน!</span>
              <span style="font-size: 9px; font-weight: 700; color: #cbd5e1;">ทำครบทุกข้อวันนี้ รับ 5 เพชรทันที!</span>
            </div>
          </div>
          <button onclick="claimAllQuestsBonus()" style="background: linear-gradient(90deg, #f59e0b, #eab308); color:#fff; cursor:pointer; font-size:10px; padding: 6px 12px; border-radius: 20px; font-weight:800; border:none; box-shadow: 0 4px 10px rgba(234,179,8,0.4);">รับ 5 เพชร 💎</button>
        </div>
      `;
    }
  } else {
    const completedCount = quests.filter(q => (state.questsProgress[q.key] || 0) >= q.target).length;
    bonusHtml = `
      <div class="quest-item bonus-quest locked" style="border: 1px dashed rgba(255,255,255,0.1); margin-top: 15px; display: flex; flex-direction: column; padding: 12px 15px; border-radius: 16px; background: rgba(255, 255, 255, 0.01);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 14px;">💎</span>
            <span style="font-size: 10px; font-weight: 700; color: var(--text-muted);">ความคืบหน้าโบนัสประจำวัน (+5 เพชร)</span>
          </div>
          <span style="font-size: 10px; font-weight: 700; color: #38bdf8;">${completedCount}/${quests.length} เควส</span>
        </div>
        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
          <div style="width: ${(completedCount / quests.length) * 100}%; height: 100%; background: linear-gradient(90deg, #38bdf8, #818cf8); border-radius: 3px; transition: width 0.3s ease;"></div>
        </div>
      </div>
    `;
  }

  container.innerHTML = listHtml + bonusHtml;
  if (state.lang === "en") {
    applyLanguageToNode(container, "en");
  }
}

function goToDoQuest(key) {
  if (key === "mood") {
    nav("screen-12");
    return;
  }
  
  const activeMood = state.selectedMood || "Happy";
  const templates = MOOD_QUESTS_TEMPLATES[activeMood] || MOOD_QUESTS_TEMPLATES.Happy;
  const currentQuest = templates.find(q => q.key === key);
  
  if (currentQuest) {
    showMindfulnessModal(currentQuest);
  }
}

const QUEST_DURATIONS = {
  reflect: 60,             // 1 min
  breathe: 100,            // 10 times of 4s in + 6s out
  stretch: 60,             // 1 min
  silence: 300,            // 5 mins
  slow_breathe: 30,        // 30 seconds
  screen_break: 300,       // 5 mins
  count_ten: 10,           // 10 seconds
  ten_rest: 600,           // 10 mins
  mindful_breathing: 120,  // 2 mins
  tidy_space: 180,         // 3 mins
  mute_notif: 900,         // 15 mins
  growth_mindset: 120      // 2 mins
};

let mindfulnessTimerInterval = null;

function formatMindfulnessTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startMindfulnessTimer(key, duration) {
  const btnStart = document.getElementById("btnStartMindfulness");
  const btnComplete = document.getElementById("btnCompleteMindfulness");
  const timerDisplay = document.getElementById("mindfulnessTimerDisplay");
  
  if (btnStart) btnStart.style.display = "none";
  if (btnComplete) {
    btnComplete.style.display = "inline-block";
    btnComplete.disabled = true;
    btnComplete.style.background = "#475569";
    btnComplete.style.cursor = "not-allowed";
    btnComplete.style.opacity = "0.6";
  }
  
  let timeLeft = duration;
  if (timerDisplay) timerDisplay.innerText = formatMindfulnessTime(timeLeft);
  
  if (mindfulnessTimerInterval) clearInterval(mindfulnessTimerInterval);
  mindfulnessTimerInterval = setInterval(() => {
    timeLeft--;
    if (timerDisplay) timerDisplay.innerText = formatMindfulnessTime(timeLeft);
    
    if (timeLeft <= 0) {
      clearInterval(mindfulnessTimerInterval);
      mindfulnessTimerInterval = null;
      if (btnComplete) {
        btnComplete.disabled = false;
        btnComplete.style.background = ""; // Restore original gradient
        btnComplete.style.cursor = "pointer";
        btnComplete.style.opacity = "1";
        btnComplete.innerText = t("ทำสำเร็จแล้ว ✨");
      }
    }
  }, 1000);
}

function showMindfulnessModal(quest) {
  let modal = document.getElementById("mindfulnessModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "mindfulnessModal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    modal.style.backdropFilter = "blur(8px)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.zIndex = "9999";
    document.body.appendChild(modal);
  }
  
  const isAiQuest = ["gratitude", "smile", "mood", "write_down", "grounding", "rip_paper", "positives", "trash_angry", "comfort_words", "write_steps", "wins", "self_compassion"].includes(quest.key);
  
  if (isAiQuest) {
    let placeholder = t("พิมพ์บันทึกของคุณที่นี่...");
    if (quest.key === "gratitude") placeholder = t("พิมพ์ขอบคุณสิ่งดีๆ 3 ข้อที่นี่...");
    else if (quest.key === "positives") placeholder = t("พิมพ์สิ่งเล็กๆ ที่ทำได้ดี 3 ข้อที่นี่...");
    else if (quest.key === "grounding") placeholder = t("พิมพ์สิ่งของสีน้ำเงิน 3 อย่างรอบตัวที่นี่...");
    
    modal.innerHTML = `
      <div style="background: linear-gradient(135deg, #1e1e38 0%, #0d0d1e 100%); border: 1.5px solid rgba(255, 255, 255, 0.1); border-radius: 24px; width: 85%; max-width: 320px; padding: 20px; color: #fff; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.3s ease; box-sizing: border-box;">
        <span style="font-size: 32px; display: block; margin-bottom: 12px;">✍️</span>
        <h3 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #38bdf8; font-family: inherit;">${t("ทำกิจกรรมบำบัดจิตใจ")}</h3>
        <p style="font-size: 11px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px; font-family: inherit;">
          ${t(quest.instruction || quest.title)}
        </p>
        <textarea id="mindfulnessInput" placeholder="${placeholder}" style="width: 100%; height: 90px; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 10px; color: #fff; font-size: 11px; font-family: inherit; resize: none; margin-bottom: 15px; outline: none; box-sizing: border-box;"></textarea>
        <div id="aiStatusText" style="font-size: 10px; color: #fbbf24; margin-bottom: 12px; min-height: 12px;"></div>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button id="mindfulnessVerifyBtn" class="btn-gradient" style="padding: 8px 16px; font-size: 11px; border-radius: 12px;" onclick="verifyMindfulnessInput('${quest.key}')">${t("ส่งให้เกวนทาร์ตรวจ ✨")}</button>
          <button id="mindfulnessDoneBtn" class="btn-gradient" style="padding: 8px 16px; font-size: 11px; border-radius: 12px; display: none;" onclick="completeMindfulnessQuest('${quest.key}')">${t("ยืนยันทำสำเร็จ ✨")}</button>
          <button class="btn-secondary" style="padding: 8px 16px; font-size: 11px; border-radius: 12px; width: auto;" onclick="closeMindfulnessModal()">${t("ปิด")}</button>
        </div>
      </div>
    `;
  } else {
    const duration = QUEST_DURATIONS[quest.key];
    if (duration) {
      modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1e1e38 0%, #0d0d1e 100%); border: 1.5px solid rgba(255, 255, 255, 0.1); border-radius: 24px; width: 85%; max-width: 320px; padding: 20px; color: #fff; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.3s ease; box-sizing: border-box;">
          <span style="font-size: 32px; display: block; margin-bottom: 12px;">🧘</span>
          <h3 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #38bdf8; font-family: inherit;">${t("ทำกิจกรรมบำบัดจิตใจ")}</h3>
          <p style="font-size: 11px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px; font-family: inherit;">
            ${t(quest.instruction || quest.title)}
          </p>
          <div id="mindfulnessTimerDisplay" style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #38bdf8;">
            ${formatMindfulnessTime(duration)}
          </div>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button id="btnStartMindfulness" class="btn-gradient" style="padding: 8px 16px; font-size: 11px; border-radius: 12px;" onclick="startMindfulnessTimer('${quest.key}', ${duration})">${t("เริ่มทำกิจกรรม")}</button>
            <button id="btnCompleteMindfulness" class="btn-gradient" style="padding: 8px 16px; font-size: 11px; border-radius: 12px; display: none;" onclick="completeMindfulnessQuest('${quest.key}')" disabled>${t("ทำสำเร็จแล้ว ✨")}</button>
            <button class="btn-secondary" style="padding: 8px 16px; font-size: 11px; border-radius: 12px; width: auto;" onclick="closeMindfulnessModal()">${t("ปิด")}</button>
          </div>
        </div>
      `;
    } else {
      modal.innerHTML = `
        <div style="background: linear-gradient(135deg, #1e1e38 0%, #0d0d1e 100%); border: 1.5px solid rgba(255, 255, 255, 0.1); border-radius: 24px; width: 85%; max-width: 320px; padding: 20px; color: #fff; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); transform: scale(0.9); transition: transform 0.3s ease; box-sizing: border-box;">
          <span style="font-size: 32px; display: block; margin-bottom: 12px;">🧘</span>
          <h3 style="font-size: 13px; font-weight: 700; margin-bottom: 8px; color: #38bdf8; font-family: inherit;">${t("ทำกิจกรรมบำบัดจิตใจ")}</h3>
          <p style="font-size: 11px; line-height: 1.6; color: #cbd5e1; margin-bottom: 20px; font-family: inherit;">
            ${t(quest.instruction || quest.title)}
          </p>
          <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn-gradient" style="padding: 8px 16px; font-size: 11px; border-radius: 12px;" onclick="completeMindfulnessQuest('${quest.key}')">${t("ทำสำเร็จแล้ว ✨")}</button>
            <button class="btn-secondary" style="padding: 8px 16px; font-size: 11px; border-radius: 12px; width: auto;" onclick="closeMindfulnessModal()">${t("ปิด")}</button>
          </div>
        </div>
      `;
    }
  }
  
  modal.style.display = "flex";
  setTimeout(() => {
    modal.firstElementChild.style.transform = "scale(1)";
  }, 10);
  
  if (state.lang === "en") {
    applyLanguageToNode(modal, "en");
  }
}

function closeMindfulnessModal() {
  if (mindfulnessTimerInterval) {
    clearInterval(mindfulnessTimerInterval);
    mindfulnessTimerInterval = null;
  }
  const modal = document.getElementById("mindfulnessModal");
  if (modal) {
    modal.firstElementChild.style.transform = "scale(0.9)";
    setTimeout(() => {
      modal.style.display = "none";
    }, 200);
  }
}

async function verifyMindfulnessInput(key) {
  const inputEl = document.getElementById("mindfulnessInput");
  const statusEl = document.getElementById("aiStatusText");
  const verifyBtn = document.getElementById("mindfulnessVerifyBtn");
  const doneBtn = document.getElementById("mindfulnessDoneBtn");

  if (!inputEl) return;
  const text = inputEl.value.trim();
  if (!text) {
    alert("กรุณาพิมพ์ข้อความก่อนส่งให้ตรวจนะคะ!");
    return;
  }

  if (statusEl) statusEl.innerText = "🤖 เกวนทาร์กำลังอ่านข้อความของคุณ...";
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerText = "กำลังประเมินผล...";
    verifyBtn.style.opacity = "0.6";
  }

  // ข้อความระบายความรู้สึกไม่ส่งออกจากเครื่อง ตรวจแบบง่ายในเครื่องเท่านั้น
  if (typeof safetyHasRisk === "function" && safetyHasRisk(text)) {
    if (statusEl) statusEl.innerText = "";
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.innerText = "ส่งให้เกวนทาร์ตรวจ ✨";
      verifyBtn.style.opacity = "1";
    }
    openSafetyHelp("risk");
    return;
  }
  const wordCount = text.split(/[\s,，、]+/).filter(w => w.length > 0).length;
  let minLen = 15;
  if (key === "grounding" || key === "smile") minLen = 10;
  let verified;
  if (["gratitude", "positives", "grounding", "wins"].includes(key)) {
    verified = text.length >= 20 && (wordCount >= 3 || text.includes("\n") || text.includes(",") || text.includes("1.") || text.includes("2."));
  } else {
    verified = text.length >= minLen;
  }

  if (verified) {
    if (statusEl) {
      statusEl.style.color = "#34d399";
      statusEl.innerText = "💖 เกวนทาร์รับรู้ความรู้สึกและอยู่เคียงข้างคุณแล้วค่ะ!";
    }
    if (verifyBtn) verifyBtn.style.display = "none";
    if (doneBtn) doneBtn.style.display = "block";
  } else {
    if (statusEl) {
      statusEl.style.color = "#f87171";
      statusEl.innerText = "🥺 ลองใช้เวลาตั้งใจเขียนใหม่อีกนิดน้าเก่งแล้วค่ะ";
    }
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.innerText = "ส่งให้เกวนทาร์ตรวจ ✨";
      verifyBtn.style.opacity = "1";
    }
    
    let alertMsg = "กรุณาใช้เวลาทบทวนและอธิบายความรู้สึกเขียนระบายเพิ่มเติมอีกสักนิดนะคะ 💕";
    if (key === "grounding") alertMsg = "ลองเขียนบอกสิ่งของสีน้ำเงิน 3 อย่างรอบตัวคุณให้ชัดเจนหน่อยนะคะ 🛋️";
    else if (key === "positives") alertMsg = "ลองนึกทบทวนเขียนความสำเร็จเล็กๆ 3 อย่างให้ครบถ้วนนะคะ 🌟";
    else if (key === "gratitude") alertMsg = "ลองนึกทบทวนเขียนขอบคุณสิ่งดีๆ ให้ครบ 3 อย่างนะคะ 🌟";
    else if (key === "trash_angry") alertMsg = "ระบายความโกรธของคุณออกมาให้หมดใจได้เลยค่ะ เกวนทาร์รอรับฟังอยู่นะคะ 😡";
    
    alert(alertMsg);
  }
}

function completeMindfulnessQuest(key) {
  state.questsProgress[key] = (state.questsProgress[key] || 0) + 1;
  syncUI();
  renderDailyQuests();
  closeMindfulnessModal();
  alert("🎉 ทำกิจกรรมสำเร็จ! สามารถรับรางวัลความสุขได้แล้วน้า 🌟");
}


function claimAllQuestsBonus() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  if (state.allQuestsBonusClaimedDate === todayStr) return;

  state.allQuestsBonusClaimedDate = todayStr;
  state.gems += 5;

  saveGameState();
  syncUI();
  
  alert("🎉 ยินดีด้วยค่ะปะป๊ามะม๊า! คุณเก่งมากๆ เลยที่ทำภารกิจบำบัดจิตใจครบทุกลำดับวันนี้!\nหนูมอบโบนัสพิเศษให้: +5 เพชร 💎 เรียบร้อยแล้วนะคะ 🧡✨");
  renderDailyQuests();
}

function claimDailyQuest(questKey) {
  if (state.questsClaimed[questKey]) return;
  
  state.questsClaimed[questKey] = true;
  
  const activeMood = state.selectedMood || "Happy";
  const templates = MOOD_QUESTS_TEMPLATES[activeMood] || MOOD_QUESTS_TEMPLATES.Happy;
  const currentQuest = templates.find(q => q.key === questKey);
  
  let coinsReward = currentQuest ? currentQuest.rewardCoins : 20;
  let expReward = 20;
  
  state.coins += coinsReward;
  state.exp += expReward;
  
  alert(`🎉 รับรางวัลเควสสำเร็จ! ได้รับ +${coinsReward}🪙  +${expReward}⭐`);
  if (typeof petStageOnQuestClaimed === "function") petStageOnQuestClaimed();
  checkLevelUp();
  renderDailyQuests();
}
