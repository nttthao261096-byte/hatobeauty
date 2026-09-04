# Bài viết AI cho Hato Beauty

Vào https://hatobeauty.com/admin → Bài viết → Thêm mới. Nhập chủ đề, trụ cột dịch vụ, độ dài và từ khóa tùy chọn. Có thể thêm thông tin thực tế, trích đoạn và URL nguồn tham khảo. Nhấn **Sinh bài bằng AI**, kiểm tra hai ngôn ngữ rồi lưu nháp. Bật **Hiển thị bài viết** sau khi duyệt.

## Kết nối 9router

Các biến chỉ nằm ở máy chủ; không dùng tiền tố NEXT_PUBLIC và không đưa khóa vào Git:

- ARTICLE_AI_BASE_URL: http://localhost:20128/v1 khi chạy trên máy có 9router; Vercel cần URL HTTPS truy cập được từ máy chủ.
- ARTICLE_AI_API_KEY: khóa 9router của bạn.
- ARTICLE_AI_MODEL: ag/gemini-3.7-flash-medium.

Địa chỉ localhost trên Vercel trỏ về máy chủ Vercel, không trỏ về máy Windows của bạn. Cần một endpoint 9router được bảo vệ bằng khóa và có HTTPS (ví dụ máy chủ riêng hoặc tunnel được cấu hình đúng). Chỉ mở API cần dùng; không công khai trang quản trị 9router. Nếu chạy trên máy cá nhân, máy và 9router phải luôn bật; URL tunnel tạm thời có thể thay đổi.

Cấu hình ba biến trên Vercel ở môi trường Production và triển khai lại sau khi có endpoint phù hợp. Dùng .env.local (đã được Git bỏ qua) cho phát triển. Supabase cần SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY và SUPABASE_SECRET_KEY như phần quản trị hiện có.

## Nội dung và xuất bản

AI điền tiêu đề, slug, mô tả, nội dung Việt–Anh. Máy chủ tính thời gian đọc, số hiển thị, thứ tự, chọn ảnh theo dịch vụ và mặc định để bản nháp. Slug được kiểm tra với các bài hiện có và các hướng dẫn cố định; cơ sở dữ liệu tiếp tục bảo vệ tính duy nhất khi lưu.

Nội dung dùng Markdown cơ bản: đoạn văn, ##/### đề mục, danh sách, **in đậm**, liên kết. Không chạy HTML do AI trả về. Bản đã đăng có trang công khai Việt–Anh, canonical, hreflang, Open Graph, Twitter Card, BlogPosting và được thêm vào danh sách kiến thức/sitemap. Bài nháp hoặc bị ẩn không xuất hiện ở những nơi này. Không cần thay đổi cơ sở dữ liệu.

Bản nháp ưu tiên câu trả lời trực tiếp, đề mục rõ ràng, câu hỏi thường gặp, liên kết nội bộ và thông tin dịch vụ thực tế. Ảnh lấy từ thư viện Hato hiện có; cần kiểm tra mức độ phù hợp. AI không tự tra cứu web hay xác minh nguồn; người biên tập chịu trách nhiệm kiểm chứng nội dung chuyên môn, thông tin mới và nguồn dẫn. Thông báo độ dài thực tế giúp phát hiện bản dịch quá ngắn/dài.

Theo [Google Search Central về AI features](https://developers.google.com/search/docs/appearance/ai-features), các nguyên tắc SEO nền tảng vẫn áp dụng, không có schema đặc biệt bảo đảm xuất hiện trong AI Overviews/AI Mode. [Hướng dẫn nội dung AI](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) nhấn mạnh giá trị, độ chính xác và chất lượng. Không hứa thứ hạng, trích dẫn AI hoặc tự gắn người kiểm duyệt y khoa.

## Kiểm tra

Chạy npm run test:articles để dựng Next production và kiểm tra bộ phân tích, lỗi nhà cung cấp, xác thực, chống yêu cầu khác nguồn, lưu nháp, xuất bản, metadata, sitemap và ẩn bài. Bộ kiểm thử dùng dịch vụ giả độc lập trên loopback; không tạo bài trong cơ sở dữ liệu thật.

Thử 9router thực tế ngày 04/09/2026: endpoint cổng 20128 nhận khóa và có đúng mô hình; yêu cầu sinh bản Việt–Anh trả về đủ trường trong khoảng 24 giây. Đây là kiểm tra nhà cung cấp cục bộ, chưa chứng minh kết nối từ Vercel.
