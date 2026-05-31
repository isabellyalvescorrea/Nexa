/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nexa: {
          cyan: '#01A2ED',
          blue: '#5562FF',
          indigo: '#5F3BFF',
          violet: '#AE3CFF',
          pink: '#F661FD',
          black: '#04010D',
          night: '#060312',
          deep: '#09051A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 32px rgba(174, 60, 255, 0.34), 0 0 70px rgba(1, 162, 237, 0.18)',
        'neon-pink': '0 0 36px rgba(246, 97, 253, 0.42)',
        'card-glow': '0 18px 70px rgba(95, 59, 255, 0.18)',
      },
      backgroundImage: {
        'nexa-gradient': 'linear-gradient(100deg, #AE3CFF 0%, #5F3BFF 44%, #01A2ED 100%)',
        'nexa-gradient-hot': 'linear-gradient(100deg, #F661FD 0%, #AE3CFF 40%, #5562FF 100%)',
        'nexa-dark': 'radial-gradient(circle at 20% 12%, rgba(174, 60, 255, 0.18), transparent 30%), radial-gradient(circle at 80% 18%, rgba(1, 162, 237, 0.16), transparent 28%), linear-gradient(180deg, #04010D 0%, #060312 55%, #09051A 100%)',
      },
      borderRadius: {
        nexa: '22px',
      },
    },
  },
  plugins: [],
};
