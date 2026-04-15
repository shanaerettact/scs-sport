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
        'bn-float': 'bn-float 2.2s ease-in-out infinite',
        'bn-ripple': 'bn-ripple 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
}