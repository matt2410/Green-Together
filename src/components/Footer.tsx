export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-white">
      <div className="container mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        
        {/* BRAND */}
        <div>
          <h3 className="text-lg font-bold text-green-700">
            GreenTogether 🌱
          </h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Nền tảng kết nối cộng đồng cùng chung tay bảo vệ môi trường,
            lan tỏa lối sống xanh và phát triển bền vững tại Việt Nam.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold mb-3">Liên kết</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="/map" className="hover:text-green-600">
                Bản đồ hành động
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-green-600">
                Hoạt động & Sự kiện
              </a>
            </li>
            <li>
              <a href="/campaigns" className="hover:text-green-600">
                Chiến dịch môi trường
              </a>
            </li>
            <li>
              <a href="/community" className="hover:text-green-600">
                Góp ý cộng đồng
              </a>
            </li>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h4 className="font-semibold mb-3">Thông tin</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📍 Phạm vi: Toàn Việt Nam</li>
            <li>🌍 Lĩnh vực: Môi trường & Cộng đồng</li>
            <li>👨‍💻 Phát triển bởi: <span className="font-medium">matt2410</span></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} GreenTogether. All rights reserved.
      </div>
    </footer>
  )
}
