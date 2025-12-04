import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/splash-icon.svg" 
                alt="Splash" 
                width={32} 
                height={32}
                className="w-8 h-8"
              />
              <span className="font-bold text-lg">Splash</span>
            </div>
            <p className="text-text-muted text-sm">
              Decentralized event ticketing powered by Sui, Walrus, Seal, and zkLogin.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-text-muted hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-text-muted hover:text-white text-sm transition-colors">
                  Discover Events
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-text-muted hover:text-white text-sm transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="text-text-muted hover:text-white text-sm transition-colors">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-text-muted hover:text-white text-sm transition-colors">
                  Organizer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold mb-4">Powered By</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://sui.io" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-sui-blue text-sm transition-colors">
                  Sui Network
                </a>
              </li>
              <li>
                <a href="https://walrus.xyz" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-walrus-teal text-sm transition-colors">
                  Walrus Storage
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-seal-purple text-sm transition-colors">
                  Seal Encryption
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">
                  zkLogin
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">
                  Smart Contracts
                </a>
              </li>
              <li>
                <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">
                  Brand Assets
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            Open source under MIT License.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-text-muted hover:text-white text-sm transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


