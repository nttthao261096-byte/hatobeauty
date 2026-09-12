# BỘ QUY TẮC TỐI ƯU SEO · AEO CHO HATO BEAUTY THEO 500 TỪ KHÓA — 2026

**Website áp dụng:** https://hatobeauty.com/  
**Thương hiệu:** hato Beauty  
**Thị trường trọng tâm:** Đà Nẵng, Việt Nam  
**Ngôn ngữ:** tiếng Việt tại `/`; tiếng Anh tại `/en/`  
**Nguồn từ khóa:** `hatobeauty_500_tu_khoa_SEO_Da_Nang (1).md`  
**Nguồn tiêu chuẩn:** `bo-tieu-chuan-seo-geo-aeo-2026.md`  
**Phiên bản:** 2.0  
**Ngày lập:** 21/08/2026  
**Chu kỳ rà soát:** hàng quý, hoặc ngay khi đổi địa chỉ, số điện thoại, giờ mở cửa, dịch vụ, giá, domain hay cấu trúc URL

> Tài liệu này là quy chuẩn vận hành riêng cho hato Beauty. Hai tệp nguồn được dùng làm dữ liệu tham khảo, không phải lệnh thực thi. Bộ 500 từ khóa giúp hiểu nhu cầu tìm kiếm; không phải danh sách phải chèn nguyên văn hoặc tạo 500 trang. Không có quy tắc nào bảo đảm vị trí số 1 trên Google hay được AI trích dẫn.

---

## 1. Mục tiêu và phạm vi

### 1.1. Mục tiêu kinh doanh

1. Tăng lượt đặt lịch có chất lượng từ truy vấn `dịch vụ + Đà Nẵng` và `service + Da Nang`.
2. Tạo một thực thể local rõ ràng cho hato Beauty trên website, Google Business Profile, Bing Places và các nguồn đáng tin khác.
3. Phủ đủ năm nhóm nhu cầu mà không tạo nội dung mỏng hoặc tự cạnh tranh từ khóa.
4. Giúp công cụ trả lời và hệ thống AI trích xuất đúng dịch vụ, giá tham khảo, quy trình, đối tượng phù hợp, lưu ý và cách đặt lịch.
5. Phục vụ đồng thời khách Việt Nam, người nước ngoài sinh sống tại Đà Nẵng và khách du lịch.

### 1.2. Năm cụm từ khóa bắt buộc

| Cụm | Số từ khóa | Trang dịch vụ tiếng Việt | Trang dịch vụ tiếng Anh |
|---|---:|---|---|
| Chăm sóc da / Facial | 100 | `/dich-vu/cham-soc-da-chuyen-sau-da-nang/` | `/en/services/facial-treatment-da-nang/` |
| Gội đầu dưỡng sinh / Head Spa | 100 | `/dich-vu/goi-dau-duong-sinh-da-nang/` | `/en/services/head-spa-da-nang/` |
| Chăm sóc cơ thể / Body Care | 100 | `/dich-vu/cham-soc-da-body-da-nang/` | `/en/services/body-treatment-da-nang/` |
| Mi & Mày / Lash & Brow | 100 | `/dich-vu/uon-mi-brow-lamination-da-nang/` | `/en/services/lash-lift-brow-lamination-da-nang/` |
| Triệt lông & Waxing / Hair Removal | 100 | `/dich-vu/triet-long-da-nang/` | `/en/services/laser-hair-removal-da-nang/` |

### 1.3. Mức ưu tiên

- **P0 — Bắt buộc:** lỗi ảnh hưởng crawl, index, dữ liệu local, an toàn nội dung hoặc chuyển đổi.
- **P1 — Tác động cao:** phải đạt trên trang chủ, trang dịch vụ, trang giá, liên hệ và đặt lịch.
- **P2 — Tăng cường:** giúp tăng độ phủ long-tail, CTR, khả năng trả lời và trích dẫn.
- **P3 — Thử nghiệm:** chỉ làm sau khi P0–P2 ổn định và có cách đo.

---

# PHẦN I — HIỆN TRẠNG VÀ QUYẾT ĐỊNH ƯU TIÊN

## 2. Snapshot website ngày 21/08/2026

| Hạng mục | Hiện trạng | Quyết định |
|---|---|---|
| HTTPS và status | 36/36 URL trong sitemap trả `200` | Duy trì kiểm tra tự động sau deploy |
| Title, description, canonical, H1 | Có trên 36/36 URL; mỗi trang có một H1 | Giữ gate bắt buộc khi xuất bản URL mới |
| Sitemap | `/sitemap.xml` trả `200`, có 36 URL | Sửa `lastModified` theo ngày sửa thật của từng URL |
| Robots | `/robots.txt` trả `200` nhưng chặn `/_next/` | **P0:** không chặn CSS/JS/tài nguyên render; chỉ chặn khu vực thực sự không cần crawl như `/api/` |
| Kiến trúc | Có URL riêng cho dịch vụ, kiến thức, giá, liên hệ, đặt lịch và tiếng Anh | Duy trì một intent chính cho một URL |
| Song ngữ | Có `/` và `/en/`, canonical/hreflang trên các trang chiến lược | Bổ sung `x-default` nhất quán cho mọi cặp trang |
| Structured data | Có Organization, WebSite, WebPage, Service, Offer, BreadcrumbList, FAQPage và Article | Chỉ thêm LocalBusiness/BeautySalon sau khi có NAP thật, công khai và xác minh được |
| Ảnh Open Graph | Một số trang dịch vụ tạo URL dạng `https://hatobeauty.comhttps//...` | **P0:** sửa cách ghép URL và kiểm tra toàn bộ `og:image`/`twitter:image` |
| Media | Ảnh/video SEO dùng host `hato-beauty-studio.nttthao261096.chatgpt.site` | **P1:** chuyển tài sản chiến lược sang domain/CDN thuộc quyền kiểm soát của hato Beauty |
| Local/NAP | Website chưa công khai địa chỉ, điện thoại và giờ mở cửa; địa điểm được xác nhận sau đặt lịch | **P0 Local:** chỉ xuất bản NAP khi thông tin đã được chủ doanh nghiệp xác nhận; không tự suy đoán |
| Nội dung | Có năm trang dịch vụ và năm chủ đề kiến thức cho mỗi ngôn ngữ | Mở rộng theo intent, không tạo 470 trang cho 470 từ khóa phụ |
| Chuyển đổi | Form đặt lịch hoạt động và ghi dữ liệu | Đo form hợp lệ, click gọi điện, bản đồ, chat và booking xác nhận khi các kênh này có thật |

