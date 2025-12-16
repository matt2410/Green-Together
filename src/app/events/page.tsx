"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Event } from "@/types/event"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events", { cache: "force-cache" })
      .then((res) => res.json())
      .then((json) => setEvents(json.data))
      .finally(() => setLoading(false))
  }, [])

  const now = new Date()

  if (loading) {
    return <p className="p-6">Đang tải dữ liệu...</p>
  }

  return (
    <main className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Hoạt động & Sự kiện</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => {
          const start = new Date(event.startDate)
          const end = new Date(event.endDate)
          const isOngoing = start <= now && now <= end
          const thumbnail = event.images?.[0]

          return (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-56">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="h-full bg-gray-100" />
                )}

                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full text-white ${
                    isOngoing ? "bg-green-600" : "bg-gray-500"
                  }`}
                >
                  {isOngoing ? "Đang diễn ra" : "Đã kết thúc"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-2">
                <h2 className="text-lg font-semibold group-hover:text-green-600 transition">
                  {event.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {event.description}
                </p>

                <p className="text-xs text-gray-500">
                  📍 {event.location}
                </p>
              </div>
            </Link>
          )
        })}
      </section>
    </main>
  )
}
