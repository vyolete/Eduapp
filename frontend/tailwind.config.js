/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7F77DD',
        success: '#1D9E75',
        warning: '#BA7517',
        danger: '#D85A30',
        background: '#0f0f13',
        card: '#1e1d28',
      },
    },
  },
  plugins: [],
}