## 3. Backlog ưu tiên

### P0 — sửa trước khi mở rộng nội dung

1. Bỏ rule `Disallow: /_next/` khỏi `robots.txt` để bot có thể tải tài nguyên render.
2. Sửa URL Open Graph/Twitter Image trên toàn bộ trang dịch vụ và bài kiến thức.
3. Xác nhận và công khai NAP thật: tên, địa chỉ, số điện thoại, giờ mở cửa, link bản đồ, khu vực phục vụ.
4. Đồng bộ NAP giữa website, Google Business Profile, Bing Places và mạng xã hội chính thức.
5. Xác minh Google Search Console, Bing Webmaster Tools; gửi sitemap và kiểm tra indexation.
6. Không xuất bản claim y khoa, kết quả tuyệt đối hoặc thông tin dịch vụ chưa xác minh.

### P1 — hoàn thành trong 30 ngày

1. Chuyển ảnh logo, OG và ảnh dịch vụ quan trọng sang host thuộc quyền kiểm soát của thương hiệu.
2. Tạo `lastModified` chính xác theo từng URL, không dùng một ngày cố định cho toàn sitemap.
3. Bổ sung NAP vào footer, trang liên hệ, trang đặt lịch và schema LocalBusiness sau khi xác nhận.
4. Chuẩn hóa trang giá theo từng nhóm dịch vụ và thể hiện điều kiện làm thay đổi giá.
5. Mở rộng mỗi trang dịch vụ theo mẫu SEO/AEO tại tài liệu này.
6. Thiết lập tracking cho `booking_submit_success`, `click_phone`, `click_map`, `click_chat`, `view_service`.

---

# PHẦN II — QUY TẮC SỬ DỤNG BỘ 500 TỪ KHÓA

## 4. Nguyên tắc phân cụm

Mỗi nhóm 100 từ khóa được chia thành sáu intent:

| Intent | Dấu hiệu từ khóa | Trang nhận từ khóa |
|---|---|---|
| Local/commercial | Đà Nẵng, Da Nang, near me, địa chỉ, spa, salon, best | Trang dịch vụ + trang liên hệ/local |
| Nhu cầu/vấn đề | da khô, tóc dầu, da sần, mi ngắn, da nhạy cảm | Section trên trang dịch vụ hoặc bài hướng dẫn chuyên sâu |
| Loại liệu trình | deep cleansing, 60 phút, keratin, body wrap, hard wax | Section liệu trình; trang riêng chỉ khi dịch vụ thật và có nội dung khác biệt |
| Giá/đặt lịch/niềm tin | giá, bảng giá, reviews, uy tín, appointment, English speaking | Trang giá + dịch vụ + đặt lịch + bằng chứng thật |
| Đối tượng/tình huống | khách du lịch, nam, nữ, sau đi biển, trước sự kiện | Bài kiến thức hoặc section tình huống |
| Tiếng Anh mở rộng | tourist, near My Khe, private room, English speaking | Trang tiếng Anh; chỉ dùng khi thông tin đúng thực tế |

### Quy tắc bắt buộc

1. Một URL chỉ có một keyword chính và một cụm semantic hỗ trợ.
2. Không tạo trang chỉ vì khác một biến thể như `Đà Nẵng`, `Da Nang`, `gần đây`, `gần tôi` hoặc `near me`.
3. Không chèn cụm `near me` một cách máy móc. Công cụ tìm kiếm suy ra local intent từ vị trí, NAP, GBP, nội dung và liên kết địa phương.
4. Không dùng `best`, `uy tín`, `an toàn`, `ít đau`, `sạch sẽ`, `phòng riêng`, `English speaking`, `open now` như claim nếu chưa có bằng chứng thật.
5. Không dịch word-by-word. Trang tiếng Anh phải trả lời đúng nhu cầu của khách quốc tế.
6. Chỉ tạo landing page mới khi đồng thời có: dịch vụ thật, intent riêng, nội dung độc đáo, bằng chứng/hình ảnh riêng và dữ liệu cho thấy nhu cầu.

## 5. Keyword map — Chăm sóc da / Facial

**Trang tiền chính:**

- VI: `/dich-vu/cham-soc-da-chuyen-sau-da-nang/`
- EN: `/en/services/facial-treatment-da-nang/`
- Hub kiến thức VI: `/kien-thuc/cham-soc-da/`
- Hub kiến thức EN: `/en/journal/facial-care/`

**Keyword chính VI:** `chăm sóc da Đà Nẵng`  
**Keyword chính EN:** `facial Da Nang` hoặc `facial treatment Da Nang`  
**Biến thể hỗ trợ:** `spa chăm sóc da Đà Nẵng`, `chăm sóc da mặt Đà Nẵng`, `spa facial Da Nang`, `skincare spa Da Nang`.

