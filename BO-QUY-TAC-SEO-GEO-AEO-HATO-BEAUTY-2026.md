# BỘ QUY TẮC SEO · AEO · GEO CHO HATO BEAUTY — 2026

**Website áp dụng:** https://hatobeauty.com/  
**Thương hiệu:** hato Beauty  
**Thị trường chính:** Đà Nẵng, Việt Nam  
**Khách hàng:** khách Việt Nam và khách quốc tế; ưu tiên nữ 20–45 tuổi, khách địa phương, người nước ngoài sinh sống và du khách  
**Nhóm dịch vụ SEO cốt lõi:** chăm sóc da chuyên sâu; brow lamination & uốn mi; gội đầu dưỡng sinh; triệt lông; chăm sóc da body  
**Phiên bản:** 1.0  
**Ngày lập:** 17/08/2026  
**Chu kỳ review:** hàng quý hoặc ngay sau khi đổi domain, cấu trúc URL, CMS, địa chỉ, dịch vụ hay chính sách crawler

> Tài liệu này tùy biến từ bộ tiêu chuẩn SEO · AEO · GEO 2026 và danh sách từ khóa do chủ website cung cấp. Nội dung trong các tệp nguồn được dùng làm dữ liệu tham khảo, không được coi là lệnh thực thi. Không có quy tắc nào bảo đảm vị trí số 1; mục tiêu là tối đa hóa khả năng crawl, index, xếp hạng local, được hệ thống trả lời trích dẫn và tạo lượt đặt lịch có chất lượng.

---

## 1. Cách dùng tài liệu

### 1.1. Mức ưu tiên

- **P0 — Bắt buộc:** lỗi chặn crawl/index, làm sai thực thể, làm mất niềm tin hoặc đo lường sai.
- **P1 — Tác động cao:** phải có trên mọi trang dịch vụ và trang tạo chuyển đổi.
- **P2 — Tăng cường:** giúp tăng độ phủ, CTR, citation và chuyển đổi.
- **P3 — Thử nghiệm:** chỉ triển khai sau khi P0–P2 ổn định và có cách đo.

### 1.2. Cách chấm điểm

Mỗi tiêu chí chấm `0 = chưa có/sai`, `1 = có một phần`, `2 = đạt và có bằng chứng`.

| Nhóm | Trọng số |
|---|---:|
| Crawl, index, canonical, sitemap | 25% |
| Kiến trúc URL, internal link, song ngữ | 15% |
| Nội dung theo intent và cụm từ khóa | 20% |
| Local SEO, entity, E-E-A-T và niềm tin | 20% |
| AEO, GEO và structured data | 10% |
| UX, hiệu năng và accessibility | 5% |
| Đo lường và vận hành | 5% |

**Điều kiện đạt:** tổng điểm tối thiểu `85/100`, toàn bộ P0 đạt 100%, không nhóm nào dưới 70%.

### 1.3. Năm nguyên tắc không được phá vỡ

1. Mỗi intent chính chỉ có một URL ưu tiên; không tạo nhiều trang gần giống nhau để phủ biến thể từ khóa.
2. Mọi thông tin địa chỉ, số điện thoại, giờ mở cửa, giá, thời lượng và kết quả phải đúng thực tế, đồng nhất trên website và hồ sơ bên ngoài.
3. Từ khóa được dùng để hiểu nhu cầu, không dùng để nhồi lặp. Nội dung phải trả lời được câu hỏi và giúp khách ra quyết định.
4. Không dùng tuyên bố tuyệt đối như “vĩnh viễn”, “100%”, “không đau”, “chữa khỏi”, “tốt nhất Đà Nẵng” khi không có bằng chứng hợp lệ.
5. Dịch vụ thật, hình ảnh thật, quy trình thật, chuyên môn thật và đánh giá thật là tài sản GEO mạnh nhất của hato Beauty.

---

# PHẦN I — HIỆN TRẠNG VÀ MỤC TIÊU

## 2. Audit nhanh website đang hoạt động

Kiểm tra công khai ngày 17/08/2026 và đối chiếu mã nguồn hiện có cho thấy:

| Hạng mục | Hiện trạng | Ưu tiên | Quyết định |
|---|---|---:|---|
| Trang chủ | Trả `200`, HTML có nội dung chính | Đạt | Duy trì SSR/HTML crawlable |
| `robots.txt` | Trả `404` | P0 | Tạo ngay tại `/robots.txt` |
| `sitemap.xml` | Trả `404` | P0 | Tạo sitemap động/tĩnh và khai báo trong robots |
| Canonical | Không thấy canonical trên trang chủ | P0 | Self-canonical bằng domain thật |
| Domain metadata | `metadataBase`/ảnh OG đang dùng `https://hatobeauty.vercel.app` | P0 | Đổi toàn bộ sang `https://hatobeauty.com` |
| Title trang chủ | Thiên về slogan, chưa chứa dịch vụ/vị trí | P1 | Viết lại theo brand + nhóm dịch vụ + Đà Nẵng |
| Kiến trúc URL | Chỉ có trang chủ; dịch vụ và bài kiến thức là section/modal | P0 | Tạo URL HTML độc lập cho 5 cụm dịch vụ và bài kiến thức |
| Internal link | Điều hướng chủ yếu dùng `#fragment` | P0 | Menu và card phải dùng `<a href>` tới URL thật |
| Song ngữ | VI/EN đổi nội dung bằng client state trên cùng URL | P0 | Tạo URL riêng `/vi/` và `/en/` hoặc tiếng Việt ở `/`, tiếng Anh ở `/en/` |
| `hreflang` | Chưa có | P1 | Khai báo cặp `vi-VN`, `en` và `x-default` |
| Local entity/NAP | HTML công khai chưa thể hiện địa chỉ, điện thoại, giờ mở cửa, map/social link | P0 | Bổ sung NAP thật ở footer, contact và schema |
| Structured data | Chưa thấy JSON-LD | P1 | Thêm graph `BeautySalon`/`LocalBusiness`, `WebSite`, `WebPage`, `Service`, breadcrumb |
| Nội dung kiến thức | Có tiêu đề card nhưng không có URL/bài hoàn chỉnh | P1 | Xuất bản thành article có tác giả, reviewer, ngày và nguồn |
| Hình ảnh | Có ảnh dịch vụ và alt cơ bản | P1 | Dùng ảnh thật, alt mô tả, width/height, AVIF/WebP, caption khi cần |
| Hero media | Tải nhiều video autoplay | P1 | Đo LCP; poster, preload có chọn lọc, lazy-load video ngoài viewport |
| Chuyển đổi | Có form đặt lịch | Đạt một phần | Tạo trang đặt lịch/thank-you, tracking submit hợp lệ, CTA điện thoại/map |
| Search visibility | Tìm kiếm `site:hatobeauty.com` chưa cho thấy kết quả rõ ràng tại thời điểm kiểm tra | P0 | Xác minh GSC/Bing, submit sitemap, kiểm tra URL Inspection và log |

