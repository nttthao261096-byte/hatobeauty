export type CareLang = "vi" | "en";

export const SAMPLE_PRICE_NOTE = {
  vi: "Giá sản phẩm là [GIÁ MẪU — thay số thật]. Giá spa chốt sau khi soi da.",
  en: "Product prices are [SAMPLE — replace with live numbers]. Spa prices are confirmed after a skin check.",
} as const;

export const careProducts = [
  {
    id: "cleanser",
    image: "/images/product-cleanser-v1.jpg",
    size: "150 ml",
    price: 320000,
    filters: ["dry", "oily", "sensitive", "acne", "aftercare"],
    when: { vi: "Sáng / Tối", en: "AM / PM" },
    vi: { name: "Sữa rửa mặt dịu pH 5.5", concern: "Mọi loại da, nhất là da dễ căng", use: "Làm sạch bụi và dầu mà không kéo da khô." },
    en: { name: "Gentle pH 5.5 cleanser", concern: "All skin, especially tightness-prone", use: "Lifts the day without stripping the barrier." },
  },
  {
    id: "toner",
    image: "/images/product-toner-v1.jpg",
    size: "150 ml",
    price: 380000,
    filters: ["dry", "oily", "sensitive", "aftercare"],
    when: { vi: "Sáng / Tối", en: "AM / PM" },
    vi: { name: "Toner cân bằng", concern: "Da thiếu nước, da vừa rửa xong", use: "Cấp một lớp nước mỏng trước serum và kem." },
    en: { name: "Balancing toner", concern: "Dehydrated or freshly cleansed skin", use: "A light water layer before serum and cream." },
  },
  {
    id: "serum-ha",
    image: "/images/product-serum-ha-v1.jpg",
    size: "30 ml",
    price: 490000,
    filters: ["dry", "sensitive", "aftercare"],
    when: { vi: "Sáng / Tối", en: "AM / PM" },
    vi: { name: "Serum HA cấp ẩm", concern: "Da căng, bong nhẹ, thiếu ẩm", use: "Giữ nước trên bề mặt, da dễ chịu hơn trong ngày." },
    en: { name: "HA hydrating serum", concern: "Tight, flaky or thirsty skin", use: "Holds water at the surface so skin feels easier." },
  },
  {
    id: "serum-niacinamide",
    image: "/images/product-serum-niacinamide-v1.jpg",
    size: "30 ml",
    price: 520000,
    filters: ["oily", "acne", "aftercare"],
    when: { vi: "Tối", en: "PM" },
    vi: { name: "Serum niacinamide làm đều tone", concern: "Da xỉn, lỗ chân lông, thâm nhẹ", use: "Hỗ trợ bề mặt trông đều và bớt bóng dầu." },
    en: { name: "Niacinamide even-tone serum", concern: "Dullness, pores, light marks", use: "Helps the surface look calmer and more even." },
  },
  {
    id: "cream",
    image: "/images/product-cream-barrier-v1.jpg",
    size: "50 ml",
    price: 560000,
    filters: ["dry", "sensitive", "aftercare"],
    when: { vi: "Tối", en: "PM" },
    vi: { name: "Kem dưỡng phục hồi hàng rào", concern: "Da mỏng, dễ rát, sau spa", use: "Khóa ẩm và làm dịu cảm giác căng." },
    en: { name: "Barrier repair cream", concern: "Thin, sting-prone, post-spa skin", use: "Seals water in and eases tightness." },
  },
  {
    id: "sunscreen",
    image: "/images/product-sunscreen-v1.jpg",
    size: "50 ml",
    price: 450000,
    filters: ["dry", "oily", "sensitive", "acne", "sun", "aftercare"],
    when: { vi: "Sáng", en: "AM" },
    vi: { name: "Kem chống nắng SPF50 PA++++", concern: "Mọi da ra nắng Đà Nẵng", use: "Lớp bảo vệ hằng ngày, kết cấu mỏng." },
    en: { name: "SPF50 PA++++ sunscreen", concern: "All skin in Da Nang sun", use: "Everyday protection with a thin finish." },
  },
  {
    id: "mask",
    image: "/images/product-mask-v1.jpg",
    size: "50 ml",
    price: 280000,
    filters: ["dry", "sensitive", "aftercare"],
    when: { vi: "Sau spa", en: "After spa" },
    vi: { name: "Mặt nạ phục hồi", concern: "Da mệt, sau liệu trình", use: "Đắp 10–15 phút khi da cần một lớp dịu." },
    en: { name: "Recovery mask", concern: "Tired skin after treatment", use: "Ten to fifteen minutes when skin needs a pause." },
  },
  {
    id: "exfoliant",
    image: "/images/product-exfoliant-v1.jpg",
    size: "30 ml",
    price: 420000,
    filters: ["oily", "acne"],
    when: { vi: "Tối · 1–2 buổi/tuần", en: "PM · 1–2x / week" },
    vi: { name: "Tẩy da chết hóa học nhẹ", concern: "Bề mặt sần, lỗ chân lông", use: "Dùng thưa; không dùng đêm vừa soi da hoặc vừa peel." },
    en: { name: "Gentle liquid exfoliant", concern: "Rough texture and visible pores", use: "Use sparingly; skip the night of a facial or peel." },
  },
  {
    id: "cleansing-balm",
    image: "/images/product-cleansing-balm-v1.png",
    size: "80 g",
    price: 390000,
    filters: ["dry", "sensitive", "sun"],
    when: { vi: "Tối", en: "PM" },
    vi: { name: "Sáp tẩy trang dịu nhẹ", concern: "Da có kem chống nắng hoặc trang điểm", use: "Hòa tan lớp chống nắng và trang điểm trước bước sữa rửa mặt." },
    en: { name: "Gentle cleansing balm", concern: "Skin wearing sunscreen or makeup", use: "Melts sunscreen and makeup before your water-based cleanser." },
  },
  {
    id: "soothing-gel",
    image: "/images/product-soothing-gel-v1.png",
    size: "50 ml",
    price: 460000,
    filters: ["oily", "sensitive", "acne", "aftercare"],
    when: { vi: "Sáng / Tối", en: "AM / PM" },
    vi: { name: "Gel serum làm dịu", concern: "Da nóng, dễ đỏ hoặc thiếu nước", use: "Bổ sung lớp ẩm mỏng nhẹ để da dễ chịu hơn, không gây nặng mặt." },
    en: { name: "Soothing gel serum", concern: "Warm, redness-prone or dehydrated skin", use: "Adds a light layer of hydration without a heavy finish." },
  },
] as const;

