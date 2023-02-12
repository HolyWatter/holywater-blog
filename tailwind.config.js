/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        origin: '#2F436E',
        bg: '#f1f5f9',
        modalbg: 'black/70',
      },
    },
    screens: {
      '2xl-m': { max: '1535px' },
      'xl-m': { max: '1279px' },
      'lg-m': { max: '1023px' },
      'md-m': { max: '883px' },
      'sm-m': { max: '639px' },
      sm: '640px',
      md: '884px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
