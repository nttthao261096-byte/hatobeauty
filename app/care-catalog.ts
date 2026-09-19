import { isBusinessDataApproved } from "./business-data";
export type CareLang = "vi" | "en";

export const SAMPLE_PRICE_NOTE = {
  vi: "Giá sản phẩm mang tính tham khảo và có thể thay đổi. Vui lòng hỏi chuyên viên trước khi chọn mua.",
  en: "Product prices are indicative and may change. Please ask the team before purchasing.",
} as const;

const draft_careProducts = [
  {
    id: "lumixderm",
    image: "/images/product-dermeden-lumixderm.png",
    size: "40 ml",
    price: 0,
    priceLabel: { vi: "Giá hãng · 60,90 €", en: "Official price · €60.90" },
    brand: "DermEden",
    origin: "France",
    officialSource:
      "https://dermeden.com/a/l/en/collections/soins-dejour/products/lumixder-creme-eclaircissante",
    filters: ["dry", "oily", "sensitive"],
    when: { vi: "Hằng ngày", en: "Daily" },
    vi: {
      name: "DermEden LUMIXDERM Brightening Cream",
      concern: "Da không đều màu, có đốm sậm màu",
      use: "Kem dưỡng hỗ trợ bề mặt da trông đều màu, rạng rỡ hơn và duy trì độ ẩm.",
    },
    en: {
      name: "DermEden LUMIXDERM Brightening Cream",
      concern: "Uneven tone and visible dark spots",
      use: "A moisturising cream that helps skin look brighter and more even-toned.",
    },
  },
  {
    id: "purles-sos-calm-mask",
    image: "/images/product-purles-156-sos-calm-mask.png",
    size: "50 ml",
    price: 0,
    priceLabel: {
      vi: "Giá hãng · 96,00 zł",
      en: "Official price · PLN 96.00",
    },
    brand: "Purlés",
    origin: "Poland",
    officialSource:
      "https://products.purles.eu/en/products/156-sos-calm-mask-17074.html",
    filters: ["dry", "sensitive", "aftercare"],
    when: { vi: "2–3 lần/tuần", en: "2–3 times a week" },
    vi: {
      name: "Purlés 156 SOS Calm Mask",
      concern: "Da nhạy cảm, khô, thiếu nước hoặc dễ khó chịu",
      use: "Mặt nạ gel-kem giúp cấp ẩm, làm dịu cảm giác khó chịu và hỗ trợ hàng rào da.",
    },
    en: {
      name: "Purlés 156 SOS Calm Mask",
      concern: "Sensitive, dry, dehydrated or uncomfortable skin",
      use: "A gel-cream mask that hydrates, comforts and supports the skin barrier.",
    },
  },
  {
    id: "dermeden-intense-night-cream",
    image: "/images/product-dermeden-intense-night-cream.png",
    size: "50 ml",
    price: 0,
    priceLabel: { vi: "Giá hãng · 55,90 €", en: "Official price · €55.90" },
    brand: "DermEden",
    origin: "France",
    officialSource:
      "https://dermeden.com/products/creme-de-nuit-anti-age-intense",
    filters: ["dry", "oily"],
    when: { vi: "Tối · bắt đầu cách đêm", en: "PM · start every other night" },
    vi: {
      name: "DermEden Intense Night Cream",
      concern: "Da không đều màu, bề mặt thô ráp, có dấu hiệu tuổi tác",
      use: "Kem dưỡng đêm có retinol và AHA, hỗ trợ bề mặt da trông mịn và đều màu hơn. Dùng chống nắng vào ban ngày.",
    },
    en: {
      name: "DermEden Intense Night Cream",
      concern: "Uneven tone, rough texture and visible signs of ageing",
      use: "A retinol and AHA night cream that helps skin look smoother and more even. Use sunscreen during the day.",
    },
  },
  {
    id: "obagi-claribright",
    image: "/images/product-obagi-claribright.png",
    size: "50 g",
    price: 0,
    priceLabel: {
      vi: "Giá hãng · 178,00 USD",
      en: "Official price · $178.00",
    },
    brand: "SUZANOBAGIMD®",
    origin: "United States",
    officialSource:
      "https://www.obagi.com/products/suzanobagimd-claribright-radiance-brightening-lotion",
    filters: ["dry", "oily", "sensitive"],
    when: { vi: "Sáng / Tối", en: "AM / PM" },
    vi: {
      name: "SUZANOBAGIMD® Claribright Lotion",
      concern: "Da không đều màu, nhạy cảm hoặc có vùng sậm màu",
      use: "Lotion dưỡng sáng giúp bề mặt da trông đều màu hơn, đồng thời hỗ trợ làm dịu và hàng rào da.",
    },
    en: {
      name: "SUZANOBAGIMD® Claribright Lotion",
      concern: "Uneven tone, sensitivity or visible discolouration",
      use: "A brightening lotion that helps skin look more even while supporting comfort and the skin barrier.",
    },
  },
  {
    id: "cleanser",
    image: "/images/product-oxygen-2-in-1-cleanser.jpg",
    size: "200 ml",
    price: 1050000,
    brand: "OXYGEN",
    origin: "New Zealand",
    filters: ["oily", "sensitive", "acne"],
    when: { vi: "Sáng / Tối", en: "AM / PM" },
    vi: {
      name: "Sữa rửa mặt OXYGEN 2 in 1 Cleanser",
      concern: "Da dầu, da mụn và da nhạy cảm",
      use: "Làm sạch sâu, loại bỏ dầu thừa và tẩy tế bào chết nhẹ với đá bọt siêu mịn.",
    },
    en: {
      name: "OXYGEN 2 in 1 Cleanser",
      concern: "Oily, blemish-prone and sensitive skin",
      use: "Deep-cleanses excess oil and gently exfoliates with ultra-fine pumice.",
    },
  },
  {
    id: "sunscreen",
    image: "/images/product-sunscreen-v1.jpg",
    size: "50 ml",
    price: 450000,
    filters: ["dry", "oily", "sensitive", "acne", "sun", "aftercare"],
    when: { vi: "Sáng", en: "AM" },
    vi: {
      name: "Kem chống nắng SPF50 PA++++",
      concern: "Mọi da ra nắng Đà Nẵng",
      use: "Lớp bảo vệ hằng ngày, kết cấu mỏng.",
    },
    en: {
      name: "SPF50 PA++++ sunscreen",
      concern: "All skin in Da Nang sun",
      use: "Everyday protection with a thin finish.",
    },
  },
  {
    id: "mask",
    image: "/images/product-mask-v1.jpg",
    size: "50 ml",
    price: 280000,
    filters: ["dry", "sensitive", "aftercare"],
    when: { vi: "Sau spa", en: "After spa" },
    vi: {
      name: "Mặt nạ phục hồi",
      concern: "Da mệt, sau liệu trình",
      use: "Đắp 10–15 phút khi da cần một lớp dịu.",
    },
    en: {
      name: "Recovery mask",
      concern: "Tired skin after treatment",
      use: "Ten to fifteen minutes when skin needs a pause.",
    },
  },
  {
    id: "exfoliant",
    image: "/images/product-exfoliant-v1.jpg",
    size: "30 ml",
    price: 420000,
    filters: ["oily", "acne"],
    when: { vi: "Tối · 1–2 buổi/tuần", en: "PM · 1–2x / week" },
    vi: {
      name: "Tẩy da chết hóa học nhẹ",
      concern: "Bề mặt sần, lỗ chân lông",
      use: "Dùng thưa; không dùng đêm vừa soi da hoặc vừa peel.",
    },
    en: {
      name: "Gentle liquid exfoliant",
      concern: "Rough texture and visible pores",
      use: "Use sparingly; skip the night of a facial or peel.",
    },
  },
  {
    id: "cleansing-balm",
    image: "/images/product-cleansing-balm-v1.png",
    size: "80 g",
    price: 390000,
    filters: ["dry", "sensitive", "sun"],
    when: { vi: "Tối", en: "PM" },
    vi: {
      name: "Sáp tẩy trang dịu nhẹ",
      concern: "Da có kem chống nắng hoặc trang điểm",
      use: "Hòa tan lớp chống nắng và trang điểm trước bước sữa rửa mặt.",
    },
    en: {
      name: "Gentle cleansing balm",
      concern: "Skin wearing sunscreen or makeup",
      use: "Melts sunscreen and makeup before your water-based cleanser.",
    },
  },
  {
    id: "soothing-gel",
    image: "/images/product-soothing-gel-v1.png",
    size: "50 ml",
    price: 460000,
    filters: ["oily", "sensitive", "acne", "aftercare"],
    when: { vi: "Sáng / Tối", en: "AM / PM" },
    vi: {
      name: "Gel serum làm dịu",
      concern: "Da nóng, dễ đỏ hoặc thiếu nước",
      use: "Bổ sung lớp ẩm mỏng nhẹ để da dễ chịu hơn, không gây nặng mặt.",
    },
    en: {
      name: "Soothing gel serum",
      concern: "Warm, redness-prone or dehydrated skin",
      use: "Adds a light layer of hydration without a heavy finish.",
    },
  },
] as const;

