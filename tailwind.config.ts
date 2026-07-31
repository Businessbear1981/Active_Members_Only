import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0a0a0a',
        ivory:    '#f5f0e8',
        brass:    '#C9A84C',
        charcoal: '#1a1a1a',
        mist:     'rgba(245,240,232,0.07)',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans:  ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
