/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#333333',
        accent: '#D32F2F',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        border: '#E0E0E0',
        text: {
          primary: '#1A1A1A',
          secondary: '#666666',
          muted: '#999999'
        },
        success: '#2E7D32',
        error: '#C62828',
        warning: '#F57C00'
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans Pro', 'Helvetica Neue', 'sans-serif']
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem'
      }
    },
  },
  plugins: [],
}
