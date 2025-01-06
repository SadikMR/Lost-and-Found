/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonColor1: "#0A97B0", // Define your custom blue color
        buttonColor2: "#62B7C1",
        buttonColor3: "#007C8A",

        black1: "#673600", // Define your custom red color
      },
    },
  },
  plugins: [daisyui], // Use import for plugins
};