| Nhóm từ khóa phụ | Cách triển khai |
|---|---|
| Da mụn, da dầu, da khô, da nhạy cảm, hàng rào da, thiếu ẩm, xỉn màu | Section “Phù hợp với tình trạng nào?”; tránh dùng ngôn ngữ chẩn đoán/điều trị nếu không phải cơ sở y tế |
| Làm sạch sâu, cấp ẩm, phục hồi, làm sáng, soi da, routine | Mô tả bước chăm sóc thật; không liệt kê kỹ thuật chưa cung cấp |
| Giá, reviews, appointment, English speaking | Giá/thời lượng thật, đánh giá có nguồn, CTA đặt lịch; chỉ xác nhận tiếng Anh khi có nhân sự đáp ứng |
| Nam, khách du lịch, sau đi biển, trước sự kiện | Viết bài hướng dẫn theo tình huống, liên kết về trang facial |

**Câu hỏi AEO ưu tiên:**

1. Chăm sóc da chuyên sâu tại Đà Nẵng phù hợp với ai?
2. Da nhạy cảm có nên làm facial không?
3. Nên làm sạch sâu hay phục hồi da trước?
4. Facial tại Đà Nẵng giá bao nhiêu và kéo dài bao lâu?
5. Sau khi đi biển nên chăm sóc da như thế nào?
6. How do I choose a facial in Da Nang for sensitive skin?
7. What should tourists know before booking a facial in Da Nang?

## 6. Keyword map — Gội đầu dưỡng sinh / Head Spa

**Trang tiền chính:**

- VI: `/dich-vu/goi-dau-duong-sinh-da-nang/`
- EN: `/en/services/head-spa-da-nang/`
- Hub kiến thức VI: `/kien-thuc/goi-dau-duong-sinh/`
- Hub kiến thức EN: `/en/journal/head-spa/`

**Keyword chính VI:** `gội đầu dưỡng sinh Đà Nẵng`  
**Keyword chính EN:** `head spa Da Nang`  
**Biến thể hỗ trợ:** `spa gội đầu dưỡng sinh Đà Nẵng`, `gội đầu massage Đà Nẵng`, `gội đầu thảo dược Đà Nẵng`, `Vietnamese head spa Da Nang`.

| Nhóm từ khóa phụ | Cách triển khai |
|---|---|
| Thư giãn, giảm stress, massage đầu–cổ–vai–gáy | Diễn đạt là trải nghiệm thư giãn; không hứa chữa đau, bệnh lý hay rụng tóc |
| Da đầu dầu/khô, tóc bết, làm sạch da đầu | Nêu phạm vi chăm sóc thẩm mỹ và dấu hiệu cần tư vấn y khoa |
| 30/60/90 phút, bồ kết, sả bưởi, facial combo | Chỉ tạo option/section khi thời lượng, nguyên liệu và combo có thật |
| Tourist, after flight, after beach, couples | Nội dung hướng dẫn thực tế cho khách du lịch; không hứa phòng đôi/phòng riêng nếu chưa xác nhận |

**Câu hỏi AEO ưu tiên:**

1. Gội đầu dưỡng sinh khác gội đầu thông thường như thế nào?
2. Head Spa có phải điều trị da đầu không?
3. Một buổi gội đầu dưỡng sinh kéo dài bao lâu?
4. Gội đầu dưỡng sinh có bao gồm massage cổ vai gáy không?
5. Khách du lịch nên đặt Head Spa trước bao lâu?
6. What is included in a Vietnamese head spa in Da Nang?
7. Is a head spa suitable after a flight or a beach day?

## 7. Keyword map — Chăm sóc cơ thể / Body Care

**Trang tiền chính:**

- VI: `/dich-vu/cham-soc-da-body-da-nang/`
- EN: `/en/services/body-treatment-da-nang/`
- Hub kiến thức VI: `/kien-thuc/cham-soc-body/`
- Hub kiến thức EN: `/en/journal/body-care/`

**Keyword chính VI:** `chăm sóc da body Đà Nẵng`  
**Keyword chính EN:** `body treatment Da Nang` hoặc `body scrub Da Nang`  
**Biến thể hỗ trợ:** `chăm sóc body Đà Nẵng`, `body care Da Nang`, `tẩy tế bào chết body Đà Nẵng`, `body exfoliation Da Nang`.

| Nhóm từ khóa phụ | Cách triển khai |
|---|---|
| Da khô, da sần, da lưng, dưỡng ẩm, làm mềm | Section nhu cầu; không hứa đổi màu da hoặc điều trị mụn lưng nếu dịch vụ không phải điều trị y khoa |
| Cà phê, muối biển, thảo mộc, wrap, massage, back facial | Chỉ mô tả nguyên liệu/kỹ thuật thật, có quy trình và chống chỉ định rõ |
| Sau đi biển, trước sự kiện/đám cưới | Bài hướng dẫn về thời điểm, cháy nắng và khi nên hoãn |
| Private, tourists, men/women | Thông tin riêng tư, ngôn ngữ và đối tượng phải khớp vận hành thật |

**Câu hỏi AEO ưu tiên:**

1. Body scrub là gì và phù hợp với ai?
2. Tẩy tế bào chết body bao lâu một lần?
3. Có nên body scrub ngay sau khi đi biển không?
4. Body treatment tại Đà Nẵng giá bao nhiêu?
5. Da khô hoặc nhạy cảm cần lưu ý gì trước body treatment?
6. What should tourists know before a body scrub in Da Nang?

## 8. Keyword map — Mi & Mày / Lash & Brow

**Trang tiền chính:**

- VI: `/dich-vu/uon-mi-brow-lamination-da-nang/`
- EN: `/en/services/lash-lift-brow-lamination-da-nang/`
- Hub kiến thức VI: `/kien-thuc/mi-chan-may/`
- Hub kiến thức EN: `/en/journal/brow-lash/`

**Keyword chính VI:** `uốn mi Đà Nẵng`  
**Keyword chính EN:** `lash lift Da Nang`  
**Keyword đồng cấp:** `brow lamination Đà Nẵng`, `brow lamination Da Nang`.

