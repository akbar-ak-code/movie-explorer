import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/movie-explorer/',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ← allows external access
    port: 5173       // optional, default is 5173
  }
});
