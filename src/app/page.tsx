"use client"

import Section from "@/components/Section"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="space-y-16">

      {/* HERO */}
      <section className="rounded-3xl p-10 md:p-14 bg-gradient-to-br from-green-600 via-emerald-500 to-green-400 text-white relative overflow-hidden">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            GreenTogether — Chung tay vì một Việt Nam xanh 🌱
          </h1>
          <p className="mt-4 text-white/90 text-lg">
            Nền tảng kết nối cộng đồng, lan tỏa nhận thức và hành động vì môi
            trường thông qua các chiến dịch, sự kiện và sáng kiến bền vững trên
            khắp Việt Nam.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/map")}
              className="bg-white text-green-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Khám phá bản đồ hành động
            </button>
            <button
              onClick={() => router.push("/campaigns")}
              className="border border-white/70 px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Xem chiến dịch
            </button>
          </div>
        </div>
      </section>

      {/* PROBLEMS & OPPORTUNITIES */}
      <Section
        title="Vấn đề & Cơ hội"
        subtitle="Những gì chúng ta đang đối mặt và hướng đi tích cực"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 space-y-3">
            <h3 className="font-semibold text-lg">🚨 Vấn đề</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Ý thức bảo vệ môi trường chưa đồng đều.</li>
              <li>Thiếu nền tảng truyền thông trực quan, dễ tiếp cận.</li>
              <li>Khó kết nối giữa người dân và các hoạt động môi trường.</li>
            </ul>
          </div>

          <div className="card p-6 space-y-3">
            <h3 className="font-semibold text-lg">🌱 Cơ hội</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Bản đồ số giúp minh bạch và tăng tương tác.</li>
              <li>Giới trẻ ngày càng quan tâm lối sống xanh.</li>
              <li>Cộng đồng sẵn sàng hành động nếu có định hướng.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section
        title="Giải pháp & Tính năng chính"
        subtitle="GreenTogether mang lại điều gì?"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "🗺️ Bản đồ hành động môi trường",
              desc: "Hiển thị điểm ô nhiễm, chiến dịch, sự kiện theo khu vực, thời gian và loại hoạt động.",
              link: "/map"
            },
            {
              title: "✍️ Đăng ký tham gia hoạt động",
              desc: "Theo dõi sự kiện, đăng ký tham gia và lưu lại đóng góp cá nhân.",
              link: "/events"
            },
            {
              title: "📚 Kho nội dung truyền thông",
              desc: "Bài viết, infographic, video và câu chuyện truyền cảm hứng.",
              link: "/campaigns"
            },
            {
              title: "💬 Góp ý & Đóng góp cộng đồng",
              desc: "Đề xuất địa điểm, chia sẻ sáng kiến và đánh giá chiến dịch.",
              link: "/community"
            },
            {
              title: "🏅 Ghi nhận & lan tỏa",
              desc: "Huy hiệu, bảng xếp hạng và chứng nhận cho tình nguyện viên tích cực.",
              link: ""
            }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => item.link && router.push(item.link)}
              className={`card p-6 space-y-3 ${
                item.link ? "cursor-pointer hover:shadow-md transition" : ""
              }`}
            >
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* IMPACT */}
      <Section
        title="Tầm nhìn"
        subtitle="Hành động nhỏ – Tác động lớn"
      >
        <div className="card p-8 text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-700">
            GreenTogether tin rằng mỗi hành động nhỏ đều có giá trị.
            Khi cộng đồng cùng chung tay, chúng ta có thể tạo ra
            những thay đổi tích cực và bền vững cho môi trường Việt Nam.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <section className="text-center pb-10">
        <h2 className="text-2xl font-bold mb-4">
          Sẵn sàng hành động vì môi trường? 💚
        </h2>
        <button
          onClick={() => router.push("/community")}
          className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-2xl font-medium"
        >
          Gửi đóng góp đầu tiên
        </button>
      </section>

    </div>
  )
}
