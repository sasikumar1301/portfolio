import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_PATH lets the same build work on Vercel ("/") or GitHub Pages ("/<repo>/").
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react()],
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)) },
});
