import type { SeoLang, SeoService } from "./seo-data";

type FaqPair = [question: string, answer: string];
type LocalizedFaqs = Record<SeoLang, FaqPair[]>;

export const serviceIntentFaqs: Record<SeoService["id"], LocalizedFaqs> = {
  skin: {
    vi: [
      ["Chăm sóc da chuyên sâu tại Đà Nẵng giá bao nhiêu?", "Giá tham khảo tại hato là 450.000–1.200.000đ, tùy nhu cầu, thời lượng và các bước được thống nhất sau khi trao đổi tình trạng da."],
      ["Bao lâu nên chăm sóc da chuyên sâu một lần?", "Không có một lịch cố định cho mọi làn da. Tần suất nên dựa trên hàng rào da, mục tiêu, sản phẩm đang dùng và phản ứng sau mỗi buổi."],
      ["Da mụn có nên đặt liệu trình facial không?", "Có thể trao đổi trước để phân biệt nhu cầu chăm sóc thẩm mỹ với tình trạng cần bác sĩ da liễu. Không thực hiện trên vùng viêm mạnh, vết thương hở hoặc phản ứng chưa rõ nguyên nhân."],
    ],
    en: [
      ["How much does a facial treatment in Da Nang cost?", "The hato guide range is VND 450,000–1,200,000, depending on your needs, visit length and the steps agreed after discussing your skin."],
      ["How often should I book a facial?", "There is no single schedule for every person. Frequency should reflect your skin barrier, goals, current products and response after each visit."],
      ["Can acne-prone skin book a facial?", "You can discuss your needs first so cosmetic care is separated from concerns requiring a dermatologist. Strong inflammation, broken skin or unexplained reactions should not be treated."],
    ],
  },
  scalp: {
    vi: [
      ["Gội đầu dưỡng sinh tại Đà Nẵng giá bao nhiêu?", "Giá tham khảo là 180.000–450.000đ cho khoảng 45–75 phút, tùy thời lượng và phạm vi chăm sóc được chọn."],
      ["Gội đầu dưỡng sinh có tác dụng gì?", "Mục tiêu thực tế là làm sạch da đầu, chăm sóc tóc và tạo khoảng thư giãn qua massage đầu–vai–gáy; dịch vụ không điều trị bệnh lý da đầu."],
      ["Khách du lịch có thể đặt Head Spa không?", "Có. Đây là lựa chọn thư giãn sau khi di chuyển, nhưng bạn nên báo trước nếu chóng mặt, đau cấp tính hoặc da đầu có tổn thương."],
    ],
    en: [
      ["How much is a Head Spa in Da Nang?", "The guide range is VND 180,000–450,000 for roughly 45–75 minutes, depending on the duration and care selected."],
      ["What are the realistic benefits of a Head Spa?", "It aims to cleanse the scalp, care for the hair and create a restorative pause through a head, neck and shoulder massage; it does not treat scalp disease."],
      ["Can travellers book a Head Spa?", "Yes. It can be a relaxing option after travel, but mention dizziness, acute pain or scalp damage before booking."],
    ],
  },
  body: {
    vi: [
      ["Chăm sóc da body tại Đà Nẵng giá bao nhiêu?", "Giá tham khảo là 350.000–850.000đ cho khoảng 60–90 phút, tùy vùng, tình trạng da và các bước chăm sóc."],
      ["Tẩy tế bào chết body có làm trắng da không?", "Dịch vụ có thể giúp bề mặt da sạch và mềm hơn nhưng không nên được hiểu là cam kết đổi màu da. Độ sáng khỏe còn phụ thuộc chống nắng và chăm sóc tại nhà."],
      ["Sau khi đi biển bao lâu có thể chăm sóc body?", "Chỉ nên đặt khi da đã hết nóng rát, cháy nắng hoặc kích ứng. Nếu da còn tổn thương, hãy hoãn và theo dõi trước."],
    ],
    en: [
      ["How much is a body treatment in Da Nang?", "The guide range is VND 350,000–850,000 for roughly 60–90 minutes, depending on the area, skin condition and chosen steps."],
      ["Does a body scrub whiten skin?", "It may help the surface feel cleaner and softer, but should not be treated as a promise to change skin colour. Sun protection and home care still matter."],
      ["When can I book body care after the beach?", "Book only after heat, sunburn and irritation have settled. Postpone while skin is damaged or uncomfortable."],
    ],
  },
  "brow-lash": {
    vi: [
      ["Uốn mi và Brow Lamination tại Đà Nẵng giá bao nhiêu?", "Giá tham khảo là 250.000–750.000đ, tùy dịch vụ riêng lẻ hay kết hợp, tình trạng sợi và thời lượng thực hiện."],
      ["Brow Lamination khác phun xăm chân mày thế nào?", "Brow Lamination sắp xếp và định hình sợi mày tự nhiên; dịch vụ không đưa mực vào da như phun xăm."],
      ["Uốn mi có làm rụng mi không?", "Kết quả phụ thuộc tình trạng sợi, kỹ thuật và chăm sóc. Vùng mắt đang kích ứng hoặc sợi quá yếu cần được trao đổi và có thể nên hoãn."],
    ],
    en: [
      ["How much are a lash lift and Brow Lamination in Da Nang?", "The guide range is VND 250,000–750,000, depending on whether services are separate or combined, natural hair condition and timing."],
      ["How is Brow Lamination different from brow tattooing?", "Lamination arranges and shapes natural brow hairs; it does not place pigment into the skin like cosmetic tattooing."],
      ["Will a lash lift make lashes fall out?", "Outcomes depend on natural lash condition, technique and aftercare. An irritated eye area or very fragile lashes should be discussed and may require postponing."],
    ],
  },
  "hair-removal": {
    vi: [
      ["Triệt lông tại Đà Nẵng giá bao nhiêu?", "Giá tham khảo là 250.000–1.500.000đ mỗi vùng. Mức cụ thể phụ thuộc vùng thực hiện, phương pháp, diện tích và kế hoạch số buổi."],
      ["Triệt lông công nghệ và waxing khác nhau thế nào?", "Waxing lấy sợi lông hiện có; công nghệ hướng đến giảm lông dài hạn theo chu kỳ. Lựa chọn phù hợp phụ thuộc vùng da, mục tiêu, thời gian và chống chỉ định."],
      ["Triệt lông cần bao nhiêu buổi?", "Không thể xác định một con số chung. Chu kỳ mọc, màu và độ dày sợi, vùng thực hiện cùng phản ứng cá nhân đều ảnh hưởng kế hoạch."],
    ],
    en: [
      ["How much is hair removal in Da Nang?", "The guide range is VND 250,000–1,500,000 per area. The final amount depends on the area, method, surface size and session plan."],
      ["How are technology-led hair removal and waxing different?", "Waxing removes existing hair, while technology aims for long-term reduction across growth cycles. The right option depends on the area, goals, timing and contraindications."],
      ["How many hair-removal sessions will I need?", "There is no universal number. Growth cycle, colour, thickness, treatment area and individual response all affect the plan."],
    ],
  },
};

