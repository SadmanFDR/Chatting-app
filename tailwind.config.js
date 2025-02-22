/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  darkMode:'class',
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      center : true,
    },
    extend: {
      fontFamily: {
        'poppins' : ["Poppins", 'serif'],
      },
      colors :{
        'primaryCol' :'#E8F9FF',
        'secendaryCol' :'#16404D',
      }
    },
  },
  plugins: [],
}