export type ProductId = (typeof careProducts)[number]["id"];
export type ProductFilter =
  "all" | "dry" | "oily" | "sensitive" | "acne" | "sun" | "aftercare";

export const productFilters: Record<
  CareLang,
  Array<{ id: ProductFilter; label: string }>
> = {
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
    output: {
      vi: "Ghi nhận nhu cầu và thói quen chăm sóc hiện tại.",
      en: "A clear understanding of your needs and current routine.",
    },
    vi: {
      title: "Tiếp nhận & lắng nghe",
      body: "Bạn kể da đang căng, mụn hay xỉn — và ngân sách muốn giữ. Chúng tôi ghi lại sản phẩm đang dùng, thuốc nếu có, và việc cần tránh hôm đó.",
    },
    en: {
      title: "Tell us about your skin",
      body: "Share your concerns, current products and budget. Let us know about any medication or recent reactions that may affect your care.",
    },
  },
  {
    id: "02",
    minutes: { vi: "10–15 phút", en: "10–15 min" },
    output: {
      vi: "Giải thích nhu cầu của da bằng ngôn ngữ dễ hiểu.",
      en: "A clear summary of your skin’s needs.",
    },
    vi: {
      title: "Soi / đánh giá tình trạng da",
      body: "Trao đổi và quan sát tình trạng bề mặt da để lựa chọn chăm sóc phù hợp. Đây không phải chẩn đoán da liễu; nếu da có tổn thương hoặc phản ứng chưa rõ, cần được bác sĩ tư vấn trước.",
    },
    en: {
      title: "Skin check",
      body: "We discuss your concerns and assess your skin's surface to guide suitable cosmetic care. Injuries or unexplained reactions need medical advice before a visit.",
    },
  },
  {
    id: "03",
    minutes: { vi: "10 phút", en: "10 min" },
    output: {
      vi: "Mục tiêu chăm sóc và chi phí được trao đổi rõ ràng.",
      en: "Agreed care goals and clear pricing.",
    },
    vi: {
      title: "Thống nhất mục tiêu & ngân sách",
      body: "Cùng xác định nhu cầu ưu tiên và ngân sách của bạn. Các bước chăm sóc, thời lượng và chi phí được xác nhận trước khi thực hiện.",
    },
    en: {
      title: "Agree on goals and budget",
      body: "We discuss your priorities and budget, then explain the care plan and confirm the duration and price before we begin.",
    },
  },
  {
    id: "04",
    minutes: { vi: "60–90 phút", en: "60–90 min" },
    output: {
      vi: "Các bước chăm sóc phù hợp với nhu cầu đã thống nhất.",
      en: "Care tailored to the needs you have discussed.",
    },
    vi: {
      title: "Thực hiện liệu trình tại spa",
      body: "Thực hiện các bước đã thống nhất, đồng thời theo dõi cảm giác của bạn. Hãy báo ngay cho kỹ thuật viên nếu thấy khó chịu.",
    },
    en: {
      title: "Your personalised care",
      body: "Each step follows the plan you have agreed on. Let your therapist know straight away if anything feels uncomfortable.",
    },
  },
  {
    id: "05",
    minutes: { vi: "10 phút", en: "10 min" },
    output: {
      vi: "Hướng dẫn chăm sóc tại nhà và thời điểm phù hợp để trao đổi lại.",
      en: "Home-care guidance and advice on when to check in.",
    },
    vi: {
      title: "Chăm sóc tại nhà & theo dõi",
      body: "Trao đổi cách duy trì chu trình tại nhà và những điểm cần theo dõi. Sản phẩm bổ sung và lần hẹn tiếp theo chỉ được chọn khi phù hợp với nhu cầu của bạn.",
    },
    en: {
      title: "Home care and follow-up",
      body: "We explain how to maintain your routine and what to look out for. Any additional products or future visits should fit your needs.",
    },
  },
] as const;

