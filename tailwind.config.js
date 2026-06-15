/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Red color palette for primary branding and urgency elements
        primary: {
          light: '#EF4444',
          DEFAULT: '#DC2626', // Your main red
          dark: '#B91C1C',
        },
        // Teal color palette acting as the perfect complementary contrast
        complement: {
          light: '#2DD4BF',
          DEFAULT: '#0D9488', // The complementary color
          dark: '#0F766E',
        }
      },
    },
  },
  plugins: [],
}
