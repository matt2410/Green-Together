import CampaignCard from "@/components/CampaignCard";
import { environmentCampaigns } from "@/data/environmentCampaigns";

export const metadata = {
  title: "Chiến dịch bảo vệ môi trường",
  description: "Danh sách các chiến dịch, câu chuyện và hoạt động vì môi trường",
};

export default function CampaignListPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Chiến dịch bảo vệ môi trường
        </h1>
        <p className="text-gray-600">
          Tổng hợp bài viết, video, infographic và câu chuyện truyền cảm hứng
          nhằm lan tỏa lối sống xanh và phát triển bền vững.
        </p>
      </section>

      {/* GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {environmentCampaigns.map((item) => (
          <CampaignCard key={item.id} item={item} />
        ))}
      </section>
    </main>
  );
}