const draft_skinJourneys = [
  {
    id: "barrier",
    image: "/images/lifestyle-aftercare-v1.jpg",
    products: ["cleanser", "purles-sos-calm-mask", "lumixderm"] as const,
    vi: {
      name: "Da thiếu ẩm / hàng rào yếu",
      fit: "Da căng sau rửa, bong nhẹ, dễ rát gió biển.",
      sessions: [
        ["Làm sạch dịu", "1 buổi / tuần đầu", "450.000–650.000đ"],
        ["Phục hồi hàng rào", "2 tuần / lần", "650.000–950.000đ"],
        ["Dưỡng ẩm chuyên sâu", "3–4 tuần / lần", "750.000–1.200.000đ"],
      ],
      result:
        "Sau 4–6 tuần, da thường bớt căng và dễ chịu hơn khi ra gió. Mức ẩm còn tùy cơ địa và kem chống nắng mỗi ngày.",
    },
    en: {
      name: "Dehydrated / weak barrier",
      fit: "Tight after washing, light flaking, sting in sea wind.",
      sessions: [
        ["Gentle cleanse facial", "Weekly at first", "VND 450,000–650,000"],
        ["Barrier recovery", "Every 2 weeks", "VND 650,000–950,000"],
        ["Deep hydration", "Every 3–4 weeks", "VND 750,000–1,200,000"],
      ],
      result:
        "After 4–6 weeks, tightness often eases in the wind. Hydration still depends on your skin and daily SPF.",
    },
  },
  {
    id: "texture",
    image: "/images/lifestyle-treatment-v1.jpg",
    products: ["cleanser", "obagi-claribright", "sunscreen"] as const,
    vi: {
      name: "Da xỉn, lỗ chân lông, bề mặt không đều",
      fit: "Da dầu nhẹ, makeup không mịn, lỗ chân lông vùng má/T-zone.",
      sessions: [
        ["Làm sạch sâu", "2 tuần / lần", "550.000–850.000đ"],
        ["Làm đều bề mặt", "3 tuần / lần", "650.000–950.000đ"],
        ["Cấp ẩm + chống nắng tại nhà", "Hằng ngày", "Theo bộ mang về"],
      ],
      result:
        "Sau 4–6 tuần, bề mặt có thể trông mịn và đều hơn. Lỗ chân lông không “khép”; ta chỉ làm da dễ trang điểm hơn.",
    },
    en: {
      name: "Dullness, pores, uneven surface",
      fit: "Light oil, makeup that sits roughly, visible cheek or T-zone pores.",
      sessions: [
        ["Deep cleanse facial", "Every 2 weeks", "VND 550,000–850,000"],
        ["Surface-evening care", "Every 3 weeks", "VND 650,000–950,000"],
        ["Home hydration + SPF", "Daily", "Per take-home set"],
      ],
      result:
        "After 4–6 weeks the surface may look smoother. Pores are not “closed”; makeup simply sits more easily.",
    },
  },
  {
    id: "blemishes",
    image: "/images/lifestyle-skin-assess-v1.jpg",
    products: ["cleanser", "obagi-claribright", "sunscreen"] as const,
    vi: {
      name: "Da mụn nhẹ / thâm sau mụn",
      fit: "Mụn sưng ít, thâm cũ, không đang uống thuốc da liễu.",
      sessions: [
        ["Làm sạch cho da mụn nhẹ", "1–2 tuần / lần", "550.000–850.000đ"],
        ["Chăm thâm thẩm mỹ", "2–3 tuần / lần", "650.000–950.000đ"],
        ["Soi lại", "Sau 4–6 tuần", "Theo lịch đã hẹn"],
      ],
      result:
        "Đây là chăm sóc thẩm mỹ, không kê thuốc và không thay da liễu. Thâm và mụn mới còn tùy hormone, gối và kem chống nắng.",
    },
    en: {
      name: "Mild blemish / post-mark skin",
      fit: "Few inflamed spots, older marks, not on dermatology medication.",
      sessions: [
        ["Blemish-aware cleanse", "Every 1–2 weeks", "VND 550,000–850,000"],
        ["Cosmetic mark care", "Every 2–3 weeks", "VND 650,000–950,000"],
        ["Review", "After 4–6 weeks", "On the booked date"],
      ],
      result:
        "This is cosmetic care, not a prescription and not a substitute for dermatology. Marks and new spots still follow hormones, sleep and SPF.",
    },
  },
  {
    id: "glow",
    image: "/images/service-skin-v2.webp",
    products: ["lumixderm", "purles-sos-calm-mask", "sunscreen"] as const,
    vi: {
      name: "Da cần căng bóng / duy trì",
      fit: "Da ổn, muốn giữ đều và đủ ẩm theo tháng.",
      sessions: [
        ["Facial duy trì", "3–4 tuần / lần", "650.000–1.200.000đ"],
        ["Dưỡng + massage mặt", "4 tuần / lần", "550.000–850.000đ"],
        ["Bộ dưỡng tại nhà", "Hằng ngày", "Theo 3 món mang về"],
      ],
      result:
        "Sau 4–6 tuần, da thường giữ độ ẩm đều hơn nếu không bỏ chống nắng. “Căng bóng” là cảm giác bề mặt, không phải cam kết trắng hay căng chỉ.",
    },
    en: {
      name: "Glow / maintenance",
      fit: "Skin that is steady and wants monthly evenness and moisture.",
      sessions: [
        ["Maintenance facial", "Every 3–4 weeks", "VND 650,000–1,200,000"],
        ["Nourish + facial massage", "Every 4 weeks", "VND 550,000–850,000"],
        ["Home set", "Daily", "The three take-home items"],
      ],
      result:
        "After 4–6 weeks moisture often holds more evenly if SPF stays. “Glow” is a surface feeling, not a promise of paleness or a lifted contour.",
    },
  },
] as const;

