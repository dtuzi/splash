'use client'

import { motion } from 'framer-motion'
import { mockUser, mockTickets, mockAttendanceNFTs } from '@/lib/mock-data'
import { useWallet } from '@/context/WalletContext'
import { formatAddress } from '@/lib/utils'
import { 
  User, 
  Wallet, 
  Trophy, 
  Ticket, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check,
  Lock,
  Settings,
  Bell,
  Shield
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const { isConnected, user, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (user?.address) {
      navigator.clipboard.writeText(user.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connect Wallet</h1>
          <p className="text-text-muted mb-6">Please connect your wallet to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-sui-blue via-seal-purple to-walrus-teal p-1">
              <div className="w-full h-full rounded-full bg-bg-card flex items-center justify-center">
                <User className="w-10 h-10 text-text-muted" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">{user?.displayName || 'Anonymous'}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <span className="font-mono text-text-muted">{formatAddress(user?.address || '')}</span>
                <button 
                  onClick={copyAddress}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4 text-text-muted" />
                  )}
                </button>
                <a href="#" className="p-1 hover:bg-white/10 rounded transition-colors">
                  <ExternalLink className="w-4 h-4 text-text-muted" />
                </a>
              </div>

              {/* Login Method */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-sm">
                {user?.loginMethod === 'zklogin' ? (
                  <>
                    <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                      <span className="text-[8px] font-bold text-black">G</span>
                    </div>
                    <span>zkLogin ({user.zkProvider})</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    <span>Sui Wallet</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="btn btn-secondary">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Link href="/tickets" className="card text-center hover:border-sui-blue transition-colors">
            <Ticket className="w-8 h-8 mx-auto mb-2 text-sui-blue" />
            <p className="text-2xl font-bold">{mockTickets.length}</p>
            <p className="text-sm text-text-muted">Tickets</p>
          </Link>
          <Link href="/attendance" className="card text-center hover:border-walrus-teal transition-colors">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-walrus-teal" />
            <p className="text-2xl font-bold">{mockAttendanceNFTs.length}</p>
            <p className="text-sm text-text-muted">Events Attended</p>
          </Link>
          <div className="card text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-2 text-seal-purple" />
            <p className="text-2xl font-bold">{user?.badges.length || 0}</p>
            <p className="text-sm text-text-muted">Badges</p>
          </div>
          <div className="card text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-locked" />
            <p className="text-2xl font-bold">
              {mockAttendanceNFTs.filter(n => n.isSoulbound).length}
            </p>
            <p className="text-sm text-text-muted">Soulbound</p>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          {user?.badges && user.badges.length > 0 ? (
            <div className="flex flex-wrap gap-3">
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
          ) : (
            <p className="text-text-muted">No badges earned yet</p>
          )}
          <p className="text-sm text-text-muted mt-4">
            Badges unlock access to private events and exclusive features
          </p>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {mockTickets.slice(0, 3).map((ticket, index) => (
              <div 
                key={ticket.id}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-sui-blue/20 flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-sui-blue" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Registered for {ticket.event.title}</p>
                  <p className="text-sm text-text-muted">{ticket.purchaseDate}</p>
                </div>
              </div>
            ))}
            {mockAttendanceNFTs.slice(0, 2).map((nft) => (
              <div 
                key={nft.id}
                className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-walrus-teal/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-walrus-teal" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Attended {nft.eventTitle}</p>
                  <p className="text-sm text-text-muted">{nft.mintedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-text-muted" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-text-muted">Receive updates about your events</p>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-sui-blue relative">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-text-muted" />
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-text-muted">Allow others to view your attendance</p>
                </div>
              </div>
              <button className="w-12 h-6 rounded-full bg-white/10 relative">
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button 
              onClick={disconnect}
              className="btn btn-secondary text-error border-error/30 hover:bg-error/10"
            >
              Disconnect Wallet
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


