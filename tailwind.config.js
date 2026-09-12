/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        love: {
          50: '#fff5f7',
          100: '#ffe6ec',
          200: '#fccdd9',
          300: '#f8a5ba',
          400: '#f37194',
          500: '#e94572',
          600: '#d52656',
          700: '#b31943',
          800: '#94173b',
          900: '#7d1836',
          950: '#48071a',
        },
        blush: {
          light: '#fff0f5',
          DEFAULT: '#ffd1dc',
          deep: '#f7b0c3',
        },
        cream: {
          light: '#ffffff',
          DEFAULT: '#fffdd0',
          soft: '#fbf7ee',
        },
        gold: {
          light: '#fde68a',
          DEFAULT: '#f59e0b',
          rose: '#e89e93',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        handwriting: ['"Caveat"', '"Dancing Script"', 'cursive']
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        }
      },
      boxShadow: {
        'glow-pink': '0 0 35px -5px rgba(243, 113, 148, 0.4)',
        'glow-gold': '0 0 35px -5px rgba(245, 158, 11, 0.3)',
        'glass': '0 8px 32px 0 rgba(233, 69, 114, 0.15)',
        'polaroid': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