**Quyết định kiến trúc:** trang hiện tại gộp Lash Lift và Brow Lamination. Chỉ tách hai landing page nếu mỗi dịch vụ có quy trình, giá, ảnh, FAQ, bằng chứng và nhu cầu tìm kiếm riêng; nếu chưa đủ, giữ một URL để tránh nội dung mỏng.

| Nhóm từ khóa phụ | Cách triển khai |
|---|---|
| Tự nhiên, mi ngắn/thẳng/cụp, mày thưa/rối, clean girl | Section “kết quả mong muốn” với ảnh thật; không bảo đảm một kết quả giống nhau cho mọi người |
| Keratin, Hàn Quốc, tint, mapping, threading, brow wax | Chỉ dùng nếu dịch vụ/kỹ thuật đang được cung cấp thật |
| Giá, reviews, English speaking, tourists | Giá và đánh giá có nguồn; thông tin hỗ trợ tiếng Anh phải xác minh |
| Trước đi biển, đám cưới, sự kiện | Hướng dẫn thời điểm đặt lịch và aftercare, tránh cam kết độ bền cố định |

**Câu hỏi AEO ưu tiên:**

1. Lash lift có phải nối mi không?
2. Uốn mi giữ được bao lâu?
3. Brow Lamination phù hợp với chân mày nào?
4. Có thể làm Lash Lift và Brow Lamination cùng buổi không?
5. Cần chuẩn bị gì trước khi uốn mi?
6. Is a lash lift suitable before going to the beach?
7. What is the difference between lash lift and eyelash extensions?

## 9. Keyword map — Triệt lông & Waxing / Hair Removal

**Trang tiền hiện tại:**

- VI: `/dich-vu/triet-long-da-nang/`
- EN: `/en/services/laser-hair-removal-da-nang/`
- Hub kiến thức VI: `/kien-thuc/triet-long/`
- Hub kiến thức EN: `/en/journal/hair-removal/`

**Keyword chính VI:** `triệt lông Đà Nẵng`  
**Keyword chính EN:** `laser hair removal Da Nang`  
**Cụm đồng cấp:** `waxing Đà Nẵng`, `waxing Da Nang`, `tẩy lông Đà Nẵng`.

**Quyết định kiến trúc:** công nghệ giảm lông và waxing là hai intent/kỹ thuật khác nhau. Trong ngắn hạn có thể dùng một trang tổng hợp nếu hato thật sự cung cấp cả hai. Nên tách trang waxing khi có đủ giá theo vùng, quy trình, ảnh, aftercare, FAQ và dữ liệu GSC cho thấy intent riêng. Khi tách, dùng liên kết qua lại và không để hai trang cùng tối ưu một keyword chính.

| Nhóm từ khóa phụ | Cách triển khai |
|---|---|
| Theo vùng: nách, mặt, tay, chân, bikini, lưng, toàn thân | Bảng vùng thực hiện, thời lượng, phương pháp và lưu ý riêng; chỉ liệt kê vùng đang nhận dịch vụ |
| Laser, hard wax, soft wax, hot/cold wax | So sánh trung lập dựa trên phương pháp thật; không biến từ khóa thành claim |
| Da nhạy cảm, ít đau, an toàn, hygienic/private | Dùng mô tả quy trình vệ sinh, patch test/tư vấn nếu có; tránh `không đau`, `100% an toàn` |
| Trước đi biển, tourists, men/women | Nội dung chuẩn bị, nắng, ma sát, riêng tư và thời điểm đặt lịch |

**Câu hỏi AEO ưu tiên:**

1. Triệt lông công nghệ và waxing khác nhau thế nào?
2. Có cần cạo trước buổi triệt lông không?
3. Triệt lông có vĩnh viễn không?
4. Triệt lông cần bao nhiêu buổi?
5. Waxing vùng bikini cần chuẩn bị gì?
6. Có nên waxing ngay trước khi đi biển không?
7. How should tourists prepare for waxing in Da Nang?

---

# PHẦN III — KIẾN TRÚC NỘI DUNG VÀ CHỐNG CANNIBALIZATION

## 10. Vai trò từng loại trang

| Loại trang | Intent chính | Từ khóa được sở hữu |
|---|---|---|
| Trang chủ | Brand + beauty care tại Đà Nẵng | `hato Beauty`, nhóm dịch vụ tổng quát, không tranh keyword chi tiết với trang dịch vụ |
| Trang danh mục dịch vụ | Khám phá/so sánh năm nhóm | `dịch vụ chăm sóc Đà Nẵng`, `beauty care services Da Nang` |
| Trang dịch vụ | Commercial/local/transactional | 30 keyword cốt lõi và biến thể gần nghĩa thuộc đúng dịch vụ |
| Trang kiến thức | Informational/AEO | câu hỏi, chuẩn bị, aftercare, tình huống, so sánh và rủi ro |
| Trang giá | Price intent | `giá`, `bảng giá`, `price`; không sao chép toàn bộ trang dịch vụ |
| Trang liên hệ | Local/navigation | địa chỉ, bản đồ, giờ mở cửa, điện thoại, khu vực phục vụ |
| Trang đặt lịch | Conversion | `đặt lịch`, `book`, `appointment`; form và kỳ vọng phản hồi |
| Trang về hato | Entity/trust | thương hiệu, đội ngũ, phương pháp, tiêu chuẩn vệ sinh và câu chuyện thật |

## 11. Điều kiện tạo URL mới

Chỉ tạo URL mới nếu đạt tối thiểu 5/6 điều kiện:

- [ ] Có intent khác rõ ràng với URL đang tồn tại.
- [ ] Dịch vụ hoặc chủ đề thật sự được hato cung cấp/hiểu rõ.
- [ ] Có ít nhất 60% nội dung khác biệt so với trang gần nhất.
- [ ] Có ảnh, quy trình, giá hoặc bằng chứng riêng.
- [ ] Có internal link vào và ra hợp lý.
- [ ] Có nhu cầu từ GSC, GBP, tư vấn khách hàng hoặc nghiên cứu từ khóa.

