import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // react() lets Vite understand JSX; tailwindcss() turns Tailwind classes into real CSS
  plugins: [react(), tailwindcss()],
})
