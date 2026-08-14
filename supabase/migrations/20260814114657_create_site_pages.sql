create table public.services (
  slug text primary key,
  category text not null check (category in ('care', 'relax', 'shape', 'smooth', 'body')),
  display_number varchar(2) not null unique,
  image_path text not null,
  title_vi text not null,
  title_en text not null,
  summary_vi text not null,
  summary_en text not null,
  description_vi text not null,
  description_en text not null,
  suitable_vi text not null,
  suitable_en text not null,
  price_label text not null,
  duration_label text not null,
  plan_label text not null,
  steps_vi text[] not null,
  steps_en text[] not null,
  sort_order integer not null unique check (sort_order > 0),
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.highlights (
  id bigint generated always as identity primary key,
  display_number varchar(2) not null unique,
  image_path text not null,
  title_vi text not null,
  title_en text not null,
  description_vi text not null,
  description_en text not null,
  sort_order integer not null unique check (sort_order > 0),
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.results (
  id bigint generated always as identity primary key,
  image_path text not null,
  title_vi text not null,
  title_en text not null,
  description_vi text not null,
  description_en text not null,
  category_label_vi text not null,
  category_label_en text not null,
  sort_order integer not null unique check (sort_order > 0),
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id bigint generated always as identity primary key,
  initials varchar(4) not null,
  name_vi text not null,
  name_en text not null,
  quote_vi text not null,
  quote_en text not null,
  sort_order integer not null unique check (sort_order > 0),
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.journal_articles (
  id bigint generated always as identity primary key,
  display_number varchar(2) not null unique,
  image_path text not null,
  title_vi text not null,
  title_en text not null,
  reading_time_vi text not null,
  reading_time_en text not null,
  sort_order integer not null unique check (sort_order > 0),
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.booking_requests
  add constraint booking_requests_service_slug_fkey
  foreign key (service_slug) references public.services (slug);

alter table public.services enable row level security;
alter table public.highlights enable row level security;
alter table public.results enable row level security;
alter table public.testimonials enable row level security;
alter table public.journal_articles enable row level security;

revoke all on table public.services, public.highlights, public.results, public.testimonials, public.journal_articles
  from anon, authenticated;
grant select on table public.services, public.highlights, public.results, public.testimonials, public.journal_articles
  to anon, authenticated;
grant select, insert, update, delete on table public.services, public.highlights, public.results, public.testimonials, public.journal_articles
  to service_role;
grant usage, select on all sequences in schema public to service_role;

create policy "Published services are publicly readable"
  on public.services for select to anon, authenticated
  using (is_published);
create policy "Published highlights are publicly readable"
  on public.highlights for select to anon, authenticated
  using (is_published);
create policy "Published results are publicly readable"
  on public.results for select to anon, authenticated
  using (is_published);
create policy "Published testimonials are publicly readable"
  on public.testimonials for select to anon, authenticated
  using (is_published);
create policy "Published journal articles are publicly readable"
  on public.journal_articles for select to anon, authenticated
  using (is_published);

insert into public.services (
  slug, category, display_number, image_path,
  title_vi, title_en, summary_vi, summary_en,
  description_vi, description_en, suitable_vi, suitable_en,
  price_label, duration_label, plan_label, steps_vi, steps_en, sort_order
) values
(
  'skin', 'care', '01', '/images/service-skin-v2.webp',
  'Chăm sóc da chuyên sâu', 'Personalized facial care',
  'Làm sạch · Phục hồi · Nuôi dưỡng', 'Cleanse · Restore · Nourish',
  'Liệu trình được thiết kế sau bước soi và lắng nghe làn da, tập trung vào nhu cầu thực tế thay vì áp dụng một công thức chung.',
  'A thoughtful facial designed after listening to your skin, focused on what it genuinely needs rather than a one-size-fits-all routine.',
  'Da thiếu ẩm, xỉn màu, cần làm sạch và phục hồi nhịp chăm sóc.',
  'For dehydrated, tired-looking skin in need of cleansing and restoration.',
  '450.000 – 1.200.000đ', '60 – 90 phút', '1 – 4 buổi, tùy tình trạng',
  array['Soi da và trao đổi nhu cầu', 'Làm sạch – tẩy da chết phù hợp', 'Chăm sóc chuyên sâu và phục hồi', 'Hướng dẫn duy trì tại nhà'],
  array['Skin consultation', 'Suitable cleanse and exfoliation', 'Targeted care and recovery', 'Simple home-care guidance'], 1
),
(
  'scalp', 'relax', '02', '/images/service-hair-v2.webp',
  'Gội đầu dưỡng sinh', 'Herbal scalp therapy',
  'Thảo mộc · Massage · Thư giãn', 'Herbs · Massage · Relaxation',
  'Nghi thức chăm sóc da đầu kết hợp làm sạch, massage vùng đầu–vai–gáy và nhịp chạm thư thái để cơ thể được nghỉ ngơi trọn vẹn.',
  'A restorative scalp ritual combining cleansing, head–shoulder massage and an unhurried rhythm for complete relaxation.',
  'Người thường xuyên căng thẳng, mỏi vai gáy hoặc cần một khoảng nghỉ sâu.',
  'For anyone feeling stressed, tense through the shoulders or simply in need of a deep pause.',
  '180.000 – 450.000đ', '45 – 75 phút', 'Theo nhu cầu thư giãn',
  array['Kiểm tra da đầu và lựa chọn thảo mộc', 'Làm sạch da đầu nhẹ nhàng', 'Massage đầu – vai – gáy', 'Sấy và hoàn thiện thư giãn'],
  array['Scalp check and herb selection', 'Gentle scalp cleansing', 'Head, neck and shoulder massage', 'Drying and finishing ritual'], 2
),
(
  'brow-lash', 'shape', '03', '/images/service-brow-v2.webp',
  'Định hình chân mày & Uốn mi', 'Brow shaping & Lash lift',
  'Cân đối · Tự nhiên · Tinh tế', 'Balanced · Natural · Refined',
  'Chân mày được định hình theo tỷ lệ gương mặt; hàng mi được uốn cong mềm mại để làm rõ đường nét tự nhiên mà không tạo cảm giác nặng nề.',
  'Brows are shaped to your facial proportions while lashes are softly lifted to enhance your natural features without heaviness.',
  'Khách hàng muốn gương mặt sáng, đường nét hài hòa và dễ chăm sóc mỗi ngày.',
  'For a brighter, balanced look that stays effortless day to day.',
  '250.000 – 750.000đ', '45 – 90 phút', 'Duy trì sau 4 – 8 tuần',
  array['Phân tích tỷ lệ gương mặt', 'Thống nhất dáng mày và độ cong', 'Tạo dáng hoặc uốn mi cẩn trọng', 'Hướng dẫn chăm sóc sau dịch vụ'],
  array['Facial proportion consultation', 'Agree on shape and lift', 'Careful shaping or lash lift', 'Aftercare guidance'], 3
),
(
  'hair-removal', 'smooth', '04', '/images/service-hair-removal-v2.webp',
  'Triệt lông công nghệ cao', 'Advanced hair removal',
  'Êm dịu · Chính xác · Riêng tư', 'Gentle · Precise · Private',
  'Ứng dụng thiết bị hiện đại với thông số được điều chỉnh theo vùng da, thực hiện trong không gian riêng tư và quy trình vệ sinh rõ ràng.',
  'Modern technology with settings tailored to each treatment area, delivered in a private space with a clear hygiene protocol.',
  'Các vùng tay, chân, nách hoặc vùng cần chăm sóc theo tư vấn cá nhân.',
  'For arms, legs, underarms or other areas following a personal consultation.',
  '250.000 – 1.500.000đ / vùng', '20 – 60 phút', 'Thường 6 – 10 buổi',
  array['Đánh giá vùng da và sợi lông', 'Làm sạch và bảo vệ vùng da', 'Điều chỉnh thiết bị theo vùng', 'Làm dịu và dặn dò sau buổi'],
  array['Assess skin and hair', 'Cleanse and protect the area', 'Tailor device settings', 'Soothe and explain aftercare'], 4
),
(
  'waxing', 'smooth', '05', '/images/service-waxing-v2.webp',
  'Waxing dịu nhẹ', 'Gentle waxing',
  'Gọn gàng · Nhanh chóng · Chăm da', 'Smooth · Efficient · Skin-aware',
  'Kỹ thuật waxing cẩn trọng, lựa chọn sản phẩm phù hợp và chăm sóc da trước–sau dịch vụ để hạn chế cảm giác khó chịu.',
  'Careful waxing techniques, considered product selection and before–after skin care for a more comfortable experience.',
  'Khách hàng cần hiệu quả gọn gàng ngay và một quy trình chăm sóc kín đáo.',
  'For an immediate smooth result delivered with discretion and care.',
  '120.000 – 650.000đ / vùng', '20 – 50 phút', 'Lặp lại sau 3 – 6 tuần',
  array['Kiểm tra tình trạng da', 'Làm sạch và chuẩn bị vùng wax', 'Wax theo hướng phù hợp', 'Làm dịu và dưỡng ẩm'],
  array['Check skin condition', 'Cleanse and prepare', 'Wax with suitable technique', 'Soothe and moisturize'], 5
),
(
  'body', 'body', '06', '/images/service-body-scrub-v2.webp',
  'Chăm sóc body', 'Body care ritual',
  'Tẩy tế bào chết · Dưỡng ẩm · Thư giãn', 'Exfoliate · Hydrate · Unwind',
  'Nghi thức tẩy tế bào chết body kết hợp thao tác nhẹ nhàng và dưỡng ẩm, giúp bề mặt da sạch thoáng, mềm mại và được chăm sóc trọn vẹn hơn.',
  'A gentle body exfoliation ritual followed by thoughtful hydration, leaving skin feeling refreshed, smoother and cared for.',
  'Làn da body khô ráp, thiếu mềm mại hoặc cần một khoảng chăm sóc thư giãn định kỳ.',
  'For dry or rough body skin, or anyone seeking a regular restorative ritual.',
  '350.000 – 850.000đ', '60 – 90 phút', '2 – 4 tuần / lần',
  array['Trao đổi nhu cầu và vùng ưu tiên', 'Làm sạch và tẩy tế bào chết', 'Thao tác thư giãn nhẹ nhàng', 'Dưỡng ẩm và hoàn thiện'],
  array['Discuss priorities', 'Cleanse and exfoliate', 'Gentle relaxing technique', 'Hydrate and finish'], 6
);

insert into public.highlights (
  display_number, image_path, title_vi, title_en, description_vi, description_en, sort_order
) values
('01', '/images/feature-equipment-v2.webp', 'Thiết bị hiện đại', 'Modern technology', 'Công nghệ được lựa chọn có mục đích và điều chỉnh theo từng vùng da, luôn đi cùng bước đánh giá và tư vấn rõ ràng.', 'Purposefully selected technology, adjusted to each treatment area and guided by a clear consultation.', 1),
('02', '/images/feature-team-v2.webp', 'Đội ngũ chuyên nghiệp', 'Professional team', 'Đội ngũ của chúng tôi thao tác cẩn trọng, giao tiếp chân thành và luôn tôn trọng cảm nhận riêng của mỗi khách hàng.', 'Our team combines careful technique, honest communication and respect for every guest''s comfort.', 2),
('03', '/images/feature-personalized-v2.webp', 'Dịch vụ cá nhân hóa', 'Personalized services', 'Mỗi liệu trình bắt đầu bằng việc lắng nghe, phân tích nhu cầu và giải thích rõ mục tiêu trước khi thực hiện.', 'Every ritual begins by listening, understanding your needs and clarifying the goal before treatment.', 3),
('04', '/images/feature-space-v2.webp', 'Không gian thư giãn', 'A calming space', 'Màu sắc ấm, chất liệu tự nhiên và nhịp phục vụ không vội tạo nên một khoảng riêng đủ dịu để bạn thả lỏng.', 'Warm tones, natural textures and an unhurried rhythm create a private pause where you can unwind.', 4);

insert into public.results (
  image_path, title_vi, title_en, description_vi, description_en, category_label_vi, category_label_en, sort_order
) values
('/images/result-skin-v2.webp', 'Da sáng khỏe, ẩm mượt tự nhiên', 'Naturally brighter, replenished skin', 'Sau trải nghiệm chăm sóc da chuyên sâu', 'After a personalized facial ritual', 'Chăm sóc da', 'Facial care', 1),
('/images/result-brow-lash-v2.webp', 'Chân mày thanh thoát, hàng mi cong nhẹ', 'Refined brows, softly lifted lashes', 'Sau định hình chân mày và uốn mi', 'After brow shaping and a lash lift', 'Chân mày & Mi', 'Brow & Lash', 2),
('/images/result-body-v2.webp', 'Da body mịn màng, rạng rỡ hơn', 'Smoother, more radiant body skin', 'Sau nghi thức tẩy tế bào chết body', 'After a body exfoliation ritual', 'Chăm sóc body', 'Body care', 3);

insert into public.testimonials (
  initials, name_vi, name_en, quote_vi, quote_en, sort_order
) values
('NT', 'Nguyễn Thảo', 'Nguyen Thao', 'Không gian rất dịu và sạch. Mình được hỏi kỹ về điều mình cần, không hề có cảm giác bị thúc ép chọn thêm dịch vụ.', 'The space felt calm and immaculate. I was listened to carefully and never pressured into adding services.', 1),
('MA', 'Minh Anh', 'Minh Anh', 'Mọi bước đều được giải thích rõ ràng. Mình thích cảm giác chuyên nghiệp nhưng vẫn gần gũi và thật sự riêng tư.', 'Every step was clearly explained. It felt professional, welcoming and genuinely private.', 2),
('KL', 'Khánh Linh', 'Khanh Linh', 'Đội ngũ nhẹ nhàng, quan sát kỹ phản ứng của mình và luôn hỏi lại mức độ thoải mái trong suốt buổi chăm sóc.', 'The team was gentle, attentive and checked my comfort throughout the entire visit.', 3),
('BT', 'Bảo Trân', 'Bao Tran', 'Mình ấn tượng vì cách tư vấn vừa đủ và thực tế. Sau buổi hẹn, mình biết rõ nên chăm sóc tiếp như thế nào.', 'The advice was practical and considered. I left knowing exactly how to continue caring for myself.', 4),
('TH', 'Thu Hà', 'Thu Ha', 'Từ lúc đặt lịch đến khi ra về đều rất chỉn chu. Đây là nơi mình muốn quay lại khi cần một khoảng nghỉ thật sự.', 'From booking to goodbye, everything felt thoughtful. It is where I want to return for a genuine pause.', 5),
('NM', 'Ngọc Mai', 'Ngoc Mai', 'Mình thấy được tôn trọng và chăm sóc theo đúng nhu cầu, không theo một công thức có sẵn cho tất cả mọi người.', 'I felt respected and cared for according to my needs, never treated with a one-size-fits-all formula.', 6),
('TV', 'Thanh Vy', 'Thanh Vy', 'Tông màu, mùi hương và nhịp phục vụ đều rất dễ chịu. Một trải nghiệm đẹp nhưng không hề phô trương.', 'The palette, scent and pace were all soothing—beautifully refined without ever feeling showy.', 7),
('HA', 'Hoài An', 'Hoai An', 'Điều mình nhớ nhất là sự cẩn thận. Những chi tiết nhỏ khiến mình cảm thấy an tâm ngay từ lần đầu tiên.', 'What stayed with me was the care in every detail. I felt reassured from my very first visit.', 8);

insert into public.journal_articles (
  display_number, image_path, title_vi, title_en, reading_time_vi, reading_time_en, sort_order
) values
('01', '/images/journal-skin-v2.webp', 'Da cần làm sạch sâu hay ưu tiên phục hồi?', 'Does your skin need deep cleansing or recovery first?', '3 phút đọc', '3 min read', 1),
('02', '/images/journal-scalp-v2.webp', 'Vì sao vùng đầu và vai gáy nên được thả lỏng cùng nhau?', 'Why should the scalp, neck and shoulders unwind together?', '4 phút đọc', '4 min read', 2),
('03', '/images/journal-brow-v2.webp', 'Đường nét nào giúp gương mặt vẫn giữ vẻ tự nhiên?', 'Which shape keeps your features feeling naturally yours?', '3 phút đọc', '3 min read', 3),
('04', '/images/journal-technology-v2.webp', 'Cần chuẩn bị gì trước một liệu trình công nghệ cao?', 'How should you prepare for an advanced treatment?', '3 phút đọc', '3 min read', 4),
('05', '/images/journal-aftercare-v2.webp', 'Làm thế nào để làn da dịu hơn sau liệu trình?', 'How can skin feel calmer after a treatment?', '3 phút đọc', '3 min read', 5),
('06', '/images/journal-body-v2.webp', 'Khi nào là thời điểm phù hợp để tái tạo bề mặt da?', 'When is the right time to refresh the skin''s surface?', '4 phút đọc', '4 min read', 6);
