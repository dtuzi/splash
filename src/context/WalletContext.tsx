'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '@/lib/types'
import { mockUser } from '@/lib/mock-data'

interface WalletContextType {
  user: User | null
  isConnected: boolean
  isConnecting: boolean
  connect: (method: 'wallet' | 'zklogin', provider?: 'google' | 'facebook' | 'twitch') => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = (method: 'wallet' | 'zklogin', provider?: 'google' | 'facebook' | 'twitch') => {
    setIsConnecting(true)
    // Simulate connection delay
    setTimeout(() => {
      setUser({
        ...mockUser,
        loginMethod: method,
        zkProvider: provider,
      })
      setIsConnecting(false)
    }, 1000)
  }

  const disconnect = () => {
    setUser(null)
  }

  return (
    <WalletContext.Provider
      value={{
        user,
        isConnected: !!user,
        isConnecting,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}


