"use client"

import Section from "@/components/Section"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    return (
        <div className="space-y-6">

            <div className="card p-8 bg-gradient-to-br from-brand/10 to-emerald-50">
                <h1 className="text-2xl sm:text-3xl font-bold">GreenTogether — Chung tay vì một Việt Nam xanh</h1>
                <p className="text-gray-700 mt-2">
                    GreenTogether là nền tảng tuyên truyền, giáo dục và kết nối cộng đồng cùng hành động vì môi trường, tập trung vào các địa điểm cần bảo vệ hoặc đang diễn ra các chiến dịch môi trường trên toàn Việt Nam.
                </p>
            </div>

            <Section title="Problems & Opportunities" subtitle="Những gì chúng ta đang giải quyết">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="card p-4">
                        <h3 className="font-semibold">Vấn đề</h3>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li>Ý thức bảo vệ môi trường chưa đồng đều.</li>
                            <li>Thiếu nền tảng truyền thông trực quan và dễ tiếp cận.</li>
                            <li>Người dân không biết bắt đầu tham gia từ đâu.</li>
                        </ul>
                    </div>
                    <div className="card p-4">
                        <h3 className="font-semibold">Cơ hội</h3>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li>Ứng dụng bản đồ số để tăng tính tương tác và minh bạch.</li>
                            <li>Tận dụng xu hướng sống xanh của giới trẻ.</li>
                            <li>Kết nối cộng đồng và tổ chức bảo vệ môi trường.</li>
                        </ul>
                    </div>
                </div>
            </Section>

            <Section title="Giải pháp & Tính năng chính" subtitle="Sản phẩm của chúng ta">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="card p-4 space-y-3 cursor-pointer"
                        onClick={() => {
                            router.push(`/map`)
                        }}>
                        <h4 className="font-semibold">🗺️ Bản đồ hành động môi trường</h4>
                        <p className="text-gray-600 text-sm">Hiển thị địa điểm ô nhiễm và các hoạt động (trồng cây, dọn rác...). Có bộ lọc khu vực, loại vấn đề, thời gian, loại chiến dịch.</p>
                    </div>
                    <div className="card p-4 space-y-3 cursor-pointer"
                        onClick={() => {
                            router.push(`/events`)
                        }}>
                        <h4 className="font-semibold">✍️ Đăng ký tham gia hoạt động</h4>
                        <p className="text-gray-600 text-sm">Người dùng đăng ký sự kiện, theo dõi hành trình tham gia và lưu lại đóng góp cá nhân.</p>
                    </div>
                    <div className="card p-4 space-y-3 cursor-pointer"
                        onClick={() => {
                            router.push(`/campaigns`)
                        }}>
                        <h4 className="font-semibold">📚 Kho nội dung truyền thông</h4>
                        <p className="text-gray-600 text-sm">Bài viết, infographic, video, câu chuyện truyền cảm hứng, và chiến dịch đã/đang triển khai.</p>
                    </div>
                    <div className="card p-4 space-y-3 cursor-pointer" onClick={() => {
                        router.push(`/community`)
                    }}>
                        <h4 className="font-semibold">💬 Góp ý & Đóng góp cộng đồng</h4>
                        <p className="text-gray-600 text-sm">Gửi đề xuất địa điểm, bình luận, chia sẻ và đánh giá các chiến dịch.</p>
                    </div>
                    <div className="card p-4 space-y-3">
                        <h4 className="font-semibold">🏅 Chứng nhận & Ghi nhận</h4>
                        <p className="text-gray-600 text-sm">Hệ thống huy hiệu, bảng xếp hạng và chứng nhận điện tử cho tình nguyện viên tích cực.</p>
                    </div>
                </div>
            </Section>

        </div>
    )
}