export type ProductId = (typeof careProducts)[number]["id"];
export type ProductFilter = "all" | "dry" | "oily" | "sensitive" | "acne" | "sun" | "aftercare";

export const productFilters: Record<CareLang, Array<{ id: ProductFilter; label: string }>> = {
  vi: [
    { id: "all", label: "Tất cả" },
    { id: "dry", label: "Da khô" },
    { id: "oily", label: "Da dầu" },
    { id: "sensitive", label: "Nhạy cảm" },
    { id: "acne", label: "Mụn nhẹ" },
    { id: "sun", label: "Chống nắng" },
    { id: "aftercare", label: "Sau spa" },
  ],
  en: [
    { id: "all", label: "All" },
    { id: "dry", label: "Dry" },
    { id: "oily", label: "Oily" },
    { id: "sensitive", label: "Sensitive" },
    { id: "acne", label: "Mild acne" },
    { id: "sun", label: "Sunscreen" },
    { id: "aftercare", label: "After spa" },
  ],
};

export function formatVnd(value: number) {
  return `${value.toLocaleString("vi-VN")}đ`;
}

export function productById(id: string) {
  return careProducts.find((item) => item.id === id);
}

export const careSteps = [
  {
    id: "01",
    minutes: { vi: "10 phút", en: "10 min" },
    output: { vi: "Phiếu nhu cầu + ảnh da ngày đầu (nếu bạn đồng ý).", en: "A needs note and a day-one photo if you agree." },
    vi: { title: "Tiếp nhận & lắng nghe", body: "Bạn kể da đang căng, mụn hay xỉn — và ngân sách muốn giữ. Chúng tôi ghi lại sản phẩm đang dùng, thuốc nếu có, và việc cần tránh hôm đó." },
    en: { title: "Arrive & listen", body: "You tell us tightness, breakouts or dullness — and the budget you want to keep. We note current products, medication if any, and what to skip that day." },
  },
  {
    id: "02",
    minutes: { vi: "10–15 phút", en: "10–15 min" },
    output: { vi: "Tóm tắt tình trạng da bằng lời dễ hiểu, không thuật ngữ chồng.", en: "A plain-language skin summary, without stacked jargon." },
    vi: { title: "Soi / đánh giá tình trạng da", body: "Đèn soi và quan sát bề mặt: hàng rào, dầu, thâm, lỗ chân lông. Đây là bước thẩm mỹ, không phải chẩn đoán da liễu. Nếu da đang tổn thương, chúng tôi hoãn liệu trình." },
    en: { title: "Skin check", body: "A lamp and a close look at barrier, oil, marks and pores. This is cosmetic care, not a dermatology diagnosis. If skin is injured, we postpone treatment." },
  },
  {
    id: "03",
    minutes: { vi: "10 phút", en: "10 min" },
    output: { vi: "Mục tiêu 4–6 tuần + khoảng giá spa + list mang về nhà.", en: "A 4–6 week aim, spa price range and a take-home list." },
    vi: { title: "Thống nhất mục tiêu & ngân sách", body: "Chọn 1–2 mục tiêu thật: bớt căng, đều hơn, ít bóng. Nói rõ số buổi gợi ý và giá từ–đến trước khi nằm ghế. Bạn có thể chỉ lấy sản phẩm, chưa làm liệu trình." },
    en: { title: "Agree aim & budget", body: "Pick one or two real aims: less tightness, more even, less shine. Session count and a from–to price are said before you lie down. You can take products only." },
  },
  {
    id: "04",
    minutes: { vi: "60–90 phút", en: "60–90 min" },
    output: { vi: "Phiếu liệu trình trong ngày + hướng dẫn 48 giờ đầu.", en: "That day’s treatment note and the first-48-hour guide." },
    vi: { title: "Thực hiện liệu trình tại spa", body: "Làm sạch, chăm đúng lớp da vừa soi, không thêm bước “cho đủ gói”. Nếu da báo rát, chúng tôi dừng và chuyển sang làm dịu." },
    en: { title: "Treatment in the room", body: "Cleanse and care for the skin we just checked — no extra steps to fill a package. If it stings, we stop and soothe." },
  },
  {
    id: "05",
    minutes: { vi: "10 phút", en: "10 min" },
    output: { vi: "Bộ dưỡng tại nhà + lịch hẹn tái đánh giá 4–6 tuần.", en: "A home set and a 4–6 week review date." },
    vi: { title: "Mang về nhà + hẹn tái đánh giá", body: "Bạn nhận 2–4 món dùng sáng/tối, viết thứ tự trên phiếu. Buổi sau soi lại; giữ, bớt hoặc đổi — không giữ liệu trình vì đã đóng gói." },
    en: { title: "Home care + review date", body: "You leave with two to four AM/PM items, order written on the note. Next visit we re-check; keep, reduce or change — never because a package was prepaid." },
  },
] as const;