Nếu không đạt, đưa từ khóa vào một section hoặc FAQ trên URL hiện có.

## 12. Quy tắc internal link

1. Mỗi bài kiến thức phải liên kết tới đúng một trang dịch vụ chính và một CTA đặt lịch.
2. Mỗi trang dịch vụ liên kết tới hub kiến thức tương ứng, trang giá, liên hệ và đặt lịch.
3. Trang chủ liên kết trực tiếp tới năm trang dịch vụ; không dùng button JavaScript thay cho link crawlable.
4. Anchor phải mô tả đích: `xem dịch vụ Head Spa tại Đà Nẵng`, không lặp hàng loạt anchor chính xác.
5. Trang tiếng Việt liên kết sang bản tiếng Anh tương đương và ngược lại.
6. Không thêm hàng trăm link từ khóa vào footer.

---

# PHẦN IV — QUY TẮC ON-PAGE SEO

## 13. URL, title, description và heading

### URL

- Chữ thường, không dấu, dùng dấu gạch ngang, ổn định theo thời gian.
- Không thêm năm vào URL trừ khi nội dung thực sự phụ thuộc năm.
- Không đổi các URL hiện có chỉ để chèn thêm từ khóa.
- Trailing slash, canonical, sitemap và internal link phải dùng cùng một biến thể.

### Title

- Mỗi trang có title độc nhất, mô tả đúng nội dung.
- Trang dịch vụ dùng mẫu: `[Dịch vụ chính] tại Đà Nẵng | hato Beauty`.
- Trang tiếng Anh dùng mẫu: `[Service] in Da Nang | hato Beauty`.
- Keyword chính xuất hiện tự nhiên gần đầu; không nối chuỗi từ khóa bằng dấu phẩy.
- Ưu tiên độ rõ và CTR; không có giới hạn ký tự tuyệt đối, nhưng tránh bị cắt mất phần phân biệt quan trọng.

### Meta description

- Một câu mô tả dịch vụ + đối tượng/lợi ích thực tế + điểm khác biệt + hành động.
- Không nhồi các biến thể `Đà Nẵng`, `Da Nang`, `near me`.
- Không dùng `tốt nhất`, `số 1`, `100%`, `vĩnh viễn`, `không đau` nếu không có bằng chứng hợp lệ.

### H1–H3

- Mỗi trang có đúng một H1.
- H2 phản ánh tiểu câu hỏi/ý định thật; H3 chia nhỏ nội dung dài.
- Không dùng heading chỉ để định dạng chữ.
- H1 của trang dịch vụ ưu tiên `[Dịch vụ] tại Đà Nẵng`; đoạn sau H1 trả lời trực tiếp trong 40–80 từ.

## 14. Phân bổ keyword trên trang dịch vụ

Keyword chính nên có ở:

1. Title.
2. H1.
3. Đoạn mở đầu/câu trả lời nhanh.
4. Ít nhất một heading phù hợp.
5. Alt/caption của ảnh thật khi mô tả đúng ảnh.
6. Một internal link trỏ vào trang.

Keyword phụ được dùng theo ngữ cảnh trong section tương ứng. Không đặt mật độ từ khóa cố định. Nếu câu nghe không tự nhiên khi đọc thành tiếng, phải viết lại.

## 15. Mẫu trang dịch vụ chuẩn

```md
# [Dịch vụ] tại Đà Nẵng

[Câu trả lời trực tiếp 40–80 từ: dịch vụ là gì, phù hợp với ai, giới hạn quan trọng.]

## Thông tin nhanh

| Nội dung | Thông tin đã xác nhận |
|---|---|
| Giá tham khảo | ... |
| Thời lượng | ... |
| Số buổi/tần suất | ... |
| Ngôn ngữ hỗ trợ | ... |
| Địa điểm | ... |

## [Dịch vụ] là gì?
## Khi nào nên cân nhắc dịch vụ này?
## Quy trình tại hato Beauty
## Kết quả có thể kỳ vọng
## Giá và yếu tố làm thay đổi chi phí
## Chuẩn bị trước buổi hẹn
## Chăm sóc sau dịch vụ
## Ai nên thận trọng hoặc hoãn lịch?
## Hình ảnh trải nghiệm/kết quả thật
## Câu hỏi thường gặp
## Đặt lịch tại hato Beauty Đà Nẵng
```

### Gate nội dung trang dịch vụ

- [ ] Không dùng claim y khoa nếu không thuộc phạm vi pháp lý/chuyên môn.
- [ ] Giá, thời lượng, vùng thực hiện và sản phẩm đúng vận hành.
- [ ] Có câu trả lời về phù hợp, chống chỉ định, chuẩn bị và aftercare.
- [ ] Ảnh là ảnh thật hoặc ghi rõ ảnh minh họa.
- [ ] Review có nguồn và được phép sử dụng.
- [ ] CTA không che nội dung, hoạt động trên mobile và có tracking.

---

# PHẦN V — AEO: TỐI ƯU CHO CÔNG CỤ TRẢ LỜI

## 16. Cấu trúc câu trả lời

Mỗi câu hỏi quan trọng phải có:

1. **Đáp án trực tiếp:** 1–3 câu, không mở đầu lan man.
2. **Điều kiện:** kết quả phụ thuộc tình trạng, vùng, phương pháp hoặc tư vấn.
3. **Bằng chứng:** quy trình, tiêu chí lựa chọn, nguồn hoặc kinh nghiệm thật.
4. **Ngoại lệ/rủi ro:** khi nào nên hoãn hoặc hỏi chuyên gia y tế.
5. **Bước tiếp theo:** xem dịch vụ, giá, liên hệ hoặc đặt lịch.

