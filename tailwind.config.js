/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'badge-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.95' },
        },
        'time-tab-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'spin-once': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bn-float': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(-5px)' },
        },
        'bn-ripple': {
          '0%': {
            boxShadow:
              '0 0 0 0 rgba(44, 217, 125, 0.5), 0 5px 18px rgba(44, 217, 125, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 0 rgba(255, 255, 255, 0.38), inset 0 -1px 0 rgba(0, 0, 0, 0.12)',
          },
          '100%': {
            boxShadow:
              '0 0 0 8px rgba(44, 217, 125, 0), 0 5px 18px rgba(44, 217, 125, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 0 rgba(255, 255, 255, 0.38), inset 0 -1px 0 rgba(0, 0, 0, 0.12)',
          },
        },
      },
      animation: {
        'badge-pulse': 'badge-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'time-tab-blink': 'time-tab-blink 1.4s ease-in-out infinite',
        'spin-once': 'spin-once 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'bn-float': 'bn-float 2.2s ease-in-out infinite',
        'bn-ripple': 'bn-ripple 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
}