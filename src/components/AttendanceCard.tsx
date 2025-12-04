'use client'

import { AttendanceNFT } from '@/lib/types'
import { Check, ExternalLink, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

interface AttendanceCardProps {
  nft: AttendanceNFT
  index?: number
}

export default function AttendanceCard({ nft, index = 0 }: AttendanceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div className="card border-walrus-teal text-center hover:glow-walrus transition-all duration-300">
        {/* NFT Image */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-walrus-teal flex items-center justify-center relative">
          <Check className="w-10 h-10 text-bg-dark" strokeWidth={3} />
          
          {/* Soulbound indicator */}
          {nft.isSoulbound && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-seal-purple rounded-full flex items-center justify-center border-2 border-bg-card">
              <Shield className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Event Title */}
        <h3 className="font-semibold text-lg mb-1">{nft.eventTitle}</h3>
        
        {/* Mint Date */}
        <p className="font-mono text-xs text-text-muted mb-2">
          Minted: {nft.mintedAt}
        </p>

        {/* Soulbound Badge */}
        {nft.isSoulbound && (
          <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-seal-purple/20 text-seal-purple rounded text-xs mb-3">
            <Shield className="w-3 h-3" />
            Soulbound
          </div>
        )}

        {/* Metadata */}
        <div className="text-xs text-text-muted space-y-1">
          <p>Check-in: {nft.metadata.checkInTime}</p>
          <p>Verified by: {nft.metadata.verifiedBy}</p>
        </div>

        {/* View on Explorer */}
        <button className="mt-4 w-full btn btn-secondary text-xs py-2">
          <ExternalLink className="w-3 h-3" />
          View on Sui Explorer
        </button>
      </div>
    </motion.div>
  )
}


