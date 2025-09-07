import Section from "../components/Section"

const sample = [
  { title: "Increase community participation", metric: "2,000 active volunteers", due: "Q4 2025" },
  { title: "Plant urban trees", metric: "10,000 trees", due: "Q2 2026" },
  { title: "Reduce waste to landfill", metric: "−30% at partner sites", due: "Q4 2026" },
  { title: "Education outreach", metric: "50 schools, 100 workshops", due: "Ongoing" },
]

export default function Goals(){
  return (
    <div className="space-y-6">
      <Section title="Goals & KPIs" subtitle="Replace with goals from Notion">
        <ul className="space-y-3">
          {sample.map((g)=> (
            <li key={g.title} className="card p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{g.title}</p>
                <p className="text-gray-600 text-sm">{g.metric}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs">{g.due}</span>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}