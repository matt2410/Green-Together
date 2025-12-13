import EventImageSlider from "@/components/EventImageSlider";
import { getEventById } from "@/lib/getEventById";
import { notFound } from "next/navigation";
import { Props } from "next/script";

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return notFound();

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const now = new Date();
  const isOngoing = start <= now && now <= end;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] p-6 space-y-6">
        <EventImageSlider images={event.images.slice(0, 3)} />

        <h1 className="text-2xl font-bold">{event.title}</h1>

        <p className="whitespace-pre-line text-gray-700">
          {event.description}
        </p>

        <p>
          <strong>Địa điểm:</strong> {event.location}
        </p>

        <p>
          <strong>Thời gian:</strong>{" "}
          {start.toLocaleString()} – {end.toLocaleString()}
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
            isOngoing
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Đăng ký tham gia
        </button>
      </div>
    </div>
  );
}