### 2.1. Thứ tự sửa bắt buộc

1. Domain thật trong metadata, canonical, OG và schema.
2. `robots.txt`, `sitemap.xml`, Search Console và Bing Webmaster Tools.
3. URL riêng cho từng dịch vụ; card/menu là link crawlable.
4. NAP, trang liên hệ, Google Map/Business Profile và dữ liệu LocalBusiness.
5. URL ngôn ngữ riêng + `hreflang`.
6. Nội dung dịch vụ, giá/thời lượng/quy trình/FAQ/aftercare có thể đọc trong HTML.

## 3. Mục tiêu kinh doanh và KPI 12 tháng

### 3.1. Mục tiêu

- Tăng lượt đặt lịch hữu cơ từ nhóm truy vấn `dịch vụ + Đà Nẵng` và `service + Da Nang`.
- Xây hato Beauty thành thực thể local rõ ràng, dễ xác minh trên Google/Bing và hệ thống AI.
- Chiếm độ phủ theo năm cụm nhu cầu thay vì phụ thuộc vào truy vấn thương hiệu.
- Chuyển traffic thông tin thành lượt xem dịch vụ, gọi điện, mở bản đồ, WhatsApp/Zalo và gửi form.

### 3.2. KPI theo tầng

| Tầng | KPI chính | Mục tiêu vận hành ban đầu |
|---|---|---|
| Eligibility | URL chiến lược trả 200, canonical đúng, có trong sitemap | 100% |
| Index | Tỷ lệ URL chiến lược được index | ≥ 90% sau khi site ổn định |
| Local | lượt xem GBP, gọi điện, chỉ đường, click website, booking | tăng theo tháng và theo mùa |
| Search | impression, click, CTR, non-brand query, landing page | theo từng cụm dịch vụ/ngôn ngữ |
| AI visibility | mention, citation, đúng URL và đúng dữ kiện | benchmark hàng quý |
| Business | form hợp lệ, click call/map/chat, booking xác nhận | báo cáo theo nguồn + landing page |

Không đặt KPI chỉ dựa trên vị trí trung bình hoặc lượng bài đã xuất bản.

---

# PHẦN II — BẢN ĐỒ TỪ KHÓA VÀ KIẾN TRÚC WEBSITE

## 4. Quy tắc phân cụm từ khóa

Mô hình bắt buộc:

`Nỗi đau/mong muốn → Dịch vụ → Vị trí → Yếu tố quyết định → Đặt lịch`

Ví dụ:

`da khô → facial → Da Nang → phù hợp da nhạy cảm/English-friendly/giá rõ → booking`

Mỗi keyword phải được gắn một trong năm intent:

- **Informational:** là gì, có phù hợp không, chuẩn bị, chăm sóc sau dịch vụ.
- **Commercial investigation:** ở đâu tốt, giá bao nhiêu, so sánh, review, quy trình.
- **Transactional:** đặt lịch, book now, gần tôi, mở cửa, hotline.
- **Local:** Đà Nẵng, Da Nang, khu vực/quận/bãi biển chỉ khi đúng vị trí thật.
- **Branded:** hato Beauty, hato Beauty Đà Nẵng, dịch vụ hato.

Không gắn “Đà Nẵng” vào mọi câu. Trang dịch vụ local dùng địa danh tự nhiên; bài kiến thức tập trung vấn đề và liên kết về trang dịch vụ local.

## 5. Kiến trúc URL đích

### 5.1. Cấu trúc khuyến nghị

Nếu tiếng Việt là ngôn ngữ mặc định:

```text
https://hatobeauty.com/
├── dich-vu/
│   ├── cham-soc-da-chuyen-sau-da-nang/
│   ├── uon-mi-brow-lamination-da-nang/
│   ├── goi-dau-duong-sinh-da-nang/
│   ├── triet-long-da-nang/
│   └── cham-soc-da-body-da-nang/
├── kien-thuc/
│   ├── cham-soc-da/
│   ├── mi-chan-may/
│   ├── goi-dau-duong-sinh/
│   ├── triet-long/
│   └── cham-soc-body/
├── bang-gia/
├── dat-lich/
├── ve-hato-beauty/
├── doi-ngu/
├── lien-he/
├── chinh-sach-bien-tap/
├── chinh-sach-bao-mat/
└── en/
    ├── services/
    │   ├── facial-treatment-da-nang/
    │   ├── lash-lift-brow-lamination-da-nang/
    │   ├── head-spa-da-nang/
    │   ├── laser-hair-removal-da-nang/
    │   └── body-treatment-da-nang/
    ├── journal/
    ├── prices/
    ├── book/
    ├── about/
    └── contact/
```

### 5.2. Quy tắc URL

- [ ] **[P0][ARCH-001]** Mỗi trang có một intent chính và một canonical tự tham chiếu.
- [ ] **[P0][ARCH-002]** Không dùng modal, tab, filter hoặc `#fragment` làm URL duy nhất cho nội dung cần xếp hạng.
- [ ] **[P0][ARCH-003]** Card dịch vụ, bài viết và CTA dùng `<a href="URL-thật">`.
- [ ] **[P0][ARCH-004]** Không tạo trang cho mọi vùng cơ thể/tình trạng da nếu nội dung chỉ thay vài từ.
- [ ] **[P1][ARCH-005]** URL chữ thường, không dấu, dùng dấu gạch ngang, không đổi slug vì mục đích “làm mới”.
- [ ] **[P1][ARCH-006]** Trang dịch vụ nằm tối đa ba lần nhấp từ trang chủ.
- [ ] **[P1][ARCH-007]** Breadcrumb thật: `Trang chủ → Dịch vụ → [Tên dịch vụ]`.
- [ ] **[P1][ARCH-008]** Waxing là dịch vụ phụ dưới cụm triệt/làm sạch lông cho đến khi có dữ liệu chứng minh cần hub riêng.

## 6. Keyword map theo năm cụm dịch vụ

### 6.1. Chăm sóc da chuyên sâu — cụm ưu tiên số 1

**URL Việt:** `/dich-vu/cham-soc-da-chuyen-sau-da-nang/`  
**URL Anh:** `/en/services/facial-treatment-da-nang/`  
**Intent:** commercial + local + transactional

