export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-green-700">
              🌱 GreenTogether
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nền tảng kết nối cộng đồng cùng hành động vì môi trường,
              lan tỏa lối sống xanh và phát triển bền vững tại Việt Nam.
            </p>
          </div>

          {/* NAV */}
          <div>
            <h4 className="font-semibold mb-3">Khám phá</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/" className="hover:text-green-600">Trang chủ</a></li>
              <li><a href="/map" className="hover:text-green-600">Bản đồ môi trường</a></li>
              <li><a href="/events" className="hover:text-green-600">Sự kiện</a></li>
              <li><a href="/campaigns" className="hover:text-green-600">Chiến dịch</a></li>
            </ul>
          </div>

          {/* COMMUNITY */}
          <div>
            <h4 className="font-semibold mb-3">Cộng đồng</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/community" className="hover:text-green-600">Góp ý & Đóng góp</a></li>
              <li><a href="/recognitions" className="hover:text-green-600">Ghi nhận & Lan tỏa</a></li>
              <li><a href="/events" className="hover:text-green-600">Tham gia hoạt động</a></li>
            </ul>
          </div>

          {/* AUTHOR */}
          <div>
            <h4 className="font-semibold mb-3">Phát triển bởi</h4>
            <p className="text-sm text-gray-600">
              👨‍💻 matt2410
            </p>
            <p className="text-xs text-gray-500 mt-2">
              © {new Date().getFullYear()} GreenTogether.<br />
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
