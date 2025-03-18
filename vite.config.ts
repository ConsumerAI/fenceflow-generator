import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
    dedupe: ['zod', 'react-hook-form', '@hookform/resolvers/zod']
  },
  optimizeDeps: {
    include: ['zod', '@hookform/resolvers/zod', 'react-hook-form'],
    force: true,
    entries: [
      './src/**/*.{ts,tsx}',
    ]
  },
  build: {
    target: 'es2020',
    modulePreload: {
      polyfill: true
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react/') || id.includes('react-dom/')) {
              return 'vendor';
            }
            if (id.includes('zod') || id.includes('@hookform') || id.includes('react-hook-form')) {
              return 'form';
            }
          }
        }
      }
    }
  }
}));
