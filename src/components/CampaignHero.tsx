import { ContentItem } from "@/types/contents";
import Image from "next/image";

export default function CampaignHero({ item }: { item: ContentItem }) {
  return (
    <section className="relative h-[420px] rounded-3xl overflow-hidden mb-12">
      <Image
        src={item.images[0]}
        alt={item.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute bottom-8 left-8 right-8 text-white">
        <span className="bg-green-600 px-4 py-1 rounded-full text-sm">
          {item.type.toUpperCase()}
        </span>
        <h1 className="text-4xl font-bold mt-4 mb-3">
          {item.title}
        </h1>
        <p className="text-gray-200 max-w-3xl">
          {item.excerpt}
        </p>
      </div>
    </section>
  );
}
