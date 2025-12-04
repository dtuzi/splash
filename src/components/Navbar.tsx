'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useWallet } from '@/context/WalletContext'
import { formatAddress, getBasePath } from '@/lib/utils'
import { Menu, X, Ticket, Calendar, User, LogOut, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { user, isConnected, isConnecting, connect, disconnect } = useWallet()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletMenuOpen, setWalletMenuOpen] = useState(false)
  const [connectModalOpen, setConnectModalOpen] = useState(false)
  const basePath = getBasePath()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src={`${basePath}/splash-icon.svg`} 
                alt="Splash" 
                width={32} 
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-lg tracking-wide">Splash</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/events" className="text-text-muted hover:text-white transition-colors">
                Discover
              </Link>
              <Link href="/create" className="text-text-muted hover:text-white transition-colors">
                Create Event
              </Link>
              {isConnected && (
                <>
                  <Link href="/tickets" className="text-text-muted hover:text-white transition-colors">
                    My Tickets
                  </Link>
                  <Link href="/dashboard" className="text-text-muted hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </>
              )}
            </div>

            {/* Wallet Connection */}
            <div className="hidden md:flex items-center gap-4">
              {isConnected ? (
                <div className="relative">
                  <button
                    onClick={() => setWalletMenuOpen(!walletMenuOpen)}
                    className="flex items-center gap-2 bg-bg-card border border-white/10 rounded-sm px-4 py-2 hover:bg-bg-card-hover transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-sui-blue to-walrus-teal" />
                    <span className="font-mono text-sm">{formatAddress(user?.address || '')}</span>
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  </button>

                  <AnimatePresence>
                    {walletMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-bg-card border border-white/10 rounded-md overflow-hidden shadow-xl"
                      >
                        <div className="p-4 border-b border-white/10">
                          <p className="text-sm text-text-muted">Connected via</p>
                          <p className="font-medium">
                            {user?.loginMethod === 'zklogin' ? `zkLogin (${user.zkProvider})` : 'Sui Wallet'}
                          </p>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/tickets"
                            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 transition-colors"
                            onClick={() => setWalletMenuOpen(false)}
                          >
                            <Ticket className="w-4 h-4 text-text-muted" />
                            <span>My Tickets ({user?.ticketsOwned})</span>
                          </Link>
                          <Link
                            href="/attendance"
                            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 transition-colors"
                            onClick={() => setWalletMenuOpen(false)}
                          >
                            <Calendar className="w-4 h-4 text-text-muted" />
                            <span>Attendance NFTs ({user?.eventsAttended})</span>
                          </Link>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 transition-colors"
                            onClick={() => setWalletMenuOpen(false)}
                          >
                            <User className="w-4 h-4 text-text-muted" />
                            <span>Profile</span>
                          </Link>
                          <button
                            onClick={() => {
                              disconnect()
                              setWalletMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 transition-colors text-error"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Disconnect</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-walrus-teal animate-pulse hidden sm:block">
                    This is a demo with mock data. Click connect to see more, no wallet required →
                  </span>
                  <button
                    onClick={() => setConnectModalOpen(true)}
                    disabled={isConnecting}
                    className="btn btn-primary"
                  >
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg-card border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-3">
                <Link
                  href="/events"
                  className="block py-2 text-text-muted hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Discover Events
                </Link>
                <Link
                  href="/create"
                  className="block py-2 text-text-muted hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Event
                </Link>
                {isConnected && (
                  <>
                    <Link
                      href="/tickets"
                      className="block py-2 text-text-muted hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Tickets
                    </Link>
                    <Link
                      href="/dashboard"
                      className="block py-2 text-text-muted hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                <div className="pt-4 border-t border-white/10">
                  {isConnected ? (
                    <button
                      onClick={() => {
                        disconnect()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full btn btn-secondary text-error"
                    >
                      Disconnect Wallet
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setConnectModalOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className="w-full btn btn-primary"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Connect Wallet Modal */}
      <AnimatePresence>
        {connectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setConnectModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-bg-card border border-white/10 rounded-lg w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold">Connect to Splash</h2>
                <p className="text-text-muted text-sm mt-1">Choose your preferred connection method</p>
              </div>

              <div className="p-6 space-y-3">
                {/* Sui Wallet */}
                <button
                  onClick={() => {
                    connect('wallet')
                    setConnectModalOpen(false)
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-bg-card-hover border border-white/10 rounded-md hover:border-sui-blue transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-sui-blue flex items-center justify-center">
                    <span className="font-bold">S</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Sui Wallet</p>
                    <p className="text-sm text-text-muted">Connect with browser extension</p>
                  </div>
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-bg-card text-text-muted">or continue with zkLogin</span>
                  </div>
                </div>

                {/* zkLogin Options */}
                <button
                  onClick={() => {
                    connect('zklogin', 'google')
                    setConnectModalOpen(false)
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </button>

                <button
                  onClick={() => {
                    connect('zklogin', 'facebook')
                    setConnectModalOpen(false)
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-[#1877F2] text-white rounded-md hover:bg-[#166FE5] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium">Continue with Facebook</span>
                </button>

                <button
                  onClick={() => {
                    connect('zklogin', 'twitch')
                    setConnectModalOpen(false)
                  }}
                  className="w-full flex items-center gap-4 p-4 bg-[#9146FF] text-white rounded-md hover:bg-[#7C3AED] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                  </svg>
                  <span className="font-medium">Continue with Twitch</span>
                </button>
              </div>

              <div className="px-6 pb-6">
                <p className="text-xs text-text-muted text-center">
                  By connecting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


