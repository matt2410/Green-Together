"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Event } from "@/types/event"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((json) => setEvents(json.data))
      .finally(() => setLoading(false))
  }, [])

  const now = new Date()

  if (loading) {
    return <p className="p-6">Đang tải dữ liệu...</p>
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Danh sách hoạt động</h1>

      {events.map((event) => {
        const start = new Date(event.startDate)
        const end = new Date(event.endDate)
        const isOngoing = start <= now && now <= end
        const thumbnail = event.images?.[0]

        return (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="flex gap-4 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Ảnh đại diện */}
            {thumbnail && (
              <div className="relative w-40 h-32 flex-shrink-0">
                <Image
                  src={thumbnail}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
            )}

            {/* Nội dung */}
            <div className="flex-1 p-4 space-y-1">
              <h2 className="text-lg font-semibold">{event.title}</h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {event.description}
              </p>

              <p className="text-xs text-gray-500">
                📍 {event.location}
              </p>

              <span
                className={`inline-block mt-2 px-2 py-1 text-xs rounded text-white ${
                  isOngoing ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                {isOngoing ? "Đang diễn ra" : "Đã kết thúc"}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
