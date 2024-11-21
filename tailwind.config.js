// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2A4A',
          hover: '#2c3e6f',
          light: '#E5E9F0',
          lighter: '#F0F2F7',
          dark: '#142139'
        },
        background: '#CBD5DA',
        accent: '#FFB5B5',
        'custom-white': '#fcfcfc',
        'custom-gray': '#4A5568'
      },
    },
  },
}