| Lớp | Từ khóa/ý niệm ưu tiên |
|---|---|
| Primary VI | chăm sóc da chuyên sâu Đà Nẵng; spa chăm sóc da uy tín Đà Nẵng |
| Primary EN | facial treatment Da Nang; deep cleansing facial Da Nang |
| Tình trạng | da thiếu ẩm; da xỉn màu; da nhạy cảm; da sau mụn; lỗ chân lông; da sau đi biển |
| Kết quả | làm sạch sâu; cấp ẩm; phục hồi hàng rào da; da sáng khỏe; chăm sóc định kỳ |
| Bài hỗ trợ | làm sạch sâu hay phục hồi; facial cho da nhạy cảm; chăm sóc da sau khi đi biển; chuẩn bị trước facial; aftercare |
| CTA | xem liệu trình; xem giá; đặt lịch; tư vấn tình trạng da |

**Quy tắc claim:** chỉ dùng “điều trị mụn” nếu dịch vụ, nhân sự và phạm vi pháp lý thực sự cho phép. Nếu là chăm sóc thẩm mỹ không y khoa, dùng “chăm sóc da mụn/da dễ nổi mụn” và nêu rõ giới hạn.

### 6.2. Brow Lamination & Uốn mi

**URL Việt:** `/dich-vu/uon-mi-brow-lamination-da-nang/`  
**URL Anh:** `/en/services/lash-lift-brow-lamination-da-nang/`  
**Intent:** commercial + local + transactional

| Lớp | Từ khóa/ý niệm ưu tiên |
|---|---|
| Primary VI | uốn mi Đà Nẵng; brow lamination Đà Nẵng; tạo dáng chân mày |
| Primary EN | lash lift Da Nang; brow lamination Da Nang; eyebrow styling Da Nang |
| Nhu cầu | mi cong tự nhiên; không cần mascara; chân mày gọn/đầy hơn; phong cách tự nhiên |
| Dịp | trước chuyến đi; trước khi chụp ảnh; làm đẹp cô dâu nếu hato thật sự phục vụ |
| Bài hỗ trợ | lash lift khác nối mi; uốn mi giữ được bao lâu; aftercare 24–48 giờ; ai không nên làm; brow lamination tự nhiên |
| CTA | xem hình thật; chọn dịch vụ mi/mày; xem giá; đặt lịch |

**Quy tắc cannibalization:** không trộn “nối mi” vào trang nếu hato không cung cấp. `lash lift` và `eyelash extension` là hai intent khác nhau.

### 6.3. Gội đầu dưỡng sinh / Head Spa

**URL Việt:** `/dich-vu/goi-dau-duong-sinh-da-nang/`  
**URL Anh:** `/en/services/head-spa-da-nang/`  
**Intent:** commercial + local + experience + transactional

| Lớp | Từ khóa/ý niệm ưu tiên |
|---|---|
| Primary VI | gội đầu dưỡng sinh Đà Nẵng; spa dưỡng sinh Đà Nẵng; massage đầu thư giãn |
| Primary EN | head spa Da Nang; herbal hair wash Da Nang; head massage Da Nang |
| Nhu cầu | thư giãn; mỏi đầu/cổ/vai/gáy; chăm sóc da đầu; tóc khô; nghỉ sau giờ làm/du lịch |
| Thành phần | thảo mộc; làm sạch da đầu; massage đầu–vai–gáy; thời lượng |
| Bài hỗ trợ | head spa là gì; quy trình; nên đi bao lâu một lần; gội dưỡng sinh và hair spa khác nhau thế nào |
| CTA | xem trải nghiệm; xem thời lượng/giá; book head spa |

**Quy tắc dịch:** với khách quốc tế ưu tiên cách gọi tự nhiên `Head Spa Da Nang`; không dịch máy móc “nourishing shampoo” cho toàn bộ dịch vụ.

### 6.4. Triệt lông

**URL Việt:** `/dich-vu/triet-long-da-nang/`  
**URL Anh:** `/en/services/laser-hair-removal-da-nang/`  
**Intent:** commercial + local + transactional

| Lớp | Từ khóa/ý niệm ưu tiên |
|---|---|
| Primary VI | triệt lông Đà Nẵng; triệt lông laser Đà Nẵng; spa triệt lông uy tín |
| Primary EN | laser hair removal Da Nang; underarm hair removal; bikini hair removal |
| Theo vùng | nách; chân; tay; bikini; ria mép; toàn thân — chỉ mô tả vùng có cung cấp |
| Yếu tố quyết định | công nghệ; số buổi dự kiến; riêng tư; da nhạy cảm; chuẩn bị; chăm sóc sau |
| Bài hỗ trợ | cạo trước buổi triệt; tránh nắng; bao nhiêu buổi; laser và waxing; phản ứng thường gặp và khi nào cần hỗ trợ |
| CTA | chọn vùng; xem giá theo vùng; tư vấn; đặt lịch |

**Quy tắc claim:** không dùng “triệt lông vĩnh viễn” làm thông điệp chính. Dùng ngôn ngữ chính xác như “giảm lông dài hạn” nếu có căn cứ; không hứa “không đau”.

### 6.5. Chăm sóc da body

**URL Việt:** `/dich-vu/cham-soc-da-body-da-nang/`  
**URL Anh:** `/en/services/body-treatment-da-nang/`  
**Intent:** commercial + local + transactional

| Lớp | Từ khóa/ý niệm ưu tiên |
|---|---|
| Primary VI | chăm sóc da body Đà Nẵng; tẩy tế bào chết body; chăm sóc body chuyên sâu |
| Primary EN | body treatment Da Nang; body scrub Da Nang; body care spa Da Nang |
| Nhu cầu | da khô/sần; da sau nắng/đi biển; cấp ẩm; làm mềm bề mặt da |
| Kết quả | da sạch thoáng; mềm mại; cảm giác thư giãn; bề mặt đều và sáng khỏe hơn |
| Bài hỗ trợ | body scrub bao lâu một lần; chăm sóc da sau biển; scrub trước chuyến đi; ai có da nhạy cảm cần lưu ý gì |
| CTA | xem nghi thức; thành phần; thời lượng/giá; đặt lịch |

**Quy tắc claim:** tránh dùng “dưỡng trắng” hoặc “body whitening” như cam kết biến đổi màu da. Có thể dùng “hỗ trợ bề mặt da trông sáng khỏe/đều màu hơn” khi đúng trải nghiệm và có giới hạn rõ.

## 7. Quy tắc phân bổ từ khóa trên trang

- [ ] Primary keyword xuất hiện tự nhiên trong title, H1, đoạn mở đầu và ít nhất một internal link trỏ vào; không ép lặp.
- [ ] Secondary keyword dùng trong H2/H3, bảng giá, FAQ, alt/caption khi đúng ngữ cảnh.
- [ ] Mỗi trang có tối đa một chủ đề chính; biến thể gần nghĩa nằm cùng trang.
- [ ] Keyword tiếng Anh nằm trên URL tiếng Anh, không chèn dày đặc vào bài Việt.
- [ ] “Near me” không cần đưa máy móc vào câu; tối ưu bằng vị trí thật, NAP, map và GBP.
- [ ] Không tạo trang “dịch vụ + từng quận/bãi biển” nếu hato không có cơ sở hoặc giá trị riêng tại đó.
- [ ] Theo dõi query thực tế trong GSC rồi cập nhật map mỗi tháng; không lấy volume ước tính làm quyết định duy nhất.

