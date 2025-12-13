import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { EventModel } from "@/models/Event"

export async function GET(req: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const q = searchParams.get("q")
    const page = Number(searchParams.get("page") || 1)
    const limit = Number(searchParams.get("limit") || 10)
    const skip = (page - 1) * limit

    const filter = q
      ? {
          $or: [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } }
          ]
        }
      : {}

    const [events, total] = await Promise.all([
      EventModel.find(filter)
        .sort({ startDate: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      EventModel.countDocuments(filter)
    ])

    return NextResponse.json({
      data: events,
      pagination: {
        page,
        limit,
        total
      }
    })
  } catch (err: any) {
    console.error("[GET /api/events]", err.message)
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    )
  }
}
