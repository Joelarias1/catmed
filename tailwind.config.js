// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2c3e6f',
          hover: '#3d5495',
          light: '#E5E9F0',
          lighter: '#F0F2F7',
          dark: '#1B2A4A'
        },
        background: '#CBD5DA',
        accent: '#FFB5B5',
        'custom-white': '#fcfcfc',
        'custom-gray': '#4A5568'
      },
    },
  },
}