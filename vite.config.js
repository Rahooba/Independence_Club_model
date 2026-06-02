import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // أهم حاجة - تأكدي إنها موجودة
  server: {
    port: 3000
  }
})