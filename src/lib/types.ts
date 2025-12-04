export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  registered: number
  price: number
  currency: string
  image: string
  isPrivate: boolean
  requiredBadge?: string
  organizer: {
    name: string
    address: string
    verified: boolean
  }
  walrusBlobId: string
  tags: string[]
  status: 'upcoming' | 'live' | 'ended'
}

export interface Ticket {
  id: string
  ticketNumber: string
  eventId: string
  event: Event
  holder: string
  purchaseDate: string
  isEncrypted: boolean
  isUsed: boolean
  tier: 'general' | 'vip' | 'speaker'
  secretData?: {
    location: string
    gateCode: string
    specialInstructions?: string
  }
  qrCode?: string
  walrusBlobId: string
}

export interface AttendanceNFT {
  id: string
  eventId: string
  eventTitle: string
  holder: string
  mintedAt: string
  image: string
  isSoulbound: boolean
  metadata: {
    checkInTime: string
    verifiedBy: string
  }
}

export interface User {
  address: string
  displayName: string
  isConnected: boolean
  loginMethod: 'wallet' | 'zklogin'
  zkProvider?: 'google' | 'facebook' | 'twitch'
  badges: string[]
  eventsAttended: number
  ticketsOwned: number
}

export interface OrganizerStats {
  totalEvents: number
  totalTicketsSold: number
  totalRevenue: number
  totalCheckIns: number
  averageAttendance: number
}


