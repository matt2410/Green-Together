# GreenTogether (React + Vite + Tailwind)

GreenTogether là một nền tảng tuyên truyền, giáo dục và kết nối cộng đồng cùng hành động vì môi trường, với trọng tâm là các địa điểm cần bảo vệ hoặc đang diễn ra các chiến dịch môi trường trên toàn Việt Nam.

## Mô tả ngắn
Nền tảng hướng đến xây dựng một cộng đồng số thúc đẩy hành động thiết thực: tăng nhận thức, kết nối người dân và tổ chức, cung cấp thông tin trực quan về điểm nóng môi trường, và khuyến khích tham gia các chiến dịch vệ sinh, trồng cây, giáo dục.

## Các chức năng chính (có trong roadmap)
- Bản đồ hành động môi trường (hiển thị điểm ô nhiễm, các hoạt động, bộ lọc).
- Đăng ký tham gia hoạt động và theo dõi hành trình cá nhân.
- Kho nội dung truyền thông: bài viết, infographic, video, câu chuyện truyền cảm hứng.
- Góp ý và đóng góp từ cộng đồng (gửi địa điểm, bình luận, đánh giá).
- Hệ thống chứng nhận: huy hiệu, bảng xếp hạng, chứng chỉ điện tử.

## Quick start
```bash
npm install
npm run dev
```

## Hướng dẫn mở rộng
- Thêm map: cài `react-leaflet` hoặc `mapbox-gl` và tạo trang Map/Projects hiển thị điểm nóng lấy dữ liệu từ API.
- Sự kiện & đăng ký: tạo backend đơn giản (Express/Fastify/Nest) để lưu sự kiện và đăng ký người tham gia.
- Auth: tích hợp OAuth (Google/Facebook) hoặc email/password để quản lý người dùng và huy hiệu.
- Nội dung từ Notion: export Markdown từ Notion và paste vào `src/routes/*` hoặc tạo script import tự động.