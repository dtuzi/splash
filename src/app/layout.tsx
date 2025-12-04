import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { WalletProvider } from '@/context/WalletContext'

// Get basePath for GitHub Pages deployment
function getBasePath() {
  if (process.env.GITHUB_PAGES === 'true') {
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'splash'
    return `/${repoName}`
  }
  return ''
}

const basePath = getBasePath()

export const metadata: Metadata = {
  title: 'Splash | Decentralized Event Ticketing',
  description: 'A decentralized event and ticketing platform powered by Sui, Walrus, Seal, and zkLogin. Create events, mint NFT tickets, and verify attendance on-chain.',
  icons: {
    icon: `${basePath}/splash-icon.svg`,
    apple: `${basePath}/splash-icon.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <WalletProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  )
}


