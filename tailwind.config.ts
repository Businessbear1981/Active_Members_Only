import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surface (luxury/opulent)
        midnight: '#0a0a0a',
        ivory:    '#f5f0e8',
        brass:    '#C9A84C',
        charcoal: '#1a1a1a',
        mist:     'rgba(245,240,232,0.07)',
        // Streets (grimy/rugged)
        'streets-bg':     '#1A1A2E',
        'streets-purple': '#9D00FF',
        'streets-cyan':   '#00F5FF',
        // VIP Sanctum (ominous/after-hours)
        'vip-bg':      '#050505',
        'vip-crimson': '#5C1A1A',
        'vip-amber':   '#8A6A2F',
        'vip-ivory':   '#C9C2B8',
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
