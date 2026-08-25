/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0F2C59',
          blue: '#1E40AF',
          lightBlue: '#E0F2FE',
          saffron: '#FF6B00',
          green: '#16A34A',
          bgLight: '#F8FAFC',
          cardBorder: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
