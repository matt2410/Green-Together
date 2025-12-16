import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { CommunityContributionModel } from "@/models/CommunityContribution"

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()
    const { name, type, location, rating, content } = body

    if (!type || !content) {
      return NextResponse.json(
        { message: "Thiếu dữ liệu bắt buộc" },
        { status: 400 }
      )
    }

    const contribution = await CommunityContributionModel.create({
      name,
      type,
      location,
      rating,
      content
    })

    return NextResponse.json({
      message: "Gửi đóng góp thành công",
      data: contribution
    })
  } catch (err: any) {
    console.error("[POST /api/community]", err.message)
    return NextResponse.json(
      { message: "Failed to submit contribution" },
      { status: 500 }
    )
  }
}
