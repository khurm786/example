import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
  test: {
    coverage: {
      branches: 80,
      functions: 80,
      lines: 80,
      provider: 'istanbul',
      statements: 80,
      thresholdAutoUpdate: true,
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
})
