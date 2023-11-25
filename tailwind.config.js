/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-navbar": "#ffff",
      },
      darkMode: "className",
      fontFamily: {
        cabinet: ["Cabinet Grotesk Variable", "sans"],
        poppins: ["Poppins", "sans"],
      },
      piechart: {
        width: "100px",
        height: "100px",
        margin: "0 auto",
      },
    },
  },
  plugins: [],
};