export const skinJourneys = [
  {
    id: "barrier",
    image: "/images/lifestyle-aftercare-v1.jpg",
    products: ["cleanser", "serum-ha", "cream"] as const,
    vi: {
      name: "Da thiếu ẩm / hàng rào yếu",
      fit: "Da căng sau rửa, bong nhẹ, dễ rát gió biển.",
      sessions: [
        ["Làm sạch dịu", "1 buổi / tuần đầu", "450.000–650.000đ"],
        ["Phục hồi hàng rào", "2 tuần / lần", "650.000–950.000đ"],
        ["Dưỡng ẩm chuyên sâu", "3–4 tuần / lần", "750.000–1.200.000đ"],
      ],
      result: "Sau 4–6 tuần, da thường bớt căng và dễ chịu hơn khi ra gió. Mức ẩm còn tùy cơ địa và kem chống nắng mỗi ngày.",
    },
    en: {
      name: "Dehydrated / weak barrier",
      fit: "Tight after washing, light flaking, sting in sea wind.",
      sessions: [
        ["Gentle cleanse facial", "Weekly at first", "VND 450,000–650,000"],
        ["Barrier recovery", "Every 2 weeks", "VND 650,000–950,000"],
        ["Deep hydration", "Every 3–4 weeks", "VND 750,000–1,200,000"],
      ],
      result: "After 4–6 weeks, tightness often eases in the wind. Hydration still depends on your skin and daily SPF.",
    },
  },
  {
    id: "texture",
    image: "/images/lifestyle-treatment-v1.jpg",
    products: ["cleanser", "serum-niacinamide", "sunscreen"] as const,
    vi: {
      name: "Da xỉn, lỗ chân lông, bề mặt không đều",
      fit: "Da dầu nhẹ, makeup không mịn, lỗ chân lông vùng má/T-zone.",
      sessions: [
        ["Làm sạch sâu", "2 tuần / lần", "550.000–850.000đ"],
        ["Làm đều bề mặt", "3 tuần / lần", "650.000–950.000đ"],
        ["Cấp ẩm + chống nắng tại nhà", "Hằng ngày", "Theo bộ mang về"],
      ],
      result: "Sau 4–6 tuần, bề mặt có thể trông mịn và đều hơn. Lỗ chân lông không “khép”; ta chỉ làm da dễ trang điểm hơn.",
    },
    en: {
      name: "Dullness, pores, uneven surface",
      fit: "Light oil, makeup that sits roughly, visible cheek or T-zone pores.",
      sessions: [
        ["Deep cleanse facial", "Every 2 weeks", "VND 550,000–850,000"],
        ["Surface-evening care", "Every 3 weeks", "VND 650,000–950,000"],
        ["Home hydration + SPF", "Daily", "Per take-home set"],
      ],
      result: "After 4–6 weeks the surface may look smoother. Pores are not “closed”; makeup simply sits more easily.",
    },
  },
  {
    id: "blemishes",
    image: "/images/lifestyle-skin-assess-v1.jpg",
    products: ["cleanser", "serum-niacinamide", "sunscreen"] as const,
    vi: {
      name: "Da mụn nhẹ / thâm sau mụn",
      fit: "Mụn sưng ít, thâm cũ, không đang uống thuốc da liễu.",
      sessions: [
        ["Làm sạch cho da mụn nhẹ", "1–2 tuần / lần", "550.000–850.000đ"],
        ["Chăm thâm thẩm mỹ", "2–3 tuần / lần", "650.000–950.000đ"],
        ["Soi lại", "Sau 4–6 tuần", "Theo lịch đã hẹn"],
      ],
      result: "Đây là chăm sóc thẩm mỹ, không kê thuốc và không thay da liễu. Thâm và mụn mới còn tùy hormone, gối và kem chống nắng.",
    },
    en: {
      name: "Mild blemish / post-mark skin",
      fit: "Few inflamed spots, older marks, not on dermatology medication.",
      sessions: [
        ["Blemish-aware cleanse", "Every 1–2 weeks", "VND 550,000–850,000"],
        ["Cosmetic mark care", "Every 2–3 weeks", "VND 650,000–950,000"],
        ["Review", "After 4–6 weeks", "On the booked date"],
      ],
      result: "This is cosmetic care, not a prescription and not a substitute for dermatology. Marks and new spots still follow hormones, sleep and SPF.",
    },
  },
  {
    id: "glow",
    image: "/images/service-skin-v2.webp",
    products: ["toner", "cream", "sunscreen"] as const,
    vi: {
      name: "Da cần căng bóng / duy trì",
      fit: "Da ổn, muốn giữ đều và đủ ẩm theo tháng.",
      sessions: [
        ["Facial duy trì", "3–4 tuần / lần", "650.000–1.200.000đ"],
        ["Dưỡng + massage mặt", "4 tuần / lần", "550.000–850.000đ"],
        ["Bộ dưỡng tại nhà", "Hằng ngày", "Theo 3 món mang về"],
      ],
      result: "Sau 4–6 tuần, da thường giữ độ ẩm đều hơn nếu không bỏ chống nắng. “Căng bóng” là cảm giác bề mặt, không phải cam kết trắng hay căng chỉ.",
    },
    en: {
      name: "Glow / maintenance",
      fit: "Skin that is steady and wants monthly evenness and moisture.",
      sessions: [
        ["Maintenance facial", "Every 3–4 weeks", "VND 650,000–1,200,000"],
        ["Nourish + facial massage", "Every 4 weeks", "VND 550,000–850,000"],
        ["Home set", "Daily", "The three take-home items"],
      ],
      result: "After 4–6 weeks moisture often holds more evenly if SPF stays. “Glow” is a surface feeling, not a promise of paleness or a lifted contour.",
    },
  },
] as const;

