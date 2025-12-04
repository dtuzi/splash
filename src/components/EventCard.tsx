'use client'

import Link from 'next/link'
import { Event } from '@/lib/types'
import { formatPrice, formatCapacity, getCapacityPercentage, isEventFull } from '@/lib/utils'
import { Lock, MapPin, Users, Calendar, ExternalLink, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface EventCardProps {
  event: Event
  index?: number
}

export default function EventCard({ event, index = 0 }: EventCardProps) {
  const capacityPercent = getCapacityPercentage(event.registered, event.capacity)
  const isFull = isEventFull(event.registered, event.capacity)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link href={`/events/${event.id}`}>
        <div 
          className={`card group cursor-pointer hover:-translate-y-1 transition-all duration-300 ${
            event.isPrivate ? 'border-seal-purple/50 hover:border-seal-purple' : 'hover:border-sui-blue'
          }`}
        >
          {/* Event Image */}
          <div className="relative h-40 bg-gradient-to-br from-bg-card-hover to-bg-card rounded-sm mb-4 overflow-hidden">
            {/* Gradient overlay with event pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-sui-blue/20 to-walrus-teal/10" />
            
            {/* Animated mesh background */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id={`grid-${event.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/10" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#grid-${event.id})`} />
              </svg>
            </div>

            {/* Date Badge */}
            <div className="event-badge">
              {event.date.split(',')[0]}
            </div>

            {/* Private Badge */}
            {event.isPrivate && (
              <div className="absolute top-2.5 left-2.5 bg-seal-purple px-2 py-1 rounded text-xs flex items-center gap-1">
                <Lock className="w-3 h-3" />
                PRIVATE
              </div>
            )}

            {/* Sold Out Badge */}
            {isFull && (
              <div className="absolute bottom-2.5 right-2.5 bg-error px-2 py-1 rounded text-xs font-medium">
                SOLD OUT
              </div>
            )}

            {/* Event Icon/Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl opacity-50">
                {event.tags[0] === 'Conference' && '🎤'}
                {event.tags[0] === 'Workshop' && '💻'}
                {event.tags[0] === 'DAO' && '🏛️'}
                {event.tags[0] === 'NFT' && '🎨'}
                {event.tags[0] === 'Education' && '📚'}
                {event.tags[0] === 'Hackathon' && '⚡'}
              </span>
            </div>
          </div>

          {/* Event Info */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-sui-blue transition-colors">
                {event.title}
              </h3>
              {event.organizer.verified && (
                <CheckCircle className="w-4 h-4 text-walrus-teal flex-shrink-0" />
              )}
            </div>

            <div className="flex items-center gap-2 text-text-muted text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>

            <div className="flex items-center gap-4 text-text-muted text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{formatCapacity(event.registered, event.capacity)}</span>
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  capacityPercent >= 90 ? 'bg-error' : 
                  capacityPercent >= 70 ? 'bg-locked' : 
                  'bg-walrus-teal'
                }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>

            {/* Price and Tags */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                {event.tags.slice(0, 2).map((tag) => (
                  <span 
                    key={tag} 
                    className="px-2 py-0.5 bg-white/5 rounded text-xs text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className={`font-semibold ${event.price === 0 ? 'text-walrus-teal' : 'text-white'}`}>
                {formatPrice(event.price, event.currency)}
              </span>
            </div>

            {/* Private Event - Required Badge */}
            {event.isPrivate && event.requiredBadge && (
              <div className="blob-id mt-2">
                <Lock className="w-3 h-3" />
                Requires "{event.requiredBadge}" Badge
              </div>
            )}

            {/* Walrus Blob ID */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <ExternalLink className="w-3 h-3" />
                <span className="font-mono">Walrus: {event.walrusBlobId}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}


