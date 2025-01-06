import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Output directory for production build (default is 'dist')
  },
  base: "/", // Set the base path for the app (you can change this if it's hosted at a subdirectory)
});
