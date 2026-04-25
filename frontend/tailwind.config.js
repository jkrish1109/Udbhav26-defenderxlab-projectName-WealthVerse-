/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c6ff00',
        secondary: '#4d7cfe',
        dark: '#121212',
        card: '#1c1c1c',
        'accent-purple': '#8b5cf6',
      },
    },
  },
  plugins: [],
}
