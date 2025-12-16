"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UserModel } from "@/data/users"

export default function User() {
    const { data: session, status, update } = useSession()
    const router = useRouter()

    const user = session?.user as any

    const [formData, setFormData] = useState<UserModel>({
        name: "",
        email: "",
        phone: "",
        gender: "",
        dob: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (!user) return

        setFormData({
            name: user.name ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
            gender: user.gender ?? "",
            dob: user.dob ?? "",
        })
    }, [user])

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name?.trim()) newErrors.name = "Vui lòng nhập tên"

        if (!formData.phone?.trim()) {
            newErrors.phone = "Vui lòng nhập số điện thoại"
        } else if (!/^09\d{8}$/.test(formData.phone)) {
            newErrors.phone = "SĐT phải bắt đầu bằng 09 và đủ 10 số"
        }

        if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính"
        if (!formData.dob) newErrors.dob = "Vui lòng chọn ngày sinh"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return

        const res = await fetch("/api/user/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        if (!res.ok) {
            const err = await res.json()
            toast.error(err.message)
            return
        }

        await await update({
            user: {
                phone: formData.phone,
                gender: formData.gender,
                dob: formData.dob,
            },
        })

        setSaved(true)

        setTimeout(() => {
            router.replace("/")
        }, 1500)
    }

    if (status === "loading") return null

    return (
        <div className="p-6 max-w-md mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Thông tin người dùng</h1>

            {saved && <p className="text-green-600">Cập nhật thành công!</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME */}
                <div>
                    <label>Tên</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* PHONE */}
                <div>
                    <label>SĐT</label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="09xxxxxxxx"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                </div>

                {/* EMAIL */}
                <div>
                    <label>Email</label>
                    <input
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>

                {/* GENDER */}
                <div>
                    <label>Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">-- Chọn --</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                    {errors.gender && (
                        <p className="text-red-500 text-sm">{errors.gender}</p>
                    )}
                </div>

                {/* DOB */}
                <div>
                    <label>Ngày sinh</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Lưu thay đổi
                </button>
            </form>
        </div>
    )
}
