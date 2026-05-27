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
        gold: {
          DEFAULT: '#F5A623',
          light: '#FFBE4D',
          dark: '#D4891A',
        },
        charcoal: '#2B2B2B',
        brand: {
          black: '#0A0A0A',
          dark1: '#111111',
          dark2: '#1A1A1A',
          dark3: '#242424',
          dark4: '#2E2E2E',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'serif'],
        body: ['Barlow', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        'pulse-dot': 'pulse-dot 2s infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
