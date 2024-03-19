/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'bubble-comment': "url('/src/assets/bubble_comments.png')",
      },
    },
  },
  plugins: [],
}
