// src/app/events/[id]/page.tsx
import { getEventById } from "@/lib/getEventById"
import { notFound } from "next/navigation"
import EventDetailClient from "./EventDetailClient"
import { Event } from "@/types/event"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: PageProps) {
    const { id } = await params        // ✅ unwrap params
    const rawEvent = await getEventById(id) as Event

    if (!rawEvent) return notFound()

    const event = JSON.parse(JSON.stringify(rawEvent))

    return <EventDetailClient event={event} />
}
