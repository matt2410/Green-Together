"use client"   // cần vì component có JSX + interactivity

import Section from "@/components/Section"   // đổi từ ../ → alias Next.js

const events = [
  ["Q3 2025", "Pilot clean-up events in 3 districts"],
  ["Q4 2025", "Launch app & volunteer portal"],
  ["Q1 2026", "Scale tree planting with city partners"],
  ["Q2 2026", "Education programs at 20 schools"],
]

export default function Timeline(){
  return (
    <div className="space-y-6 p-6">
      <Section title="Timeline" subtitle="Milestones and phases">
        <ol className="relative border-s ps-6 space-y-6">

          {events.map(([time,desc])=> (
            <li key={time} className="relative">

              <span className="absolute -start-[7px] top-1.5 w-3 h-3 rounded-full bg-brand"></span>

              <div className="card p-4">
                <p className="text-gray-600 text-sm">{time}</p>
                <p className="mt-1 font-medium">{desc}</p>
              </div>
            </li>
          ))}

        </ol>
      </Section>
    </div>
  )
}
