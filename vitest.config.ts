import { defineConfig } from 'vitest/config'
import { VitestReporter } from 'tdd-guard-vitest'
import path from 'path'

const root = path.resolve(__dirname)

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 120000,
    pool: 'threads',
    reporters: ['default', new VitestReporter(root)],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/artifacts/**',
      '**/test/integration/validator.scenarios.test.ts', // Extensive test suite - run separately for faster feedback
    ],
  },
  resolve: {
    alias: {
      '@testUtils': path.resolve(__dirname, './test/utils/index.ts'),
    },
  },
})
