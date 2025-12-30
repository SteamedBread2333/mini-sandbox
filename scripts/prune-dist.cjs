const fs = require('node:fs')
const path = require('node:path')

/**
 * Prune build artifacts we don't want to publish.
 * - We keep .d.ts as the exported types entrypoints.
 * - We remove .d.mts/.d.cts to reduce package noise (they are not referenced by exports).
 */

function walk(dir, onFile) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) walk(p, onFile)
    else if (ent.isFile()) onFile(p)
  }
}

function safeUnlink(p) {
  try {
    fs.unlinkSync(p)
  } catch (e) {
    // ignore
  }
}

const distDir = path.join(process.cwd(), 'dist')
if (fs.existsSync(distDir)) {
  walk(distDir, (p) => {
    if (p.endsWith('.d.mts') || p.endsWith('.d.cts')) safeUnlink(p)
  })
}

