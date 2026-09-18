# Hato Beauty — bàn giao bản sửa ngày 18/09/2026

**Trạng thái:** đã sửa code, kiểm thử bản production chạy local, push GitHub và đã có Vercel preview READY từ đúng commit. **Chưa chạy migration trên Supabase, chưa promote production và chưa thay DNS.** Không coi preview là xác nhận backend production đã nghiệm thu.

Repository: `C:/Users/LEGION/Desktop/hatobeauty/.corrected-source`.

Source of truth: yêu cầu triển khai trong `pasted-text.txt` và `AUDIT-HATO-BEAUTY-2026-09-14 (3).html`. Bản audit workspace có cùng SHA-256 với bản người dùng cung cấp. Giữ logo, font, beige–nâu, video gốc, VI/EN, năm nhóm dịch vụ, bốn nhãn carousel đã duyệt, social dưới logo và newsletter footer. Không đưa before/after trở lại homepage.

Preview local trên máy này: http://127.0.0.1:3040/ — chỉ tồn tại khi tiến trình local còn chạy và không có credentials backend thật. Vercel preview từ commit `07e778392fcf45f9b28c71ad2f0bc2cc5055cffe`: https://hatobeauty-62vo3futw-thao-vtca.vercel.app/ — dùng để kiểm tra giao diện, không dùng để nhận khách cho tới khi staging/backend được nghiệm thu. Hai URL bài CMS đã được QA bằng snapshot nội dung công khai trong môi trường kiểm thử riêng, không phải bằng cách sửa CMS production.

## 1. Completed

“Fixed” dưới đây chỉ xác nhận code và kiểm thử đã nêu, không đồng nghĩa đã triển khai production.

