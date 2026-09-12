export const siteUrl = "https://hatobeauty.com";
export const mediaUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export type SeoLang = "vi" | "en";

export interface SeoService {
  id: "skin" | "scalp" | "body" | "brow-lash" | "hair-removal" | "waxing";
  viSlug: string;
  enSlug: string;
  image: string;
  vi: SeoServiceCopy;
  en: SeoServiceCopy;
}

interface SeoServiceCopy {
  name: string;
  title: string;
  description: string;
  answer: string;
  suitable: string;
  caution: string;
  preparation: string[];
  aftercare: string[];
  expectations: string;
  faq: Array<[string, string]>;
}

export const seoServices: SeoService[] = [
  {
    id: "skin", viSlug: "cham-soc-da-chuyen-sau-da-nang", enSlug: "facial-treatment-da-nang", image: mediaUrl("/images/service-skin-v2.webp"),
    vi: {
      name: "Chăm sóc da", title: "Spa chăm sóc da tại Đà Nẵng",
      description: "Chăm sóc da mặt chuyên sâu tại Hato Beauty Đà Nẵng, tập trung làm sạch, cấp ẩm và phục hồi theo tình trạng da được trao đổi trước buổi hẹn.",
      answer: "Chăm sóc da chuyên sâu là trải nghiệm làm sạch và nuôi dưỡng được lựa chọn sau khi lắng nghe nhu cầu thực tế của làn da. Dịch vụ phù hợp với da thiếu ẩm, xỉn màu hoặc cần xây lại nhịp chăm sóc; đây là chăm sóc thẩm mỹ, không thay thế chẩn đoán hay điều trị y khoa.",
      suitable: "Da thiếu ẩm, bề mặt kém mềm mại, xỉn màu hoặc cần chăm sóc định kỳ sau tư vấn.",
      caution: "Nên hoãn lịch khi da đang có vết thương hở, kích ứng mạnh hoặc phản ứng chưa rõ nguyên nhân; hãy trao đổi với bác sĩ nếu đang điều trị da.",
      preparation: ["Giữ chu trình chăm sóc đơn giản trước buổi hẹn", "Chia sẻ sản phẩm và liệu trình da đang sử dụng", "Báo trước về dị ứng hoặc phản ứng gần đây"],
      aftercare: ["Giữ da sạch và dưỡng ẩm theo hướng dẫn", "Bảo vệ da trước nắng", "Không tự thêm hoạt chất mạnh ngay sau buổi chăm sóc"],
      expectations: "Da có thể cảm thấy sạch, mềm và đủ ẩm hơn sau buổi chăm sóc. Mức thay đổi và số buổi phù hợp tùy tình trạng ban đầu, thói quen tại nhà và phản ứng riêng của mỗi người.",
      faq: [["Làm sạch sâu hay phục hồi trước?", "Ưu tiên phụ thuộc hàng rào da và cảm giác hiện tại; hato sẽ trao đổi trước khi chọn bước chăm sóc."], ["Da nhạy cảm có thể đặt lịch không?", "Có thể trao đổi trước, nhưng cần hoãn khi da đang kích ứng mạnh hoặc có tổn thương chưa ổn định."]],
    },
    en: {
      name: "Facial treatment", title: "Facial Treatment in Da Nang",
      description: "A considered facial at Hato Beauty focused on cleansing, hydration and recovery after listening to your skin.",
      answer: "A facial treatment is a cleansing and replenishing experience selected around your skin's current needs. It can suit dehydrated or tired-looking skin and guests rebuilding a regular care rhythm; it is cosmetic care and does not replace medical diagnosis or treatment.",
      suitable: "Dehydrated, dull or rough-feeling skin, and guests seeking a regular facial after consultation.",
      caution: "Postpone when skin is broken, strongly irritated or reacting for an unknown reason, and speak with your clinician if you are receiving medical skin treatment.",
      preparation: ["Keep your routine simple before the appointment", "Share current products and recent treatments", "Tell us about allergies or recent reactions"],
      aftercare: ["Keep skin clean and moisturised as advised", "Protect skin from the sun", "Avoid adding strong actives immediately afterwards"],
      expectations: "Skin may feel cleaner, softer and more replenished after the visit. Results and an appropriate schedule vary with your starting point, home routine and individual response.",
      faq: [["Deep cleansing or recovery first?", "The priority depends on your skin barrier and current comfort, which we discuss before care begins."], ["Can sensitive skin book a facial?", "A consultation is possible, but postpone if the skin is actively irritated or damaged."]],
    },
  },
  {
    id: "scalp", viSlug: "goi-dau-duong-sinh-da-nang", enSlug: "head-spa-da-nang", image: mediaUrl("/images/service-hair-v2.webp"),
    vi: { name: "Chăm sóc da đầu & Thư giãn", title: "Chăm sóc da đầu & thư giãn tại Đà Nẵng", description: "Dịch vụ chăm sóc da đầu tại Hato Beauty Đà Nẵng kết hợp gội đầu thư giãn và massage đầu–vai–gáy trong nhịp chăm sóc nhẹ nhàng.", answer: "Chăm sóc da đầu & Thư giãn tại Hato Beauty kết hợp làm sạch da đầu, chăm sóc tóc và massage đầu–vai–gáy. Trải nghiệm phù hợp với người muốn gội đầu thư giãn hoặc chăm sóc da đầu định kỳ sau làm việc và di chuyển; đây không phải dịch vụ điều trị bệnh lý da đầu.", suitable: "Người cần thư giãn, thường căng vùng đầu–vai–gáy hoặc muốn chăm sóc da đầu định kỳ.", caution: "Hãy báo trước khi có vết thương da đầu, đau cấp tính, chóng mặt hoặc tình trạng cần theo dõi y khoa.", preparation: ["Thông báo tình trạng da đầu và sản phẩm đang dùng", "Chọn thời lượng phù hợp với lịch trình", "Báo mức lực massage bạn cảm thấy dễ chịu"], aftercare: ["Giữ da đầu khô thoáng", "Theo dõi phản ứng với sản phẩm mới", "Duy trì lịch chăm sóc theo nhu cầu thực tế"], expectations: "Bạn có thể cảm thấy da đầu sạch hơn và cơ thể thư giãn hơn. Cảm nhận và tần suất phù hợp khác nhau ở mỗi người.", faq: [["Chăm sóc da đầu có phải điều trị bệnh lý không?", "Không. Đây là trải nghiệm làm sạch và thư giãn; vấn đề da đầu kéo dài cần được đánh giá chuyên môn."], ["Nên chọn gội đầu cơ bản hay chăm sóc chuyên sâu?", "Lựa chọn phụ thuộc tình trạng da đầu, thời lượng và khoảng nghỉ bạn mong muốn."]]},
    en: { name: "Head Spa", title: "Head Spa in Da Nang", description: "A scalp-cleansing ritual with an unhurried head, neck and shoulder massage.", answer: "A Head Spa at Hato Beauty combines scalp cleansing, hair care and a head–neck–shoulder massage. It is designed for relaxation after work or travel and is not a medical treatment for scalp conditions.", suitable: "Guests seeking relaxation, scalp care or relief from an everyday sense of tension.", caution: "Tell us about scalp wounds, acute pain, dizziness or any condition currently under medical care.", preparation: ["Share your scalp concerns and current products", "Choose a duration that suits your schedule", "Tell us the massage pressure you prefer"], aftercare: ["Keep the scalp comfortable and well ventilated", "Watch for reactions to new products", "Return according to genuine care needs"], expectations: "Your scalp may feel cleaner and your body more relaxed. Comfort and a suitable frequency vary from person to person.", faq: [["Is a Head Spa a medical scalp treatment?", "No. It is a cleansing and relaxation service; persistent concerns need appropriate clinical advice."], ["Which duration should I choose?", "It depends on the level of care and pause you would like."]]},
  },
  {
    id: "body", viSlug: "cham-soc-da-body-da-nang", enSlug: "body-treatment-da-nang", image: mediaUrl("/images/service-body-scrub-v2.webp"),
    vi: { name: "Chăm sóc da cơ thể", title: "Chăm sóc da body tại Đà Nẵng", description: "Tẩy tế bào chết và dưỡng ẩm giúp bề mặt da cơ thể sạch thoáng, mềm mại hơn.", answer: "Chăm sóc da body là nghi thức làm sạch bề mặt, tẩy tế bào chết phù hợp và dưỡng ẩm. Dịch vụ hướng đến làn da khô, sần hoặc cần một khoảng thư giãn; không cam kết thay đổi màu da hay kết quả giống nhau cho mọi khách hàng.", suitable: "Da cơ thể khô, thiếu mềm mại hoặc cần chăm sóc định kỳ, đặc biệt sau thời gian đi biển.", caution: "Hoãn khi da cháy nắng, trầy xước, kích ứng hoặc đang có phản ứng chưa ổn định.", preparation: ["Tránh tẩy da chết mạnh ngay trước lịch", "Báo vùng da nhạy cảm", "Mặc trang phục thoải mái"], aftercare: ["Dưỡng ẩm đều đặn", "Bảo vệ da trước nắng", "Tránh chà xát mạnh khi da còn nhạy cảm"], expectations: "Bề mặt da có thể cảm thấy sạch và mềm hơn. Độ sáng khỏe và đều màu phụ thuộc tình trạng da, chống nắng và chăm sóc tại nhà.", faq: [["Body scrub bao lâu một lần?", "Tần suất phụ thuộc tình trạng da và sản phẩm sử dụng; không nên tẩy quá mức."], ["Có nên scrub ngay sau khi đi biển?", "Không nên khi da còn nóng rát hoặc cháy nắng; hãy đợi da ổn định."]]},
    en: { name: "Body treatment", title: "Body Treatment in Da Nang", description: "Gentle exfoliation and hydration for smoother, more comfortable body skin.", answer: "A body treatment combines surface cleansing, suitable exfoliation and hydration. It can suit dry or rough-feeling skin and guests seeking a restorative pause; it does not promise a change in skin colour or identical results for everyone.", suitable: "Dry or rough-feeling body skin, including guests rebuilding comfort after time at the beach.", caution: "Postpone when skin is sunburned, broken, irritated or reacting.", preparation: ["Avoid strong exfoliation just before the visit", "Point out sensitive areas", "Wear comfortable clothing"], aftercare: ["Moisturise regularly", "Protect skin from the sun", "Avoid strong friction while skin feels sensitive"], expectations: "Skin may feel cleaner and softer. A brighter, more even-looking surface depends on the starting condition, sun protection and home care.", faq: [["How often should I have a body scrub?", "Frequency depends on your skin and the product used; over-exfoliation should be avoided."], ["Should I scrub immediately after the beach?", "Wait if the skin is hot, sore or sunburned."]]},
  },
  {
    id: "brow-lash", viSlug: "uon-mi-brow-lamination-da-nang", enSlug: "lash-lift-brow-lamination-da-nang", image: mediaUrl("/images/service-brow-v2.webp"),
    vi: { name: "Mi & Mày", title: "Uốn mi, nhuộm mi & định hình chân mày tại Đà Nẵng", description: "Uốn và nhuộm mi, tạo hình, định hình hoặc nhuộm chân mày theo đường nét tự nhiên của gương mặt.", answer: "Dịch vụ Mi & Mày tại Hato Beauty gồm uốn mi, nhuộm mi và các lựa chọn tạo hình, định hình hoặc nhuộm chân mày được xác nhận khi tư vấn. hato trao đổi về dáng, độ cong và thói quen chăm sóc trước khi thực hiện; uốn mi khác với nối mi.", suitable: "Khách muốn mi cong nhẹ, chân mày rõ nét hơn và dễ chăm sóc hằng ngày.", caution: "Cần hoãn khi vùng mắt hoặc da quanh mày đang kích ứng, viêm hoặc vừa thực hiện thủ thuật khác chưa ổn định.", preparation: ["Đến với vùng mắt và chân mày sạch", "Chia sẻ tiền sử nhạy cảm với sản phẩm", "Trao đổi rõ phong cách mong muốn"], aftercare: ["Giữ vùng thực hiện khô theo hướng dẫn ban đầu", "Không chà xát mạnh", "Chải và dưỡng theo hướng dẫn của kỹ thuật viên"], expectations: "Độ cong, màu sợi và dáng mày duy trì khác nhau theo sợi tự nhiên, chu kỳ mọc và chăm sóc tại nhà.", faq: [["Uốn mi có phải nối mi không?", "Không. Uốn mi tạo độ cong cho mi tự nhiên, không gắn thêm sợi nối."], ["Kết quả giữ được bao lâu?", "Thời gian khác nhau theo chu kỳ sợi và cách chăm sóc; hato sẽ hướng dẫn sau buổi hẹn."]]},
    en: { name: "Lash lift & Brow Lamination", title: "Lash Lift & Brow Lamination in Da Nang", description: "Softly shaping natural lashes and brows around your facial proportions.", answer: "A lash lift and Brow Lamination arrange natural lashes and brow hairs for a neater, softly defined look. hato discusses shape, lift and everyday care before the service; a lash lift is different from eyelash extensions.", suitable: "Guests wanting a gentle lift, more orderly brows and an easy daily routine.", caution: "Postpone if the eye area or brow skin is irritated, inflamed or still recovering from another procedure.", preparation: ["Arrive with clean lashes and brows", "Share any product sensitivities", "Discuss the finish you prefer"], aftercare: ["Keep the area dry for the advised initial period", "Avoid strong rubbing", "Brush and condition as guided"], expectations: "Longevity varies with natural hair, growth cycles and home care.", faq: [["Is a lash lift the same as extensions?", "No. A lift shapes your natural lashes without adding extension fibres."], ["How long does it last?", "Longevity varies by growth cycle and aftercare."]]},
  },
  {
    id: "hair-removal", viSlug: "triet-long-da-nang", enSlug: "laser-hair-removal-da-nang", image: mediaUrl("/images/service-hair-removal-v2.webp"),
    vi: { name: "Triệt lông", title: "Triệt lông tại Đà Nẵng", description: "Giải pháp giảm lông bằng công nghệ được lựa chọn theo vùng da và nhu cầu riêng tư.", answer: "Dịch vụ triệt lông tại Hato Beauty sử dụng công nghệ phù hợp theo vùng và nhu cầu. Số buổi và mức giảm lông phụ thuộc màu, độ dày, chu kỳ lông và phản ứng cá nhân; hato không dùng cam kết “vĩnh viễn” hay “không đau”.", suitable: "Các vùng mặt, tay, chân, nách hoặc vùng cơ thể được xác nhận trong tư vấn.", caution: "Cần trao đổi trước nếu da đang tổn thương, cháy nắng, có xu hướng tạo sẹo, đang dùng thuốc hoặc vừa thực hiện liệu trình khác.", preparation: ["Tránh làm sạm da và báo về tình trạng nắng gần đây", "Chia sẻ thuốc và sản phẩm đang sử dụng", "Làm theo hướng dẫn riêng về cạo lông trước buổi triệt"], aftercare: ["Làm dịu và bảo vệ vùng da theo hướng dẫn", "Hạn chế nắng và ma sát mạnh", "Liên hệ khi có phản ứng kéo dài hoặc bất thường"], expectations: "Hiệu quả và số buổi thay đổi theo vùng, màu da, sợi lông và chu kỳ mọc. Mức thoải mái cũng khác nhau ở mỗi người.", faq: [["Có cần cạo trước buổi triệt không?", "Tùy công nghệ và vùng thực hiện; hãy làm theo hướng dẫn được xác nhận trước lịch."], ["Triệt lông có vĩnh viễn không?", "Không nên hứa vĩnh viễn. Mục tiêu thực tế là hỗ trợ giảm lông dài hạn theo chu kỳ và tình trạng cá nhân."]]},
    en: { name: "Hair removal", title: "Laser Hair Removal in Da Nang", description: "Technology-led hair reduction selected around the area, skin and privacy needs.", answer: "Hair removal at Hato Beauty uses suitable technology depending on the area and your needs. Session count and degree of reduction depend on hair colour, thickness, growth cycle and individual response; hato does not promise “permanent” or “pain-free” results.", suitable: "Face, arms, legs, underarms or body areas confirmed during consultation.", caution: "Discuss broken or tanned skin, a tendency to scar, current medication and recent procedures before booking.", preparation: ["Avoid tanning and share recent sun exposure", "Tell us about medication and active products", "Follow the confirmed shaving instructions before treatment"], aftercare: ["Soothe and protect the area as advised", "Limit sun and strong friction", "Contact the team if a reaction is prolonged or unusual"], expectations: "Results and session count vary with the area, skin tone, hair characteristics and growth cycle. Comfort also varies individually.", faq: [["Should I shave before laser hair removal?", "It depends on the device and area; follow the instructions confirmed before your appointment."], ["Is hair removal permanent?", "A responsible expectation is long-term reduction that varies by growth cycle and individual factors."]]},
  },
  {
    id: "waxing", viSlug: "tay-long-da-nang", enSlug: "waxing-da-nang", image: mediaUrl("/images/service-waxing-v2.webp"),
    vi: { name: "Tẩy lông", title: "Dịch vụ tẩy lông tại Đà Nẵng", description: "Tẩy lông bằng sáp theo từng vùng tại Hato Beauty Đà Nẵng với quy trình kín đáo, nhanh gọn và chú trọng làm dịu da.", answer: "Dịch vụ tẩy lông tại Hato Beauty sử dụng kỹ thuật waxing phù hợp với từng vùng như chân mày, môi trên hoặc vùng cơ thể. Quy trình gồm làm sạch, chuẩn bị da, thực hiện và làm dịu sau dịch vụ; mức thoải mái và thời gian duy trì khác nhau ở mỗi người.", suitable: "Khách cần làm gọn lông mày, môi trên hoặc một vùng cơ thể với hiệu quả thấy ngay sau buổi chăm sóc.", caution: "Hoãn khi vùng da đang trầy xước, cháy nắng, kích ứng hoặc vừa sử dụng hoạt chất làm da nhạy cảm.", preparation: ["Giữ vùng da sạch và không tẩy tế bào chết mạnh", "Báo trước sản phẩm hoặc thuốc đang dùng", "Để chiều dài sợi phù hợp theo hướng dẫn"], aftercare: ["Giữ vùng da sạch và thoáng", "Hạn chế nắng, nhiệt và ma sát mạnh", "Dưỡng ẩm và làm dịu theo hướng dẫn"], expectations: "Bề mặt da có thể gọn và mịn hơn ngay sau buổi thực hiện. Mức đỏ nhẹ, cảm giác và thời gian lông mọc lại phụ thuộc vùng da và cơ địa.", faq: [["Tẩy lông gồm những vùng nào?", "hato phục vụ tẩy lông mày, môi trên và các vùng cơ thể được xác nhận trước buổi hẹn."], ["Bao lâu nên tẩy lông lại?", "Tần suất phụ thuộc chu kỳ mọc và vùng thực hiện; thông thường chỉ đặt lại khi sợi đã đạt chiều dài phù hợp."]]},
    en: { name: "Waxing", title: "Waxing in Da Nang", description: "Area-specific waxing delivered with discretion, efficiency and skin-soothing aftercare.", answer: "Waxing at Hato Beauty is adapted to areas such as the brows, upper lip or body. The experience includes cleansing, preparation, hair removal and soothing aftercare; comfort and longevity vary by person.", suitable: "Guests wanting an immediately neater brow, upper lip or body area through a discreet service.", caution: "Postpone if skin is broken, sunburned, irritated or recently sensitised by strong active products.", preparation: ["Keep the area clean and avoid strong exfoliation", "Share current products or medication", "Allow suitable hair length as advised"], aftercare: ["Keep the area clean and ventilated", "Limit sun, heat and strong friction", "Moisturise and soothe as advised"], expectations: "The area may feel smoother immediately afterwards. Temporary redness, comfort and regrowth timing vary by area and individual response.", faq: [["Which areas can be waxed?", "hato offers brow, upper-lip and body-area waxing confirmed before the appointment."], ["How often should I rebook?", "Timing depends on growth cycle and area; rebook when hair has reached a suitable length."]]},
  },
];