---

# PHẦN III — TIÊU CHUẨN KỸ THUẬT

## 8. Crawl, robots và index

- [ ] **[P0][CRAWL-001]** HTTPS ổn định; hợp nhất HTTP, `www` và non-`www` về `https://hatobeauty.com/` bằng 301/308.
- [ ] **[P0][CRAWL-002]** URL chiến lược trả `200`; URL đổi dùng redirect 1:1; URL mất dùng `404/410`.
- [ ] **[P0][CRAWL-003]** Không `noindex` hoặc chặn robots nhầm trang dịch vụ, bài viết, giá, giới thiệu và liên hệ.
- [ ] **[P0][CRAWL-004]** Nội dung quan trọng có trong HTML đầu ra, không chỉ sau click modal hoặc gọi API phía client.
- [ ] **[P0][CRAWL-005]** WAF/CDN không chặn Googlebot, Bingbot và crawler search được lựa chọn.
- [ ] **[P0][CRAWL-006]** Tạo `robots.txt` và kiểm tra trả `200 text/plain`.
- [ ] **[P0][INDEX-001]** Mỗi trang indexable có self-canonical tuyệt đối dùng domain thật.
- [ ] **[P0][INDEX-002]** Sitemap chỉ chứa URL canonical, 200, indexable và có giá trị tìm kiếm.
- [ ] **[P0][INDEX-003]** Không index trang tìm kiếm nội bộ, tham số tracking, preview, staging, API và trang cảm ơn.
- [ ] **[P1][INDEX-004]** `lastmod` chỉ thay đổi khi nội dung chính đổi thật.

### 8.1. `robots.txt` đề xuất

```txt
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Quyền training phải là quyết định kinh doanh riêng.
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Allow: /

User-agent: *
Allow: /
Disallow: /api/
Disallow: /dat-lich/thanh-cong/
Disallow: /en/book/success/

Sitemap: https://hatobeauty.com/sitemap.xml
```

`robots.txt` không phải biện pháp bảo mật. Trang chứa dữ liệu khách hàng phải được bảo vệ bằng xác thực/ủy quyền, không chỉ `Disallow`.

## 9. Canonical, metadata và social preview

- [ ] **[P0][META-001]** `metadataBase = new URL("https://hatobeauty.com")`.
- [ ] **[P0][META-002]** OG image, logo, canonical, schema và sitemap không còn URL `hatobeauty.vercel.app`.
- [ ] **[P0][META-003]** Mỗi URL có title và description riêng, khớp nội dung hiển thị.
- [ ] **[P1][META-004]** Title ưu tiên chủ đề + địa điểm + brand; không vượt quá khả năng đọc tự nhiên chỉ để đạt số ký tự.
- [ ] **[P1][META-005]** Description nêu dịch vụ, lợi ích thực tế, điểm khác biệt và CTA; không nhồi danh sách keyword.
- [ ] **[P1][META-006]** OG locale khớp ngôn ngữ URL; `vi_VN` cho trang Việt, `en_US` hoặc `en_GB` nhất quán cho trang Anh.

### 9.1. Mẫu metadata

| Trang | Title đề xuất | Description định hướng |
|---|---|---|
| Trang chủ VI | `hato Beauty Đà Nẵng | Chăm sóc da, Head Spa, Mi & Body` | Nêu 5 nhóm dịch vụ, không gian, đối tượng và CTA đặt lịch |
| Facial VI | `Chăm Sóc Da Chuyên Sâu Đà Nẵng | hato Beauty` | Cá nhân hóa theo tình trạng da; quy trình, giá tham khảo và tư vấn |
| Head Spa VI | `Gội Đầu Dưỡng Sinh Đà Nẵng | hato Beauty` | Làm sạch da đầu, massage đầu–vai–gáy, thời lượng và đặt lịch |
| Facial EN | `Facial Treatment in Da Nang | hato Beauty` | Clear English description, duration, price guidance and booking |
| Contact | `Liên Hệ & Đặt Lịch hato Beauty Đà Nẵng` | Địa chỉ, map, giờ mở cửa, điện thoại và kênh chat thật |

Các title trên là mẫu biên tập, phải kiểm tra lại theo dịch vụ và dữ liệu thật trước khi phát hành.

## 10. Song ngữ và `hreflang`

- [ ] **[P0][LANG-001]** Mỗi ngôn ngữ có URL riêng và HTML riêng; không đổi nội dung chỉ bằng nút client-side trên cùng URL.
- [ ] **[P0][LANG-002]** Mỗi trang tự canonical về chính nó, không canonical trang Anh về trang Việt.
- [ ] **[P1][LANG-003]** Cặp trang tương đương khai báo `vi-VN`, `en` và `x-default` hai chiều.
- [ ] **[P1][LANG-004]** Language switch là link crawlable tới URL tương đương, không phải button đổi state.
- [ ] **[P1][LANG-005]** Không dịch từ khóa từng chữ; dùng thuật ngữ khách quốc tế thực sự tìm: `facial treatment`, `lash lift`, `brow lamination`, `head spa`, `laser hair removal`, `body scrub`.
- [ ] **[P1][LANG-006]** Trang Anh phải có giá/đơn vị, số điện thoại quốc tế, phương thức booking và hướng dẫn đến địa điểm dễ hiểu.

Ví dụ:

```html
<link rel="alternate" hreflang="vi-VN" href="https://hatobeauty.com/dich-vu/goi-dau-duong-sinh-da-nang/">
<link rel="alternate" hreflang="en" href="https://hatobeauty.com/en/services/head-spa-da-nang/">
<link rel="alternate" hreflang="x-default" href="https://hatobeauty.com/dich-vu/goi-dau-duong-sinh-da-nang/">
```

## 11. Hiệu năng, mobile và accessibility

- [ ] **[P0][UX-001]** Mobile có đủ nội dung, link và CTA như desktop.
- [ ] **[P0][UX-002]** Popup ưu đãi không che toàn màn hình ngay khi vào; dễ đóng; không khóa nội dung/bàn phím.
- [ ] **[P0][UX-003]** Form có label, trạng thái lỗi, focus, bàn phím và thông báo thành công rõ.
- [ ] **[P1][UX-004]** Theo dõi Core Web Vitals thực tế: LCP ≤ 2,5 giây; INP ≤ 200 ms; CLS ≤ 0,1 ở phân vị 75.
- [ ] **[P1][UX-005]** Hero chỉ ưu tiên tải media cần thiết; có poster; video phụ lazy-load; tôn trọng `prefers-reduced-motion`.
- [ ] **[P1][UX-006]** Ảnh có kích thước khai báo, định dạng WebP/AVIF, `srcset/sizes`, alt đúng mục đích.
- [ ] **[P1][UX-007]** Màu chữ/nền, focus indicator, landmark, heading và thứ tự đọc đáp ứng WCAG 2.2 AA ở mức thực tế.
- [ ] **[P1][UX-008]** CTA `Gọi`, `Chỉ đường`, `WhatsApp/Zalo`, `Đặt lịch` không phụ thuộc duy nhất vào JavaScript.