### Độ dài khuyến nghị theo dạng

| Dạng câu hỏi | Định dạng tốt |
|---|---|
| “Là gì?” | Định nghĩa 40–70 từ + điểm khác biệt |
| “Giá bao nhiêu?” | Khoảng giá + yếu tố thay đổi + ngày cập nhật |
| “Bao lâu?” | Khoảng thời gian + yếu tố cá nhân |
| “Phù hợp với ai?” | Danh sách đối tượng + trường hợp cần thận trọng |
| “A hay B?” | Bảng so sánh theo mục tiêu, thời gian, cảm giác, aftercare |
| “Cần chuẩn bị gì?” | Danh sách 3–7 bước theo trình tự |
| Local/recommendation | Dịch vụ + vị trí thật + bằng chứng + cách đặt lịch |

## 17. Quy tắc FAQ

1. FAQ phải xuất phát từ bộ từ khóa, câu hỏi khách thật, GSC, GBP hoặc trao đổi đặt lịch.
2. Mỗi FAQ trả lời độc lập, rõ ràng và không giấu nội dung sau JavaScript mà bot không đọc được.
3. Không lặp cùng một FAQ trên mọi trang.
4. Không thêm hàng chục câu chỉ để mở rộng schema.
5. `FAQPage` chỉ dùng khi câu hỏi và đáp án hiển thị trên trang, tuân thủ chính sách nền tảng hiện hành.
6. Câu trả lời không hứa kết quả tuyệt đối và luôn nêu điều kiện quan trọng.

## 18. Quy tắc viết cho AI citation

- Nêu rõ tên thương hiệu là `hato Beauty`, domain là `https://hatobeauty.com/`, địa điểm là Đà Nẵng khi đúng ngữ cảnh.
- Dùng câu có chủ ngữ rõ; tránh đại từ mơ hồ như “chúng tôi” trong mọi đoạn trích độc lập.
- Tách dữ kiện thành bảng/danh sách có nhãn: giá, thời lượng, quy trình, chuẩn bị, aftercare, lưu ý.
- Gắn ngày cập nhật thật cho thông tin biến động.
- Nêu phương pháp và giới hạn của claim.
- Ưu tiên dữ liệu gốc: quy trình thật, thời lượng thật, ảnh thật, hướng dẫn của kỹ thuật viên, câu hỏi khách thật.
- Dẫn nguồn sơ cấp cho claim sức khỏe/kỹ thuật; không sao chép bài đối thủ.
- Không tạo số liệu, chứng chỉ, đánh giá, địa chỉ hoặc chuyên môn chưa được xác minh.

---

# PHẦN VI — LOCAL SEO VÀ THỰC THỂ

## 19. NAP bắt buộc

Trước khi thêm LocalBusiness/BeautySalon schema, chủ doanh nghiệp phải xác nhận:

```yaml
name: "hato Beauty"
legal_name: ""
street_address: ""
ward: ""
district: ""
city: "Đà Nẵng"
postal_code: ""
country: "VN"
phone_e164: ""
opening_hours: ""
google_maps_url: ""
google_business_profile_url: ""
facebook_url: ""
instagram_url: ""
zalo_or_whatsapp_url: ""
price_range: ""
areas_served: []
```

**Không được publish placeholder hoặc đoán dữ liệu.** Nếu địa điểm chỉ được tiết lộ sau khi đặt lịch, không tối ưu các từ khóa `near me`, `near My Khe`, `địa chỉ`, `open now` như thể có địa điểm công khai.

## 20. Google Business Profile

1. Tên doanh nghiệp đúng biển hiệu, không chèn từ khóa vào tên.
2. Danh mục chính/phụ phản ánh dịch vụ thật.
3. Địa chỉ hoặc service area đúng mô hình hoạt động và chính sách GBP.
4. Giờ mở cửa, số điện thoại, website và link đặt lịch đồng nhất.
5. Tạo danh mục dịch vụ với mô tả ngắn, giá thật hoặc khoảng giá.
6. Đăng ảnh thật có ngày/thông tin hợp lý; không dùng ảnh stock làm bằng chứng địa điểm.
7. Xin đánh giá tự nhiên sau trải nghiệm; không đổi quà để lấy review tích cực, không viết review giả.
8. Trả lời review bằng nội dung riêng, không lặp keyword máy móc.
9. Gắn UTM nhất quán cho website/booking từ GBP.

## 21. Schema map

| Trang | Schema tối thiểu | Điều kiện |
|---|---|---|
| Trang chủ | Organization, WebSite, WebPage | Thông tin khớp HTML |
| Trang chủ/liên hệ | BeautySalon hoặc LocalBusiness | Chỉ sau khi NAP công khai và xác minh |
| Trang dịch vụ | Service, Offer, BreadcrumbList, WebPage | Giá/offer phải đúng nội dung hiển thị |
| Trang kiến thức | Article, WebPage, BreadcrumbList | Có tác giả/reviewer/ngày thật |
| Trang danh mục | CollectionPage hoặc ItemList khi phù hợp | Danh sách thật, URL crawlable |
| FAQ | FAQPage | Chỉ câu hỏi/đáp án nhìn thấy trên trang |

Không có schema “AEO-ready” bảo đảm rich result hoặc citation. JSON-LD phải phản ánh đúng nội dung người dùng nhìn thấy.

---

# PHẦN VII — KỸ THUẬT SEO

## 22. Crawl và index

- [ ] Mọi URL chiến lược trả 200; lỗi thật trả 404/410.
- [ ] Không chặn CSS, JS, ảnh hoặc `/_next/` cần để render.
- [ ] Chỉ URL canonical/indexable xuất hiện trong sitemap.
- [ ] Canonical trỏ tới URL 200 và cùng ngôn ngữ/nội dung.
- [ ] Không index API, preview, staging, tham số theo dõi hoặc trang rỗng.
- [ ] HTML ban đầu chứa nội dung chính; không phụ thuộc hoàn toàn vào client state.
- [ ] Các link chính dùng `<a href>`.
- [ ] Sitemap khai báo trong robots và được gửi tới GSC/Bing.
- [ ] `lastmod` chỉ đổi khi nội dung chính thực sự thay đổi.

