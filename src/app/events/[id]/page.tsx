import EventImageSlider from "@/components/EventImageSlider"
import { getEventById } from "@/lib/getEventById"
import { notFound } from "next/navigation"

interface EventDetailPageProps {
  params: {
    id: string
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params
  const event = await getEventById(id)
  if (!event) return notFound()

  const start = new Date(event.startDate)
  const end = new Date(event.endDate)
  const now = new Date()
  const isOngoing = start <= now && now <= end

  return (
    <main className="container mx-auto px-6 py-12">
      {/* HERO */}
      <section className="mb-10">
        <EventImageSlider images={event.images.slice(0, 3)} />
      </section>

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold leading-tight">
            {event.title}
          </h1>

          <span
            className={`inline-block px-3 py-1 text-sm rounded-full text-white ${
              isOngoing ? "bg-green-600" : "bg-gray-500"
            }`}
          >
            {isOngoing ? "Đang diễn ra" : "Đã kết thúc"}
          </span>
        </div>

        {/* CTA */}
        <button
          disabled={!isOngoing}
          className={`h-fit px-6 py-3 rounded-xl text-white font-medium transition ${
            isOngoing
              ? "bg-green-600 hover:bg-green-700 shadow-md"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Đăng ký tham gia
        </button>
      </section>

      {/* CONTENT + META */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CONTENT */}
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
              className={`font-semibold ${
                isOngoing ? "text-green-600" : "text-gray-500"
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