export const journalIntentFaqs: Record<SeoService["id"], LocalizedFaqs> = {
  skin: { vi: [["Nên ngưng hoạt chất nào trước facial?", "Không tự ngưng thuốc kê đơn. Với hoạt chất mỹ phẩm mạnh, hãy chia sẻ sản phẩm đang dùng để nhận hướng dẫn phù hợp với da và loại buổi chăm sóc."], ["Sau facial khi nào dùng lại hoạt chất?", "Chỉ dùng lại khi da ổn định và theo hướng dẫn phù hợp; không thêm nhiều hoạt chất cùng lúc nếu da còn nhạy cảm."]], en: [["Which actives should I stop before a facial?", "Do not stop prescribed medication yourself. Share strong cosmetic actives in your routine so guidance can match your skin and planned care."], ["When can I restart actives after a facial?", "Restart only when skin is comfortable and according to suitable guidance; avoid introducing several actives while skin remains sensitive."]] },
  scalp: { vi: [["Có cần gội đầu trước khi đi Head Spa?", "Thông thường không cần; hãy giữ da đầu ở trạng thái thường ngày và báo về sản phẩm hoặc tình trạng cần lưu ý."], ["Khi nào nên hoãn massage đầu–vai–gáy?", "Hoãn khi đau cấp tính, chóng mặt, vết thương hoặc có chỉ định y khoa cần tránh massage."]], en: [["Should I wash my hair before a Head Spa?", "Usually not; keep the scalp in its normal state and mention products or concerns that matter."], ["When should I postpone the head, neck and shoulder massage?", "Postpone with acute pain, dizziness, wounds or medical advice to avoid massage."]] },
  body: { vi: [["Có nên tẩy da chết tại nhà trước lịch body?", "Không nên tẩy mạnh sát ngày hẹn vì có thể làm da nhạy cảm hơn."], ["Sau chăm sóc body cần chống nắng thế nào?", "Che chắn và dùng sản phẩm chống nắng phù hợp trên vùng phơi nắng; tránh nắng gắt khi da còn nhạy cảm."]], en: [["Should I exfoliate at home before body care?", "Avoid strong exfoliation close to the appointment because it can leave skin more sensitive."], ["How should I protect skin from the sun afterwards?", "Cover exposed areas and use suitable sun protection; limit strong sun while skin feels sensitive."]] },
  "brow-lash": { vi: [["Có cần tháo kính áp tròng trước khi uốn mi?", "Nên hỏi và chuẩn bị tháo kính áp tròng để vùng mắt thoải mái trong suốt buổi thực hiện."], ["Sau Brow Lamination chăm sợi mày thế nào?", "Tránh chà xát, giữ khô theo thời gian được hướng dẫn và chải dưỡng nhẹ nhàng."]], en: [["Should I remove contact lenses before a lash lift?", "Ask in advance and be prepared to remove them so the eye area stays comfortable throughout the service."], ["How do I care for brows after lamination?", "Avoid rubbing, keep them dry for the advised period and brush or condition gently."]] },
  "hair-removal": { vi: [["Trước triệt lông nên cạo hay để lông?", "Hướng dẫn khác nhau giữa công nghệ và waxing. Hãy xác nhận phương pháp trước khi cạo hoặc để chiều dài sợi."], ["Sau triệt lông bao lâu có thể đi biển?", "Tránh nắng, nhiệt và ma sát theo hướng dẫn sau buổi thực hiện; chỉ đi biển khi vùng da đã ổn định và được bảo vệ phù hợp."]], en: [["Should I shave or leave hair before the appointment?", "Instructions differ between technology and waxing. Confirm the method before shaving or leaving a specific hair length."], ["How soon can I go to the beach afterwards?", "Avoid sun, heat and friction for the advised period; return only when skin is settled and can be protected appropriately."]] },
};
