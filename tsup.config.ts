import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'umd/index': 'src/umd/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: true,
  external: ['acorn'],
  outExtension({ format }) {
    // WeChat miniprogram runtime may not resolve ".cjs" correctly and can append ".js".
    // Emit CommonJS as ".js" and ESM as ".mjs" for broad compatibility.
    return format === 'cjs' ? { js: '.js' } : { js: '.mjs' }
  },
  target: 'es2019',
  outDir: 'dist',
})