| Issue | Trạng thái và thay đổi |
|---|---|
| H01 | Safeguarded / business blocked. Không công khai option/claim y khoa và công nghệ chưa được xác nhận. Không đổi tên để che kỹ thuật thực tế. URL EN chứa laser cũ có redirect tới tên trung tính; kỹ thuật thật vẫn cần chủ cơ sở xác nhận. |
| H02 | Fixed. Chặn công khai seed/demo price, số liệu và catalog chưa duyệt; không chỉ xóa chữ “mẫu” rồi giữ số. |
| H03 | Code fixed / price data blocked. Một nguồn dịch vụ–option–giá–thời lượng–booking ID; bảng giá VI/EN có cấu trúc dùng dữ liệu đã duyệt. Hiện hiển thị liên hệ xác nhận, không giá bịa. |
| H04 | Redirect code prepared / deployment pending. www→apex giữ path/query; TLS www vẫn cần xử lý ngoài repository. |
| H05 | Client/API/admin fixed. Năm kênh liên hệ có validation phù hợp, email/social không bắt nhập phone. Migration additive đã viết; database thật chưa được cập nhật. |
| H06 | Fixed. 50 lần click VI↔EN giữ đúng trang tương ứng, kể cả bài CMS; booking giữ service query. |
| H07 | Fixed core flow. CTA đặt lịch đến cùng trang request; trang dịch vụ prefill service. Chat được ghi đúng là chat, không tính là booking thành công. |
| H08 | Fixed hidden-video loading. Chỉ một MP4 đang dùng tải; pause ngoài viewport, theo visibility và reduced motion. Giữ video gốc 1280×720, không audio. Mobile LCP còn cần tối ưu, không đánh dấu toàn bộ performance đã xong. |
| H09 | Fixed. Drawer có focus trap, Escape, restore focus, background inert và tên truy cập. |
| H10 | Resolved in requested journey. Modal dịch vụ cũ không còn là điểm rẽ thứ hai; thông tin dịch vụ đi qua trang chi tiết → form chung như yêu cầu. Primitive quản lý focus dùng cho drawer còn lại. |
| H11 | Fixed detected contrast issues. Sửa màu chữ phụ/metadata trên các template; 100 lượt axe không có vi phạm tự động phát hiện. |
| H12 | Fixed. Text field mobile ≥16px; panel hero đọc được độc lập khung video; không có dock che booking/contact. |
| H13 | Safeguarded. Ẩn rating/số khách/review chưa xác minh; chưa thay bằng chứng thật vì chưa được cung cấp. |
| H14 | Safeguarded / owner input. Không công khai before/after chưa duyệt; giữ homepage không có mục này. Xác minh ảnh cơ sở/nhân sự và consent ảnh vẫn còn thiếu. |
| H15 | Fixed identified copy. Biên tập các câu VI/EN gượng trong audit; không tự thêm claim hoặc thời gian cam kết. |
| H16 | Fixed truthful behavior. Newsletter ghi rõ mở ứng dụng email; không báo subscriber đã lưu. Không thêm vendor/backend giả. |
| M01 | Fixed. Hero nêu Hato Beauty, Đà Nẵng, nhóm dịch vụ và bước tiếp theo; giữ brand line. |
| M02–M03 | Scoped improvements. Căn lại template/form, khoảng cách và tablet grid; không redesign toàn site. |
| M04 | Partial. Giá có ở CTA phụ hero và footer, liên hệ ở footer; chưa thêm cả hai mục trực tiếp vào header đã duyệt. |
| M05 | Fixed. Shared footer trên trang con; sửa thêm lỗi thực tế: #top nằm trên sticky header không cuộn về đầu. Anchor nay nằm trước header. |
| M06 | Safeguarded / catalog blocked. Sản phẩm chưa duyệt không xuất hiện như hàng thật; nút khám phá lộ trình không giả hành vi thêm vào kế hoạch. |
| M07 | Fixed. Body care có hierarchy, thông tin, FAQ và prefilled booking cùng hệ thống trang dịch vụ. |
| M08 | Business blocked. Không tự thêm brow lamination option khi chưa có xác nhận thực tế. |
| M09 | Fixed. Thông báo gửi yêu cầu, chưa xác nhận lịch; không dựng slot availability giả. |
| M10–M11 | Fixed. Sáu bài hướng dẫn song ngữ có phần hướng dẫn/câu hỏi riêng thay vì copy trang bán dịch vụ; title, reading time và FAQ dùng nguồn chung. Một số lưu ý an toàn dùng chung có chủ đích. |
| M12–M13 | Owner input. Chưa bịa đội ngũ/chứng chỉ/chính sách/SLA để lấp khoảng trống. |
| M14–M16 | Fixed locally. Canonical/hreflang/sitemap cùng format; alias permanent redirect; không dùng ngày build làm lastmod; article meta khác service meta. |
| M17 | Fixed controls/code. Video/ribbon có điều khiển và reduced motion; bản sao ribbon trang trí không tạo tab targets. Đã test ngoài viewport và reduced motion; chưa nghiệm thu chuyển tab native trên thiết bị thật. |
| M18 | Fixed detected source sizing. Sửa sizes cho ảnh dịch vụ/about; kiểm tra currentSrc, rendered/natural width và DPR3. |
| M19 | Fixed observed mobile crop/layout. Root cause là grid rule riêng dịch vụ ghi đè mobile reset, làm nội dung rộng bên trong container đã clip. Thêm reset đúng thứ tự cascade. Việc ảnh có đúng kỹ thuật/cơ sở thật vẫn cần chủ sở hữu duyệt. |
| M20 | Isolated E2E passed / production pending. Browser→API→PostgREST test double→UI đã qua; chưa chứng minh lưu lead thật và nhân viên nhận được trên production. |
| M21 | Partial. Bài CMS dùng updated_at thật cho ngày hiển thị/schema; không bịa ngày/tác giả cho hướng dẫn tĩnh. Người chịu trách nhiệm nội dung cần chủ cơ sở cung cấp. |
| L01–L03 | Fixed identified items. Microcopy/skip/404, back-to-top và aria-pressed của filter/carousel; không tuyên bố đã biên tập bản ngữ độc lập mọi câu. |

Không thêm analytics vendor: repository chưa có hạ tầng analytics phù hợp. Không gửi PII đi đo lường.

## 2. Files changed

Các đường dẫn dưới đây tương đối với repository nêu đầu báo cáo. Một phần diff TSX lớn là formatter tách những dòng JSX vốn dồn một dòng, không phải thay toàn bộ thiết kế.

