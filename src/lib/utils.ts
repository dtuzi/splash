import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatAddress(address: string): string {
  if (address.length <= 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatPrice(price: number, currency: string): string {
  if (price === 0) return 'Free'
  return `${price} ${currency}`
}

export function formatCapacity(registered: number, capacity: number): string {
  return `${registered}/${capacity}`
}

export function getCapacityPercentage(registered: number, capacity: number): number {
  return Math.round((registered / capacity) * 100)
}

export function isEventFull(registered: number, capacity: number): boolean {
  return registered >= capacity
}

/**
 * Get the basePath for the application
 * Works in both server and client components
 */
export function getBasePath(): string {
  // Server-side: check environment variable
  if (typeof window === 'undefined') {
    if (process.env.GITHUB_PAGES === 'true') {
      const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'splash'
      return `/${repoName}`
    }
    return ''
  }
  
  // Client-side: detect from URL or use known repo name
  // For GitHub Pages, check if pathname starts with repo name
  const pathname = window.location.pathname
  const repoName = 'splash' // Known repo name for this project
  
  // If pathname starts with /splash, we're on GitHub Pages
  if (pathname.startsWith(`/${repoName}/`) || pathname === `/${repoName}`) {
    return `/${repoName}`
  }
  
  // Also check if we're on github.io domain (more reliable)
  if (window.location.hostname.includes('github.io')) {
    return `/${repoName}`
  }
  
  return ''
}


