import Section from "../components/Section"

const sample = [
  { name: "Neighborhood Clean-up", owner: "Community Ops", status: "Planned", desc: "Weekly events removing litter and sorting recyclables."},
  { name: "Urban Forest", owner: "City Parks", status: "Active", desc: "Tree planting and maintenance with local volunteers."},
  { name: "Eco-Education", owner: "Outreach", status: "Active", desc: "Workshops and school programs on sustainability."},
]

export default function Projects(){
  return (
    <div className="space-y-6">
      <Section title="Projects" subtitle="Curate from Notion">
        <div className="grid md:grid-cols-2 gap-4">
          {sample.map(p => (
            <article key={p.name} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-gray-600 mt-1">{p.desc}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs bg-gray-900 text-white">{p.status}</span>
              </div>
              <div className="text-sm text-gray-600 mt-3">Owner: <span className="font-medium text-gray-800">{p.owner}</span></div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  )
}