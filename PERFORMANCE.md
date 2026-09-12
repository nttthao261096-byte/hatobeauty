# Hiệu suất Hato Beauty

## Phục vụ ảnh

- Giữ ảnh gốc trong public/images và public/brand.
- Chạy pnpm run images:optimize sau khi thêm hoặc thay ảnh. Hai lệnh build cũng tự chạy bước này.
- Commit app/image-manifest.json cùng public/media. Tên ảnh chứa fingerprint nội dung và cấu hình nén; không ghi đè file đã xuất bằng nội dung khác.
- Dùng app/OptimizedImage.tsx cho ảnh nội dung. Khai báo sizes theo kích thước hiển thị; dùng priority và fetchPriority="high" chỉ cho ảnh LCP.
- Ảnh đầu trang có AVIF và WebP dự phòng. Các ảnh còn lại có nhiều kích thước WebP. Ảnh ngoài danh sách tiếp tục qua next/image.
- /media dùng Cache-Control: public, max-age=31536000, immutable trên Next.js và Sites.

## Video và font

- Trang chủ hiển thị ảnh poster ngay từ HTML. Video chỉ được gắn sau tương tác, chỉ giải mã một cảnh, tạm dừng khi ngoài màn hình hoặc khi tab ẩn.
- Người bật giảm chuyển động hoặc tiết kiệm dữ liệu có thể chủ động dùng nút Phát video.
- Slider đánh giá chỉ chạy khi ở trong vùng nhìn.
- Font được Next.js tự lưu trên cùng origin, dùng display: swap và không preload toàn bộ trọng lượng cạnh tranh với ảnh LCP.
- Tailwind chỉ quét thư mục app để tránh sinh CSS từ bản build, báo cáo và thư mục xuất bản.

## Kiểm chứng

- Production Vercel: pnpm run build:vercel.
- Tương thích Workers và hồi quy: pnpm test.
- Lint: pnpm run lint.
- Đo Lighthouse riêng di động và desktop trên bản production; không dùng server development để so sánh.
- Kiểm tra không có request MP4 trước tương tác, ảnh poster chỉ tải một định dạng/kích thước, menu và hộp thoại hoạt động, không tràn ngang ở 390px.
- Báo cáo đo trong phiên tối ưu nằm ở outputs/cwv-*.json. Đây là số đo phòng thử nghiệm, không phải INP hay dữ liệu CrUX của người dùng thực tế.

## Mục tiêu thực tế

LCP <= 2.5 giây, INP <= 200 ms và CLS <= 0.1 ở phân vị 75. PageSpeed chưa có dữ liệu thực tế thì không thể kết luận đã vượt qua Core Web Vitals chỉ từ điểm Lighthouse. TBT là chỉ số phòng thử nghiệm, không thay thế INP. Đối chiếu Search Console/CrUX khi có đủ dữ liệu trong cửa sổ 28 ngày.

Nguồn: https://web.dev/articles/vitals và https://developers.google.com/speed/docs/insights/v5/about
