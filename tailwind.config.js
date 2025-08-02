/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spa: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bce5cd',
          300: '#8dd1ab',
          400: '#56b882',
          500: '#329f63',
          600: '#23804f',
          700: '#1d6641',
          800: '#1a5136',
          900: '#16432d',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7d0c7',
          300: '#a1b0a1',
          400: '#7a8d7a',
          500: '#5f7260',
          600: '#4a5a4b',
          700: '#3d493e',
          800: '#333c34',
          900: '#2c332d',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