const draft_careCombos = [
  {
    id: "combo-barrier",
    image: "/images/lifestyle-aftercare-v1.jpg",
    items: ["cleanser", "purles-sos-calm-mask", "lumixderm"] as const,
    save: 180000,
    vi: { name: "Bộ hàng rào", fit: "Da căng, dễ rát, mới làm sạch sâu." },
    en: {
      name: "Barrier set",
      fit: "Tight, sting-prone, after a deep cleanse.",
    },
  },
  {
    id: "combo-even",
    image: "/images/lifestyle-aftercare-v1.jpg",
    items: ["cleanser", "obagi-claribright", "sunscreen"] as const,
    save: 170000,
    vi: { name: "Bộ đều bề mặt", fit: "Da xỉn, lỗ chân lông, ra nắng nhiều." },
    en: { name: "Even-surface set", fit: "Dullness, pores, a lot of sun." },
  },
  {
    id: "combo-maintain",
    image: "/images/lifestyle-aftercare-v1.jpg",
    items: ["lumixderm", "purles-sos-calm-mask", "sunscreen"] as const,
    save: 170000,
    vi: { name: "Bộ duy trì tháng", fit: "Da ổn, cần giữ ẩm và chống nắng." },
    en: {
      name: "Monthly maintain set",
      fit: "Steady skin that needs moisture and SPF.",
    },
  },
] as const;

