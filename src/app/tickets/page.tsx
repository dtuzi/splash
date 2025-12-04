'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { mockTickets, mockAttendanceNFTs } from '@/lib/mock-data'
import { useWallet } from '@/context/WalletContext'
import TicketCard from '@/components/TicketCard'
import AttendanceCard from '@/components/AttendanceCard'
import { Ticket, Trophy, Lock, QrCode } from 'lucide-react'
import Link from 'next/link'

type TabType = 'tickets' | 'attendance'

export default function TicketsPage() {
  const { isConnected, user } = useWallet()
  const [activeTab, setActiveTab] = useState<TabType>('tickets')

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Wallet</h1>
          <p className="text-text-muted mb-6">Please connect your wallet to view your tickets</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">My Tickets</h1>
          <p className="text-text-muted">
            View your NFT tickets and attendance history. All stored on Sui blockchain.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card text-center">
            <Ticket className="w-8 h-8 mx-auto mb-2 text-sui-blue" />
            <p className="text-2xl font-bold">{mockTickets.length}</p>
            <p className="text-sm text-text-muted">Active Tickets</p>
          </div>
          <div className="card text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-walrus-teal" />
            <p className="text-2xl font-bold">{mockAttendanceNFTs.length}</p>
            <p className="text-sm text-text-muted">Events Attended</p>
          </div>
          <div className="card text-center">
            <Lock className="w-8 h-8 mx-auto mb-2 text-seal-purple" />
            <p className="text-2xl font-bold">{mockTickets.filter(t => t.isEncrypted).length}</p>
            <p className="text-sm text-text-muted">Encrypted</p>
          </div>
          <div className="card text-center">
            <QrCode className="w-8 h-8 mx-auto mb-2 text-text-muted" />
            <p className="text-2xl font-bold">{mockTickets.filter(t => t.isUsed).length}</p>
            <p className="text-sm text-text-muted">Used</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 mb-8 border-b border-white/10"
        >
          <button
            onClick={() => setActiveTab('tickets')}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === 'tickets' ? 'text-white' : 'text-text-muted hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              My Tickets
              <span className="px-2 py-0.5 rounded-full bg-sui-blue/20 text-sui-blue text-xs">
                {mockTickets.length}
              </span>
            </div>
            {activeTab === 'tickets' && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-sui-blue"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === 'attendance' ? 'text-white' : 'text-text-muted hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Attendance NFTs
              <span className="px-2 py-0.5 rounded-full bg-walrus-teal/20 text-walrus-teal text-xs">
                {mockAttendanceNFTs.length}
              </span>
            </div>
            {activeTab === 'attendance' && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-walrus-teal"
              />
            )}
          </button>
        </motion.div>

        {/* Content */}
        {activeTab === 'tickets' ? (
          <div className="space-y-8">
            {mockTickets.length > 0 ? (
              <>
                {/* Upcoming Events */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {mockTickets.filter(t => !t.isUsed).map((ticket, index) => (
                      <TicketCard key={ticket.id} ticket={ticket} index={index} />
                    ))}
                  </div>
                </div>

                {/* Used Tickets */}
                {mockTickets.some(t => t.isUsed) && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Past Events</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {mockTickets.filter(t => t.isUsed).map((ticket, index) => (
                        <TicketCard key={ticket.id} ticket={ticket} index={index} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <Ticket className="w-16 h-16 mx-auto text-text-muted mb-4" />
                <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
                <p className="text-text-muted mb-6">
                  Register for events to receive NFT tickets
                </p>
                <Link href="/events" className="btn btn-primary">
                  Browse Events
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>
            {mockAttendanceNFTs.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockAttendanceNFTs.map((nft, index) => (
                  <AttendanceCard key={nft.id} nft={nft} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Trophy className="w-16 h-16 mx-auto text-text-muted mb-4" />
                <h3 className="text-xl font-semibold mb-2">No attendance NFTs</h3>
                <p className="text-text-muted mb-6">
                  Attend events and check in to earn attendance NFTs
                </p>
                <Link href="/events" className="btn btn-primary">
                  Find Events
                </Link>
              </div>
            )}

            {/* Attendance Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 p-6 bg-walrus-teal/5 border border-walrus-teal/20 rounded-lg"
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-walrus-teal" />
                About Attendance NFTs
              </h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>• Proof of attendance minted when you check in at events</li>
                <li>• Soulbound NFTs cannot be transferred</li>
                <li>• Build reputation for airdrops and loyalty rewards</li>
                <li>• Verifiable on-chain attendance history</li>
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}


