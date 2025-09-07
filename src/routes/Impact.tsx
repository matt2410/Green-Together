import Section from "../components/Section"

export default function Impact(){
  const stats = [
    ["Volunteers", "1,250"],
    ["Trees planted", "4,380"],
    ["Waste diverted (kg)", "12,700"],
    ["Events hosted", "86"],
  ]
  return (
    <div className="space-y-6">
      <Section title="Impact" subtitle="Swap with your real metrics">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(([label, value])=> (
            <div key={label} className="card p-5 text-center">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-gray-600 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}