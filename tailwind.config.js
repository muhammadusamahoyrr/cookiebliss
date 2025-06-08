/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        'light-bg': 'var(--light-bg)',
        'text-dark': 'var(--text-dark)',
        'text-light': 'var(--text-light)',
        white: 'var(--white)',
        'cookie-color': 'var(--cookie-color)',
        'cookie-dark': 'var(--cookie-dark)',
        'crumb-color': 'var(--crumb-color)',
      },
    },
  },
  plugins: [],
} 