import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}','./src/components/**/*.{js,ts,jsx,tsx,mdx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#F5A623', light: '#FFBE4D', dark: '#D4891A' },
        charcoal: '#2B2B2B',
      },
      fontFamily: {
        display: ['Bebas Neue', 'serif'],
        body: ['Barlow', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