---

# PHẦN IV — LOCAL SEO, ENTITY VÀ NIỀM TIN

## 12. NAP và Google Business Profile

**NAP = Name, Address, Phone.** Trước khi triển khai, chủ website phải cung cấp và xác nhận:

```yaml
business_name: "hato Beauty"
legal_name: "[CẦN XÁC NHẬN]"
street_address: "[CẦN XÁC NHẬN]"
district_city_postal: "[CẦN XÁC NHẬN]"
country: "VN"
phone_e164: "[CẦN XÁC NHẬN]"
opening_hours: "[CẦN XÁC NHẬN]"
google_maps_url: "[CẦN XÁC NHẬN]"
google_business_profile_url: "[CẦN XÁC NHẬN]"
instagram_url: "[CẦN XÁC NHẬN]"
facebook_url: "[CẦN XÁC NHẬN]"
zalo_or_whatsapp: "[CẦN XÁC NHẬN]"
price_range: "[CẦN XÁC NHẬN]"
```

Không được đưa các placeholder này lên production.

- [ ] **[P0][LOCAL-001]** NAP giống từng ký tự hợp lý trên website, GBP, Bing Places, Facebook và directory chính.
- [ ] **[P0][LOCAL-002]** Trang liên hệ có địa chỉ văn bản, số điện thoại click-to-call, giờ mở cửa, map và chỉ dẫn.
- [ ] **[P0][LOCAL-003]** GBP dùng danh mục chính/phụ đúng, URL website chính thức và URL đặt lịch có UTM.
- [ ] **[P1][LOCAL-004]** Cập nhật dịch vụ, giá, mô tả, ảnh thật, holiday hours và Q&A trên GBP.
- [ ] **[P1][LOCAL-005]** Xin review sau trải nghiệm bằng cách trung lập; không mua, lọc, đổi quà lấy review tích cực hay tạo review giả.
- [ ] **[P1][LOCAL-006]** Trả lời review cụ thể, không tiết lộ tình trạng/dữ liệu cá nhân của khách.
- [ ] **[P1][LOCAL-007]** Ảnh cơ sở, mặt tiền, phòng dịch vụ, đội ngũ và thiết bị có ngữ cảnh thật; không dùng ảnh stock để giả cơ sở.
- [ ] **[P2][LOCAL-008]** Xây citation có chọn lọc từ nguồn địa phương/du lịch/làm đẹp uy tín; tránh submit hàng loạt directory rác.

## 13. Thực thể thương hiệu và E-E-A-T

- [ ] **[P0][ENTITY-001]** Dùng một tên ưu tiên: `hato Beauty`; quy định rõ cách viết hoa trong logo và văn bản.
- [ ] **[P0][ENTITY-002]** Trang About nêu ai vận hành, triết lý, dịch vụ, địa điểm và bằng chứng thật.
- [ ] **[P0][TRUST-001]** Trang đội ngũ nêu vai trò, đào tạo/chứng chỉ có thể xác minh và phạm vi thực hành.
- [ ] **[P0][TRUST-002]** Không gán chức danh bác sĩ/chuyên gia hoặc chứng nhận khi không có hồ sơ hợp lệ.
- [ ] **[P1][TRUST-003]** Bài kiến thức có tác giả, reviewer phù hợp, ngày xuất bản/cập nhật và nội dung thay đổi.
- [ ] **[P1][TRUST-004]** Chính sách biên tập nêu cách fact-check, sửa lỗi, dùng AI và xử lý xung đột lợi ích.
- [ ] **[P1][TRUST-005]** Giá, thời lượng, số buổi và kết quả được ghi là khoảng ước tính khi phụ thuộc tình trạng cá nhân.
- [ ] **[P1][TRUST-006]** Before/after phải có đồng ý, điều kiện chụp nhất quán, chú thích và câu “kết quả tùy tình trạng”.
- [ ] **[P1][TRUST-007]** Testimonial chỉ dùng lời thật; không tạo tên, ảnh, số sao hoặc quote giả.
- [ ] **[P1][TRUST-008]** Có privacy, terms, booking/cancel, refund (nếu áp dụng), aftercare và cách liên hệ khi có phản ứng bất thường.

## 14. Chính sách ngôn ngữ nhạy cảm

| Không nên dùng như cam kết | Cách diễn đạt an toàn/chính xác hơn |
|---|---|
| triệt lông vĩnh viễn | giảm lông dài hạn / liệu trình theo chu kỳ lông, nếu đúng |
| triệt lông không đau | thiết kế để tăng sự thoải mái; cảm nhận tùy người |
| trị mụn/chữa mụn | chăm sóc da mụn/da dễ nổi mụn, trừ khi đủ phạm vi chuyên môn |
| trắng bật tone | hỗ trợ da trông sáng khỏe và đều màu hơn |
| se khít lỗ chân lông vĩnh viễn | hỗ trợ bề mặt da trông mịn và sạch thoáng hơn |
| tốt nhất/số 1/uy tín nhất | nêu bằng chứng cụ thể: số năm, review thật, quy trình, chứng chỉ |
| detox/thải độc | mô tả tác dụng thực tế có thể quan sát; tránh claim sinh lý không có nguồn |

---

# PHẦN V — ON-PAGE, AEO VÀ GEO

## 15. Chuẩn bắt buộc cho trang dịch vụ

Mỗi trang dịch vụ cần có:

1. H1 duy nhất, nêu dịch vụ và địa điểm tự nhiên.
2. Đoạn trả lời nhanh 40–80 từ: dịch vụ là gì, phù hợp với ai, điểm khác biệt và giới hạn.
3. Bảng giá/thời lượng hoặc giải thích rõ yếu tố làm giá thay đổi.
4. Vấn đề/nhu cầu mà dịch vụ hỗ trợ; không chẩn đoán bệnh.
5. Quy trình theo bước, thiết bị/sản phẩm dùng thật và tiêu chuẩn vệ sinh.
6. Ai phù hợp, ai cần hoãn/trao đổi chuyên môn, vùng thực hiện.
7. Chuẩn bị trước và aftercare.
8. Kết quả kỳ vọng, thời điểm thấy thay đổi và yếu tố làm kết quả khác nhau.
9. Ảnh/video thật, caption, người thực hiện hoặc bối cảnh khi có thể.
10. FAQ dựa trên câu hỏi khách thật/GSC; không đặt số lượng cố định.
11. NAP rút gọn, map/địa điểm và CTA đặt lịch rõ.
12. Link tới 2–4 bài hỗ trợ và các dịch vụ liên quan hợp lý.
13. Tác giả/reviewer và ngày review nếu có nội dung kỹ thuật/sức khỏe làn da.

