'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Event } from '@/lib/types'
import { useWallet } from '@/context/WalletContext'
import { formatPrice, formatCapacity, getCapacityPercentage, isEventFull } from '@/lib/utils'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  Lock, 
  ExternalLink,
  Share2,
  Heart,
  ArrowLeft,
  Ticket,
  Shield,
  Info
} from 'lucide-react'

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  const router = useRouter()
  const { isConnected, user } = useWallet()
  const [isRegistering, setIsRegistering] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [ticketTier, setTicketTier] = useState<'general' | 'vip'>('general')
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const capacityPercent = getCapacityPercentage(event.registered, event.capacity)
  const isFull = isEventFull(event.registered, event.capacity)
  const canAccess = !event.isPrivate || (event.requiredBadge && user?.badges.includes(event.requiredBadge))

  const handleRegister = async () => {
    if (!isConnected) return
    
    setIsRegistering(true)
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRegistering(false)
    setShowSuccess(true)
  }

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SUIOVERFLOW') {
      setPromoApplied(true)
    }
  }

  const finalPrice = promoApplied ? Math.floor(event.price * 0.8) : event.price
  const vipPrice = finalPrice * 2.5

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to events
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Event Image */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-sui-blue/30 via-seal-purple/20 to-walrus-teal/30" />
                <div className="absolute inset-0 bg-bg-card" />
                
                {/* Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="event-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#event-grid)" />
                  </svg>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {event.isPrivate && (
                    <span className="px-3 py-1.5 bg-seal-purple rounded flex items-center gap-1.5 text-sm">
                      <Lock className="w-3.5 h-3.5" />
                      Private Event
                    </span>
                  )}
                  {event.organizer.verified && (
                    <span className="px-3 py-1.5 bg-walrus-teal text-bg-dark rounded flex items-center gap-1.5 text-sm">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Share/Save */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Event Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl opacity-30">
                    {event.tags[0] === 'Conference' && '🎤'}
                    {event.tags[0] === 'Workshop' && '💻'}
                    {event.tags[0] === 'DAO' && '🏛️'}
                    {event.tags[0] === 'NFT' && '🎨'}
                    {event.tags[0] === 'Education' && '📚'}
                    {event.tags[0] === 'Hackathon' && '⚡'}
                  </span>
                </div>
              </div>

              {/* Title and Organizer */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-sui-blue to-walrus-teal" />
                <div>
                  <p className="font-medium">{event.organizer.name}</p>
                  <p className="text-sm text-text-muted font-mono">{event.organizer.address}</p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-bg-card rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-sui-blue" />
                  <div>
                    <p className="text-sm text-text-muted">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-sui-blue" />
                  <div>
                    <p className="text-sm text-text-muted">Time</p>
                    <p className="font-medium">{event.time.split(' - ')[0]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sui-blue" />
                  <div>
                    <p className="text-sm text-text-muted">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-sui-blue" />
                  <div>
                    <p className="text-sm text-text-muted">Capacity</p>
                    <p className="font-medium">{formatCapacity(event.registered, event.capacity)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-text-muted leading-relaxed">{event.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
                {event.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-sm text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* What You'll Get */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h2 className="text-xl font-semibold mb-4">What You&apos;ll Receive</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Ticket className="w-5 h-5 text-sui-blue mt-0.5" />
                  <div>
                    <p className="font-medium">NFT Ticket</p>
                    <p className="text-sm text-text-muted">Verifiable on-chain ownership</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Lock className="w-5 h-5 text-seal-purple mt-0.5" />
                  <div>
                    <p className="font-medium">Encrypted Access</p>
                    <p className="text-sm text-text-muted">Private event details via Seal</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <Shield className="w-5 h-5 text-walrus-teal mt-0.5" />
                  <div>
                    <p className="font-medium">Attendance NFT</p>
                    <p className="text-sm text-text-muted">Proof of presence on check-in</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Walrus Storage Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card bg-walrus-teal/5 border-walrus-teal/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-walrus-teal/20 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-walrus-teal" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Stored on Walrus</h3>
                  <p className="text-sm text-text-muted mb-3">
                    Event metadata and media are permanently stored on Walrus decentralized storage.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-walrus-teal">Blob ID: {event.walrusBlobId}</span>
                    <button className="text-walrus-teal hover:underline text-sm">
                      View on Walrus →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Registration */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="card">
                {/* Private Event Warning */}
                {event.isPrivate && !canAccess && (
                  <div className="mb-4 p-3 bg-seal-purple/10 border border-seal-purple/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-seal-purple mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-seal-purple">Private Event</p>
                        <p className="text-xs text-text-muted mt-1">
                          Requires &quot;{event.requiredBadge}&quot; badge to register
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Capacity Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-muted">Registration</span>
                    <span className={capacityPercent >= 90 ? 'text-error' : 'text-white'}>
                      {capacityPercent}% Full
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        capacityPercent >= 90 ? 'bg-error' : 
                        capacityPercent >= 70 ? 'bg-locked' : 
                        'bg-walrus-teal'
                      }`}
                      style={{ width: `${capacityPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-2">
                    {event.capacity - event.registered} spots remaining
                  </p>
                </div>

                {/* Ticket Selection */}
                <div className="space-y-3 mb-6">
                  <label className="text-sm text-text-muted">Select Ticket</label>
                  
                  <button
                    onClick={() => setTicketTier('general')}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      ticketTier === 'general' 
                        ? 'border-sui-blue bg-sui-blue/10' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">General Admission</p>
                        <p className="text-sm text-text-muted">Standard access</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(finalPrice, event.currency)}</p>
                        {promoApplied && event.price > 0 && (
                          <p className="text-xs text-text-muted line-through">
                            {formatPrice(event.price, event.currency)}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setTicketTier('vip')}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      ticketTier === 'vip' 
                        ? 'border-seal-purple bg-seal-purple/10' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">VIP Access</p>
                        <p className="text-sm text-text-muted">Priority entry + exclusive perks</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-seal-purple">
                          {formatPrice(vipPrice, event.currency)}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Promo Code */}
                {event.price > 0 && (
                  <div className="mb-6">
                    <label className="text-sm text-text-muted mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="input flex-1"
                        disabled={promoApplied}
                      />
                      <button
                        onClick={applyPromoCode}
                        disabled={promoApplied || !promoCode}
                        className="btn btn-secondary"
                      >
                        {promoApplied ? '✓' : 'Apply'}
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-walrus-teal mt-2">20% discount applied!</p>
                    )}
                    <p className="text-xs text-text-muted mt-2">Try: SUIOVERFLOW</p>
                  </div>
                )}

                {/* Total */}
                <div className="flex justify-between items-center py-4 border-t border-white/10 mb-6">
                  <span className="text-text-muted">Total</span>
                  <span className="text-2xl font-bold">
                    {formatPrice(ticketTier === 'vip' ? vipPrice : finalPrice, event.currency)}
                  </span>
                </div>

                {/* Register Button */}
                {!isConnected ? (
                  <button className="w-full btn btn-primary py-4" disabled>
                    Connect Wallet to Register
                  </button>
                ) : isFull ? (
                  <button className="w-full btn btn-secondary py-4" disabled>
                    Event Full - Join Waitlist
                  </button>
                ) : !canAccess ? (
                  <button className="w-full btn btn-seal py-4" disabled>
                    Badge Required
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="w-full btn btn-primary py-4"
                  >
                    {isRegistering ? (
                      <>
                        <span className="animate-spin">⟳</span>
                        Minting Ticket...
                      </>
                    ) : (
                      <>
                        <Ticket className="w-5 h-5" />
                        Register Now
                      </>
                    )}
                  </button>
                )}

                {/* Info */}
                <div className="mt-4 flex items-start gap-2 text-xs text-text-muted">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    Your ticket NFT will be minted on Sui blockchain. 
                    Event details are encrypted via Seal and stored on Walrus.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-card border border-white/10 rounded-lg w-full max-w-md p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-walrus-teal/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-walrus-teal" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
              <p className="text-text-muted mb-6">
                Your NFT ticket has been minted. Check your tickets to view event details.
              </p>
              <div className="space-y-3">
                <Link href="/tickets" className="w-full btn btn-primary block">
                  View My Tickets
                </Link>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full btn btn-secondary"
                >
                  Stay on Page
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

