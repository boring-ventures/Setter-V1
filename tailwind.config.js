/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#002F6C',
          yellow: '#FFD200',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'ripple': 'ripple 1s linear forwards',
        'aurora': 'aurora 10s linear infinite',
        'wave': 'wave 10s linear infinite',
        'meteor': 'meteor 5s linear infinite',
      },
      keyframes: {
        ripple: {
          '0%': { opacity: '0.7', transform: 'scale(0)' },
          '100%': { opacity: '0', transform: 'scale(2)' }
        },
        aurora: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' }
        },
        wave: {
          '0%': { transform: 'translateX(0) translateZ(0) scaleY(1)' },
          '50%': { transform: 'translateX(-25%) translateZ(0) scaleY(0.95)' },
          '100%': { transform: 'translateX(-50%) translateZ(0) scaleY(1)' }
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0'
          }
        }
      },
    },
  },
  plugins: [],
} 