### 15.1. Template trang dịch vụ

```md
# [Tên dịch vụ] tại Đà Nẵng

[Câu trả lời nhanh: trải nghiệm, người phù hợp, điểm khác biệt, không hứa quá mức.]

## Thông tin nhanh

| Thời lượng | Giá tham khảo | Phù hợp | Đặt lịch |
|---|---:|---|---|

## [Dịch vụ] là gì?

## Khi nào nên chọn dịch vụ này?

## Quy trình tại hato Beauty

1. Tư vấn/đánh giá
2. Chuẩn bị và vệ sinh
3. Thực hiện
4. Hướng dẫn sau dịch vụ

## Kết quả có thể kỳ vọng

[Nêu điều kiện, biến thiên cá nhân và giới hạn.]

## Bảng giá và thời lượng

## Chuẩn bị trước khi đến

## Chăm sóc sau dịch vụ

## Ai cần thận trọng hoặc hoãn lịch?

## Hình ảnh trải nghiệm/kết quả thật

## Câu hỏi thường gặp

## Đặt lịch tại hato Beauty Đà Nẵng

[NAP + map + call/chat/form]

**Người biên soạn:** ...  
**Người kiểm duyệt:** ...  
**Cập nhật:** YYYY-MM-DD
```

## 16. Chuẩn nội dung kiến thức

- [ ] **[P0][CONTENT-001]** Trang trả lời đúng intent; không viết 2.000 từ khi 700 từ là đủ.
- [ ] **[P0][CONTENT-002]** Mọi claim về da, laser, chống chỉ định, phản ứng hoặc thời gian hiệu quả được kiểm chứng.
- [ ] **[P1][CONTENT-003]** Mở bài trả lời trực tiếp trước khi giải thích dài.
- [ ] **[P1][CONTENT-004]** Có kinh nghiệm thật: quy trình, quan sát, ảnh, dữ liệu câu hỏi khách, giới hạn.
- [ ] **[P1][CONTENT-005]** Dẫn nguồn sơ cấp gần claim; không sao chép nội dung đối thủ hoặc tổng hợp nguồn vòng tròn.
- [ ] **[P1][CONTENT-006]** Ngày cập nhật chỉ đổi khi nội dung thật sự được sửa.
- [ ] **[P1][CONTENT-007]** Mỗi bài liên kết về đúng một trang dịch vụ chính bằng anchor tự nhiên.
- [ ] **[P1][CONTENT-008]** AI có thể hỗ trợ dàn ý/biên tập nhưng con người chịu trách nhiệm kiểm chứng, tính nguyên bản và phê duyệt.

### 16.1. Cụm bài ưu tiên 90 ngày

| Cụm | Bài nên xuất bản trước |
|---|---|
| Chăm sóc da | Làm sạch sâu hay phục hồi; facial cho da nhạy cảm; chăm sóc da sau đi biển; chăm sóc da mụn có giới hạn gì |
| Mi & mày | Lash lift khác nối mi; uốn mi giữ bao lâu; aftercare; brow lamination có hợp chân mày thưa không |
| Head Spa | Head spa là gì; quy trình gội dưỡng sinh; massage đầu–vai–gáy; cách chọn thời lượng |
| Triệt lông | Cần chuẩn bị gì; số buổi phụ thuộc yếu tố nào; laser và waxing; chăm sóc sau buổi triệt |
| Body | Body scrub bao lâu một lần; chăm sóc da sau biển; scrub cho da nhạy cảm; chuẩn bị trước sự kiện/chuyến đi |

Chỉ xuất bản khi có nội dung đủ tốt; ưu tiên 2 bài chất lượng/tháng hơn lịch dày nhưng mỏng.

## 17. AEO — tối ưu cho công cụ trả lời

- [ ] **[P0][AEO-001]** H1 và H2 diễn đạt câu hỏi/chủ đề mà người dùng thật sự cần.
- [ ] **[P0][AEO-002]** Có đáp án trực tiếp 1–3 câu ngay dưới heading phù hợp.
- [ ] **[P1][AEO-003]** Dùng bảng cho giá/so sánh, danh sách cho bước, definition cho thuật ngữ; không biến mọi đoạn thành bullet.
- [ ] **[P1][AEO-004]** Câu trả lời nêu điều kiện và ngoại lệ, đặc biệt với số buổi, độ bền, cảm giác và kết quả.
- [ ] **[P1][AEO-005]** FAQ xuất phát từ tư vấn, booking, GSC, GBP Q&A hoặc câu hỏi hỗ trợ thật.
- [ ] **[P1][AEO-006]** Nội dung quan trọng không nằm độc quyền trong accordion chưa render, ảnh, video hoặc PDF.
- [ ] **[P2][AEO-007]** Tạo glossary ngắn cho `facial`, `lash lift`, `brow lamination`, `head spa`, `laser hair removal`, `body scrub`.

## 18. GEO — tối ưu khả năng được AI trích dẫn

- [ ] **[P0][GEO-001]** Thực thể hato Beauty có tên, domain, NAP, dịch vụ và hồ sơ ngoài site nhất quán.
- [ ] **[P0][GEO-002]** Nội dung công khai, crawlable và chứa dữ kiện có thể xác minh.
- [ ] **[P1][GEO-003]** Mỗi claim quan trọng có nguồn, phương pháp hoặc kinh nghiệm trực tiếp.
- [ ] **[P1][GEO-004]** Tạo nội dung khó thay thế: bảng giá minh bạch, quy trình thật, hướng dẫn aftercare, ảnh cơ sở, FAQ từ khách, dữ liệu tổng hợp ẩn danh.
- [ ] **[P1][GEO-005]** Nêu rõ ngày, phạm vi và giới hạn của dữ kiện; tránh câu mơ hồ.
- [ ] **[P1][GEO-006]** Trang About, Contact, Team, Editorial Policy và Service tạo thành graph niềm tin liên kết qua lại.
- [ ] **[P1][GEO-007]** Theo dõi khi AI nhắc sai địa chỉ, dịch vụ, giá hoặc giờ; sửa nguồn gốc và yêu cầu recrawl hợp lý.
- [ ] **[P2][GEO-008]** Xây tài sản gốc mỗi quý: báo cáo câu hỏi khách, checklist chăm sóc theo mùa biển Đà Nẵng, hướng dẫn song ngữ cho du khách.
- [ ] **[P2][GEO-009]** Earned mention từ báo/guide địa phương, khách sạn, cộng đồng expat/du lịch hoặc đối tác liên quan phải tự nhiên và minh bạch.

