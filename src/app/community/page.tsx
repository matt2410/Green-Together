"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { UserModel } from "@/data/users"
import { toast } from "sonner"

type ContributionType =
    | "location"
    | "comment"
    | "share"
    | "review"

export default function CommunityContributionPage() {
    const { data: session, status } = useSession()
    const user = session?.user as UserModel | undefined
    const isLoggedIn = status === "authenticated"

    const [formData, setFormData] = useState<UserModel>({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: ""
    })

    const [type, setType] = useState<ContributionType | "">("")
    const [location, setLocation] = useState("")
    const [content, setContent] = useState("")
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)

    // ✅ Auto fill khi đã login
    useEffect(() => {
        if (isLoggedIn && user) {
            setFormData((prev) => ({
                ...prev,
                name: prev.name || user.name || "",
                email: prev.email || user.email || "",
                phone: prev.phone || user.phone || ""
            }))
        }
    }, [isLoggedIn, user])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!type) return toast.error(`Vui lòng chọn loại đóng góp`)

        setLoading(true)

        try {
            const res = await fetch("/api/community", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone
                    },
                    type,
                    location,
                    content,
                    rating
                })
            })

            if (!res.ok) throw new Error("Submit failed")

            toast.success(`Cảm ơn bạn đã đóng góp cho cộng đồng 💚`)

            setType("")
            setLocation("")
            setContent("")
            setRating(0)
        } catch {
            toast.error(`Có lỗi xảy ra, vui lòng thử lại`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="container mx-auto px-6 py-12 max-w-4xl">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold mb-3">
                    Góp ý & Đóng góp cộng đồng
                </h1>
                <p className="text-gray-600">
                    Gửi đề xuất địa điểm, chia sẻ ý kiến, đánh giá và chung tay xây dựng
                    các chiến dịch môi trường bền vững.
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="bg-white border rounded-2xl p-8 shadow-sm space-y-6"
            >
                {/* NAME */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Tên của bạn
                    </label>
                    <input
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* EMAIL */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        disabled={isLoggedIn}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="email@example.com"
                        className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500 ${isLoggedIn ? "bg-gray-100" : ""
                            }`}
                        required
                    />
                </div>

                {/* TYPE */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Loại đóng góp
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as ContributionType)}
                        required
                        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">-- Chọn loại --</option>
                        <option value="location">Đề xuất địa điểm</option>
                        <option value="comment">Bình luận / Góp ý</option>
                        <option value="share">Chia sẻ sáng kiến</option>
                        <option value="review">Đánh giá chiến dịch</option>
                    </select>
                </div>

                {/* LOCATION */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Địa điểm (nếu có)
                    </label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* RATING */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Đánh giá
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONTENT */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nội dung đóng góp
                    </label>
                    <textarea
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 transition text-white font-medium py-3 rounded-xl disabled:opacity-60"
                >
                    {loading ? "Đang gửi..." : "Gửi đóng góp"}
                </button>
            </form>
        </main>
    )
}
