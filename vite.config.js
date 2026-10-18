import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setupTests.js',
    watch: false,
    coverage: {
      provider: 'v8',
      // 'text' y 'text-summary' aseguran la impresión en consola
      reporter: ['text', 'text-summary', 'json', 'html'],
      // OBLIGATORIO: Fuerza a Vitest a imprimir la tabla de cobertura aunque haya tests fallidos
      reportOnFailure: true,
      exclude: [
        'src/assets/**',
        'src/styles/**',
        'src/testing/**',
        'node_modules/**',
        '**/*.css',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg'
      ],
    },
  },
});