Không coi `llms.txt`, một schema đặc biệt, mật độ từ khóa hay việc cho phép training bot là “bí quyết xếp hạng AI”.

---

# PHẦN VI — STRUCTURED DATA

## 19. Schema map

| Loại trang | Schema chính | Ghi chú |
|---|---|---|
| Trang chủ | `BeautySalon` hoặc `LocalBusiness` + `WebSite` + `WebPage` | Dùng `@id` ổn định |
| Trang dịch vụ | `Service` + `WebPage` + `BreadcrumbList` | Provider trỏ về business `@id` |
| Bài kiến thức | `Article` + `WebPage` + `BreadcrumbList` | Có author/reviewer/date thật |
| Trang liên hệ | `ContactPage` + business entity | NAP khớp nội dung thấy được |
| Trang đội ngũ | `Person` + `ProfilePage` khi phù hợp | Không khai chứng chỉ sai |
| FAQ | Chỉ dùng `FAQPage` khi câu hỏi/đáp án hiển thị và đúng chính sách | Không kỳ vọng rich result bắt buộc |

- [ ] **[P0][SCHEMA-001]** JSON-LD khớp nội dung người dùng thấy.
- [ ] **[P0][SCHEMA-002]** Không dùng review/rating tự khai hoặc dữ liệu giả.
- [ ] **[P1][SCHEMA-003]** URL, logo, image, phone, address và social đều tuyệt đối, dùng domain thật.
- [ ] **[P1][SCHEMA-004]** Validate bằng Schema.org validator và công cụ rich result phù hợp sau mỗi deploy.

### 19.1. Khung JSON-LD cho trang chủ

