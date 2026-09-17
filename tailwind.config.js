/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        japan: {
          red: '#DC2626',
          crimson: '#E11D48',
          darkred: '#991B1B',
          lacquer: '#7F1D1D',
          glow: 'rgba(220, 38, 38, 0.35)',
        },
        obsidian: {
          950: '#050608',
          900: '#0a0c10',
          850: '#0f1217',
          800: '#151922',
          750: '#1b202b',
          700: '#232936',
        },
        silver: {
          100: '#F8FAFC',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'carbon-pattern': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(5,6,8,0.3) 0%, rgba(5,6,8,0.85) 70%, #050608 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
