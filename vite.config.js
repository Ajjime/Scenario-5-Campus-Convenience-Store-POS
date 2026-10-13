import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from a subfolder named after the repository:
  // https://ajjime.github.io/Scenario-5-Campus-Convenience-Store-POS/
  // "base" tells Vite to put that folder name in front of every built file path.
  base: '/Scenario-5-Campus-Convenience-Store-POS/',
  // react() lets Vite understand JSX; tailwindcss() turns Tailwind classes into real CSS
  plugins: [react(), tailwindcss()],
})