const draft_spaSkinPrices = [
  {
    vi: "Làm sạch dịu / facial cơ bản",
    en: "Gentle cleanse / essential facial",
    minutes: "60",
    from: 450000,
    to: 650000,
  },
  {
    vi: "Phục hồi hàng rào",
    en: "Barrier recovery",
    minutes: "75",
    from: 650000,
    to: 950000,
  },
  {
    vi: "Chăm sóc da chuyên sâu",
    en: "Intensive skin care",
    minutes: "90",
    from: 750000,
    to: 1200000,
  },
  {
    vi: "Làm sạch cho da mụn nhẹ",
    en: "Blemish-aware cleanse",
    minutes: "75",
    from: 550000,
    to: 850000,
  },
  {
    vi: "Soi da + tư vấn lộ trình",
    en: "Skin check + plan",
    minutes: "20–30",
    from: 0,
    to: 0,
  },
] as const;

export const careFaqs = [
  {
    vi: [
      "Chi phí được xác nhận khi nào?",
      "Vui lòng liên hệ trước buổi hẹn để xác nhận dịch vụ, thời lượng và chi phí.",
    ],
    en: [
      "When is pricing confirmed?",
      "Please contact us before your visit to confirm the service, duration and pricing.",
    ],
  },
  {
    vi: [
      "Tôi nên chia sẻ thông tin gì trước buổi hẹn?",
      "Hãy chia sẻ tình trạng da, sản phẩm đang dùng, dị ứng và các liệu trình gần đây. Với vấn đề đang được bác sĩ theo dõi, hãy hỏi ý kiến bác sĩ trước.",
    ],
    en: [
      "What should I share before my visit?",
      "Tell us about your skin, current products, allergies and recent treatments. If you are under medical care, check with your clinician first.",
    ],
  },
  {
    vi: [
      "Có thể mang sản phẩm đang dùng để trao đổi không?",
      "Bạn có thể mang sản phẩm hoặc danh sách thành phần để trao đổi về chu trình hiện tại.",
    ],
    en: [
      "Can I bring my current products?",
      "You can bring your products or an ingredient list to discuss your current routine.",
    ],
  },
] as const;

