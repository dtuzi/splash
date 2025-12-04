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


