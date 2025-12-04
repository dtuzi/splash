'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { mockEvents, mockTickets } from '@/lib/mock-data'
import { useWallet } from '@/context/WalletContext'
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  XCircle, 
  User,
  Ticket,
  Clock,
  ArrowLeft,
  Zap,
  Shield,
  Lock
} from 'lucide-react'

interface CheckInResult {
  success: boolean
  ticket?: {
    number: string
    holder: string
    tier: string
    event: string
  }
  error?: string
}

export default function CheckInPage() {
  const { isConnected } = useWallet()
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]?.id || '')
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<CheckInResult | null>(null)
  const [recentCheckIns, setRecentCheckIns] = useState<CheckInResult['ticket'][]>([])
  const [stats, setStats] = useState({ total: 0, checkedIn: 0 })

  useEffect(() => {
    if (selectedEvent) {
      const event = mockEvents.find(e => e.id === selectedEvent)
      if (event) {
        setStats({
          total: event.registered,
          checkedIn: Math.floor(event.registered * 0.6), // Mock 60% checked in
        })
      }
    }
  }, [selectedEvent])

  const simulateScan = () => {
    setIsScanning(true)
    setResult(null)

    // Simulate QR scan delay
    setTimeout(() => {
      // Randomly succeed or fail
      const success = Math.random() > 0.2

      if (success) {
        const mockTicket = mockTickets[Math.floor(Math.random() * mockTickets.length)]
        const newResult: CheckInResult = {
          success: true,
          ticket: {
            number: mockTicket.ticketNumber,
            holder: mockTicket.holder,
            tier: mockTicket.tier,
            event: mockTicket.event.title,
          }
        }
        setResult(newResult)
        if (newResult.ticket) {
          setRecentCheckIns(prev => [newResult.ticket!, ...prev.slice(0, 4)])
        }
        setStats(prev => ({ ...prev, checkedIn: prev.checkedIn + 1 }))
      } else {
        setResult({
          success: false,
          error: ['Invalid ticket', 'Already checked in', 'Event mismatch'][Math.floor(Math.random() * 3)]
        })
      }

      setIsScanning(false)
    }, 1500)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Wallet</h1>
          <p className="text-text-muted mb-6">Please connect your wallet to access check-in</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-2">Check-in Scanner</h1>
          <p className="text-text-muted">
            Scan ticket QR codes to verify attendance and mint attendance NFTs
          </p>
        </motion.div>

        {/* Event Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <label className="text-sm text-text-muted mb-2 block">Select Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="input"
          >
            {mockEvents.map(event => (
              <option key={event.id} value={event.id}>
                {event.title} - {event.date}
              </option>
            ))}
          </select>

          {/* Event Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-white/5 rounded-lg text-center">
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-text-muted">Registered</p>
            </div>
            <div className="p-4 bg-walrus-teal/10 rounded-lg text-center">
              <p className="text-2xl font-bold text-walrus-teal">{stats.checkedIn}</p>
              <p className="text-sm text-text-muted">Checked In</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg text-center">
              <p className="text-2xl font-bold">{stats.total - stats.checkedIn}</p>
              <p className="text-sm text-text-muted">Remaining</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-walrus-teal rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(stats.checkedIn / stats.total) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-text-muted mt-2 text-right">
              {Math.round((stats.checkedIn / stats.total) * 100)}% attendance
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Scanner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Scan Ticket</h2>
              
              {/* Scanner Preview */}
              <div className="relative aspect-square bg-bg-dark rounded-lg overflow-hidden mb-6">
                {/* Camera feed placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Scanner frame */}
                    <div className="w-48 h-48 border-2 border-sui-blue rounded-lg relative">
                      <div className="absolute -top-0.5 -left-0.5 w-6 h-6 border-t-4 border-l-4 border-sui-blue rounded-tl" />
                      <div className="absolute -top-0.5 -right-0.5 w-6 h-6 border-t-4 border-r-4 border-sui-blue rounded-tr" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-6 h-6 border-b-4 border-l-4 border-sui-blue rounded-bl" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 border-b-4 border-r-4 border-sui-blue rounded-br" />
                      
                      {/* Scanning line */}
                      {isScanning && (
                        <motion.div
                          className="absolute left-2 right-2 h-0.5 bg-sui-blue"
                          animate={{ top: ['10%', '90%', '10%'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    
                    {!isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-text-muted" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Camera icon */}
                <div className="absolute top-4 right-4">
                  <Camera className="w-6 h-6 text-text-muted" />
                </div>
              </div>

              {/* Scan Button */}
              <button
                onClick={simulateScan}
                disabled={isScanning}
                className={`w-full btn py-4 ${isScanning ? 'btn-secondary' : 'btn-primary'}`}
              >
                {isScanning ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Scanning...
                  </>
                ) : (
                  <>
                    <QrCode className="w-5 h-5" />
                    Scan QR Code
                  </>
                )}
              </button>

              <p className="text-xs text-text-muted text-center mt-4">
                Point camera at ticket QR code to verify and check in
              </p>
            </div>
          </motion.div>

          {/* Result & Recent */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Scan Result */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`card ${
                    result.success 
                      ? 'border-success bg-success/5' 
                      : 'border-error bg-error/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      result.success ? 'bg-success/20' : 'bg-error/20'
                    }`}>
                      {result.success ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : (
                        <XCircle className="w-6 h-6 text-error" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${result.success ? 'text-success' : 'text-error'}`}>
                        {result.success ? 'Check-in Successful!' : 'Check-in Failed'}
                      </h3>
                      {result.success && result.ticket ? (
                        <div className="mt-2 space-y-1 text-sm">
                          <p><span className="text-text-muted">Ticket:</span> #{result.ticket.number}</p>
                          <p><span className="text-text-muted">Holder:</span> {result.ticket.holder}</p>
                          <p><span className="text-text-muted">Tier:</span> <span className="capitalize">{result.ticket.tier}</span></p>
                        </div>
                      ) : (
                        <p className="text-sm text-text-muted mt-1">{result.error}</p>
                      )}
                    </div>
                  </div>

                  {result.success && (
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-walrus-teal">
                      <Shield className="w-4 h-4" />
                      Attendance NFT minted
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recent Check-ins */}
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-text-muted" />
                Recent Check-ins
              </h3>
              
              {recentCheckIns.length > 0 ? (
                <div className="space-y-3">
                  {recentCheckIns.map((checkIn, index) => (
                    <motion.div
                      key={`${checkIn?.number}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-walrus-teal/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-walrus-teal" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{checkIn?.holder}</p>
                        <p className="text-xs text-text-muted">
                          Ticket #{checkIn?.number} • {checkIn?.tier}
                        </p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-text-muted">
                  <Ticket className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No check-ins yet</p>
                  <p className="text-xs">Start scanning to see activity</p>
                </div>
              )}
            </div>

            {/* Quick Info */}
            <div className="p-4 bg-sui-blue/5 border border-sui-blue/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-sui-blue mt-0.5" />
                <div>
                  <p className="font-medium text-sui-blue">Instant Verification</p>
                  <p className="text-sm text-text-muted mt-1">
                    Tickets are verified on Sui blockchain with sub-second finality. 
                    Attendance NFTs are minted automatically upon successful check-in.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


