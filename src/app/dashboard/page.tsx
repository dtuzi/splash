'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { mockOrganizerEvents, mockOrganizerStats } from '@/lib/mock-data'
import { useWallet } from '@/context/WalletContext'
import { formatCapacity, getCapacityPercentage } from '@/lib/utils'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Eye,
  QrCode,
  Download,
  BarChart3,
  Settings,
  Lock,
  ExternalLink,
  CheckCircle
} from 'lucide-react'

export default function DashboardPage() {
  const { isConnected } = useWallet()
  const [selectedEvent, setSelectedEvent] = useState(mockOrganizerEvents[0]?.id || null)

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Wallet</h1>
          <p className="text-text-muted mb-6">Please connect your wallet to access your dashboard</p>
        </div>
      </div>
    )
  }

  const stats = mockOrganizerStats

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Organizer Dashboard</h1>
            <p className="text-text-muted">
              Manage your events, track registrations, and verify attendance
            </p>
          </div>
          <Link href="/create" className="btn btn-primary">
            <Plus className="w-5 h-5" />
            Create Event
          </Link>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sui-blue/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-sui-blue" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalEvents}</p>
                <p className="text-sm text-text-muted">Total Events</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-walrus-teal/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-walrus-teal" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalTicketsSold.toLocaleString()}</p>
                <p className="text-sm text-text-muted">Tickets Sold</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-seal-purple/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-seal-purple" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-text-muted">Revenue (SUI)</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalCheckIns.toLocaleString()}</p>
                <p className="text-sm text-text-muted">Check-ins</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-locked/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-locked" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.averageAttendance}%</p>
                <p className="text-sm text-text-muted">Avg. Attendance</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Events</h2>
                <Link href="/events" className="text-sm text-sui-blue hover:underline">
                  View all →
                </Link>
              </div>

              <div className="space-y-4">
                {mockOrganizerEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => setSelectedEvent(event.id)}
                    className={`card cursor-pointer transition-all ${
                      selectedEvent === event.id 
                        ? 'border-sui-blue ring-1 ring-sui-blue/50' 
                        : 'hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Event Icon */}
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-sui-blue/20 to-walrus-teal/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">
                          {event.tags[0] === 'Conference' && '🎤'}
                          {event.tags[0] === 'Workshop' && '💻'}
                          {event.tags[0] === 'DAO' && '🏛️'}
                        </span>
                      </div>

                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold truncate">{event.title}</h3>
                            <p className="text-sm text-text-muted">{event.date}</p>
                          </div>
                          {event.isPrivate && (
                            <span className="px-2 py-0.5 bg-seal-purple/20 text-seal-purple rounded text-xs flex-shrink-0">
                              Private
                            </span>
                          )}
                        </div>

                        {/* Analytics Summary */}
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-text-muted">Views</p>
                            <p className="font-medium">{event.analytics.views.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-text-muted">Sold</p>
                            <p className="font-medium">{formatCapacity(event.registered, event.capacity)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-text-muted">Check-ins</p>
                            <p className="font-medium text-success">{event.analytics.checkIns}</p>
                          </div>
                          <div>
                            <p className="text-sm text-text-muted">Revenue</p>
                            <p className="font-medium text-walrus-teal">{event.analytics.revenue} SUI</p>
                          </div>
                        </div>

                        {/* Capacity Bar */}
                        <div className="mt-3">
                          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-sui-blue rounded-full"
                              style={{ width: `${getCapacityPercentage(event.registered, event.capacity)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Selected Event */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/checkin"
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <QrCode className="w-5 h-5 text-sui-blue" />
                  <span>Open Check-in Scanner</span>
                </Link>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                  <Download className="w-5 h-5 text-walrus-teal" />
                  <span>Export Attendance CSV</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                  <BarChart3 className="w-5 h-5 text-seal-purple" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                  <Settings className="w-5 h-5 text-text-muted" />
                  <span>Event Settings</span>
                </button>
              </div>
            </motion.div>

            {/* Selected Event Details */}
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
              >
                <h3 className="font-semibold mb-4">Event Actions</h3>
                
                {(() => {
                  const event = mockOrganizerEvents.find(e => e.id === selectedEvent)
                  if (!event) return null
                  
                  return (
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <p className="text-sm text-text-muted mb-1">Selected</p>
                        <p className="font-medium">{event.title}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={`/events/${event.id}`}
                          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-sui-blue/10 text-sui-blue hover:bg-sui-blue/20 transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View Page
                        </Link>
                        <Link
                          href="/checkin"
                          className="flex items-center justify-center gap-2 p-3 rounded-lg bg-walrus-teal/10 text-walrus-teal hover:bg-walrus-teal/20 transition-colors text-sm"
                        >
                          <QrCode className="w-4 h-4" />
                          Check-in
                        </Link>
                      </div>

                      {/* Attendance Progress */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-text-muted">Check-in Progress</span>
                          <span>
                            {event.analytics.checkIns} / {event.registered}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-success rounded-full"
                            style={{ 
                              width: `${(event.analytics.checkIns / event.registered) * 100}%` 
                            }}
                          />
                        </div>
                        <p className="text-xs text-text-muted mt-2">
                          {Math.round((event.analytics.checkIns / event.registered) * 100)}% attendance rate
                        </p>
                      </div>

                      {/* Walrus Link */}
                      <div className="pt-4 border-t border-white/10">
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-walrus-teal hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View on Walrus Sites
                        </a>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            )}

            {/* Revenue Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="card"
            >
              <h3 className="font-semibold mb-4">Revenue Overview</h3>
              <div className="h-32 flex items-end justify-between gap-2">
                {[35, 45, 80, 60, 90, 70, 95].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-sui-blue/30 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-text-muted">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
              <p className="text-center text-sm text-text-muted mt-4">
                This week: <span className="text-walrus-teal font-medium">+1,240 SUI</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}