| Nhóm file | Thay đổi chính |
|---|---|
| `app/business-data.ts`, `ServicePriceTable.tsx`, `care-catalog.ts` | Approval gate và nguồn giá/option chung; ngăn dữ liệu mẫu public. |
| `app/BookingForm.tsx`, `ContactForm.tsx`, `ContactChannelFields.tsx`, `contact-validation.ts`, `booking-errors.ts` | Form theo kênh, trạng thái request, chống gửi đôi trong phiên submit, validation và lỗi thật. |
| `app/api/bookings/route.ts`, `app/api/contact/route.ts`, `app/admin/admin-dashboard.tsx` | Validation server, payload mới, timeout upstream; admin đọc đúng kênh liên hệ. |
| `supabase/migrations/20260916153230_contact_channels.sql` | Cho phép phone nullable ở booking; thêm email/social/channel/option; giữ dữ liệu cũ, RLS và grants. Chưa apply. |
| `app/SiteHeader.tsx`, `SiteFooter.tsx`, `use-modal-focus.ts`, `route-paths.ts`, `not-found.tsx` | Shared shell, language context, focus, canonical builders, footer và anchor top. |
| `app/HatoHome.tsx`, `HeroMedia.tsx`, `globals.css` | Video loading, contrast, responsive, readable mobile hero, CTA, bỏ proof chưa xác nhận. |
| `app/CarePlanPage.tsx`, `ProductsPage.tsx`, `ProductCatalog.tsx`, `ProductCard.tsx` | Không hiển thị catalog/giá/số liệu chưa duyệt, copy và hành vi nút đúng thực tế. |
| `app/seo-pages.tsx`, `seo-data.ts`, `seo-faq-data.ts` | Chuẩn hóa dịch vụ, ảnh, FAQ, booking prefill, nội dung VI/EN. |
| `app/journal-copy.ts`, `journal-guidance.ts`, `PublishedJournal.tsx`, `ArticleMarkdown.tsx`, `journal-content.ts` | Nội dung hướng dẫn riêng, reading time, ngày thật, internal links và language alternate của CMS. |
| `app/seo-metadata.ts`, `sitemap.ts`, `next.config.ts` | Final canonical URLs, reciprocal alternates, redirects, sitemap/lastmod, project root. |
| `app/page.tsx`, `app/en/page.tsx`, `app/dat-lich/page.tsx`, `app/en/book/page.tsx` | Payload/meta và booking search params. |
| `app/kien-thuc/[slug]/page.tsx`, `app/en/journal/[slug]/page.tsx` | Metadata bài viết theo đúng entity. |
| `app/san-pham/page.tsx`, `app/en/care-products/page.tsx`, `app/san-pham-cham-soc/page.tsx` | Product metadata và alias redirect. |
| `tests/rendered-html.test.mjs`, `tests/lead-remediation.test.mjs`, `tests/helpers/lead-test-server.mjs` | Regression guards cập nhật theo yêu cầu mới; backend kiểm thử cô lập, không credentials production. |
| `scripts/qa-remediation.mjs`, `qa-interactions.mjs`, `qa-exact-viewports.mjs`, `qa-performance.mjs` | Crawl, axe, thao tác thật, viewport và Lighthouse lặp nhiều lần. |
| `package.json`, `.gitignore` | Script test/typecheck phù hợp Next build, bỏ generated tsbuildinfo khỏi tracking. |

Không thay các sửa đổi không liên quan ở repository cha. `.codex-release/` là dữ liệu untracked có trước, không coi là sản phẩm của đợt sửa này.

## 3. Tests performed

Thực thi trong repository `.corrected-source`:

| Command / nhóm kiểm tra | Kết quả |
|---|---|
| Prettier cho TS/TSX/MJS/JSON đã sửa | Pass. Không formatter lại toàn bộ CSS để tránh diff không cần thiết. |
| `pnpm run build:vercel` | Pass — production Next build, 60 static pages. |
| `pnpm lint` / `node node_modules/eslint/bin/eslint.js . --ignore-pattern dist --ignore-pattern .next --ignore-pattern .codex-release --ignore-pattern build` | Pass, không lỗi/cảnh báo. |
| `node node_modules/typescript/lib/tsc.js --noEmit -p tsconfig.vercel.json` | Pass. Không disable type errors. |
| `node --experimental-strip-types --test tests/*.test.mjs` | 12/12 pass. Chạy lại cuối đợt sửa. |
| `node scripts/qa-remediation.mjs` | 100 page/viewport scans, 40 width checks, 7 interaction checks pass. |
| `node scripts/qa-interactions.mjs` | 51 checks pass; 50 language clicks; 62 internal links/fragment targets hợp lệ. |
| `node scripts/qa-exact-viewports.mjs` | 120 checks pass, 0 lỗi JS. |
| `node scripts/qa-performance.mjs` | 9 lượt Lighthouse hoàn tất; báo median của 3 lượt mỗi template/device. |

