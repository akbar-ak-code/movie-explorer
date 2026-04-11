import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Change this from '/movie-explorer/' to '/'
  base: '/', 
  plugins: [react()],
})
