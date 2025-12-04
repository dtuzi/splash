# Splash

A decentralized event registration and ticketing platform powered by **Sui**, **Walrus**, **Seal**, and **zkLogin**.

![Splash](https://img.shields.io/badge/Built%20on-Sui-3E8BFF?style=flat-square)
![Walrus](https://img.shields.io/badge/Storage-Walrus-1EEFAE?style=flat-square)
![Seal](https://img.shields.io/badge/Encryption-Seal-9D6CFF?style=flat-square)
![zkLogin](https://img.shields.io/badge/Auth-zkLogin-FFFFFF?style=flat-square)

> ⚠️ **Note:** This is a user interface/experience demo with mock data still, backend integrations to smart contracts and Walrus storage have not been integrated yet.

## Overview

Splash enables:

- **For Organizers**: Transparent, verifiable event data and participant history
- **For Users**: True ownership of tickets, private encrypted access, and reputation-building through attendance
- **For Ecosystems**: Event participation becomes composable data for airdrops, loyalty, and engagement insights

## Features

### Event Creation & Registration
- Create events with metadata stored on Walrus
- zkLogin support for easy user onboarding
- Optional approval flow for limited-capacity events
- Flexible ticket parameters (price, capacity, visibility)
- ICS calendar file integration

### NFT Ticketing
- Ticket NFTs minted on Sui blockchain
- Encrypted metadata (location, QR code) via Seal
- Only ticket holders can decrypt and view details
- Dynamic updates for status and attendance

### Attendance Verification
- QR-based check-in at venues
- Soulbound attendance NFTs minted on check-in
- Proof of attendance for airdrops and loyalty rewards

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dtuzi/splash.git
cd splash

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/Landing page
│   ├── events/            # Event discovery & detail pages
│   ├── create/            # Event creation wizard
│   ├── tickets/           # User's tickets
│   ├── dashboard/         # Organizer dashboard
│   ├── checkin/           # Check-in scanner
│   ├── attendance/        # Attendance NFTs
│   └── profile/           # User profile
├── components/            # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── EventCard.tsx
│   ├── TicketCard.tsx
│   └── AttendanceCard.tsx
├── context/               # React contexts
│   └── WalletContext.tsx  # Wallet connection state
└── lib/                   # Utilities and data
    ├── types.ts           # TypeScript interfaces
    ├── mock-data.ts       # Mock data for development
    └── utils.ts           # Helper functions
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and CTA |
| `/events` | Event discovery with search and filters |
| `/events/[id]` | Event details and registration |
| `/create` | Multi-step event creation wizard |
| `/tickets` | User's NFT tickets (encrypted/decrypted states) |
| `/dashboard` | Organizer analytics and management |
| `/checkin` | QR scanner for attendance verification |
| `/attendance` | User's attendance NFT collection |
| `/profile` | User profile and settings |


### Colors
- **Sui Blue**: `#3E8BFF` - Primary actions, links
- **Walrus Teal**: `#1EEFAE` - Success, storage indicators
- **Seal Purple**: `#9D6CFF` - Encryption, private content
- **Background Dark**: `#0F1218` - Main background
- **Card Surface**: `#1A1F2B` - Card backgrounds

### Typography
- **Sans**: Inter - Main text
- **Mono**: JetBrains Mono - Addresses, codes

## Mock Data

The application uses mock data for demonstration. In production, this would be replaced with:

- Sui smart contract interactions
- Walrus blob storage
- Seal encryption/decryption
- zkLogin authentication

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [Sui Network](https://sui.io)
- [Walrus Storage](https://walrus.xyz)
- [Seal Encryption](https://github.com/MystenLabs/seal)


