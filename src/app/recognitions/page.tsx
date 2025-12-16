"use client"

import { useEffect, useState } from "react"

interface UserRecognition {
  _id: string
  name?: string
  image?: string
  totalPoints?: number
  totalActivities?: number
  badges?: string[]
  level?: string
}

const BADGE_LABELS: { [key: string]: string } = {
  "green-warrior": "🌱 Chiến binh xanh",
  "tree-planter": "🌳 Người trồng cây",
  "cleanup-hero": "🧹 Anh hùng dọn rác",
}

export default function RecognitionPage() {
  const [users, setUsers] = useState<UserRecognition[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/recognitions")
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(res => setUsers(Array.isArray(res.data) ? res.data : []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="space-y-10">

      {/* HEADER */}
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">
          🏅 Ghi nhận & Lan tỏa
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tôn vinh những tình nguyện viên tích cực với huy hiệu, bảng xếp hạng
          và chứng nhận đóng góp vì môi trường xanh.
        </p>
      </header>

      {/* EMPTY */}
      {!loading && users.length === 0 && (
        <div className="card p-6 text-center text-gray-500">
          Chưa có dữ liệu ghi nhận nào.
        </div>
      )}

      {/* TOP 3 */}
      {!loading && users.length > 0 && (
        <section className="grid md:grid-cols-3 gap-4">
          {users.slice(0, 3).map((u, i) => (
            <div
              key={u._id}
              className="card p-6 text-center bg-gradient-to-br from-green-50 to-emerald-100"
            >
              <div className="text-4xl mb-2">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </div>
              <h3 className="font-semibold text-lg">
                {u.name || "Ẩn danh"}
              </h3>
              <p className="text-sm text-gray-600">
                {u.level || "Newbie"} · {u.totalActivities ?? 0} hoạt động
              </p>
              <p className="mt-2 font-bold text-green-700">
                {u.totalPoints ?? 0} điểm
              </p>
            </div>
          ))}
        </section>
      )}

      {/* LEADERBOARD */}
      {!loading && users.length > 0 && (
        <section className="card p-6">
          <h2 className="text-xl font-semibold mb-4">
            🏆 Bảng xếp hạng tình nguyện viên
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500 border-b">
                <tr>
                  <th className="py-2">#</th>
                  <th>Tên</th>
                  <th>Hoạt động</th>
                  <th>Điểm</th>
                  <th>Huy hiệu</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id} className="border-b last:border-0">
                    <td className="py-2">{i + 1}</td>
                    <td className="font-medium">
                      {u.name || "Ẩn danh"}
                    </td>
                    <td>{u.totalActivities ?? 0}</td>
                    <td className="font-semibold text-green-700">
                      {u.totalPoints ?? 0}
                    </td>
                    <td className="space-x-2">
                      {u.badges && u.badges.length > 0 ? (
                        u.badges.map(b => (
                          <span key={b}>
                            {BADGE_LABELS[b] || "🏷️"}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* CERTIFICATE */}
      <section className="card p-6 bg-green-50">
        <h2 className="text-xl font-semibold mb-2">
          📜 Chứng nhận đóng góp
        </h2>
        <p className="text-gray-600 text-sm">
          Người dùng đạt cấp <b>Active</b> hoặc <b>Champion</b> sẽ nhận được
          chứng nhận điện tử ghi nhận đóng góp cho cộng đồng.
        </p>
      </section>

    </main>
  )
}
