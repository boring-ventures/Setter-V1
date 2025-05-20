/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
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
      animation: {
        meteor: 'meteor 5s linear infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(var(--angle)) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': { transform: 'rotate(var(--angle)) translateX(-500px)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
} 