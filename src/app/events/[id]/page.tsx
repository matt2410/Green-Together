// app/events/[id]/page.tsx
import { notFound } from "next/navigation";
import { events } from "@/data/events";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params; // unwrap Promise

  const event = events.find((e) => e.id === id);
  if (!event) return notFound();

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const now = new Date();
  const isOngoing = start <= now && now <= end;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>Thời gian:</strong>{" "}
        {start.toLocaleString()} - {end.toLocaleString()}
      </p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        <span className={isOngoing ? "text-green-600" : "text-gray-500"}>
          {isOngoing ? "Đang diễn ra" : "Đã kết thúc"}
        </span>
      </p>
      <button
        disabled={!isOngoing}
        className={`mt-4 px-4 py-2 rounded text-white ${
          isOngoing ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Đăng ký tham gia
      </button>
    </div>
  );
}
