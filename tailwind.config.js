/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        neons: "url('./src/assets/BG.png')",
      },
      backgroundColor: {
        'white-45': 'rgba(255, 255, 255, 0.45)',
      },
    },
  },
  plugins: [],
}
