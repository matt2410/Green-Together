// app/events/page.tsx
import Link from "next/link";
import { events } from "@/data/events";

export default function EventsPage() {
  const now = new Date();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Danh sách hoạt động</h1>
      {events.map((event) => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        const isOngoing = start <= now && now <= end;

        return (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="block border p-4 rounded shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <span
              className={`mt-2 inline-block px-2 py-1 rounded text-white ${
                isOngoing ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {isOngoing ? "Đang diễn ra" : "Đã kết thúc"}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