Browser tools không được thêm thành dependency ứng dụng. Khi chạy lại trên máy này, đặt `PLAYWRIGHT_MODULE` tới runtime Playwright có sẵn, `AXE_PATH` theo script QA và `LIGHTHOUSE_CLI` tới CLI đã cài; có thể dùng module tương ứng trong môi trường CI khác. Lighthouse hiện tại 13.4.1. Preview production chạy cổng 3040; harness riêng dùng 3043/3044/3046, không kết nối DB live.

Tests bao gồm invalid JSON, field trống, email sai, WhatsApp thiếu country code, social URL sai protocol/domain, channel không hợp lệ, service/option chưa duyệt, ghi chú dài, ngày không hợp lệ, consent, lỗi upstream, giữ dữ liệu khi lỗi, retry và duplicate submit. Valid tests dùng địa chỉ `example.test`, được lưu trong bộ nhớ test double rồi hủy; không phát sinh lead thật.

## 4. Browser QA

- Chrome production build local; 50 canonical URLs × 2 viewport = 100 scans, gồm bài CMS song ngữ từ snapshot công khai. Audit cũ là 51 URL; alias sản phẩm đã chuyển redirect và bỏ khỏi sitemap nên còn 50, không phải bỏ sót một trang.
- Exact viewport: **360×800, 375×667, 390×844, 393×852, 430×932, 768×1024, 1024×768, 1366×768, 1440×900, 1920×1080**. Mỗi viewport kiểm tra 12 route đại diện VI/EN: home, booking, contact, services, prices, journal.
- 0 horizontal document overflow, 0 H1/CTA bị cắt theo kiểm tra geometry đã chọn, 0 runtime JS error. Các ảnh/template đại diện đã được xem screenshot trực tiếp; không chỉ dựa scrollWidth vì container clip từng che lỗi grid.
- Tương tác: menu, đổi ngôn ngữ, filter, carousel, FAQ, service→booking, form empty/invalid/error/success/retry, Enter hai lần, Tab/Shift+Tab/Escape, hover/focus/active CTA, back-to-top, pause ngoài viewport và reduced motion.
- DPR3 kiểm tra ảnh; 200% kiểm tra **reflow tương đương** 720 CSS px từ màn hình 1440, không phải xác nhận thao tác zoom native trên mọi browser.
- Chưa nghiệm thu Safari/iPhone/Android thật, bàn phím native, VoiceOver/NVDA, email client thực hoặc quyền sở hữu/khả năng nhận tin của mọi tài khoản social. External platform login/bot gating không được gọi nhầm là website đã hỏng.

Evidence ở `C:/Users/LEGION/Desktop/hatobeauty/audit-2026-09-13/implementation/`:

- `browser-after.json`, `interactions-after.json`, `exact-viewports-after.json`, `sitemap-after.xml`.
- `preview-final-mobile.png`, `final-home-375x667.png`, `final-home-768x1024.png`, `final-home-1366x768.png`, `final-home-1920x1080.png`, `final-booking-en-375x667.png`.
- `en-services-head-spa-da-nang-final-mobile.png`, `en-services-waxing-da-nang-final-mobile.png`, `footer-390.png` và các screenshot template khác.

## 5. Performance before/after

**Không phải A/B cùng môi trường:** baseline audit đo production bằng Lighthouse 13.0.3; after đo localhost production build bằng 13.4.1, simulated throttling. After là median 3 lượt; baseline là lượt có sẵn trong audit, không được gọi là median. Không suy ra tốc độ thực của mọi khách từ bảng này.

| Metric | Home mobile trước → sau | Home desktop trước → sau | Facial mobile trước → sau |
|---|---:|---:|---:|
| Performance score | 91 → 90 | 100 → 100 | 89 → 97 |
| LCP | 3,073 → 3,682 ms | 614 → 707 ms | 3,073 → 2,631 ms |
| CLS | 0 → 0 | 0 → 0 | 0 → 0 |
| TBT | 18 → 23 ms | 0 → 0 ms | 130 → 9.5 ms |
| Transferred bytes | 12,978,327 → 1,478,976 | 12,976,484 → 1,497,445 | 422,467 → 372,975 |
| Requests | 46 → 37 | 61 → 51 | 31 → 30 |

Homepage giảm khoảng **88,6% transferred bytes** trong các lần đo này. Network after chỉ có `/video/hero-head-spa.mp4` (~960 KB), không tải 3 MP4 ẩn. Asset gốc 1280×720, MP4 moov ở đầu file (fast-start), không có audio track (`vide` handler, Chrome audio decoded bytes = 0). Không thay video bằng ảnh để lấy điểm.

