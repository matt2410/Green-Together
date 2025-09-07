import Section from "../components/Section"

const people = [
  { name: "Project Lead", role: "Coordinator", bio: "Oversees strategy and partnerships." },
  { name: "Ops Manager", role: "Operations", bio: "Runs events and logistics." },
  { name: "Comms", role: "Communications", bio: "Community engagement and PR." },
]

export default function Team(){
  return (
    <div className="space-y-6">
      <Section title="Team" subtitle="Introduce contributors & partners">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {people.map((p)=> (
            <div key={p.name} className="card p-5">
              <div className="w-12 h-12 rounded-full bg-emerald-100 mb-3" />
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">{p.role}</div>
              <p className="text-gray-600 text-sm mt-2">{p.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}