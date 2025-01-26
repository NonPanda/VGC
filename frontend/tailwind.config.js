/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "text": "var(--text)",
        "accent": "var(--accent)",
        "primary-contrast": "var(--primarycontrast)",
        "secondary-contrast": "var(--secondarycontrast)",
        "bg-contrast": "var(--bgcontrast)",
        "text-contrast": "var(--textcontrast)",
        "accent-contrast": "var(--accentcontrast)",
        "shadow": "var(--shadow)",
        "secondary-dark": "var(--secondarydark)",
        "invert-text": "var(--inverttext)",
        "cool":"var(--cool)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],


}