### Robots đề xuất

```txt
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://hatobeauty.com/sitemap.xml
Host: https://hatobeauty.com
```

Quyền crawler search và crawler training phải là quyết định riêng. Không chặn crawler chỉ vì tên lạ; kiểm tra tài liệu chính thức trước khi thêm rule.

## 23. Song ngữ và hreflang

1. Mỗi trang VI có một URL EN tương đương khi có nội dung dịch đầy đủ.
2. Khai báo self-canonical và hreflang hai chiều `vi-VN`, `en`, `x-default`.
3. Không canonical trang EN về trang VI.
4. Không tự động chuyển ngôn ngữ theo IP làm bot/người dùng mất quyền lựa chọn.
5. Trang EN phải dùng giá, địa chỉ, số điện thoại và quy trình giống dữ liệu thật của VI.
6. Privacy/editorial/contact tiếng Anh phải dẫn tới nội dung tiếng Anh tương ứng; nếu chưa có, ghi rõ ngôn ngữ đích.

## 24. Media và Open Graph

1. Logo, OG, ảnh dịch vụ chủ lực nên nằm trên domain hoặc CDN do hato kiểm soát.
2. `og:image` và `twitter:image` phải là URL HTTPS tuyệt đối, trả 200 và đúng MIME type.
3. Không ghép `siteUrl` vào một URL vốn đã tuyệt đối.
4. Ảnh có width/height, alt mô tả, kích thước phù hợp và không gây CLS.
5. Video hero chỉ preload có chọn lọc; dùng poster; tôn trọng `prefers-reduced-motion`.
6. Ảnh trước/sau cần consent, bối cảnh, điều kiện và lưu ý kết quả cá nhân.

## 25. Performance và accessibility

- LCP mục tiêu `< 2.5s`, INP `< 200ms`, CLS `< 0.1` ở percentile 75 khi có dữ liệu thực tế.
- CTA và input dùng được bằng bàn phím, có focus rõ, label và thông báo lỗi có `role="alert"`.
- Mobile không tràn ngang, không che CTA/form, không tải tất cả video nặng ngay lập tức.
- Font, ảnh và script bên thứ ba không chặn nội dung chính.
- Mỗi deploy phải kiểm tra console, network, route, form và Core Web Vitals theo template.

---

# PHẦN VIII — CONTENT PLAN TỪ 500 TỪ KHÓA

## 26. Không tạo 500 bài — tạo 25 tài sản chiến lược

Mỗi cụm dịch vụ dùng mô hình:

- 1 trang dịch vụ chính.
- 1 hub kiến thức.
- 3–5 bài hỗ trợ theo nhu cầu, giá, chuẩn bị/aftercare, tình huống và so sánh.
- 1 section giá trên trang giá tổng.
- 1 luồng CTA đặt lịch.

### Danh sách bài ưu tiên

| Cụm | Bài/section ưu tiên |
|---|---|
| Facial | Làm sạch sâu hay phục hồi; facial cho da nhạy cảm; chăm sóc da sau đi biển; giá và thời lượng facial; hướng dẫn cho khách du lịch |
| Head Spa | Head Spa là gì; chăm sóc da đầu dầu/khô; Head Spa sau chuyến bay; thời lượng 30/60/90 phút nếu có thật; quy trình massage đầu–vai–gáy |
| Body | Body scrub là gì; da body khô/sần; body care sau đi biển; body scrub trước sự kiện; giá và riêng tư |
| Lash & Brow | Lash lift khác nối mi; Brow Lamination phù hợp với ai; chuẩn bị/aftercare; độ bền thực tế; combo và thời điểm trước sự kiện |
| Hair Removal | Laser và waxing khác nhau; chuẩn bị theo vùng; chăm sóc sau dịch vụ; trước khi đi biển; giá theo vùng và số buổi |

## 27. Lịch xuất bản 90 ngày

### Ngày 1–30

1. Sửa các lỗi P0 kỹ thuật và xác nhận NAP.
2. Hoàn thiện năm trang dịch vụ VI và EN.
3. Chuẩn hóa trang giá, liên hệ, đặt lịch và About.
4. Gửi sitemap, thiết lập GSC/Bing/GBP và baseline.

### Ngày 31–60

1. Xuất bản 10 bài ưu tiên: mỗi cụm hai bài.
2. Bổ sung FAQ thật từ tư vấn/đặt lịch.
3. Thêm ảnh/quy trình thật, tác giả và reviewer.
4. Tạo internal link giữa bài → dịch vụ → giá → booking.

### Ngày 61–90

1. Xuất bản 10–15 bài tình huống/tiếng Anh tiếp theo.
2. Đánh giá query trong GSC và hành vi GBP.
3. Chỉ tách landing page Waxing hoặc Lash/Brow khi dữ liệu và nội dung đủ mạnh.
4. Kiểm thử 30–50 prompt AEO/AI theo VI và EN.

---

# PHẦN IX — CONTENT BRIEF VÀ NGHIỆM THU

## 28. Mẫu content brief

```yaml
url: ""
language: "vi-VN|en"
page_type: "service|article|price|local|booking"
business_goal: ""
primary_intent: "local|commercial|transactional|informational"
primary_keyword: ""
supporting_keywords: []
questions_to_answer: []
primary_entity: ""
direct_answer: ""
unique_evidence:
  real_process: ""
  real_price_duration: ""
  original_images: []
  expert_review: ""
claims_requiring_source: []
internal_links_in: []
internal_links_out: []
schema: []
cta: ""
author: ""
reviewer: ""
publish_date: ""
review_date: ""
```