const primaryServiceOrder: SeoService["id"][] = ["skin", "brow-lash", "scalp", "hair-removal", "waxing"];
const primaryServiceNames: Partial<Record<SeoService["id"], string>> = {
  skin: "Chăm sóc da",
  "brow-lash": "Mi & Mày",
  scalp: "Chăm sóc da đầu & Thư giãn",
  "hair-removal": "Triệt lông",
  waxing: "Tẩy lông",
};
export const primarySeoServices = primaryServiceOrder.map((id) => {
  const service = seoServices.find((item) => item.id === id)!;
  return { ...service, vi: { ...service.vi, name: primaryServiceNames[id] ?? service.vi.name } };
});

export const serviceByViSlug = Object.fromEntries(seoServices.map((item) => [item.viSlug, item]));
export const serviceByEnSlug = Object.fromEntries(seoServices.map((item) => [item.enSlug, item]));

export const journalTopics = seoServices.map((service) => ({
  id: service.id,
  viSlug: service.id === "skin" ? "cham-soc-da" : service.id === "scalp" ? "goi-dau-duong-sinh" : service.id === "body" ? "cham-soc-body" : service.id === "brow-lash" ? "mi-chan-may" : service.id === "waxing" ? "tay-long" : "triet-long",
  enSlug: service.id === "skin" ? "facial-care" : service.id === "scalp" ? "head-spa" : service.id === "body" ? "body-care" : service.id === "brow-lash" ? "brow-lash" : service.id === "waxing" ? "waxing" : "hair-removal",
  image: service.image,
  service,
}));

export function servicePath(service: SeoService, lang: SeoLang) {
  return lang === "vi" ? `/dich-vu/${service.viSlug}/` : `/en/services/${service.enSlug}/`;
}

export function journalPath(service: SeoService, lang: SeoLang) {
  const topic = journalTopics.find((item) => item.id === service.id)!;
  return lang === "vi" ? `/kien-thuc/${topic.viSlug}/` : `/en/journal/${topic.enSlug}/`;
}
