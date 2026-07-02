import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path matches the GitHub Pages repo name. HashRouter is used in the
// app so this base is the only place routing needs to know about it.
export default defineConfig({
  base: '/kde-dashboard/',
  plugins: [react(), tailwindcss()],
})
