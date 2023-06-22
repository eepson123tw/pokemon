/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      scale: {
        175: '1.75'
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)  scale(1.)' },
          '10%': { transform: 'rotate(14deg)  scale(1.25) ' },
          '20%': { transform: 'rotate(-8deg)  scale(1.5) ' },
          '30%': { transform: 'rotate(14deg)  scale(1.5) ' },
          '40%': { transform: 'rotate(-4deg)  scale(1.75) ' },
          '50%': { transform: 'rotate(10.0deg)  scale(1.75) ' },
          '60%': { transform: 'rotate(0.0deg)  scale(1.25) ' },
          '100%': { transform: 'rotate(0.0deg)  scale(1) ' }
        }
      }
    },
    animation: {
      'waving-hand': 'wave 2s linear infinite'
    }
  },
  plugins: []
}
