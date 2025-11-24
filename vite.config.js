import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cs3870_frontend/',   // <-- MUST MATCH YOUR REPO NAME
})
