import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Only include lovable-tagger in development mode
    mode === 'development' && import('lovable-tagger').then(({ componentTagger }) => componentTagger()),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    port: 4173,
  },
}));
