import Link from "next/link";
import Image from "next/image";
import { ContentItem } from "@/types/contents";

export default function CampaignCard({ item }: { item: ContentItem }) {
  return (
    <Link
      href={`/campaigns/${item.slug}`}
      className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition"
    >
      <div className="relative h-56">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition"
        />
        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          {item.type.toUpperCase()}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">
          {item.excerpt}
        </p>

        <div className="mt-4 flex justify-between text-xs text-gray-400">
          <span>{item.author}</span>
          <span>{item.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
}
