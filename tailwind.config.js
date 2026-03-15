/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Share Tech Mono', 'monospace'],
        sans: ['Syne', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#050810',
          800: '#090d1a',
          700: '#0b1020',
          600: '#1a2240',
          500: '#2a3560',
        },
        layer: {
          physical:     '#ff3b5c',
          datalink:     '#ff7b2f',
          network:      '#ffcc00',
          transport:    '#39e87a',
          session:      '#00c4ff',
          presentation: '#7b6aff',
          application:  '#e040fb',
        }
      },
      keyframes: {
        scan: {
          '0%':   { top: '0%' },
          '100%': { top: '100%' },
        }
      },
      animation: {
        scan: 'scan 2s linear infinite',
      }
    },
  },
  plugins: [],
}