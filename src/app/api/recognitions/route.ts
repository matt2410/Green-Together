import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { User } from "@/models/User"

export async function GET() {
  try {
    await connectDB()

    const users = await User.find({})
      .sort({ totalPoints: -1 })
      .limit(20)
      .select("name image totalPoints totalActivities badges level")
      .lean()

    return NextResponse.json({
      data: users,
    })
  } catch (err) {
    console.error("[GET /api/recognitions]", err)
    return NextResponse.json(
      { message: "Failed to load recognition data" },
      { status: 500 }
    )
  }
}