export const careCombos = [
  {
    id: "combo-barrier",
    image: "/images/lifestyle-aftercare-v1.jpg",
    items: ["cleanser", "serum-ha", "cream"] as const,
    save: 180000,
    vi: { name: "Bộ hàng rào", fit: "Da căng, dễ rát, mới làm sạch sâu." },
    en: { name: "Barrier set", fit: "Tight, sting-prone, after a deep cleanse." },
  },
  {
    id: "combo-even",
    image: "/images/lifestyle-aftercare-v1.jpg",
    items: ["cleanser", "serum-niacinamide", "sunscreen"] as const,
    save: 170000,
    vi: { name: "Bộ đều bề mặt", fit: "Da xỉn, lỗ chân lông, ra nắng nhiều." },
    en: { name: "Even-surface set", fit: "Dullness, pores, a lot of sun." },
  },
  {
    id: "combo-maintain",
    image: "/images/lifestyle-aftercare-v1.jpg",
    items: ["toner", "cream", "sunscreen"] as const,
    save: 170000,
    vi: { name: "Bộ duy trì tháng", fit: "Da ổn, cần giữ ẩm và chống nắng." },
    en: { name: "Monthly maintain set", fit: "Steady skin that needs moisture and SPF." },
  },
] as const;

export const spaSkinPrices = [
  { vi: "Làm sạch dịu / facial cơ bản", en: "Gentle cleanse / essential facial", minutes: "60", from: 450000, to: 650000 },
  { vi: "Phục hồi hàng rào", en: "Barrier recovery", minutes: "75", from: 650000, to: 950000 },
  { vi: "Chăm sóc da chuyên sâu", en: "Intensive skin care", minutes: "90", from: 750000, to: 1200000 },
  { vi: "Làm sạch cho da mụn nhẹ", en: "Blemish-aware cleanse", minutes: "75", from: 550000, to: 850000 },
  { vi: "Soi da + tư vấn lộ trình", en: "Skin check + plan", minutes: "20–30", from: 0, to: 0 },
] as const;