## 29. Checklist trước khi xuất bản URL

- [ ] Keyword chính và intent khớp một URL ưu tiên.
- [ ] Không cannibalize URL hiện có.
- [ ] Title, description, canonical, H1 và hreflang đúng.
- [ ] Có câu trả lời trực tiếp, điều kiện và giới hạn.
- [ ] Giá, thời lượng, địa chỉ, điện thoại và dịch vụ đã xác minh.
- [ ] Claim kỹ thuật/sức khỏe được nguồn phù hợp hoặc reviewer kiểm tra.
- [ ] Không dùng claim tuyệt đối hoặc review giả.
- [ ] Ảnh/video có quyền sử dụng, alt và URL hợp lệ.
- [ ] Internal link vào/ra có ngữ cảnh.
- [ ] Schema hợp lệ và khớp nội dung hiển thị.
- [ ] Mobile, keyboard, form, console và network đã test.
- [ ] URL trả 200, có trong sitemap nếu cần index.
- [ ] Tracking CTA/booking hoạt động.

## 30. Gate phát hành

| Gate | Điều kiện pass |
|---|---|
| Access | Bot nhận 200; không chặn tài nguyên render |
| Index | Canonical, robots, sitemap, hreflang đúng |
| Intent | Một keyword/intent chính có một URL ưu tiên |
| Content | Direct answer, quy trình, giá, lưu ý và CTA đầy đủ |
| Local | NAP đúng và nhất quán hoặc chưa publish nếu chưa xác nhận |
| Trust | Claim, review, ảnh, chuyên môn và nguồn đều thật |
| Schema | Valid và khớp HTML |
| UX | Mobile/keyboard/form hoạt động; không regression nghiêm trọng |
| Measurement | GSC/Bing/analytics/conversion tracking sẵn sàng |

**Không phát hành nếu một gate P0 thất bại.**

---

# PHẦN X — KPI VÀ VẬN HÀNH

## 31. KPI SEO

- Tỷ lệ URL chiến lược trả 200, canonical đúng và indexable.
- Tỷ lệ URL sitemap được index.
- Impression, click, CTR, vị trí theo cụm dịch vụ, ngôn ngữ và intent.
- Non-brand traffic và local pack visibility.
- Số query mới theo nhóm nhu cầu/giá/đặt lịch.
- Core Web Vitals theo template và thiết bị.

## 32. KPI AEO/AI visibility

- Featured snippet/PAA theo nhóm câu hỏi.
- Tỷ lệ prompt có nhắc đúng hato Beauty.
- Tỷ lệ prompt trích đúng URL và đúng dữ kiện.
- Sai lệch về địa chỉ, giá, dịch vụ, giờ mở cửa và claim.
- Thời gian từ khi cập nhật nội dung đến khi câu trả lời phản ánh thay đổi.
- Referral và assisted conversion từ công cụ AI khi đo được.

## 33. KPI kinh doanh

- Form đặt lịch hợp lệ.
- Booking được xác nhận, không chỉ form submit.
- Click gọi điện, bản đồ, chat và đặt lịch theo landing page.
- Conversion rate theo dịch vụ, ngôn ngữ và intent.
- Tỷ lệ lead rác/không liên hệ được.

## 34. Lịch vận hành

| Tần suất | Công việc |
|---|---|
| Hàng ngày | Uptime, 5xx, lỗi form/API, booking lỗi |
| Hàng tuần | URL mới, indexation, GSC query, GBP actions, review mới |
| Hàng tháng | Crawl, broken links, metadata, schema, CWV, content decay |
| Hàng quý | Keyword map, cannibalization, NAP, prompt benchmark, đối thủ local |
| Khi thay đổi | Cập nhật giá, giờ, địa chỉ, dịch vụ, schema, sitemap và nội dung liên quan cùng lúc |

---

# PHẦN XI — NHỮNG ĐIỀU CẤM

1. Không tạo 500 trang cho 500 từ khóa.
2. Không nhồi tên Đà Nẵng/Da Nang vào mọi câu.
3. Không tự xưng `best`, `top 1`, `uy tín nhất` hoặc `số 1`.
4. Không hứa `vĩnh viễn`, `không đau`, `100%`, `chữa khỏi`.
5. Không tự tạo địa chỉ, số điện thoại, giờ mở cửa, review, chứng chỉ hay số liệu.
6. Không sao chép nội dung/FAQ của đối thủ.
7. Không dùng schema cho nội dung người dùng không nhìn thấy.
8. Không đổi ngày cập nhật nếu nội dung chính không thay đổi.
9. Không mua link rác, review giả hoặc tạo hàng loạt trang local giống nhau.
10. Không để AI xuất bản nội dung sức khỏe/thẩm mỹ mà thiếu fact-check và reviewer.

---

## 35. Nguồn quản trị

Tài liệu này kế thừa nguyên tắc và nguồn chính thức đã được tổng hợp trong `bo-tieu-chuan-seo-geo-aeo-2026.md`, gồm Google Search Central, Bing Webmaster Guidelines, IndexNow, Schema.org, tài liệu crawler của OpenAI/Anthropic/Perplexity, Core Web Vitals và WCAG 2.2.

Khi nền tảng thay đổi, ưu tiên tài liệu chính thức hiện hành hơn mọi mẹo hoặc checklist cũ.

## 36. Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|---|---|---|
| 2.0 | 21/08/2026 | Tạo quy chuẩn riêng theo bộ 500 từ khóa; cập nhật kiến trúc 36 URL hiện tại; thêm keyword map 5 cụm, AEO, Local SEO, gate phát hành và backlog kỹ thuật thực tế |

---

**Chủ sở hữu tài liệu:** ____________________  
**Người duyệt chuyên môn:** ____________________  
**Ngày review tiếp theo:** ____________________
