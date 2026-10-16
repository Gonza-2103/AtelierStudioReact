import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/assets/**',
        'src/styles/**',
        'src/testing/**',
        'node_modules/**',
        '**/*.css',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg'
      ]
    },
  },
});
