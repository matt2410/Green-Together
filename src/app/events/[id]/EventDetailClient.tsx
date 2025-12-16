"use client"

import EventImageSlider from "@/components/EventImageSlider"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

export default function EventDetailClient({ event }: { event: any }) {
  const [loading, setLoading] = useState(false)
  const [joined, setJoined] = useState(false)
  const { update, data: session } = useSession()

  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  const now = new Date()
  const isOngoing = start <= now && now <= end
  const joinedEventIds = (session?.user as any)?.joinedEvents ?? [] as string[]
  const isJoined = joinedEventIds.includes(event._id)

  async function handleJoin() {
    try {
      setLoading(true)

      const res = await fetch(`/api/events/${event._id}/join`, {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
        return
      }

      setJoined(true)
      toast.success(`🎉 Bạn được +${data.addedPoints} điểm`)
      await update({
        user: {
          joinedEvents: data.joinedEvents,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-6 py-12 space-y-10">
      {/* HERO */}
      <EventImageSlider images={event.images.slice(0, 3)} />

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{event.title}</h1>

          <span
            className={`inline-block px-3 py-1 text-sm rounded-full text-white ${isOngoing ? "bg-green-600" : "bg-gray-500"
              }`}
          >
            {isOngoing ? "Đang diễn ra" : "Đã kết thúc"}
          </span>
        </div>

        {isJoined ? (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold">
            ✔ Đã tham gia
          </span>
        ) : <button
          disabled={!isOngoing || joined || loading}
          onClick={handleJoin}
          className={`px-6 py-3 rounded-xl text-white font-medium transition ${isOngoing && !joined
            ? "bg-green-600 hover:bg-green-700 shadow-md"
            : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {joined ? "Đã tham gia ✔" : loading ? "Đang xử lý..." : "Đăng ký tham gia"}
        </button>}

      </section>

      {/* CONTENT */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* MAIN */}
        <article className="lg:col-span-2 prose prose-green max-w-none">
          <p className="whitespace-pre-line text-gray-700">
            {event.description}
          </p>
        </article>

        {/* SIDEBAR */}
        <aside className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <div>
            <p className="text-sm text-gray-500">📍 Địa điểm</p>
            <p className="font-medium">{event.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">⏰ Thời gian</p>
            <p className="font-medium">
              {start.toLocaleString()} – {end.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">📌 Trạng thái</p>
            <p
              className={`font-semibold ${isOngoing ? "text-green-600" : "text-gray-500"
                }`}
            >
              {isOngoing ? "Đang diễn ra" : "Đã kết thúc"}
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}
