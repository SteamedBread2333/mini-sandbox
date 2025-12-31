const { execSync } = require('node:child_process')

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' })
}

// Publishes to GitHub Packages (npm.pkg.github.com).
// NOTE: GitHub Packages requires a *scoped* package name, e.g. "@OWNER/msdbox".
// If your package is currently unscoped, set `name` accordingly before publishing.

run('npm run prepack')
run('npm publish --registry https://npm.pkg.github.com/')

