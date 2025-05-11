// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'), 
    },
  },
  build: {
    target: 'es2015', 
    commonjsOptions: {
      transformMixedEsModules: true, 
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  esbuild: {
    loader: 'jsx', 
    include: /src\/.*\.(js|jsx)$/, 
    exclude: [], 
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
