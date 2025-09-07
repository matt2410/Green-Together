import Section from "../components/Section"

const events = [
  ["Q3 2025", "Pilot clean-up events in 3 districts"],
  ["Q4 2025", "Launch app & volunteer portal"],
  ["Q1 2026", "Scale tree planting with city partners"],
  ["Q2 2026", "Education programs at 20 schools"],
]

export default function Timeline(){
  return (
    <div className="space-y-6">
      <Section title="Timeline" subtitle="Milestones and phases">
        <ol className="relative border-s ps-6 space-y-6">
          {events.map(([time,desc])=> (
            <li key={time}>
              <div className="absolute -start-[7px] w-3 h-3 rounded-full bg-brand top-1.5" />
              <div className="card p-4">
                <div className="text-sm text-gray-600">{time}</div>
                <div className="font-medium mt-1">{desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  )
}