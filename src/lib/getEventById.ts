// lib/getEventById.ts
import { connectDB } from "@/lib/mongodb"
import { EventModel } from "@/models/Event"
import { Event } from "@/types/event"

export async function getEventById(id: string): Promise<Event | null> {
  await connectDB()

  const event = await EventModel.findOne({ id }).lean<Event>()
  return event
}