export const careFaqs = [
  {
    vi: ["Soi da có mất phí không?", "Khi đặt liệu trình trong ngày, bước soi nằm trong buổi. Nếu bạn chỉ đến hỏi lộ trình, hãy nhắn trước — chúng tôi xếp 20 phút, không phát sinh ẩn."],
    en: ["Is the skin check free?", "When you book treatment that day, the check is part of the visit. If you only want a plan, message first — we set 20 minutes, no hidden add-on."],
  },
  {
    vi: ["Giá trên web có phải giá chốt?", "Giá spa là khoảng từ–đến. Giá chốt sau khi soi da và nói mục tiêu. Giá sản phẩm đang là giá mẫu, sẽ thay khi nhập hàng thật."],
    en: ["Are website prices final?", "Spa prices are a from–to range, confirmed after the check. Product prices are samples until live stock is entered."],
  },
  {
    vi: ["Có phải mua đủ bộ không?", "Không. Bạn có thể lấy 1–2 món. Bộ combo chỉ tiết kiệm nếu dùng đủ 3 món."],
    en: ["Do I have to buy a full set?", "No. Take one or two items. Combos only save money if you use all three."],
  },
  {
    vi: ["Da đang mụn viêm có làm được không?", "Nếu đang sưng, chảy dịch hoặc vừa được bác sĩ kê thuốc, hãy hoãn. Chúng tôi không nặn, không kê thuốc, không thay phòng khám da."],
    en: ["Can I come with inflamed acne?", "If it is swollen, weeping, or you are on a clinician’s prescription, postpone. We do not extract, prescribe, or replace a skin clinic."],
  },
  {
    vi: ["Bao lâu làm lại một buổi?", "Da khô thường 3–4 tuần. Da dầu hoặc mụn nhẹ có thể 2 tuần/lần trong tháng đầu, rồi thưa ra. Lịch ghi trên phiếu, không bán gói cứng."],
    en: ["How soon do I return?", "Drier skin is often every 3–4 weeks. Oily or mildly blemished skin may be fortnightly in month one, then spaced. The note holds the date — no rigid packages."],
  },
  {
    vi: ["Mang sản phẩm nhà đang dùng được không?", "Nên mang. Tránh chồng hoạt chất mạnh đêm vừa làm spa. Chúng tôi ghi thứ tự sáng/tối trên phiếu."],
    en: ["Can I bring what I already use?", "Please do. Avoid stacking strong actives the night of a facial. AM/PM order is written on your note."],
  },
] as const;

export const visitNotes = {
  vi: {
    before: ["Đến mặt sạch hoặc makeup mỏng.", "Báo thuốc uống, kem kê toa, lần peel gần nhất.", "Không kỳ da mạnh 48 giờ trước."],
    after: ["48 giờ đầu: rửa dịu, dưỡng, chống nắng.", "Tránh xông nóng, biển, tẩy mạnh.", "Nhắn chúng tôi nếu da rát kéo hơn một ngày."],
  },
  en: {
    before: ["Arrive clean or with light makeup.", "Tell us about medication, prescribed cream, recent peels.", "No strong scrubbing for 48 hours before."],
    after: ["First 48 hours: gentle cleanse, cream, SPF.", "Skip heat, sea and strong exfoliant.", "Message us if sting lasts more than a day."],
  },
} as const;
