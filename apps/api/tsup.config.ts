import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/plugins/**/*.ts',
    'src/routes/**/*.ts',
    '!src/**/__tests__/**',
    '!src/**/*.spec.ts',
  ],
  outDir: 'build',
  format: ['esm'],
  target: 'es2022',
  platform: 'node',
  tsconfig: './tsconfig.json',
  clean: true,
  sourcemap: true,
  splitting: false,
  skipNodeModulesBundle: true,
});
