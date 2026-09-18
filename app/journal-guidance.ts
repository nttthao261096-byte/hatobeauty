import type { SeoLang, SeoService } from "./seo-data";

type Guide = { heading: string; paragraphs: string[]; questions: string[] };
// Informational intent, kept separate from service sales copy. No invented
// treatment options, technologies, results, prices or review dates.
export const journalGuidance: Record<
  SeoService["id"],
  Record<SeoLang, Guide>
> = {
  skin: {
    vi: {
      heading: "Chuẩn bị cho buổi chăm sóc da đầu tiên",
      paragraphs: [
        "Trước khi chọn facial, hãy ghi lại điều bạn muốn cải thiện và những sản phẩm đang dùng. Một ảnh chụp nhãn sản phẩm có thể giúp cuộc trao đổi cụ thể hơn, thay vì chỉ nói chung rằng da đang khô hoặc nhạy cảm.",
        "Đừng chọn buổi chăm sóc chỉ vì tên gọi nhiều bước. Hãy hỏi bước nào phù hợp với nhu cầu hiện tại, phần nào có thể điều chỉnh và tổng chi phí là bao nhiêu.",
      ],
      questions: [
        "Tôi cần chia sẻ gì về chu trình đang dùng?",
        "Những bước nào sẽ được thực hiện và vì sao?",
        "Tôi nên duy trì chăm sóc tại nhà như thế nào?",
      ],
    },
    en: {
      heading: "Preparing for your first facial",
      paragraphs: [
        "Before choosing a facial, note what you would like help with and the products you currently use. Photos of product labels can make the conversation more useful than simply describing your skin as dry or sensitive.",
        "A longer treatment name or a larger number of steps does not tell you whether a facial suits your needs. Ask what each proposed step is for, what can be adjusted and what the full price includes.",
      ],
      questions: [
        "What should I share about my current routine?",
        "Which steps are suggested, and why?",
        "What should my home-care routine look like afterwards?",
      ],
    },
  },
  scalp: {
    vi: {
      heading: "Sắp xếp một buổi head spa trong lịch trình của bạn",
      paragraphs: [
        "Khi tìm head spa, hãy xác định bạn ưu tiên chăm sóc da đầu, chăm sóc tóc hay một khoảng nghỉ thư giãn. Những tên gọi gần giống nhau có thể bao gồm các bước khác nhau.",
        "Nếu đặt giữa lịch tham quan hoặc trước một cuộc hẹn khác, hãy xác nhận tổng thời gian và phần chăm sóc tóc sau buổi thực hiện. Đừng tự suy ra các bước chỉ từ ảnh minh họa.",
      ],
      questions: [
        "Buổi hẹn gồm những bước chăm sóc nào?",
        "Tổng thời gian có bao gồm phần làm khô tóc không?",
        "Tôi có thể trao đổi trước về mức lực massage mong muốn không?",
      ],
    },
    en: {
      heading: "Fitting a head spa into your day",
      paragraphs: [
        "Decide whether you are looking for scalp care, hair care or time to relax. Similar service names can describe different experiences, so check what is included before choosing.",
        "If you are visiting between sightseeing plans or before another appointment, confirm the total visit time and how your hair will be finished. A promotional image is not a complete description of the service.",
      ],
      questions: [
        "Which steps are included in the visit?",
        "Does the total time include drying or finishing my hair?",
        "Can I discuss my preferred massage pressure beforehand?",
      ],
    },
  },
  body: {
    vi: {
      heading: "Chọn chăm sóc cơ thể theo vùng da và lịch sinh hoạt",
      paragraphs: [
        "Trước khi đặt, hãy nói rõ vùng da bạn muốn chăm sóc và cảm giác hiện tại của da. Chăm sóc bề mặt da và massage thư giãn không phải lúc nào cũng là cùng một dịch vụ.",
        "Nếu đang du lịch, hãy chia sẻ lịch đi biển hoặc hoạt động ngoài trời để được hướng dẫn sắp xếp phù hợp. Xác nhận phạm vi dịch vụ và chi phí trước khi quyết định.",
      ],
      questions: [
        "Dịch vụ tập trung vào vùng da nào?",
        "Buổi hẹn gồm chăm sóc da, massage hay cả hai?",
        "Tôi cần lưu ý gì với lịch sinh hoạt sau buổi hẹn?",
      ],
    },
    en: {
      heading: "Choosing body care around your needs and plans",
      paragraphs: [
        "Explain which area you would like cared for and how your skin currently feels. Surface skin care and a relaxation massage are not necessarily the same service.",
        "If you are travelling, mention any beach visits or outdoor activities so you can discuss suitable timing. Confirm the treatment area, included steps and full price before deciding.",
      ],
      questions: [
        "Which areas does the service cover?",
        "Does it include skin care, massage or both?",
        "What should I consider when planning the rest of my day?",
      ],
    },
  },
  "brow-lash": {
    vi: {
      heading: "Trao đổi về dáng mi và chân mày trước khi đặt",
      paragraphs: [
        "Mang theo ảnh tham khảo nếu bạn có dáng mi hoặc chân mày yêu thích, nhưng hãy nói rõ điểm bạn thích ở ảnh: độ cong, độ gọn hay cảm giác tự nhiên. Ảnh là cách trao đổi mong muốn, không phải lời hứa về kết quả giống hệt.",
        "Uốn mi, tạo dáng chân mày và brow lamination là các lựa chọn khác nhau. Hãy xác nhận dịch vụ đang được cung cấp và mức độ phù hợp trước khi chọn tên trên menu.",
      ],
      questions: [
        "Lựa chọn nào phù hợp với dáng mi hoặc chân mày hiện tại?",
        "Dịch vụ cụ thể nào hiện có thể đặt?",
        "Tôi nên sắp xếp việc trang điểm và chăm sóc sau buổi hẹn ra sao?",
      ],
    },
    en: {
      heading: "Discussing your preferred lash and brow look",
      paragraphs: [
        "Bring a reference photo if it helps, and explain what you like: the curl, definition or natural finish. A photo helps communicate a preference; it is not a promise of an identical result.",
        "A lash lift, brow shaping and brow lamination are different services. Confirm which options are currently offered and suitable for you before booking from a menu name alone.",
      ],
      questions: [
        "Which option suits my existing lashes or brows?",
        "Which specific services are currently available?",
        "What should I know about makeup and care after the visit?",
      ],
    },
  },
  "hair-removal": {
    vi: {
      heading: "Xác nhận phương pháp trước khi chuẩn bị triệt lông",
      paragraphs: [
        "Tên nhóm “triệt lông” không đủ để xác định công nghệ, thiết bị hoặc cách chuẩn bị. Trước khi tự cạo hay xử lý vùng lông, hãy hỏi rõ phương pháp dự kiến và hướng dẫn dành cho vùng da của bạn.",
        "Đề nghị giải thích phạm vi một buổi, cách đánh giá mức phù hợp và chi phí. Không nên xem một số buổi cố định hoặc lời quảng cáo “vĩnh viễn” là bảo đảm kết quả cá nhân.",
      ],
      questions: [
        "Phương pháp và thiết bị cụ thể là gì?",
        "Tôi cần chuẩn bị vùng da này như thế nào?",
        "Chi phí theo buổi hay theo vùng, và đánh giá lại khi nào?",
      ],
    },
    en: {
      heading: "Confirm the method before preparing for hair removal",
      paragraphs: [
        "The category name 'hair removal' does not identify a device or method. Before shaving or preparing an area yourself, ask which method is proposed and request instructions for that area.",
        "Ask what one visit covers, how suitability is assessed and how pricing works. A fixed number of sessions or a 'permanent' advertising claim should not be read as a guarantee of your individual result.",
      ],
      questions: [
        "Which method and device would be used?",
        "How should I prepare this specific area?",
        "Is pricing per visit or per area, and when is progress reviewed?",
      ],
    },
  },
  waxing: {
    vi: {
      heading: "Đặt waxing với thông tin rõ về vùng cần làm",
      paragraphs: [
        "Khi gửi yêu cầu waxing, nêu cụ thể vùng cần làm thay vì chỉ chọn “tẩy lông”. Nếu cần tạo dáng chân mày, hãy nói rõ bạn muốn giữ dáng hiện tại hay trao đổi một dáng khác.",
        "Hãy hỏi hướng dẫn chuẩn bị trước buổi hẹn, chia sẻ các sản phẩm đang dùng trên vùng da đó và xác nhận những gì đã bao gồm trong giá. Với vùng riêng tư, bạn có thể trao đổi về cách thực hiện trước khi quyết định.",
      ],
      questions: [
        "Vùng waxing tôi cần có trong danh mục hiện tại không?",
        "Tôi nên để chiều dài lông và chuẩn bị da như thế nào?",
        "Chi phí gồm những bước nào, và tôi cần lưu ý gì sau đó?",
      ],
    },
    en: {
      heading: "Making a clear waxing request",
      paragraphs: [
        "Name the area you want waxed when you enquire. For brow waxing, explain whether you want to maintain your current shape or discuss a different one.",
        "Ask for preparation instructions, share the products you use on that area and confirm what the quoted price includes. For intimate areas, you can discuss the process and privacy arrangements before deciding.",
      ],
      questions: [
        "Is my requested area currently offered?",
        "What hair length and skin preparation do you recommend?",
        "What is included in the price, and what aftercare should I follow?",
      ],
    },
  },
};
