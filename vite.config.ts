import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  define: {
    "import.meta.env.VITE_REACT_APP_API_BASE_URL": JSON.stringify(
      process.env.VITE_REACT_APP_API_BASE_URL
    ),
  },
};
