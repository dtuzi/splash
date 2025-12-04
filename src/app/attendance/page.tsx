'use client'

import { motion } from 'framer-motion'
import { mockAttendanceNFTs } from '@/lib/mock-data'
import { useWallet } from '@/context/WalletContext'
import AttendanceCard from '@/components/AttendanceCard'
import { Trophy, Shield, Sparkles, Lock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function AttendancePage() {
  const { isConnected, user } = useWallet()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Wallet</h1>
          <p className="text-text-muted mb-6">Please connect your wallet to view your attendance history</p>
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
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-walrus-teal/20 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-walrus-teal" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Attendance History</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Your verified on-chain proof of attendance. These NFTs represent events 
            you&apos;ve attended and can be used for airdrops, loyalty rewards, and reputation building.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
        >
          <div className="card text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-walrus-teal" />
            <p className="text-2xl font-bold">{mockAttendanceNFTs.length}</p>
            <p className="text-sm text-text-muted">Events Attended</p>
          </div>
          <div className="card text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-seal-purple" />
            <p className="text-2xl font-bold">
              {mockAttendanceNFTs.filter(n => n.isSoulbound).length}
            </p>
            <p className="text-sm text-text-muted">Soulbound</p>
          </div>
          <div className="card text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-sui-blue" />
            <p className="text-2xl font-bold">{user?.badges.length || 0}</p>
            <p className="text-sm text-text-muted">Badges Earned</p>
          </div>
        </motion.div>

        {/* NFT Grid */}
        {mockAttendanceNFTs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-6">Your Attendance NFTs</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockAttendanceNFTs.map((nft, index) => (
                <AttendanceCard key={nft.id} nft={nft} index={index} />
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <h3 className="text-xl font-semibold mb-2">No attendance NFTs yet</h3>
            <p className="text-text-muted mb-6">
              Attend events and check in to earn attendance NFTs
            </p>
            <Link href="/events" className="btn btn-primary">
              Find Events
            </Link>
          </div>
        )}

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mt-12"
        >
          <div className="card bg-walrus-teal/5 border-walrus-teal/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-walrus-teal/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-walrus-teal" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Proof of Attendance</h3>
                <p className="text-sm text-text-muted">
                  Each NFT proves you physically or virtually attended an event. 
                  Verified through QR scan at the venue and recorded on Sui blockchain.
                </p>
              </div>
            </div>
          </div>

          <div className="card bg-seal-purple/5 border-seal-purple/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-seal-purple/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-seal-purple" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Soulbound NFTs</h3>
                <p className="text-sm text-text-muted">
                  Soulbound attendance NFTs cannot be transferred. They&apos;re permanently 
                  tied to your wallet, making them ideal for reputation and eligibility verification.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Badges Section */}
        {user?.badges && user.badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-xl font-semibold mb-6">Your Badges</h2>
            <div className="flex flex-wrap gap-4">
              {user.badges.map((badge) => (
                <div 
                  key={badge}
                  className="px-4 py-2 bg-sui-blue/10 border border-sui-blue/30 rounded-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-sui-blue" />
                  <span className="font-medium">{badge}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-text-muted mt-4">
              Badges are earned through attendance and participation in the Sui ecosystem.
            </p>
          </motion.div>
        )}

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-bg-card border border-white/10 rounded-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">Share Your Attendance</h3>
              <p className="text-sm text-text-muted">
                Export or share your verified attendance history with third parties
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn btn-secondary">
                <ExternalLink className="w-4 h-4" />
                View on Explorer
              </button>
              <button className="btn btn-primary">
                Share Profile
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


