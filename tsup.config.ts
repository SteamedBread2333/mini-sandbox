import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'umd/index': 'src/umd/index.ts',
  },
  format: ['esm', 'cjs', 'iife'],
  dts: true,
  sourcemap: false,
  clean: true,
  splitting: true,
  globalName: 'msdbox',
  treeshake: true,
  minify: true,
  external: ['acorn'],
  outExtension({ format }) {
    // WeChat miniprogram runtime may not resolve ".cjs" correctly and can append ".js".
    // Emit CommonJS as ".js" and ESM as ".mjs" for broad compatibility.
    if (format === 'iife') {
      return { js: '.umd.js' }
    }
    return format === 'cjs' ? { js: '.js' } : { js: '.mjs' }
  },
  target: 'es2019',
  outDir: 'dist',
})

