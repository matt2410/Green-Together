import { notFound } from "next/navigation";
import { environmentCampaigns } from "@/data/environmentCampaigns";
import CampaignHero from "@/components/CampaignHero";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CampaignDetailPage({ params }: Props) {
  const { slug } = await params;

  const item = environmentCampaigns.find(
    (c) => c.slug === slug
  );

  if (!item) return notFound();

  return (
    <main className="container mx-auto px-6 py-12">
      <CampaignHero item={item} />

      <div className="flex gap-6 text-sm text-gray-500 mb-10">
        <span>Tác giả: {item.author}</span>
        <span>Ngày đăng: {item.publishedAt}</span>
      </div>

      <article className="prose prose-green max-w-none mb-12">
        {item.content.split(". ").map((line, idx) => (
          <p key={idx}>{line}.</p>
        ))}
      </article>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {item.images.map((img, idx) => (
          <div
            key={idx}
            className="relative h-64 rounded-xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`${item.title} ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </section>
    </main>
  );
}
