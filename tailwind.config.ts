import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'sui-blue': '#3E8BFF',
        'sui-blue-hover': '#2C75E6',
        'walrus-teal': '#1EEFAE',
        'seal-purple': '#9D6CFF',
        
        // Backgrounds
        'bg-dark': '#0F1218',
        'bg-card': '#1A1F2B',
        'bg-card-hover': '#232938',
        
        // Text
        'text-main': '#FFFFFF',
        'text-muted': '#9CA3AF',
        'text-dark': '#0F1218',
        
        // Status
        'success': '#1EEFAE',
        'error': '#FF4D4D',
        'locked': '#FFB020',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
      },
      backgroundImage: {
        'gradient-sui': 'linear-gradient(to right, #3E8BFF, #1EEFAE)',
        'gradient-seal': 'linear-gradient(180deg, rgba(157, 108, 255, 0.05) 0%, #1A1F2B 100%)',
        'gradient-success': 'linear-gradient(180deg, rgba(30, 239, 174, 0.05) 0%, #1A1F2B 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(62, 139, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(62, 139, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config