**Chưa đạt mục tiêu LCP mobile ≤2,5 giây trong lab**: homepage 3,68 giây, facial 2,63 giây. Poster/video rendering và CSS/JS critical path là hướng tối ưu tiếp; không trì hoãn nội dung chỉ để làm đẹp Lighthouse. Cần đo lại cùng phiên bản Lighthouse trên deployment sau khi triển khai, thử mobile encode nhẹ hơn từ cùng nguồn nếu chất lượng chấp nhận được. Không có dữ liệu field CrUX/INP đủ để kết luận Core Web Vitals pass.

## 6. SEO verification

- Canonical không trailing slash ngoài root; hreflang VI/EN reciprocal và cùng entity; OG đồng nhất. Các đường dẫn canonical được kiểm tra trên bản local tương ứng trả 200, không tuyên bố các URL mới đã chạy trên production.
- Sitemap 50 URLs với CMS snapshot, không chứa alias sản phẩm và redirect laser cũ. `lastmod` chỉ dùng thời điểm cập nhật thật khi có, không ngày build hàng loạt.
- `/san-pham-cham-soc` → `/san-pham`, laser EN slug cũ → hair-removal mới: 308, giữ query. Trailing slash redirect giữ query. URL không tồn tại trả 404 thật.
- Service và guide không dùng chung meta description; bài hướng dẫn có nội dung khác mục đích bán dịch vụ. Structured breadcrumbs và CMS updated_at đã kiểm tra; chưa bịa author/chứng chỉ.
- Chứng chỉ www production vẫn lỗi `ERR_TLS_CERT_ALTNAME_INVALID`; cần bước mục 9. HTTPS apex hoạt động; HTTP www hiện về HTTPS www nên vẫn gặp lỗi chứng chỉ trước khi redirect app có thể chạy.
- Không có Search Console/field indexing evidence; không tuyên bố Google đã index lại hoặc tăng thứ hạng.

## 7. Accessibility verification

- 0 axe violations trên 100 scans; Lighthouse after accessibility 100 trong các mẫu đo. Đây **không phải chứng nhận WCAG compliant**.
- Drawer: test 70 lần Tab/Shift+Tab, Escape và focus trở lại trigger; background inert; không lọt focus ra nội dung phía sau.
- Keyboard filter/carousel/FAQ hoạt động, aria-pressed phản ánh state; CTA không mất nhãn ở hover/focus/active.
- Text-entry fields mobile ≥16px; label/contrast rõ hơn; dock không che trang form; status/error có semantics thông báo.
- Hero copy nằm trên panel beige ổn định ở mobile. Reduced motion không gắn video src; video dừng khi ngoài viewport. Decorative ribbon copies bị loại khỏi tab order.
- Skip link, 404, back-to-top hiện tại giữ đúng trang. Kiểm tra reflow tương đương 200%; screen reader và zoom native là kiểm tra bổ sung trước release, không giả là đã thực hiện.

## 8. BLOCKED — OWNER INPUT REQUIRED

1. **Danh mục/phạm vi kỹ thuật thật**: Mesotherapy, melasma/acne/back-acne, loại máy/phương pháp hair removal, brow lamination có cung cấp không. Cần nguồn xác nhận, không chỉ tên marketing.
2. **Bảng giá/option/thời lượng thật** bằng VI/EN, booking service ID tương ứng, ngày duyệt và nguồn duyệt. Nhập vào nguồn chung thay vì hardcode lại ở card/FAQ.
3. **Catalog sản phẩm thật**: tên, SKU, giá, tình trạng cung cấp và nội dung được duyệt. Hiện chưa công khai dữ liệu seed như hàng thật.
4. **Bằng chứng thương hiệu**: review/rating/count có nguồn, ảnh thật nhân viên/cơ sở/khách, consent sử dụng ảnh, chuyên môn/chứng chỉ được phép công bố.
5. **Chính sách vận hành**: hủy/đổi/đặt cọc, thanh toán, giữ dữ liệu, newsletter/unsubscribe và SLA phản hồi thực tế. Không tự điền cam kết.
6. **Người phụ trách nghiệm thu lead và nội dung**: xác nhận kênh nhân viên thực sự sử dụng, quyền truy cập admin, người duyệt thông tin chuyên môn. Chưa coi chat link là bằng chứng tin nhắn đến nhân viên.