> Chỉ triển khai sau khi thay toàn bộ `[CẦN XÁC NHẬN]` bằng dữ liệu thật và xóa thuộc tính không có.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["BeautySalon", "LocalBusiness"],
      "@id": "https://hatobeauty.com/#business",
      "name": "hato Beauty",
      "url": "https://hatobeauty.com/",
      "logo": "https://hatobeauty.com/brand/hato-logo-transparent-v3.png",
      "image": "https://hatobeauty.com/og-v2.png",
      "telephone": "[CẦN XÁC NHẬN]",
      "priceRange": "[CẦN XÁC NHẬN]",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[CẦN XÁC NHẬN]",
        "addressLocality": "Đà Nẵng",
        "addressCountry": "VN"
      },
      "sameAs": [
        "[GOOGLE BUSINESS PROFILE]",
        "[FACEBOOK]",
        "[INSTAGRAM]"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://hatobeauty.com/#website",
      "url": "https://hatobeauty.com/",
      "name": "hato Beauty",
      "publisher": { "@id": "https://hatobeauty.com/#business" },
      "inLanguage": ["vi-VN", "en"]
    },
    {
      "@type": "WebPage",
      "@id": "https://hatobeauty.com/#webpage",
      "url": "https://hatobeauty.com/",
      "name": "hato Beauty Đà Nẵng",
      "isPartOf": { "@id": "https://hatobeauty.com/#website" },
      "about": { "@id": "https://hatobeauty.com/#business" },
      "inLanguage": "vi-VN"
    }
  ]
}
```

---

# PHẦN VII — ĐO LƯỜNG, CONTENT OPS VÀ NGHIỆM THU

## 20. Tracking plan

### 20.1. Sự kiện chuyển đổi

| Event | Khi ghi nhận | Thuộc tính tối thiểu |
|---|---|---|
| `booking_form_start` | tương tác đầu tiên với form | page, language, service |
| `booking_form_submit` | server xác nhận lưu thành công | page, service, language; không gửi PII vào analytics |
| `click_call` | click `tel:` | page, placement, language |
| `click_map` | mở chỉ đường | page, placement |
| `click_chat` | WhatsApp/Zalo/Messenger | channel, page, language |
| `view_service` | xem trang dịch vụ | service, language |
| `view_price` | xem/mở bảng giá | service, language |

- Không gửi tên, điện thoại hoặc ghi chú cá nhân sang GA/advertising platform.
- Form thành công chỉ ghi nhận sau response server hợp lệ, không ghi khi chỉ click nút.
- Dùng UTM nhất quán cho GBP, social, hotel partner và campaign.

## 21. Dashboard tối thiểu

- GSC: query/page/country/device, branded vs non-branded, 5 cụm dịch vụ.
- Bing Webmaster Tools: indexation, crawl và query.
- Analytics: organic landing page → CTA → form hợp lệ → booking xác nhận.
- GBP: call, direction, website click, booking theo tháng.
- Kỹ thuật: uptime, 5xx, sitemap, canonical, CWV và schema errors.
- AI: bộ 30–50 prompt VI/EN, ngày chạy, nền tảng, mention, citation, URL, độ chính xác.

## 22. Bộ prompt benchmark GEO/AEO

Ví dụ nhóm prompt, không dùng để thao túng:

- “Spa chăm sóc da chuyên sâu ở Đà Nẵng có giá và quy trình rõ ràng?”
- “Facial treatment in Da Nang for sensitive skin with English booking?”
- “Where can I get a head spa in Da Nang?”
- “Lash lift và brow lamination ở Đà Nẵng khác nhau thế nào?”
- “Laser hair removal in Da Nang: what should tourists prepare?”
- “Body scrub in Da Nang after a beach trip.”
- “hato Beauty ở đâu, có dịch vụ gì và đặt lịch thế nào?”

Mỗi prompt chạy nhiều lần, ghi rõ model/chế độ search/ngôn ngữ/vị trí/ngày; đánh giá đúng dữ kiện trước khi đếm mention.

## 23. Lịch vận hành

| Tần suất | Việc phải làm |
|---|---|
| Hàng ngày | uptime, lỗi booking, 5xx, bảo mật, dữ liệu giá/giờ quan trọng |
| Hàng tuần | URL mới, sitemap, GSC coverage, index request chọn lọc, review cần trả lời |
| Hàng tháng | crawl kỹ thuật, CWV, broken link, query map, conversion, GBP |
| Hàng quý | content decay, NAP/entity, schema, AI benchmark, crawler policy, competitor gap |
| Nửa năm | cấu trúc site, trang đội ngũ, policy, topic cluster, ảnh và media |

## 24. Lộ trình 90 ngày

### Ngày 1–14 — Mở đường P0

- Đổi `metadataBase` và toàn bộ asset/canonical về `hatobeauty.com`.
- Tạo `robots.txt`, `sitemap.xml`, canonical, redirect host.
- Xác minh Google Search Console Domain Property và Bing Webmaster Tools.
- Xác nhận NAP/giờ/map/social, đưa vào HTML footer và trang liên hệ.
- Kiểm tra WAF, status, HTML render, indexability và log crawler.

**Gate:** robots/sitemap trả 200; domain thống nhất; GSC/Bing nhận sitemap; không còn blocker P0.

### Ngày 15–30 — Kiến trúc và trang tiền

- Tạo 5 trang dịch vụ Việt + 5 trang Anh theo keyword map.
- Biến card/menu thành link crawlable; giữ modal chỉ như UX phụ nếu cần.
- Tạo About, Contact, Prices, Booking, Team, Editorial/Privacy.
- Triển khai `hreflang`, breadcrumb và JSON-LD cơ bản.

**Gate:** mỗi dịch vụ có URL, metadata, canonical, HTML, CTA và internal link riêng.

### Ngày 31–60 — Nội dung và Local SEO

- Hoàn thiện GBP/Bing Places, dịch vụ, ảnh, booking URL và UTM.
- Xuất bản 6–10 bài hỗ trợ chất lượng cao theo câu hỏi khách thật.
- Chuẩn hóa tác giả/reviewer, sources, claims, before/after và aftercare.
- Sửa CWV, đặc biệt hero video và JS/modal.

**Gate:** 10 URL chiến lược đạt ≥ 85 điểm; NAP nhất quán; conversion tracking hoạt động.

### Ngày 61–90 — Authority và GEO

- Xuất bản một tài sản song ngữ đáng trích dẫn, ví dụ “Checklist chăm sóc da sau biển tại Đà Nẵng”.
- Xây quan hệ với đối tác/nguồn địa phương phù hợp; không mua link rác.
- Chạy baseline 30–50 prompt VI/EN; ghi citation accuracy và lỗi entity.
- Tối ưu bài/trang dựa trên GSC, GBP, booking và câu hỏi thực tế.

**Gate:** có baseline search/local/AI; có backlog quý tiếp theo dựa trên tác động và effort.

## 25. Checklist trước khi xuất bản một URL

- [ ] Intent, audience, primary keyword và conversion action rõ.
- [ ] Không trùng/cạnh tranh với URL hiện có.
- [ ] URL, title, H1, description và breadcrumb đúng.
- [ ] Direct answer chính xác; có điều kiện/giới hạn.
- [ ] Nội dung có giá trị thật và claim đã fact-check.
- [ ] Giá, thời lượng, quy trình, aftercare khớp vận hành.
- [ ] Tác giả/reviewer/date/source đúng khi cần.
- [ ] Ảnh có quyền sử dụng, alt/caption; before/after có consent.
- [ ] Internal links vào/ra dùng anchor mô tả.
- [ ] Canonical, robots, status, sitemap và `hreflang` đúng.
- [ ] Schema valid và khớp HTML.
- [ ] Mobile, keyboard, form, CTA và CWV đạt.
- [ ] Tracking hoạt động và không làm lộ PII.
- [ ] Kiểm tra HTML live sau deploy, không chỉ preview local.

## 26. Gate phát hành

| Gate | Điều kiện pass |
|---|---|
| G1 — Access | Bot nhận 200; không chặn CSS/JS/nội dung; không CAPTCHA bắt buộc |
| G2 — Index | Canonical, robots, sitemap, status và hreflang đúng |
| G3 — Content | Intent rõ; direct answer; unique value; claim có bằng chứng |
| G4 — Local/Entity | NAP, business, dịch vụ và social nhất quán |
| G5 — Trust | Không claim tuyệt đối/review giả; có contact/policy/reviewer phù hợp |
| G6 — UX | Mobile, form, CTA, accessibility và CWV không regress nghiêm trọng |
| G7 — Schema | JSON-LD hợp lệ, đúng thực thể và khớp nội dung |
| G8 — Measurement | GSC/Bing/analytics/conversion hoạt động |

Không phát hành nếu bất kỳ P0 nào fail. Ngoại lệ phải có owner, deadline và đánh giá rủi ro bằng văn bản.

## 27. Mẫu audit backlog

| ID | URL/template | Tiêu chí | P | Điểm 0–2 | Bằng chứng | Owner | Deadline | Trạng thái |
|---|---|---|---:|---:|---|---|---|---|
| 1 | Trang chủ | Domain metadata/canonical | P0 | 0 | OG đang trỏ Vercel |  |  | Open |
| 2 | `/robots.txt` | Trả 200, policy đúng | P0 | 0 | Live 404 ngày 17/08/2026 |  |  | Open |
| 3 | `/sitemap.xml` | Sitemap sạch | P0 | 0 | Live 404 ngày 17/08/2026 |  |  | Open |
| 4 | Dịch vụ | URL HTML riêng | P0 | 0 | Hiện dùng section/modal |  |  | Open |
| 5 | Toàn site | NAP/entity | P0 | 0 | Chưa thấy trong HTML công khai |  |  | Open |
| 6 | VI/EN | URL + hreflang | P0 | 0 | Hiện đổi client state |  |  | Open |

---

# PHẦN VIII — NGUỒN CHÍNH VÀ QUY TẮC CẬP NHẬT

## 28. Nguồn chính thức

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google — AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google crawlers](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers)
- [Google Business Profile guidelines](https://support.google.com/business/answer/3038177)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [IndexNow](https://www.indexnow.org/)
- [OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic web crawlers](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Schema.org](https://schema.org/)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [RFC 9309 — Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309)

## 29. Những điều không phải “công thức lên top”

- Không có độ dài bài, mật độ từ khóa, số FAQ hay số heading cố định bảo đảm xếp hạng.
- Schema giúp máy hiểu và đủ điều kiện, không bảo đảm rich result hay citation.
- `llms.txt` không phải tiêu chuẩn xếp hạng phổ quát.
- Cho phép training crawler không đồng nghĩa được ưu tiên trong kết quả search.
- Nội dung AI không tự động xấu; nội dung thiếu kiểm chứng, sao chép hoặc sản xuất hàng loạt để thao túng mới là rủi ro.
- Backlink nhiều không bù được thực thể mơ hồ, NAP sai, claim sai hoặc trải nghiệm kém.
- Một ảnh chụp câu trả lời AI không phải dữ liệu xu hướng; phải benchmark lặp lại.

## 30. Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|---|---|---|
| 1.0 | 17/08/2026 | Tùy biến cho hatobeauty.com; audit live; map 5 cụm từ khóa VI/EN; thêm kiến trúc URL, Local SEO, claim policy, schema, tracking và roadmap 90 ngày |

---

**Chủ sở hữu tài liệu:** ____________________  
**Người duyệt chuyên môn:** ____________________  
**Ngày review tiếp theo:** ____________________  
**NAP đã xác nhận:** Có / Chưa  
**GSC/Bing đã xác minh:** Có / Chưa
