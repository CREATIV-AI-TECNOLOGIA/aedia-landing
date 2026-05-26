import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        ink: {
          950: '#09090B',
          900: '#0F0F12',
          800: '#18181B',
          700: '#27272A',
          600: '#3F3F46',
          500: '#52525B',
          400: '#71717A',
          300: '#A1A1AA',
          200: '#D4D4D8',
          100: '#F4F4F5',
          50:  '#FAFAFA',
        },
        aedia: {
          blue:  '#2563EB',
          indigo:'#4F46E5',
          cyan:  '#0EA5E9',
          accent:'#3B82F6',
        },
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      animation: {
        'count-up': 'countUp 1.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-up':  'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-in': 'slideIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'bar-grow': 'barGrow 1.2s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        countUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        barGrow: {
          from: { transform: 'scaleX(0)' },
          to:   { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