export const visitNotes = {
  vi: {
    before: [
      "Đến mặt sạch hoặc makeup mỏng.",
      "Báo thuốc uống, kem kê toa, lần peel gần nhất.",
      "Không kỳ da mạnh 48 giờ trước.",
    ],
    after: [
      "48 giờ đầu: rửa dịu, dưỡng, chống nắng.",
      "Tránh xông nóng, biển, tẩy mạnh.",
      "Nhắn chúng tôi nếu da rát kéo hơn một ngày.",
    ],
  },
  en: {
    before: [
      "Arrive clean or with light makeup.",
      "Tell us about medication, prescribed cream, recent peels.",
      "No strong scrubbing for 48 hours before.",
    ],
    after: [
      "First 48 hours: gentle cleanse, cream, SPF.",
      "Skip heat, sea and strong exfoliant.",
      "Message us if sting lasts more than a day.",
    ],
  },
} as const;
// Unverified seed data remains private until an evidence reference is approved.
export const careProducts = draft_careProducts.filter(() =>
  isBusinessDataApproved("careProducts"),
);

// Unverified seed data remains private until an evidence reference is approved.
export const skinJourneys = draft_skinJourneys.filter(() =>
  isBusinessDataApproved("skinJourneys"),
);

// Unverified seed data remains private until an evidence reference is approved.
export const careCombos = draft_careCombos.filter(() =>
  isBusinessDataApproved("careCombos"),
);

// Unverified seed data remains private until an evidence reference is approved.
export const spaSkinPrices = draft_spaSkinPrices.filter(() =>
  isBusinessDataApproved("spaSkinPrices"),
);
