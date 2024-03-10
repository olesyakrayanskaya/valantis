import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/valantis",
  plugins: [react()],
  define: {'process.env': process.env}
})