## 9. MANUAL DEPLOYMENT ACTION REQUIRED

Thứ tự an toàn; chưa thực hiện những bước mutate dưới đây:

1. Đã review diff trong **đúng nested repository `.corrected-source`**, không gom các sửa đổi không liên quan từ thư mục cha. Đã push branch GitHub `codex/hato-latest` với commit `07e778392fcf45f9b28c71ad2f0bc2cc5055cffe`; không tạo PR. Các URL/slug hiện hữu được giữ nguyên, không thêm redirect/canonical đổi URL trong đợt này.
2. Sao lưu và thử migration `20260916153230_contact_channels.sql` trên staging phù hợp trước. Kiểm tra tên constraint theo schema thật, không chạy lặp migration thủ công nếu đã apply. Migration phải chạy **trước** phiên bản app mới vì DB hiện chưa có các cột channel/email/social/option và phone booking còn NOT NULL. Không xóa dữ liệu cũ; kiểm tra RLS/grants vẫn giữ nguyên.
3. Trên đúng Vercel project, xác minh `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` thuộc đúng môi trường. Secret chỉ ở server; không dùng prefix public. Không đưa credential test double lên Vercel. Giữ cấu hình admin hiện có.
4. Đã chạy `pnpm run build:vercel` trong repository ứng dụng đúng và Vercel đã tạo preview READY từ branch `codex/hato-latest`. Chưa promote production khi migration và E2E backend thật chưa qua.
5. Trên staging thật, gửi một lead có kiểm soát cho mỗi kênh được hỗ trợ: kiểm tra row DB, selected channel, dữ liệu admin, trạng thái request và nhân viên đọc được. Xác minh không có false-success khi lỗi DB. Không gửi dữ liệu khách thật trong test. Chưa có bằng chứng hệ thống tự gửi thông báo nhân viên, nên không hứa tính năng đó.
6. **www TLS:** thêm/kiểm tra `www.hatobeauty.com` trên cùng Vercel project, dùng chính DNS record Vercel yêu cầu tại thời điểm cấu hình, chờ certificate bao phủ hostname www. Không dùng IP/CNAME phỏng đoán, không tắt xác minh TLS. Sau đó kiểm tra cả HTTP/HTTPS, apex/www cùng `/en/book?service=skin` để xác nhận canonical và giữ query.
7. Sau khi staging/owner approval qua, mới release; kiểm tra lại live form, sitemap/robots, canonical/hreflang, redirects, mobile và performance bằng cùng phiên bản công cụ. Handoff cho nhân viên xác nhận lead nhận được. Khi rollback ứng dụng, không drop các cột mới hay xóa dữ liệu lead đã ghi.

## 10. Remaining issues

- Mobile LCP chưa đạt mục tiêu; không có field INP/CrUX pass evidence.
- Migration chưa chạy trong Postgres thật; E2E production/admin receipt chưa nghiệm thu. Mock PostgREST không chứng minh constraints, RLS hoặc delivery production.
- Chứng chỉ www chưa sửa trên hạ tầng; redirect code một mình không khắc phục TLS.
- Các dữ liệu kinh doanh/chứng cứ/chính sách ở mục 8 còn thiếu; phần tương ứng được giữ an toàn, không bịa để đánh dấu hoàn tất.
- Native Safari/iOS/Android, screen reader, bàn phím/zoom thực, khả năng nhận tin social và email client còn cần nghiệm thu. Không khẳng định đã click và xác minh quyền sở hữu tất cả nền tảng ngoài.
- Newsletter vẫn là yêu cầu qua email, không phải subscription backend tự lưu. Header chưa thêm menu giá/liên hệ riêng; đường truy cập hiện có ở hero/footer.
- Một vài thông báo lỗi generic vẫn có thể trau chuốt thêm cho từng ngữ cảnh; không ảnh hưởng validation hay tính trung thực của kết quả gửi.

**Kết luận:** phần code độc lập và regression QA đã được thực hiện; bản sửa chưa sẵn sàng được gọi là “production hoàn tất” cho đến khi migration, domain, dữ liệu được duyệt và nghiệm thu lead thật được xử lý. Các skill verification/React/Next/Supabase đã dẫn đến kiểm tra theo từng lớp, giữ validation nhất quán và tách rõ bằng chứng local với production, thay vì chỉ dựa build thành công.
