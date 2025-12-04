import { mockEvents } from '@/lib/mock-data'
import EventDetail from '@/components/EventDetail'
import Link from 'next/link'

// Generate static params for all event IDs at build time
export function generateStaticParams() {
  return mockEvents.map((event) => ({
    id: event.id,
  }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params
  const event = mockEvents.find(e => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link href="/events" className="btn btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    )
  }

  return <EventDetail event={event} />
}
