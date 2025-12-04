'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { mockEvents } from '@/lib/mock-data'
import EventCard from '@/components/EventCard'
import { 
  Ticket, 
  Shield, 
  QrCode, 
  Wallet, 
  Globe, 
  Lock,
  ArrowRight,
  Zap,
  Database,
  Users
} from 'lucide-react'

export default function HomePage() {
  const featuredEvents = mockEvents.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-bg-dark">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sui-blue/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-walrus-teal/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-seal-purple/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-walrus-teal rounded-full animate-pulse" />
              <span className="text-sm text-text-muted">Built on Sui • Walrus • Seal • zkLogin</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Decentralized</span>
              <br />
              Event Ticketing
            </h1>

            <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
              Create events, mint verifiable NFT tickets, and build attendance reputation. 
              Powered by Sui smart contracts, storage by Walrus, with encrypted access via Seal and seamless onboarding with zkLogin.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/events" className="btn btn-primary text-lg px-8 py-4">
                Explore Events
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/create" className="btn btn-secondary text-lg px-8 py-4">
                Create Event
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
            >
              <div>
                <div className="text-3xl font-bold text-sui-blue">1.2K+</div>
                <div className="text-sm text-text-muted">Events Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-walrus-teal">50K+</div>
                <div className="text-sm text-text-muted">Tickets Minted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-seal-purple">25K+</div>
                <div className="text-sm text-text-muted">Attendees</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              A seamless experience from event creation to attendance verification
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Wallet,
                title: 'Connect',
                description: 'Sign in with Sui Wallet or zkLogin (Google, Facebook, Twitch)',
                color: 'sui-blue',
              },
              {
                icon: Ticket,
                title: 'Register',
                description: 'Browse events and mint your NFT ticket on the Sui blockchain',
                color: 'walrus-teal',
              },
              {
                icon: Lock,
                title: 'Access',
                description: 'Decrypt ticket details using Seal. Only you can view the content',
                color: 'seal-purple',
              },
              {
                icon: QrCode,
                title: 'Attend',
                description: 'Scan QR at venue to verify attendance and mint proof NFT',
                color: 'walrus-teal',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-${step.color}/20 flex items-center justify-center`}>
                  <step.icon className={`w-8 h-8 text-${step.color}`} />
                </div>
                <div className="text-sm text-text-muted mb-2">Step {index + 1}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-text-muted">Discover the latest events in the Sui ecosystem</p>
            </div>
            <Link href="/events" className="btn btn-secondary">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for the <span className="gradient-text">Web3 Era</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Leveraging the best of Sui, Walrus, Seal, and zkLogin for a trustless event experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Verifiable Tickets',
                description: 'NFT tickets on Sui blockchain provide cryptographic proof of ownership and authenticity.',
                gradient: 'from-sui-blue/20 to-transparent',
              },
              {
                icon: Lock,
                title: 'Encrypted Access',
                description: 'Seal encryption ensures only ticket holders can decrypt event details like location and QR codes.',
                gradient: 'from-seal-purple/20 to-transparent',
              },
              {
                icon: Database,
                title: 'Decentralized Storage',
                description: 'Event metadata and media stored on Walrus for permanent, censorship-resistant access.',
                gradient: 'from-walrus-teal/20 to-transparent',
              },
              {
                icon: Globe,
                title: 'zkLogin Support',
                description: 'Onboard users with familiar social logins while maintaining self-custody via zkLogin.',
                gradient: 'from-sui-blue/20 to-transparent',
              },
              {
                icon: Users,
                title: 'Attendance NFTs',
                description: 'Build on-chain reputation with soulbound attendance NFTs for loyalty and airdrops.',
                gradient: 'from-walrus-teal/20 to-transparent',
              },
              {
                icon: Zap,
                title: 'Instant Finality',
                description: 'Sui\'s sub-second finality means instant ticket minting and verification.',
                gradient: 'from-seal-purple/20 to-transparent',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card bg-gradient-to-br ${feature.gradient} hover:border-white/20 transition-colors`}
              >
                <feature.icon className="w-10 h-10 mb-4 text-white/80" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-muted text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-sui-blue via-seal-purple to-walrus-teal opacity-20" />
            <div className="absolute inset-0 bg-bg-card/90" />
            
            {/* Content */}
            <div className="relative px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to host your event on-chain?
              </h2>
              <p className="text-text-muted mb-8 max-w-xl mx-auto">
                Join the future of event management. Create verifiable, encrypted, 
                and truly owned event experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create" className="btn btn-primary text-lg px-8 py-4">
                  Create Your First Event
                </Link>
                <a href="#" className="btn btn-secondary text-lg px-8 py-4">
                  Read Documentation
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-text-muted text-sm mb-8">Powered by</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sui-blue flex items-center justify-center">
                <span className="font-bold">S</span>
              </div>
              <span className="font-semibold">Sui Network</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-walrus-teal flex items-center justify-center text-bg-dark">
                <span className="font-bold">W</span>
              </div>
              <span className="font-semibold">Walrus Storage</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-seal-purple flex items-center justify-center">
                <span className="font-bold">S</span>
              </div>
              <span className="font-semibold">Seal Encryption</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-bg-dark">
                <span className="font-bold">zk</span>
              </div>
              <span className="font-semibold">zkLogin</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


