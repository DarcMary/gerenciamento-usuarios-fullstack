
import colors from "tailwindcss/colors";
import forms from "@tailwindcss/forms"; 

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.purple,
        neutral: {
          ...colors.slate,
          950: '#0c0f19',
        },
        success: colors.emerald,
        danger: colors.red,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    forms, 
  ],
};