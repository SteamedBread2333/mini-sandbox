const { execSync } = require('node:child_process')

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' })
}

// Publishes to the public npm registry.
// Auth is provided via:
// - local: your ~/.npmrc login
// - CI: NODE_AUTH_TOKEN + registry config in workflow

run('npm run prepack')
run('npm publish --registry https://registry.npmjs.org/ --access public')

