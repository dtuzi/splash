'use client'

import Link from 'next/link'
import { Ticket } from '@/lib/types'
import { Lock, Unlock, Calendar, MapPin, QrCode, Download, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface TicketCardProps {
  ticket: Ticket
  index?: number
}

export default function TicketCard({ ticket, index = 0 }: TicketCardProps) {
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(!ticket.isEncrypted)

  const handleDecrypt = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDecrypting(true)
    // Simulate decryption delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsDecrypted(true)
    setIsDecrypting(false)
  }

  const tierColors = {
    general: 'border-white/10',
    vip: 'border-seal-purple',
    speaker: 'border-walrus-teal',
  }

  const tierLabels = {
    general: 'General Admission',
    vip: 'VIP Access',
    speaker: 'Speaker Pass',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div 
        className={`card relative overflow-hidden ${tierColors[ticket.tier]} ${
          isDecrypted 
            ? 'bg-gradient-success border-success' 
            : 'bg-gradient-seal'
        }`}
      >
        {/* Ticket Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-text-muted">TICKET #{ticket.ticketNumber}</span>
            <span className={`px-2 py-0.5 rounded text-xs ${
              ticket.tier === 'vip' ? 'bg-seal-purple/20 text-seal-purple' :
              ticket.tier === 'speaker' ? 'bg-walrus-teal/20 text-walrus-teal' :
              'bg-white/10 text-text-muted'
            }`}>
              {tierLabels[ticket.tier]}
            </span>
          </div>
          
          <div className={`flex items-center gap-1.5 text-xs uppercase tracking-wide ${
            isDecrypted ? 'text-success' : 'text-seal-purple'
          }`}>
            {isDecrypted ? (
              <>
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlocked</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted</span>
              </>
            )}
          </div>
        </div>

        {/* Event Info */}
        <Link href={`/events/${ticket.eventId}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-sui-blue transition-colors">
            {ticket.event.title}
          </h3>
        </Link>

        <div className="flex items-center gap-4 text-text-muted text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{ticket.event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{ticket.event.location}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[140px]">
          {isDecrypted ? (
            // Decrypted Content
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {ticket.secretData && (
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-text-muted">Location:</span>{' '}
                    <span className="text-white">{ticket.secretData.location}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-text-muted">Gate Code:</span>{' '}
                    <span className="font-mono text-walrus-teal">{ticket.secretData.gateCode}</span>
                  </p>
                  {ticket.secretData.specialInstructions && (
                    <p className="text-sm text-text-muted">
                      {ticket.secretData.specialInstructions}
                    </p>
                  )}
                </div>
              )}

              {/* QR Code Placeholder */}
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-black via-black to-gray-800 rounded" 
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 5px, #fff 5px, #fff 10px)`,
                      backgroundSize: '14px 14px'
                    }}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <button className="w-full btn btn-secondary text-sm py-2">
                    <QrCode className="w-4 h-4" />
                    Full Screen QR
                  </button>
                  <button className="w-full btn btn-walrus text-sm py-2">
                    <Download className="w-4 h-4" />
                    Add to Calendar
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            // Encrypted Content
            <>
              <div className="blur-content space-y-2">
                <p className="text-sm">Location: 123 Blockchain Blvd</p>
                <p className="text-sm">Gate Code: XXXX-XXX</p>
                <div className="w-24 h-24 bg-white/20 rounded" />
              </div>

              {/* Decrypt Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg-dark/60 backdrop-blur-sm rounded">
                <Lock className="w-8 h-8 text-seal-purple mb-3" />
                <p className="text-sm text-text-muted mb-4">Content encrypted by Seal</p>
                <button 
                  onClick={handleDecrypt}
                  disabled={isDecrypting}
                  className="btn btn-seal"
                >
                  {isDecrypting ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      Verify & Decrypt
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Ticket Footer */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ExternalLink className="w-3 h-3" />
            <span className="font-mono">Walrus: {ticket.walrusBlobId}</span>
          </div>
          <Link 
            href={`/tickets/${ticket.id}`}
            className="text-xs text-sui-blue hover:underline"
          >
            View Details →
          </Link>
        </div>

        {/* Used indicator */}
        {ticket.isUsed && (
          <div className="absolute inset-0 bg-bg-dark/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-success font-semibold">Ticket Used</p>
              <p className="text-text-muted text-sm">Checked in successfully</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}


