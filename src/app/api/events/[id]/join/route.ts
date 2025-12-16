import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { User } from "@/models/User"
import { EventModel } from "@/models/Event"
import mongoose from "mongoose"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id: eventId } = await params

    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Bạn cần đăng nhập để tham gia" },
        { status: 401 }
      )
    }

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return NextResponse.json(
        { message: "Event không hợp lệ" },
        { status: 400 }
      )
    }

    const event = await EventModel.findById(eventId)
    if (!event) {
      return NextResponse.json(
        { message: "Không tìm thấy sự kiện" },
        { status: 404 }
      )
    }

    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return NextResponse.json(
        { message: "Không tìm thấy user" },
        { status: 404 }
      )
    }

    // ❌ đã tham gia
    if (user.joinedEvents?.some((e: any) => e.toString() === eventId)) {
      return NextResponse.json(
        { message: "Bạn đã tham gia sự kiện này" },
        { status: 400 }
      )
    }

    if (!Array.isArray(user.joinedEvents)) {
      user.joinedEvents = []
    }

    // ✅ cộng điểm
    user.joinedEvents.push(event._id)
    user.totalPoints += 10
    user.totalActivities += 1
    user.lastActiveAt = new Date()

    // tự động lên level
    if (user.totalPoints >= 100) user.level = "champion"
    else if (user.totalPoints >= 30) user.level = "active"

    await user.save()

    return NextResponse.json({
      message: "Tham gia thành công",
      addedPoints: 10,
      totalPoints: user.totalPoints,
    })
  } catch (err) {
    console.error("[POST /api/events/:id/join]", err)
    return NextResponse.json(
      { message: "Join event failed" },
      { status: 500 }
    )
  }
}
