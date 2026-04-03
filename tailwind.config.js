/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F3F4F6', // Light gray background
        card: '#FFFFFF', // White cards
        border: '#E5E7EB', // Subtle light gray border
        primary: '#3B82F6', // Blue accent
        success: '#10B981', // Green stats
        danger: '#EF4444', // Red stats
        textMain: '#111827', // Black/dark text
        textMuted: '#6B7280', // Gray text
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'nexadash': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'nexadash-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
