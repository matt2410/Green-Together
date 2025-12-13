import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, phone, gender, dob } = body

    // Validate backend
    if (!name || !phone || !gender || !dob) {
      return NextResponse.json(
        { message: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      )
    }

    if (!/^09\d{8}$/.test(phone)) {
      return NextResponse.json(
        { message: "SĐT phải bắt đầu bằng 09 và đủ 10 số" },
        { status: 400 }
      )
    }

    await connectDB()

    await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          name,
          phone,
          gender,
          dob,
          image: session.user.image,
        },
      },
      {
        upsert: true,
        new: true,
      }
    )

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error("[UPDATE USER ERROR]", err)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
