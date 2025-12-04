'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { mockEvents } from '@/lib/mock-data'
import EventCard from '@/components/EventCard'
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react'

type FilterType = 'all' | 'free' | 'paid' | 'private'
type SortType = 'date' | 'price-low' | 'price-high' | 'popular'

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('date')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all unique tags
  const allTags = Array.from(new Set(mockEvents.flatMap(e => e.tags)))

  // Filter and sort events
  const filteredEvents = mockEvents
    .filter(event => {
      // Search filter
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      // Type filter
      if (filter === 'free' && event.price !== 0) return false
      if (filter === 'paid' && event.price === 0) return false
      if (filter === 'private' && !event.isPrivate) return false
      // Tag filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => event.tags.includes(tag))) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price
      if (sort === 'price-high') return b.price - a.price
      if (sort === 'popular') return b.registered - a.registered
      return 0 // date is default order
    })

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Discover Events</h1>
          <p className="text-text-muted">
            Find and register for events in the Sui ecosystem. All tickets are NFTs stored on Walrus.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder="Search events by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {(selectedTags.length > 0 || filter !== 'all') && (
                <span className="w-5 h-5 bg-sui-blue rounded-full text-xs flex items-center justify-center">
                  {selectedTags.length + (filter !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Event Type */}
                <div>
                  <label className="text-sm text-text-muted mb-2 block">Event Type</label>
                  <div className="flex flex-wrap gap-2">
                    {(['all', 'free', 'paid', 'private'] as FilterType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-3 py-1.5 rounded text-sm transition-colors ${
                          filter === type 
                            ? 'bg-sui-blue text-white' 
                            : 'bg-white/5 text-text-muted hover:bg-white/10'
                        }`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="text-sm text-text-muted mb-2 block">Sort By</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortType)}
                    className="input"
                  >
                    <option value="date">Date (Soonest)</option>
                    <option value="price-low">Price (Low to High)</option>
                    <option value="price-high">Price (High to Low)</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="text-sm text-text-muted mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-walrus-teal text-bg-dark'
                            : 'bg-white/5 text-text-muted hover:bg-white/10'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedTags.length > 0 || filter !== 'all') && (
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-text-muted">Active:</span>
                  {filter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-sui-blue/20 text-sui-blue rounded text-xs">
                      {filter}
                      <button onClick={() => setFilter('all')}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedTags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-walrus-teal/20 text-walrus-teal rounded text-xs">
                      {tag}
                      <button onClick={() => toggleTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      setFilter('all')
                      setSelectedTags([])
                    }}
                    className="text-xs text-error hover:underline ml-2"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-text-muted text-sm">
          Showing {filteredEvents.length} of {mockEvents.length} events
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-text-muted mb-6">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilter('all')
                setSelectedTags([])
              }}
              className="btn btn-secondary"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Load More (placeholder) */}
        {filteredEvents.length > 0 && (
          <div className="mt-12 text-center">
            <button className="btn btn-secondary">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


